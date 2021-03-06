import GameObject from "../game_object/game_object";

const SQR_MAGNITUDE_ALLOWED_ABOVE_SURFACE = 4;
const EDGE_COLLISION_DAMP_FACTOR = 0.2;
const EDGE_COLLISION_PADDING_ROTATION = 0.5;
const STEER_SPEED = 0.015;
const STEER_ANIMATION_LERP_SPEED = 0.12;

const SNOWBOARD_RESTITUTION = 0.48;
const SNOWBOARD_FRICTION = [0.187, 0.01, 0.187, 1];
const BREAK_FRICTION = [0.04, 0.16, 0.04];
const JUMP_VECTOR = [0,0.1,3];
const COLLISION_INTENSITY_MIN_VELOCITY = 2;
const COLLISION_INTENSITY_MAX_VELOCITY = 10;
const SPEED_VOLUME_INTENSITY_MIN_VELOCITY = 0.2;
const SPEED_VOLUME_INTENSITY_MAX_VELOCITY = 20;

import * as MathUtils from "../utils/math_utils";
import * as HUD from "../hud/hud";
window.MathUtils = MathUtils;
import * as CollisionUtils from "../utils/collision_utils";
import * as AssetUtils from "../utils/asset_utils";

import snowboarder_data from "../snowboarder";
import snowboardActions from "../actions";
import createMesh from "../game_object/mesh";
import AudioMixer from "../audio/mixer";

const effectBuffers= {};
export default function createCharacter(slope){
  return new Promise((resolve, reject)=>{
    const runningJobs = {};
    let processedCharMesh = undefined;

    const soundEffects = ["hit", "collect", "sliding"];

    const finishJob = name =>{
      delete runningJobs[name];
      if(Object.keys(runningJobs).length === 0){
        resolve(new Character({mesh: processedCharMesh, slope}));
      }
    };
    const context = new (window.AudioContext || window.webkitAudioContext)();
    soundEffects.forEach(name=>{
      if(effectBuffers.hasOwnProperty(name)) return;
      runningJobs[`load_audio_${name}`] = true;
      AssetUtils.loadAsset(`${name}.mp3`, "arraybuffer")
      .then(result=> new Promise((resolve, reject)=>context.decodeAudioData(result.target.response, resolve, reject)))
      .then(buffer=>{effectBuffers[name] = buffer})
      .then(()=>finishJob(`load_audio_${name}`))
      .catch(reject);
    });

    runningJobs[`process_mesh`] = true;
    createMesh({data:snowboarder_data,
      action_file: snowboardActions, mode2: true,colored: true, skinned: true})
    .then(
      mesh=>{ 
        processedCharMesh = mesh;
        finishJob('process_mesh');
      }
    )
    .catch(reject);
  });
}

class Character extends GameObject{
  constructor({mesh, boundingBox, slope}){
    super(mesh);
    window.character = this;
    this.mesh = mesh;
    this.boundingBox = boundingBox;
    
    this.slope = slope;
    this.currentSegmentNumber = 0;
    
    this.capsuleRadius = 2;
    this.setPosition([0,0,16]);
    this.name = "snowboarder";
    
    window.character = this;
    this.mixedAnimations = Array(this.mesh.numBones * 8);
    this.snowSound = AudioMixer.play({buffer: effectBuffers.sliding,
      priority: 10, volume: 0, loop: true});
    this._setup();
  }
  _setup(){
    this.segmentsSinceStart = 0;
    this.setPosition([0,0,16]);
    this.setRotation(MathUtils.IdentityQuaternion);
    this.setAngularVelocity(MathUtils.IdentityQuaternion);
    this.state = "ground";
    this.speed = 0.3;
    this.fallSpeed = 0.15;
    this.input = {left: false, right: false, back: false, jump: false};
    this.velocity = [0,1,0];
    this.localVelocity = [0,0,0];
    this.localUp = [0,0,1];
    this.friction = SNOWBOARD_FRICTION;
    this.restitution = SNOWBOARD_RESTITUTION;
    this.boxDimensions = [0.5,5,0.5];
    this.currentAnimations = {
      "neutral":{influence: 1, loop: true, frame: 0},
      "left":{influence: 0, loop: true, frame: 0},
      "right":{influence: 0, loop: true, frame: 0},
      "brake":{influence: 0, loop: false, frame: 0}
    };

  }
  reset(){
    this._setup();
  }
  _applyGravityStep(){
    this.velocity[2] -= this.fallSpeed;
  }
  _updateLocalUp(){
    this.transformDirectionInPlace([0,0,1], this.localUp);
  }

  update(){
    this._ensureAboveSurface();

    //let's gather some data about the environment/ our orientation first : 
    this._getSurfaceData();
    this._updateSegmentNumber();
    this._updateLocalUp(); // the vector representing the character's z axis
    
    const surfaceOffset = MathUtils.subtractVectors
      (this.getPosition(),this.surfacePoint);
    const distanceFromSurface = MathUtils.vectorSquareMag(surfaceOffset);
    this._steerControls();
    switch(this.state){
      case "ground":
        if(this.input.jump){
          this._jump();
        }
        let snowVolume = MathUtils.vectorMag(this.velocity);
        snowVolume -= SPEED_VOLUME_INTENSITY_MIN_VELOCITY;
        if (snowVolume < 0) snowVolume = 0;
        snowVolume /= SPEED_VOLUME_INTENSITY_MAX_VELOCITY;
        this.snowSound.setVolume(snowVolume);
        this._planeAlign();
        if(MathUtils.vectorDot(this.velocity, this.localUp) < 0){
          MathUtils.projectVectorOntoPlaneInPlace(this.velocity, this.localUp, this.velocity);
        }
        this.inverseTransformDirectionInPlace(this.velocity, this.localVelocity);
        this._applyFriction(this.localVelocity);
        this.transformDirectionInPlace(this.localVelocity, this.velocity);
        if(distanceFromSurface > this.capsuleRadius){
          this.state = "air";
        }
        break;
      case "jump":
        this.snowSound.setVolume(0);
        if(MathUtils.vectorDot(this.localUp, this.velocity) <= 0){  
          this.state = "air";
        }
        this._upAlign();
        break;
      case "air":
        if(distanceFromSurface <= this.capsuleRadius){
          this.state = "ground";
        }
        this.snowSound.setVolume(0);
        this._upAlign();
        break;
    }

    this._applyGravityStep();
    this._handleCollisions();
    this._updateAnimations();
    this._normalizeAnimationInfluence();
    this._mixAnimations();
    super.update();
  }
  _updateAnimations(){
    const animEntries = Object.entries(this.currentAnimations);
    let mixerInfo, anim;
    for(let i = 0; i < animEntries.length; ++i){
      mixerInfo = animEntries[i][1];
      anim = this.mesh.animations[animEntries[i][0]];
      if(!mixerInfo.playedThrough){
        if(mixerInfo.reverse){
          mixerInfo.frame -= 1;
          if(mixerInfo.frame < 0){
            if(mixerInfo.loop){
              mixerInfo.frame = anim.length - 1;
            }
            else{
              mixerInfo.frame = 0;
              mixerInfo.playedThrough = true;
            }
          }
        }
        else{
          mixerInfo.frame += 1;
          if(mixerInfo.frame >= anim.length){
            if(mixerInfo.loop){
              mixerInfo.frame = 0;
            }
            else{
              mixerInfo.frame = anim.length - 1;
              mixerInfo.playedThrough = true;
            }
          }
        }
      }
    }
  }
  _getSurfaceData(){
    let localDownVector = MathUtils.multiplyVec4ByMatrix4(
      this.slope.segmentMatrices[this.currentSegmentNumber],
      [0,0,-1,0]
    );
    let newFloorTriangle = this.slope.getSurroundingTriangle(this.getPosition(),this.currentSegmentNumber);
    this.floorTriangle = newFloorTriangle || this.floorTriangle;
    this.surfacePlaneNormal = MathUtils.planeNormal(this.floorTriangle[0], this.floorTriangle[1],
      this.floorTriangle[2]);
    this.surfacePoint = MathUtils.vectorTriangleIntersection(this.getPosition(),
     MathUtils.multiplyVec4ByMatrix4(this.slope.segmentMatrices[this.currentSegmentNumber],[0,0,-1,0]),
     this.floorTriangle[0], this.floorTriangle[1], this.floorTriangle[2]);
  }
  _ensureAboveSurface(){
    if(!this.floorTriangle){
       return;
    }
    if(!MathUtils.pointIsAbovePlane(this.getPosition(), this.floorTriangle[0],
        this.floorTriangle[1], this.floorTriangle[2])){
        const upVector = MathUtils.multiplyVec4ByMatrix4(
          this.slope.segmentMatrices[this.currentSegmentNumber],
          [0,0,1,0]);
        this.setPosition(MathUtils.vectorTriangleIntersection(this.getPosition(),upVector,
            this.floorTriangle[0], this.floorTriangle[1], this.floorTriangle[2]));
    }
  }
  _planeAlign(){
    const surfaceNormalLocal = this.inverseTransformDirection(this.surfacePlaneNormal);
    const planeAlignAxis = MathUtils.vectorCross(
      surfaceNormalLocal, [0,0,1]);
    const planeAlignAngle = MathUtils.angleBetweenVectors([0,0,1],
      surfaceNormalLocal);
    this.addAngularVelocity(MathUtils.axisAngleToQuaternion(
      planeAlignAxis, planeAlignAngle/5));
  }
  _upAlign(){
    const upLocal = this.inverseTransformDirection([0,0,1]);
    const planeAlignAxis = MathUtils.vectorCross(
      upLocal, [0,0,1]);
    const planeAlignAngle = MathUtils.angleBetweenVectors([0,0,1],
      upLocal);
    this.addAngularVelocity(MathUtils.axisAngleToQuaternion(
      planeAlignAxis, planeAlignAngle/35));
  }
  _applyFriction(localVelocity){
    let signFlip;
    for(let i = 0; i < localVelocity.length; ++i){
      if (Math.abs(localVelocity[i]) < Math.abs(this.friction[i])){
        localVelocity[i] = 0;
      }
      else{
        signFlip = localVelocity[i] < 0 ? -1 : 1;
        localVelocity[i] -= this.friction[i] * signFlip;
      }
    }
  }
  _steer(direction){
    this.addAngularVelocity(
      MathUtils.axisAngleToQuaternion(
        this.localUp,
      -1 * direction * STEER_SPEED)
    );
  }
  _mixAnimations(){
    const currentKeys = Object.keys(this.currentAnimations);
    // first fill the lerped transform with the first animation we find,
    // which does not have influence 0, * its influence
    let firstAnimIndex;
    let animFrame;
    for(let i = 0; i < currentKeys.length; ++i){
      if(this.currentAnimations[currentKeys[i]].influence !== 0){
        firstAnimIndex = i;
        animFrame = this.currentAnimations[currentKeys[i]].frame;
        break;
      }
    }
    let anim = this.mesh.animations[currentKeys[firstAnimIndex]][
      this.currentAnimations[currentKeys[firstAnimIndex]].frame
    ];
    let influence = this.currentAnimations[currentKeys[firstAnimIndex]].influence;
    for(let i = 0; i < anim.length; ++i){
      this.mixedAnimations[i] = anim[i] * influence;
    }
    // now add all the other anims * their influence
    for(let idx = firstAnimIndex + 1; idx < currentKeys.length; ++idx){
      if(this.currentAnimations[currentKeys[idx]].influence === 0) continue;
      anim = this.mesh.animations[currentKeys[idx]][
        this.currentAnimations[currentKeys[idx]].frame
      ];
      influence = this.currentAnimations[currentKeys[idx]].influence;
      for(let transformIdx = 0; transformIdx < anim.length; ++transformIdx){
        this.mixedAnimations[transformIdx] += 
          anim[transformIdx] * influence;
      }
    }
  }
  _normalizeAnimationInfluence(){
    const magnitude = Object.values(this.currentAnimations).reduce(
      (accum,anim)=>accum + anim.influence, 0);
    Object.values(this.currentAnimations).forEach(
      animation=>animation.influence /= magnitude);
  }
  brakeAnimation(){
    this.fadeOutSteeringInfluence("left");
    this.fadeOutSteeringInfluence("right");
    this.fadeOutSteeringInfluence("neutral");
    this.fadeInSteeringInfluence("brake", 4);
  }
  steerAnimationLeft(){
    this.fadeOutSteeringInfluence("brake",0.1);
    if(this.currentAnimations["right"].influence != 0){
      this.fadeOutSteeringInfluence("right", 2);
      this.fadeInSteeringInfluence("neutral", 2);
    }
    else if(this.currentAnimations["brake"].influence > 0.7){
      this.steerAnimationNeutral();
    }
    else{
      this.fadeOutSteeringInfluence("neutral");
      this.fadeInSteeringInfluence("left");
    } 
  }
  steerAnimationRight(){
    this.fadeOutSteeringInfluence("brake", 0.1);
    if(this.currentAnimations["left"].influence != 0){
      this.fadeOutSteeringInfluence("left", 2);
      this.fadeInSteeringInfluence("neutral", 2);
    }
    else if(this.currentAnimations["brake"].influence > 0.7){
      this.steerAnimationNeutral();
    }
    else{
      this.fadeOutSteeringInfluence("neutral");
      this.fadeInSteeringInfluence("right");
    } 

  }
  steerAnimationNeutral(){
    this.fadeOutSteeringInfluence("brake", 0.1);
    this.fadeOutSteeringInfluence("right", 2);
    this.fadeOutSteeringInfluence("left", 2);
     this.fadeInSteeringInfluence("neutral",0.2);
  }
  fadeOutSteeringInfluence(key, speed = 1){
    this.currentAnimations[key].influence -= STEER_ANIMATION_LERP_SPEED * speed;
    this.currentAnimations[key].influence = Math.max(
      this.currentAnimations[key].influence, 0
    );
    if(key == 'brake'){
      this.currentAnimations[key].playedThrough = false;
      this.currentAnimations[key].reverse = true;
    }
  }
  fadeInSteeringInfluence(key, speed = 1){
    this.currentAnimations[key].influence += STEER_ANIMATION_LERP_SPEED * speed;
    this.currentAnimations[key].influence = Math.min(
      this.currentAnimations[key].influence, 1
    )
    if(key == 'brake'){
      this.currentAnimations[key].playedThrough = false;
      this.currentAnimations[key].reverse = false;
    }
  }
  _steerControls(){
    if(this.input.back){
      this.friction = BREAK_FRICTION
      this.brakeAnimation();
    }
    else{
      this.friction = SNOWBOARD_FRICTION;
      
      if(this.input.left ? !this.input.right : this.input.right){
        if(this.input.right){
          this._steer(-1);
          this.steerAnimationRight();
        }
        else{
          this.steerAnimationLeft();
          this._steer(1);
        }
      }
      else{
        this.steerAnimationNeutral();
      }
    }
  }
  _updateSegmentNumber(){
    if(this.currentSegmentNumber < this.slope.segmentMatrices.length -1 &&
      this.slope.positionIsPastSegmentStart(this.getPosition(),
      this.currentSegmentNumber + 1)){
        ++this.segmentsSinceStart;
      this.currentSegmentNumber = this.slope.updateCharacterSegmentNumber(this.currentSegmentNumber);
      let triangleAfterMove = this.slope.getSurroundingTriangle(this.getPosition(),
         this.currentSegmentNumber) || this.floorTriangle;
    }
    else if (this.currentSegmentNumber > 0 && !this.slope.positionIsPastSegmentStart(this.getPosition(),this.currentSegmentNumber)) {
      --this.currentSegmentNumber;
      let triangleAfterMove = this.slope.getSurroundingTriangle(this.getPosition(),
         this.currentSegmentNumber) || this.floorTriangle;
    }
  }
  _jump(){
    MathUtils.addVectorsInPlace(this.velocity, this.transformDirection(JUMP_VECTOR),
     this.velocity, 3);
     this.state = "jump";
  }
  _handleCollision(collisionData){
    let volume = MathUtils.vectorMag(this.velocity);
    volume -= COLLISION_INTENSITY_MIN_VELOCITY;
    volume /= COLLISION_INTENSITY_MAX_VELOCITY;
    if(volume > 0){
      AudioMixer.play({buffer: effectBuffers.hit, volume});
    }
    this.velocity = MathUtils.scaleVector(
      MathUtils.bounceVectorOffPlane(this.velocity,
        collisionData.normal),
      this.restitution
    );
    this.setPosition ( 
      MathUtils.addVectors(
        this.getPosition(),
      MathUtils.scaleVector(
        MathUtils.vectorNormalize(collisionData.normal),
        collisionData.penetration
      )
    ));
    this.friction = [0,0,0];
    setTimeout(()=>this.friction = SNOWBOARD_FRICTION,500);
  }
  _handleEdgeCollision(collisionData){
   this._handleCollision(collisionData);
  };
  _handleTreeCollision(collisionData){
    collisionData.normal = collisionData.sphereNormal;
    this._handleCollision(collisionData);
  }
  _handleCollisions(){
    const edgeCollisionData = this.slope.boxIsBeyondEdge(
      this.getTransformationMatrix(), this.boxDimensions, this.currentSegmentNumber);
    const capsulePoint0 = this.getPosition();
    const capsulePoint1 = MathUtils.addVectors(this.getPosition(), this.velocity);
    const obstacleCollisionData = this.slope.capsuleCollidesWithObstacle(capsulePoint0,
    capsulePoint1,this.capsuleRadius,this.currentSegmentNumber);
    const balloonCount = this.slope.capsuleCollidesWithBalloons(capsulePoint0, capsulePoint1,
      this.capsuleRadius,this.currentSegmentNumber);
    if(balloonCount > 0){
      AudioMixer.play({buffer: effectBuffers.collect});
      HUD.addPoints(balloonCount);
    }
    
    if(edgeCollisionData){
      this._handleEdgeCollision(edgeCollisionData);
      return;
    }
    else if(obstacleCollisionData){
      this._handleTreeCollision(obstacleCollisionData);
    }
  }
}
Character.transformedDirectionTemp = [0,0,0];
