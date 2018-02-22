const SEGMENT_WIDTH = 90;
const SEGMENT_LENGTH = 50;
const EDGE_LOOP_RESOLUTION = 5;
const SLOPE_BUFFER_AMOUNT = 30;
const BACK_BUFFER_ANOUNT = 10;
const TURN_TYPE_SWITCH_FREQUENCY = 3;
const SHARP_TURN = 0.35;
const GRADUAL_TURN = 0.14;
const TILES_PER_SEGMENT = 1;
const TREES_PER_SEGMENT = 2;
const TREE_COLLIDER = "TREE_COLLIDER";
const TREE_RADIUS = 3;
const TREE_SEGMENT = "TREE_SEGMENT";
const SNOW_SEGMENT = "SNOW_SEGMENT";
const TREE_PROBABILITY_LENGTHWISE = 0.58
const TREE_MAX_DENSITY_WIDTHWISE = 4;
const BALLOON_PROBABILITY_LENGTHWISE = 0.22;
const BALLOON_DENSITY_WIDTHWISE = 2;
const BALLOON_FLOAT_HEIGHT = 6;
const BALLOON_RADIUS = 4.2;
const BOX_COLLIDER = "BOX_COLLIDER";
const BEGINNING_NO_OBSTACLE_SEGMENTS = 15;
const CLIFF_PROBABILITY = 0.05;

import balloonMesh from "../balloon";
import TreePool from "./object_pools/tree_pool";
import {UPDATE_INTERVAL} from "../game_object/game_object";
import * as MathUtils from "../utils/math_utils";
import * as CollisionUtils from "../utils/collision_utils";
import createMesh from "../game_object/mesh";
import GameObject from "../game_object/game_object";

export default function createSlope(transformatinMatrix = MathUtils.identityMatrix4, rasterizer){
  const img_src = "snow.jpg";
  return createMesh({
    faces: [],
      vertices: [],
      textured: true,
      img_src,
      uvs: [],
      rasterizer
  }).then(
    mesh=>{
      return Slope(mesh);
    }
  );
};

export default class Slope extends GameObject{
  constructor(mesh){
    this.mesh = mesh;
    super(undefined);
    this._transformationMatrix = transformationMatrix.slice(0,16);
    this.rasterizer = rasterizer;
    this.currentTurn = "none";
    this.bufferedSegments = 0;
    this.uvH = 0;
    this.segmentMatrices = [transformationMatrix];
    this.segmentRotation = [-0.25,0,0];
    this.segmentPosition = MathUtils.multiplyVec4ByMatrix4(transformationMatrix,
      [0,SEGMENT_LENGTH,0,1]).slice(0,3);
    this.obstacles = [];
    this.balloons = [];
    this.balloonsCreatedSinceStart = 0;
    //this.segmentRotation[0] = 0;
    this._setupTreeMesh();
    this._setupBalloonMesh();
    const firstLoop = this.createEdgeLoop();
    let unpackedVertices;

    this.segmentsSinceStart = 0;
    for(let i = 0; i< firstLoop.length; i+=3){
      unpackedVertices = MathUtils.multiplyVec4ByMatrix4(
        transformationMatrix,
      firstLoop.slice(i,i+3).concat(1)).slice(0,3);
      for(let j = 0; j< unpackedVertices.length; ++j){
        this.mesh.vertices.push(unpackedVertices[j]);
      }
    }
    for(let i = 0; i < SLOPE_BUFFER_AMOUNT + BACK_BUFFER_ANOUNT ; ++i ){
      this.generateSegment();
    }

  }
  _setupTreeMesh(){
    this.treePool = new TreePool(this.rasterizer);
    this.sideGeometry = [];
    this.currentSideGeometryType = TREE_SEGMENT;
    this.treesCreatedSinceStart = 0;
  }
  _setupBalloonMesh(){
    this.balloonMesh = new Mesh(balloonMesh);
    this.balloonMesh.colored = true;
    this.balloonMesh.buffers = this.rasterizer.sendMeshToGPU(this.balloonMesh);
  }
  _addUvsSegment(){
    for(let i = 0; i <= EDGE_LOOP_RESOLUTION; ++i){
      this.mesh.uvs.push(this.uvH, i/EDGE_LOOP_RESOLUTION * TILES_PER_SEGMENT);
    }
  }

  _deleteUvsSegment(){
    for(let i = 0; i <= EDGE_LOOP_RESOLUTION; ++i){
      this.mesh.uvs.shift();
      this.mesh.uvs.shift();
    }
  }
  _addSideGeometrySegment(){

    if(this.currentSideGeometryType === TREE_SEGMENT){
      const trees = [];

      let leftRightToggle = -1;
      for(let i = 0; i < 2; ++i){
        let transformationMatrix = this.segmentMatrices[this.segmentMatrices.length -1];
        transformationMatrix = MathUtils.mat_4_multiply(
          MathUtils.translationMatrix(leftRightToggle * SEGMENT_WIDTH/2, 0, 0),
          transformationMatrix
        );
        let tree;
        for(let i = 0; i < TREES_PER_SEGMENT; ++i){

          transformationMatrix =
          MathUtils.mat_4_multiply(
            MathUtils.translationMatrix(0, SEGMENT_LENGTH * i / TREES_PER_SEGMENT, 0,1),
            transformationMatrix );
          tree = this.treePool.pullTree(this.treesCreatedSinceStart);
          tree.setPosition(MathUtils.mat4TranslationComponent(transformationMatrix));
          this.rasterizer.objects[tree.id] = tree;
          ++this.treesCreatedSinceStart;
          trees.push(tree);
        }
        leftRightToggle *= -1;
      }
      this.sideGeometry.push({trees, type: TREE_SEGMENT});
    }
  }
  _deleteSideGeometrySegment(){
    if(this.sideGeometry[0].type === TREE_SEGMENT){
      const treesSeg = this.sideGeometry.shift();
      for(let i = 0; i < treesSeg.trees.length; ++i){
        this.treePool.releaseTree(treesSeg.trees[i]);
        delete this.rasterizer.objects[treesSeg.trees[i].id];
      }
    }
  }
  _addObstacleSegment(){
    const obstacleSegment =[];
    const transformationMatrix =
    MathUtils.mat_4_multiply(
      MathUtils.translationMatrix(0, -SEGMENT_LENGTH/TREES_PER_SEGMENT, 0,1),
      this.segmentMatrices[this.segmentMatrices.length -1]);
    if(this.segmentsSinceStart > BEGINNING_NO_OBSTACLE_SEGMENTS && Math.random() < TREE_PROBABILITY_LENGTHWISE){
        const segment = 0;
        const widthWiseCount = Math.floor(Math.random()*
          TREE_MAX_DENSITY_WIDTHWISE);
        let tree, treeTransformation;
        for(let i = 0; i < widthWiseCount; ++i){
          treeTransformation = MathUtils.mat_4_multiply(
            MathUtils.translationMatrix((Math.random() * 0.8 + 0.1) * SEGMENT_WIDTH -SEGMENT_WIDTH/2,
             Math.random()* SEGMENT_LENGTH, 0),
             transformationMatrix
          );
          tree = this.treePool.pullTree(this.treesCreatedSinceStart);
          tree.setPosition(MathUtils.mat4TranslationComponent(treeTransformation));
          obstacleSegment.push(tree);
          this.rasterizer.objects[tree.id] = tree;
          ++this.treesCreatedSinceStart;
        }
    }
    this.obstacles.push(obstacleSegment);
  }
  _addBalloonsSegment(){
    const balloonSegment = {};
    let transformationMatrix, newBalloon, id;
    if(Math.random() < BALLOON_PROBABILITY_LENGTHWISE){
      for(let i = 0; i <= Math.floor(Math.random() * BALLOON_DENSITY_WIDTHWISE); ++ i){
        transformationMatrix = MathUtils.mat_4_multiply(
          MathUtils.translationMatrix(Math.random() * SEGMENT_WIDTH - SEGMENT_WIDTH/2,
           SEGMENT_LENGTH/2, BALLOON_FLOAT_HEIGHT),
          this.segmentMatrices[this.segmentMatrices.length - 1]
        );
        newBalloon = new GameObject(this.balloonMesh, transformationMatrix);
        id = `balloon${this.balloonsCreatedSinceStart}`;
        newBalloon.id = id;
        balloonSegment[i] = newBalloon;
        this.rasterizer.objects[id] = newBalloon;
        ++this.balloonsCreatedSinceStart;
      }
    }
    this.balloons.push(balloonSegment);
  }
  _deleteObstacleSegment(){
    const deletedSegment = this.obstacles.shift();
    for(let i = 0; i< deletedSegment.length; ++i){
      this.treePool.releaseTree(deletedSegment[i]);
      delete this.rasterizer.objects[deletedSegment[i].id];
    }
  }
  _deleteBalloonSegment(){
    const deletedSegment = this.balloons.shift();
    Object.keys(deletedSegment).forEach(key=>{
      delete this.rasterizer.objects[deletedSegment[key].id];
    });
  }
  createEdgeLoop(){
    const vertices = [];
    for(let i = 0; i <= EDGE_LOOP_RESOLUTION; ++i){
      vertices.push(SEGMENT_WIDTH/ EDGE_LOOP_RESOLUTION * i - SEGMENT_WIDTH/2, 0, 0);
    }
    return vertices;
  }
  notifyOfCharacterSegmentNumber(idx){
    if(idx < BACK_BUFFER_ANOUNT){
      return false;
    }
    this.generateSegment();
    this.deleteSegment();
    return true;
  }
  generateNewSegmentRotation(){
    let randomTurn = Math.random();
    if (randomTurn < 0.05 * TURN_TYPE_SWITCH_FREQUENCY ){
      randomTurn = Math.random();
      if(randomTurn <0.66){
        this.currentTurn = "none";
      }
      else if(randomTurn < 0.75){
        this.currentTurn = "gradual";
      }
      else{
        this.currentTurn = "sharp";
      }
      if(Math.random() < 0.5){
        this.turnDirection = "left";
      }
      else{
        this.turnDirection = "right";
      }
    }

    const multiplier = this.turnDirection === "left" ? -1 : 1;
    switch(this.currentTurn){
      case "sharp":
        this.segmentRotation[2] += multiplier * SHARP_TURN;
        this.segmentRotation[1] = -1* multiplier* 0.25;
        break;
      case "gradual":
        this.segmentRotation[2] += multiplier * GRADUAL_TURN;
        this.segmentRotation[1] = -1* multiplier* 0.10;
        break;
      default:
        this.segmentRotation[1] = Math.random() *0.03;
        break;
    }
    //this.segmentRotation[2] += -0.2;
    //this.segmentRotation[0] -= 0.05;
  }

  positionIsPastSegmentStart(pos, segmentNumber){
    const segmentStartLine = MathUtils.multiplyVec4ByMatrix4(
      MathUtils.mat4RotationComponent(this.segmentMatrices[segmentNumber]),
        [-1,0,0,1]);
    const segmentStartNormal = MathUtils.vectorCross([0,0,1],
       segmentStartLine);
    const offsetVector = MathUtils.subtractVectors(
         pos, MathUtils.mat4TranslationComponent(this.segmentMatrices[segmentNumber]));
    const result = MathUtils.vectorDot(offsetVector, segmentStartNormal);
    return result < 0;
  }

  boxCollidesWithObstacle(boxMatrix, boxDimensions, movement, segment_number){
    let obstacle;
    let collisionData;
    for(let i = 0; i < this.obstacles[segment_number].length; ++i){
      obstacle = this.obstacles[segment_number][i];
      collisionData = CollisionUtils.movingBoxIntersectsBox(
        boxMatrix, boxDimensions, obstacle.getTransformationMatrix(),
        obstacle.collider.dimensions, movement);
      if(collisionData) return collisionData;
    }
    return false;
  }

  capsuleCollidesWithObstacle(capsulePointA, capsulePointB, capsuleRadius, segment_number){
    let obstacle;
    let collisionData;
    for(let i = 0; i < this.obstacles[segment_number].length; ++i){
      obstacle = this.obstacles[segment_number][i];
      collisionData = CollisionUtils.sphereCollidesCapsule(MathUtils.mat4TranslationComponent(
        obstacle.getTransformationMatrix()
      ),TREE_RADIUS,capsulePointA,capsulePointB,capsuleRadius );
      if(collisionData) return collisionData;
    }
    for(let i = 0; i < this.obstacles[segment_number + 1].length; ++i){
      obstacle = this.obstacles[segment_number + 1][i];
      collisionData = CollisionUtils.sphereCollidesCapsule(MathUtils.mat4TranslationComponent(
        obstacle.getTransformationMatrix()
      ),TREE_RADIUS,capsulePointA,capsulePointB,capsuleRadius );
      if(collisionData) return collisionData;
    }
    return false;
  }
  capsuleCollidesWithBalloons(capsulePointA, capsulePointB, capsuleRadius, segment_number){
    let points = 0;
    let balloon;
    Object.keys(this.balloons[segment_number]).forEach(key=>{
      if(CollisionUtils.sphereCollidesCapsule(this.balloons[segment_number][key].getPosition(),
       BALLOON_RADIUS,capsulePointA, capsulePointB,capsuleRadius)){
        ++points;
        delete this.rasterizer.objects[this.balloons[segment_number][key].id];
        delete this.balloons[segment_number][key];
      }
    });
    return points;
  }

  positionCollidesWithObstacle(pos, segment_number){
    let transformedPosition;
    let obstacle;
    let dimensions;
    for(let i =0; i < this.obstacles[segment_number].length; ++i){
      obstacle = this.obstacles[segment_number][i];
      transformedPosition = MathUtils.multiplyVec4ByMatrix4(
        MathUtils.inverse_mat4_rot_pos(
            obstacle.getTransformationMatrix()
        ),
        pos.concat(1)
      );
      dimensions = obstacle.collider.dimensions;
      if(transformedPosition[0] > -dimensions[0]/2 &&
       transformedPosition[0] < dimensions[0]/2 &&
       transformedPosition[1] > -dimensions[1]/2 &&
        transformedPosition[1] < dimensions[1]/2 &&
        transformedPosition[2] >= -0.01 &&
         transformedPosition[2] < dimensions[2]){
           return true;
         }
    }
    return false;
  }

  segmentLocalCoords(segment_number, pos){
    return
          MathUtils.multiplyVec4ByMatrix4(object.position.concat(1),
            MathUtils.inverse_mat4_rot_pos(
              this.matrices[nextSegmentNumber]));
  }

  getSurroundingTriangle(pos, segmentNumber){
    const startIdx = 6 * EDGE_LOOP_RESOLUTION * segmentNumber;
    const vertex = this.mesh.packedVertex.bind(this.mesh);
    const inverseSegmentTransform = MathUtils.inverse_mat4_rot_pos(
      this.segmentMatrices[segmentNumber]
    );
    const transformedPosition = MathUtils.multiplyVec4ByMatrix4(
      inverseSegmentTransform,
      pos.concat(1)
    );
    let transformedTriangle;
    for(let i = startIdx; i < startIdx + 6 * EDGE_LOOP_RESOLUTION - 1; i+=3){
      transformedTriangle = []
      for(let j = 0; j < 3; ++j){
        transformedTriangle.push(
          MathUtils.multiplyVec4ByMatrix4(
            inverseSegmentTransform,
          vertex(this.mesh.faces[i+j]).concat(1))
        );
      }
      if(MathUtils.triangleContainsPoint(transformedPosition, transformedTriangle)){
          return [vertex(this.mesh.faces[i]),
            vertex(this.mesh.faces[i + 1]), vertex(this.mesh.faces[i + 2])];
      }
    }
  }

  _boxIsBeyondEdge(boxMatrix, boxDimensions, segmentNumber, toggleLeft){
    const checkPoints = CollisionUtils.boxColliderToPoints(boxMatrix, boxDimensions);
    let pointBeyondEdge = false;
    for(let i =0; i <checkPoints.length; ++i){
      pointBeyondEdge = this._positionIsBeyondEdge(checkPoints[i], segmentNumber,
        toggleLeft);
      if(pointBeyondEdge){

        return pointBeyondEdge;
      }
    }
  }
  boxIsBeyondEdge(boxMatrix, boxDimensions, segmentNumber){
    return(
      this._boxIsBeyondEdge(boxMatrix, boxDimensions,segmentNumber, true) ||
      this._boxIsBeyondEdge(boxMatrix, boxDimensions,segmentNumber, false)
    );
  }

  positionIsBeyondEdge(pos, segmentNumber){
    return (
      this._positionIsBeyondEdge(pos, segmentNumber, true) ||
      this._positionIsBeyondEdge(pos, segmentNumber, false)
    );
  }
  _positionIsBeyondEdge(pos, segmentNumber, toggleLeft){
    const xOffset = toggleLeft? -SEGMENT_WIDTH/2 : SEGMENT_WIDTH/2;
    const currentSegPoint = MathUtils.multiplyVec4ByMatrix4(
      this.segmentMatrices[segmentNumber],
      [xOffset, 0, 0, 1]

    );
    const nextSegPoint = MathUtils.multiplyVec4ByMatrix4(
      this.segmentMatrices[segmentNumber + 1],
      [xOffset, 0, 0, 1]
    );
    let vec0, vec1;
    if(toggleLeft){
      vec0 = MathUtils.subtractVectors(nextSegPoint, currentSegPoint);
      vec1 = [0,0,1];
    }
    else{
      vec0 = MathUtils.subtractVectors(nextSegPoint, currentSegPoint);
      vec1 = [0,0,-1];
    }
    const edgeNormal = MathUtils.vectorCross( vec0, vec1);
    const posOffset = MathUtils.subtractVectors(pos, currentSegPoint);
    if(MathUtils.vectorDot(posOffset, edgeNormal) < 0){
      let edgeVector =  toggleLeft? vec0: vec1;
      let penetration = -1 *MathUtils.scalarProjection(posOffset, edgeNormal);
      return{normal: edgeNormal, colliderPoint: pos,
         vector: edgeVector, edgePoint0: currentSegPoint,
         penetration,
        edgePoint1: nextSegPoint, toggleLeft};
    }
    return false;
  }

  generateSegment(){
    const pos = this.segmentPosition;
    this.generateNewSegmentRotation();

    let transformationMatrix = MathUtils.translationMatrix(
      pos[0], pos[1], pos[2]
    );
    let xRot = MathUtils.xRotationMatrix(this.segmentRotation[0]);
    if(Math.random()<= CLIFF_PROBABILITY){
      xRot = MathUtils.xRotationMatrix(-Math.PI/3);
    }
    let yRot = MathUtils.yRotationMatrix(this.segmentRotation[1]);
    let zRot = MathUtils.zRotationMatrix(this.segmentRotation[2]);
    transformationMatrix = MathUtils.mat_4_multiply(
      yRot,
      MathUtils.mat_4_multiply(
        xRot,
        MathUtils.mat_4_multiply(
          zRot,
          transformationMatrix
        )
      )
    );
    this.segmentPosition = MathUtils.multiplyVec4ByMatrix4(transformationMatrix,
       [0, SEGMENT_LENGTH, 0,1]);

     let newSegment = this.createEdgeLoop();
    // let transformedSegment = MathUtils.addVectors(newSegment, this.segmentPosition);
     let transformedSegment = [];
     let transformedPos;
     for(let i = 0; i < newSegment.length; i +=3){
       transformedPos = newSegment.slice(i, i+3);
       transformedPos.push(1);
       transformedPos =  MathUtils.multiplyVec4ByMatrix4(transformationMatrix,transformedPos);
       for(let i = 0; i < 3; ++i){
         transformedSegment.push(transformedPos[i]);
       }
     }
    this._addSegment(transformedSegment);
    this._addSideGeometrySegment();
    this._addObstacleSegment();
    this._addBalloonsSegment();
    //this.segmentPosition =
    //  MathUtils.mat4TranslationComponent(segmentMatrix);
    this.segmentMatrices.push(transformationMatrix);
    this._addUvsSegment();
    this.uvH += SEGMENT_LENGTH/SEGMENT_WIDTH;
  }

  _addSegment(vertices){
    const startIdx = this.mesh.vertices.length/3 - 1 - EDGE_LOOP_RESOLUTION;
    for(let i =0; i< vertices.length; ++i){
      this.mesh.vertices.push(vertices[i]);
    }
    for(let i = startIdx; i < startIdx + EDGE_LOOP_RESOLUTION; ++i){
      //first triangle
      this.mesh.faces.push(i);
      this.mesh.faces.push(i+1);
      this.mesh.faces.push(i + EDGE_LOOP_RESOLUTION + 1 );

      //second triangle
      this.mesh.faces.push(i+1);
      this.mesh.faces.push( i + EDGE_LOOP_RESOLUTION + 2);
      this.mesh.faces.push( i + EDGE_LOOP_RESOLUTION + 1);

      /*triangle configuration

          t2 , t2      t1


         t0      t1 ,t0
      */
    }
    this.mesh.setDirty();
    ++this.segmentsSinceStart;
  }
  deleteSegment(){
    //values per vertex is 3
    for(let i = 0 ; i < (EDGE_LOOP_RESOLUTION + 1) *3; ++i ){
      this.mesh.vertices.shift();
    }
    //values per face is 3, there are two faces per segment
    for(let i = 0; i < EDGE_LOOP_RESOLUTION * 6; ++i ){
      this.mesh.faces.pop();
    }
    this.segmentMatrices.shift();
    this._deleteUvsSegment();
    this._deleteSideGeometrySegment();
    this._deleteObstacleSegment();
    this._deleteBalloonSegment();
    this.mesh.setDirty();
  }
}
