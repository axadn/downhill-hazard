/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["distance"] = distance;
const mat_4_multiply = (matrix0, matrix1)=>{
  const result = [];
  let sum = 0;
  for(let i = 0; i < 4; ++i){
    for(let j= 0; j < 4; ++j){
      sum = 0;
      for(let k=0; k < 4; ++k){
        sum += matrix0[i*4 + k] * matrix1[k*4 + j];
      }
      result.push(sum);
    }
  }
  return result;
};
/* harmony export (immutable) */ __webpack_exports__["mat_4_multiply"] = mat_4_multiply;


const identityMatrix4 = [
  1,0,0,0,
  0,1,0,0,
  0,0,1,0,
  0,0,0,1
];
/* harmony export (immutable) */ __webpack_exports__["identityMatrix4"] = identityMatrix4;

const translationMatrix = (x,y,z) =>([
  1,0,0,0,
  0,1,0,0,
  0,0,1,0,
  x,y,z,1
]);
/* harmony export (immutable) */ __webpack_exports__["translationMatrix"] = translationMatrix;

const scaleMatrix =(x,y,z) => ([
  x,0,0,0,
  0,y,0,0,
  0,0,z,0,
  0,0,0,1
]);
/* harmony export (immutable) */ __webpack_exports__["scaleMatrix"] = scaleMatrix;


const xRotationMatrix = radians =>{
  const s = Math.sin(radians);
  const c = Math.cos(radians);
  return[
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1
  ]
};
/* harmony export (immutable) */ __webpack_exports__["xRotationMatrix"] = xRotationMatrix;


const yRotationMatrix = radians => {
  const s = Math.sin(radians);
  const c = Math.cos(radians);
  return[
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
    0, 0, 0, 1
  ];
};
/* harmony export (immutable) */ __webpack_exports__["yRotationMatrix"] = yRotationMatrix;


const zRotationMatrix = radians => {
  const s = Math.sin(radians);
  const c = Math.cos(radians);
  return [
    c, s, 0, 0,
   -s, c, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
};
/* harmony export (immutable) */ __webpack_exports__["zRotationMatrix"] = zRotationMatrix;

const mat_4_transpose = mat =>{
  const new_mat = [];
  for(let i = 0; i < 4; ++i){
    for(let j = 0; j < 4; ++j){
      new_mat.push(mat[i + j * 4]);
    }
  }
  return new_mat;
}
/* harmony export (immutable) */ __webpack_exports__["mat_4_transpose"] = mat_4_transpose;

const inverse_mat4_rot_pos = mat=>{
  /*invert a matrix that contains only rot and pos :
  * break down the matrix into a rotation and position component
  * transpose the rotation component
  * recombine them in reverse order (translation then rotation)
  *

  mat (indices) =
  0  1  2  3
  4  5  6  7
  8  9  10 11
  12 13 14 15

  inverse translation =
  1 0 0 -tx
  0 1 0 -ty
  0 0 1 -tz
  0 0 0  1

  rotation =
  ux vx wx 0
  uy vy vy 0
  uz vz wz 0
  0  0  0  1

  therefore, inverse rotation indexes =
  0  4  8
  1  5  9
  2  6  10

*/
  return mat_4_multiply(
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      -1*mat[12], -1*mat[13], -1*mat[14], 1
    ],
    [
      mat[0], mat[4], mat[8], 0,
      mat[1], mat[5], mat[9], 0,
      mat[2], mat[6], mat[10],0,
      0,      0,     0,       1
    ],
  );
}
/* harmony export (immutable) */ __webpack_exports__["inverse_mat4_rot_pos"] = inverse_mat4_rot_pos;


const swapYZMatrix =[
//x,y,z,w
  1,0,0,0,//x
  0,0,1,0,//y
  0,1,0,0,//z
  0,0,0,1,//w
];
/* harmony export (immutable) */ __webpack_exports__["swapYZMatrix"] = swapYZMatrix;

const simple_perspective_matrix = [
  1,0,0,0,
  0,1,0,0,
  0,0,1,1,
  0,0,0,1
];
/* harmony export (immutable) */ __webpack_exports__["simple_perspective_matrix"] = simple_perspective_matrix;


const translate_mat4 = (mat, x =0, y=0, z=0)=>{
    return mat_4_multiply(
      mat, translationMatrix(x,y,z)
    );
}
/* harmony export (immutable) */ __webpack_exports__["translate_mat4"] = translate_mat4;


const pointIsAbovePlane = (pos, vertex0, vertex1, vertex2)=>{
   // the normal to the plane

  const offsetVector = subtractVectors(pos, vertex1);
  // a vector from a point on the plane to the point we are checking

  return vectorDot(offsetVector, planeNormal(vertex0,
  vertex1, vertex2)) > 0;
}
/* harmony export (immutable) */ __webpack_exports__["pointIsAbovePlane"] = pointIsAbovePlane;


const addVectors = (vector1, vector2)=>{
  const newVector = [];
  for(let i = 0; i< vector1.length; ++i){
    newVector.push(vector1[i] + vector2[i]);
  };
  return newVector;
}
/* harmony export (immutable) */ __webpack_exports__["addVectors"] = addVectors;


const vectorCross = (vector1, vector2)=>([
  vector1[1] * vector2[2] - vector1[2] * vector2[1],
  vector1[2] * vector2[0] - vector1[0] * vector2[2],
  vector1[0] * vector2[1] - vector1[1] * vector2[0]
]);
/* harmony export (immutable) */ __webpack_exports__["vectorCross"] = vectorCross;


const subtractVectors = (vector1, vector2)=>{
  const newVector = [];
  for(let i = 0; i < vector1.length; ++i){
    newVector.push(vector1[i] - vector2[i]);
  }
  return newVector;
}
/* harmony export (immutable) */ __webpack_exports__["subtractVectors"] = subtractVectors;


const vectorDot = (vector1, vector2) =>{
  return vector1[0] * vector2[0] + vector1[1] * vector2[1] +
  vector1[2] * vector2[2];
}
/* harmony export (immutable) */ __webpack_exports__["vectorDot"] = vectorDot;


/* indices
0  1  2  3
4  5  6  7
8  9  10 11
12 13 14 15

*/
const mat4TranslationComponent = (mat) =>{
  return[
    mat[12],
    mat[13],
    mat[14]
  ];
};
/* harmony export (immutable) */ __webpack_exports__["mat4TranslationComponent"] = mat4TranslationComponent;

const mat4RotationComponent = (mat) =>(
    [
      mat[0], mat[1], mat[2], 0,
      mat[4], mat[5], mat[6], 0,
      mat[8], mat[9], mat[10],0,
      0,      0,     0,       1
    ]
);
/* harmony export (immutable) */ __webpack_exports__["mat4RotationComponent"] = mat4RotationComponent;


const vectorSquareMag = vector => {
  let sum = 0;
  for(let i = 0; i < vector.length; ++i){
    sum += vector[i] * vector[i];
  }
  return sum;
};
/* harmony export (immutable) */ __webpack_exports__["vectorSquareMag"] = vectorSquareMag;


const projectVector = (vector, onto)=>{
  const dotProduct = vectorDot(vector, onto);
  return scaleVector(onto, dotProduct/ vectorSquareMag(onto));
};
/* harmony export (immutable) */ __webpack_exports__["projectVector"] = projectVector;


const projectVectorOntoPlane = (vector, planeNormal)=>{
  return subtractVectors(vector.slice(0,3), projectVector(vector, planeNormal));
};
/* harmony export (immutable) */ __webpack_exports__["projectVectorOntoPlane"] = projectVectorOntoPlane;


const planeNormal = (t0, t1, t2) =>{
  let vectorA = subtractVectors(t1, t2);
  let vectorB = subtractVectors(t1, t0);
  return vectorCross(vectorA, vectorB);
};
/* harmony export (immutable) */ __webpack_exports__["planeNormal"] = planeNormal;


const triangleContainsPoint =  (p, p0, p1, p2) =>{
  const n = planeNormal(p0,p1,p2);
  return(
  vectorDot(
    vectorCross(subtractVectors(p1, p0), subtractVectors(p, p0)),
    n) >= 0 &&
    vectorDot(
      vectorCross(subtractVectors(p2, p1), subtractVectors(p, p1)),
      n) >= 0 &&
      vectorDot(
        vectorCross(subtractVectors(p0, p2), subtractVectors(p, p2)),
        n) >= 0);

};
/* harmony export (immutable) */ __webpack_exports__["triangleContainsPoint"] = triangleContainsPoint;


const scaleVector = (vec, scale)=>{
  const newVec = [];
  for(let i = 0; i < vec.length; ++i){
    newVec.push(vec[i] *scale);
  }
  return newVec;
};
/* harmony export (immutable) */ __webpack_exports__["scaleVector"] = scaleVector;


const multiplyVec4ByMatrix4 = (matrix, vec) =>{
  if(vec.length < 4){
    vec = vec.concat(0);
  }
  const result = [];
  for(let i = 0; i < 4; ++i){
    let colResult = 0;
    for(let j = 0; j < 4; ++j){
      colResult += matrix[j * 4 + i] * vec[j];
    }
    result.push(colResult);
  }
  return result;
};
/* harmony export (immutable) */ __webpack_exports__["multiplyVec4ByMatrix4"] = multiplyVec4ByMatrix4;


/**
triangle configuration :
t2

          t1


t0
*/
const vectorMag = (vector)=>{
  return Math.sqrt(vectorSquareMag(vector));
};
/* harmony export (immutable) */ __webpack_exports__["vectorMag"] = vectorMag;


const vectorNormalize = (vector)=>{
  const mag = vectorMag(vector);
  if(mag === 0) return vector;
  return scaleVector(vector, 1/mag);
};
/* harmony export (immutable) */ __webpack_exports__["vectorNormalize"] = vectorNormalize;

const vectorTriangleIntersection = (origin, direction, t0, t1, t2)=>{
  const normal = vectorCross(subtractVectors(t1, t2),
  subtractVectors(t1, t0));
  const diffVector = subtractVectors(origin, t0);
  const magnitude = -1 * vectorDot(diffVector, normal) / vectorDot(direction, normal);
  return addVectors(origin, scaleVector(direction, magnitude));
};
/* harmony export (immutable) */ __webpack_exports__["vectorTriangleIntersection"] = vectorTriangleIntersection;


const axisToVec = (axis,vec)=>{
  const angle = angleBetweenVectors(axis.slice(0,3), vec.slice(0,3));
  if(Math.abs(angle) < 0.005){
    return identityMatrix4;
  }
  const rotAxis = vectorCross(vec, axis);
  return axisAngleToMatrix(rotAxis, angle);
};
/* harmony export (immutable) */ __webpack_exports__["axisToVec"] = axisToVec;


const axisAngleToMatrix = (axis, angle) =>{
  axis = vectorNormalize(axis);
  const x = axis[0];
  const y = axis[1];
  const z = axis[2];
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const t = 1 - c;
  return(
  [
    t*x*x+c, t*x*y-z*s, t*x*z+y*s,0,
    t*x*y+z*s, t*y*y+c, t*y*z-x*s, 0,
    t*x*z-y*s, t*y*z+x*s, t*z*z+c, 0,
    0,         0,         0,       1
  ]);
};
/* harmony export (immutable) */ __webpack_exports__["axisAngleToMatrix"] = axisAngleToMatrix;


const bounceVectorOffPlane = (vector, planeNormal) =>{
  planeNormal = vectorNormalize(planeNormal);
  return addVectors(
    scaleVector(
      planeNormal,
      -2 * vectorDot(vector, planeNormal)
    ),
    vector
  );
};
/* harmony export (immutable) */ __webpack_exports__["bounceVectorOffPlane"] = bounceVectorOffPlane;


function distance(vector0, vector1){
  return vectorMag(subtractVectors(vector0, vector1));
}

const twoVectorsToQuaternion = (vec1, vec2) => {
  const axis = vectorNormalize(vectorCross(vec1, vec2));
  const angle = angleBetweenVectors(vec1, vec2);
  return axisAngleToQuaternion(axis, angle);
};
/* harmony export (immutable) */ __webpack_exports__["twoVectorsToQuaternion"] = twoVectorsToQuaternion;


const axisAngleToQuaternion = (axis, angle) => {
  axis = vectorNormalize(axis);
  const sinOverTwo = Math.sin(angle/2);
  return [
    Math.cos(angle/2),
    axis[0] * sinOverTwo,
    axis[1] * sinOverTwo,
    axis[2] * sinOverTwo
  ];
};
/* harmony export (immutable) */ __webpack_exports__["axisAngleToQuaternion"] = axisAngleToQuaternion;


const angleBetweenVectors = (to, from)=>{
  to = vectorNormalize(to);
  from = vectorNormalize(from);
  const dot =vectorDot(to,from)
  if(Math.abs(dot) <0.005 || Math.abs(dot) > 1){
    return 0;
  }
  return Math.acos(dot);
}
/* harmony export (immutable) */ __webpack_exports__["angleBetweenVectors"] = angleBetweenVectors;

const multiplyQuaternions = (q1, q2) => [
  q1[0] * q2[0] - q1[1] * q2[1] - q1[2] * q2[2] - q1[3] * q2[3],
  q1[0] * q2[1] + q1[1] * q2[0] + q1[2] * q2[3] - q1[3] * q2[2],
  q1[0] * q2[2] - q1[1] * q1[3] + q1[2] * q2[0] + q1[3] * q2[1],
  q1[0] * q2[3] + q1[1] * q2[2] - q1[2] * q2[1] + q1[3] * q2[0]
];
/* harmony export (immutable) */ __webpack_exports__["multiplyQuaternions"] = multiplyQuaternions;


const quaternionToMatrix = (q) =>{
  q = vectorNormalize(q);
  return [
  1 - q[2]*q[2]*2 - q[3]*q[3]*2, q[1]*q[2]*2 - q[3]*q[0]*2, q[1]*q[3]*2 + q[2]*q[0]*2, 0,
  q[1]*q[2]*2 + q[3]*q[0]*2, 1 - q[1]*q[1]*2 - q[3]*q[3]*2, q[2]*q[3]*2 - q[1]*q[0]*2, 0,
  q[1]*q[3]*2 - q[2]*q[0]*2, q[2]*q[3]*2 + q[1]*q[0]*2, 1 - q[1]*q[1]*2 - q[2]*q[2]*2, 0,
  0,                         0,                      0,                                1
  ];
}
/* harmony export (immutable) */ __webpack_exports__["quaternionToMatrix"] = quaternionToMatrix;

/*
0  1   2  3
4  5   6  7
8  9  10 11
12 13  14 15
*/
const setMatrixRotInPlace = (mat, q) =>{
  q = vectorNormalize(q);
  mat[0] = 1 - q[2]*q[2]*2 - q[3]*q[3]*2;
  mat[1] = q[1]*q[2]*2 - q[3]*q[0]*2;
  mat[2] = q[1]*q[3]*2 + q[2]*q[0]*2;
  mat[4] = q[1]*q[2]*2 + q[3]*q[0]*2;
  mat[5] = 1 - q[1]*q[1]*2 - q[3]*q[3]*2;
  mat[6] = q[2]*q[3]*2 - q[1]*q[0]*2;
  mat[8] = q[1]*q[3]*2 - q[2]*q[0]*2;
  mat[9] = q[2]*q[3]*2 + q[1]*q[0]*2;
  mat[10] = 1 - q[1]*q[1]*2 - q[2]*q[2]*2;
};
/* harmony export (immutable) */ __webpack_exports__["setMatrixRotInPlace"] = setMatrixRotInPlace;

const setMatrixLocInPlace = (mat, vec) =>{
  mat[3] = vec[0];
  mat[7] = vec[1];
  mat[11] = vec[2];
};
/* harmony export (immutable) */ __webpack_exports__["setMatrixLocInPlace"] = setMatrixLocInPlace;

const IdentityQuaternion = [1,0,0,0];
/* harmony export (immutable) */ __webpack_exports__["IdentityQuaternion"] = IdentityQuaternion;


const lerpQuaternions = (quat1, quat2, lerpAmount) =>{
  let result = [];
  for(let i = 0; i < 4; ++i){
    result.push(quat1[i] * lerpAmount + quat2[i] * (1 - lerpAmount));
  }
  return result;
}
/* harmony export (immutable) */ __webpack_exports__["lerpQuaternions"] = lerpQuaternions;


const scaleQuaternion = (quat1, scale) => lerpQuaternions(quat1, IdentityQuaternion,  scale);
/* harmony export (immutable) */ __webpack_exports__["scaleQuaternion"] = scaleQuaternion;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__ = __webpack_require__(0);
const DEFAULT_ANIMATION_FRAMERATE = 60;
/* unused harmony export DEFAULT_ANIMATION_FRAMERATE */

const UPDATE_INTERVAL = 33;
/* unused harmony export UPDATE_INTERVAL */

const ANGULAR_DRAG = 0.3;
const DRAG = 0.4;

class GameObject {
  constructor(mesh, transformationMatrix = __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["identityMatrix4"]){
    this.mesh = mesh;
    this._transformationMatrix = transformationMatrix.slice(0,16);
    this._position = __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["mat4TranslationComponent"](transformationMatrix);
    this._rotation = __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["IdentityQuaternion"];
    this.velocity = [0,0,0];
    setInterval(this.update.bind(this), UPDATE_INTERVAL);
    this.angularVelocity = __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["IdentityQuaternion"];
  }

  update(timestamp){
    this._applyVelocityStep();
    this._applyAngularVelocityStep();
    let localVelocity = this.inverseTransformDirection(this.velocity);
    this._applyDragStep();
    this._applyAngularDragStep();
    this.velocity = this.transformDirection(localVelocity);
  }

  _applyVelocityStep(){
    this.setPosition(__WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["addVectors"](this._position, this.velocity));
  }
  _applyAngularVelocityStep(){
    this.setRotation(__WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["multiplyQuaternions"](this.angularVelocity,this.getRotation()));
  }
  addAngularVelocity(quat){
    quat = __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["vectorNormalize"](quat);
    this.angularVelocity =  __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["multiplyQuaternions"](this.angularVelocity, quat);
    this.angularVelocity = __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["vectorNormalize"](this.angularVelocity);
  }
  _applyDragStep(){
    for(let i = 0; i < this.velocity.length; ++i){
      this.velocity[i] -= this.velocity[i] * DRAG;
    }
  }
  _applyAngularDragStep(){
    this.angularVelocity = __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["scaleQuaternion"](this.angularVelocity, 1 - ANGULAR_DRAG);
  }

  transformPoint(point){
    return __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["multiplyVec4ByMatrix4"](
      this._transformationMatrix, point.concat([1])).slice(0,3);

  }
  transformDirection(direction){
    return __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["multiplyVec4ByMatrix4"](
      __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["mat4RotationComponent"](this._transformationMatrix),
       direction.concat([1])).slice(0,3);
  }
  inverseTransformPoint(point){
    return __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["multiplyVec4ByMatrix4"](
      __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["inverse_mat4_rot_pos"](this._transformationMatrix),
      point.concat([1])
    ).slice(0,3);
  }
  inverseTransformDirection(direction){
    return __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["multiplyVec4ByMatrix4"](
      __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["inverse_mat4_rot_pos"](
        __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["mat4RotationComponent"](this._transformationMatrix)
      ),
      direction.concat([1])
    ).slice(0,3);
  }
  /*
   0  1   2  3
   4  5   6  7
   8  9  10 11
  12 13  14 15
  */
  setPosition(position){
    this._position = position;
    this._transformationMatrix[12] = position[0];
    this._transformationMatrix[13] = position[1];
    this._transformationMatrix[14] = position[2];
  }
  getRotation(){
    return this._rotation;
  }
  getPosition(){
    return this._position;
  }
  setRotation(rotQuat){
    this._rotation = __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["vectorNormalize"](rotQuat);
    __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["setMatrixRotInPlace"](this._transformationMatrix,this._rotation);
  }
  getTransformationMatrix(){
    return this._transformationMatrix;
  }
  playAnimation(name, loop = true){
    this.isPlayingAnimation = true;
    this.currentAnimation = name;
    this.currentAnimationFrame = 0;
    this.animationWillLoop = loop;
    this.currentAnimationFramerate = DEFAULT_ANIMATION_FRAMERATE;
  }
  updateFrame(){
    ++this.currentAnimationFrame;
    if(this.currentAnimationFrame = this.mesh.animations[this.currentAnimation].length){
      if(this.animationWillLoop){
        this.currentAnimationFrame = 0;
      }
      else{
        --this.currentAnimationFrame;
        this.isPlayingAnimation = false;
      }
    }
  }
  shouldUpdate(timestamp){
    return (this.lastTimeStamp &&
      timestamp - this.lastTimeStamp > 1000 / this.currentAnimationFramerate);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameObject;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export approximateCollisionNormal */
/* unused harmony export boxIntersectsBox */
/* harmony export (immutable) */ __webpack_exports__["c"] = sphereCollidesCapsule;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math_utils__ = __webpack_require__(0);


const COLLISION_REJECTION = 0.05;
/* unused harmony export COLLISION_REJECTION */


const movingBoxIntersectsBox = (matrix0, dimensions0, matrix1, dimensions1, moveVector) =>{
  const colliderPoint = boxIntersectsBox(matrix0, dimensions0, matrix1, dimensions1) || 
  boxIntersectsBox(matrix1, dimensions1, matrix0, dimensions0);
  if(colliderPoint){
    return {normal: approximateCollisionNormal(
      __WEBPACK_IMPORTED_MODULE_0__math_utils__["subtractVectors"](colliderPoint, moveVector.concat(0)), matrix1, dimensions1),
      colliderPoint
    };
  }
};
/* harmony export (immutable) */ __webpack_exports__["b"] = movingBoxIntersectsBox;

function approximateCollisionNormal(position, boxMatrix, boxDimensions){
  const transformedPoint = __WEBPACK_IMPORTED_MODULE_0__math_utils__["multiplyVec4ByMatrix4"](
    __WEBPACK_IMPORTED_MODULE_0__math_utils__["inverse_mat4_rot_pos"](boxMatrix), position);
  let maxDimensionIndex;
  let maxDistFromSurface = 0;
  let distFromSurface;
  for(let i = 0; i < 2; ++i){
    distFromSurface = Math.abs(Math.abs(transformedPoint[i]) - boxDimensions[i]);
    if(distFromSurface > maxDistFromSurface){
      maxDistFromSurface = distFromSurface;
      maxDimensionIndex = i;
    }
  }
  const normal = [0,0,0,0];
  normal[maxDimensionIndex] = (transformedPoint[maxDimensionIndex] < 0) ? -1 : 1;
  return __WEBPACK_IMPORTED_MODULE_0__math_utils__["multiplyVec4ByMatrix4"](boxMatrix, normal).slice(0,3);
};
function boxIntersectsBox(matrix0, dimensions0, matrix1, dimensions1){
  let transformedPoint, pointCollides;
  const worldCoordsPoints = boxColliderToPoints(matrix0, dimensions0);
  for(let i = 0; i < worldCoordsPoints.length; ++i){
    transformedPoint = __WEBPACK_IMPORTED_MODULE_0__math_utils__["multiplyVec4ByMatrix4"](
      __WEBPACK_IMPORTED_MODULE_0__math_utils__["inverse_mat4_rot_pos"](matrix1),
      worldCoordsPoints[i]
    );
    pointCollides = true;
    for(let j = 0; j < 3; ++j){
      if(transformedPoint[j] > dimensions1[j] ||
         transformedPoint[j] < -1* dimensions1[j]){
           pointCollides = false;
           break;
      }
    }
    if(pointCollides){
       return worldCoordsPoints[i];
    }
  }
  return false;
}

function sphereCollidesCapsule(sphereOrigin, sphereRadius,
capsulePoint0, capsulePoint1, capsuleRadius){
  const capsuleVector = __WEBPACK_IMPORTED_MODULE_0__math_utils__["subtractVectors"](capsulePoint1, capsulePoint0);
  if (capsuleVector[0] === 0 && capsuleVector[1] === 0 && capsuleVector[2] === 0){
    capsuleVector[0] = 0.01;
  }
  const point0ToSphereOrigin = __WEBPACK_IMPORTED_MODULE_0__math_utils__["subtractVectors"](sphereOrigin, capsulePoint0);
  const point0ToSphereAngle = __WEBPACK_IMPORTED_MODULE_0__math_utils__["angleBetweenVectors"](point0ToSphereOrigin, capsuleVector);
  const point1ToSphereOrigin = __WEBPACK_IMPORTED_MODULE_0__math_utils__["subtractVectors"](sphereOrigin, capsulePoint1);
  const point1ToSphereAngle = __WEBPACK_IMPORTED_MODULE_0__math_utils__["angleBetweenVectors"](point1ToSphereOrigin,
     __WEBPACK_IMPORTED_MODULE_0__math_utils__["scaleVector"](capsuleVector, -1)
    );
  const maxDist = sphereRadius + capsuleRadius;
  let dist;
  if(point0ToSphereAngle < Math.PI/2 &&
    point1ToSphereAngle < Math.PI/2){
    dist =  __WEBPACK_IMPORTED_MODULE_0__math_utils__["vectorMag"](point0ToSphereOrigin) * Math.sin(point0ToSphereAngle);
    if(dist <= maxDist){
      const rotationMatrix = __WEBPACK_IMPORTED_MODULE_0__math_utils__["axisAngleToMatrix"](
        __WEBPACK_IMPORTED_MODULE_0__math_utils__["vectorCross"](point0ToSphereOrigin, capsuleVector),
        Math.PI/2
      );
      const capsuleNormal = __WEBPACK_IMPORTED_MODULE_0__math_utils__["multiplyVec4ByMatrix4"](rotationMatrix, capsuleVector.concat(0)).slice(0,3);
      if(isNaN(capsuleNormal[0])){
        debugger;
      }
      return {capsuleNormal,
      sphereNormal: __WEBPACK_IMPORTED_MODULE_0__math_utils__["scaleVector"](capsuleNormal, -1),
      penetration: maxDist - dist};
    }
    return false;
  } else if((dist = __WEBPACK_IMPORTED_MODULE_0__math_utils__["distance"](capsulePoint0, sphereOrigin)) <= maxDist){
    const capsuleNormal = __WEBPACK_IMPORTED_MODULE_0__math_utils__["subtractVectors"](sphereOrigin, capsulePoint0);
    return {capsuleNormal,
      sphereNormal: __WEBPACK_IMPORTED_MODULE_0__math_utils__["scaleVector"](capsuleNormal, -1),
      penetration: maxDist - dist
    };
  } else if((dist = __WEBPACK_IMPORTED_MODULE_0__math_utils__["distance"](capsulePoint1, sphereOrigin)) <= maxDist){
    const capsuleNormal = __WEBPACK_IMPORTED_MODULE_0__math_utils__["subtractVectors"](sphereOrigin, capsulePoint1);
    return {capsuleNormal,
      sphereNormal: __WEBPACK_IMPORTED_MODULE_0__math_utils__["scaleVector"](capsuleNormal, -1),
      penetration: maxDist - dist
    };
  }
  return false;
}

const boxColliderToPoints = (matrix, dimensions) =>{
  const points = [];
  for(let xDirection = -1; xDirection <= 1; xDirection+= 2){
    for(let yDirection = -1; yDirection<= 1; yDirection+= 2){
      for(let zDirection = -1; zDirection<= 1; zDirection+= 2){
        points.push(
          __WEBPACK_IMPORTED_MODULE_0__math_utils__["multiplyVec4ByMatrix4"](
            matrix, [dimensions[0] * xDirection,
            dimensions[1] * yDirection,
            dimensions[2] * zDirection, 1]
          )
        );
      }
    }
  }
  return points;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = boxColliderToPoints;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__ = __webpack_require__(0);

function isZeroQuat(quat){
  return quat[0]=== 0 && quat[1] === 0 && quat[2] === 0 && quat[3] === 1;
}
class Mesh {
  constructor({vertices, faces, bones, colors, uvs, skinWeights, skinIndices, animations, bindPose,
    colored, skinned, textured, rasterizer, textureBuffer, img_src, mode2, data, action_file}){
    this.vertices = vertices;
    this.colored = colored;
    this.textured = textured;
    this.skinned = skinned;
    this.faces = faces;
    this.bones = bones;
    this.colors = colors;
    this.uvs = uvs;
    this.boneWeights = skinWeights;
    this.boneIndices = skinIndices;
    this.animations ={};
    if(mode2){
      const indices = faces;
      this.faces = [];
      
       for(let i = 0; i <indices.length;i+=10){
         this.faces.push(indices[i+1]);
         this.faces.push(indices[i+2]);
         this.faces.push(indices[i+3]);
       }

      let frame, newAction, matrix;
      Object.keys(action_file.actions).forEach(actionName=>{
        newAction = [];
        Object.keys(action_file.actions[actionName]).forEach(keyFrame=>{
          frame = [];
          bones.forEach(bone=>{
            matrix = 
            __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["mat_4_transpose"](
              __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["mat_4_multiply"](
                action_file.actions[actionName][keyFrame][action_file.jointNameIndices[bone.name]],
                action_file.inverseBindPoses[action_file.jointNameIndices[bone.name]]
              )
            );
            matrix.forEach(el=>frame.push(el));
          });
          newAction.push(frame);
        });
        this.animations[actionName] = newAction;
      });
     }
  //   if(animations && animations.length) {
  //     this.boneWeights = skinWeights;
  //     this.boneIndices = skinIndices;
  //     let frame, frameMultiplied;
  //     let matrix;
  //     let bindMats = [];
  //     bones.forEach(bone=>{
  //       let rot; 
  //       if(isZeroQuat(bone.rotq)){
  //         rot = MathUtils.identityMatrix4;
  //       }
  //       rot = MathUtils.quaternionToMatrix(bone.rotq);
  //       let matrix;
  //       matrix = MathUtils.mat_4_multiply(
  //         rot,
  //         MathUtils.translationMatrix(...bone.pos)
  //       );
  //       if(bone.parent !== -1){
  //         matrix = MathUtils.mat_4_multiply(
  //           matrix,
  //           bindMats[bone.parent],
  //         );
  //      }
  //      bindMats.push(
  //        matrix
  //      );
  //    });
  //    bindMats = bindMats.map(mat=> MathUtils.inverse_mat4_rot_pos(mat));
  //     animations.forEach(anim=>{
  //       const frames = [];
  //       const numFrames = anim.hierarchy[0].keys.length;
  //       for(let i = 0; i < numFrames ; ++i){
  //         frame = [];
  //         anim.hierarchy.forEach((bone, boneIdx)=> {
  //           let rot;
  //           if(isZeroQuat(bone.keys[i].rot)){
  //             rot = MathUtils.identityMatrix4;
  //           }
  //           rot = MathUtils.quaternionToMatrix(bone.keys[i].rot);

  //           matrix =
  //               MathUtils.mat_4_multiply(
  //                rot,
  //                MathUtils.translationMatrix(...bone.keys[i].pos)
  //              );
  //           if(bones[boneIdx].parent != -1){
  //              matrix = MathUtils.mat_4_multiply(matrix, frame[bones[boneIdx].parent]);
  //           }
  //           frame.push(matrix);
  //         });
  //         frameMultiplied = [];
  //         frame.forEach((mat,matIdx)=> MathUtils.mat_4_transpose(
  //           MathUtils.mat_4_multiply(bindMats[matIdx], mat)).forEach(el=>frameMultiplied.push(el)));
  //         frames.push(frameMultiplied);
  //       }

  //       this.animations[anim.name] = frames;
  //     });
  //  } 
    this.img_src = img_src;
    if(textureBuffer){
        this.texture = textureBuffer;
      this.textured = true;

    }
    else if (textured && img_src){
      this.texture = rasterizer.bufferTexture(img_src);
    }

  }
  inverseBindVertices(){
  }
  setDirty(){ //call this after modifying mesh data on-the-fly
    //to let the rasterizer know to update its buffers
    this.dirty = true;
  }
  setClean(){
    this.dirty = false;
  }
  packedVertex(idx){ //x,y,z coords for a vertex by element idx
    const posIdx = 3*idx;
    const result = [];
    for(let i = posIdx; i < posIdx + 3; ++i){
      result.push(this.vertices[i]);
    }
    return result;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Mesh;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_math_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_webgl_utils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__input_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__untitled_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__boxman__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__boxman___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__boxman__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__snowboard_actions__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__snowboard_actions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__snowboard_actions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game_object_game_object__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__skybox_json__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__skybox_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__skybox_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__character_character__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__slope_slope__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__game_object_mesh__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__hud_hud__ = __webpack_require__(14);












document.addEventListener("DOMContentLoaded", main);
function gameLoop(timestamp){
  __WEBPACK_IMPORTED_MODULE_11__hud_hud__["d" /* updateTime */](timestamp);
  rasterizer.drawObjects.bind(rasterizer)(timestamp);
  window.requestAnimationFrame(gameLoop);
}
function main(){
  const rasterizer = new __WEBPACK_IMPORTED_MODULE_1__utils_webgl_utils__["a" /* ObjectsRasterizer */]();
  const slope = new __WEBPACK_IMPORTED_MODULE_9__slope_slope__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__utils_math_utils__["translationMatrix"](0,-3,-4), rasterizer, "snow.jpg");
  window.slope = slope;

  __WEBPACK_IMPORTED_MODULE_4__boxman___default.a.skinned = true;
  __WEBPACK_IMPORTED_MODULE_4__boxman___default.a.colored = true;
  __WEBPACK_IMPORTED_MODULE_4__boxman___default.a.mode2 = true;
  __WEBPACK_IMPORTED_MODULE_4__boxman___default.a.action_file = __WEBPACK_IMPORTED_MODULE_5__snowboard_actions___default.a;
  //boxManMesh.textured = true;
  const boxMan = new __WEBPACK_IMPORTED_MODULE_8__character_character__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_10__game_object_mesh__["a" /* default */](__WEBPACK_IMPORTED_MODULE_4__boxman___default.a), undefined, slope);
  boxMan.mesh.name = "boxy";
  //boxMan.playAnimation("rest");
  rasterizer.objects.boxMan = boxMan;
  __WEBPACK_IMPORTED_MODULE_7__skybox_json___default.a.img_src = "skybox.jpg";
  __WEBPACK_IMPORTED_MODULE_7__skybox_json___default.a.textured = true;
  __WEBPACK_IMPORTED_MODULE_7__skybox_json___default.a.rasterizer = rasterizer;
  let skyMesh = new __WEBPACK_IMPORTED_MODULE_10__game_object_mesh__["a" /* default */](__WEBPACK_IMPORTED_MODULE_7__skybox_json___default.a);
  skyMesh.buffers = rasterizer.sendMeshToGPU(skyMesh);
  rasterizer.skyBox = new __WEBPACK_IMPORTED_MODULE_6__game_object_game_object__["a" /* default */](skyMesh);
  __WEBPACK_IMPORTED_MODULE_11__hud_hud__["b" /* setStartTime */](Date.now());
  window.requestAnimationFrame(gameLoop);
//  window.requestAnimationFrame(
//    () => rasterizer.draw(boxMan));

  window.rasterizer = rasterizer;
  rasterizer.cameraTarget = boxMan;
  slope.generateSegment();

  //slope.mesh.buffers = rasterizer.sendMeshToGPU(slope.mesh);
  window.addEventListener('keydown', handleKeyDown(rasterizer));
  rasterizer.position[1] -= 2;
  rasterizer.position[0] += 0.3;
  rasterizer.rotation[0] -= 0.4;
  rasterizer.position[2] += 0.7;
  rasterizer.objects.slope = slope;
  rasterizer.position = [0,-6,0];

  window.addEventListener("keydown", __WEBPACK_IMPORTED_MODULE_2__input_js__["a" /* keyDown */](boxMan));
  window.addEventListener("keyup", __WEBPACK_IMPORTED_MODULE_2__input_js__["b" /* keyUp */](boxMan));

}
const handleKeyDown = rasterizer => e => {
  switch(e.key){
    case "ArrowUp":
      rasterizer.rotation[0] += 0.1;
      break;
    case "ArrowDown":
      rasterizer.rotation[0] -= 0.1;
      break;
    case "ArrowLeft":
      rasterizer.rotation[2] += 0.1;
      break;
    case "ArrowRight":
    rasterizer.rotation[0] -= 0.1;
      break;
    case "a":
      rasterizer.position[1] += 0.1;
      break;
    case "w":
      rasterizer.position[1] -=0.1;
      break;
    case "s":
    rasterizer.position[2] += 0.1;
      break;
    case "d":
    rasterizer.position[2] -= 0.1;
      break;
  }

}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createProgram */
/* unused harmony export compileShader */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_object_game_object__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hud_hud__ = __webpack_require__(14);
const DEFAULT_CAMERA_DIST = 1;
const BONE_INFLUENCES = 2;






class ObjectsRasterizer{
  constructor(scale= 0.5, swapYZ = true){
    window.rasterizer = this;
    const canvas = document.querySelector("#glCanvas");
    const canvas2 = document.querySelector("#flat-canvas");
    this.gl = canvas.getContext("webgl");
    this.ctx = canvas2.getContext('2d');
    if(!this.gl){
      alert("Unable to initialize WebGL. Your browser or machine may not support it");
      return;
    }

    this.cameraDist = DEFAULT_CAMERA_DIST;
    this.viewMatrix = __WEBPACK_IMPORTED_MODULE_0__math_utils__["identityMatrix4"];
    this.perspectiveMatrix = __WEBPACK_IMPORTED_MODULE_0__math_utils__["mat_4_multiply"](__WEBPACK_IMPORTED_MODULE_0__math_utils__["simple_perspective_matrix"],
      __WEBPACK_IMPORTED_MODULE_0__math_utils__["scaleMatrix"](scale, scale, scale));
    if(swapYZ){
      this.perspectiveMatrix = __WEBPACK_IMPORTED_MODULE_0__math_utils__["mat_4_multiply"](__WEBPACK_IMPORTED_MODULE_0__math_utils__["swapYZMatrix"], this.perspectiveMatrix)
    }
    this.compileDefaultShaders();
    //this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.rotation = [0,0,0];
    this.position = [0,0,0];

    this.objects = {};
    this.camera = new __WEBPACK_IMPORTED_MODULE_1__game_object_game_object__["a" /* default */]();
  }
  compileDefaultShaders(){
    this.defaultProgram = this.compileByID("default-vertex-shader", "default-fragment-shader");
    this.coloredProgram = this.compileByID("colored-vertex-shader", "colored-fragment-shader");
    this.skinnedColoredProgram = this.compileByID("skinned-colored-vertex-shader", "colored-fragment-shader");
    this.skinnedTexturedProgram = this.compileByID("skinned-textured-vertex-shader",
     "textured-fragment-shader");
     this.texturedProgram = this.compileByID("textured-vertex-shader",
      "textured-fragment-shader");
  }
  compileByID(vertexId, fragmentId){
    const vertexShaderSource = document.getElementById(vertexId).text;
    const fragmentShaderSource = document.getElementById(fragmentId).text;
    const vertexShader = compileShader(this.gl, this.gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSource);
    return createProgram(this.gl, vertexShader, fragmentShader);
  }
  calculateStrideLength(skinned, textured, colored){
    let strideLength = skinned ?  12 + BONE_INFLUENCES * 2 : 12;
    if(textured) strideLength += 8;
    else if (colored) strideLength += 4;
    return strideLength;
  }

  /*
   create gpu buffer layout:
    pos                   bone weights      bone indexes
    float*3 = 12 bytes + unsigned byte *2 + unsigned byte *2
    = 16 bytes per vertex if skinned or 12 if unskinned

  add this if textured:
    uvs
    unsigned_short * 2 = 4 bytes

  or add this if using vertex colors instead of textures:
    colors
    byte * 4 = 4 bytes

  */
  meshToArrayBuffer(mesh){
    let vertexIdx = 0;
    let weightIdx = 0;
    let boneIdx = 0;
    let uvIdx = 0;
    let colorIdx = 0;
    let offset = 0;
    const vertexDataLength = this.calculateStrideLength(mesh.skinned,
      mesh.textured, mesh.colored)* mesh.vertices.length/3;
    const vertexData = new ArrayBuffer(vertexDataLength);
    const dataView = new DataView(vertexData);
    const littleEndian = true;
    while(offset < vertexDataLength){
      for(let i = 0; i < 3; ++i){
          dataView.setFloat32(offset, mesh.vertices[vertexIdx++],littleEndian);
        offset += 4;
      }
      if(mesh.skinned){
        for(let i= 0; i< BONE_INFLUENCES; ++i){
          dataView.setUint8(offset++, mesh.boneWeights[weightIdx++]*255, littleEndian);
        }
        for(let i = 0; i <BONE_INFLUENCES; ++i){
          dataView.setUint8(offset++, mesh.boneIndices[boneIdx++], littleEndian);
        }
      }
      if(mesh.textured){
          dataView.setFloat32(offset,  mesh.uvs[uvIdx++], littleEndian);
            offset += 4;
          dataView.setFloat32(offset, -1*mesh.uvs[uvIdx++], littleEndian);
            offset += 4;
      }
      else if(mesh.colored){
        for(let i = 0; i < 3; ++i){
          dataView.setUint8(offset++, mesh.colors[colorIdx++]*255, littleEndian);
        }
        dataView.setUint8(offset++, 255, littleEndian);
      }
    }
  return vertexData;
  }

  determineProgram(skinned, textured, colored){
    if(skinned){
      if(textured){
        return this.skinnedTexturedProgram;
      }else if(colored){
        return this.skinnedColoredProgram;
      }
      else{
        return this.defaultProgram;
      }
    }
    else{
      if(textured){
        return this.texturedProgram;
      }else if(colored){
        return this.coloredProgram;
      }
      else{
        return this.defaultProgram;
      }
    }
  }

  sendMeshToGPU(mesh){
    const verticesBuffer = this.gl.createBuffer();
    const verticesData = this.meshToArrayBuffer(mesh);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, verticesBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, verticesData, this.gl.STATIC_DRAW);
    const facesBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, facesBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.faces), this.gl.STATIC_DRAW);
    mesh.setClean();
    return {verticesBuffer, facesBuffer};
  }

  removeMeshFromGPU({verticesBuffer, facesBuffer}){
    this.gl.deleteBuffer(verticesBuffer);
    this.gl.deleteBuffer(facesBuffer);
  }
  removeBufferFromGPU(buffer){
    this.gl.deleteBuffer(buffer);
  };
  bufferTexture(img_src){
    const texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D,texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
    const img = new Image();
    img.src = img_src;
    img.crossOrigin = "";
    img.addEventListener("load", ()=>{
      this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
      this.gl.generateMipmap(this.gl.TEXTURE_2D);
    });
    return texture;
  }
  adjustToCanvas(){
    this.gl.canvas.width = this.gl.canvas.clientWidth;
    this.gl.canvas.height = this.gl.canvas.clientHeight;
    this.gl.viewport(0,0, this.gl.canvas.clientWidth, this.gl.canvas.clientHeight);
  }

  drawSkyBox(){
    this.skyBox.setPosition(this.camera.getPosition());
    this.draw(this.skyBox);
  }
  clipSpaceToFlatCanvasCoords(x,y){
    const canvas = document.querySelector("#flat-canvas");
    x*= canvas.width/2; 
    x+= canvas.width/2;
    y*= -canvas.height/2;
    y+= canvas.height/2;
    return [x,y];
  }

  debugLine(start, end){
    start = __WEBPACK_IMPORTED_MODULE_0__math_utils__["multiplyVec4ByMatrix4"](this.viewMatrix, start.concat(1));
    start = __WEBPACK_IMPORTED_MODULE_0__math_utils__["scaleVector"](start, 1/start[3]);
    start = this.clipSpaceToFlatCanvasCoords(start[0],start[1]);
    end = __WEBPACK_IMPORTED_MODULE_0__math_utils__["multiplyVec4ByMatrix4"](this.viewMatrix, end.concat(1));
    end = __WEBPACK_IMPORTED_MODULE_0__math_utils__["scaleVector"](end, 1/end[3]);
    end = this.clipSpaceToFlatCanvasCoords(end[0], end[1]);
    this.ctx.beginPath();
    this.ctx.moveTo(start[0],start[1]);
    this.ctx.lineTo(end[0],end[1]);
    this.ctx.stroke();
  }



  debugCircle(pos, radius){
    pos = __WEBPACK_IMPORTED_MODULE_0__math_utils__["multiplyVec4ByMatrix4"](this.viewMatrix, pos.concat(0));
    this.ctx.arc(pos[0], pos[1], radius, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  draw(obj){
    const program = this.determineProgram(obj.mesh.skinned,
        obj.mesh.textured, obj.mesh.colored);
    this.gl.useProgram(program);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, obj.mesh.buffers.verticesBuffer);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, obj.mesh.buffers.facesBuffer);

    const posAttrIndex = this.gl.getAttribLocation(program, "a_pos");
    const strideLength = this.calculateStrideLength(obj.mesh.skinned, obj.mesh.textured, obj.mesh.colored);
    //attribute index, size, data type, normalized?, stride length, offset
    let offset = 0;
    this.gl.vertexAttribPointer(posAttrIndex, 3, this.gl.FLOAT, false, strideLength, offset);
    this.gl.enableVertexAttribArray(posAttrIndex);
    offset += 12;
    if(obj.mesh.skinned){
      const weightsAttrIndex = this.gl.getAttribLocation(program, "a_weights");
      const boneIndicesIndex = this.gl.getAttribLocation(program, "a_bone_indices");
      this.gl.vertexAttribPointer(weightsAttrIndex, BONE_INFLUENCES, this.gl.UNSIGNED_BYTE, true, strideLength, offset);
      this.gl.enableVertexAttribArray(weightsAttrIndex);
      offset += BONE_INFLUENCES;
      this.gl.vertexAttribPointer(boneIndicesIndex, BONE_INFLUENCES, this.gl.UNSIGNED_BYTE, false, strideLength, offset);
      this.gl.enableVertexAttribArray(boneIndicesIndex);
      offset += BONE_INFLUENCES;

      //fill the bones with identity matrix
    //  let identities = [];
    //  for(let i = 0; i < 20; ++i){
      //  identities = identities.concat(MathUtils.identityMatrix4);
    //  }
        // let composed = [];
         const boneTransforms = obj.mesh.animations[obj.currentAnimation][obj.currentAnimationFrame];
        // for(let i = 0; i < boneTransforms.length; ++i){
        //   if(obj.mesh.bones[i].parent !== -1){
        //     composed.push(MathUtils.mat_4_multiply(
        //       composed[obj.mesh.bones[i].parent], boneTransforms[i]));
        //   }
        //   else{
        //     composed.push(boneTransforms[i]);
        //   }
        // }
        // let unBound = [];
        // for(let i = 0; i < boneTransforms.length; ++i){
        //   unBound = unBound.concat(MathUtils.mat_4_multiply(
        //     boneTransforms[i],
        //     MathUtils.inverse_mat4_rot_pos(obj.mesh.bones[i].bindPose)
        //     ));
        // }
        //for(let i = 0; i < boneTransforms.length; ++i){
        //  inverselyBound = inverselyBound.concat(
        //    MathUtils.mat_4_multiply(
        //      MathUtils.inverse_mat4_rot_pos(obj.mesh.bones[i].bindPose),
        //        boneTransforms[i],
        //    ));
        //}
        const boneTransformsLocation = this.gl.getUniformLocation(program, "boneTransforms");
        this.gl.uniformMatrix4fv(boneTransformsLocation, false, boneTransforms);
    }

    if(obj.mesh.textured){
      const uvsAttrIndex = this.gl.getAttribLocation(program, "a_uvs");
      this.gl.vertexAttribPointer(uvsAttrIndex, 2, this.gl.FLOAT, false, strideLength, offset);
      this.gl.enableVertexAttribArray(uvsAttrIndex);
      offset += 8;
      this.gl.bindTexture(this.gl.TEXTURE_2D, obj.mesh.texture);

      // Fill the texture with a 1x1 blue pixel. TODO: Use actual image textures
    }
    else if(obj.mesh.colored){
      const colorsAttrIndex = this.gl.getAttribLocation(program, "vColor");
      this.gl.vertexAttribPointer(colorsAttrIndex, 4, this.gl.UNSIGNED_BYTE, true, strideLength, offset);
      this.gl.enableVertexAttribArray(colorsAttrIndex);
      offset += 4;
    }
    let viewMatrix = __WEBPACK_IMPORTED_MODULE_0__math_utils__["mat_4_multiply"](obj.getTransformationMatrix(), this.viewMatrix);
    const viewMatrixUniformLocation = this.gl.getUniformLocation(program, "view_matrix");
    this.gl.uniformMatrix4fv(viewMatrixUniformLocation,false, viewMatrix);

    this.gl.drawElements(this.gl.TRIANGLES, obj.mesh.faces.length, this.gl.UNSIGNED_SHORT,0);
  }
  test(){
    const vertexBuffer = this.gl.createBuffer();
    const vertices = [
      -1,1,0.0,
      -1,-1,0.0,
      1,-1,0.0, 
   ];

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);


    const indicesBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2]),this.gl.STATIC_DRAW);
    this.gl.useProgram(this.defaultProgram);


    const viewMatrixUniformLocation = this.gl.getUniformLocation(this.defaultProgram, "view_matrix");
    const viewMatrix = __WEBPACK_IMPORTED_MODULE_0__math_utils__["identityMatrix4"];
    this.gl.uniformMatrix4fv(viewMatrixUniformLocation,false, viewMatrix);

    const posAttrIndex = this.gl.getAttribLocation(this.defaultProgram, "a_pos");
    this.gl.vertexAttribPointer(posAttrIndex, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.clearColor(0.5, 0.5, 0.5, 0.9);
    this.gl.drawElements(this.gl.TRIANGLES, 3, this.gl.UNSIGNED_SHORT,0);
  }
  positionCamera(){
    this.camera.setPosition(this.cameraTarget.transformPoint([0, -18, 6]));
    const newPos = this.camera.getPosition();
    newPos[2] = this.cameraTarget.getPosition()[2] + 10;
    this.camera.setPosition(newPos);
    let rotation = this.cameraTarget.getRotation();
    const upLocal = this.cameraTarget.inverseTransformDirection([0,0,1]);
    const angleToUp = __WEBPACK_IMPORTED_MODULE_0__math_utils__["angleBetweenVectors"]([0,0,1], upLocal);
    const upAlignAxis = __WEBPACK_IMPORTED_MODULE_0__math_utils__["vectorCross"](upLocal, [0,0,1]);
    this.camera.setRotation(
      __WEBPACK_IMPORTED_MODULE_0__math_utils__["multiplyQuaternions"](
        __WEBPACK_IMPORTED_MODULE_0__math_utils__["axisAngleToQuaternion"](upAlignAxis, angleToUp),
        rotation
      )
    );
  }
  calculateViewMatrix(){
    //let cameraMatrix =  MathUtils.swapYZMatrix;
    let cameraMatrix = this.camera.getTransformationMatrix();
    let viewMatrix = __WEBPACK_IMPORTED_MODULE_0__math_utils__["inverse_mat4_rot_pos"](cameraMatrix);
    viewMatrix = __WEBPACK_IMPORTED_MODULE_0__math_utils__["mat_4_multiply"](viewMatrix, __WEBPACK_IMPORTED_MODULE_0__math_utils__["swapYZMatrix"])
    viewMatrix = __WEBPACK_IMPORTED_MODULE_0__math_utils__["mat_4_multiply"](viewMatrix, __WEBPACK_IMPORTED_MODULE_0__math_utils__["simple_perspective_matrix"]);
    return viewMatrix;
  }

  drawObjects(timestamp){
    __WEBPACK_IMPORTED_MODULE_2__hud_hud__["d" /* updateTime */](Date.now());
    this.adjustToCanvas();
    this.gl.clearColor(0.8, 0.8, 0.81, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.positionCamera();
    this.viewMatrix = this.calculateViewMatrix();
    if(this.skyBox){
      this.drawSkyBox();
    }
    const objKeys = Object.keys(this.objects);
    let obj;
    for(let i = 0; i < objKeys.length; ++i){
      obj = this.objects[objKeys[i]];
      if(obj.mesh.dirty || !obj.mesh.buffers){
        obj.mesh.buffers = this.sendMeshToGPU(obj.mesh);
      }
      if(obj.mesh.skinned && obj.shouldUpdate(timestamp)){
          obj.updateFrame();
      }
      obj.lastTimeStamp = timestamp;
      this.draw(obj);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjectsRasterizer;

// create a rasterization program from a vertex and fragment shader
function createProgram(gl, vertexShader, fragmentShader){
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
    alert("shader program intialization failed");
  }
  return program;
}

//compile a shader
function compileShader(gl, type, source){
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
    alert("Could not compile shader" + gl.getShaderInfoLog(shader));
  }
  return shader;
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const keyDown = character => e=>{
  switch(e.key){
    case "ArrowLeft":
    case "a":
      character.input.left = true;
      break;
    case "ArrowRight":
    case "d":
      character.input.right = true;
      break;
    case "ArrowDown":
    case "s":
      character.input.back = true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = keyDown;


const keyUp = character => e => {
  switch(e.key){
    case "ArrowLeft":
    case "a":
      character.input.left = false;
      break;
    case "ArrowRight":
    case "d":
      character.input.right = false;
      break;
    case "ArrowDown":
    case "s":
      character.input.back = false;
      break;
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = keyUp;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const monkeyData ={
    "vertices": [0.46875, -0.757812, 0.242188, 0.4375, -0.765625, 0.164062, 0.5, -0.6875, 0.09375, -0.5, -0.6875, 0.09375, -0.4375, -0.765625, 0.164062, -0.46875, -0.757812, 0.242188, 0.5625, -0.671875, 0.242188, 0.5, -0.6875, 0.09375, 0.546875, -0.578125, 0.054688, -0.546875, -0.578125, 0.054688, -0.5, -0.6875, 0.09375, -0.5625, -0.671875, 0.242188, 0.5, -0.6875, 0.09375, 0.351562, -0.71875, 0.03125, 0.351562, -0.617188, -0.023438, -0.351562, -0.617188, -0.023438, -0.351562, -0.71875, 0.03125, -0.5, -0.6875, 0.09375, 0.4375, -0.765625, 0.164062, 0.351562, -0.78125, 0.132812, 0.351562, -0.71875, 0.03125, -0.351562, -0.71875, 0.03125, -0.351562, -0.78125, 0.132812, -0.4375, -0.765625, 0.164062, 0.351562, -0.78125, 0.132812, 0.273438, -0.796875, 0.164062, 0.203125, -0.742188, 0.09375, -0.203125, -0.742188, 0.09375, -0.273438, -0.796875, 0.164062, -0.351562, -0.78125, 0.132812, 0.351562, -0.71875, 0.03125, 0.203125, -0.742188, 0.09375, 0.15625, -0.648438, 0.054688, -0.15625, -0.648438, 0.054688, -0.203125, -0.742188, 0.09375, -0.351562, -0.71875, 0.03125, 0.140625, -0.742188, 0.242188, 0.078125, -0.65625, 0.242188, 0.15625, -0.648438, 0.054688, -0.140625, -0.742188, 0.242188, -0.203125, -0.742188, 0.09375, -0.15625, -0.648438, 0.054688, 0.242188, -0.796875, 0.242188, 0.140625, -0.742188, 0.242188, 0.203125, -0.742188, 0.09375, -0.242188, -0.796875, 0.242188, -0.273438, -0.796875, 0.164062, -0.203125, -0.742188, 0.09375, 0.242188, -0.796875, 0.242188, 0.273438, -0.796875, 0.328125, 0.203125, -0.742188, 0.390625, -0.203125, -0.742188, 0.390625, -0.273438, -0.796875, 0.328125, -0.242188, -0.796875, 0.242188, 0.203125, -0.742188, 0.390625, 0.15625, -0.648438, 0.4375, 0.078125, -0.65625, 0.242188, -0.203125, -0.742188, 0.390625, -0.140625, -0.742188, 0.242188, -0.078125, -0.65625, 0.242188, 0.351562, -0.71875, 0.453125, 0.351562, -0.617188, 0.515625, 0.15625, -0.648438, 0.4375, -0.351562, -0.71875, 0.453125, -0.203125, -0.742188, 0.390625, -0.15625, -0.648438, 0.4375, 0.351562, -0.78125, 0.359375, 0.351562, -0.71875, 0.453125, 0.203125, -0.742188, 0.390625, -0.351562, -0.78125, 0.359375, -0.273438, -0.796875, 0.328125, -0.203125, -0.742188, 0.390625, 0.4375, -0.765625, 0.328125, 0.5, -0.6875, 0.390625, 0.351562, -0.71875, 0.453125, -0.4375, -0.765625, 0.328125, -0.351562, -0.78125, 0.359375, -0.351562, -0.71875, 0.453125, 0.5, -0.6875, 0.390625, 0.546875, -0.578125, 0.4375, 0.351562, -0.617188, 0.515625, -0.5, -0.6875, 0.390625, -0.351562, -0.71875, 0.453125, -0.351562, -0.617188, 0.515625, 0.5625, -0.671875, 0.242188, 0.625, -0.5625, 0.242188, 0.546875, -0.578125, 0.4375, -0.5625, -0.671875, 0.242188, -0.5, -0.6875, 0.390625, -0.546875, -0.578125, 0.4375, 0.46875, -0.757812, 0.242188, 0.5625, -0.671875, 0.242188, 0.5, -0.6875, 0.390625, -0.46875, -0.757812, 0.242188, -0.4375, -0.765625, 0.328125, -0.5, -0.6875, 0.390625, 0.4375, -0.765625, 0.328125, 0.445312, -0.78125, 0.335938, 0.476562, -0.773438, 0.242188, -0.4375, -0.765625, 0.328125, -0.46875, -0.757812, 0.242188, -0.476562, -0.773438, 0.242188, 0.351562, -0.78125, 0.359375, 0.351562, -0.804688, 0.375, 0.445312, -0.78125, 0.335938, -0.351562, -0.78125, 0.359375, -0.4375, -0.765625, 0.328125, -0.445312, -0.78125, 0.335938, 0.273438, -0.796875, 0.328125, 0.265625, -0.820312, 0.335938, 0.351562, -0.804688, 0.375, -0.273438, -0.796875, 0.328125, -0.351562, -0.78125, 0.359375, -0.351562, -0.804688, 0.375, 0.242188, -0.796875, 0.242188, 0.226562, -0.820312, 0.242188, 0.265625, -0.820312, 0.335938, -0.242188, -0.796875, 0.242188, -0.273438, -0.796875, 0.328125, -0.265625, -0.820312, 0.335938, 0.242188, -0.796875, 0.242188, 0.273438, -0.796875, 0.164062, 0.265625, -0.820312, 0.15625, -0.265625, -0.820312, 0.15625, -0.273438, -0.796875, 0.164062, -0.242188, -0.796875, 0.242188, 0.273438, -0.796875, 0.164062, 0.351562, -0.78125, 0.132812, 0.351562, -0.804688, 0.117188, -0.351562, -0.804688, 0.117188, -0.351562, -0.78125, 0.132812, -0.273438, -0.796875, 0.164062, 0.351562, -0.78125, 0.132812, 0.4375, -0.765625, 0.164062, 0.445312, -0.78125, 0.15625, -0.445312, -0.78125, 0.15625, -0.4375, -0.765625, 0.164062, -0.351562, -0.78125, 0.132812, 0.4375, -0.765625, 0.164062, 0.46875, -0.757812, 0.242188, 0.476562, -0.773438, 0.242188, -0.476562, -0.773438, 0.242188, -0.46875, -0.757812, 0.242188, -0.4375, -0.765625, 0.164062, 0.351562, -0.828125, 0.242188, 0.445312, -0.78125, 0.15625, 0.476562, -0.773438, 0.242188, -0.476562, -0.773438, 0.242188, -0.445312, -0.78125, 0.15625, -0.351562, -0.828125, 0.242188, 0.351562, -0.804688, 0.117188, 0.445312, -0.78125, 0.15625, 0.351562, -0.828125, 0.242188, -0.351562, -0.828125, 0.242188, -0.445312, -0.78125, 0.15625, -0.351562, -0.804688, 0.117188, 0.351562, -0.828125, 0.242188, 0.265625, -0.820312, 0.15625, 0.351562, -0.804688, 0.117188, -0.351562, -0.804688, 0.117188, -0.265625, -0.820312, 0.15625, -0.351562, -0.828125, 0.242188, 0.351562, -0.828125, 0.242188, 0.226562, -0.820312, 0.242188, 0.265625, -0.820312, 0.15625, -0.265625, -0.820312, 0.15625, -0.226562, -0.820312, 0.242188, -0.351562, -0.828125, 0.242188, 0.351562, -0.828125, 0.242188, 0.265625, -0.820312, 0.335938, 0.226562, -0.820312, 0.242188, -0.226562, -0.820312, 0.242188, -0.265625, -0.820312, 0.335938, -0.351562, -0.828125, 0.242188, 0.351562, -0.828125, 0.242188, 0.351562, -0.804688, 0.375, 0.265625, -0.820312, 0.335938, -0.265625, -0.820312, 0.335938, -0.351562, -0.804688, 0.375, -0.351562, -0.828125, 0.242188, 0.351562, -0.828125, 0.242188, 0.445312, -0.78125, 0.335938, 0.351562, -0.804688, 0.375, -0.351562, -0.804688, 0.375, -0.445312, -0.78125, 0.335938, -0.351562, -0.828125, 0.242188, 0.351562, -0.828125, 0.242188, 0.476562, -0.773438, 0.242188, 0.445312, -0.78125, 0.335938, -0.445312, -0.78125, 0.335938, -0.476562, -0.773438, 0.242188, -0.351562, -0.828125, 0.242188, 0.164062, -0.632812, -0.929688, 0.0, -0.640625, -0.945312, 0.0, -0.578125, -0.984375, -0.164062, -0.632812, -0.929688, -0.179688, -0.554688, -0.96875, 0.0, -0.578125, -0.984375, 0.234375, -0.632812, -0.914062, 0.164062, -0.632812, -0.929688, 0.179688, -0.554688, -0.96875, -0.234375, -0.632812, -0.914062, -0.328125, -0.523438, -0.945312, -0.179688, -0.554688, -0.96875, 0.367188, -0.53125, -0.890625, 0.265625, -0.664062, -0.820312, 0.234375, -0.632812, -0.914062, -0.234375, -0.632812, -0.914062, -0.265625, -0.664062, -0.820312, -0.367188, -0.53125, -0.890625, 0.351562, -0.570312, -0.695312, 0.25, -0.6875, -0.703125, 0.265625, -0.664062, -0.820312, -0.265625, -0.664062, -0.820312, -0.25, -0.6875, -0.703125, -0.351562, -0.570312, -0.695312, 0.3125, -0.570312, -0.4375, 0.210938, -0.710938, -0.445312, 0.25, -0.6875, -0.703125, -0.25, -0.6875, -0.703125, -0.210938, -0.710938, -0.445312, -0.3125, -0.570312, -0.4375, 0.203125, -0.5625, -0.1875, 0.4375, -0.53125, -0.140625, 0.398438, -0.671875, -0.046875, -0.398438, -0.671875, -0.046875, -0.4375, -0.53125, -0.140625, -0.203125, -0.5625, -0.1875, 0.632812, -0.539062, -0.039062, 0.617188, -0.625, 0.054688, 0.398438, -0.671875, -0.046875, -0.632812, -0.539062, -0.039062, -0.4375, -0.53125, -0.140625, -0.398438, -0.671875, -0.046875, 0.632812, -0.539062, -0.039062, 0.828125, -0.445312, 0.148438, 0.726562, -0.601562, 0.203125, -0.726562, -0.601562, 0.203125, -0.828125, -0.445312, 0.148438, -0.632812, -0.539062, -0.039062, 0.859375, -0.59375, 0.429688, 0.742188, -0.65625, 0.375, 0.726562, -0.601562, 0.203125, -0.859375, -0.59375, 0.429688, -0.828125, -0.445312, 0.148438, -0.726562, -0.601562, 0.203125, 0.710938, -0.625, 0.484375, 0.6875, -0.726562, 0.414062, 0.742188, -0.65625, 0.375, -0.710938, -0.625, 0.484375, -0.859375, -0.59375, 0.429688, -0.742188, -0.65625, 0.375, 0.492188, -0.6875, 0.601562, 0.4375, -0.796875, 0.546875, 0.6875, -0.726562, 0.414062, -0.492188, -0.6875, 0.601562, -0.710938, -0.625, 0.484375, -0.6875, -0.726562, 0.414062, 0.492188, -0.6875, 0.601562, 0.320312, -0.734375, 0.757812, 0.3125, -0.835938, 0.640625, -0.3125, -0.835938, 0.640625, -0.320312, -0.734375, 0.757812, -0.492188, -0.6875, 0.601562, 0.15625, -0.757812, 0.71875, 0.203125, -0.851562, 0.617188, 0.3125, -0.835938, 0.640625, -0.15625, -0.757812, 0.71875, -0.320312, -0.734375, 0.757812, -0.3125, -0.835938, 0.640625, 0.0625, -0.75, 0.492188, 0.101562, -0.84375, 0.429688, 0.203125, -0.851562, 0.617188, -0.0625, -0.75, 0.492188, -0.15625, -0.757812, 0.71875, -0.203125, -0.851562, 0.617188, 0.0, -0.742188, 0.429688, 0.0, -0.820312, 0.351562, 0.101562, -0.84375, 0.429688, 0.0, -0.742188, 0.429688, -0.0625, -0.75, 0.492188, -0.101562, -0.84375, 0.429688, 0.25, -0.757812, 0.46875, 0.203125, -0.851562, 0.617188, 0.101562, -0.84375, 0.429688, -0.25, -0.757812, 0.46875, -0.164062, -0.773438, 0.414062, -0.101562, -0.84375, 0.429688, 0.25, -0.757812, 0.46875, 0.328125, -0.742188, 0.476562, 0.3125, -0.835938, 0.640625, -0.3125, -0.835938, 0.640625, -0.328125, -0.742188, 0.476562, -0.25, -0.757812, 0.46875, 0.4375, -0.796875, 0.546875, 0.3125, -0.835938, 0.640625, 0.328125, -0.742188, 0.476562, -0.4375, -0.796875, 0.546875, -0.429688, -0.71875, 0.4375, -0.328125, -0.742188, 0.476562, 0.6875, -0.726562, 0.414062, 0.4375, -0.796875, 0.546875, 0.429688, -0.71875, 0.4375, -0.6875, -0.726562, 0.414062, -0.601562, -0.664062, 0.375, -0.429688, -0.71875, 0.4375, 0.742188, -0.65625, 0.375, 0.6875, -0.726562, 0.414062, 0.601562, -0.664062, 0.375, -0.742188, -0.65625, 0.375, -0.640625, -0.648438, 0.296875, -0.601562, -0.664062, 0.375, 0.726562, -0.601562, 0.203125, 0.742188, -0.65625, 0.375, 0.640625, -0.648438, 0.296875, -0.726562, -0.601562, 0.203125, -0.625, -0.648438, 0.1875, -0.640625, -0.648438, 0.296875, 0.617188, -0.625, 0.054688, 0.726562, -0.601562, 0.203125, 0.625, -0.648438, 0.1875, -0.617188, -0.625, 0.054688, -0.492188, -0.671875, 0.0625, -0.625, -0.648438, 0.1875, 0.398438, -0.671875, -0.046875, 0.617188, -0.625, 0.054688, 0.492188, -0.671875, 0.0625, -0.398438, -0.671875, -0.046875, -0.375, -0.703125, 0.015625, -0.492188, -0.671875, 0.0625, 0.203125, -0.742188, 0.09375, 0.125, -0.8125, -0.101562, 0.398438, -0.671875, -0.046875, -0.398438, -0.671875, -0.046875, -0.125, -0.8125, -0.101562, -0.203125, -0.742188, 0.09375, 0.203125, -0.742188, 0.09375, 0.164062, -0.75, 0.140625, 0.0, -0.726562, 0.046875, 0.0, -0.726562, 0.046875, -0.164062, -0.75, 0.140625, -0.203125, -0.742188, 0.09375, 0.101562, -0.84375, 0.429688, 0.0, -0.820312, 0.351562, 0.125, -0.765625, 0.304688, -0.101562, -0.84375, 0.429688, -0.164062, -0.773438, 0.414062, -0.125, -0.765625, 0.304688, 0.125, -0.765625, 0.304688, 0.0, -0.820312, 0.351562, 0.0, -0.765625, 0.210938, 0.0, -0.765625, 0.210938, 0.0, -0.820312, 0.351562, -0.125, -0.765625, 0.304688, 0.164062, -0.75, 0.140625, 0.132812, -0.757812, 0.210938, 0.0, -0.765625, 0.210938, -0.164062, -0.75, 0.140625, 0.0, -0.726562, 0.046875, 0.0, -0.765625, 0.210938, 0.0625, -0.695312, -0.882812, 0.0, -0.6875, -0.890625, 0.0, -0.640625, -0.945312, 0.0, -0.640625, -0.945312, 0.0, -0.6875, -0.890625, -0.0625, -0.695312, -0.882812, 0.117188, -0.710938, -0.835938, 0.0625, -0.695312, -0.882812, 0.164062, -0.632812, -0.929688, -0.164062, -0.632812, -0.929688, -0.0625, -0.695312, -0.882812, -0.117188, -0.710938, -0.835938, 0.117188, -0.710938, -0.835938, 0.234375, -0.632812, -0.914062, 0.265625, -0.664062, -0.820312, -0.117188, -0.710938, -0.835938, -0.109375, -0.734375, -0.71875, -0.265625, -0.664062, -0.820312, 0.210938, -0.710938, -0.445312, 0.078125, -0.75, -0.445312, 0.117188, -0.734375, -0.6875, -0.117188, -0.734375, -0.6875, -0.078125, -0.75, -0.445312, -0.210938, -0.710938, -0.445312, 0.109375, -0.734375, -0.71875, 0.265625, -0.664062, -0.820312, 0.25, -0.6875, -0.703125, -0.25, -0.6875, -0.703125, -0.265625, -0.664062, -0.820312, -0.109375, -0.734375, -0.71875, 0.0, -0.742188, -0.328125, 0.0, -0.75, -0.445312, 0.078125, -0.75, -0.445312, 0.0, -0.742188, -0.328125, -0.085938, -0.742188, -0.289062, -0.078125, -0.75, -0.445312, 0.078125, -0.75, -0.445312, 0.0, -0.75, -0.445312, 0.0, -0.734375, -0.679688, -0.078125, -0.75, -0.445312, -0.117188, -0.734375, -0.6875, 0.0, -0.734375, -0.679688, 0.109375, -0.734375, -0.71875, 0.117188, -0.734375, -0.6875, 0.0, -0.734375, -0.679688, -0.109375, -0.734375, -0.71875, 0.0, -0.734375, -0.765625, 0.0, -0.734375, -0.679688, 0.125, -0.75, -0.226562, 0.132812, -0.796875, -0.226562, 0.09375, -0.78125, -0.273438, -0.09375, -0.78125, -0.273438, -0.132812, -0.796875, -0.226562, -0.125, -0.75, -0.226562, 0.109375, -0.78125, -0.132812, 0.132812, -0.796875, -0.226562, 0.125, -0.75, -0.226562, -0.109375, -0.78125, -0.132812, -0.101562, -0.742188, -0.148438, -0.125, -0.75, -0.226562, 0.039062, -0.78125, -0.125, 0.109375, -0.78125, -0.132812, 0.101562, -0.742188, -0.148438, -0.039062, -0.78125, -0.125, 0.0, -0.742188, -0.140625, -0.101562, -0.742188, -0.148438, 0.0, -0.796875, -0.1875, 0.039062, -0.78125, -0.125, 0.0, -0.742188, -0.140625, 0.0, -0.796875, -0.1875, 0.0, -0.75, -0.195312, 0.0, -0.742188, -0.140625, 0.085938, -0.742188, -0.289062, 0.09375, -0.78125, -0.273438, 0.0, -0.78125, -0.320312, -0.085938, -0.742188, -0.289062, 0.0, -0.742188, -0.328125, 0.0, -0.78125, -0.320312, 0.09375, -0.78125, -0.273438, 0.078125, -0.804688, -0.25, 0.0, -0.804688, -0.289062, -0.09375, -0.78125, -0.273438, 0.0, -0.78125, -0.320312, 0.0, -0.804688, -0.289062, 0.0, -0.796875, -0.1875, 0.0, -0.828125, -0.203125, 0.046875, -0.8125, -0.148438, -0.046875, -0.8125, -0.148438, 0.0, -0.828125, -0.203125, 0.0, -0.796875, -0.1875, 0.039062, -0.78125, -0.125, 0.046875, -0.8125, -0.148438, 0.09375, -0.8125, -0.15625, -0.09375, -0.8125, -0.15625, -0.046875, -0.8125, -0.148438, -0.039062, -0.78125, -0.125, 0.09375, -0.8125, -0.15625, 0.109375, -0.828125, -0.226562, 0.132812, -0.796875, -0.226562, -0.09375, -0.8125, -0.15625, -0.109375, -0.78125, -0.132812, -0.132812, -0.796875, -0.226562, 0.132812, -0.796875, -0.226562, 0.109375, -0.828125, -0.226562, 0.078125, -0.804688, -0.25, -0.078125, -0.804688, -0.25, -0.109375, -0.828125, -0.226562, -0.132812, -0.796875, -0.226562, 0.109375, -0.828125, -0.226562, 0.09375, -0.8125, -0.15625, 0.046875, -0.8125, -0.148438, -0.109375, -0.828125, -0.226562, 0.0, -0.828125, -0.203125, -0.046875, -0.8125, -0.148438, 0.0, -0.828125, -0.203125, 0.0, -0.804688, -0.289062, 0.078125, -0.804688, -0.25, -0.078125, -0.804688, -0.25, 0.0, -0.804688, -0.289062, 0.0, -0.828125, -0.203125, 0.0, -0.742188, -0.140625, 0.101562, -0.742188, -0.148438, 0.125, -0.8125, -0.101562, -0.125, -0.8125, -0.101562, -0.101562, -0.742188, -0.148438, 0.0, -0.742188, -0.140625, 0.101562, -0.742188, -0.148438, 0.125, -0.75, -0.226562, 0.164062, -0.710938, -0.242188, -0.164062, -0.710938, -0.242188, -0.125, -0.75, -0.226562, -0.101562, -0.742188, -0.148438, 0.085938, -0.742188, -0.289062, 0.179688, -0.710938, -0.3125, 0.164062, -0.710938, -0.242188, -0.085938, -0.742188, -0.289062, -0.125, -0.75, -0.226562, -0.164062, -0.710938, -0.242188, 0.078125, -0.75, -0.445312, 0.210938, -0.710938, -0.445312, 0.179688, -0.710938, -0.3125, -0.078125, -0.75, -0.445312, -0.085938, -0.742188, -0.289062, -0.179688, -0.710938, -0.3125, 0.257812, -0.554688, -0.3125, 0.179688, -0.710938, -0.3125, 0.210938, -0.710938, -0.445312, -0.257812, -0.554688, -0.3125, -0.3125, -0.570312, -0.4375, -0.210938, -0.710938, -0.445312, 0.234375, -0.554688, -0.25, 0.164062, -0.710938, -0.242188, 0.179688, -0.710938, -0.3125, -0.234375, -0.554688, -0.25, -0.257812, -0.554688, -0.3125, -0.179688, -0.710938, -0.3125, 0.203125, -0.5625, -0.1875, 0.125, -0.8125, -0.101562, 0.164062, -0.710938, -0.242188, -0.164062, -0.710938, -0.242188, -0.125, -0.8125, -0.101562, -0.203125, -0.5625, -0.1875, 0.0, -0.734375, -0.765625, 0.0, -0.71875, -0.773438, 0.09375, -0.726562, -0.742188, 0.0, -0.734375, -0.765625, -0.109375, -0.734375, -0.71875, -0.09375, -0.726562, -0.742188, 0.117188, -0.710938, -0.835938, 0.109375, -0.734375, -0.71875, 0.09375, -0.726562, -0.742188, -0.09375, -0.726562, -0.742188, -0.109375, -0.734375, -0.71875, -0.117188, -0.710938, -0.835938, 0.0625, -0.695312, -0.882812, 0.117188, -0.710938, -0.835938, 0.09375, -0.710938, -0.820312, -0.09375, -0.710938, -0.820312, -0.117188, -0.710938, -0.835938, -0.0625, -0.695312, -0.882812, 0.0, -0.6875, -0.890625, 0.0625, -0.695312, -0.882812, 0.046875, -0.6875, -0.867188, -0.046875, -0.6875, -0.867188, -0.0625, -0.695312, -0.882812, 0.0, -0.6875, -0.890625, 0.046875, -0.6875, -0.867188, 0.046875, -0.632812, -0.851562, 0.0, -0.632812, -0.859375, -0.046875, -0.6875, -0.867188, 0.0, -0.6875, -0.875, 0.0, -0.632812, -0.859375, 0.046875, -0.6875, -0.867188, 0.09375, -0.710938, -0.820312, 0.09375, -0.640625, -0.8125, -0.09375, -0.640625, -0.8125, -0.09375, -0.710938, -0.820312, -0.046875, -0.6875, -0.867188, 0.09375, -0.710938, -0.820312, 0.09375, -0.726562, -0.742188, 0.09375, -0.664062, -0.75, -0.09375, -0.664062, -0.75, -0.09375, -0.726562, -0.742188, -0.09375, -0.710938, -0.820312, 0.0, -0.71875, -0.773438, 0.0, -0.65625, -0.78125, 0.09375, -0.664062, -0.75, 0.0, -0.71875, -0.773438, -0.09375, -0.726562, -0.742188, -0.09375, -0.664062, -0.75, 0.0, -0.65625, -0.78125, 0.0, -0.632812, -0.859375, 0.046875, -0.632812, -0.851562, -0.046875, -0.632812, -0.851562, 0.0, -0.632812, -0.859375, 0.0, -0.65625, -0.78125, 0.09375, -0.664062, -0.75, 0.046875, -0.632812, -0.851562, 0.09375, -0.640625, -0.8125, -0.09375, -0.640625, -0.8125, -0.046875, -0.632812, -0.851562, -0.09375, -0.664062, -0.75, 0.132812, -0.757812, 0.210938, 0.164062, -0.75, 0.140625, 0.1875, -0.773438, 0.15625, -0.1875, -0.773438, 0.15625, -0.164062, -0.75, 0.140625, -0.132812, -0.757812, 0.210938, 0.125, -0.765625, 0.304688, 0.132812, -0.757812, 0.210938, 0.171875, -0.78125, 0.21875, -0.171875, -0.78125, 0.21875, -0.132812, -0.757812, 0.210938, -0.125, -0.765625, 0.304688, 0.125, -0.765625, 0.304688, 0.179688, -0.78125, 0.296875, 0.210938, -0.78125, 0.375, -0.125, -0.765625, 0.304688, -0.164062, -0.773438, 0.414062, -0.210938, -0.78125, 0.375, 0.203125, -0.742188, 0.09375, 0.226562, -0.78125, 0.109375, 0.1875, -0.773438, 0.15625, -0.203125, -0.742188, 0.09375, -0.164062, -0.75, 0.140625, -0.1875, -0.773438, 0.15625, 0.203125, -0.742188, 0.09375, 0.375, -0.703125, 0.015625, 0.375, -0.742188, 0.0625, -0.375, -0.742188, 0.0625, -0.375, -0.703125, 0.015625, -0.203125, -0.742188, 0.09375, 0.375, -0.703125, 0.015625, 0.492188, -0.671875, 0.0625, 0.476562, -0.71875, 0.101562, -0.476562, -0.71875, 0.101562, -0.492188, -0.671875, 0.0625, -0.375, -0.703125, 0.015625, 0.492188, -0.671875, 0.0625, 0.625, -0.648438, 0.1875, 0.578125, -0.679688, 0.195312, -0.578125, -0.679688, 0.195312, -0.625, -0.648438, 0.1875, -0.492188, -0.671875, 0.0625, 0.625, -0.648438, 0.1875, 0.640625, -0.648438, 0.296875, 0.585938, -0.6875, 0.289062, -0.585938, -0.6875, 0.289062, -0.640625, -0.648438, 0.296875, -0.625, -0.648438, 0.1875, 0.601562, -0.664062, 0.375, 0.5625, -0.695312, 0.351562, 0.585938, -0.6875, 0.289062, -0.601562, -0.664062, 0.375, -0.640625, -0.648438, 0.296875, -0.585938, -0.6875, 0.289062, 0.429688, -0.71875, 0.4375, 0.421875, -0.773438, 0.398438, 0.5625, -0.695312, 0.351562, -0.429688, -0.71875, 0.4375, -0.601562, -0.664062, 0.375, -0.5625, -0.695312, 0.351562, 0.429688, -0.71875, 0.4375, 0.328125, -0.742188, 0.476562, 0.335938, -0.757812, 0.429688, -0.335938, -0.757812, 0.429688, -0.328125, -0.742188, 0.476562, -0.429688, -0.71875, 0.4375, 0.328125, -0.742188, 0.476562, 0.25, -0.757812, 0.46875, 0.273438, -0.773438, 0.421875, -0.273438, -0.773438, 0.421875, -0.25, -0.757812, 0.46875, -0.328125, -0.742188, 0.476562, 0.25, -0.757812, 0.46875, 0.164062, -0.773438, 0.414062, 0.210938, -0.78125, 0.375, -0.210938, -0.78125, 0.375, -0.164062, -0.773438, 0.414062, -0.25, -0.757812, 0.46875, 0.273438, -0.773438, 0.421875, 0.210938, -0.78125, 0.375, 0.234375, -0.757812, 0.359375, -0.234375, -0.757812, 0.359375, -0.210938, -0.78125, 0.375, -0.273438, -0.773438, 0.421875, 0.335938, -0.757812, 0.429688, 0.273438, -0.773438, 0.421875, 0.28125, -0.765625, 0.398438, -0.28125, -0.765625, 0.398438, -0.273438, -0.773438, 0.421875, -0.335938, -0.757812, 0.429688, 0.335938, -0.757812, 0.429688, 0.335938, -0.75, 0.40625, 0.414062, -0.75, 0.390625, -0.335938, -0.757812, 0.429688, -0.421875, -0.773438, 0.398438, -0.414062, -0.75, 0.390625, 0.421875, -0.773438, 0.398438, 0.414062, -0.75, 0.390625, 0.53125, -0.679688, 0.335938, -0.421875, -0.773438, 0.398438, -0.5625, -0.695312, 0.351562, -0.53125, -0.679688, 0.335938, 0.585938, -0.6875, 0.289062, 0.5625, -0.695312, 0.351562, 0.53125, -0.679688, 0.335938, -0.53125, -0.679688, 0.335938, -0.5625, -0.695312, 0.351562, -0.585938, -0.6875, 0.289062, 0.585938, -0.6875, 0.289062, 0.554688, -0.671875, 0.28125, 0.546875, -0.671875, 0.210938, -0.585938, -0.6875, 0.289062, -0.578125, -0.679688, 0.195312, -0.546875, -0.671875, 0.210938, 0.476562, -0.71875, 0.101562, 0.578125, -0.679688, 0.195312, 0.546875, -0.671875, 0.210938, -0.546875, -0.671875, 0.210938, -0.578125, -0.679688, 0.195312, -0.476562, -0.71875, 0.101562, 0.476562, -0.71875, 0.101562, 0.460938, -0.703125, 0.117188, 0.375, -0.726562, 0.085938, -0.476562, -0.71875, 0.101562, -0.375, -0.742188, 0.0625, -0.375, -0.726562, 0.085938, 0.375, -0.742188, 0.0625, 0.375, -0.726562, 0.085938, 0.242188, -0.757812, 0.125, -0.375, -0.742188, 0.0625, -0.226562, -0.78125, 0.109375, -0.242188, -0.757812, 0.125, 0.1875, -0.773438, 0.15625, 0.226562, -0.78125, 0.109375, 0.242188, -0.757812, 0.125, -0.242188, -0.757812, 0.125, -0.226562, -0.78125, 0.109375, -0.1875, -0.773438, 0.15625, 0.210938, -0.78125, 0.375, 0.179688, -0.78125, 0.296875, 0.195312, -0.757812, 0.296875, -0.195312, -0.757812, 0.296875, -0.179688, -0.78125, 0.296875, -0.210938, -0.78125, 0.375, 0.179688, -0.78125, 0.296875, 0.171875, -0.78125, 0.21875, 0.195312, -0.75, 0.226562, -0.195312, -0.75, 0.226562, -0.171875, -0.78125, 0.21875, -0.179688, -0.78125, 0.296875, 0.171875, -0.78125, 0.21875, 0.1875, -0.773438, 0.15625, 0.203125, -0.75, 0.171875, -0.203125, -0.75, 0.171875, -0.1875, -0.773438, 0.15625, -0.171875, -0.78125, 0.21875, 0.0, -0.742188, 0.429688, 0.0625, -0.75, 0.492188, 0.109375, -0.609375, 0.460938, -0.109375, -0.609375, 0.460938, -0.0625, -0.75, 0.492188, 0.0, -0.742188, 0.429688, 0.0625, -0.75, 0.492188, 0.15625, -0.757812, 0.71875, 0.195312, -0.617188, 0.664062, -0.195312, -0.617188, 0.664062, -0.15625, -0.757812, 0.71875, -0.0625, -0.75, 0.492188, 0.320312, -0.734375, 0.757812, 0.335938, -0.59375, 0.6875, 0.195312, -0.617188, 0.664062, -0.320312, -0.734375, 0.757812, -0.15625, -0.757812, 0.71875, -0.195312, -0.617188, 0.664062, 0.492188, -0.6875, 0.601562, 0.484375, -0.554688, 0.554688, 0.335938, -0.59375, 0.6875, -0.492188, -0.6875, 0.601562, -0.320312, -0.734375, 0.757812, -0.335938, -0.59375, 0.6875, 0.710938, -0.625, 0.484375, 0.679688, -0.492188, 0.453125, 0.484375, -0.554688, 0.554688, -0.710938, -0.625, 0.484375, -0.492188, -0.6875, 0.601562, -0.484375, -0.554688, 0.554688, 0.710938, -0.625, 0.484375, 0.859375, -0.59375, 0.429688, 0.796875, -0.460938, 0.40625, -0.796875, -0.460938, 0.40625, -0.859375, -0.59375, 0.429688, -0.710938, -0.625, 0.484375, 0.828125, -0.445312, 0.148438, 0.773438, -0.375, 0.164062, 0.796875, -0.460938, 0.40625, -0.828125, -0.445312, 0.148438, -0.859375, -0.59375, 0.429688, -0.796875, -0.460938, 0.40625, 0.828125, -0.445312, 0.148438, 0.632812, -0.539062, -0.039062, 0.601562, -0.414062, 0.0, -0.601562, -0.414062, 0.0, -0.632812, -0.539062, -0.039062, -0.828125, -0.445312, 0.148438, 0.632812, -0.539062, -0.039062, 0.4375, -0.53125, -0.140625, 0.4375, -0.46875, -0.09375, -0.4375, -0.46875, -0.09375, -0.4375, -0.53125, -0.140625, -0.632812, -0.539062, -0.039062, 0.0, -0.28125, -0.484375, 0.179688, -0.257812, -0.414062, 0.125, -0.359375, -0.539062, 0.0, -0.28125, -0.484375, 0.0, -0.320312, -0.570312, -0.125, -0.359375, -0.539062, 0.0, -0.320312, -0.570312, 0.125, -0.359375, -0.539062, 0.140625, -0.367188, -0.757812, 0.0, -0.320312, -0.570312, 0.0, -0.34375, -0.804688, -0.140625, -0.367188, -0.757812, 0.0, -0.34375, -0.804688, 0.140625, -0.367188, -0.757812, 0.164062, -0.4375, -0.945312, 0.0, -0.34375, -0.804688, 0.0, -0.460938, -0.976562, -0.164062, -0.4375, -0.945312, 0.179688, -0.554688, -0.96875, 0.0, -0.578125, -0.984375, 0.0, -0.460938, -0.976562, 0.0, -0.460938, -0.976562, 0.0, -0.578125, -0.984375, -0.179688, -0.554688, -0.96875, 0.328125, -0.523438, -0.945312, 0.179688, -0.554688, -0.96875, 0.164062, -0.4375, -0.945312, -0.164062, -0.4375, -0.945312, -0.179688, -0.554688, -0.96875, -0.328125, -0.523438, -0.945312, 0.367188, -0.53125, -0.890625, 0.328125, -0.523438, -0.945312, 0.328125, -0.398438, -0.914062, -0.328125, -0.398438, -0.914062, -0.328125, -0.523438, -0.945312, -0.367188, -0.53125, -0.890625, 0.351562, -0.570312, -0.695312, 0.367188, -0.53125, -0.890625, 0.289062, -0.382812, -0.710938, -0.289062, -0.382812, -0.710938, -0.367188, -0.53125, -0.890625, -0.351562, -0.570312, -0.695312, 0.289062, -0.382812, -0.710938, 0.140625, -0.367188, -0.757812, 0.125, -0.359375, -0.539062, -0.125, -0.359375, -0.539062, -0.140625, -0.367188, -0.757812, -0.289062, -0.382812, -0.710938, 0.328125, -0.398438, -0.914062, 0.164062, -0.4375, -0.945312, 0.140625, -0.367188, -0.757812, -0.328125, -0.398438, -0.914062, -0.289062, -0.382812, -0.710938, -0.140625, -0.367188, -0.757812, 0.25, -0.390625, -0.5, 0.125, -0.359375, -0.539062, 0.179688, -0.257812, -0.414062, -0.25, -0.390625, -0.5, -0.234375, -0.40625, -0.351562, -0.179688, -0.257812, -0.414062, 0.3125, -0.570312, -0.4375, 0.351562, -0.570312, -0.695312, 0.25, -0.390625, -0.5, -0.25, -0.390625, -0.5, -0.351562, -0.570312, -0.695312, -0.3125, -0.570312, -0.4375, 0.21875, -0.429688, -0.28125, 0.210938, -0.46875, -0.226562, 0.234375, -0.554688, -0.25, -0.21875, -0.429688, -0.28125, -0.257812, -0.554688, -0.3125, -0.234375, -0.554688, -0.25, 0.234375, -0.40625, -0.351562, 0.21875, -0.429688, -0.28125, 0.257812, -0.554688, -0.3125, -0.234375, -0.40625, -0.351562, -0.3125, -0.570312, -0.4375, -0.257812, -0.554688, -0.3125, 0.234375, -0.554688, -0.25, 0.210938, -0.46875, -0.226562, 0.203125, -0.5, -0.171875, -0.234375, -0.554688, -0.25, -0.203125, -0.5625, -0.1875, -0.203125, -0.5, -0.171875, 0.203125, -0.5, -0.171875, 0.4375, -0.46875, -0.09375, 0.4375, -0.53125, -0.140625, -0.203125, -0.5, -0.171875, -0.203125, -0.5625, -0.1875, -0.4375, -0.53125, -0.140625, 0.335938, 0.664062, 0.054688, 0.34375, 0.539062, -0.148438, 0.0, 0.671875, -0.195312, -0.335938, 0.664062, 0.054688, 0.0, 0.828125, 0.070312, 0.0, 0.671875, -0.195312, 0.34375, 0.539062, -0.148438, 0.296875, 0.265625, -0.3125, 0.0, 0.351562, -0.382812, -0.34375, 0.539062, -0.148438, 0.0, 0.671875, -0.195312, 0.0, 0.351562, -0.382812, 0.0, 0.351562, -0.382812, 0.296875, 0.265625, -0.3125, 0.210938, -0.164062, -0.390625, -0.210938, -0.164062, -0.390625, -0.296875, 0.265625, -0.3125, 0.0, 0.351562, -0.382812, 0.0, -0.1875, -0.460938, 0.210938, -0.164062, -0.390625, 0.179688, -0.257812, -0.414062, -0.179688, -0.257812, -0.414062, -0.210938, -0.164062, -0.390625, 0.0, -0.1875, -0.460938, 0.179688, -0.257812, -0.414062, 0.210938, -0.164062, -0.390625, 0.21875, -0.429688, -0.28125, -0.179688, -0.257812, -0.414062, -0.234375, -0.40625, -0.351562, -0.21875, -0.429688, -0.28125, 0.773438, -0.375, 0.164062, 0.601562, -0.414062, 0.0, 0.734375, -0.070312, -0.046875, -0.734375, -0.070312, -0.046875, -0.601562, -0.414062, 0.0, -0.773438, -0.375, 0.164062, 0.460938, 0.703125, 0.4375, 0.335938, 0.664062, 0.054688, 0.0, 0.828125, 0.070312, -0.460938, 0.703125, 0.4375, 0.0, 0.851562, 0.5625, 0.0, 0.828125, 0.070312, 0.453125, -0.234375, 0.851562, 0.453125, 0.070312, 0.929688, 0.0, 0.078125, 0.984375, -0.453125, -0.234375, 0.851562, 0.0, -0.289062, 0.898438, 0.0, 0.078125, 0.984375, 0.0, 0.078125, 0.984375, 0.453125, 0.070312, 0.929688, 0.453125, 0.382812, 0.867188, -0.453125, 0.382812, 0.867188, -0.453125, 0.070312, 0.929688, 0.0, 0.078125, 0.984375, 0.0, 0.546875, 0.898438, 0.453125, 0.382812, 0.867188, 0.460938, 0.703125, 0.4375, -0.460938, 0.703125, 0.4375, -0.453125, 0.382812, 0.867188, 0.0, 0.546875, 0.898438, 0.679688, -0.492188, 0.453125, 0.796875, -0.460938, 0.40625, 0.726562, -0.335938, 0.40625, -0.726562, -0.335938, 0.40625, -0.796875, -0.460938, 0.40625, -0.679688, -0.492188, 0.453125, 0.632812, -0.28125, 0.453125, 0.726562, -0.335938, 0.40625, 0.796875, -0.125, 0.5625, -0.796875, -0.125, 0.5625, -0.726562, -0.335938, 0.40625, -0.632812, -0.28125, 0.453125, 0.640625, -0.054688, 0.703125, 0.796875, -0.125, 0.5625, 0.796875, 0.117188, 0.617188, -0.796875, 0.117188, 0.617188, -0.796875, -0.125, 0.5625, -0.640625, -0.054688, 0.703125, 0.640625, 0.195312, 0.75, 0.796875, 0.117188, 0.617188, 0.796875, 0.359375, 0.539062, -0.796875, 0.359375, 0.539062, -0.796875, 0.117188, 0.617188, -0.640625, 0.195312, 0.75, 0.617188, 0.585938, 0.328125, 0.640625, 0.445312, 0.679688, 0.796875, 0.359375, 0.539062, -0.617188, 0.585938, 0.328125, -0.773438, 0.4375, 0.265625, -0.796875, 0.359375, 0.539062, 0.460938, 0.703125, 0.4375, 0.453125, 0.382812, 0.867188, 0.640625, 0.445312, 0.679688, -0.640625, 0.445312, 0.679688, -0.453125, 0.382812, 0.867188, -0.460938, 0.703125, 0.4375, 0.453125, 0.382812, 0.867188, 0.453125, 0.070312, 0.929688, 0.640625, 0.195312, 0.75, -0.640625, 0.195312, 0.75, -0.453125, 0.070312, 0.929688, -0.453125, 0.382812, 0.867188, 0.453125, 0.070312, 0.929688, 0.453125, -0.234375, 0.851562, 0.640625, -0.054688, 0.703125, -0.640625, -0.054688, 0.703125, -0.453125, -0.234375, 0.851562, -0.453125, 0.070312, 0.929688, 0.453125, -0.234375, 0.851562, 0.460938, -0.429688, 0.523438, 0.632812, -0.28125, 0.453125, -0.632812, -0.28125, 0.453125, -0.460938, -0.429688, 0.523438, -0.453125, -0.234375, 0.851562, 0.679688, -0.492188, 0.453125, 0.632812, -0.28125, 0.453125, 0.460938, -0.429688, 0.523438, -0.679688, -0.492188, 0.453125, -0.484375, -0.554688, 0.554688, -0.460938, -0.429688, 0.523438, 0.460938, -0.429688, 0.523438, 0.453125, -0.234375, 0.851562, 0.0, -0.289062, 0.898438, -0.460938, -0.429688, 0.523438, 0.0, -0.570312, 0.570312, 0.0, -0.289062, 0.898438, 0.195312, -0.617188, 0.664062, 0.335938, -0.59375, 0.6875, 0.484375, -0.554688, 0.554688, -0.195312, -0.617188, 0.664062, -0.109375, -0.609375, 0.460938, -0.484375, -0.554688, 0.554688, 0.109375, -0.609375, 0.460938, 0.484375, -0.554688, 0.554688, 0.460938, -0.429688, 0.523438, -0.460938, -0.429688, 0.523438, -0.484375, -0.554688, 0.554688, -0.109375, -0.609375, 0.460938, 0.0, -0.601562, 0.40625, 0.109375, -0.609375, 0.460938, 0.0, -0.570312, 0.570312, 0.0, -0.570312, 0.570312, -0.109375, -0.609375, 0.460938, 0.0, -0.601562, 0.40625, 0.773438, -0.375, 0.164062, 0.851562, -0.054688, 0.234375, 0.726562, -0.335938, 0.40625, -0.773438, -0.375, 0.164062, -0.796875, -0.460938, 0.40625, -0.726562, -0.335938, 0.40625, 0.851562, -0.054688, 0.234375, 0.859375, 0.046875, 0.320312, 0.796875, -0.125, 0.5625, -0.796875, -0.125, 0.5625, -0.859375, 0.046875, 0.320312, -0.851562, -0.054688, 0.234375, 0.859375, 0.046875, 0.320312, 0.820312, 0.203125, 0.328125, 0.796875, 0.117188, 0.617188, -0.796875, 0.117188, 0.617188, -0.820312, 0.203125, 0.328125, -0.859375, 0.046875, 0.320312, 0.796875, 0.359375, 0.539062, 0.796875, 0.117188, 0.617188, 0.820312, 0.203125, 0.328125, -0.796875, 0.359375, 0.539062, -0.773438, 0.4375, 0.265625, -0.820312, 0.203125, 0.328125, 0.296875, 0.265625, -0.3125, 0.429688, 0.210938, -0.195312, 0.40625, -0.148438, -0.171875, -0.296875, 0.265625, -0.3125, -0.210938, -0.164062, -0.390625, -0.40625, -0.148438, -0.171875, 0.40625, -0.148438, -0.171875, 0.429688, 0.210938, -0.195312, 0.59375, 0.164062, -0.125, -0.40625, -0.148438, -0.171875, -0.734375, -0.070312, -0.046875, -0.59375, 0.164062, -0.125, 0.601562, -0.414062, 0.0, 0.4375, -0.46875, -0.09375, 0.40625, -0.148438, -0.171875, -0.40625, -0.148438, -0.171875, -0.4375, -0.46875, -0.09375, -0.601562, -0.414062, 0.0, 0.4375, -0.46875, -0.09375, 0.210938, -0.46875, -0.226562, 0.21875, -0.429688, -0.28125, -0.21875, -0.429688, -0.28125, -0.210938, -0.46875, -0.226562, -0.4375, -0.46875, -0.09375, 0.21875, -0.429688, -0.28125, 0.210938, -0.164062, -0.390625, 0.40625, -0.148438, -0.171875, -0.40625, -0.148438, -0.171875, -0.210938, -0.164062, -0.390625, -0.21875, -0.429688, -0.28125, 0.4375, -0.46875, -0.09375, 0.203125, -0.5, -0.171875, 0.210938, -0.46875, -0.226562, -0.210938, -0.46875, -0.226562, -0.203125, -0.5, -0.171875, -0.4375, -0.46875, -0.09375, 0.640625, 0.429688, -0.007812, 0.484375, 0.546875, 0.023438, 0.617188, 0.585938, 0.328125, -0.640625, 0.429688, -0.007812, -0.773438, 0.4375, 0.265625, -0.617188, 0.585938, 0.328125, 0.617188, 0.585938, 0.328125, 0.484375, 0.546875, 0.023438, 0.335938, 0.664062, 0.054688, -0.617188, 0.585938, 0.328125, -0.460938, 0.703125, 0.4375, -0.335938, 0.664062, 0.054688, 0.429688, 0.210938, -0.195312, 0.484375, 0.546875, 0.023438, 0.640625, 0.429688, -0.007812, -0.429688, 0.210938, -0.195312, -0.59375, 0.164062, -0.125, -0.640625, 0.429688, -0.007812, 0.34375, 0.539062, -0.148438, 0.484375, 0.546875, 0.023438, 0.429688, 0.210938, -0.195312, -0.34375, 0.539062, -0.148438, -0.296875, 0.265625, -0.3125, -0.429688, 0.210938, -0.195312, 0.335938, 0.664062, 0.054688, 0.484375, 0.546875, 0.023438, 0.34375, 0.539062, -0.148438, -0.34375, 0.539062, -0.148438, -0.484375, 0.546875, 0.023438, -0.335938, 0.664062, 0.054688, 0.890625, 0.234375, 0.40625, 0.921875, 0.21875, 0.359375, 1.015625, 0.289062, 0.414062, -0.890625, 0.234375, 0.40625, -1.023438, 0.3125, 0.476562, -1.015625, 0.289062, 0.414062, 1.023438, 0.3125, 0.476562, 1.015625, 0.289062, 0.414062, 1.1875, 0.390625, 0.4375, -1.1875, 0.390625, 0.4375, -1.015625, 0.289062, 0.414062, -1.023438, 0.3125, 0.476562, 1.1875, 0.390625, 0.4375, 1.265625, 0.40625, 0.289062, 1.351562, 0.421875, 0.320312, -1.1875, 0.390625, 0.4375, -1.234375, 0.421875, 0.507812, -1.351562, 0.421875, 0.320312, 1.265625, 0.40625, 0.289062, 1.210938, 0.40625, 0.078125, 1.28125, 0.429688, 0.054688, -1.265625, 0.40625, 0.289062, -1.351562, 0.421875, 0.320312, -1.28125, 0.429688, 0.054688, 1.210938, 0.40625, 0.078125, 1.03125, 0.304688, -0.039062, 1.039062, 0.328125, -0.101562, -1.210938, 0.40625, 0.078125, -1.28125, 0.429688, 0.054688, -1.039062, 0.328125, -0.101562, 1.039062, 0.328125, -0.101562, 1.03125, 0.304688, -0.039062, 0.828125, 0.132812, -0.070312, -0.828125, 0.132812, -0.070312, -1.03125, 0.304688, -0.039062, -1.039062, 0.328125, -0.101562, 1.03125, 0.304688, -0.039062, 1.039062, 0.367188, 0.0, 0.882812, 0.210938, -0.023438, -0.882812, 0.210938, -0.023438, -1.039062, 0.367188, 0.0, -1.03125, 0.304688, -0.039062, 1.210938, 0.40625, 0.078125, 1.1875, 0.445312, 0.09375, 1.039062, 0.367188, 0.0, -1.039062, 0.367188, 0.0, -1.1875, 0.445312, 0.09375, -1.210938, 0.40625, 0.078125, 1.234375, 0.445312, 0.25, 1.1875, 0.445312, 0.09375, 1.210938, 0.40625, 0.078125, -1.234375, 0.445312, 0.25, -1.265625, 0.40625, 0.289062, -1.210938, 0.40625, 0.078125, 1.171875, 0.4375, 0.359375, 1.234375, 0.445312, 0.25, 1.265625, 0.40625, 0.289062, -1.171875, 0.4375, 0.359375, -1.1875, 0.390625, 0.4375, -1.265625, 0.40625, 0.289062, 1.023438, 0.359375, 0.34375, 1.171875, 0.4375, 0.359375, 1.1875, 0.390625, 0.4375, -1.023438, 0.359375, 0.34375, -1.015625, 0.289062, 0.414062, -1.1875, 0.390625, 0.4375, 1.015625, 0.289062, 0.414062, 0.921875, 0.21875, 0.359375, 0.945312, 0.289062, 0.304688, -0.945312, 0.289062, 0.304688, -0.921875, 0.21875, 0.359375, -1.015625, 0.289062, 0.414062, 0.59375, 0.164062, -0.125, 0.71875, 0.171875, -0.023438, 0.726562, 0.070312, 0.0, -0.59375, 0.164062, -0.125, -0.734375, -0.070312, -0.046875, -0.726562, 0.070312, 0.0, 0.773438, 0.125, -0.140625, 0.828125, 0.132812, -0.070312, 0.71875, 0.171875, -0.023438, -0.773438, 0.125, -0.140625, -0.59375, 0.164062, -0.125, -0.71875, 0.171875, -0.023438, 0.851562, -0.054688, 0.234375, 0.734375, -0.070312, -0.046875, 0.726562, 0.070312, 0.0, -0.726562, 0.070312, 0.0, -0.734375, -0.070312, -0.046875, -0.851562, -0.054688, 0.234375, 0.820312, 0.203125, 0.328125, 0.84375, 0.210938, 0.289062, 0.921875, 0.21875, 0.359375, -0.921875, 0.21875, 0.359375, -0.84375, 0.210938, 0.289062, -0.820312, 0.203125, 0.328125, 0.828125, 0.132812, -0.070312, 0.882812, 0.210938, -0.023438, 0.8125, 0.273438, -0.015625, -0.8125, 0.273438, -0.015625, -0.882812, 0.210938, -0.023438, -0.828125, 0.132812, -0.070312, 0.71875, 0.1875, 0.039062, 0.71875, 0.171875, -0.023438, 0.8125, 0.273438, -0.015625, -0.71875, 0.1875, 0.039062, -0.84375, 0.273438, 0.015625, -0.8125, 0.273438, -0.015625, 0.757812, 0.273438, 0.09375, 0.71875, 0.1875, 0.039062, 0.84375, 0.273438, 0.015625, -0.84375, 0.273438, 0.015625, -0.71875, 0.1875, 0.039062, -0.757812, 0.273438, 0.09375, 0.796875, 0.210938, 0.203125, 0.71875, 0.1875, 0.039062, 0.757812, 0.273438, 0.09375, -0.796875, 0.210938, 0.203125, -0.835938, 0.273438, 0.171875, -0.757812, 0.273438, 0.09375, 0.796875, 0.210938, 0.203125, 0.835938, 0.273438, 0.171875, 0.890625, 0.265625, 0.242188, -0.796875, 0.210938, 0.203125, -0.84375, 0.210938, 0.289062, -0.890625, 0.265625, 0.242188, 0.84375, 0.210938, 0.289062, 0.890625, 0.265625, 0.242188, 0.945312, 0.289062, 0.304688, -0.84375, 0.210938, 0.289062, -0.921875, 0.21875, 0.359375, -0.945312, 0.289062, 0.304688, 0.796875, 0.210938, 0.203125, 0.84375, 0.210938, 0.289062, 0.820312, 0.203125, 0.328125, -0.796875, 0.210938, 0.203125, -0.859375, 0.046875, 0.320312, -0.820312, 0.203125, 0.328125, 0.726562, 0.070312, 0.0, 0.71875, 0.1875, 0.039062, 0.796875, 0.210938, 0.203125, -0.726562, 0.070312, 0.0, -0.859375, 0.046875, 0.320312, -0.796875, 0.210938, 0.203125, 0.726562, 0.070312, 0.0, 0.71875, 0.171875, -0.023438, 0.71875, 0.1875, 0.039062, -0.71875, 0.1875, 0.039062, -0.71875, 0.171875, -0.023438, -0.726562, 0.070312, 0.0, 0.945312, 0.289062, 0.304688, 0.890625, 0.265625, 0.242188, 0.890625, 0.320312, 0.234375, -0.890625, 0.320312, 0.234375, -0.890625, 0.265625, 0.242188, -0.945312, 0.289062, 0.304688, 0.835938, 0.273438, 0.171875, 0.84375, 0.320312, 0.171875, 0.890625, 0.320312, 0.234375, -0.835938, 0.273438, 0.171875, -0.890625, 0.265625, 0.242188, -0.890625, 0.320312, 0.234375, 0.835938, 0.273438, 0.171875, 0.757812, 0.273438, 0.09375, 0.765625, 0.320312, 0.09375, -0.765625, 0.320312, 0.09375, -0.757812, 0.273438, 0.09375, -0.835938, 0.273438, 0.171875, 0.820312, 0.273438, 0.085938, 0.828125, 0.320312, 0.078125, 0.765625, 0.320312, 0.09375, -0.820312, 0.273438, 0.085938, -0.757812, 0.273438, 0.09375, -0.765625, 0.320312, 0.09375, 0.84375, 0.273438, 0.015625, 0.851562, 0.320312, 0.015625, 0.828125, 0.320312, 0.078125, -0.84375, 0.273438, 0.015625, -0.820312, 0.273438, 0.085938, -0.828125, 0.320312, 0.078125, 0.84375, 0.273438, 0.015625, 0.8125, 0.273438, -0.015625, 0.8125, 0.320312, -0.015625, -0.8125, 0.320312, -0.015625, -0.8125, 0.273438, -0.015625, -0.84375, 0.273438, 0.015625, 0.8125, 0.273438, -0.015625, 0.882812, 0.210938, -0.023438, 0.882812, 0.265625, -0.015625, -0.882812, 0.265625, -0.015625, -0.882812, 0.210938, -0.023438, -0.8125, 0.273438, -0.015625, 1.023438, 0.359375, 0.34375, 0.945312, 0.289062, 0.304688, 0.953125, 0.34375, 0.289062, -0.953125, 0.34375, 0.289062, -0.945312, 0.289062, 0.304688, -1.023438, 0.359375, 0.34375, 1.171875, 0.4375, 0.359375, 1.023438, 0.359375, 0.34375, 1.039062, 0.414062, 0.328125, -1.039062, 0.414062, 0.328125, -1.023438, 0.359375, 0.34375, -1.171875, 0.4375, 0.359375, 1.234375, 0.445312, 0.25, 1.171875, 0.4375, 0.359375, 1.1875, 0.484375, 0.34375, -1.1875, 0.484375, 0.34375, -1.171875, 0.4375, 0.359375, -1.234375, 0.445312, 0.25, 1.234375, 0.445312, 0.25, 1.257812, 0.492188, 0.242188, 1.210938, 0.484375, 0.085938, -1.234375, 0.445312, 0.25, -1.1875, 0.445312, 0.09375, -1.210938, 0.484375, 0.085938, 1.1875, 0.445312, 0.09375, 1.210938, 0.484375, 0.085938, 1.046875, 0.421875, 0.0, -1.1875, 0.445312, 0.09375, -1.039062, 0.367188, 0.0, -1.046875, 0.421875, 0.0, 1.039062, 0.367188, 0.0, 1.046875, 0.421875, 0.0, 0.882812, 0.265625, -0.015625, -1.039062, 0.367188, 0.0, -0.882812, 0.210938, -0.023438, -0.882812, 0.265625, -0.015625, 0.851562, 0.320312, 0.015625, 0.9375, 0.335938, 0.0625, 0.890625, 0.328125, 0.109375, -0.851562, 0.320312, 0.015625, -0.828125, 0.320312, 0.078125, -0.890625, 0.328125, 0.109375, 0.9375, 0.335938, 0.0625, 1.0, 0.367188, 0.125, 0.960938, 0.351562, 0.171875, -0.9375, 0.335938, 0.0625, -0.890625, 0.328125, 0.109375, -0.960938, 0.351562, 0.171875, 0.960938, 0.351562, 0.171875, 1.0, 0.367188, 0.125, 1.054688, 0.382812, 0.1875, -1.054688, 0.382812, 0.1875, -1.0, 0.367188, 0.125, -0.960938, 0.351562, 0.171875, 1.054688, 0.382812, 0.1875, 1.109375, 0.390625, 0.210938, 1.085938, 0.390625, 0.273438, -1.054688, 0.382812, 0.1875, -1.015625, 0.375, 0.234375, -1.085938, 0.390625, 0.273438, 1.039062, 0.414062, 0.328125, 0.953125, 0.34375, 0.289062, 1.015625, 0.375, 0.234375, -1.015625, 0.375, 0.234375, -0.953125, 0.34375, 0.289062, -1.039062, 0.414062, 0.328125, 0.960938, 0.351562, 0.171875, 1.015625, 0.375, 0.234375, 0.953125, 0.34375, 0.289062, -0.960938, 0.351562, 0.171875, -0.890625, 0.320312, 0.234375, -0.953125, 0.34375, 0.289062, 0.84375, 0.320312, 0.171875, 0.890625, 0.328125, 0.109375, 0.960938, 0.351562, 0.171875, -0.84375, 0.320312, 0.171875, -0.890625, 0.320312, 0.234375, -0.960938, 0.351562, 0.171875, 0.828125, 0.320312, 0.078125, 0.890625, 0.328125, 0.109375, 0.84375, 0.320312, 0.171875, -0.84375, 0.320312, 0.171875, -0.890625, 0.328125, 0.109375, -0.828125, 0.320312, 0.078125, 0.882812, 0.265625, -0.015625, 0.9375, 0.335938, 0.0625, 0.851562, 0.320312, 0.015625, -0.882812, 0.265625, -0.015625, -0.8125, 0.320312, -0.015625, -0.851562, 0.320312, 0.015625, 1.046875, 0.421875, 0.0, 1.0, 0.367188, 0.125, 0.9375, 0.335938, 0.0625, -0.9375, 0.335938, 0.0625, -1.0, 0.367188, 0.125, -1.046875, 0.421875, 0.0, 1.054688, 0.382812, 0.1875, 1.0, 0.367188, 0.125, 1.046875, 0.421875, 0.0, -1.054688, 0.382812, 0.1875, -1.210938, 0.484375, 0.085938, -1.046875, 0.421875, 0.0, 1.109375, 0.390625, 0.210938, 1.054688, 0.382812, 0.1875, 1.210938, 0.484375, 0.085938, -1.109375, 0.390625, 0.210938, -1.257812, 0.492188, 0.242188, -1.210938, 0.484375, 0.085938, 1.1875, 0.484375, 0.34375, 1.085938, 0.390625, 0.273438, 1.109375, 0.390625, 0.210938, -1.109375, 0.390625, 0.210938, -1.085938, 0.390625, 0.273438, -1.1875, 0.484375, 0.34375, 1.039062, 0.414062, 0.328125, 1.085938, 0.390625, 0.273438, 1.1875, 0.484375, 0.34375, -1.1875, 0.484375, 0.34375, -1.085938, 0.390625, 0.273438, -1.039062, 0.414062, 0.328125, 1.039062, 0.328125, -0.101562, 0.773438, 0.125, -0.140625, 0.789062, 0.328125, -0.125, -0.789062, 0.328125, -0.125, -0.773438, 0.125, -0.140625, -1.039062, 0.328125, -0.101562, 1.28125, 0.429688, 0.054688, 1.039062, 0.328125, -0.101562, 1.039062, 0.492188, -0.085938, -1.039062, 0.492188, -0.085938, -1.039062, 0.328125, -0.101562, -1.28125, 0.429688, 0.054688, 1.28125, 0.429688, 0.054688, 1.3125, 0.53125, 0.054688, 1.367188, 0.5, 0.296875, -1.28125, 0.429688, 0.054688, -1.351562, 0.421875, 0.320312, -1.367188, 0.5, 0.296875, 1.351562, 0.421875, 0.320312, 1.367188, 0.5, 0.296875, 1.25, 0.546875, 0.46875, -1.351562, 0.421875, 0.320312, -1.234375, 0.421875, 0.507812, -1.25, 0.546875, 0.46875, 1.234375, 0.421875, 0.507812, 1.25, 0.546875, 0.46875, 1.023438, 0.484375, 0.4375, -1.234375, 0.421875, 0.507812, -1.023438, 0.3125, 0.476562, -1.023438, 0.484375, 0.4375, 1.023438, 0.3125, 0.476562, 1.023438, 0.484375, 0.4375, 0.859375, 0.382812, 0.382812, -1.023438, 0.3125, 0.476562, -0.890625, 0.234375, 0.40625, -0.859375, 0.382812, 0.382812, 1.039062, 0.492188, -0.085938, 0.789062, 0.328125, -0.125, 0.859375, 0.382812, 0.382812, -1.039062, 0.492188, -0.085938, -1.023438, 0.484375, 0.4375, -0.859375, 0.382812, 0.382812, 1.023438, 0.484375, 0.4375, 1.25, 0.546875, 0.46875, 1.3125, 0.53125, 0.054688, -1.3125, 0.53125, 0.054688, -1.25, 0.546875, 0.46875, -1.023438, 0.484375, 0.4375, 1.25, 0.546875, 0.46875, 1.367188, 0.5, 0.296875, 1.3125, 0.53125, 0.054688, -1.3125, 0.53125, 0.054688, -1.367188, 0.5, 0.296875, -1.25, 0.546875, 0.46875, 0.820312, 0.203125, 0.328125, 0.890625, 0.234375, 0.40625, 0.859375, 0.382812, 0.382812, -0.820312, 0.203125, 0.328125, -0.773438, 0.4375, 0.265625, -0.859375, 0.382812, 0.382812, 0.773438, 0.4375, 0.265625, 0.859375, 0.382812, 0.382812, 0.789062, 0.328125, -0.125, -0.789062, 0.328125, -0.125, -0.859375, 0.382812, 0.382812, -0.773438, 0.4375, 0.265625, 0.59375, 0.164062, -0.125, 0.640625, 0.429688, -0.007812, 0.789062, 0.328125, -0.125, -0.789062, 0.328125, -0.125, -0.640625, 0.429688, -0.007812, -0.59375, 0.164062, -0.125, 0.5625, -0.671875, 0.242188, 0.46875, -0.757812, 0.242188, 0.5, -0.6875, 0.09375, -0.5625, -0.671875, 0.242188, -0.5, -0.6875, 0.09375, -0.46875, -0.757812, 0.242188, 0.625, -0.5625, 0.242188, 0.5625, -0.671875, 0.242188, 0.546875, -0.578125, 0.054688, -0.625, -0.5625, 0.242188, -0.546875, -0.578125, 0.054688, -0.5625, -0.671875, 0.242188, 0.546875, -0.578125, 0.054688, 0.5, -0.6875, 0.09375, 0.351562, -0.617188, -0.023438, -0.546875, -0.578125, 0.054688, -0.351562, -0.617188, -0.023438, -0.5, -0.6875, 0.09375, 0.5, -0.6875, 0.09375, 0.4375, -0.765625, 0.164062, 0.351562, -0.71875, 0.03125, -0.5, -0.6875, 0.09375, -0.351562, -0.71875, 0.03125, -0.4375, -0.765625, 0.164062, 0.351562, -0.71875, 0.03125, 0.351562, -0.78125, 0.132812, 0.203125, -0.742188, 0.09375, -0.351562, -0.71875, 0.03125, -0.203125, -0.742188, 0.09375, -0.351562, -0.78125, 0.132812, 0.351562, -0.617188, -0.023438, 0.351562, -0.71875, 0.03125, 0.15625, -0.648438, 0.054688, -0.351562, -0.617188, -0.023438, -0.15625, -0.648438, 0.054688, -0.351562, -0.71875, 0.03125, 0.203125, -0.742188, 0.09375, 0.140625, -0.742188, 0.242188, 0.15625, -0.648438, 0.054688, -0.078125, -0.65625, 0.242188, -0.140625, -0.742188, 0.242188, -0.15625, -0.648438, 0.054688, 0.273438, -0.796875, 0.164062, 0.242188, -0.796875, 0.242188, 0.203125, -0.742188, 0.09375, -0.140625, -0.742188, 0.242188, -0.242188, -0.796875, 0.242188, -0.203125, -0.742188, 0.09375, 0.140625, -0.742188, 0.242188, 0.242188, -0.796875, 0.242188, 0.203125, -0.742188, 0.390625, -0.140625, -0.742188, 0.242188, -0.203125, -0.742188, 0.390625, -0.242188, -0.796875, 0.242188, 0.140625, -0.742188, 0.242188, 0.203125, -0.742188, 0.390625, 0.078125, -0.65625, 0.242188, -0.15625, -0.648438, 0.4375, -0.203125, -0.742188, 0.390625, -0.078125, -0.65625, 0.242188, 0.203125, -0.742188, 0.390625, 0.351562, -0.71875, 0.453125, 0.15625, -0.648438, 0.4375, -0.351562, -0.617188, 0.515625, -0.351562, -0.71875, 0.453125, -0.15625, -0.648438, 0.4375, 0.273438, -0.796875, 0.328125, 0.351562, -0.78125, 0.359375, 0.203125, -0.742188, 0.390625, -0.351562, -0.71875, 0.453125, -0.351562, -0.78125, 0.359375, -0.203125, -0.742188, 0.390625, 0.351562, -0.78125, 0.359375, 0.4375, -0.765625, 0.328125, 0.351562, -0.71875, 0.453125, -0.5, -0.6875, 0.390625, -0.4375, -0.765625, 0.328125, -0.351562, -0.71875, 0.453125, 0.351562, -0.71875, 0.453125, 0.5, -0.6875, 0.390625, 0.351562, -0.617188, 0.515625, -0.546875, -0.578125, 0.4375, -0.5, -0.6875, 0.390625, -0.351562, -0.617188, 0.515625, 0.5, -0.6875, 0.390625, 0.5625, -0.671875, 0.242188, 0.546875, -0.578125, 0.4375, -0.625, -0.5625, 0.242188, -0.5625, -0.671875, 0.242188, -0.546875, -0.578125, 0.4375, 0.4375, -0.765625, 0.328125, 0.46875, -0.757812, 0.242188, 0.5, -0.6875, 0.390625, -0.5625, -0.671875, 0.242188, -0.46875, -0.757812, 0.242188, -0.5, -0.6875, 0.390625, 0.46875, -0.757812, 0.242188, 0.4375, -0.765625, 0.328125, 0.476562, -0.773438, 0.242188, -0.445312, -0.78125, 0.335938, -0.4375, -0.765625, 0.328125, -0.476562, -0.773438, 0.242188, 0.4375, -0.765625, 0.328125, 0.351562, -0.78125, 0.359375, 0.445312, -0.78125, 0.335938, -0.351562, -0.804688, 0.375, -0.351562, -0.78125, 0.359375, -0.445312, -0.78125, 0.335938, 0.351562, -0.78125, 0.359375, 0.273438, -0.796875, 0.328125, 0.351562, -0.804688, 0.375, -0.265625, -0.820312, 0.335938, -0.273438, -0.796875, 0.328125, -0.351562, -0.804688, 0.375, 0.273438, -0.796875, 0.328125, 0.242188, -0.796875, 0.242188, 0.265625, -0.820312, 0.335938, -0.226562, -0.820312, 0.242188, -0.242188, -0.796875, 0.242188, -0.265625, -0.820312, 0.335938, 0.226562, -0.820312, 0.242188, 0.242188, -0.796875, 0.242188, 0.265625, -0.820312, 0.15625, -0.226562, -0.820312, 0.242188, -0.265625, -0.820312, 0.15625, -0.242188, -0.796875, 0.242188, 0.265625, -0.820312, 0.15625, 0.273438, -0.796875, 0.164062, 0.351562, -0.804688, 0.117188, -0.265625, -0.820312, 0.15625, -0.351562, -0.804688, 0.117188, -0.273438, -0.796875, 0.164062, 0.351562, -0.804688, 0.117188, 0.351562, -0.78125, 0.132812, 0.445312, -0.78125, 0.15625, -0.351562, -0.804688, 0.117188, -0.445312, -0.78125, 0.15625, -0.351562, -0.78125, 0.132812, 0.445312, -0.78125, 0.15625, 0.4375, -0.765625, 0.164062, 0.476562, -0.773438, 0.242188, -0.445312, -0.78125, 0.15625, -0.476562, -0.773438, 0.242188, -0.4375, -0.765625, 0.164062, 0.179688, -0.554688, -0.96875, 0.164062, -0.632812, -0.929688, 0.0, -0.578125, -0.984375, 0.0, -0.640625, -0.945312, -0.164062, -0.632812, -0.929688, 0.0, -0.578125, -0.984375, 0.328125, -0.523438, -0.945312, 0.234375, -0.632812, -0.914062, 0.179688, -0.554688, -0.96875, -0.164062, -0.632812, -0.929688, -0.234375, -0.632812, -0.914062, -0.179688, -0.554688, -0.96875, 0.328125, -0.523438, -0.945312, 0.367188, -0.53125, -0.890625, 0.234375, -0.632812, -0.914062, -0.328125, -0.523438, -0.945312, -0.234375, -0.632812, -0.914062, -0.367188, -0.53125, -0.890625, 0.367188, -0.53125, -0.890625, 0.351562, -0.570312, -0.695312, 0.265625, -0.664062, -0.820312, -0.367188, -0.53125, -0.890625, -0.265625, -0.664062, -0.820312, -0.351562, -0.570312, -0.695312, 0.351562, -0.570312, -0.695312, 0.3125, -0.570312, -0.4375, 0.25, -0.6875, -0.703125, -0.351562, -0.570312, -0.695312, -0.25, -0.6875, -0.703125, -0.3125, -0.570312, -0.4375, 0.125, -0.8125, -0.101562, 0.203125, -0.5625, -0.1875, 0.398438, -0.671875, -0.046875, -0.125, -0.8125, -0.101562, -0.398438, -0.671875, -0.046875, -0.203125, -0.5625, -0.1875, 0.4375, -0.53125, -0.140625, 0.632812, -0.539062, -0.039062, 0.398438, -0.671875, -0.046875, -0.617188, -0.625, 0.054688, -0.632812, -0.539062, -0.039062, -0.398438, -0.671875, -0.046875, 0.617188, -0.625, 0.054688, 0.632812, -0.539062, -0.039062, 0.726562, -0.601562, 0.203125, -0.617188, -0.625, 0.054688, -0.726562, -0.601562, 0.203125, -0.632812, -0.539062, -0.039062, 0.828125, -0.445312, 0.148438, 0.859375, -0.59375, 0.429688, 0.726562, -0.601562, 0.203125, -0.742188, -0.65625, 0.375, -0.859375, -0.59375, 0.429688, -0.726562, -0.601562, 0.203125, 0.859375, -0.59375, 0.429688, 0.710938, -0.625, 0.484375, 0.742188, -0.65625, 0.375, -0.6875, -0.726562, 0.414062, -0.710938, -0.625, 0.484375, -0.742188, -0.65625, 0.375, 0.710938, -0.625, 0.484375, 0.492188, -0.6875, 0.601562, 0.6875, -0.726562, 0.414062, -0.4375, -0.796875, 0.546875, -0.492188, -0.6875, 0.601562, -0.6875, -0.726562, 0.414062, 0.4375, -0.796875, 0.546875, 0.492188, -0.6875, 0.601562, 0.3125, -0.835938, 0.640625, -0.4375, -0.796875, 0.546875, -0.3125, -0.835938, 0.640625, -0.492188, -0.6875, 0.601562, 0.320312, -0.734375, 0.757812, 0.15625, -0.757812, 0.71875, 0.3125, -0.835938, 0.640625, -0.203125, -0.851562, 0.617188, -0.15625, -0.757812, 0.71875, -0.3125, -0.835938, 0.640625, 0.15625, -0.757812, 0.71875, 0.0625, -0.75, 0.492188, 0.203125, -0.851562, 0.617188, -0.101562, -0.84375, 0.429688, -0.0625, -0.75, 0.492188, -0.203125, -0.851562, 0.617188, 0.0625, -0.75, 0.492188, 0.0, -0.742188, 0.429688, 0.101562, -0.84375, 0.429688, 0.0, -0.820312, 0.351562, 0.0, -0.742188, 0.429688, -0.101562, -0.84375, 0.429688, 0.164062, -0.773438, 0.414062, 0.25, -0.757812, 0.46875, 0.101562, -0.84375, 0.429688, -0.203125, -0.851562, 0.617188, -0.25, -0.757812, 0.46875, -0.101562, -0.84375, 0.429688, 0.203125, -0.851562, 0.617188, 0.25, -0.757812, 0.46875, 0.3125, -0.835938, 0.640625, -0.203125, -0.851562, 0.617188, -0.3125, -0.835938, 0.640625, -0.25, -0.757812, 0.46875, 0.429688, -0.71875, 0.4375, 0.4375, -0.796875, 0.546875, 0.328125, -0.742188, 0.476562, -0.3125, -0.835938, 0.640625, -0.4375, -0.796875, 0.546875, -0.328125, -0.742188, 0.476562, 0.601562, -0.664062, 0.375, 0.6875, -0.726562, 0.414062, 0.429688, -0.71875, 0.4375, -0.4375, -0.796875, 0.546875, -0.6875, -0.726562, 0.414062, -0.429688, -0.71875, 0.4375, 0.640625, -0.648438, 0.296875, 0.742188, -0.65625, 0.375, 0.601562, -0.664062, 0.375, -0.6875, -0.726562, 0.414062, -0.742188, -0.65625, 0.375, -0.601562, -0.664062, 0.375, 0.625, -0.648438, 0.1875, 0.726562, -0.601562, 0.203125, 0.640625, -0.648438, 0.296875, -0.742188, -0.65625, 0.375, -0.726562, -0.601562, 0.203125, -0.640625, -0.648438, 0.296875, 0.492188, -0.671875, 0.0625, 0.617188, -0.625, 0.054688, 0.625, -0.648438, 0.1875, -0.726562, -0.601562, 0.203125, -0.617188, -0.625, 0.054688, -0.625, -0.648438, 0.1875, 0.375, -0.703125, 0.015625, 0.398438, -0.671875, -0.046875, 0.492188, -0.671875, 0.0625, -0.617188, -0.625, 0.054688, -0.398438, -0.671875, -0.046875, -0.492188, -0.671875, 0.0625, 0.375, -0.703125, 0.015625, 0.203125, -0.742188, 0.09375, 0.398438, -0.671875, -0.046875, -0.375, -0.703125, 0.015625, -0.398438, -0.671875, -0.046875, -0.203125, -0.742188, 0.09375, 0.125, -0.8125, -0.101562, 0.203125, -0.742188, 0.09375, 0.0, -0.726562, 0.046875, -0.125, -0.8125, -0.101562, 0.0, -0.726562, 0.046875, -0.203125, -0.742188, 0.09375, 0.164062, -0.773438, 0.414062, 0.101562, -0.84375, 0.429688, 0.125, -0.765625, 0.304688, 0.0, -0.820312, 0.351562, -0.101562, -0.84375, 0.429688, -0.125, -0.765625, 0.304688, 0.132812, -0.757812, 0.210938, 0.125, -0.765625, 0.304688, 0.0, -0.765625, 0.210938, -0.132812, -0.757812, 0.210938, 0.0, -0.765625, 0.210938, -0.125, -0.765625, 0.304688, 0.0, -0.726562, 0.046875, 0.164062, -0.75, 0.140625, 0.0, -0.765625, 0.210938, -0.132812, -0.757812, 0.210938, -0.164062, -0.75, 0.140625, 0.0, -0.765625, 0.210938, 0.164062, -0.632812, -0.929688, 0.0625, -0.695312, -0.882812, 0.0, -0.640625, -0.945312, -0.164062, -0.632812, -0.929688, 0.0, -0.640625, -0.945312, -0.0625, -0.695312, -0.882812, 0.234375, -0.632812, -0.914062, 0.117188, -0.710938, -0.835938, 0.164062, -0.632812, -0.929688, -0.234375, -0.632812, -0.914062, -0.164062, -0.632812, -0.929688, -0.117188, -0.710938, -0.835938, 0.109375, -0.734375, -0.71875, 0.117188, -0.710938, -0.835938, 0.265625, -0.664062, -0.820312, -0.234375, -0.632812, -0.914062, -0.117188, -0.710938, -0.835938, -0.265625, -0.664062, -0.820312, 0.25, -0.6875, -0.703125, 0.210938, -0.710938, -0.445312, 0.117188, -0.734375, -0.6875, -0.25, -0.6875, -0.703125, -0.117188, -0.734375, -0.6875, -0.210938, -0.710938, -0.445312, 0.117188, -0.734375, -0.6875, 0.109375, -0.734375, -0.71875, 0.25, -0.6875, -0.703125, -0.117188, -0.734375, -0.6875, -0.25, -0.6875, -0.703125, -0.109375, -0.734375, -0.71875, 0.085938, -0.742188, -0.289062, 0.0, -0.742188, -0.328125, 0.078125, -0.75, -0.445312, 0.0, -0.75, -0.445312, 0.0, -0.742188, -0.328125, -0.078125, -0.75, -0.445312, 0.117188, -0.734375, -0.6875, 0.078125, -0.75, -0.445312, 0.0, -0.734375, -0.679688, 0.0, -0.75, -0.445312, -0.078125, -0.75, -0.445312, 0.0, -0.734375, -0.679688, 0.0, -0.734375, -0.765625, 0.109375, -0.734375, -0.71875, 0.0, -0.734375, -0.679688, -0.117188, -0.734375, -0.6875, -0.109375, -0.734375, -0.71875, 0.0, -0.734375, -0.679688, 0.085938, -0.742188, -0.289062, 0.125, -0.75, -0.226562, 0.09375, -0.78125, -0.273438, -0.085938, -0.742188, -0.289062, -0.09375, -0.78125, -0.273438, -0.125, -0.75, -0.226562, 0.101562, -0.742188, -0.148438, 0.109375, -0.78125, -0.132812, 0.125, -0.75, -0.226562, -0.132812, -0.796875, -0.226562, -0.109375, -0.78125, -0.132812, -0.125, -0.75, -0.226562, 0.0, -0.742188, -0.140625, 0.039062, -0.78125, -0.125, 0.101562, -0.742188, -0.148438, -0.109375, -0.78125, -0.132812, -0.039062, -0.78125, -0.125, -0.101562, -0.742188, -0.148438, 0.0, -0.75, -0.195312, 0.0, -0.796875, -0.1875, 0.0, -0.742188, -0.140625, -0.039062, -0.78125, -0.125, 0.0, -0.796875, -0.1875, 0.0, -0.742188, -0.140625, 0.0, -0.742188, -0.328125, 0.085938, -0.742188, -0.289062, 0.0, -0.78125, -0.320312, -0.09375, -0.78125, -0.273438, -0.085938, -0.742188, -0.289062, 0.0, -0.78125, -0.320312, 0.0, -0.78125, -0.320312, 0.09375, -0.78125, -0.273438, 0.0, -0.804688, -0.289062, -0.078125, -0.804688, -0.25, -0.09375, -0.78125, -0.273438, 0.0, -0.804688, -0.289062, 0.039062, -0.78125, -0.125, 0.0, -0.796875, -0.1875, 0.046875, -0.8125, -0.148438, -0.039062, -0.78125, -0.125, -0.046875, -0.8125, -0.148438, 0.0, -0.796875, -0.1875, 0.109375, -0.78125, -0.132812, 0.039062, -0.78125, -0.125, 0.09375, -0.8125, -0.15625, -0.109375, -0.78125, -0.132812, -0.09375, -0.8125, -0.15625, -0.039062, -0.78125, -0.125, 0.109375, -0.78125, -0.132812, 0.09375, -0.8125, -0.15625, 0.132812, -0.796875, -0.226562, -0.109375, -0.828125, -0.226562, -0.09375, -0.8125, -0.15625, -0.132812, -0.796875, -0.226562, 0.09375, -0.78125, -0.273438, 0.132812, -0.796875, -0.226562, 0.078125, -0.804688, -0.25, -0.09375, -0.78125, -0.273438, -0.078125, -0.804688, -0.25, -0.132812, -0.796875, -0.226562, 0.0, -0.828125, -0.203125, 0.109375, -0.828125, -0.226562, 0.046875, -0.8125, -0.148438, -0.09375, -0.8125, -0.15625, -0.109375, -0.828125, -0.226562, -0.046875, -0.8125, -0.148438, 0.109375, -0.828125, -0.226562, 0.0, -0.828125, -0.203125, 0.078125, -0.804688, -0.25, -0.109375, -0.828125, -0.226562, -0.078125, -0.804688, -0.25, 0.0, -0.828125, -0.203125, 0.0, -0.726562, 0.046875, 0.0, -0.742188, -0.140625, 0.125, -0.8125, -0.101562, 0.0, -0.726562, 0.046875, -0.125, -0.8125, -0.101562, 0.0, -0.742188, -0.140625, 0.125, -0.8125, -0.101562, 0.101562, -0.742188, -0.148438, 0.164062, -0.710938, -0.242188, -0.125, -0.8125, -0.101562, -0.164062, -0.710938, -0.242188, -0.101562, -0.742188, -0.148438, 0.125, -0.75, -0.226562, 0.085938, -0.742188, -0.289062, 0.164062, -0.710938, -0.242188, -0.179688, -0.710938, -0.3125, -0.085938, -0.742188, -0.289062, -0.164062, -0.710938, -0.242188, 0.085938, -0.742188, -0.289062, 0.078125, -0.75, -0.445312, 0.179688, -0.710938, -0.3125, -0.210938, -0.710938, -0.445312, -0.078125, -0.75, -0.445312, -0.179688, -0.710938, -0.3125, 0.3125, -0.570312, -0.4375, 0.257812, -0.554688, -0.3125, 0.210938, -0.710938, -0.445312, -0.179688, -0.710938, -0.3125, -0.257812, -0.554688, -0.3125, -0.210938, -0.710938, -0.445312, 0.257812, -0.554688, -0.3125, 0.234375, -0.554688, -0.25, 0.179688, -0.710938, -0.3125, -0.164062, -0.710938, -0.242188, -0.234375, -0.554688, -0.25, -0.179688, -0.710938, -0.3125, 0.234375, -0.554688, -0.25, 0.203125, -0.5625, -0.1875, 0.164062, -0.710938, -0.242188, -0.234375, -0.554688, -0.25, -0.164062, -0.710938, -0.242188, -0.203125, -0.5625, -0.1875, 0.109375, -0.734375, -0.71875, 0.0, -0.734375, -0.765625, 0.09375, -0.726562, -0.742188, 0.0, -0.71875, -0.773438, 0.0, -0.734375, -0.765625, -0.09375, -0.726562, -0.742188, 0.09375, -0.710938, -0.820312, 0.117188, -0.710938, -0.835938, 0.09375, -0.726562, -0.742188, -0.09375, -0.710938, -0.820312, -0.09375, -0.726562, -0.742188, -0.117188, -0.710938, -0.835938, 0.046875, -0.6875, -0.867188, 0.0625, -0.695312, -0.882812, 0.09375, -0.710938, -0.820312, -0.046875, -0.6875, -0.867188, -0.09375, -0.710938, -0.820312, -0.0625, -0.695312, -0.882812, 0.0, -0.6875, -0.875, 0.0, -0.6875, -0.890625, 0.046875, -0.6875, -0.867188, 0.0, -0.6875, -0.875, -0.046875, -0.6875, -0.867188, 0.0, -0.6875, -0.890625, 0.0, -0.6875, -0.875, 0.046875, -0.6875, -0.867188, 0.0, -0.632812, -0.859375, -0.046875, -0.632812, -0.851562, -0.046875, -0.6875, -0.867188, 0.0, -0.632812, -0.859375, 0.046875, -0.632812, -0.851562, 0.046875, -0.6875, -0.867188, 0.09375, -0.640625, -0.8125, -0.046875, -0.632812, -0.851562, -0.09375, -0.640625, -0.8125, -0.046875, -0.6875, -0.867188, 0.09375, -0.640625, -0.8125, 0.09375, -0.710938, -0.820312, 0.09375, -0.664062, -0.75, -0.09375, -0.640625, -0.8125, -0.09375, -0.664062, -0.75, -0.09375, -0.710938, -0.820312, 0.09375, -0.726562, -0.742188, 0.0, -0.71875, -0.773438, 0.09375, -0.664062, -0.75, 0.0, -0.65625, -0.78125, 0.0, -0.71875, -0.773438, -0.09375, -0.664062, -0.75, 0.09375, -0.664062, -0.75, 0.0, -0.65625, -0.78125, 0.046875, -0.632812, -0.851562, -0.09375, -0.664062, -0.75, -0.046875, -0.632812, -0.851562, 0.0, -0.65625, -0.78125, 0.171875, -0.78125, 0.21875, 0.132812, -0.757812, 0.210938, 0.1875, -0.773438, 0.15625, -0.171875, -0.78125, 0.21875, -0.1875, -0.773438, 0.15625, -0.132812, -0.757812, 0.210938, 0.179688, -0.78125, 0.296875, 0.125, -0.765625, 0.304688, 0.171875, -0.78125, 0.21875, -0.179688, -0.78125, 0.296875, -0.171875, -0.78125, 0.21875, -0.125, -0.765625, 0.304688, 0.164062, -0.773438, 0.414062, 0.125, -0.765625, 0.304688, 0.210938, -0.78125, 0.375, -0.179688, -0.78125, 0.296875, -0.125, -0.765625, 0.304688, -0.210938, -0.78125, 0.375, 0.164062, -0.75, 0.140625, 0.203125, -0.742188, 0.09375, 0.1875, -0.773438, 0.15625, -0.226562, -0.78125, 0.109375, -0.203125, -0.742188, 0.09375, -0.1875, -0.773438, 0.15625, 0.226562, -0.78125, 0.109375, 0.203125, -0.742188, 0.09375, 0.375, -0.742188, 0.0625, -0.226562, -0.78125, 0.109375, -0.375, -0.742188, 0.0625, -0.203125, -0.742188, 0.09375, 0.375, -0.742188, 0.0625, 0.375, -0.703125, 0.015625, 0.476562, -0.71875, 0.101562, -0.375, -0.742188, 0.0625, -0.476562, -0.71875, 0.101562, -0.375, -0.703125, 0.015625, 0.476562, -0.71875, 0.101562, 0.492188, -0.671875, 0.0625, 0.578125, -0.679688, 0.195312, -0.476562, -0.71875, 0.101562, -0.578125, -0.679688, 0.195312, -0.492188, -0.671875, 0.0625, 0.578125, -0.679688, 0.195312, 0.625, -0.648438, 0.1875, 0.585938, -0.6875, 0.289062, -0.578125, -0.679688, 0.195312, -0.585938, -0.6875, 0.289062, -0.625, -0.648438, 0.1875, 0.640625, -0.648438, 0.296875, 0.601562, -0.664062, 0.375, 0.585938, -0.6875, 0.289062, -0.5625, -0.695312, 0.351562, -0.601562, -0.664062, 0.375, -0.585938, -0.6875, 0.289062, 0.601562, -0.664062, 0.375, 0.429688, -0.71875, 0.4375, 0.5625, -0.695312, 0.351562, -0.421875, -0.773438, 0.398438, -0.429688, -0.71875, 0.4375, -0.5625, -0.695312, 0.351562, 0.421875, -0.773438, 0.398438, 0.429688, -0.71875, 0.4375, 0.335938, -0.757812, 0.429688, -0.421875, -0.773438, 0.398438, -0.335938, -0.757812, 0.429688, -0.429688, -0.71875, 0.4375, 0.335938, -0.757812, 0.429688, 0.328125, -0.742188, 0.476562, 0.273438, -0.773438, 0.421875, -0.335938, -0.757812, 0.429688, -0.273438, -0.773438, 0.421875, -0.328125, -0.742188, 0.476562, 0.273438, -0.773438, 0.421875, 0.25, -0.757812, 0.46875, 0.210938, -0.78125, 0.375, -0.273438, -0.773438, 0.421875, -0.210938, -0.78125, 0.375, -0.25, -0.757812, 0.46875, 0.28125, -0.765625, 0.398438, 0.273438, -0.773438, 0.421875, 0.234375, -0.757812, 0.359375, -0.28125, -0.765625, 0.398438, -0.234375, -0.757812, 0.359375, -0.273438, -0.773438, 0.421875, 0.335938, -0.75, 0.40625, 0.335938, -0.757812, 0.429688, 0.28125, -0.765625, 0.398438, -0.335938, -0.75, 0.40625, -0.28125, -0.765625, 0.398438, -0.335938, -0.757812, 0.429688, 0.421875, -0.773438, 0.398438, 0.335938, -0.757812, 0.429688, 0.414062, -0.75, 0.390625, -0.335938, -0.75, 0.40625, -0.335938, -0.757812, 0.429688, -0.414062, -0.75, 0.390625, 0.5625, -0.695312, 0.351562, 0.421875, -0.773438, 0.398438, 0.53125, -0.679688, 0.335938, -0.414062, -0.75, 0.390625, -0.421875, -0.773438, 0.398438, -0.53125, -0.679688, 0.335938, 0.554688, -0.671875, 0.28125, 0.585938, -0.6875, 0.289062, 0.53125, -0.679688, 0.335938, -0.554688, -0.671875, 0.28125, -0.53125, -0.679688, 0.335938, -0.585938, -0.6875, 0.289062, 0.578125, -0.679688, 0.195312, 0.585938, -0.6875, 0.289062, 0.546875, -0.671875, 0.210938, -0.554688, -0.671875, 0.28125, -0.585938, -0.6875, 0.289062, -0.546875, -0.671875, 0.210938, 0.460938, -0.703125, 0.117188, 0.476562, -0.71875, 0.101562, 0.546875, -0.671875, 0.210938, -0.460938, -0.703125, 0.117188, -0.546875, -0.671875, 0.210938, -0.476562, -0.71875, 0.101562, 0.375, -0.742188, 0.0625, 0.476562, -0.71875, 0.101562, 0.375, -0.726562, 0.085938, -0.460938, -0.703125, 0.117188, -0.476562, -0.71875, 0.101562, -0.375, -0.726562, 0.085938, 0.226562, -0.78125, 0.109375, 0.375, -0.742188, 0.0625, 0.242188, -0.757812, 0.125, -0.375, -0.726562, 0.085938, -0.375, -0.742188, 0.0625, -0.242188, -0.757812, 0.125, 0.203125, -0.75, 0.171875, 0.1875, -0.773438, 0.15625, 0.242188, -0.757812, 0.125, -0.203125, -0.75, 0.171875, -0.242188, -0.757812, 0.125, -0.1875, -0.773438, 0.15625, 0.234375, -0.757812, 0.359375, 0.210938, -0.78125, 0.375, 0.195312, -0.757812, 0.296875, -0.234375, -0.757812, 0.359375, -0.195312, -0.757812, 0.296875, -0.210938, -0.78125, 0.375, 0.195312, -0.757812, 0.296875, 0.179688, -0.78125, 0.296875, 0.195312, -0.75, 0.226562, -0.195312, -0.757812, 0.296875, -0.195312, -0.75, 0.226562, -0.179688, -0.78125, 0.296875, 0.195312, -0.75, 0.226562, 0.171875, -0.78125, 0.21875, 0.203125, -0.75, 0.171875, -0.195312, -0.75, 0.226562, -0.203125, -0.75, 0.171875, -0.171875, -0.78125, 0.21875, 0.0, -0.601562, 0.40625, 0.0, -0.742188, 0.429688, 0.109375, -0.609375, 0.460938, 0.0, -0.601562, 0.40625, -0.109375, -0.609375, 0.460938, 0.0, -0.742188, 0.429688, 0.109375, -0.609375, 0.460938, 0.0625, -0.75, 0.492188, 0.195312, -0.617188, 0.664062, -0.109375, -0.609375, 0.460938, -0.195312, -0.617188, 0.664062, -0.0625, -0.75, 0.492188, 0.15625, -0.757812, 0.71875, 0.320312, -0.734375, 0.757812, 0.195312, -0.617188, 0.664062, -0.335938, -0.59375, 0.6875, -0.320312, -0.734375, 0.757812, -0.195312, -0.617188, 0.664062, 0.320312, -0.734375, 0.757812, 0.492188, -0.6875, 0.601562, 0.335938, -0.59375, 0.6875, -0.484375, -0.554688, 0.554688, -0.492188, -0.6875, 0.601562, -0.335938, -0.59375, 0.6875, 0.492188, -0.6875, 0.601562, 0.710938, -0.625, 0.484375, 0.484375, -0.554688, 0.554688, -0.679688, -0.492188, 0.453125, -0.710938, -0.625, 0.484375, -0.484375, -0.554688, 0.554688, 0.679688, -0.492188, 0.453125, 0.710938, -0.625, 0.484375, 0.796875, -0.460938, 0.40625, -0.679688, -0.492188, 0.453125, -0.796875, -0.460938, 0.40625, -0.710938, -0.625, 0.484375, 0.859375, -0.59375, 0.429688, 0.828125, -0.445312, 0.148438, 0.796875, -0.460938, 0.40625, -0.773438, -0.375, 0.164062, -0.828125, -0.445312, 0.148438, -0.796875, -0.460938, 0.40625, 0.773438, -0.375, 0.164062, 0.828125, -0.445312, 0.148438, 0.601562, -0.414062, 0.0, -0.773438, -0.375, 0.164062, -0.601562, -0.414062, 0.0, -0.828125, -0.445312, 0.148438, 0.601562, -0.414062, 0.0, 0.632812, -0.539062, -0.039062, 0.4375, -0.46875, -0.09375, -0.601562, -0.414062, 0.0, -0.4375, -0.46875, -0.09375, -0.632812, -0.539062, -0.039062, 0.0, -0.320312, -0.570312, 0.0, -0.28125, -0.484375, 0.125, -0.359375, -0.539062, -0.179688, -0.257812, -0.414062, 0.0, -0.28125, -0.484375, -0.125, -0.359375, -0.539062, 0.0, -0.34375, -0.804688, 0.0, -0.320312, -0.570312, 0.140625, -0.367188, -0.757812, -0.125, -0.359375, -0.539062, 0.0, -0.320312, -0.570312, -0.140625, -0.367188, -0.757812, 0.0, -0.460938, -0.976562, 0.0, -0.34375, -0.804688, 0.164062, -0.4375, -0.945312, -0.140625, -0.367188, -0.757812, 0.0, -0.34375, -0.804688, -0.164062, -0.4375, -0.945312, 0.164062, -0.4375, -0.945312, 0.179688, -0.554688, -0.96875, 0.0, -0.460938, -0.976562, -0.164062, -0.4375, -0.945312, 0.0, -0.460938, -0.976562, -0.179688, -0.554688, -0.96875, 0.328125, -0.398438, -0.914062, 0.328125, -0.523438, -0.945312, 0.164062, -0.4375, -0.945312, -0.328125, -0.398438, -0.914062, -0.164062, -0.4375, -0.945312, -0.328125, -0.523438, -0.945312, 0.289062, -0.382812, -0.710938, 0.367188, -0.53125, -0.890625, 0.328125, -0.398438, -0.914062, -0.289062, -0.382812, -0.710938, -0.328125, -0.398438, -0.914062, -0.367188, -0.53125, -0.890625, 0.25, -0.390625, -0.5, 0.351562, -0.570312, -0.695312, 0.289062, -0.382812, -0.710938, -0.25, -0.390625, -0.5, -0.289062, -0.382812, -0.710938, -0.351562, -0.570312, -0.695312, 0.25, -0.390625, -0.5, 0.289062, -0.382812, -0.710938, 0.125, -0.359375, -0.539062, -0.25, -0.390625, -0.5, -0.125, -0.359375, -0.539062, -0.289062, -0.382812, -0.710938, 0.289062, -0.382812, -0.710938, 0.328125, -0.398438, -0.914062, 0.140625, -0.367188, -0.757812, -0.164062, -0.4375, -0.945312, -0.328125, -0.398438, -0.914062, -0.140625, -0.367188, -0.757812, 0.234375, -0.40625, -0.351562, 0.25, -0.390625, -0.5, 0.179688, -0.257812, -0.414062, -0.125, -0.359375, -0.539062, -0.25, -0.390625, -0.5, -0.179688, -0.257812, -0.414062, 0.234375, -0.40625, -0.351562, 0.3125, -0.570312, -0.4375, 0.25, -0.390625, -0.5, -0.234375, -0.40625, -0.351562, -0.25, -0.390625, -0.5, -0.3125, -0.570312, -0.4375, 0.257812, -0.554688, -0.3125, 0.21875, -0.429688, -0.28125, 0.234375, -0.554688, -0.25, -0.210938, -0.46875, -0.226562, -0.21875, -0.429688, -0.28125, -0.234375, -0.554688, -0.25, 0.3125, -0.570312, -0.4375, 0.234375, -0.40625, -0.351562, 0.257812, -0.554688, -0.3125, -0.21875, -0.429688, -0.28125, -0.234375, -0.40625, -0.351562, -0.257812, -0.554688, -0.3125, 0.203125, -0.5625, -0.1875, 0.234375, -0.554688, -0.25, 0.203125, -0.5, -0.171875, -0.210938, -0.46875, -0.226562, -0.234375, -0.554688, -0.25, -0.203125, -0.5, -0.171875, 0.203125, -0.5625, -0.1875, 0.203125, -0.5, -0.171875, 0.4375, -0.53125, -0.140625, -0.4375, -0.46875, -0.09375, -0.203125, -0.5, -0.171875, -0.4375, -0.53125, -0.140625, 0.0, 0.828125, 0.070312, 0.335938, 0.664062, 0.054688, 0.0, 0.671875, -0.195312, -0.34375, 0.539062, -0.148438, -0.335938, 0.664062, 0.054688, 0.0, 0.671875, -0.195312, 0.0, 0.671875, -0.195312, 0.34375, 0.539062, -0.148438, 0.0, 0.351562, -0.382812, -0.296875, 0.265625, -0.3125, -0.34375, 0.539062, -0.148438, 0.0, 0.351562, -0.382812, 0.0, -0.1875, -0.460938, 0.0, 0.351562, -0.382812, 0.210938, -0.164062, -0.390625, 0.0, -0.1875, -0.460938, -0.210938, -0.164062, -0.390625, 0.0, 0.351562, -0.382812, 0.0, -0.28125, -0.484375, 0.0, -0.1875, -0.460938, 0.179688, -0.257812, -0.414062, 0.0, -0.28125, -0.484375, -0.179688, -0.257812, -0.414062, 0.0, -0.1875, -0.460938, 0.234375, -0.40625, -0.351562, 0.179688, -0.257812, -0.414062, 0.21875, -0.429688, -0.28125, -0.210938, -0.164062, -0.390625, -0.179688, -0.257812, -0.414062, -0.21875, -0.429688, -0.28125, 0.851562, -0.054688, 0.234375, 0.773438, -0.375, 0.164062, 0.734375, -0.070312, -0.046875, -0.851562, -0.054688, 0.234375, -0.734375, -0.070312, -0.046875, -0.773438, -0.375, 0.164062, 0.0, 0.851562, 0.5625, 0.460938, 0.703125, 0.4375, 0.0, 0.828125, 0.070312, -0.335938, 0.664062, 0.054688, -0.460938, 0.703125, 0.4375, 0.0, 0.828125, 0.070312, 0.0, -0.289062, 0.898438, 0.453125, -0.234375, 0.851562, 0.0, 0.078125, 0.984375, -0.453125, 0.070312, 0.929688, -0.453125, -0.234375, 0.851562, 0.0, 0.078125, 0.984375, 0.0, 0.546875, 0.898438, 0.0, 0.078125, 0.984375, 0.453125, 0.382812, 0.867188, 0.0, 0.546875, 0.898438, -0.453125, 0.382812, 0.867188, 0.0, 0.078125, 0.984375, 0.0, 0.851562, 0.5625, 0.0, 0.546875, 0.898438, 0.460938, 0.703125, 0.4375, 0.0, 0.851562, 0.5625, -0.460938, 0.703125, 0.4375, 0.0, 0.546875, 0.898438, 0.632812, -0.28125, 0.453125, 0.679688, -0.492188, 0.453125, 0.726562, -0.335938, 0.40625, -0.632812, -0.28125, 0.453125, -0.726562, -0.335938, 0.40625, -0.679688, -0.492188, 0.453125, 0.640625, -0.054688, 0.703125, 0.632812, -0.28125, 0.453125, 0.796875, -0.125, 0.5625, -0.640625, -0.054688, 0.703125, -0.796875, -0.125, 0.5625, -0.632812, -0.28125, 0.453125, 0.640625, 0.195312, 0.75, 0.640625, -0.054688, 0.703125, 0.796875, 0.117188, 0.617188, -0.640625, 0.195312, 0.75, -0.796875, 0.117188, 0.617188, -0.640625, -0.054688, 0.703125, 0.640625, 0.445312, 0.679688, 0.640625, 0.195312, 0.75, 0.796875, 0.359375, 0.539062, -0.640625, 0.445312, 0.679688, -0.796875, 0.359375, 0.539062, -0.640625, 0.195312, 0.75, 0.773438, 0.4375, 0.265625, 0.617188, 0.585938, 0.328125, 0.796875, 0.359375, 0.539062, -0.640625, 0.445312, 0.679688, -0.617188, 0.585938, 0.328125, -0.796875, 0.359375, 0.539062, 0.617188, 0.585938, 0.328125, 0.460938, 0.703125, 0.4375, 0.640625, 0.445312, 0.679688, -0.617188, 0.585938, 0.328125, -0.640625, 0.445312, 0.679688, -0.460938, 0.703125, 0.4375, 0.640625, 0.445312, 0.679688, 0.453125, 0.382812, 0.867188, 0.640625, 0.195312, 0.75, -0.640625, 0.445312, 0.679688, -0.640625, 0.195312, 0.75, -0.453125, 0.382812, 0.867188, 0.640625, 0.195312, 0.75, 0.453125, 0.070312, 0.929688, 0.640625, -0.054688, 0.703125, -0.640625, 0.195312, 0.75, -0.640625, -0.054688, 0.703125, -0.453125, 0.070312, 0.929688, 0.640625, -0.054688, 0.703125, 0.453125, -0.234375, 0.851562, 0.632812, -0.28125, 0.453125, -0.640625, -0.054688, 0.703125, -0.632812, -0.28125, 0.453125, -0.453125, -0.234375, 0.851562, 0.484375, -0.554688, 0.554688, 0.679688, -0.492188, 0.453125, 0.460938, -0.429688, 0.523438, -0.632812, -0.28125, 0.453125, -0.679688, -0.492188, 0.453125, -0.460938, -0.429688, 0.523438, 0.0, -0.570312, 0.570312, 0.460938, -0.429688, 0.523438, 0.0, -0.289062, 0.898438, -0.453125, -0.234375, 0.851562, -0.460938, -0.429688, 0.523438, 0.0, -0.289062, 0.898438, 0.109375, -0.609375, 0.460938, 0.195312, -0.617188, 0.664062, 0.484375, -0.554688, 0.554688, -0.335938, -0.59375, 0.6875, -0.195312, -0.617188, 0.664062, -0.484375, -0.554688, 0.554688, 0.0, -0.570312, 0.570312, 0.109375, -0.609375, 0.460938, 0.460938, -0.429688, 0.523438, 0.0, -0.570312, 0.570312, -0.460938, -0.429688, 0.523438, -0.109375, -0.609375, 0.460938, 0.796875, -0.460938, 0.40625, 0.773438, -0.375, 0.164062, 0.726562, -0.335938, 0.40625, -0.851562, -0.054688, 0.234375, -0.773438, -0.375, 0.164062, -0.726562, -0.335938, 0.40625, 0.726562, -0.335938, 0.40625, 0.851562, -0.054688, 0.234375, 0.796875, -0.125, 0.5625, -0.726562, -0.335938, 0.40625, -0.796875, -0.125, 0.5625, -0.851562, -0.054688, 0.234375, 0.796875, -0.125, 0.5625, 0.859375, 0.046875, 0.320312, 0.796875, 0.117188, 0.617188, -0.796875, -0.125, 0.5625, -0.796875, 0.117188, 0.617188, -0.859375, 0.046875, 0.320312, 0.773438, 0.4375, 0.265625, 0.796875, 0.359375, 0.539062, 0.820312, 0.203125, 0.328125, -0.796875, 0.117188, 0.617188, -0.796875, 0.359375, 0.539062, -0.820312, 0.203125, 0.328125, 0.210938, -0.164062, -0.390625, 0.296875, 0.265625, -0.3125, 0.40625, -0.148438, -0.171875, -0.429688, 0.210938, -0.195312, -0.296875, 0.265625, -0.3125, -0.40625, -0.148438, -0.171875, 0.734375, -0.070312, -0.046875, 0.40625, -0.148438, -0.171875, 0.59375, 0.164062, -0.125, -0.429688, 0.210938, -0.195312, -0.40625, -0.148438, -0.171875, -0.59375, 0.164062, -0.125, 0.734375, -0.070312, -0.046875, 0.601562, -0.414062, 0.0, 0.40625, -0.148438, -0.171875, -0.734375, -0.070312, -0.046875, -0.40625, -0.148438, -0.171875, -0.601562, -0.414062, 0.0, 0.40625, -0.148438, -0.171875, 0.4375, -0.46875, -0.09375, 0.21875, -0.429688, -0.28125, -0.40625, -0.148438, -0.171875, -0.21875, -0.429688, -0.28125, -0.4375, -0.46875, -0.09375, 0.773438, 0.4375, 0.265625, 0.640625, 0.429688, -0.007812, 0.617188, 0.585938, 0.328125, -0.484375, 0.546875, 0.023438, -0.640625, 0.429688, -0.007812, -0.617188, 0.585938, 0.328125, 0.460938, 0.703125, 0.4375, 0.617188, 0.585938, 0.328125, 0.335938, 0.664062, 0.054688, -0.484375, 0.546875, 0.023438, -0.617188, 0.585938, 0.328125, -0.335938, 0.664062, 0.054688, 0.59375, 0.164062, -0.125, 0.429688, 0.210938, -0.195312, 0.640625, 0.429688, -0.007812, -0.484375, 0.546875, 0.023438, -0.429688, 0.210938, -0.195312, -0.640625, 0.429688, -0.007812, 0.296875, 0.265625, -0.3125, 0.34375, 0.539062, -0.148438, 0.429688, 0.210938, -0.195312, -0.484375, 0.546875, 0.023438, -0.34375, 0.539062, -0.148438, -0.429688, 0.210938, -0.195312, 1.023438, 0.3125, 0.476562, 0.890625, 0.234375, 0.40625, 1.015625, 0.289062, 0.414062, -0.921875, 0.21875, 0.359375, -0.890625, 0.234375, 0.40625, -1.015625, 0.289062, 0.414062, 1.234375, 0.421875, 0.507812, 1.023438, 0.3125, 0.476562, 1.1875, 0.390625, 0.4375, -1.234375, 0.421875, 0.507812, -1.1875, 0.390625, 0.4375, -1.023438, 0.3125, 0.476562, 1.234375, 0.421875, 0.507812, 1.1875, 0.390625, 0.4375, 1.351562, 0.421875, 0.320312, -1.265625, 0.40625, 0.289062, -1.1875, 0.390625, 0.4375, -1.351562, 0.421875, 0.320312, 1.351562, 0.421875, 0.320312, 1.265625, 0.40625, 0.289062, 1.28125, 0.429688, 0.054688, -1.210938, 0.40625, 0.078125, -1.265625, 0.40625, 0.289062, -1.28125, 0.429688, 0.054688, 1.28125, 0.429688, 0.054688, 1.210938, 0.40625, 0.078125, 1.039062, 0.328125, -0.101562, -1.03125, 0.304688, -0.039062, -1.210938, 0.40625, 0.078125, -1.039062, 0.328125, -0.101562, 0.773438, 0.125, -0.140625, 1.039062, 0.328125, -0.101562, 0.828125, 0.132812, -0.070312, -0.773438, 0.125, -0.140625, -0.828125, 0.132812, -0.070312, -1.039062, 0.328125, -0.101562, 0.828125, 0.132812, -0.070312, 1.03125, 0.304688, -0.039062, 0.882812, 0.210938, -0.023438, -0.828125, 0.132812, -0.070312, -0.882812, 0.210938, -0.023438, -1.03125, 0.304688, -0.039062, 1.03125, 0.304688, -0.039062, 1.210938, 0.40625, 0.078125, 1.039062, 0.367188, 0.0, -1.03125, 0.304688, -0.039062, -1.039062, 0.367188, 0.0, -1.210938, 0.40625, 0.078125, 1.265625, 0.40625, 0.289062, 1.234375, 0.445312, 0.25, 1.210938, 0.40625, 0.078125, -1.1875, 0.445312, 0.09375, -1.234375, 0.445312, 0.25, -1.210938, 0.40625, 0.078125, 1.1875, 0.390625, 0.4375, 1.171875, 0.4375, 0.359375, 1.265625, 0.40625, 0.289062, -1.234375, 0.445312, 0.25, -1.171875, 0.4375, 0.359375, -1.265625, 0.40625, 0.289062, 1.015625, 0.289062, 0.414062, 1.023438, 0.359375, 0.34375, 1.1875, 0.390625, 0.4375, -1.171875, 0.4375, 0.359375, -1.023438, 0.359375, 0.34375, -1.1875, 0.390625, 0.4375, 1.023438, 0.359375, 0.34375, 1.015625, 0.289062, 0.414062, 0.945312, 0.289062, 0.304688, -1.023438, 0.359375, 0.34375, -0.945312, 0.289062, 0.304688, -1.015625, 0.289062, 0.414062, 0.734375, -0.070312, -0.046875, 0.59375, 0.164062, -0.125, 0.726562, 0.070312, 0.0, -0.71875, 0.171875, -0.023438, -0.59375, 0.164062, -0.125, -0.726562, 0.070312, 0.0, 0.59375, 0.164062, -0.125, 0.773438, 0.125, -0.140625, 0.71875, 0.171875, -0.023438, -0.828125, 0.132812, -0.070312, -0.773438, 0.125, -0.140625, -0.71875, 0.171875, -0.023438, 0.859375, 0.046875, 0.320312, 0.851562, -0.054688, 0.234375, 0.726562, 0.070312, 0.0, -0.859375, 0.046875, 0.320312, -0.726562, 0.070312, 0.0, -0.851562, -0.054688, 0.234375, 0.890625, 0.234375, 0.40625, 0.820312, 0.203125, 0.328125, 0.921875, 0.21875, 0.359375, -0.890625, 0.234375, 0.40625, -0.921875, 0.21875, 0.359375, -0.820312, 0.203125, 0.328125, 0.71875, 0.171875, -0.023438, 0.828125, 0.132812, -0.070312, 0.8125, 0.273438, -0.015625, -0.71875, 0.171875, -0.023438, -0.8125, 0.273438, -0.015625, -0.828125, 0.132812, -0.070312, 0.84375, 0.273438, 0.015625, 0.71875, 0.1875, 0.039062, 0.8125, 0.273438, -0.015625, -0.71875, 0.171875, -0.023438, -0.71875, 0.1875, 0.039062, -0.8125, 0.273438, -0.015625, 0.820312, 0.273438, 0.085938, 0.757812, 0.273438, 0.09375, 0.84375, 0.273438, 0.015625, -0.820312, 0.273438, 0.085938, -0.84375, 0.273438, 0.015625, -0.757812, 0.273438, 0.09375, 0.835938, 0.273438, 0.171875, 0.796875, 0.210938, 0.203125, 0.757812, 0.273438, 0.09375, -0.71875, 0.1875, 0.039062, -0.796875, 0.210938, 0.203125, -0.757812, 0.273438, 0.09375, 0.84375, 0.210938, 0.289062, 0.796875, 0.210938, 0.203125, 0.890625, 0.265625, 0.242188, -0.835938, 0.273438, 0.171875, -0.796875, 0.210938, 0.203125, -0.890625, 0.265625, 0.242188, 0.921875, 0.21875, 0.359375, 0.84375, 0.210938, 0.289062, 0.945312, 0.289062, 0.304688, -0.890625, 0.265625, 0.242188, -0.84375, 0.210938, 0.289062, -0.945312, 0.289062, 0.304688, 0.859375, 0.046875, 0.320312, 0.796875, 0.210938, 0.203125, 0.820312, 0.203125, 0.328125, -0.84375, 0.210938, 0.289062, -0.796875, 0.210938, 0.203125, -0.820312, 0.203125, 0.328125, 0.859375, 0.046875, 0.320312, 0.726562, 0.070312, 0.0, 0.796875, 0.210938, 0.203125, -0.71875, 0.1875, 0.039062, -0.726562, 0.070312, 0.0, -0.796875, 0.210938, 0.203125, 0.953125, 0.34375, 0.289062, 0.945312, 0.289062, 0.304688, 0.890625, 0.320312, 0.234375, -0.953125, 0.34375, 0.289062, -0.890625, 0.320312, 0.234375, -0.945312, 0.289062, 0.304688, 0.890625, 0.265625, 0.242188, 0.835938, 0.273438, 0.171875, 0.890625, 0.320312, 0.234375, -0.84375, 0.320312, 0.171875, -0.835938, 0.273438, 0.171875, -0.890625, 0.320312, 0.234375, 0.84375, 0.320312, 0.171875, 0.835938, 0.273438, 0.171875, 0.765625, 0.320312, 0.09375, -0.84375, 0.320312, 0.171875, -0.765625, 0.320312, 0.09375, -0.835938, 0.273438, 0.171875, 0.757812, 0.273438, 0.09375, 0.820312, 0.273438, 0.085938, 0.765625, 0.320312, 0.09375, -0.828125, 0.320312, 0.078125, -0.820312, 0.273438, 0.085938, -0.765625, 0.320312, 0.09375, 0.820312, 0.273438, 0.085938, 0.84375, 0.273438, 0.015625, 0.828125, 0.320312, 0.078125, -0.851562, 0.320312, 0.015625, -0.84375, 0.273438, 0.015625, -0.828125, 0.320312, 0.078125, 0.851562, 0.320312, 0.015625, 0.84375, 0.273438, 0.015625, 0.8125, 0.320312, -0.015625, -0.851562, 0.320312, 0.015625, -0.8125, 0.320312, -0.015625, -0.84375, 0.273438, 0.015625, 0.8125, 0.320312, -0.015625, 0.8125, 0.273438, -0.015625, 0.882812, 0.265625, -0.015625, -0.8125, 0.320312, -0.015625, -0.882812, 0.265625, -0.015625, -0.8125, 0.273438, -0.015625, 1.039062, 0.414062, 0.328125, 1.023438, 0.359375, 0.34375, 0.953125, 0.34375, 0.289062, -1.039062, 0.414062, 0.328125, -0.953125, 0.34375, 0.289062, -1.023438, 0.359375, 0.34375, 1.1875, 0.484375, 0.34375, 1.171875, 0.4375, 0.359375, 1.039062, 0.414062, 0.328125, -1.1875, 0.484375, 0.34375, -1.039062, 0.414062, 0.328125, -1.171875, 0.4375, 0.359375, 1.257812, 0.492188, 0.242188, 1.234375, 0.445312, 0.25, 1.1875, 0.484375, 0.34375, -1.257812, 0.492188, 0.242188, -1.1875, 0.484375, 0.34375, -1.234375, 0.445312, 0.25, 1.1875, 0.445312, 0.09375, 1.234375, 0.445312, 0.25, 1.210938, 0.484375, 0.085938, -1.257812, 0.492188, 0.242188, -1.234375, 0.445312, 0.25, -1.210938, 0.484375, 0.085938, 1.039062, 0.367188, 0.0, 1.1875, 0.445312, 0.09375, 1.046875, 0.421875, 0.0, -1.210938, 0.484375, 0.085938, -1.1875, 0.445312, 0.09375, -1.046875, 0.421875, 0.0, 0.882812, 0.210938, -0.023438, 1.039062, 0.367188, 0.0, 0.882812, 0.265625, -0.015625, -1.046875, 0.421875, 0.0, -1.039062, 0.367188, 0.0, -0.882812, 0.265625, -0.015625, 0.828125, 0.320312, 0.078125, 0.851562, 0.320312, 0.015625, 0.890625, 0.328125, 0.109375, -0.9375, 0.335938, 0.0625, -0.851562, 0.320312, 0.015625, -0.890625, 0.328125, 0.109375, 0.890625, 0.328125, 0.109375, 0.9375, 0.335938, 0.0625, 0.960938, 0.351562, 0.171875, -1.0, 0.367188, 0.125, -0.9375, 0.335938, 0.0625, -0.960938, 0.351562, 0.171875, 1.015625, 0.375, 0.234375, 0.960938, 0.351562, 0.171875, 1.054688, 0.382812, 0.1875, -1.015625, 0.375, 0.234375, -1.054688, 0.382812, 0.1875, -0.960938, 0.351562, 0.171875, 1.015625, 0.375, 0.234375, 1.054688, 0.382812, 0.1875, 1.085938, 0.390625, 0.273438, -1.109375, 0.390625, 0.210938, -1.054688, 0.382812, 0.1875, -1.085938, 0.390625, 0.273438, 1.085938, 0.390625, 0.273438, 1.039062, 0.414062, 0.328125, 1.015625, 0.375, 0.234375, -1.085938, 0.390625, 0.273438, -1.015625, 0.375, 0.234375, -1.039062, 0.414062, 0.328125, 0.890625, 0.320312, 0.234375, 0.960938, 0.351562, 0.171875, 0.953125, 0.34375, 0.289062, -1.015625, 0.375, 0.234375, -0.960938, 0.351562, 0.171875, -0.953125, 0.34375, 0.289062, 0.890625, 0.320312, 0.234375, 0.84375, 0.320312, 0.171875, 0.960938, 0.351562, 0.171875, -0.890625, 0.328125, 0.109375, -0.84375, 0.320312, 0.171875, -0.960938, 0.351562, 0.171875, 0.765625, 0.320312, 0.09375, 0.828125, 0.320312, 0.078125, 0.84375, 0.320312, 0.171875, -0.765625, 0.320312, 0.09375, -0.84375, 0.320312, 0.171875, -0.828125, 0.320312, 0.078125, 0.8125, 0.320312, -0.015625, 0.882812, 0.265625, -0.015625, 0.851562, 0.320312, 0.015625, -0.9375, 0.335938, 0.0625, -0.882812, 0.265625, -0.015625, -0.851562, 0.320312, 0.015625, 0.882812, 0.265625, -0.015625, 1.046875, 0.421875, 0.0, 0.9375, 0.335938, 0.0625, -0.882812, 0.265625, -0.015625, -0.9375, 0.335938, 0.0625, -1.046875, 0.421875, 0.0, 1.210938, 0.484375, 0.085938, 1.054688, 0.382812, 0.1875, 1.046875, 0.421875, 0.0, -1.0, 0.367188, 0.125, -1.054688, 0.382812, 0.1875, -1.046875, 0.421875, 0.0, 1.257812, 0.492188, 0.242188, 1.109375, 0.390625, 0.210938, 1.210938, 0.484375, 0.085938, -1.054688, 0.382812, 0.1875, -1.109375, 0.390625, 0.210938, -1.210938, 0.484375, 0.085938, 1.257812, 0.492188, 0.242188, 1.1875, 0.484375, 0.34375, 1.109375, 0.390625, 0.210938, -1.257812, 0.492188, 0.242188, -1.109375, 0.390625, 0.210938, -1.1875, 0.484375, 0.34375, 1.039062, 0.492188, -0.085938, 1.039062, 0.328125, -0.101562, 0.789062, 0.328125, -0.125, -1.039062, 0.492188, -0.085938, -0.789062, 0.328125, -0.125, -1.039062, 0.328125, -0.101562, 1.3125, 0.53125, 0.054688, 1.28125, 0.429688, 0.054688, 1.039062, 0.492188, -0.085938, -1.3125, 0.53125, 0.054688, -1.039062, 0.492188, -0.085938, -1.28125, 0.429688, 0.054688, 1.351562, 0.421875, 0.320312, 1.28125, 0.429688, 0.054688, 1.367188, 0.5, 0.296875, -1.3125, 0.53125, 0.054688, -1.28125, 0.429688, 0.054688, -1.367188, 0.5, 0.296875, 1.234375, 0.421875, 0.507812, 1.351562, 0.421875, 0.320312, 1.25, 0.546875, 0.46875, -1.367188, 0.5, 0.296875, -1.351562, 0.421875, 0.320312, -1.25, 0.546875, 0.46875, 1.023438, 0.3125, 0.476562, 1.234375, 0.421875, 0.507812, 1.023438, 0.484375, 0.4375, -1.25, 0.546875, 0.46875, -1.234375, 0.421875, 0.507812, -1.023438, 0.484375, 0.4375, 0.890625, 0.234375, 0.40625, 1.023438, 0.3125, 0.476562, 0.859375, 0.382812, 0.382812, -1.023438, 0.484375, 0.4375, -1.023438, 0.3125, 0.476562, -0.859375, 0.382812, 0.382812, 1.023438, 0.484375, 0.4375, 1.039062, 0.492188, -0.085938, 0.859375, 0.382812, 0.382812, -0.789062, 0.328125, -0.125, -1.039062, 0.492188, -0.085938, -0.859375, 0.382812, 0.382812, 1.039062, 0.492188, -0.085938, 1.023438, 0.484375, 0.4375, 1.3125, 0.53125, 0.054688, -1.039062, 0.492188, -0.085938, -1.3125, 0.53125, 0.054688, -1.023438, 0.484375, 0.4375, 0.773438, 0.4375, 0.265625, 0.820312, 0.203125, 0.328125, 0.859375, 0.382812, 0.382812, -0.890625, 0.234375, 0.40625, -0.820312, 0.203125, 0.328125, -0.859375, 0.382812, 0.382812, 0.640625, 0.429688, -0.007812, 0.773438, 0.4375, 0.265625, 0.789062, 0.328125, -0.125, -0.640625, 0.429688, -0.007812, -0.789062, 0.328125, -0.125, -0.773438, 0.4375, 0.265625, 0.773438, 0.125, -0.140625, 0.59375, 0.164062, -0.125, 0.789062, 0.328125, -0.125, -0.773438, 0.125, -0.140625, -0.789062, 0.328125, -0.125, -0.59375, 0.164062, -0.125],

    "normals": [0.969298, -0.245552, -0.011811, 0.728996, -0.193426, -0.656575, 0.607624, -0.608478, -0.510392, -0.607624, -0.608478, -0.510392, -0.728996, -0.193426, -0.656575, -0.969298, -0.245552, -0.011811, 0.800104, -0.599841, -0.002838, 0.607624, -0.608478, -0.510392, 0.680166, -0.488815, -0.546251, -0.680166, -0.488815, -0.546251, -0.607624, -0.608478, -0.510392, -0.800104, -0.599841, -0.002838, 0.607624, -0.608478, -0.510392, 0.09949, -0.652211, -0.751457, 0.119327, -0.476272, -0.871151, -0.119327, -0.476272, -0.871151, -0.09949, -0.652211, -0.751457, -0.607624, -0.608478, -0.510392, 0.728996, -0.193426, -0.656575, 0.031404, -0.252907, -0.966948, 0.09949, -0.652211, -0.751457, -0.09949, -0.652211, -0.751457, -0.031404, -0.252907, -0.966948, -0.728996, -0.193426, -0.656575, 0.031404, -0.252907, -0.966948, -0.653066, -0.319315, -0.686636, -0.456282, -0.710746, -0.535356, 0.456282, -0.710746, -0.535356, 0.653066, -0.319315, -0.686636, -0.031404, -0.252907, -0.966948, 0.09949, -0.652211, -0.751457, -0.456282, -0.710746, -0.535356, -0.55385, -0.540635, -0.633198, 0.55385, -0.540635, -0.633198, 0.456282, -0.710746, -0.535356, -0.09949, -0.652211, -0.751457, -0.689291, -0.724418, -0.004578, -0.809717, -0.586749, -0.006989, -0.55385, -0.540635, -0.633198, 0.689291, -0.724418, -0.004578, 0.456282, -0.710746, -0.535356, 0.55385, -0.540635, -0.633198, -0.952574, -0.303995, -0.013123, -0.689291, -0.724418, -0.004578, -0.456282, -0.710746, -0.535356, 0.952574, -0.303995, -0.013123, 0.653066, -0.319315, -0.686636, 0.456282, -0.710746, -0.535356, -0.952574, -0.303995, -0.013123, -0.664357, -0.305582, 0.682058, -0.455947, -0.720664, 0.522202, 0.455947, -0.720664, 0.522202, 0.664357, -0.305582, 0.682058, 0.952574, -0.303995, -0.013123, -0.455947, -0.720664, 0.522202, -0.530595, -0.571703, 0.625751, -0.809717, -0.586749, -0.006989, 0.455947, -0.720664, 0.522202, 0.689291, -0.724418, -0.004578, 0.809717, -0.586749, -0.006989, 0.103061, -0.664388, 0.740196, 0.125736, -0.525254, 0.841578, -0.530595, -0.571703, 0.625751, -0.103061, -0.664388, 0.740196, 0.455947, -0.720664, 0.522202, 0.530595, -0.571703, 0.625751, 0.025727, -0.231147, 0.972564, 0.103061, -0.664388, 0.740196, -0.455947, -0.720664, 0.522202, -0.025727, -0.231147, 0.972564, 0.664357, -0.305582, 0.682058, 0.455947, -0.720664, 0.522202, 0.736381, -0.180273, 0.652089, 0.610218, -0.618061, 0.49559, 0.103061, -0.664388, 0.740196, -0.736381, -0.180273, 0.652089, -0.025727, -0.231147, 0.972564, -0.103061, -0.664388, 0.740196, 0.610218, -0.618061, 0.49559, 0.668203, -0.514786, 0.537095, 0.125736, -0.525254, 0.841578, -0.610218, -0.618061, 0.49559, -0.103061, -0.664388, 0.740196, -0.125736, -0.525254, 0.841578, 0.800104, -0.599841, -0.002838, 0.868221, -0.496109, -0.00473, 0.668203, -0.514786, 0.537095, -0.800104, -0.599841, -0.002838, -0.610218, -0.618061, 0.49559, -0.668203, -0.514786, 0.537095, 0.969298, -0.245552, -0.011811, 0.800104, -0.599841, -0.002838, 0.610218, -0.618061, 0.49559, -0.969298, -0.245552, -0.011811, -0.736381, -0.180273, 0.652089, -0.610218, -0.618061, 0.49559, 0.736381, -0.180273, 0.652089, 0.72161, -0.222388, 0.655568, 0.964446, -0.263863, -0.012665, -0.736381, -0.180273, 0.652089, -0.969298, -0.245552, -0.011811, -0.964446, -0.263863, -0.012665, 0.025727, -0.231147, 0.972564, 0.043153, -0.341441, 0.938902, 0.72161, -0.222388, 0.655568, -0.025727, -0.231147, 0.972564, -0.736381, -0.180273, 0.652089, -0.72161, -0.222388, 0.655568, -0.664357, -0.305582, 0.682058, -0.623676, -0.464675, 0.628529, 0.043153, -0.341441, 0.938902, 0.664357, -0.305582, 0.682058, -0.025727, -0.231147, 0.972564, -0.043153, -0.341441, 0.938902, -0.952574, -0.303995, -0.013123, -0.926969, -0.374859, -0.01294, -0.623676, -0.464675, 0.628529, 0.952574, -0.303995, -0.013123, 0.664357, -0.305582, 0.682058, 0.623676, -0.464675, 0.628529, -0.952574, -0.303995, -0.013123, -0.653066, -0.319315, -0.686636, -0.615864, -0.464095, -0.636616, 0.615864, -0.464095, -0.636616, 0.653066, -0.319315, -0.686636, 0.952574, -0.303995, -0.013123, -0.653066, -0.319315, -0.686636, 0.031404, -0.252907, -0.966948, 0.042543, -0.337474, -0.940336, -0.042543, -0.337474, -0.940336, -0.031404, -0.252907, -0.966948, 0.653066, -0.319315, -0.686636, 0.031404, -0.252907, -0.966948, 0.728996, -0.193426, -0.656575, 0.715171, -0.222724, -0.662465, -0.715171, -0.222724, -0.662465, -0.728996, -0.193426, -0.656575, -0.031404, -0.252907, -0.966948, 0.728996, -0.193426, -0.656575, 0.969298, -0.245552, -0.011811, 0.964446, -0.263863, -0.012665, -0.964446, -0.263863, -0.012665, -0.969298, -0.245552, -0.011811, -0.728996, -0.193426, -0.656575, 0.183599, -0.982971, -0.00531, 0.715171, -0.222724, -0.662465, 0.964446, -0.263863, -0.012665, -0.964446, -0.263863, -0.012665, -0.715171, -0.222724, -0.662465, -0.183599, -0.982971, -0.00531, 0.042543, -0.337474, -0.940336, 0.715171, -0.222724, -0.662465, 0.183599, -0.982971, -0.00531, -0.183599, -0.982971, -0.00531, -0.715171, -0.222724, -0.662465, -0.042543, -0.337474, -0.940336, 0.183599, -0.982971, -0.00531, -0.615864, -0.464095, -0.636616, 0.042543, -0.337474, -0.940336, -0.042543, -0.337474, -0.940336, 0.615864, -0.464095, -0.636616, -0.183599, -0.982971, -0.00531, 0.183599, -0.982971, -0.00531, -0.926969, -0.374859, -0.01294, -0.615864, -0.464095, -0.636616, 0.615864, -0.464095, -0.636616, 0.926969, -0.374859, -0.01294, -0.183599, -0.982971, -0.00531, 0.183599, -0.982971, -0.00531, -0.623676, -0.464675, 0.628529, -0.926969, -0.374859, -0.01294, 0.926969, -0.374859, -0.01294, 0.623676, -0.464675, 0.628529, -0.183599, -0.982971, -0.00531, 0.183599, -0.982971, -0.00531, 0.043153, -0.341441, 0.938902, -0.623676, -0.464675, 0.628529, 0.623676, -0.464675, 0.628529, -0.043153, -0.341441, 0.938902, -0.183599, -0.982971, -0.00531, 0.183599, -0.982971, -0.00531, 0.72161, -0.222388, 0.655568, 0.043153, -0.341441, 0.938902, -0.043153, -0.341441, 0.938902, -0.72161, -0.222388, 0.655568, -0.183599, -0.982971, -0.00531, 0.183599, -0.982971, -0.00531, 0.964446, -0.263863, -0.012665, 0.72161, -0.222388, 0.655568, -0.72161, -0.222388, 0.655568, -0.964446, -0.263863, -0.012665, -0.183599, -0.982971, -0.00531, 0.15537, -0.632282, -0.758965, 0.0, -0.63155, -0.775323, 0.0, -0.252266, -0.96765, -0.15537, -0.632282, -0.758965, -0.159551, -0.152898, -0.975249, 0.0, -0.252266, -0.96765, 0.35023, -0.684683, -0.639149, 0.15537, -0.632282, -0.758965, 0.159551, -0.152898, -0.975249, -0.35023, -0.684683, -0.639149, -0.526658, -0.161107, -0.834651, -0.159551, -0.152898, -0.975249, 0.945708, -0.197699, -0.257851, 0.55565, -0.799982, -0.226356, 0.35023, -0.684683, -0.639149, -0.35023, -0.684683, -0.639149, -0.55565, -0.799982, -0.226356, -0.945708, -0.197699, -0.257851, 0.972808, -0.208716, 0.100314, 0.565172, -0.824396, -0.029725, 0.55565, -0.799982, -0.226356, -0.55565, -0.799982, -0.226356, -0.565172, -0.824396, -0.029725, -0.972808, -0.208716, 0.100314, 0.955718, -0.156468, 0.249184, 0.593677, -0.797388, 0.108158, 0.565172, -0.824396, -0.029725, -0.565172, -0.824396, -0.029725, -0.593677, -0.797388, 0.108158, -0.955718, -0.156468, 0.249184, 0.891537, -0.309458, -0.330668, 0.348827, 0.008148, -0.937132, 0.344279, -0.763298, -0.546617, -0.344279, -0.763298, -0.546617, -0.348827, 0.008148, -0.937132, -0.891537, -0.309458, -0.330668, 0.587481, -0.196966, -0.784875, 0.49913, -0.780663, -0.376049, 0.344279, -0.763298, -0.546617, -0.587481, -0.196966, -0.784875, -0.348827, 0.008148, -0.937132, -0.344279, -0.763298, -0.546617, 0.587481, -0.196966, -0.784875, 0.90698, 0.128941, -0.400922, 0.566546, -0.759819, -0.318796, -0.566546, -0.759819, -0.318796, -0.90698, 0.128941, -0.400922, -0.587481, -0.196966, -0.784875, 0.845119, -0.298502, 0.443403, 0.460707, -0.875637, -0.14481, 0.566546, -0.759819, -0.318796, -0.845119, -0.298502, 0.443403, -0.90698, 0.128941, -0.400922, -0.566546, -0.759819, -0.318796, 0.517045, -0.212531, 0.829127, 0.480117, -0.857814, -0.183264, 0.460707, -0.875637, -0.14481, -0.517045, -0.212531, 0.829127, -0.845119, -0.298502, 0.443403, -0.460707, -0.875637, -0.14481, 0.597552, -0.164586, 0.784722, 0.308451, -0.951201, 0.003845, 0.480117, -0.857814, -0.183264, -0.597552, -0.164586, 0.784722, -0.517045, -0.212531, 0.829127, -0.480117, -0.857814, -0.183264, 0.597552, -0.164586, 0.784722, 0.231269, -0.175054, 0.956999, 0.266579, -0.939146, 0.21659, -0.266579, -0.939146, 0.21659, -0.231269, -0.175054, 0.956999, -0.597552, -0.164586, 0.784722, -0.60506, -0.209754, 0.768029, -0.157384, -0.973449, 0.166021, 0.266579, -0.939146, 0.21659, 0.60506, -0.209754, 0.768029, -0.231269, -0.175054, 0.956999, -0.266579, -0.939146, 0.21659, -0.824183, -0.147313, 0.54677, -0.061098, -0.997803, -0.025239, -0.157384, -0.973449, 0.166021, 0.824183, -0.147313, 0.54677, 0.60506, -0.209754, 0.768029, 0.157384, -0.973449, 0.166021, 0.0, -0.267281, 0.963591, 0.0, -0.996551, -0.082736, -0.061098, -0.997803, -0.025239, 0.0, -0.267281, 0.963591, 0.824183, -0.147313, 0.54677, 0.061098, -0.997803, -0.025239, 0.258156, -0.957762, -0.126499, -0.157384, -0.973449, 0.166021, -0.061098, -0.997803, -0.025239, -0.258156, -0.957762, -0.126499, -0.36784, -0.885556, -0.283608, 0.061098, -0.997803, -0.025239, 0.258156, -0.957762, -0.126499, 0.149022, -0.976714, -0.154149, 0.266579, -0.939146, 0.21659, -0.266579, -0.939146, 0.21659, -0.149022, -0.976714, -0.154149, -0.258156, -0.957762, -0.126499, 0.308451, -0.951201, 0.003845, 0.266579, -0.939146, 0.21659, 0.149022, -0.976714, -0.154149, -0.308451, -0.951201, 0.003845, -0.219001, -0.975005, 0.037141, -0.149022, -0.976714, -0.154149, 0.480117, -0.857814, -0.183264, 0.308451, -0.951201, 0.003845, 0.219001, -0.975005, 0.037141, -0.480117, -0.857814, -0.183264, -0.22541, -0.904996, -0.360759, -0.219001, -0.975005, 0.037141, 0.460707, -0.875637, -0.14481, 0.480117, -0.857814, -0.183264, 0.22541, -0.904996, -0.360759, -0.460707, -0.875637, -0.14481, -0.358806, -0.925748, -0.119175, -0.22541, -0.904996, -0.360759, 0.566546, -0.759819, -0.318796, 0.460707, -0.875637, -0.14481, 0.358806, -0.925748, -0.119175, -0.566546, -0.759819, -0.318796, -0.460219, -0.87228, -0.165105, -0.358806, -0.925748, -0.119175, 0.49913, -0.780663, -0.376049, 0.566546, -0.759819, -0.318796, 0.460219, -0.87228, -0.165105, -0.49913, -0.780663, -0.376049, -0.4279, -0.815577, -0.389508, -0.460219, -0.87228, -0.165105, 0.344279, -0.763298, -0.546617, 0.49913, -0.780663, -0.376049, 0.4279, -0.815577, -0.389508, -0.344279, -0.763298, -0.546617, -0.15894, -0.851924, -0.498917, -0.4279, -0.815577, -0.389508, -0.128178, -0.947752, -0.292001, 0.056093, -0.96292, -0.263863, 0.344279, -0.763298, -0.546617, -0.344279, -0.763298, -0.546617, -0.056093, -0.96292, -0.263863, 0.128178, -0.947752, -0.292001, -0.128178, -0.947752, -0.292001, -0.239296, -0.923032, -0.301187, 0.0, -0.997925, 0.064272, 0.0, -0.997925, 0.064272, 0.239296, -0.923032, -0.301187, 0.128178, -0.947752, -0.292001, -0.061098, -0.997803, -0.025239, 0.0, -0.996551, -0.082736, 0.031587, -0.983459, -0.178167, 0.061098, -0.997803, -0.025239, -0.36784, -0.885556, -0.283608, -0.031587, -0.983459, -0.178167, 0.031587, -0.983459, -0.178167, 0.0, -0.996551, -0.082736, 0.0, -0.975036, -0.221992, 0.0, -0.975036, -0.221992, 0.0, -0.996551, -0.082736, -0.031587, -0.983459, -0.178167, -0.239296, -0.923032, -0.301187, -0.200568, -0.970306, -0.134953, 0.0, -0.975036, -0.221992, 0.239296, -0.923032, -0.301187, 0.0, -0.997925, 0.064272, 0.0, -0.975036, -0.221992, -0.05887, -0.923734, -0.37843, 0.0, -0.938017, -0.346507, 0.0, -0.63155, -0.775323, 0.0, -0.63155, -0.775323, 0.0, -0.938017, -0.346507, 0.05887, -0.923734, -0.37843, 0.130711, -0.93881, -0.318644, -0.05887, -0.923734, -0.37843, 0.15537, -0.632282, -0.758965, -0.15537, -0.632282, -0.758965, 0.05887, -0.923734, -0.37843, -0.130711, -0.93881, -0.318644, 0.130711, -0.93881, -0.318644, 0.35023, -0.684683, -0.639149, 0.55565, -0.799982, -0.226356, -0.130711, -0.93881, -0.318644, -0.14594, -0.981933, -0.120182, -0.55565, -0.799982, -0.226356, 0.593677, -0.797388, 0.108158, 0.134098, -0.990936, 0.006256, 0.181524, -0.98233, -0.045198, -0.181524, -0.98233, -0.045198, -0.134098, -0.990936, 0.006256, -0.593677, -0.797388, 0.108158, 0.14594, -0.981933, -0.120182, 0.55565, -0.799982, -0.226356, 0.565172, -0.824396, -0.029725, -0.565172, -0.824396, -0.029725, -0.55565, -0.799982, -0.226356, -0.14594, -0.981933, -0.120182, 0.0, -0.879452, -0.475936, 0.0, -1.0, 0.0, 0.134098, -0.990936, 0.006256, 0.0, -0.879452, -0.475936, -0.500259, -0.751946, -0.429243, -0.134098, -0.990936, 0.006256, 0.134098, -0.990936, 0.006256, 0.0, -1.0, 0.0, 0.0, -0.99939, -0.034059, -0.134098, -0.990936, 0.006256, -0.181524, -0.98233, -0.045198, 0.0, -0.99939, -0.034059, 0.14594, -0.981933, -0.120182, 0.181524, -0.98233, -0.045198, 0.0, -0.99939, -0.034059, -0.14594, -0.981933, -0.120182, 0.0, -0.809595, -0.586963, 0.0, -0.99939, -0.034059, 0.932157, -0.334758, -0.137761, 0.926237, -0.288003, -0.243049, 0.583575, -0.423475, -0.692862, -0.583575, -0.423475, -0.692862, -0.926237, -0.288003, -0.243049, -0.932157, -0.334758, -0.137761, 0.618641, -0.12479, 0.775658, 0.926237, -0.288003, -0.243049, 0.932157, -0.334758, -0.137761, -0.618641, -0.12479, 0.775658, -0.501389, -0.801691, -0.325327, -0.932157, -0.334758, -0.137761, -0.240516, -0.203558, 0.949034, 0.618641, -0.12479, 0.775658, 0.501389, -0.801691, -0.325327, 0.240516, -0.203558, 0.949034, 0.0, -0.856227, 0.516556, -0.501389, -0.801691, -0.325327, 0.0, -0.559648, 0.8287, -0.240516, -0.203558, 0.949034, 0.0, -0.856227, 0.516556, 0.0, -0.559648, 0.8287, 0.0, -0.967711, -0.251991, 0.0, -0.856227, 0.516556, 0.500259, -0.751946, -0.429243, 0.583575, -0.423475, -0.692862, 0.0, -0.501053, -0.865383, -0.500259, -0.751946, -0.429243, 0.0, -0.879452, -0.475936, 0.0, -0.501053, -0.865383, 0.583575, -0.423475, -0.692862, 0.183294, -0.789026, -0.586352, 0.0, -0.876431, -0.481521, -0.583575, -0.423475, -0.692862, 0.0, -0.501053, -0.865383, 0.0, -0.876431, -0.481521, 0.0, -0.559648, 0.8287, 0.0, -0.987457, 0.157842, -0.185736, -0.781487, 0.595599, 0.185736, -0.781487, 0.595599, 0.0, -0.987457, 0.157842, 0.0, -0.559648, 0.8287, -0.240516, -0.203558, 0.949034, -0.185736, -0.781487, 0.595599, 0.361095, -0.804651, 0.471267, -0.361095, -0.804651, 0.471267, 0.185736, -0.781487, 0.595599, 0.240516, -0.203558, 0.949034, 0.361095, -0.804651, 0.471267, 0.448805, -0.83636, -0.314707, 0.926237, -0.288003, -0.243049, -0.361095, -0.804651, 0.471267, -0.618641, -0.12479, 0.775658, -0.926237, -0.288003, -0.243049, 0.926237, -0.288003, -0.243049, 0.448805, -0.83636, -0.314707, 0.183294, -0.789026, -0.586352, -0.183294, -0.789026, -0.586352, -0.448805, -0.83636, -0.314707, -0.926237, -0.288003, -0.243049, 0.448805, -0.83636, -0.314707, 0.361095, -0.804651, 0.471267, -0.185736, -0.781487, 0.595599, -0.448805, -0.83636, -0.314707, 0.0, -0.987457, 0.157842, 0.185736, -0.781487, 0.595599, 0.0, -0.987457, 0.157842, 0.0, -0.876431, -0.481521, 0.183294, -0.789026, -0.586352, -0.183294, -0.789026, -0.586352, 0.0, -0.876431, -0.481521, 0.0, -0.987457, 0.157842, 0.0, -0.856227, 0.516556, 0.501389, -0.801691, -0.325327, 0.056093, -0.96292, -0.263863, -0.056093, -0.96292, -0.263863, -0.501389, -0.801691, -0.325327, 0.0, -0.856227, 0.516556, 0.501389, -0.801691, -0.325327, 0.932157, -0.334758, -0.137761, 0.77514, -0.630573, 0.038667, -0.77514, -0.630573, 0.038667, -0.932157, -0.334758, -0.137761, -0.501389, -0.801691, -0.325327, 0.500259, -0.751946, -0.429243, 0.650655, -0.744652, 0.148747, 0.77514, -0.630573, 0.038667, -0.500259, -0.751946, -0.429243, -0.932157, -0.334758, -0.137761, -0.77514, -0.630573, 0.038667, 0.134098, -0.990936, 0.006256, 0.593677, -0.797388, 0.108158, 0.650655, -0.744652, 0.148747, -0.134098, -0.990936, 0.006256, -0.500259, -0.751946, -0.429243, -0.650655, -0.744652, 0.148747, 0.927763, -0.120884, 0.353008, 0.650655, -0.744652, 0.148747, 0.593677, -0.797388, 0.108158, -0.927763, -0.120884, 0.353008, -0.955718, -0.156468, 0.249184, -0.593677, -0.797388, 0.108158, 0.930601, -0.126347, 0.343516, 0.77514, -0.630573, 0.038667, 0.650655, -0.744652, 0.148747, -0.930601, -0.126347, 0.343516, -0.927763, -0.120884, 0.353008, -0.650655, -0.744652, 0.148747, 0.891537, -0.309458, -0.330668, 0.056093, -0.96292, -0.263863, 0.77514, -0.630573, 0.038667, -0.77514, -0.630573, 0.038667, -0.056093, -0.96292, -0.263863, -0.891537, -0.309458, -0.330668, 0.0, -0.809595, -0.586963, 0.0, -0.273232, -0.961943, -0.136845, -0.838588, -0.527268, 0.0, -0.809595, -0.586963, -0.14594, -0.981933, -0.120182, 0.136845, -0.838588, -0.527268, 0.130711, -0.93881, -0.318644, 0.14594, -0.981933, -0.120182, -0.136845, -0.838588, -0.527268, 0.136845, -0.838588, -0.527268, -0.14594, -0.981933, -0.120182, -0.130711, -0.93881, -0.318644, -0.05887, -0.923734, -0.37843, 0.130711, -0.93881, -0.318644, -0.635121, -0.771203, 0.042756, 0.635121, -0.771203, 0.042756, -0.130711, -0.93881, -0.318644, 0.05887, -0.923734, -0.37843, 0.0, -0.938017, -0.346507, -0.05887, -0.923734, -0.37843, -0.414106, -0.701621, 0.579821, 0.414106, -0.701621, 0.579821, 0.05887, -0.923734, -0.37843, 0.0, -0.938017, -0.346507, -0.414106, -0.701621, 0.579821, -0.295846, -0.828761, 0.47496, 0.0, -0.845851, 0.533403, 0.414106, -0.701621, 0.579821, 0.0, -0.82931, 0.558763, 0.0, -0.845851, 0.533403, -0.414106, -0.701621, 0.579821, -0.635121, -0.771203, 0.042756, -0.673757, -0.72985, 0.115452, 0.673757, -0.72985, 0.115452, 0.635121, -0.771203, 0.042756, 0.414106, -0.701621, 0.579821, -0.635121, -0.771203, 0.042756, -0.136845, -0.838588, -0.527268, -0.517655, -0.486007, -0.704123, 0.517655, -0.486007, -0.704123, 0.136845, -0.838588, -0.527268, 0.635121, -0.771203, 0.042756, 0.0, -0.273232, -0.961943, 0.0, -0.715171, -0.698935, -0.517655, -0.486007, -0.704123, 0.0, -0.273232, -0.961943, 0.136845, -0.838588, -0.527268, 0.517655, -0.486007, -0.704123, 0.0, -0.715171, -0.698935, 0.0, -0.845851, 0.533403, -0.295846, -0.828761, 0.47496, 0.295846, -0.828761, 0.47496, 0.0, -0.845851, 0.533403, 0.0, -0.715171, -0.698935, -0.517655, -0.486007, -0.704123, -0.295846, -0.828761, 0.47496, -0.673757, -0.72985, 0.115452, 0.673757, -0.72985, 0.115452, 0.295846, -0.828761, 0.47496, 0.517655, -0.486007, -0.704123, -0.200568, -0.970306, -0.134953, -0.239296, -0.923032, -0.301187, -0.010102, -0.997467, -0.069979, 0.010102, -0.997467, -0.069979, 0.239296, -0.923032, -0.301187, 0.200568, -0.970306, -0.134953, 0.031587, -0.983459, -0.178167, -0.200568, -0.970306, -0.134953, 0.158055, -0.983825, -0.084231, -0.158055, -0.983825, -0.084231, 0.200568, -0.970306, -0.134953, -0.031587, -0.983459, -0.178167, 0.031587, -0.983459, -0.178167, 0.293405, -0.95407, -0.060152, 0.182958, -0.977691, -0.102878, -0.031587, -0.983459, -0.178167, -0.36784, -0.885556, -0.283608, -0.182958, -0.977691, -0.102878, -0.128178, -0.947752, -0.292001, -0.031709, -0.975005, -0.219794, -0.010102, -0.997467, -0.069979, 0.128178, -0.947752, -0.292001, 0.239296, -0.923032, -0.301187, 0.010102, -0.997467, -0.069979, -0.128178, -0.947752, -0.292001, 0.15894, -0.851924, -0.498917, 0.184454, -0.964995, -0.186316, -0.184454, -0.964995, -0.186316, -0.15894, -0.851924, -0.498917, 0.128178, -0.947752, -0.292001, 0.15894, -0.851924, -0.498917, 0.4279, -0.815577, -0.389508, 0.29899, -0.953581, -0.035615, -0.29899, -0.953581, -0.035615, -0.4279, -0.815577, -0.389508, -0.15894, -0.851924, -0.498917, 0.4279, -0.815577, -0.389508, 0.460219, -0.87228, -0.165105, 0.29429, -0.950224, -0.102023, -0.29429, -0.950224, -0.102023, -0.460219, -0.87228, -0.165105, -0.4279, -0.815577, -0.389508, 0.460219, -0.87228, -0.165105, 0.358806, -0.925748, -0.119175, 0.177587, -0.982208, -0.060762, -0.177587, -0.982208, -0.060762, -0.358806, -0.925748, -0.119175, -0.460219, -0.87228, -0.165105, 0.22541, -0.904996, -0.360759, 0.294351, -0.955657, 0.004639, 0.177587, -0.982208, -0.060762, -0.22541, -0.904996, -0.360759, -0.358806, -0.925748, -0.119175, -0.177587, -0.982208, -0.060762, 0.219001, -0.975005, 0.037141, 0.088687, -0.987884, -0.127171, 0.294351, -0.955657, 0.004639, -0.219001, -0.975005, 0.037141, -0.22541, -0.904996, -0.360759, -0.294351, -0.955657, 0.004639, 0.219001, -0.975005, 0.037141, 0.149022, -0.976714, -0.154149, 0.203619, -0.973571, 0.103183, -0.203619, -0.973571, 0.103183, -0.149022, -0.976714, -0.154149, -0.219001, -0.975005, 0.037141, 0.149022, -0.976714, -0.154149, 0.258156, -0.957762, -0.126499, 0.131504, -0.989166, 0.064974, -0.131504, -0.989166, 0.064974, -0.258156, -0.957762, -0.126499, -0.149022, -0.976714, -0.154149, 0.258156, -0.957762, -0.126499, 0.36784, -0.885556, -0.283608, 0.182958, -0.977691, -0.102878, -0.182958, -0.977691, -0.102878, -0.36784, -0.885556, -0.283608, -0.258156, -0.957762, -0.126499, 0.131504, -0.989166, 0.064974, 0.182958, -0.977691, -0.102878, 0.463424, -0.793237, -0.39491, -0.463424, -0.793237, -0.39491, -0.182958, -0.977691, -0.102878, -0.131504, -0.989166, 0.064974, 0.203619, -0.973571, 0.103183, 0.131504, -0.989166, 0.064974, 0.174383, -0.947386, -0.268319, -0.174383, -0.947386, -0.268319, -0.131504, -0.989166, 0.064974, -0.203619, -0.973571, 0.103183, 0.203619, -0.973571, 0.103183, 0.113315, -0.942564, -0.314188, -0.274056, -0.4391, -0.855617, -0.203619, -0.973571, 0.103183, -0.088687, -0.987884, -0.127171, 0.274056, -0.4391, -0.855617, 0.088687, -0.987884, -0.127171, -0.274056, -0.4391, -0.855617, -0.142308, -0.800165, -0.582629, -0.088687, -0.987884, -0.127171, -0.294351, -0.955657, 0.004639, 0.142308, -0.800165, -0.582629, 0.177587, -0.982208, -0.060762, 0.294351, -0.955657, 0.004639, -0.142308, -0.800165, -0.582629, 0.142308, -0.800165, -0.582629, -0.294351, -0.955657, 0.004639, -0.177587, -0.982208, -0.060762, 0.177587, -0.982208, -0.060762, -0.422926, -0.899716, -0.107761, -0.192145, -0.962523, 0.191351, -0.177587, -0.982208, -0.060762, -0.29429, -0.950224, -0.102023, 0.192145, -0.962523, 0.191351, 0.29899, -0.953581, -0.035615, 0.29429, -0.950224, -0.102023, -0.192145, -0.962523, 0.191351, 0.192145, -0.962523, 0.191351, -0.29429, -0.950224, -0.102023, -0.29899, -0.953581, -0.035615, 0.29899, -0.953581, -0.035615, -0.165288, -0.775109, 0.60979, 0.143071, -0.816919, 0.558672, -0.29899, -0.953581, -0.035615, -0.184454, -0.964995, -0.186316, -0.143071, -0.816919, 0.558672, 0.184454, -0.964995, -0.186316, 0.143071, -0.816919, 0.558672, 0.432264, -0.687643, 0.5833, -0.184454, -0.964995, -0.186316, 0.031709, -0.975005, -0.219794, -0.432264, -0.687643, 0.5833, -0.010102, -0.997467, -0.069979, -0.031709, -0.975005, -0.219794, 0.432264, -0.687643, 0.5833, -0.432264, -0.687643, 0.5833, 0.031709, -0.975005, -0.219794, 0.010102, -0.997467, -0.069979, 0.182958, -0.977691, -0.102878, 0.293405, -0.95407, -0.060152, 0.789361, -0.579302, -0.203192, -0.789361, -0.579302, -0.203192, -0.293405, -0.95407, -0.060152, -0.182958, -0.977691, -0.102878, 0.293405, -0.95407, -0.060152, 0.158055, -0.983825, -0.084231, 0.80163, -0.597674, 0.010987, -0.80163, -0.597674, 0.010987, -0.158055, -0.983825, -0.084231, -0.293405, -0.95407, -0.060152, 0.158055, -0.983825, -0.084231, -0.010102, -0.997467, -0.069979, 0.68804, -0.661397, 0.298471, -0.68804, -0.661397, 0.298471, 0.010102, -0.997467, -0.069979, -0.158055, -0.983825, -0.084231, 0.0, -0.267281, 0.963591, -0.824183, -0.147313, 0.54677, -0.459304, -0.212592, 0.862453, 0.459304, -0.212592, 0.862453, 0.824183, -0.147313, 0.54677, 0.0, -0.267281, 0.963591, -0.824183, -0.147313, 0.54677, -0.60506, -0.209754, 0.768029, -0.476638, 0.716392, 0.509445, 0.476638, 0.716392, 0.509445, 0.60506, -0.209754, 0.768029, 0.824183, -0.147313, 0.54677, 0.231269, -0.175054, 0.956999, 0.119297, 0.753807, 0.646138, -0.476638, 0.716392, 0.509445, -0.231269, -0.175054, 0.956999, 0.60506, -0.209754, 0.768029, 0.476638, 0.716392, 0.509445, 0.597552, -0.164586, 0.784722, 0.226691, 0.428114, 0.874813, 0.119297, 0.753807, 0.646138, -0.597552, -0.164586, 0.784722, -0.231269, -0.175054, 0.956999, -0.119297, 0.753807, 0.646138, 0.517045, -0.212531, 0.829127, 0.345531, 0.219123, 0.912442, 0.226691, 0.428114, 0.874813, -0.517045, -0.212531, 0.829127, -0.597552, -0.164586, 0.784722, -0.226691, 0.428114, 0.874813, 0.517045, -0.212531, 0.829127, 0.845119, -0.298502, 0.443403, 0.6957, 0.421827, 0.581378, -0.6957, 0.421827, 0.581378, -0.845119, -0.298502, 0.443403, -0.517045, -0.212531, 0.829127, 0.90698, 0.128941, -0.400922, 0.930204, 0.202338, -0.306192, 0.6957, 0.421827, 0.581378, -0.90698, 0.128941, -0.400922, -0.845119, -0.298502, 0.443403, -0.6957, 0.421827, 0.581378, 0.90698, 0.128941, -0.400922, 0.587481, -0.196966, -0.784875, 0.544328, 0.053316, -0.837153, -0.544328, 0.053316, -0.837153, -0.587481, -0.196966, -0.784875, -0.90698, 0.128941, -0.400922, 0.587481, -0.196966, -0.784875, 0.348827, 0.008148, -0.937132, 0.471969, 0.176794, -0.863674, -0.471969, 0.176794, -0.863674, -0.348827, 0.008148, -0.937132, -0.587481, -0.196966, -0.784875, 0.0, 0.636708, -0.771081, 0.689322, 0.278603, -0.668691, 0.277078, 0.907804, -0.314737, 0.0, 0.636708, -0.771081, 0.0, 0.976959, -0.213294, -0.277078, 0.907804, -0.314737, 0.0, 0.976959, -0.213294, 0.277078, 0.907804, -0.314737, 0.151372, 0.976867, -0.150975, 0.0, 0.976959, -0.213294, 0.0, 0.954741, -0.297342, -0.151372, 0.976867, -0.150975, 0.0, 0.954741, -0.297342, 0.151372, 0.976867, -0.150975, 0.067476, 0.618122, -0.783166, 0.0, 0.954741, -0.297342, 0.0, 0.471603, -0.881802, -0.067476, 0.618122, -0.783166, 0.159551, -0.152898, -0.975249, 0.0, -0.252266, -0.96765, 0.0, 0.471603, -0.881802, 0.0, 0.471603, -0.881802, 0.0, -0.252266, -0.96765, -0.159551, -0.152898, -0.975249, 0.526658, -0.161107, -0.834651, 0.159551, -0.152898, -0.975249, 0.067476, 0.618122, -0.783166, -0.067476, 0.618122, -0.783166, -0.159551, -0.152898, -0.975249, -0.526658, -0.161107, -0.834651, 0.945708, -0.197699, -0.257851, 0.526658, -0.161107, -0.834651, 0.555071, 0.681967, -0.476211, -0.555071, 0.681967, -0.476211, -0.526658, -0.161107, -0.834651, -0.945708, -0.197699, -0.257851, 0.972808, -0.208716, 0.100314, 0.945708, -0.197699, -0.257851, 0.62038, 0.779809, 0.083468, -0.62038, 0.779809, 0.083468, -0.945708, -0.197699, -0.257851, -0.972808, -0.208716, 0.100314, 0.62038, 0.779809, 0.083468, 0.151372, 0.976867, -0.150975, 0.277078, 0.907804, -0.314737, -0.277078, 0.907804, -0.314737, -0.151372, 0.976867, -0.150975, -0.62038, 0.779809, 0.083468, 0.555071, 0.681967, -0.476211, 0.067476, 0.618122, -0.783166, 0.151372, 0.976867, -0.150975, -0.555071, 0.681967, -0.476211, -0.62038, 0.779809, 0.083468, -0.151372, 0.976867, -0.150975, 0.779839, 0.625843, -0.010498, 0.277078, 0.907804, -0.314737, 0.689322, 0.278603, -0.668691, -0.779839, 0.625843, -0.010498, -0.895657, 0.362407, 0.257729, -0.689322, 0.278603, -0.668691, 0.955718, -0.156468, 0.249184, 0.972808, -0.208716, 0.100314, 0.779839, 0.625843, -0.010498, -0.779839, 0.625843, -0.010498, -0.972808, -0.208716, 0.100314, -0.955718, -0.156468, 0.249184, 0.978698, -0.061495, -0.195837, 0.887173, -0.433607, -0.15772, 0.930601, -0.126347, 0.343516, -0.978698, -0.061495, -0.195837, -0.927763, -0.120884, 0.353008, -0.930601, -0.126347, 0.343516, 0.895657, 0.362407, 0.257729, 0.978698, -0.061495, -0.195837, 0.927763, -0.120884, 0.353008, -0.895657, 0.362407, 0.257729, -0.955718, -0.156468, 0.249184, -0.927763, -0.120884, 0.353008, 0.930601, -0.126347, 0.343516, 0.887173, -0.433607, -0.15772, 0.785699, -0.236732, -0.571459, -0.930601, -0.126347, 0.343516, -0.891537, -0.309458, -0.330668, -0.785699, -0.236732, -0.571459, 0.785699, -0.236732, -0.571459, 0.471969, 0.176794, -0.863674, 0.348827, 0.008148, -0.937132, -0.785699, -0.236732, -0.571459, -0.891537, -0.309458, -0.330668, -0.348827, 0.008148, -0.937132, 0.445479, 0.820399, -0.358348, 0.522263, 0.547685, -0.653615, 0.0, 0.722587, -0.691275, -0.445479, 0.820399, -0.358348, 0.0, 0.952361, -0.304941, 0.0, 0.722587, -0.691275, 0.522263, 0.547685, -0.653615, 0.507065, 0.203314, -0.837581, 0.0, 0.336528, -0.941649, -0.522263, 0.547685, -0.653615, 0.0, 0.722587, -0.691275, 0.0, 0.336528, -0.941649, 0.0, 0.336528, -0.941649, 0.507065, 0.203314, -0.837581, 0.57268, -0.011994, -0.819666, -0.57268, -0.011994, -0.819666, -0.507065, 0.203314, -0.837581, 0.0, 0.336528, -0.941649, 0.0, 0.183294, -0.983032, 0.57268, -0.011994, -0.819666, 0.689322, 0.278603, -0.668691, -0.689322, 0.278603, -0.668691, -0.57268, -0.011994, -0.819666, 0.0, 0.183294, -0.983032, 0.689322, 0.278603, -0.668691, 0.57268, -0.011994, -0.819666, 0.978698, -0.061495, -0.195837, -0.689322, 0.278603, -0.668691, -0.895657, 0.362407, 0.257729, -0.978698, -0.061495, -0.195837, 0.930204, 0.202338, -0.306192, 0.544328, 0.053316, -0.837153, 0.72103, -0.065065, -0.68981, -0.72103, -0.065065, -0.68981, -0.544328, 0.053316, -0.837153, -0.930204, 0.202338, -0.306192, 0.473006, 0.863216, 0.176305, 0.445479, 0.820399, -0.358348, 0.0, 0.952361, -0.304941, -0.473006, 0.863216, 0.176305, 0.0, 0.930967, 0.365032, 0.0, 0.952361, -0.304941, 0.444227, -0.527085, 0.724418, 0.413495, -0.03946, 0.909635, 0.0, -0.022584, 0.999725, -0.444227, -0.527085, 0.724418, 0.0, -0.55681, 0.830622, 0.0, -0.022584, 0.999725, 0.0, -0.022584, 0.999725, 0.413495, -0.03946, 0.909635, 0.391247, 0.426832, 0.815271, -0.391247, 0.426832, 0.815271, -0.413495, -0.03946, 0.909635, 0.0, -0.022584, 0.999725, 0.0, 0.551378, 0.834223, 0.391247, 0.426832, 0.815271, 0.473006, 0.863216, 0.176305, -0.473006, 0.863216, 0.176305, -0.391247, 0.426832, 0.815271, 0.0, 0.551378, 0.834223, 0.345531, 0.219123, 0.912442, 0.6957, 0.421827, 0.581378, 0.771722, -0.078494, 0.631062, -0.771722, -0.078494, 0.631062, -0.6957, 0.421827, 0.581378, -0.345531, 0.219123, 0.912442, 0.444411, -0.425031, 0.788537, 0.771722, -0.078494, 0.631062, 0.741752, -0.427839, 0.516434, -0.741752, -0.427839, 0.516434, -0.771722, -0.078494, 0.631062, -0.444411, -0.425031, 0.788537, 0.668172, -0.319498, 0.671865, 0.741752, -0.427839, 0.516434, 0.848628, 0.014008, 0.528764, -0.848628, 0.014008, 0.528764, -0.741752, -0.427839, 0.516434, -0.668172, -0.319498, 0.671865, 0.678396, 0.069521, 0.731376, 0.848628, 0.014008, 0.528764, 0.872158, 0.374645, 0.314554, -0.872158, 0.374645, 0.314554, -0.848628, 0.014008, 0.528764, -0.678396, 0.069521, 0.731376, 0.619648, 0.782525, -0.060457, 0.607532, 0.553575, 0.569567, 0.872158, 0.374645, 0.314554, -0.619648, 0.782525, -0.060457, -0.670766, 0.740257, -0.045289, -0.872158, 0.374645, 0.314554, 0.473006, 0.863216, 0.176305, 0.391247, 0.426832, 0.815271, 0.607532, 0.553575, 0.569567, -0.607532, 0.553575, 0.569567, -0.391247, 0.426832, 0.815271, -0.473006, 0.863216, 0.176305, 0.391247, 0.426832, 0.815271, 0.413495, -0.03946, 0.909635, 0.678396, 0.069521, 0.731376, -0.678396, 0.069521, 0.731376, -0.413495, -0.03946, 0.909635, -0.391247, 0.426832, 0.815271, 0.413495, -0.03946, 0.909635, 0.444227, -0.527085, 0.724418, 0.668172, -0.319498, 0.671865, -0.668172, -0.319498, 0.671865, -0.444227, -0.527085, 0.724418, -0.413495, -0.03946, 0.909635, 0.444227, -0.527085, 0.724418, 0.340648, -0.322306, 0.883206, 0.444411, -0.425031, 0.788537, -0.444411, -0.425031, 0.788537, -0.340648, -0.322306, 0.883206, -0.444227, -0.527085, 0.724418, 0.345531, 0.219123, 0.912442, 0.444411, -0.425031, 0.788537, 0.340648, -0.322306, 0.883206, -0.345531, 0.219123, 0.912442, -0.226691, 0.428114, 0.874813, -0.340648, -0.322306, 0.883206, 0.340648, -0.322306, 0.883206, 0.444227, -0.527085, 0.724418, 0.0, -0.55681, 0.830622, -0.340648, -0.322306, 0.883206, 0.0, -0.848445, 0.529252, 0.0, -0.55681, 0.830622, -0.476638, 0.716392, 0.509445, 0.119297, 0.753807, 0.646138, 0.226691, 0.428114, 0.874813, 0.476638, 0.716392, 0.509445, 0.459304, -0.212592, 0.862453, -0.226691, 0.428114, 0.874813, -0.459304, -0.212592, 0.862453, 0.226691, 0.428114, 0.874813, 0.340648, -0.322306, 0.883206, -0.340648, -0.322306, 0.883206, -0.226691, 0.428114, 0.874813, 0.459304, -0.212592, 0.862453, 0.0, -0.511612, 0.859188, -0.459304, -0.212592, 0.862453, 0.0, -0.848445, 0.529252, 0.0, -0.848445, 0.529252, 0.459304, -0.212592, 0.862453, 0.0, -0.511612, 0.859188, 0.930204, 0.202338, -0.306192, 0.985015, -0.063051, -0.160466, 0.771722, -0.078494, 0.631062, -0.930204, 0.202338, -0.306192, -0.6957, 0.421827, 0.581378, -0.771722, -0.078494, 0.631062, 0.985015, -0.063051, -0.160466, 0.997009, 0.069521, -0.033296, 0.741752, -0.427839, 0.516434, -0.741752, -0.427839, 0.516434, -0.997009, 0.069521, -0.033296, -0.985015, -0.063051, -0.160466, 0.997009, 0.069521, -0.033296, 0.908536, -0.352489, 0.224219, 0.848628, 0.014008, 0.528764, -0.848628, 0.014008, 0.528764, -0.908536, -0.352489, 0.224219, -0.997009, 0.069521, -0.033296, 0.872158, 0.374645, 0.314554, 0.848628, 0.014008, 0.528764, 0.908536, -0.352489, 0.224219, -0.872158, 0.374645, 0.314554, -0.670766, 0.740257, -0.045289, -0.908536, -0.352489, 0.224219, 0.507065, 0.203314, -0.837581, 0.56328, 0.121311, -0.817286, 0.579028, -0.142705, -0.802698, -0.507065, 0.203314, -0.837581, -0.57268, -0.011994, -0.819666, -0.579028, -0.142705, -0.802698, 0.579028, -0.142705, -0.802698, 0.56328, 0.121311, -0.817286, 0.312296, -0.00116, -0.94995, -0.579028, -0.142705, -0.802698, -0.72103, -0.065065, -0.68981, -0.312296, -0.00116, -0.94995, 0.544328, 0.053316, -0.837153, 0.471969, 0.176794, -0.863674, 0.579028, -0.142705, -0.802698, -0.579028, -0.142705, -0.802698, -0.471969, 0.176794, -0.863674, -0.544328, 0.053316, -0.837153, 0.471969, 0.176794, -0.863674, 0.887173, -0.433607, -0.15772, 0.978698, -0.061495, -0.195837, -0.978698, -0.061495, -0.195837, -0.887173, -0.433607, -0.15772, -0.471969, 0.176794, -0.863674, 0.978698, -0.061495, -0.195837, 0.57268, -0.011994, -0.819666, 0.579028, -0.142705, -0.802698, -0.579028, -0.142705, -0.802698, -0.57268, -0.011994, -0.819666, -0.978698, -0.061495, -0.195837, 0.471969, 0.176794, -0.863674, 0.785699, -0.236732, -0.571459, 0.887173, -0.433607, -0.15772, -0.887173, -0.433607, -0.15772, -0.785699, -0.236732, -0.571459, -0.471969, 0.176794, -0.863674, 0.32551, 0.728355, -0.602924, 0.529221, 0.681722, -0.505112, 0.619648, 0.782525, -0.060457, -0.32551, 0.728355, -0.602924, -0.670766, 0.740257, -0.045289, -0.619648, 0.782525, -0.060457, 0.619648, 0.782525, -0.060457, 0.529221, 0.681722, -0.505112, 0.445479, 0.820399, -0.358348, -0.619648, 0.782525, -0.060457, -0.473006, 0.863216, 0.176305, -0.445479, 0.820399, -0.358348, 0.56328, 0.121311, -0.817286, 0.529221, 0.681722, -0.505112, 0.32551, 0.728355, -0.602924, -0.56328, 0.121311, -0.817286, -0.312296, -0.00116, -0.94995, -0.32551, 0.728355, -0.602924, 0.522263, 0.547685, -0.653615, 0.529221, 0.681722, -0.505112, 0.56328, 0.121311, -0.817286, -0.522263, 0.547685, -0.653615, -0.507065, 0.203314, -0.837581, -0.56328, 0.121311, -0.817286, 0.445479, 0.820399, -0.358348, 0.529221, 0.681722, -0.505112, 0.522263, 0.547685, -0.653615, -0.522263, 0.547685, -0.653615, -0.529221, 0.681722, -0.505112, -0.445479, 0.820399, -0.358348, -0.279244, -0.575884, 0.768303, 0.449232, -0.892575, -0.038331, 0.551164, -0.830622, -0.078768, 0.279244, -0.575884, 0.768303, -0.018799, -0.488632, 0.87225, -0.551164, -0.830622, -0.078768, 0.018799, -0.488632, 0.87225, 0.551164, -0.830622, -0.078768, 0.321451, -0.942381, -0.092318, -0.321451, -0.942381, -0.092318, -0.551164, -0.830622, -0.078768, -0.018799, -0.488632, 0.87225, 0.321451, -0.942381, -0.092318, -0.154454, -0.980193, -0.123875, 0.778802, -0.604389, 0.167791, -0.321451, -0.942381, -0.092318, -0.383557, -0.328776, 0.862972, -0.778802, -0.604389, 0.167791, -0.154454, -0.980193, -0.123875, -0.041108, -0.949553, 0.310831, 0.652608, -0.588794, -0.476821, 0.154454, -0.980193, -0.123875, -0.778802, -0.604389, 0.167791, -0.652608, -0.588794, -0.476821, -0.041108, -0.949553, 0.310831, 0.538377, -0.789239, 0.295267, 0.502884, -0.370312, -0.780999, 0.041108, -0.949553, 0.310831, -0.652608, -0.588794, -0.476821, -0.502884, -0.370312, -0.780999, 0.502884, -0.370312, -0.780999, 0.538377, -0.789239, 0.295267, 0.329936, -0.889645, 0.315653, -0.329936, -0.889645, 0.315653, -0.538377, -0.789239, 0.295267, -0.502884, -0.370312, -0.780999, 0.538377, -0.789239, 0.295267, -0.186804, -0.235084, 0.953825, 0.162877, -0.487014, 0.858028, -0.162877, -0.487014, 0.858028, 0.186804, -0.235084, 0.953825, -0.538377, -0.789239, 0.295267, -0.041108, -0.949553, 0.310831, -0.762139, 0.019318, 0.647084, -0.186804, -0.235084, 0.953825, 0.186804, -0.235084, 0.953825, 0.762139, 0.019318, 0.647084, 0.041108, -0.949553, 0.310831, -0.984741, -0.142613, -0.099582, -0.762139, 0.019318, 0.647084, -0.041108, -0.949553, 0.310831, 0.984741, -0.142613, -0.099582, 0.154454, -0.980193, -0.123875, 0.041108, -0.949553, 0.310831, -0.149571, -0.649464, -0.745506, -0.984741, -0.142613, -0.099582, -0.154454, -0.980193, -0.123875, 0.149571, -0.649464, -0.745506, -0.321451, -0.942381, -0.092318, 0.154454, -0.980193, -0.123875, 0.560442, -0.4991, -0.660878, -0.149571, -0.649464, -0.745506, 0.321451, -0.942381, -0.092318, -0.560442, -0.4991, -0.660878, -0.551164, -0.830622, -0.078768, -0.321451, -0.942381, -0.092318, 0.551164, -0.830622, -0.078768, 0.449232, -0.892575, -0.038331, 0.684194, -0.472182, -0.555773, -0.684194, -0.472182, -0.555773, -0.449232, -0.892575, -0.038331, -0.551164, -0.830622, -0.078768, 0.312296, -0.00116, -0.94995, 0.731193, -0.672475, 0.114414, 0.857204, 0.148289, -0.493118, -0.312296, -0.00116, -0.94995, -0.72103, -0.065065, -0.68981, -0.857204, 0.148289, -0.493118, 0.029542, -0.771905, -0.634999, 0.329936, -0.889645, 0.315653, 0.731193, -0.672475, 0.114414, -0.029542, -0.771905, -0.634999, -0.312296, -0.00116, -0.94995, -0.731193, -0.672475, 0.114414, 0.985015, -0.063051, -0.160466, 0.72103, -0.065065, -0.68981, 0.857204, 0.148289, -0.493118, -0.857204, 0.148289, -0.493118, -0.72103, -0.065065, -0.68981, -0.985015, -0.063051, -0.160466, 0.908536, -0.352489, 0.224219, 0.372723, -0.900449, -0.224158, 0.449232, -0.892575, -0.038331, -0.449232, -0.892575, -0.038331, -0.372723, -0.900449, -0.224158, -0.908536, -0.352489, 0.224219, 0.329936, -0.889645, 0.315653, 0.162877, -0.487014, 0.858028, 0.599841, -0.61388, 0.513138, -0.599841, -0.61388, 0.513138, -0.162877, -0.487014, 0.858028, -0.329936, -0.889645, 0.315653, 0.960936, -0.249855, -0.118839, 0.731193, -0.672475, 0.114414, 0.599841, -0.61388, 0.513138, -0.960936, -0.249855, -0.118839, -0.842036, -0.509781, -0.176244, -0.599841, -0.61388, 0.513138, 0.851466, -0.522752, 0.041353, 0.960936, -0.249855, -0.118839, 0.842036, -0.509781, -0.176244, -0.842036, -0.509781, -0.176244, -0.960936, -0.249855, -0.118839, -0.851466, -0.522752, 0.041353, 0.848354, -0.301157, -0.435377, 0.960936, -0.249855, -0.118839, 0.851466, -0.522752, 0.041353, -0.848354, -0.301157, -0.435377, -0.686361, -0.374554, -0.623371, -0.851466, -0.522752, 0.041353, 0.848354, -0.301157, -0.435377, 0.686361, -0.374554, -0.623371, 0.726066, -0.473128, -0.498917, -0.848354, -0.301157, -0.435377, -0.372723, -0.900449, -0.224158, -0.726066, -0.473128, -0.498917, 0.372723, -0.900449, -0.224158, 0.726066, -0.473128, -0.498917, 0.684194, -0.472182, -0.555773, -0.372723, -0.900449, -0.224158, -0.449232, -0.892575, -0.038331, -0.684194, -0.472182, -0.555773, 0.848354, -0.301157, -0.435377, 0.372723, -0.900449, -0.224158, 0.908536, -0.352489, 0.224219, -0.848354, -0.301157, -0.435377, -0.997009, 0.069521, -0.033296, -0.908536, -0.352489, 0.224219, 0.857204, 0.148289, -0.493118, 0.960936, -0.249855, -0.118839, 0.848354, -0.301157, -0.435377, -0.857204, 0.148289, -0.493118, -0.997009, 0.069521, -0.033296, -0.848354, -0.301157, -0.435377, 0.857204, 0.148289, -0.493118, 0.731193, -0.672475, 0.114414, 0.960936, -0.249855, -0.118839, -0.960936, -0.249855, -0.118839, -0.731193, -0.672475, 0.114414, -0.857204, 0.148289, -0.493118, 0.684194, -0.472182, -0.555773, 0.726066, -0.473128, -0.498917, 0.659291, -0.588061, -0.46849, -0.659291, -0.588061, -0.46849, -0.726066, -0.473128, -0.498917, -0.684194, -0.472182, -0.555773, 0.686361, -0.374554, -0.623371, 0.572527, -0.704733, -0.418928, 0.659291, -0.588061, -0.46849, -0.686361, -0.374554, -0.623371, -0.726066, -0.473128, -0.498917, -0.659291, -0.588061, -0.46849, 0.686361, -0.374554, -0.623371, 0.851466, -0.522752, 0.041353, 0.758354, -0.594806, 0.266518, -0.758354, -0.594806, 0.266518, -0.851466, -0.522752, 0.041353, -0.686361, -0.374554, -0.623371, 0.481368, -0.604816, 0.634388, 0.449232, -0.808618, 0.379864, 0.758354, -0.594806, 0.266518, -0.481368, -0.604816, 0.634388, -0.851466, -0.522752, 0.041353, -0.758354, -0.594806, 0.266518, 0.842036, -0.509781, -0.176244, 0.292917, -0.881222, 0.370922, 0.449232, -0.808618, 0.379864, -0.842036, -0.509781, -0.176244, -0.481368, -0.604816, 0.634388, -0.449232, -0.808618, 0.379864, 0.842036, -0.509781, -0.176244, 0.599841, -0.61388, 0.513138, 0.644978, -0.698386, 0.310129, -0.644978, -0.698386, 0.310129, -0.599841, -0.61388, 0.513138, -0.842036, -0.509781, -0.176244, 0.599841, -0.61388, 0.513138, 0.162877, -0.487014, 0.858028, -0.033113, -0.325602, 0.944914, 0.033113, -0.325602, 0.944914, -0.162877, -0.487014, 0.858028, -0.599841, -0.61388, 0.513138, 0.560442, -0.4991, -0.660878, 0.684194, -0.472182, -0.555773, 0.648213, -0.634724, -0.420576, -0.648213, -0.634724, -0.420576, -0.684194, -0.472182, -0.555773, -0.560442, -0.4991, -0.660878, -0.149571, -0.649464, -0.745506, 0.560442, -0.4991, -0.660878, 0.461776, -0.823664, -0.329142, -0.461776, -0.823664, -0.329142, -0.560442, -0.4991, -0.660878, 0.149571, -0.649464, -0.745506, -0.984741, -0.142613, -0.099582, -0.149571, -0.649464, -0.745506, -0.262398, -0.804346, -0.533067, 0.262398, -0.804346, -0.533067, 0.149571, -0.649464, -0.745506, 0.984741, -0.142613, -0.099582, -0.984741, -0.142613, -0.099582, -0.752861, -0.657277, -0.033784, -0.583117, -0.640339, 0.499893, 0.984741, -0.142613, -0.099582, 0.762139, 0.019318, 0.647084, 0.583117, -0.640339, 0.499893, -0.762139, 0.019318, 0.647084, -0.583117, -0.640339, 0.499893, 0.065004, -0.707358, 0.703848, 0.762139, 0.019318, 0.647084, 0.186804, -0.235084, 0.953825, -0.065004, -0.707358, 0.703848, -0.186804, -0.235084, 0.953825, 0.065004, -0.707358, 0.703848, -0.033113, -0.325602, 0.944914, 0.186804, -0.235084, 0.953825, -0.162877, -0.487014, 0.858028, 0.033113, -0.325602, 0.944914, 0.292917, -0.881222, 0.370922, 0.408429, -0.903836, 0.127262, 0.195105, -0.97998, 0.038942, -0.292917, -0.881222, 0.370922, -0.449232, -0.808618, 0.379864, -0.195105, -0.97998, 0.038942, 0.408429, -0.903836, 0.127262, 0.444807, -0.890683, -0.093692, 0.334666, -0.942289, -0.004578, -0.408429, -0.903836, 0.127262, -0.195105, -0.97998, 0.038942, -0.334666, -0.942289, -0.004578, 0.334666, -0.942289, -0.004578, 0.444807, -0.890683, -0.093692, 0.314371, -0.943602, -0.103732, -0.314371, -0.943602, -0.103732, -0.444807, -0.890683, -0.093692, -0.334666, -0.942289, -0.004578, 0.314371, -0.943602, -0.103732, 0.383129, -0.92114, -0.068514, 0.289651, -0.9035, 0.315806, -0.314371, -0.943602, -0.103732, -0.3343, -0.936369, 0.106784, -0.289651, -0.9035, 0.315806, 0.461776, -0.823664, -0.329142, 0.648213, -0.634724, -0.420576, 0.3343, -0.936369, 0.106784, -0.3343, -0.936369, 0.106784, -0.648213, -0.634724, -0.420576, -0.461776, -0.823664, -0.329142, 0.334666, -0.942289, -0.004578, 0.3343, -0.936369, 0.106784, 0.648213, -0.634724, -0.420576, -0.334666, -0.942289, -0.004578, -0.659291, -0.588061, -0.46849, -0.648213, -0.634724, -0.420576, 0.572527, -0.704733, -0.418928, 0.195105, -0.97998, 0.038942, 0.334666, -0.942289, -0.004578, -0.572527, -0.704733, -0.418928, -0.659291, -0.588061, -0.46849, -0.334666, -0.942289, -0.004578, 0.449232, -0.808618, 0.379864, 0.195105, -0.97998, 0.038942, 0.572527, -0.704733, -0.418928, -0.572527, -0.704733, -0.418928, -0.195105, -0.97998, 0.038942, -0.449232, -0.808618, 0.379864, -0.033113, -0.325602, 0.944914, 0.408429, -0.903836, 0.127262, 0.292917, -0.881222, 0.370922, 0.033113, -0.325602, 0.944914, -0.644978, -0.698386, 0.310129, -0.292917, -0.881222, 0.370922, 0.065004, -0.707358, 0.703848, 0.444807, -0.890683, -0.093692, 0.408429, -0.903836, 0.127262, -0.408429, -0.903836, 0.127262, -0.444807, -0.890683, -0.093692, -0.065004, -0.707358, 0.703848, 0.314371, -0.943602, -0.103732, 0.444807, -0.890683, -0.093692, 0.065004, -0.707358, 0.703848, -0.314371, -0.943602, -0.103732, 0.583117, -0.640339, 0.499893, -0.065004, -0.707358, 0.703848, 0.383129, -0.92114, -0.068514, 0.314371, -0.943602, -0.103732, -0.583117, -0.640339, 0.499893, -0.383129, -0.92114, -0.068514, 0.752861, -0.657277, -0.033784, 0.583117, -0.640339, 0.499893, -0.262398, -0.804346, -0.533067, 0.289651, -0.9035, 0.315806, 0.383129, -0.92114, -0.068514, -0.383129, -0.92114, -0.068514, -0.289651, -0.9035, 0.315806, 0.262398, -0.804346, -0.533067, 0.461776, -0.823664, -0.329142, 0.289651, -0.9035, 0.315806, -0.262398, -0.804346, -0.533067, 0.262398, -0.804346, -0.533067, -0.289651, -0.9035, 0.315806, -0.461776, -0.823664, -0.329142, 0.502884, -0.370312, -0.780999, 0.029542, -0.771905, -0.634999, -0.098849, 0.532151, -0.840846, 0.098849, 0.532151, -0.840846, -0.029542, -0.771905, -0.634999, -0.502884, -0.370312, -0.780999, 0.652608, -0.588794, -0.476821, 0.502884, -0.370312, -0.780999, -0.025269, 0.733116, -0.679586, 0.025269, 0.733116, -0.679586, -0.502884, -0.370312, -0.780999, -0.652608, -0.588794, -0.476821, 0.652608, -0.588794, -0.476821, 0.636586, 0.583392, -0.504318, 0.92526, 0.367992, 0.09183, -0.652608, -0.588794, -0.476821, -0.778802, -0.604389, 0.167791, -0.92526, 0.367992, 0.09183, 0.778802, -0.604389, 0.167791, 0.92526, 0.367992, 0.09183, 0.286996, 0.748497, 0.597766, -0.778802, -0.604389, 0.167791, -0.383557, -0.328776, 0.862972, -0.286996, 0.748497, 0.597766, 0.383557, -0.328776, 0.862972, 0.286996, 0.748497, 0.597766, -0.414228, 0.724479, 0.55089, -0.383557, -0.328776, 0.862972, -0.018799, -0.488632, 0.87225, 0.414228, 0.724479, 0.55089, 0.018799, -0.488632, 0.87225, -0.414228, 0.724479, 0.55089, -0.650044, 0.485336, 0.584643, -0.018799, -0.488632, 0.87225, 0.279244, -0.575884, 0.768303, 0.650044, 0.485336, 0.584643, -0.025269, 0.733116, -0.679586, -0.098849, 0.532151, -0.840846, -0.650044, 0.485336, 0.584643, 0.025269, 0.733116, -0.679586, 0.414228, 0.724479, 0.55089, 0.650044, 0.485336, 0.584643, -0.414228, 0.724479, 0.55089, 0.286996, 0.748497, 0.597766, 0.636586, 0.583392, -0.504318, -0.636586, 0.583392, -0.504318, -0.286996, 0.748497, 0.597766, 0.414228, 0.724479, 0.55089, 0.286996, 0.748497, 0.597766, 0.92526, 0.367992, 0.09183, 0.636586, 0.583392, -0.504318, -0.636586, 0.583392, -0.504318, -0.92526, 0.367992, 0.09183, -0.286996, 0.748497, 0.597766, 0.908536, -0.352489, 0.224219, -0.279244, -0.575884, 0.768303, -0.650044, 0.485336, 0.584643, -0.908536, -0.352489, 0.224219, -0.670766, 0.740257, -0.045289, 0.650044, 0.485336, 0.584643, 0.670766, 0.740257, -0.045289, -0.650044, 0.485336, 0.584643, -0.098849, 0.532151, -0.840846, 0.098849, 0.532151, -0.840846, 0.650044, 0.485336, 0.584643, -0.670766, 0.740257, -0.045289, 0.312296, -0.00116, -0.94995, 0.32551, 0.728355, -0.602924, -0.098849, 0.532151, -0.840846, 0.098849, 0.532151, -0.840846, -0.32551, 0.728355, -0.602924, -0.312296, -0.00116, -0.94995, 0.800104, -0.599841, -0.002838, 0.969298, -0.245552, -0.011811, 0.607624, -0.608478, -0.510392, -0.800104, -0.599841, -0.002838, -0.607624, -0.608478, -0.510392, -0.969298, -0.245552, -0.011811, 0.868221, -0.496109, -0.00473, 0.800104, -0.599841, -0.002838, 0.680166, -0.488815, -0.546251, -0.868221, -0.496109, -0.00473, -0.680166, -0.488815, -0.546251, -0.800104, -0.599841, -0.002838, 0.680166, -0.488815, -0.546251, 0.607624, -0.608478, -0.510392, 0.119327, -0.476272, -0.871151, -0.680166, -0.488815, -0.546251, -0.119327, -0.476272, -0.871151, -0.607624, -0.608478, -0.510392, 0.607624, -0.608478, -0.510392, 0.728996, -0.193426, -0.656575, 0.09949, -0.652211, -0.751457, -0.607624, -0.608478, -0.510392, -0.09949, -0.652211, -0.751457, -0.728996, -0.193426, -0.656575, 0.09949, -0.652211, -0.751457, 0.031404, -0.252907, -0.966948, -0.456282, -0.710746, -0.535356, -0.09949, -0.652211, -0.751457, 0.456282, -0.710746, -0.535356, -0.031404, -0.252907, -0.966948, 0.119327, -0.476272, -0.871151, 0.09949, -0.652211, -0.751457, -0.55385, -0.540635, -0.633198, -0.119327, -0.476272, -0.871151, 0.55385, -0.540635, -0.633198, -0.09949, -0.652211, -0.751457, -0.456282, -0.710746, -0.535356, -0.689291, -0.724418, -0.004578, -0.55385, -0.540635, -0.633198, 0.809717, -0.586749, -0.006989, 0.689291, -0.724418, -0.004578, 0.55385, -0.540635, -0.633198, -0.653066, -0.319315, -0.686636, -0.952574, -0.303995, -0.013123, -0.456282, -0.710746, -0.535356, 0.689291, -0.724418, -0.004578, 0.952574, -0.303995, -0.013123, 0.456282, -0.710746, -0.535356, -0.689291, -0.724418, -0.004578, -0.952574, -0.303995, -0.013123, -0.455947, -0.720664, 0.522202, 0.689291, -0.724418, -0.004578, 0.455947, -0.720664, 0.522202, 0.952574, -0.303995, -0.013123, -0.689291, -0.724418, -0.004578, -0.455947, -0.720664, 0.522202, -0.809717, -0.586749, -0.006989, 0.530595, -0.571703, 0.625751, 0.455947, -0.720664, 0.522202, 0.809717, -0.586749, -0.006989, -0.455947, -0.720664, 0.522202, 0.103061, -0.664388, 0.740196, -0.530595, -0.571703, 0.625751, -0.125736, -0.525254, 0.841578, -0.103061, -0.664388, 0.740196, 0.530595, -0.571703, 0.625751, -0.664357, -0.305582, 0.682058, 0.025727, -0.231147, 0.972564, -0.455947, -0.720664, 0.522202, -0.103061, -0.664388, 0.740196, -0.025727, -0.231147, 0.972564, 0.455947, -0.720664, 0.522202, 0.025727, -0.231147, 0.972564, 0.736381, -0.180273, 0.652089, 0.103061, -0.664388, 0.740196, -0.610218, -0.618061, 0.49559, -0.736381, -0.180273, 0.652089, -0.103061, -0.664388, 0.740196, 0.103061, -0.664388, 0.740196, 0.610218, -0.618061, 0.49559, 0.125736, -0.525254, 0.841578, -0.668203, -0.514786, 0.537095, -0.610218, -0.618061, 0.49559, -0.125736, -0.525254, 0.841578, 0.610218, -0.618061, 0.49559, 0.800104, -0.599841, -0.002838, 0.668203, -0.514786, 0.537095, -0.868221, -0.496109, -0.00473, -0.800104, -0.599841, -0.002838, -0.668203, -0.514786, 0.537095, 0.736381, -0.180273, 0.652089, 0.969298, -0.245552, -0.011811, 0.610218, -0.618061, 0.49559, -0.800104, -0.599841, -0.002838, -0.969298, -0.245552, -0.011811, -0.610218, -0.618061, 0.49559, 0.969298, -0.245552, -0.011811, 0.736381, -0.180273, 0.652089, 0.964446, -0.263863, -0.012665, -0.72161, -0.222388, 0.655568, -0.736381, -0.180273, 0.652089, -0.964446, -0.263863, -0.012665, 0.736381, -0.180273, 0.652089, 0.025727, -0.231147, 0.972564, 0.72161, -0.222388, 0.655568, -0.043153, -0.341441, 0.938902, -0.025727, -0.231147, 0.972564, -0.72161, -0.222388, 0.655568, 0.025727, -0.231147, 0.972564, -0.664357, -0.305582, 0.682058, 0.043153, -0.341441, 0.938902, 0.623676, -0.464675, 0.628529, 0.664357, -0.305582, 0.682058, -0.043153, -0.341441, 0.938902, -0.664357, -0.305582, 0.682058, -0.952574, -0.303995, -0.013123, -0.623676, -0.464675, 0.628529, 0.926969, -0.374859, -0.01294, 0.952574, -0.303995, -0.013123, 0.623676, -0.464675, 0.628529, -0.926969, -0.374859, -0.01294, -0.952574, -0.303995, -0.013123, -0.615864, -0.464095, -0.636616, 0.926969, -0.374859, -0.01294, 0.615864, -0.464095, -0.636616, 0.952574, -0.303995, -0.013123, -0.615864, -0.464095, -0.636616, -0.653066, -0.319315, -0.686636, 0.042543, -0.337474, -0.940336, 0.615864, -0.464095, -0.636616, -0.042543, -0.337474, -0.940336, 0.653066, -0.319315, -0.686636, 0.042543, -0.337474, -0.940336, 0.031404, -0.252907, -0.966948, 0.715171, -0.222724, -0.662465, -0.042543, -0.337474, -0.940336, -0.715171, -0.222724, -0.662465, -0.031404, -0.252907, -0.966948, 0.715171, -0.222724, -0.662465, 0.728996, -0.193426, -0.656575, 0.964446, -0.263863, -0.012665, -0.715171, -0.222724, -0.662465, -0.964446, -0.263863, -0.012665, -0.728996, -0.193426, -0.656575, 0.159551, -0.152898, -0.975249, 0.15537, -0.632282, -0.758965, 0.0, -0.252266, -0.96765, 0.0, -0.63155, -0.775323, -0.15537, -0.632282, -0.758965, 0.0, -0.252266, -0.96765, 0.526658, -0.161107, -0.834651, 0.35023, -0.684683, -0.639149, 0.159551, -0.152898, -0.975249, -0.15537, -0.632282, -0.758965, -0.35023, -0.684683, -0.639149, -0.159551, -0.152898, -0.975249, 0.526658, -0.161107, -0.834651, 0.945708, -0.197699, -0.257851, 0.35023, -0.684683, -0.639149, -0.526658, -0.161107, -0.834651, -0.35023, -0.684683, -0.639149, -0.945708, -0.197699, -0.257851, 0.945708, -0.197699, -0.257851, 0.972808, -0.208716, 0.100314, 0.55565, -0.799982, -0.226356, -0.945708, -0.197699, -0.257851, -0.55565, -0.799982, -0.226356, -0.972808, -0.208716, 0.100314, 0.972808, -0.208716, 0.100314, 0.955718, -0.156468, 0.249184, 0.565172, -0.824396, -0.029725, -0.972808, -0.208716, 0.100314, -0.565172, -0.824396, -0.029725, -0.955718, -0.156468, 0.249184, 0.056093, -0.96292, -0.263863, 0.891537, -0.309458, -0.330668, 0.344279, -0.763298, -0.546617, -0.056093, -0.96292, -0.263863, -0.344279, -0.763298, -0.546617, -0.891537, -0.309458, -0.330668, 0.348827, 0.008148, -0.937132, 0.587481, -0.196966, -0.784875, 0.344279, -0.763298, -0.546617, -0.49913, -0.780663, -0.376049, -0.587481, -0.196966, -0.784875, -0.344279, -0.763298, -0.546617, 0.49913, -0.780663, -0.376049, 0.587481, -0.196966, -0.784875, 0.566546, -0.759819, -0.318796, -0.49913, -0.780663, -0.376049, -0.566546, -0.759819, -0.318796, -0.587481, -0.196966, -0.784875, 0.90698, 0.128941, -0.400922, 0.845119, -0.298502, 0.443403, 0.566546, -0.759819, -0.318796, -0.460707, -0.875637, -0.14481, -0.845119, -0.298502, 0.443403, -0.566546, -0.759819, -0.318796, 0.845119, -0.298502, 0.443403, 0.517045, -0.212531, 0.829127, 0.460707, -0.875637, -0.14481, -0.480117, -0.857814, -0.183264, -0.517045, -0.212531, 0.829127, -0.460707, -0.875637, -0.14481, 0.517045, -0.212531, 0.829127, 0.597552, -0.164586, 0.784722, 0.480117, -0.857814, -0.183264, -0.308451, -0.951201, 0.003845, -0.597552, -0.164586, 0.784722, -0.480117, -0.857814, -0.183264, 0.308451, -0.951201, 0.003845, 0.597552, -0.164586, 0.784722, 0.266579, -0.939146, 0.21659, -0.308451, -0.951201, 0.003845, -0.266579, -0.939146, 0.21659, -0.597552, -0.164586, 0.784722, 0.231269, -0.175054, 0.956999, -0.60506, -0.209754, 0.768029, 0.266579, -0.939146, 0.21659, 0.157384, -0.973449, 0.166021, 0.60506, -0.209754, 0.768029, -0.266579, -0.939146, 0.21659, -0.60506, -0.209754, 0.768029, -0.824183, -0.147313, 0.54677, -0.157384, -0.973449, 0.166021, 0.061098, -0.997803, -0.025239, 0.824183, -0.147313, 0.54677, 0.157384, -0.973449, 0.166021, -0.824183, -0.147313, 0.54677, 0.0, -0.267281, 0.963591, -0.061098, -0.997803, -0.025239, 0.0, -0.996551, -0.082736, 0.0, -0.267281, 0.963591, 0.061098, -0.997803, -0.025239, 0.36784, -0.885556, -0.283608, 0.258156, -0.957762, -0.126499, -0.061098, -0.997803, -0.025239, 0.157384, -0.973449, 0.166021, -0.258156, -0.957762, -0.126499, 0.061098, -0.997803, -0.025239, -0.157384, -0.973449, 0.166021, 0.258156, -0.957762, -0.126499, 0.266579, -0.939146, 0.21659, 0.157384, -0.973449, 0.166021, -0.266579, -0.939146, 0.21659, -0.258156, -0.957762, -0.126499, 0.219001, -0.975005, 0.037141, 0.308451, -0.951201, 0.003845, 0.149022, -0.976714, -0.154149, -0.266579, -0.939146, 0.21659, -0.308451, -0.951201, 0.003845, -0.149022, -0.976714, -0.154149, 0.22541, -0.904996, -0.360759, 0.480117, -0.857814, -0.183264, 0.219001, -0.975005, 0.037141, -0.308451, -0.951201, 0.003845, -0.480117, -0.857814, -0.183264, -0.219001, -0.975005, 0.037141, 0.358806, -0.925748, -0.119175, 0.460707, -0.875637, -0.14481, 0.22541, -0.904996, -0.360759, -0.480117, -0.857814, -0.183264, -0.460707, -0.875637, -0.14481, -0.22541, -0.904996, -0.360759, 0.460219, -0.87228, -0.165105, 0.566546, -0.759819, -0.318796, 0.358806, -0.925748, -0.119175, -0.460707, -0.875637, -0.14481, -0.566546, -0.759819, -0.318796, -0.358806, -0.925748, -0.119175, 0.4279, -0.815577, -0.389508, 0.49913, -0.780663, -0.376049, 0.460219, -0.87228, -0.165105, -0.566546, -0.759819, -0.318796, -0.49913, -0.780663, -0.376049, -0.460219, -0.87228, -0.165105, 0.15894, -0.851924, -0.498917, 0.344279, -0.763298, -0.546617, 0.4279, -0.815577, -0.389508, -0.49913, -0.780663, -0.376049, -0.344279, -0.763298, -0.546617, -0.4279, -0.815577, -0.389508, 0.15894, -0.851924, -0.498917, -0.128178, -0.947752, -0.292001, 0.344279, -0.763298, -0.546617, -0.15894, -0.851924, -0.498917, -0.344279, -0.763298, -0.546617, 0.128178, -0.947752, -0.292001, 0.056093, -0.96292, -0.263863, -0.128178, -0.947752, -0.292001, 0.0, -0.997925, 0.064272, -0.056093, -0.96292, -0.263863, 0.0, -0.997925, 0.064272, 0.128178, -0.947752, -0.292001, 0.36784, -0.885556, -0.283608, -0.061098, -0.997803, -0.025239, 0.031587, -0.983459, -0.178167, 0.0, -0.996551, -0.082736, 0.061098, -0.997803, -0.025239, -0.031587, -0.983459, -0.178167, -0.200568, -0.970306, -0.134953, 0.031587, -0.983459, -0.178167, 0.0, -0.975036, -0.221992, 0.200568, -0.970306, -0.134953, 0.0, -0.975036, -0.221992, -0.031587, -0.983459, -0.178167, 0.0, -0.997925, 0.064272, -0.239296, -0.923032, -0.301187, 0.0, -0.975036, -0.221992, 0.200568, -0.970306, -0.134953, 0.239296, -0.923032, -0.301187, 0.0, -0.975036, -0.221992, 0.15537, -0.632282, -0.758965, -0.05887, -0.923734, -0.37843, 0.0, -0.63155, -0.775323, -0.15537, -0.632282, -0.758965, 0.0, -0.63155, -0.775323, 0.05887, -0.923734, -0.37843, 0.35023, -0.684683, -0.639149, 0.130711, -0.93881, -0.318644, 0.15537, -0.632282, -0.758965, -0.35023, -0.684683, -0.639149, -0.15537, -0.632282, -0.758965, -0.130711, -0.93881, -0.318644, 0.14594, -0.981933, -0.120182, 0.130711, -0.93881, -0.318644, 0.55565, -0.799982, -0.226356, -0.35023, -0.684683, -0.639149, -0.130711, -0.93881, -0.318644, -0.55565, -0.799982, -0.226356, 0.565172, -0.824396, -0.029725, 0.593677, -0.797388, 0.108158, 0.181524, -0.98233, -0.045198, -0.565172, -0.824396, -0.029725, -0.181524, -0.98233, -0.045198, -0.593677, -0.797388, 0.108158, 0.181524, -0.98233, -0.045198, 0.14594, -0.981933, -0.120182, 0.565172, -0.824396, -0.029725, -0.181524, -0.98233, -0.045198, -0.565172, -0.824396, -0.029725, -0.14594, -0.981933, -0.120182, 0.500259, -0.751946, -0.429243, 0.0, -0.879452, -0.475936, 0.134098, -0.990936, 0.006256, 0.0, -1.0, 0.0, 0.0, -0.879452, -0.475936, -0.134098, -0.990936, 0.006256, 0.181524, -0.98233, -0.045198, 0.134098, -0.990936, 0.006256, 0.0, -0.99939, -0.034059, 0.0, -1.0, 0.0, -0.134098, -0.990936, 0.006256, 0.0, -0.99939, -0.034059, 0.0, -0.809595, -0.586963, 0.14594, -0.981933, -0.120182, 0.0, -0.99939, -0.034059, -0.181524, -0.98233, -0.045198, -0.14594, -0.981933, -0.120182, 0.0, -0.99939, -0.034059, 0.500259, -0.751946, -0.429243, 0.932157, -0.334758, -0.137761, 0.583575, -0.423475, -0.692862, -0.500259, -0.751946, -0.429243, -0.583575, -0.423475, -0.692862, -0.932157, -0.334758, -0.137761, 0.501389, -0.801691, -0.325327, 0.618641, -0.12479, 0.775658, 0.932157, -0.334758, -0.137761, -0.926237, -0.288003, -0.243049, -0.618641, -0.12479, 0.775658, -0.932157, -0.334758, -0.137761, 0.0, -0.856227, 0.516556, -0.240516, -0.203558, 0.949034, 0.501389, -0.801691, -0.325327, -0.618641, -0.12479, 0.775658, 0.240516, -0.203558, 0.949034, -0.501389, -0.801691, -0.325327, 0.0, -0.967711, -0.251991, 0.0, -0.559648, 0.8287, 0.0, -0.856227, 0.516556, 0.240516, -0.203558, 0.949034, 0.0, -0.559648, 0.8287, 0.0, -0.856227, 0.516556, 0.0, -0.879452, -0.475936, 0.500259, -0.751946, -0.429243, 0.0, -0.501053, -0.865383, -0.583575, -0.423475, -0.692862, -0.500259, -0.751946, -0.429243, 0.0, -0.501053, -0.865383, 0.0, -0.501053, -0.865383, 0.583575, -0.423475, -0.692862, 0.0, -0.876431, -0.481521, -0.183294, -0.789026, -0.586352, -0.583575, -0.423475, -0.692862, 0.0, -0.876431, -0.481521, -0.240516, -0.203558, 0.949034, 0.0, -0.559648, 0.8287, -0.185736, -0.781487, 0.595599, 0.240516, -0.203558, 0.949034, 0.185736, -0.781487, 0.595599, 0.0, -0.559648, 0.8287, 0.618641, -0.12479, 0.775658, -0.240516, -0.203558, 0.949034, 0.361095, -0.804651, 0.471267, -0.618641, -0.12479, 0.775658, -0.361095, -0.804651, 0.471267, 0.240516, -0.203558, 0.949034, 0.618641, -0.12479, 0.775658, 0.361095, -0.804651, 0.471267, 0.926237, -0.288003, -0.243049, -0.448805, -0.83636, -0.314707, -0.361095, -0.804651, 0.471267, -0.926237, -0.288003, -0.243049, 0.583575, -0.423475, -0.692862, 0.926237, -0.288003, -0.243049, 0.183294, -0.789026, -0.586352, -0.583575, -0.423475, -0.692862, -0.183294, -0.789026, -0.586352, -0.926237, -0.288003, -0.243049, 0.0, -0.987457, 0.157842, 0.448805, -0.83636, -0.314707, -0.185736, -0.781487, 0.595599, -0.361095, -0.804651, 0.471267, -0.448805, -0.83636, -0.314707, 0.185736, -0.781487, 0.595599, 0.448805, -0.83636, -0.314707, 0.0, -0.987457, 0.157842, 0.183294, -0.789026, -0.586352, -0.448805, -0.83636, -0.314707, -0.183294, -0.789026, -0.586352, 0.0, -0.987457, 0.157842, 0.0, -0.997925, 0.064272, 0.0, -0.856227, 0.516556, 0.056093, -0.96292, -0.263863, 0.0, -0.997925, 0.064272, -0.056093, -0.96292, -0.263863, 0.0, -0.856227, 0.516556, 0.056093, -0.96292, -0.263863, 0.501389, -0.801691, -0.325327, 0.77514, -0.630573, 0.038667, -0.056093, -0.96292, -0.263863, -0.77514, -0.630573, 0.038667, -0.501389, -0.801691, -0.325327, 0.932157, -0.334758, -0.137761, 0.500259, -0.751946, -0.429243, 0.77514, -0.630573, 0.038667, -0.650655, -0.744652, 0.148747, -0.500259, -0.751946, -0.429243, -0.77514, -0.630573, 0.038667, 0.500259, -0.751946, -0.429243, 0.134098, -0.990936, 0.006256, 0.650655, -0.744652, 0.148747, -0.593677, -0.797388, 0.108158, -0.134098, -0.990936, 0.006256, -0.650655, -0.744652, 0.148747, 0.955718, -0.156468, 0.249184, 0.927763, -0.120884, 0.353008, 0.593677, -0.797388, 0.108158, -0.650655, -0.744652, 0.148747, -0.927763, -0.120884, 0.353008, -0.593677, -0.797388, 0.108158, 0.927763, -0.120884, 0.353008, 0.930601, -0.126347, 0.343516, 0.650655, -0.744652, 0.148747, -0.77514, -0.630573, 0.038667, -0.930601, -0.126347, 0.343516, -0.650655, -0.744652, 0.148747, 0.930601, -0.126347, 0.343516, 0.891537, -0.309458, -0.330668, 0.77514, -0.630573, 0.038667, -0.930601, -0.126347, 0.343516, -0.77514, -0.630573, 0.038667, -0.891537, -0.309458, -0.330668, 0.14594, -0.981933, -0.120182, 0.0, -0.809595, -0.586963, -0.136845, -0.838588, -0.527268, 0.0, -0.273232, -0.961943, 0.0, -0.809595, -0.586963, 0.136845, -0.838588, -0.527268, -0.635121, -0.771203, 0.042756, 0.130711, -0.93881, -0.318644, -0.136845, -0.838588, -0.527268, 0.635121, -0.771203, 0.042756, 0.136845, -0.838588, -0.527268, -0.130711, -0.93881, -0.318644, -0.414106, -0.701621, 0.579821, -0.05887, -0.923734, -0.37843, -0.635121, -0.771203, 0.042756, 0.414106, -0.701621, 0.579821, 0.635121, -0.771203, 0.042756, 0.05887, -0.923734, -0.37843, 0.0, -0.82931, 0.558763, 0.0, -0.938017, -0.346507, -0.414106, -0.701621, 0.579821, 0.0, -0.82931, 0.558763, 0.414106, -0.701621, 0.579821, 0.0, -0.938017, -0.346507, 0.0, -0.82931, 0.558763, -0.414106, -0.701621, 0.579821, 0.0, -0.845851, 0.533403, 0.295846, -0.828761, 0.47496, 0.414106, -0.701621, 0.579821, 0.0, -0.845851, 0.533403, -0.295846, -0.828761, 0.47496, -0.414106, -0.701621, 0.579821, -0.673757, -0.72985, 0.115452, 0.295846, -0.828761, 0.47496, 0.673757, -0.72985, 0.115452, 0.414106, -0.701621, 0.579821, -0.673757, -0.72985, 0.115452, -0.635121, -0.771203, 0.042756, -0.517655, -0.486007, -0.704123, 0.673757, -0.72985, 0.115452, 0.517655, -0.486007, -0.704123, 0.635121, -0.771203, 0.042756, -0.136845, -0.838588, -0.527268, 0.0, -0.273232, -0.961943, -0.517655, -0.486007, -0.704123, 0.0, -0.715171, -0.698935, 0.0, -0.273232, -0.961943, 0.517655, -0.486007, -0.704123, -0.517655, -0.486007, -0.704123, 0.0, -0.715171, -0.698935, -0.295846, -0.828761, 0.47496, 0.517655, -0.486007, -0.704123, 0.295846, -0.828761, 0.47496, 0.0, -0.715171, -0.698935, 0.158055, -0.983825, -0.084231, -0.200568, -0.970306, -0.134953, -0.010102, -0.997467, -0.069979, -0.158055, -0.983825, -0.084231, 0.010102, -0.997467, -0.069979, 0.200568, -0.970306, -0.134953, 0.293405, -0.95407, -0.060152, 0.031587, -0.983459, -0.178167, 0.158055, -0.983825, -0.084231, -0.293405, -0.95407, -0.060152, -0.158055, -0.983825, -0.084231, -0.031587, -0.983459, -0.178167, 0.36784, -0.885556, -0.283608, 0.031587, -0.983459, -0.178167, 0.182958, -0.977691, -0.102878, -0.293405, -0.95407, -0.060152, -0.031587, -0.983459, -0.178167, -0.182958, -0.977691, -0.102878, -0.239296, -0.923032, -0.301187, -0.128178, -0.947752, -0.292001, -0.010102, -0.997467, -0.069979, 0.031709, -0.975005, -0.219794, 0.128178, -0.947752, -0.292001, 0.010102, -0.997467, -0.069979, -0.031709, -0.975005, -0.219794, -0.128178, -0.947752, -0.292001, 0.184454, -0.964995, -0.186316, 0.031709, -0.975005, -0.219794, -0.184454, -0.964995, -0.186316, 0.128178, -0.947752, -0.292001, 0.184454, -0.964995, -0.186316, 0.15894, -0.851924, -0.498917, 0.29899, -0.953581, -0.035615, -0.184454, -0.964995, -0.186316, -0.29899, -0.953581, -0.035615, -0.15894, -0.851924, -0.498917, 0.29899, -0.953581, -0.035615, 0.4279, -0.815577, -0.389508, 0.29429, -0.950224, -0.102023, -0.29899, -0.953581, -0.035615, -0.29429, -0.950224, -0.102023, -0.4279, -0.815577, -0.389508, 0.29429, -0.950224, -0.102023, 0.460219, -0.87228, -0.165105, 0.177587, -0.982208, -0.060762, -0.29429, -0.950224, -0.102023, -0.177587, -0.982208, -0.060762, -0.460219, -0.87228, -0.165105, 0.358806, -0.925748, -0.119175, 0.22541, -0.904996, -0.360759, 0.177587, -0.982208, -0.060762, -0.294351, -0.955657, 0.004639, -0.22541, -0.904996, -0.360759, -0.177587, -0.982208, -0.060762, 0.22541, -0.904996, -0.360759, 0.219001, -0.975005, 0.037141, 0.294351, -0.955657, 0.004639, -0.088687, -0.987884, -0.127171, -0.219001, -0.975005, 0.037141, -0.294351, -0.955657, 0.004639, 0.088687, -0.987884, -0.127171, 0.219001, -0.975005, 0.037141, 0.203619, -0.973571, 0.103183, -0.088687, -0.987884, -0.127171, -0.203619, -0.973571, 0.103183, -0.219001, -0.975005, 0.037141, 0.203619, -0.973571, 0.103183, 0.149022, -0.976714, -0.154149, 0.131504, -0.989166, 0.064974, -0.203619, -0.973571, 0.103183, -0.131504, -0.989166, 0.064974, -0.149022, -0.976714, -0.154149, 0.131504, -0.989166, 0.064974, 0.258156, -0.957762, -0.126499, 0.182958, -0.977691, -0.102878, -0.131504, -0.989166, 0.064974, -0.182958, -0.977691, -0.102878, -0.258156, -0.957762, -0.126499, 0.174383, -0.947386, -0.268319, 0.131504, -0.989166, 0.064974, 0.463424, -0.793237, -0.39491, -0.174383, -0.947386, -0.268319, -0.463424, -0.793237, -0.39491, -0.131504, -0.989166, 0.064974, 0.113315, -0.942564, -0.314188, 0.203619, -0.973571, 0.103183, 0.174383, -0.947386, -0.268319, -0.113315, -0.942564, -0.314188, -0.174383, -0.947386, -0.268319, -0.203619, -0.973571, 0.103183, 0.088687, -0.987884, -0.127171, 0.203619, -0.973571, 0.103183, -0.274056, -0.4391, -0.855617, -0.113315, -0.942564, -0.314188, -0.203619, -0.973571, 0.103183, 0.274056, -0.4391, -0.855617, 0.294351, -0.955657, 0.004639, 0.088687, -0.987884, -0.127171, -0.142308, -0.800165, -0.582629, 0.274056, -0.4391, -0.855617, -0.088687, -0.987884, -0.127171, 0.142308, -0.800165, -0.582629, -0.422926, -0.899716, -0.107761, 0.177587, -0.982208, -0.060762, -0.142308, -0.800165, -0.582629, 0.422926, -0.899716, -0.107761, 0.142308, -0.800165, -0.582629, -0.177587, -0.982208, -0.060762, 0.29429, -0.950224, -0.102023, 0.177587, -0.982208, -0.060762, -0.192145, -0.962523, 0.191351, 0.422926, -0.899716, -0.107761, -0.177587, -0.982208, -0.060762, 0.192145, -0.962523, 0.191351, -0.165288, -0.775109, 0.60979, 0.29899, -0.953581, -0.035615, -0.192145, -0.962523, 0.191351, 0.165288, -0.775109, 0.60979, 0.192145, -0.962523, 0.191351, -0.29899, -0.953581, -0.035615, 0.184454, -0.964995, -0.186316, 0.29899, -0.953581, -0.035615, 0.143071, -0.816919, 0.558672, 0.165288, -0.775109, 0.60979, -0.29899, -0.953581, -0.035615, -0.143071, -0.816919, 0.558672, -0.031709, -0.975005, -0.219794, 0.184454, -0.964995, -0.186316, 0.432264, -0.687643, 0.5833, -0.143071, -0.816919, 0.558672, -0.184454, -0.964995, -0.186316, -0.432264, -0.687643, 0.5833, 0.68804, -0.661397, 0.298471, -0.010102, -0.997467, -0.069979, 0.432264, -0.687643, 0.5833, -0.68804, -0.661397, 0.298471, -0.432264, -0.687643, 0.5833, 0.010102, -0.997467, -0.069979, 0.463424, -0.793237, -0.39491, 0.182958, -0.977691, -0.102878, 0.789361, -0.579302, -0.203192, -0.463424, -0.793237, -0.39491, -0.789361, -0.579302, -0.203192, -0.182958, -0.977691, -0.102878, 0.789361, -0.579302, -0.203192, 0.293405, -0.95407, -0.060152, 0.80163, -0.597674, 0.010987, -0.789361, -0.579302, -0.203192, -0.80163, -0.597674, 0.010987, -0.293405, -0.95407, -0.060152, 0.80163, -0.597674, 0.010987, 0.158055, -0.983825, -0.084231, 0.68804, -0.661397, 0.298471, -0.80163, -0.597674, 0.010987, -0.68804, -0.661397, 0.298471, -0.158055, -0.983825, -0.084231, 0.0, -0.511612, 0.859188, 0.0, -0.267281, 0.963591, -0.459304, -0.212592, 0.862453, 0.0, -0.511612, 0.859188, 0.459304, -0.212592, 0.862453, 0.0, -0.267281, 0.963591, -0.459304, -0.212592, 0.862453, -0.824183, -0.147313, 0.54677, -0.476638, 0.716392, 0.509445, 0.459304, -0.212592, 0.862453, 0.476638, 0.716392, 0.509445, 0.824183, -0.147313, 0.54677, -0.60506, -0.209754, 0.768029, 0.231269, -0.175054, 0.956999, -0.476638, 0.716392, 0.509445, -0.119297, 0.753807, 0.646138, -0.231269, -0.175054, 0.956999, 0.476638, 0.716392, 0.509445, 0.231269, -0.175054, 0.956999, 0.597552, -0.164586, 0.784722, 0.119297, 0.753807, 0.646138, -0.226691, 0.428114, 0.874813, -0.597552, -0.164586, 0.784722, -0.119297, 0.753807, 0.646138, 0.597552, -0.164586, 0.784722, 0.517045, -0.212531, 0.829127, 0.226691, 0.428114, 0.874813, -0.345531, 0.219123, 0.912442, -0.517045, -0.212531, 0.829127, -0.226691, 0.428114, 0.874813, 0.345531, 0.219123, 0.912442, 0.517045, -0.212531, 0.829127, 0.6957, 0.421827, 0.581378, -0.345531, 0.219123, 0.912442, -0.6957, 0.421827, 0.581378, -0.517045, -0.212531, 0.829127, 0.845119, -0.298502, 0.443403, 0.90698, 0.128941, -0.400922, 0.6957, 0.421827, 0.581378, -0.930204, 0.202338, -0.306192, -0.90698, 0.128941, -0.400922, -0.6957, 0.421827, 0.581378, 0.930204, 0.202338, -0.306192, 0.90698, 0.128941, -0.400922, 0.544328, 0.053316, -0.837153, -0.930204, 0.202338, -0.306192, -0.544328, 0.053316, -0.837153, -0.90698, 0.128941, -0.400922, 0.544328, 0.053316, -0.837153, 0.587481, -0.196966, -0.784875, 0.471969, 0.176794, -0.863674, -0.544328, 0.053316, -0.837153, -0.471969, 0.176794, -0.863674, -0.587481, -0.196966, -0.784875, 0.0, 0.976959, -0.213294, 0.0, 0.636708, -0.771081, 0.277078, 0.907804, -0.314737, -0.689322, 0.278603, -0.668691, 0.0, 0.636708, -0.771081, -0.277078, 0.907804, -0.314737, 0.0, 0.954741, -0.297342, 0.0, 0.976959, -0.213294, 0.151372, 0.976867, -0.150975, -0.277078, 0.907804, -0.314737, 0.0, 0.976959, -0.213294, -0.151372, 0.976867, -0.150975, 0.0, 0.471603, -0.881802, 0.0, 0.954741, -0.297342, 0.067476, 0.618122, -0.783166, -0.151372, 0.976867, -0.150975, 0.0, 0.954741, -0.297342, -0.067476, 0.618122, -0.783166, 0.067476, 0.618122, -0.783166, 0.159551, -0.152898, -0.975249, 0.0, 0.471603, -0.881802, -0.067476, 0.618122, -0.783166, 0.0, 0.471603, -0.881802, -0.159551, -0.152898, -0.975249, 0.555071, 0.681967, -0.476211, 0.526658, -0.161107, -0.834651, 0.067476, 0.618122, -0.783166, -0.555071, 0.681967, -0.476211, -0.067476, 0.618122, -0.783166, -0.526658, -0.161107, -0.834651, 0.62038, 0.779809, 0.083468, 0.945708, -0.197699, -0.257851, 0.555071, 0.681967, -0.476211, -0.62038, 0.779809, 0.083468, -0.555071, 0.681967, -0.476211, -0.945708, -0.197699, -0.257851, 0.779839, 0.625843, -0.010498, 0.972808, -0.208716, 0.100314, 0.62038, 0.779809, 0.083468, -0.779839, 0.625843, -0.010498, -0.62038, 0.779809, 0.083468, -0.972808, -0.208716, 0.100314, 0.779839, 0.625843, -0.010498, 0.62038, 0.779809, 0.083468, 0.277078, 0.907804, -0.314737, -0.779839, 0.625843, -0.010498, -0.277078, 0.907804, -0.314737, -0.62038, 0.779809, 0.083468, 0.62038, 0.779809, 0.083468, 0.555071, 0.681967, -0.476211, 0.151372, 0.976867, -0.150975, -0.067476, 0.618122, -0.783166, -0.555071, 0.681967, -0.476211, -0.151372, 0.976867, -0.150975, 0.895657, 0.362407, 0.257729, 0.779839, 0.625843, -0.010498, 0.689322, 0.278603, -0.668691, -0.277078, 0.907804, -0.314737, -0.779839, 0.625843, -0.010498, -0.689322, 0.278603, -0.668691, 0.895657, 0.362407, 0.257729, 0.955718, -0.156468, 0.249184, 0.779839, 0.625843, -0.010498, -0.895657, 0.362407, 0.257729, -0.779839, 0.625843, -0.010498, -0.955718, -0.156468, 0.249184, 0.927763, -0.120884, 0.353008, 0.978698, -0.061495, -0.195837, 0.930601, -0.126347, 0.343516, -0.887173, -0.433607, -0.15772, -0.978698, -0.061495, -0.195837, -0.930601, -0.126347, 0.343516, 0.955718, -0.156468, 0.249184, 0.895657, 0.362407, 0.257729, 0.927763, -0.120884, 0.353008, -0.978698, -0.061495, -0.195837, -0.895657, 0.362407, 0.257729, -0.927763, -0.120884, 0.353008, 0.891537, -0.309458, -0.330668, 0.930601, -0.126347, 0.343516, 0.785699, -0.236732, -0.571459, -0.887173, -0.433607, -0.15772, -0.930601, -0.126347, 0.343516, -0.785699, -0.236732, -0.571459, 0.891537, -0.309458, -0.330668, 0.785699, -0.236732, -0.571459, 0.348827, 0.008148, -0.937132, -0.471969, 0.176794, -0.863674, -0.785699, -0.236732, -0.571459, -0.348827, 0.008148, -0.937132, 0.0, 0.952361, -0.304941, 0.445479, 0.820399, -0.358348, 0.0, 0.722587, -0.691275, -0.522263, 0.547685, -0.653615, -0.445479, 0.820399, -0.358348, 0.0, 0.722587, -0.691275, 0.0, 0.722587, -0.691275, 0.522263, 0.547685, -0.653615, 0.0, 0.336528, -0.941649, -0.507065, 0.203314, -0.837581, -0.522263, 0.547685, -0.653615, 0.0, 0.336528, -0.941649, 0.0, 0.183294, -0.983032, 0.0, 0.336528, -0.941649, 0.57268, -0.011994, -0.819666, 0.0, 0.183294, -0.983032, -0.57268, -0.011994, -0.819666, 0.0, 0.336528, -0.941649, 0.0, 0.636708, -0.771081, 0.0, 0.183294, -0.983032, 0.689322, 0.278603, -0.668691, 0.0, 0.636708, -0.771081, -0.689322, 0.278603, -0.668691, 0.0, 0.183294, -0.983032, 0.895657, 0.362407, 0.257729, 0.689322, 0.278603, -0.668691, 0.978698, -0.061495, -0.195837, -0.57268, -0.011994, -0.819666, -0.689322, 0.278603, -0.668691, -0.978698, -0.061495, -0.195837, 0.985015, -0.063051, -0.160466, 0.930204, 0.202338, -0.306192, 0.72103, -0.065065, -0.68981, -0.985015, -0.063051, -0.160466, -0.72103, -0.065065, -0.68981, -0.930204, 0.202338, -0.306192, 0.0, 0.930967, 0.365032, 0.473006, 0.863216, 0.176305, 0.0, 0.952361, -0.304941, -0.445479, 0.820399, -0.358348, -0.473006, 0.863216, 0.176305, 0.0, 0.952361, -0.304941, 0.0, -0.55681, 0.830622, 0.444227, -0.527085, 0.724418, 0.0, -0.022584, 0.999725, -0.413495, -0.03946, 0.909635, -0.444227, -0.527085, 0.724418, 0.0, -0.022584, 0.999725, 0.0, 0.551378, 0.834223, 0.0, -0.022584, 0.999725, 0.391247, 0.426832, 0.815271, 0.0, 0.551378, 0.834223, -0.391247, 0.426832, 0.815271, 0.0, -0.022584, 0.999725, 0.0, 0.930967, 0.365032, 0.0, 0.551378, 0.834223, 0.473006, 0.863216, 0.176305, 0.0, 0.930967, 0.365032, -0.473006, 0.863216, 0.176305, 0.0, 0.551378, 0.834223, 0.444411, -0.425031, 0.788537, 0.345531, 0.219123, 0.912442, 0.771722, -0.078494, 0.631062, -0.444411, -0.425031, 0.788537, -0.771722, -0.078494, 0.631062, -0.345531, 0.219123, 0.912442, 0.668172, -0.319498, 0.671865, 0.444411, -0.425031, 0.788537, 0.741752, -0.427839, 0.516434, -0.668172, -0.319498, 0.671865, -0.741752, -0.427839, 0.516434, -0.444411, -0.425031, 0.788537, 0.678396, 0.069521, 0.731376, 0.668172, -0.319498, 0.671865, 0.848628, 0.014008, 0.528764, -0.678396, 0.069521, 0.731376, -0.848628, 0.014008, 0.528764, -0.668172, -0.319498, 0.671865, 0.607532, 0.553575, 0.569567, 0.678396, 0.069521, 0.731376, 0.872158, 0.374645, 0.314554, -0.607532, 0.553575, 0.569567, -0.872158, 0.374645, 0.314554, -0.678396, 0.069521, 0.731376, 0.670766, 0.740257, -0.045289, 0.619648, 0.782525, -0.060457, 0.872158, 0.374645, 0.314554, -0.607532, 0.553575, 0.569567, -0.619648, 0.782525, -0.060457, -0.872158, 0.374645, 0.314554, 0.619648, 0.782525, -0.060457, 0.473006, 0.863216, 0.176305, 0.607532, 0.553575, 0.569567, -0.619648, 0.782525, -0.060457, -0.607532, 0.553575, 0.569567, -0.473006, 0.863216, 0.176305, 0.607532, 0.553575, 0.569567, 0.391247, 0.426832, 0.815271, 0.678396, 0.069521, 0.731376, -0.607532, 0.553575, 0.569567, -0.678396, 0.069521, 0.731376, -0.391247, 0.426832, 0.815271, 0.678396, 0.069521, 0.731376, 0.413495, -0.03946, 0.909635, 0.668172, -0.319498, 0.671865, -0.678396, 0.069521, 0.731376, -0.668172, -0.319498, 0.671865, -0.413495, -0.03946, 0.909635, 0.668172, -0.319498, 0.671865, 0.444227, -0.527085, 0.724418, 0.444411, -0.425031, 0.788537, -0.668172, -0.319498, 0.671865, -0.444411, -0.425031, 0.788537, -0.444227, -0.527085, 0.724418, 0.226691, 0.428114, 0.874813, 0.345531, 0.219123, 0.912442, 0.340648, -0.322306, 0.883206, -0.444411, -0.425031, 0.788537, -0.345531, 0.219123, 0.912442, -0.340648, -0.322306, 0.883206, 0.0, -0.848445, 0.529252, 0.340648, -0.322306, 0.883206, 0.0, -0.55681, 0.830622, -0.444227, -0.527085, 0.724418, -0.340648, -0.322306, 0.883206, 0.0, -0.55681, 0.830622, -0.459304, -0.212592, 0.862453, -0.476638, 0.716392, 0.509445, 0.226691, 0.428114, 0.874813, -0.119297, 0.753807, 0.646138, 0.476638, 0.716392, 0.509445, -0.226691, 0.428114, 0.874813, 0.0, -0.848445, 0.529252, -0.459304, -0.212592, 0.862453, 0.340648, -0.322306, 0.883206, 0.0, -0.848445, 0.529252, -0.340648, -0.322306, 0.883206, 0.459304, -0.212592, 0.862453, 0.6957, 0.421827, 0.581378, 0.930204, 0.202338, -0.306192, 0.771722, -0.078494, 0.631062, -0.985015, -0.063051, -0.160466, -0.930204, 0.202338, -0.306192, -0.771722, -0.078494, 0.631062, 0.771722, -0.078494, 0.631062, 0.985015, -0.063051, -0.160466, 0.741752, -0.427839, 0.516434, -0.771722, -0.078494, 0.631062, -0.741752, -0.427839, 0.516434, -0.985015, -0.063051, -0.160466, 0.741752, -0.427839, 0.516434, 0.997009, 0.069521, -0.033296, 0.848628, 0.014008, 0.528764, -0.741752, -0.427839, 0.516434, -0.848628, 0.014008, 0.528764, -0.997009, 0.069521, -0.033296, 0.670766, 0.740257, -0.045289, 0.872158, 0.374645, 0.314554, 0.908536, -0.352489, 0.224219, -0.848628, 0.014008, 0.528764, -0.872158, 0.374645, 0.314554, -0.908536, -0.352489, 0.224219, 0.57268, -0.011994, -0.819666, 0.507065, 0.203314, -0.837581, 0.579028, -0.142705, -0.802698, -0.56328, 0.121311, -0.817286, -0.507065, 0.203314, -0.837581, -0.579028, -0.142705, -0.802698, 0.72103, -0.065065, -0.68981, 0.579028, -0.142705, -0.802698, 0.312296, -0.00116, -0.94995, -0.56328, 0.121311, -0.817286, -0.579028, -0.142705, -0.802698, -0.312296, -0.00116, -0.94995, 0.72103, -0.065065, -0.68981, 0.544328, 0.053316, -0.837153, 0.579028, -0.142705, -0.802698, -0.72103, -0.065065, -0.68981, -0.579028, -0.142705, -0.802698, -0.544328, 0.053316, -0.837153, 0.579028, -0.142705, -0.802698, 0.471969, 0.176794, -0.863674, 0.978698, -0.061495, -0.195837, -0.579028, -0.142705, -0.802698, -0.978698, -0.061495, -0.195837, -0.471969, 0.176794, -0.863674, 0.670766, 0.740257, -0.045289, 0.32551, 0.728355, -0.602924, 0.619648, 0.782525, -0.060457, -0.529221, 0.681722, -0.505112, -0.32551, 0.728355, -0.602924, -0.619648, 0.782525, -0.060457, 0.473006, 0.863216, 0.176305, 0.619648, 0.782525, -0.060457, 0.445479, 0.820399, -0.358348, -0.529221, 0.681722, -0.505112, -0.619648, 0.782525, -0.060457, -0.445479, 0.820399, -0.358348, 0.312296, -0.00116, -0.94995, 0.56328, 0.121311, -0.817286, 0.32551, 0.728355, -0.602924, -0.529221, 0.681722, -0.505112, -0.56328, 0.121311, -0.817286, -0.32551, 0.728355, -0.602924, 0.507065, 0.203314, -0.837581, 0.522263, 0.547685, -0.653615, 0.56328, 0.121311, -0.817286, -0.529221, 0.681722, -0.505112, -0.522263, 0.547685, -0.653615, -0.56328, 0.121311, -0.817286, 0.018799, -0.488632, 0.87225, -0.279244, -0.575884, 0.768303, 0.551164, -0.830622, -0.078768, -0.449232, -0.892575, -0.038331, 0.279244, -0.575884, 0.768303, -0.551164, -0.830622, -0.078768, 0.383557, -0.328776, 0.862972, 0.018799, -0.488632, 0.87225, 0.321451, -0.942381, -0.092318, -0.383557, -0.328776, 0.862972, -0.321451, -0.942381, -0.092318, -0.018799, -0.488632, 0.87225, 0.383557, -0.328776, 0.862972, 0.321451, -0.942381, -0.092318, 0.778802, -0.604389, 0.167791, 0.154454, -0.980193, -0.123875, -0.321451, -0.942381, -0.092318, -0.778802, -0.604389, 0.167791, 0.778802, -0.604389, 0.167791, -0.154454, -0.980193, -0.123875, 0.652608, -0.588794, -0.476821, 0.041108, -0.949553, 0.310831, 0.154454, -0.980193, -0.123875, -0.652608, -0.588794, -0.476821, 0.652608, -0.588794, -0.476821, -0.041108, -0.949553, 0.310831, 0.502884, -0.370312, -0.780999, -0.538377, -0.789239, 0.295267, 0.041108, -0.949553, 0.310831, -0.502884, -0.370312, -0.780999, 0.029542, -0.771905, -0.634999, 0.502884, -0.370312, -0.780999, 0.329936, -0.889645, 0.315653, -0.029542, -0.771905, -0.634999, -0.329936, -0.889645, 0.315653, -0.502884, -0.370312, -0.780999, 0.329936, -0.889645, 0.315653, 0.538377, -0.789239, 0.295267, 0.162877, -0.487014, 0.858028, -0.329936, -0.889645, 0.315653, -0.162877, -0.487014, 0.858028, -0.538377, -0.789239, 0.295267, 0.538377, -0.789239, 0.295267, -0.041108, -0.949553, 0.310831, -0.186804, -0.235084, 0.953825, -0.538377, -0.789239, 0.295267, 0.186804, -0.235084, 0.953825, 0.041108, -0.949553, 0.310831, -0.154454, -0.980193, -0.123875, -0.984741, -0.142613, -0.099582, -0.041108, -0.949553, 0.310831, 0.762139, 0.019318, 0.647084, 0.984741, -0.142613, -0.099582, 0.041108, -0.949553, 0.310831, 0.321451, -0.942381, -0.092318, -0.149571, -0.649464, -0.745506, -0.154454, -0.980193, -0.123875, 0.984741, -0.142613, -0.099582, 0.149571, -0.649464, -0.745506, 0.154454, -0.980193, -0.123875, 0.551164, -0.830622, -0.078768, 0.560442, -0.4991, -0.660878, 0.321451, -0.942381, -0.092318, 0.149571, -0.649464, -0.745506, -0.560442, -0.4991, -0.660878, -0.321451, -0.942381, -0.092318, 0.560442, -0.4991, -0.660878, 0.551164, -0.830622, -0.078768, 0.684194, -0.472182, -0.555773, -0.560442, -0.4991, -0.660878, -0.684194, -0.472182, -0.555773, -0.551164, -0.830622, -0.078768, 0.72103, -0.065065, -0.68981, 0.312296, -0.00116, -0.94995, 0.857204, 0.148289, -0.493118, -0.731193, -0.672475, 0.114414, -0.312296, -0.00116, -0.94995, -0.857204, 0.148289, -0.493118, 0.312296, -0.00116, -0.94995, 0.029542, -0.771905, -0.634999, 0.731193, -0.672475, 0.114414, -0.329936, -0.889645, 0.315653, -0.029542, -0.771905, -0.634999, -0.731193, -0.672475, 0.114414, 0.997009, 0.069521, -0.033296, 0.985015, -0.063051, -0.160466, 0.857204, 0.148289, -0.493118, -0.997009, 0.069521, -0.033296, -0.857204, 0.148289, -0.493118, -0.985015, -0.063051, -0.160466, -0.279244, -0.575884, 0.768303, 0.908536, -0.352489, 0.224219, 0.449232, -0.892575, -0.038331, 0.279244, -0.575884, 0.768303, -0.449232, -0.892575, -0.038331, -0.908536, -0.352489, 0.224219, 0.731193, -0.672475, 0.114414, 0.329936, -0.889645, 0.315653, 0.599841, -0.61388, 0.513138, -0.731193, -0.672475, 0.114414, -0.599841, -0.61388, 0.513138, -0.329936, -0.889645, 0.315653, 0.842036, -0.509781, -0.176244, 0.960936, -0.249855, -0.118839, 0.599841, -0.61388, 0.513138, -0.731193, -0.672475, 0.114414, -0.960936, -0.249855, -0.118839, -0.599841, -0.61388, 0.513138, 0.481368, -0.604816, 0.634388, 0.851466, -0.522752, 0.041353, 0.842036, -0.509781, -0.176244, -0.481368, -0.604816, 0.634388, -0.842036, -0.509781, -0.176244, -0.851466, -0.522752, 0.041353, 0.686361, -0.374554, -0.623371, 0.848354, -0.301157, -0.435377, 0.851466, -0.522752, 0.041353, -0.960936, -0.249855, -0.118839, -0.848354, -0.301157, -0.435377, -0.851466, -0.522752, 0.041353, 0.372723, -0.900449, -0.224158, 0.848354, -0.301157, -0.435377, 0.726066, -0.473128, -0.498917, -0.686361, -0.374554, -0.623371, -0.848354, -0.301157, -0.435377, -0.726066, -0.473128, -0.498917, 0.449232, -0.892575, -0.038331, 0.372723, -0.900449, -0.224158, 0.684194, -0.472182, -0.555773, -0.726066, -0.473128, -0.498917, -0.372723, -0.900449, -0.224158, -0.684194, -0.472182, -0.555773, 0.997009, 0.069521, -0.033296, 0.848354, -0.301157, -0.435377, 0.908536, -0.352489, 0.224219, -0.372723, -0.900449, -0.224158, -0.848354, -0.301157, -0.435377, -0.908536, -0.352489, 0.224219, 0.997009, 0.069521, -0.033296, 0.857204, 0.148289, -0.493118, 0.848354, -0.301157, -0.435377, -0.960936, -0.249855, -0.118839, -0.857204, 0.148289, -0.493118, -0.848354, -0.301157, -0.435377, 0.648213, -0.634724, -0.420576, 0.684194, -0.472182, -0.555773, 0.659291, -0.588061, -0.46849, -0.648213, -0.634724, -0.420576, -0.659291, -0.588061, -0.46849, -0.684194, -0.472182, -0.555773, 0.726066, -0.473128, -0.498917, 0.686361, -0.374554, -0.623371, 0.659291, -0.588061, -0.46849, -0.572527, -0.704733, -0.418928, -0.686361, -0.374554, -0.623371, -0.659291, -0.588061, -0.46849, 0.572527, -0.704733, -0.418928, 0.686361, -0.374554, -0.623371, 0.758354, -0.594806, 0.266518, -0.572527, -0.704733, -0.418928, -0.758354, -0.594806, 0.266518, -0.686361, -0.374554, -0.623371, 0.851466, -0.522752, 0.041353, 0.481368, -0.604816, 0.634388, 0.758354, -0.594806, 0.266518, -0.449232, -0.808618, 0.379864, -0.481368, -0.604816, 0.634388, -0.758354, -0.594806, 0.266518, 0.481368, -0.604816, 0.634388, 0.842036, -0.509781, -0.176244, 0.449232, -0.808618, 0.379864, -0.292917, -0.881222, 0.370922, -0.842036, -0.509781, -0.176244, -0.449232, -0.808618, 0.379864, 0.292917, -0.881222, 0.370922, 0.842036, -0.509781, -0.176244, 0.644978, -0.698386, 0.310129, -0.292917, -0.881222, 0.370922, -0.644978, -0.698386, 0.310129, -0.842036, -0.509781, -0.176244, 0.644978, -0.698386, 0.310129, 0.599841, -0.61388, 0.513138, -0.033113, -0.325602, 0.944914, -0.644978, -0.698386, 0.310129, 0.033113, -0.325602, 0.944914, -0.599841, -0.61388, 0.513138, 0.461776, -0.823664, -0.329142, 0.560442, -0.4991, -0.660878, 0.648213, -0.634724, -0.420576, -0.461776, -0.823664, -0.329142, -0.648213, -0.634724, -0.420576, -0.560442, -0.4991, -0.660878, -0.262398, -0.804346, -0.533067, -0.149571, -0.649464, -0.745506, 0.461776, -0.823664, -0.329142, 0.262398, -0.804346, -0.533067, -0.461776, -0.823664, -0.329142, 0.149571, -0.649464, -0.745506, -0.752861, -0.657277, -0.033784, -0.984741, -0.142613, -0.099582, -0.262398, -0.804346, -0.533067, 0.752861, -0.657277, -0.033784, 0.262398, -0.804346, -0.533067, 0.984741, -0.142613, -0.099582, -0.762139, 0.019318, 0.647084, -0.984741, -0.142613, -0.099582, -0.583117, -0.640339, 0.499893, 0.752861, -0.657277, -0.033784, 0.984741, -0.142613, -0.099582, 0.583117, -0.640339, 0.499893, -0.186804, -0.235084, 0.953825, -0.762139, 0.019318, 0.647084, 0.065004, -0.707358, 0.703848, 0.583117, -0.640339, 0.499893, 0.762139, 0.019318, 0.647084, -0.065004, -0.707358, 0.703848, 0.162877, -0.487014, 0.858028, -0.186804, -0.235084, 0.953825, -0.033113, -0.325602, 0.944914, -0.065004, -0.707358, 0.703848, 0.186804, -0.235084, 0.953825, 0.033113, -0.325602, 0.944914, 0.449232, -0.808618, 0.379864, 0.292917, -0.881222, 0.370922, 0.195105, -0.97998, 0.038942, -0.408429, -0.903836, 0.127262, -0.292917, -0.881222, 0.370922, -0.195105, -0.97998, 0.038942, 0.195105, -0.97998, 0.038942, 0.408429, -0.903836, 0.127262, 0.334666, -0.942289, -0.004578, -0.444807, -0.890683, -0.093692, -0.408429, -0.903836, 0.127262, -0.334666, -0.942289, -0.004578, 0.3343, -0.936369, 0.106784, 0.334666, -0.942289, -0.004578, 0.314371, -0.943602, -0.103732, -0.3343, -0.936369, 0.106784, -0.314371, -0.943602, -0.103732, -0.334666, -0.942289, -0.004578, 0.3343, -0.936369, 0.106784, 0.314371, -0.943602, -0.103732, 0.289651, -0.9035, 0.315806, -0.383129, -0.92114, -0.068514, -0.314371, -0.943602, -0.103732, -0.289651, -0.9035, 0.315806, 0.289651, -0.9035, 0.315806, 0.461776, -0.823664, -0.329142, 0.3343, -0.936369, 0.106784, -0.289651, -0.9035, 0.315806, -0.3343, -0.936369, 0.106784, -0.461776, -0.823664, -0.329142, 0.659291, -0.588061, -0.46849, 0.334666, -0.942289, -0.004578, 0.648213, -0.634724, -0.420576, -0.3343, -0.936369, 0.106784, -0.334666, -0.942289, -0.004578, -0.648213, -0.634724, -0.420576, 0.659291, -0.588061, -0.46849, 0.572527, -0.704733, -0.418928, 0.334666, -0.942289, -0.004578, -0.195105, -0.97998, 0.038942, -0.572527, -0.704733, -0.418928, -0.334666, -0.942289, -0.004578, 0.758354, -0.594806, 0.266518, 0.449232, -0.808618, 0.379864, 0.572527, -0.704733, -0.418928, -0.758354, -0.594806, 0.266518, -0.572527, -0.704733, -0.418928, -0.449232, -0.808618, 0.379864, 0.644978, -0.698386, 0.310129, -0.033113, -0.325602, 0.944914, 0.292917, -0.881222, 0.370922, -0.408429, -0.903836, 0.127262, 0.033113, -0.325602, 0.944914, -0.292917, -0.881222, 0.370922, -0.033113, -0.325602, 0.944914, 0.065004, -0.707358, 0.703848, 0.408429, -0.903836, 0.127262, 0.033113, -0.325602, 0.944914, -0.408429, -0.903836, 0.127262, -0.065004, -0.707358, 0.703848, -0.583117, -0.640339, 0.499893, 0.314371, -0.943602, -0.103732, 0.065004, -0.707358, 0.703848, -0.444807, -0.890683, -0.093692, -0.314371, -0.943602, -0.103732, -0.065004, -0.707358, 0.703848, -0.752861, -0.657277, -0.033784, 0.383129, -0.92114, -0.068514, -0.583117, -0.640339, 0.499893, -0.314371, -0.943602, -0.103732, -0.383129, -0.92114, -0.068514, 0.583117, -0.640339, 0.499893, -0.752861, -0.657277, -0.033784, -0.262398, -0.804346, -0.533067, 0.383129, -0.92114, -0.068514, 0.752861, -0.657277, -0.033784, -0.383129, -0.92114, -0.068514, 0.262398, -0.804346, -0.533067, -0.025269, 0.733116, -0.679586, 0.502884, -0.370312, -0.780999, -0.098849, 0.532151, -0.840846, 0.025269, 0.733116, -0.679586, 0.098849, 0.532151, -0.840846, -0.502884, -0.370312, -0.780999, 0.636586, 0.583392, -0.504318, 0.652608, -0.588794, -0.476821, -0.025269, 0.733116, -0.679586, -0.636586, 0.583392, -0.504318, 0.025269, 0.733116, -0.679586, -0.652608, -0.588794, -0.476821, 0.778802, -0.604389, 0.167791, 0.652608, -0.588794, -0.476821, 0.92526, 0.367992, 0.09183, -0.636586, 0.583392, -0.504318, -0.652608, -0.588794, -0.476821, -0.92526, 0.367992, 0.09183, 0.383557, -0.328776, 0.862972, 0.778802, -0.604389, 0.167791, 0.286996, 0.748497, 0.597766, -0.92526, 0.367992, 0.09183, -0.778802, -0.604389, 0.167791, -0.286996, 0.748497, 0.597766, 0.018799, -0.488632, 0.87225, 0.383557, -0.328776, 0.862972, -0.414228, 0.724479, 0.55089, -0.286996, 0.748497, 0.597766, -0.383557, -0.328776, 0.862972, 0.414228, 0.724479, 0.55089, -0.279244, -0.575884, 0.768303, 0.018799, -0.488632, 0.87225, -0.650044, 0.485336, 0.584643, 0.414228, 0.724479, 0.55089, -0.018799, -0.488632, 0.87225, 0.650044, 0.485336, 0.584643, -0.414228, 0.724479, 0.55089, -0.025269, 0.733116, -0.679586, -0.650044, 0.485336, 0.584643, 0.098849, 0.532151, -0.840846, 0.025269, 0.733116, -0.679586, 0.650044, 0.485336, 0.584643, -0.025269, 0.733116, -0.679586, -0.414228, 0.724479, 0.55089, 0.636586, 0.583392, -0.504318, 0.025269, 0.733116, -0.679586, -0.636586, 0.583392, -0.504318, 0.414228, 0.724479, 0.55089, 0.670766, 0.740257, -0.045289, 0.908536, -0.352489, 0.224219, -0.650044, 0.485336, 0.584643, 0.279244, -0.575884, 0.768303, -0.908536, -0.352489, 0.224219, 0.650044, 0.485336, 0.584643, 0.32551, 0.728355, -0.602924, 0.670766, 0.740257, -0.045289, -0.098849, 0.532151, -0.840846, -0.32551, 0.728355, -0.602924, 0.098849, 0.532151, -0.840846, -0.670766, 0.740257, -0.045289, 0.029542, -0.771905, -0.634999, 0.312296, -0.00116, -0.94995, -0.098849, 0.532151, -0.840846, -0.029542, -0.771905, -0.634999, 0.098849, 0.532151, -0.840846, -0.312296, -0.00116, -0.94995],

    "colors": [0.184314, 0.235294, 0.662745, 0.082353, 0.121569, 0.407843, 0.380392, 0.392157, 0.478431, 0.109804, 0.14902, 0.478431, 0.082353, 0.121569, 0.407843, 0.160784, 0.215686, 0.662745, 0.662745, 0.662745, 0.662745, 0.384314, 0.396078, 0.478431, 0.462745, 0.462745, 0.462745, 0.462745, 0.462745, 0.462745, 0.478431, 0.478431, 0.478431, 0.662745, 0.662745, 0.662745, 0.478431, 0.478431, 0.478431, 0.34902, 0.34902, 0.34902, 0.254902, 0.254902, 0.254902, 0.254902, 0.254902, 0.254902, 0.34902, 0.34902, 0.34902, 0.478431, 0.478431, 0.478431, 0.082353, 0.121569, 0.407843, 0.011765, 0.015686, 0.121569, 0.066667, 0.098039, 0.34902, 0.121569, 0.14902, 0.34902, 0.011765, 0.015686, 0.121569, 0.082353, 0.121569, 0.407843, 0.011765, 0.015686, 0.121569, 0.078431, 0.113725, 0.384314, 0.101961, 0.141176, 0.466667, 0.4, 0.407843, 0.466667, 0.078431, 0.113725, 0.384314, 0.011765, 0.015686, 0.121569, 0.066667, 0.098039, 0.34902, 0.101961, 0.141176, 0.466667, 0.090196, 0.129412, 0.419608, 0.419608, 0.419608, 0.419608, 0.4, 0.407843, 0.466667, 0.121569, 0.14902, 0.34902, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.419608, 0.419608, 0.419608, 0.662745, 0.662745, 0.662745, 0.466667, 0.466667, 0.466667, 0.419608, 0.419608, 0.419608, 0.160784, 0.215686, 0.662745, 0.188235, 0.243137, 0.662745, 0.101961, 0.141176, 0.466667, 0.160784, 0.215686, 0.662745, 0.078431, 0.113725, 0.384314, 0.4, 0.407843, 0.466667, 0.160784, 0.215686, 0.662745, 0.215686, 0.286275, 0.843137, 0.262745, 0.321569, 0.815686, 0.639216, 0.658824, 0.815686, 0.215686, 0.286275, 0.843137, 0.160784, 0.215686, 0.662745, 0.815686, 0.815686, 0.815686, 0.882353, 0.882353, 0.882353, 0.662745, 0.662745, 0.662745, 0.815686, 0.815686, 0.815686, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.854902, 0.854902, 0.854902, 0.929412, 0.929412, 0.929412, 0.882353, 0.882353, 0.882353, 0.854902, 0.854902, 0.854902, 0.815686, 0.815686, 0.815686, 0.882353, 0.882353, 0.882353, 0.231373, 0.305882, 0.901961, 0.356863, 0.415686, 0.854902, 0.262745, 0.321569, 0.815686, 0.231373, 0.305882, 0.901961, 0.215686, 0.286275, 0.843137, 0.639216, 0.658824, 0.815686, 0.219608, 0.290196, 0.831373, 0.827451, 0.827451, 0.831373, 0.356863, 0.415686, 0.854902, 0.211765, 0.282353, 0.831373, 0.231373, 0.305882, 0.901961, 0.521569, 0.564706, 0.854902, 0.831373, 0.831373, 0.831373, 0.858824, 0.858824, 0.858824, 0.929412, 0.929412, 0.929412, 0.831373, 0.831373, 0.831373, 0.854902, 0.854902, 0.854902, 0.929412, 0.929412, 0.929412, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.858824, 0.858824, 0.858824, 0.317647, 0.356863, 0.662745, 0.607843, 0.635294, 0.831373, 0.854902, 0.854902, 0.858824, 0.184314, 0.235294, 0.662745, 0.662745, 0.662745, 0.662745, 0.827451, 0.827451, 0.831373, 0.160784, 0.215686, 0.662745, 0.211765, 0.282353, 0.831373, 0.607843, 0.635294, 0.831373, 0.831373, 0.831373, 0.831373, 0.831373, 0.831373, 0.831373, 0.662745, 0.662745, 0.662745, 0.831373, 0.831373, 0.831373, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.901961, 0.901961, 0.901961, 0.894118, 0.894118, 0.894118, 0.831373, 0.831373, 0.831373, 0.901961, 0.901961, 0.901961, 0.831373, 0.831373, 0.831373, 0.831373, 0.831373, 0.831373, 0.843137, 0.843137, 0.843137, 0.831373, 0.831373, 0.831373, 0.894118, 0.894118, 0.894118, 0.843137, 0.843137, 0.843137, 0.901961, 0.901961, 0.901961, 0.894118, 0.894118, 0.894118, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.831373, 0.831373, 0.831373, 0.662745, 0.662745, 0.662745, 0.843137, 0.843137, 0.843137, 0.831373, 0.831373, 0.831373, 0.662745, 0.662745, 0.662745, 0.384314, 0.384314, 0.384314, 0.407843, 0.407843, 0.407843, 0.407843, 0.407843, 0.407843, 0.384314, 0.384314, 0.384314, 0.662745, 0.662745, 0.662745, 0.384314, 0.384314, 0.384314, 0.121569, 0.121569, 0.121569, 0.176471, 0.176471, 0.176471, 0.176471, 0.176471, 0.176471, 0.121569, 0.121569, 0.121569, 0.384314, 0.384314, 0.384314, 0.121569, 0.121569, 0.121569, 0.407843, 0.407843, 0.407843, 0.407843, 0.407843, 0.407843, 0.407843, 0.407843, 0.407843, 0.407843, 0.407843, 0.407843, 0.121569, 0.121569, 0.121569, 0.407843, 0.407843, 0.407843, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.407843, 0.407843, 0.407843, 0.160784, 0.215686, 0.662745, 0.086275, 0.121569, 0.407843, 0.215686, 0.262745, 0.662745, 0.160784, 0.215686, 0.662745, 0.082353, 0.121569, 0.407843, 0.160784, 0.215686, 0.662745, 0.019608, 0.031373, 0.176471, 0.086275, 0.121569, 0.407843, 0.160784, 0.215686, 0.662745, 0.160784, 0.215686, 0.662745, 0.082353, 0.121569, 0.407843, 0.019608, 0.031373, 0.176471, 0.160784, 0.215686, 0.662745, 0.086275, 0.121569, 0.407843, 0.019608, 0.031373, 0.176471, 0.019608, 0.031373, 0.176471, 0.086275, 0.121569, 0.407843, 0.160784, 0.215686, 0.662745, 0.160784, 0.215686, 0.662745, 0.160784, 0.215686, 0.662745, 0.086275, 0.121569, 0.407843, 0.086275, 0.121569, 0.407843, 0.160784, 0.215686, 0.662745, 0.160784, 0.215686, 0.662745, 0.160784, 0.215686, 0.662745, 0.211765, 0.282353, 0.831373, 0.160784, 0.215686, 0.662745, 0.160784, 0.215686, 0.662745, 0.211765, 0.282353, 0.831373, 0.160784, 0.215686, 0.662745, 0.160784, 0.215686, 0.662745, 0.231373, 0.305882, 0.894118, 0.211765, 0.282353, 0.831373, 0.211765, 0.282353, 0.831373, 0.231373, 0.305882, 0.894118, 0.160784, 0.215686, 0.662745, 0.160784, 0.215686, 0.662745, 0.231373, 0.298039, 0.831373, 0.231373, 0.305882, 0.894118, 0.231373, 0.305882, 0.894118, 0.215686, 0.286275, 0.831373, 0.160784, 0.215686, 0.662745, 0.160784, 0.215686, 0.662745, 0.215686, 0.262745, 0.662745, 0.231373, 0.298039, 0.831373, 0.215686, 0.286275, 0.831373, 0.160784, 0.215686, 0.662745, 0.160784, 0.215686, 0.662745, 0.345098, 0.345098, 0.345098, 0.317647, 0.317647, 0.317647, 0.094118, 0.094118, 0.094118, 0.345098, 0.345098, 0.345098, 0.101961, 0.101961, 0.101961, 0.094118, 0.094118, 0.094118, 0.427451, 0.427451, 0.427451, 0.345098, 0.345098, 0.345098, 0.101961, 0.101961, 0.101961, 0.427451, 0.427451, 0.427451, 0.352941, 0.352941, 0.352941, 0.101961, 0.101961, 0.101961, 0.619608, 0.619608, 0.619608, 0.596078, 0.596078, 0.596078, 0.427451, 0.427451, 0.427451, 0.427451, 0.427451, 0.427451, 0.596078, 0.596078, 0.596078, 0.619608, 0.619608, 0.619608, 0.694118, 0.694118, 0.694118, 0.654902, 0.65098, 0.607843, 0.596078, 0.596078, 0.596078, 0.596078, 0.596078, 0.596078, 0.654902, 0.647059, 0.564706, 0.694118, 0.694118, 0.694118, 0.72549, 0.72549, 0.72549, 0.698039, 0.698039, 0.698039, 0.654902, 0.65098, 0.607843, 0.654902, 0.647059, 0.564706, 0.698039, 0.694118, 0.627451, 0.72549, 0.72549, 0.72549, 0.533333, 0.533333, 0.533333, 0.180392, 0.180392, 0.180392, 0.423529, 0.427451, 0.47451, 0.458824, 0.458824, 0.47451, 0.180392, 0.180392, 0.180392, 0.533333, 0.533333, 0.52549, 0.321569, 0.321569, 0.321569, 0.52549, 0.52549, 0.52549, 0.423529, 0.427451, 0.47451, 0.321569, 0.321569, 0.321569, 0.180392, 0.180392, 0.180392, 0.458824, 0.458824, 0.47451, 0.321569, 0.321569, 0.321569, 0.52549, 0.52549, 0.52549, 0.556863, 0.556863, 0.556863, 0.556863, 0.556863, 0.556863, 0.52549, 0.52549, 0.52549, 0.321569, 0.321569, 0.321569, 0.819608, 0.819608, 0.819608, 0.619608, 0.619608, 0.619608, 0.556863, 0.556863, 0.556863, 0.819608, 0.819608, 0.819608, 0.52549, 0.52549, 0.52549, 0.556863, 0.556863, 0.556863, 0.94902, 0.94902, 0.94902, 0.654902, 0.654902, 0.654902, 0.619608, 0.619608, 0.619608, 0.94902, 0.94902, 0.94902, 0.819608, 0.819608, 0.819608, 0.619608, 0.619608, 0.619608, 0.937255, 0.937255, 0.937255, 0.654902, 0.654902, 0.654902, 0.654902, 0.654902, 0.654902, 0.937255, 0.937255, 0.937255, 0.94902, 0.94902, 0.94902, 0.654902, 0.654902, 0.654902, 0.937255, 0.937255, 0.937255, 0.992157, 0.992157, 0.992157, 0.745098, 0.745098, 0.745098, 0.745098, 0.745098, 0.745098, 0.992157, 0.992157, 0.992157, 0.937255, 0.937255, 0.937255, 0.945098, 0.945098, 0.945098, 0.72549, 0.72549, 0.72549, 0.745098, 0.745098, 0.745098, 0.945098, 0.945098, 0.945098, 0.992157, 0.992157, 0.992157, 0.745098, 0.745098, 0.745098, 0.882353, 0.882353, 0.882353, 0.654902, 0.654902, 0.654902, 0.72549, 0.72549, 0.72549, 0.882353, 0.882353, 0.882353, 0.945098, 0.945098, 0.945098, 0.72549, 0.72549, 0.72549, 0.988235, 0.988235, 0.988235, 0.658824, 0.658824, 0.658824, 0.654902, 0.654902, 0.654902, 0.988235, 0.988235, 0.988235, 0.882353, 0.882353, 0.882353, 0.654902, 0.654902, 0.654902, 0.458824, 0.478431, 0.627451, 0.72549, 0.72549, 0.72549, 0.654902, 0.654902, 0.654902, 0.572549, 0.580392, 0.627451, 0.592157, 0.592157, 0.6, 0.654902, 0.654902, 0.654902, 0.458824, 0.478431, 0.627451, 0.388235, 0.415686, 0.635294, 0.745098, 0.745098, 0.745098, 0.745098, 0.745098, 0.745098, 0.529412, 0.541176, 0.635294, 0.572549, 0.580392, 0.627451, 0.654902, 0.654902, 0.654902, 0.745098, 0.745098, 0.745098, 0.388235, 0.415686, 0.635294, 0.654902, 0.654902, 0.654902, 0.458824, 0.482353, 0.662745, 0.529412, 0.541176, 0.635294, 0.654902, 0.654902, 0.654902, 0.654902, 0.654902, 0.654902, 0.541176, 0.552941, 0.662745, 0.654902, 0.654902, 0.654902, 0.564706, 0.564706, 0.564706, 0.458824, 0.482353, 0.662745, 0.619608, 0.619608, 0.619608, 0.654902, 0.654902, 0.654902, 0.564706, 0.564706, 0.564706, 0.619608, 0.619608, 0.619608, 0.596078, 0.596078, 0.596078, 0.564706, 0.564706, 0.564706, 0.556863, 0.556863, 0.556863, 0.619608, 0.619608, 0.619608, 0.596078, 0.596078, 0.596078, 0.556863, 0.556863, 0.556863, 0.572549, 0.576471, 0.6, 0.596078, 0.596078, 0.596078, 0.52549, 0.52549, 0.52549, 0.556863, 0.556863, 0.556863, 0.6, 0.6, 0.6, 0.505882, 0.505882, 0.52549, 0.137255, 0.180392, 0.533333, 0.572549, 0.576471, 0.6, 0.423529, 0.427451, 0.478431, 0.52549, 0.52549, 0.52549, 0.443137, 0.45098, 0.533333, 0.458824, 0.458824, 0.478431, 0.262745, 0.294118, 0.54902, 0.137255, 0.180392, 0.533333, 0.141176, 0.192157, 0.596078, 0.603922, 0.603922, 0.6, 0.423529, 0.427451, 0.478431, 0.458824, 0.458824, 0.478431, 0.603922, 0.6, 0.556863, 0.513726, 0.521569, 0.596078, 0.141176, 0.192157, 0.596078, 0.14902, 0.2, 0.611765, 0.670588, 0.670588, 0.670588, 0.670588, 0.670588, 0.670588, 0.588235, 0.588235, 0.611765, 0.513726, 0.521569, 0.596078, 0.654902, 0.654902, 0.654902, 0.658824, 0.658824, 0.658824, 0.388235, 0.411765, 0.6, 0.654902, 0.654902, 0.654902, 0.592157, 0.592157, 0.6, 0.6, 0.6, 0.6, 0.388235, 0.411765, 0.6, 0.658824, 0.658824, 0.658824, 0.592157, 0.592157, 0.592157, 0.592157, 0.592157, 0.592157, 0.658824, 0.658824, 0.658824, 0.6, 0.6, 0.6, 0.14902, 0.2, 0.611765, 0.207843, 0.254902, 0.6, 0.592157, 0.592157, 0.592157, 0.588235, 0.588235, 0.611765, 0.670588, 0.670588, 0.670588, 0.592157, 0.592157, 0.592157, 0.521569, 0.505882, 0.337255, 0.552941, 0.533333, 0.321569, 0.317647, 0.313726, 0.270588, 0.317647, 0.313726, 0.270588, 0.552941, 0.533333, 0.321569, 0.521569, 0.509804, 0.384314, 0.556863, 0.533333, 0.282353, 0.521569, 0.505882, 0.337255, 0.345098, 0.345098, 0.345098, 0.34902, 0.34902, 0.345098, 0.521569, 0.509804, 0.384314, 0.556863, 0.545098, 0.403922, 0.556863, 0.533333, 0.282353, 0.427451, 0.427451, 0.427451, 0.596078, 0.596078, 0.596078, 0.556863, 0.545098, 0.403922, 0.611765, 0.572549, 0.211765, 0.596078, 0.596078, 0.596078, 0.698039, 0.698039, 0.698039, 0.666667, 0.627451, 0.27451, 0.647059, 0.607843, 0.223529, 0.647059, 0.607843, 0.223529, 0.666667, 0.627451, 0.231373, 0.698039, 0.690196, 0.627451, 0.611765, 0.572549, 0.211765, 0.596078, 0.596078, 0.596078, 0.654902, 0.65098, 0.607843, 0.654902, 0.647059, 0.560784, 0.596078, 0.596078, 0.596078, 0.611765, 0.572549, 0.211765, 0.501961, 0.470588, 0.168627, 0.662745, 0.623529, 0.231373, 0.666667, 0.627451, 0.27451, 0.501961, 0.470588, 0.168627, 0.513726, 0.482353, 0.172549, 0.666667, 0.627451, 0.231373, 0.666667, 0.627451, 0.27451, 0.662745, 0.623529, 0.231373, 0.654902, 0.615686, 0.227451, 0.666667, 0.627451, 0.231373, 0.647059, 0.607843, 0.223529, 0.654902, 0.615686, 0.227451, 0.611765, 0.572549, 0.211765, 0.647059, 0.607843, 0.223529, 0.654902, 0.615686, 0.227451, 0.611765, 0.572549, 0.211765, 0.517647, 0.486275, 0.172549, 0.654902, 0.615686, 0.227451, 0.541176, 0.541176, 0.541176, 0.596078, 0.596078, 0.596078, 0.360784, 0.360784, 0.360784, 0.360784, 0.360784, 0.360784, 0.596078, 0.596078, 0.596078, 0.541176, 0.541176, 0.541176, 0.858824, 0.858824, 0.858824, 0.596078, 0.596078, 0.596078, 0.541176, 0.541176, 0.541176, 0.858824, 0.858824, 0.858824, 0.760784, 0.760784, 0.760784, 0.541176, 0.541176, 0.541176, 0.894118, 0.894118, 0.894118, 0.858824, 0.858824, 0.858824, 0.760784, 0.760784, 0.760784, 0.894118, 0.894118, 0.894118, 0.823529, 0.823529, 0.823529, 0.760784, 0.760784, 0.760784, 0.862745, 0.811765, 0.309804, 0.894118, 0.85098, 0.419608, 0.823529, 0.772549, 0.305882, 0.862745, 0.811765, 0.309804, 0.854902, 0.803922, 0.305882, 0.819608, 0.772549, 0.305882, 0.513726, 0.513726, 0.513726, 0.360784, 0.360784, 0.360784, 0.266667, 0.266667, 0.266667, 0.513726, 0.513726, 0.513726, 0.501961, 0.501961, 0.501961, 0.266667, 0.266667, 0.266667, 0.360784, 0.337255, 0.117647, 0.454902, 0.427451, 0.14902, 0.470588, 0.443137, 0.152941, 0.360784, 0.337255, 0.113725, 0.266667, 0.247059, 0.070588, 0.470588, 0.443137, 0.152941, 0.862745, 0.811765, 0.309804, 0.698039, 0.654902, 0.243137, 0.819608, 0.772549, 0.298039, 0.819608, 0.772549, 0.294118, 0.698039, 0.654902, 0.243137, 0.862745, 0.811765, 0.309804, 0.894118, 0.85098, 0.419608, 0.823529, 0.772549, 0.298039, 0.792157, 0.756863, 0.415686, 0.792157, 0.74902, 0.305882, 0.823529, 0.772549, 0.294118, 0.894118, 0.847059, 0.352941, 0.792157, 0.756863, 0.415686, 0.607843, 0.572549, 0.25098, 0.596078, 0.580392, 0.411765, 0.792157, 0.74902, 0.305882, 0.858824, 0.831373, 0.556863, 0.596078, 0.572549, 0.313726, 0.596078, 0.580392, 0.407843, 0.607843, 0.572549, 0.25098, 0.454902, 0.427451, 0.14902, 0.454902, 0.427451, 0.14902, 0.607843, 0.572549, 0.227451, 0.596078, 0.572549, 0.313726, 0.607843, 0.572549, 0.25098, 0.792157, 0.756863, 0.415686, 0.819608, 0.772549, 0.298039, 0.607843, 0.572549, 0.227451, 0.698039, 0.654902, 0.243137, 0.819608, 0.772549, 0.294118, 0.698039, 0.654902, 0.243137, 0.470588, 0.443137, 0.152941, 0.454902, 0.427451, 0.14902, 0.454902, 0.427451, 0.14902, 0.470588, 0.443137, 0.152941, 0.698039, 0.654902, 0.243137, 0.823529, 0.772549, 0.305882, 0.760784, 0.74902, 0.623529, 0.603922, 0.603922, 0.6, 0.603922, 0.6, 0.556863, 0.760784, 0.729412, 0.392157, 0.823529, 0.772549, 0.305882, 0.760784, 0.74902, 0.623529, 0.541176, 0.521569, 0.337255, 0.67451, 0.670588, 0.639216, 0.67451, 0.658824, 0.509804, 0.541176, 0.509804, 0.211765, 0.760784, 0.729412, 0.392157, 0.513726, 0.482353, 0.176471, 0.705882, 0.705882, 0.698039, 0.67451, 0.670588, 0.639216, 0.513726, 0.482353, 0.172549, 0.541176, 0.509804, 0.211765, 0.67451, 0.658824, 0.509804, 0.666667, 0.627451, 0.27451, 0.698039, 0.698039, 0.698039, 0.705882, 0.705882, 0.698039, 0.666667, 0.627451, 0.231373, 0.513726, 0.482353, 0.172549, 0.705882, 0.705882, 0.682353, 0.752941, 0.752941, 0.752941, 0.705882, 0.705882, 0.698039, 0.698039, 0.698039, 0.698039, 0.752941, 0.752941, 0.752941, 0.72549, 0.72549, 0.72549, 0.698039, 0.694118, 0.627451, 0.745098, 0.745098, 0.745098, 0.67451, 0.670588, 0.643137, 0.705882, 0.705882, 0.698039, 0.745098, 0.745098, 0.745098, 0.752941, 0.752941, 0.752941, 0.705882, 0.705882, 0.682353, 0.533333, 0.533333, 0.533333, 0.603922, 0.603922, 0.6, 0.67451, 0.670588, 0.643137, 0.67451, 0.658824, 0.509804, 0.603922, 0.6, 0.556863, 0.533333, 0.533333, 0.52549, 0.517647, 0.486275, 0.172549, 0.215686, 0.2, 0.054902, 0.427451, 0.403922, 0.137255, 0.517647, 0.482353, 0.172549, 0.611765, 0.572549, 0.211765, 0.427451, 0.4, 0.137255, 0.556863, 0.533333, 0.282353, 0.611765, 0.572549, 0.211765, 0.427451, 0.403922, 0.137255, 0.427451, 0.403922, 0.137255, 0.611765, 0.572549, 0.211765, 0.556863, 0.545098, 0.403922, 0.521569, 0.505882, 0.337255, 0.556863, 0.533333, 0.282353, 0.682353, 0.643137, 0.243137, 0.682353, 0.647059, 0.298039, 0.556863, 0.545098, 0.403922, 0.521569, 0.509804, 0.384314, 0.552941, 0.529412, 0.321569, 0.521569, 0.505882, 0.337255, 0.807843, 0.764706, 0.333333, 0.807843, 0.768627, 0.368627, 0.521569, 0.509804, 0.384314, 0.552941, 0.529412, 0.321569, 0.807843, 0.764706, 0.333333, 0.792157, 0.745098, 0.282353, 0.803922, 0.756863, 0.286275, 0.807843, 0.768627, 0.368627, 0.831373, 0.788235, 0.364706, 0.803922, 0.756863, 0.286275, 0.807843, 0.768627, 0.333333, 0.682353, 0.643137, 0.243137, 0.698039, 0.654902, 0.243137, 0.698039, 0.654902, 0.243137, 0.682353, 0.647059, 0.298039, 0.807843, 0.768627, 0.368627, 0.682353, 0.682353, 0.682353, 0.427451, 0.427451, 0.427451, 0.380392, 0.380392, 0.380392, 0.380392, 0.352941, 0.117647, 0.427451, 0.4, 0.137255, 0.682353, 0.647059, 0.298039, 0.215686, 0.215686, 0.215686, 0.380392, 0.380392, 0.380392, 0.380392, 0.380392, 0.380392, 0.215686, 0.215686, 0.215686, 0.427451, 0.427451, 0.427451, 0.380392, 0.380392, 0.380392, 0.380392, 0.356863, 0.117647, 0.803922, 0.756863, 0.286275, 0.792157, 0.745098, 0.282353, 0.792157, 0.745098, 0.282353, 0.803922, 0.756863, 0.286275, 0.380392, 0.356863, 0.117647, 0.376471, 0.352941, 0.117647, 0.792157, 0.745098, 0.282353, 0.698039, 0.654902, 0.243137, 0.698039, 0.654902, 0.243137, 0.792157, 0.745098, 0.282353, 0.376471, 0.352941, 0.117647, 0.207843, 0.254902, 0.6, 0.14902, 0.2, 0.611765, 0.156863, 0.211765, 0.647059, 0.431373, 0.454902, 0.647059, 0.588235, 0.588235, 0.611765, 0.6, 0.6, 0.6, 0.388235, 0.411765, 0.6, 0.207843, 0.254902, 0.6, 0.152941, 0.207843, 0.639216, 0.396078, 0.427451, 0.639216, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.388235, 0.411765, 0.6, 0.152941, 0.207843, 0.631373, 0.156863, 0.211765, 0.639216, 0.6, 0.6, 0.6, 0.592157, 0.592157, 0.6, 0.25098, 0.294118, 0.639216, 0.141176, 0.192157, 0.596078, 0.14902, 0.2, 0.615686, 0.156863, 0.211765, 0.647059, 0.513726, 0.521569, 0.596078, 0.588235, 0.588235, 0.611765, 0.431373, 0.454902, 0.647059, 0.141176, 0.192157, 0.596078, 0.141176, 0.188235, 0.54902, 0.141176, 0.192157, 0.6, 0.145098, 0.196078, 0.6, 0.262745, 0.294118, 0.54902, 0.513726, 0.521569, 0.596078, 0.141176, 0.188235, 0.54902, 0.443137, 0.45098, 0.537255, 0.329412, 0.364706, 0.65098, 0.160784, 0.215686, 0.65098, 0.137255, 0.180392, 0.537255, 0.262745, 0.298039, 0.54902, 0.443137, 0.45098, 0.533333, 0.6, 0.6, 0.6, 0.635294, 0.635294, 0.635294, 0.403922, 0.431373, 0.635294, 0.572549, 0.576471, 0.6, 0.137255, 0.180392, 0.533333, 0.6, 0.6, 0.6, 0.596078, 0.596078, 0.596078, 0.647059, 0.647059, 0.647059, 0.623529, 0.623529, 0.647059, 0.596078, 0.596078, 0.596078, 0.572549, 0.576471, 0.6, 0.564706, 0.564706, 0.564706, 0.67451, 0.67451, 0.67451, 0.647059, 0.647059, 0.647059, 0.564706, 0.564706, 0.564706, 0.596078, 0.596078, 0.596078, 0.623529, 0.623529, 0.647059, 0.541176, 0.552941, 0.662745, 0.203922, 0.247059, 0.631373, 0.67451, 0.67451, 0.67451, 0.458824, 0.482353, 0.662745, 0.564706, 0.564706, 0.564706, 0.666667, 0.666667, 0.67451, 0.537255, 0.552941, 0.662745, 0.384314, 0.415686, 0.635294, 0.176471, 0.235294, 0.698039, 0.203922, 0.258824, 0.698039, 0.529412, 0.541176, 0.635294, 0.458824, 0.482353, 0.662745, 0.384314, 0.415686, 0.635294, 0.458824, 0.478431, 0.627451, 0.168627, 0.223529, 0.67451, 0.215686, 0.262745, 0.67451, 0.572549, 0.580392, 0.627451, 0.529412, 0.541176, 0.635294, 0.458824, 0.478431, 0.627451, 0.545098, 0.54902, 0.6, 0.156863, 0.211765, 0.639216, 0.25098, 0.294118, 0.639216, 0.592157, 0.592157, 0.6, 0.572549, 0.580392, 0.627451, 0.168627, 0.223529, 0.67451, 0.156863, 0.211765, 0.639216, 0.121569, 0.168627, 0.533333, 0.129412, 0.176471, 0.533333, 0.25098, 0.294118, 0.639216, 0.215686, 0.262745, 0.67451, 0.176471, 0.235294, 0.698039, 0.168627, 0.223529, 0.67451, 0.12549, 0.172549, 0.54902, 0.129412, 0.176471, 0.54902, 0.215686, 0.262745, 0.67451, 0.203922, 0.258824, 0.698039, 0.176471, 0.235294, 0.698039, 0.109804, 0.14902, 0.486275, 0.07451, 0.105882, 0.341176, 0.203922, 0.258824, 0.701961, 0.180392, 0.231373, 0.631373, 0.066667, 0.098039, 0.341176, 0.203922, 0.247059, 0.631373, 0.07451, 0.105882, 0.341176, 0.427451, 0.427451, 0.427451, 0.180392, 0.231373, 0.631373, 0.662745, 0.662745, 0.67451, 0.25098, 0.266667, 0.427451, 0.647059, 0.647059, 0.647059, 0.67451, 0.67451, 0.67451, 0.427451, 0.427451, 0.427451, 0.25098, 0.266667, 0.427451, 0.666667, 0.666667, 0.67451, 0.623529, 0.623529, 0.647059, 0.643137, 0.643137, 0.643137, 0.623529, 0.623529, 0.623529, 0.721569, 0.721569, 0.729412, 0.623529, 0.623529, 0.647059, 0.403922, 0.435294, 0.635294, 0.207843, 0.266667, 0.729412, 0.333333, 0.364706, 0.65098, 0.635294, 0.635294, 0.635294, 0.721569, 0.721569, 0.729412, 0.207843, 0.266667, 0.729412, 0.403922, 0.435294, 0.635294, 0.160784, 0.215686, 0.65098, 0.329412, 0.364706, 0.65098, 0.243137, 0.305882, 0.807843, 0.207843, 0.278431, 0.823529, 0.160784, 0.215686, 0.65098, 0.145098, 0.196078, 0.6, 0.207843, 0.278431, 0.823529, 0.141176, 0.192157, 0.596078, 0.207843, 0.278431, 0.823529, 0.207843, 0.27451, 0.811765, 0.145098, 0.196078, 0.6, 0.286275, 0.321569, 0.615686, 0.235294, 0.301961, 0.811765, 0.156863, 0.211765, 0.647059, 0.145098, 0.2, 0.615686, 0.207843, 0.27451, 0.811765, 0.235294, 0.301961, 0.811765, 0.286275, 0.321569, 0.615686, 0.431373, 0.454902, 0.647059, 0.156863, 0.211765, 0.639216, 0.152941, 0.207843, 0.631373, 0.141176, 0.192157, 0.596078, 0.219608, 0.262745, 0.596078, 0.301961, 0.337255, 0.631373, 0.25098, 0.294118, 0.639216, 0.152941, 0.207843, 0.631373, 0.152941, 0.207843, 0.639216, 0.164706, 0.219608, 0.670588, 0.262745, 0.305882, 0.670588, 0.396078, 0.427451, 0.639216, 0.301961, 0.337255, 0.631373, 0.152941, 0.207843, 0.639216, 0.156863, 0.211765, 0.647059, 0.188235, 0.25098, 0.74902, 0.32549, 0.372549, 0.74902, 0.431373, 0.454902, 0.647059, 0.396078, 0.427451, 0.639216, 0.988235, 0.988235, 0.988235, 0.882353, 0.882353, 0.882353, 0.964706, 0.964706, 0.964706, 0.964706, 0.964706, 0.964706, 0.882353, 0.882353, 0.882353, 0.988235, 0.988235, 0.988235, 0.882353, 0.882353, 0.882353, 0.945098, 0.945098, 0.945098, 0.862745, 0.862745, 0.862745, 0.862745, 0.862745, 0.862745, 0.945098, 0.945098, 0.945098, 0.882353, 0.882353, 0.882353, 0.992157, 0.992157, 0.992157, 0.909804, 0.909804, 0.909804, 0.862745, 0.862745, 0.862745, 0.992157, 0.992157, 0.992157, 0.945098, 0.945098, 0.945098, 0.862745, 0.862745, 0.862745, 0.937255, 0.937255, 0.937255, 0.976471, 0.976471, 0.976471, 0.909804, 0.909804, 0.909804, 0.937255, 0.937255, 0.937255, 0.992157, 0.992157, 0.992157, 0.909804, 0.909804, 0.909804, 0.94902, 0.94902, 0.94902, 0.972549, 0.972549, 0.972549, 0.976471, 0.976471, 0.976471, 0.94902, 0.94902, 0.94902, 0.937255, 0.937255, 0.937255, 0.976471, 0.976471, 0.976471, 0.94902, 0.94902, 0.94902, 0.819608, 0.819608, 0.819608, 0.878431, 0.878431, 0.878431, 0.878431, 0.878431, 0.878431, 0.819608, 0.819608, 0.819608, 0.94902, 0.94902, 0.94902, 0.52549, 0.52549, 0.52549, 0.564706, 0.564706, 0.564706, 0.878431, 0.878431, 0.878431, 0.52549, 0.52549, 0.52549, 0.819608, 0.819608, 0.819608, 0.878431, 0.878431, 0.878431, 0.52549, 0.52549, 0.52549, 0.321569, 0.321569, 0.321569, 0.305882, 0.305882, 0.305882, 0.305882, 0.305882, 0.305882, 0.321569, 0.321569, 0.321569, 0.52549, 0.52549, 0.52549, 0.321569, 0.321569, 0.321569, 0.180392, 0.180392, 0.180392, 0.227451, 0.227451, 0.227451, 0.227451, 0.227451, 0.227451, 0.180392, 0.180392, 0.180392, 0.321569, 0.321569, 0.321569, 0.309804, 0.309804, 0.309804, 0.443137, 0.443137, 0.443137, 0.584314, 0.584314, 0.584314, 0.309804, 0.309804, 0.309804, 0.560784, 0.560784, 0.560784, 0.584314, 0.584314, 0.584314, 0.560784, 0.560784, 0.560784, 0.584314, 0.584314, 0.584314, 0.607843, 0.607843, 0.607843, 0.560784, 0.560784, 0.560784, 0.564706, 0.564706, 0.564706, 0.607843, 0.607843, 0.607843, 0.564706, 0.564706, 0.564706, 0.607843, 0.607843, 0.607843, 0.337255, 0.337255, 0.337255, 0.564706, 0.564706, 0.564706, 0.270588, 0.270588, 0.270588, 0.337255, 0.337255, 0.337255, 0.101961, 0.101961, 0.101961, 0.094118, 0.094118, 0.094118, 0.270588, 0.270588, 0.270588, 0.270588, 0.270588, 0.270588, 0.094118, 0.094118, 0.094118, 0.101961, 0.101961, 0.101961, 0.352941, 0.352941, 0.352941, 0.101961, 0.101961, 0.101961, 0.337255, 0.337255, 0.337255, 0.337255, 0.337255, 0.337255, 0.101961, 0.101961, 0.101961, 0.352941, 0.352941, 0.352941, 0.619608, 0.619608, 0.619608, 0.356863, 0.356863, 0.356863, 0.498039, 0.498039, 0.498039, 0.498039, 0.498039, 0.498039, 0.356863, 0.356863, 0.356863, 0.619608, 0.619608, 0.619608, 0.694118, 0.694118, 0.694118, 0.619608, 0.619608, 0.619608, 0.670588, 0.670588, 0.670588, 0.670588, 0.670588, 0.670588, 0.619608, 0.619608, 0.619608, 0.694118, 0.694118, 0.694118, 0.670588, 0.670588, 0.670588, 0.607843, 0.607843, 0.607843, 0.584314, 0.584314, 0.584314, 0.584314, 0.584314, 0.584314, 0.607843, 0.607843, 0.607843, 0.670588, 0.670588, 0.670588, 0.498039, 0.498039, 0.498039, 0.337255, 0.337255, 0.337255, 0.607843, 0.607843, 0.607843, 0.498039, 0.498039, 0.498039, 0.670588, 0.670588, 0.670588, 0.607843, 0.607843, 0.607843, 0.662745, 0.662745, 0.662745, 0.584314, 0.584314, 0.584314, 0.443137, 0.443137, 0.443137, 0.662745, 0.662745, 0.662745, 0.666667, 0.666667, 0.666667, 0.443137, 0.443137, 0.443137, 0.72549, 0.72549, 0.72549, 0.694118, 0.694118, 0.694118, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.694118, 0.694118, 0.694118, 0.72549, 0.694118, 0.701961, 0.592157, 0.592157, 0.592157, 0.6, 0.6, 0.6, 0.745098, 0.745098, 0.745098, 0.592157, 0.592157, 0.592157, 0.752941, 0.752941, 0.752941, 0.745098, 0.745098, 0.745098, 0.662745, 0.662745, 0.662745, 0.592157, 0.592157, 0.592157, 0.752941, 0.752941, 0.752941, 0.666667, 0.666667, 0.666667, 0.72549, 0.72549, 0.72549, 0.752941, 0.752941, 0.752941, 0.745098, 0.745098, 0.745098, 0.6, 0.6, 0.6, 0.458824, 0.458824, 0.458824, 0.745098, 0.745098, 0.745098, 0.533333, 0.533333, 0.533333, 0.458824, 0.458824, 0.458824, 0.458824, 0.458824, 0.458824, 0.227451, 0.227451, 0.227451, 0.180392, 0.180392, 0.180392, 0.458824, 0.458824, 0.458824, 0.533333, 0.533333, 0.533333, 0.180392, 0.180392, 0.180392, 0.556863, 0.521569, 0.533333, 0.407843, 0.407843, 0.407843, 0.384314, 0.384314, 0.384314, 0.556863, 0.537255, 0.541176, 0.564706, 0.243137, 0.329412, 0.384314, 0.384314, 0.384314, 0.407843, 0.407843, 0.407843, 0.294118, 0.294118, 0.294118, 0.164706, 0.164706, 0.164706, 0.407843, 0.407843, 0.407843, 0.384314, 0.384314, 0.384314, 0.164706, 0.164706, 0.164706, 0.164706, 0.164706, 0.164706, 0.294118, 0.294118, 0.294118, 0.305882, 0.305882, 0.305882, 0.305882, 0.305882, 0.305882, 0.294118, 0.294118, 0.294118, 0.164706, 0.164706, 0.164706, 0.066667, 0.066667, 0.066667, 0.305882, 0.305882, 0.305882, 0.443137, 0.443137, 0.443137, 0.443137, 0.443137, 0.443137, 0.305882, 0.305882, 0.305882, 0.066667, 0.066667, 0.066667, 0.443137, 0.443137, 0.443137, 0.305882, 0.305882, 0.305882, 0.592157, 0.592157, 0.592157, 0.443137, 0.443137, 0.443137, 0.662745, 0.662745, 0.662745, 0.592157, 0.592157, 0.592157, 0.564706, 0.564706, 0.564706, 0.305882, 0.305882, 0.305882, 0.384314, 0.384314, 0.384314, 0.384314, 0.384314, 0.384314, 0.305882, 0.305882, 0.305882, 0.564706, 0.564706, 0.564706, 0.729412, 0.321569, 0.427451, 0.556863, 0.521569, 0.533333, 0.564706, 0.243137, 0.329412, 0.729412, 0.321569, 0.427451, 0.772549, 0.341176, 0.458824, 0.564706, 0.243137, 0.329412, 0.929412, 0.929412, 0.929412, 0.980392, 0.980392, 0.980392, 1.0, 1.0, 1.0, 0.929412, 0.929412, 0.929412, 0.960784, 0.960784, 0.960784, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.980392, 0.980392, 0.980392, 0.945098, 0.945098, 0.945098, 0.945098, 0.945098, 0.945098, 0.980392, 0.980392, 0.980392, 1.0, 1.0, 1.0, 0.952941, 0.952941, 0.952941, 0.945098, 0.945098, 0.945098, 0.729412, 0.321569, 0.427451, 0.729412, 0.321569, 0.427451, 0.945098, 0.945098, 0.945098, 0.952941, 0.952941, 0.952941, 0.972549, 0.972549, 0.972549, 0.878431, 0.878431, 0.878431, 0.886275, 0.886275, 0.886275, 0.886275, 0.886275, 0.886275, 0.878431, 0.878431, 0.878431, 0.972549, 0.972549, 0.972549, 0.937255, 0.937255, 0.937255, 0.886275, 0.886275, 0.886275, 0.858824, 0.858824, 0.858824, 0.858824, 0.858824, 0.858824, 0.886275, 0.886275, 0.886275, 0.937255, 0.937255, 0.937255, 0.909804, 0.909804, 0.909804, 0.858824, 0.858824, 0.858824, 0.85098, 0.85098, 0.85098, 0.85098, 0.85098, 0.85098, 0.858824, 0.858824, 0.858824, 0.909804, 0.909804, 0.909804, 0.921569, 0.921569, 0.921569, 0.85098, 0.85098, 0.85098, 0.776471, 0.776471, 0.776471, 0.776471, 0.776471, 0.776471, 0.85098, 0.85098, 0.85098, 0.92549, 0.92549, 0.92549, 0.658824, 0.580392, 0.603922, 0.858824, 0.858824, 0.858824, 0.776471, 0.776471, 0.776471, 0.658824, 0.294118, 0.392157, 0.658824, 0.65098, 0.65098, 0.776471, 0.772549, 0.772549, 0.729412, 0.321569, 0.427451, 0.945098, 0.945098, 0.945098, 0.858824, 0.858824, 0.858824, 0.858824, 0.858824, 0.858824, 0.945098, 0.945098, 0.945098, 0.729412, 0.321569, 0.427451, 0.945098, 0.945098, 0.945098, 0.980392, 0.980392, 0.980392, 0.92549, 0.92549, 0.92549, 0.92549, 0.92549, 0.92549, 0.980392, 0.980392, 0.980392, 0.945098, 0.945098, 0.945098, 0.980392, 0.980392, 0.980392, 0.929412, 0.929412, 0.929412, 0.909804, 0.909804, 0.909804, 0.909804, 0.909804, 0.909804, 0.929412, 0.929412, 0.929412, 0.980392, 0.980392, 0.980392, 0.929412, 0.929412, 0.929412, 0.952941, 0.952941, 0.952941, 0.937255, 0.937255, 0.937255, 0.937255, 0.937255, 0.937255, 0.952941, 0.952941, 0.952941, 0.929412, 0.929412, 0.929412, 0.972549, 0.972549, 0.972549, 0.937255, 0.937255, 0.937255, 0.952941, 0.952941, 0.952941, 0.972549, 0.972549, 0.972549, 0.976471, 0.976471, 0.976471, 0.952941, 0.952941, 0.952941, 0.952941, 0.952941, 0.952941, 0.929412, 0.929412, 0.929412, 0.960784, 0.960784, 0.960784, 0.952941, 0.952941, 0.952941, 0.894118, 0.894118, 0.894118, 0.960784, 0.960784, 0.960784, 0.862745, 0.862745, 0.862745, 0.909804, 0.909804, 0.909804, 0.976471, 0.976471, 0.976471, 0.862745, 0.862745, 0.862745, 0.964706, 0.964706, 0.964706, 0.976471, 0.976471, 0.976471, 0.964706, 0.964706, 0.964706, 0.976471, 0.976471, 0.976471, 0.952941, 0.952941, 0.952941, 0.952941, 0.952941, 0.952941, 0.976471, 0.976471, 0.976471, 0.964706, 0.964706, 0.964706, 0.968627, 0.968627, 0.968627, 0.964706, 0.964706, 0.964706, 0.894118, 0.894118, 0.894118, 0.894118, 0.894118, 0.894118, 0.964706, 0.964706, 0.964706, 0.968627, 0.968627, 0.968627, 0.564706, 0.564706, 0.564706, 0.6, 0.6, 0.6, 0.886275, 0.886275, 0.886275, 0.564706, 0.564706, 0.564706, 0.878431, 0.878431, 0.878431, 0.886275, 0.886275, 0.886275, 0.6, 0.6, 0.6, 0.65098, 0.65098, 0.65098, 0.858824, 0.858824, 0.858824, 0.858824, 0.858824, 0.858824, 0.65098, 0.65098, 0.65098, 0.6, 0.6, 0.6, 0.65098, 0.65098, 0.65098, 0.776471, 0.776471, 0.776471, 0.85098, 0.85098, 0.85098, 0.85098, 0.85098, 0.85098, 0.776471, 0.776471, 0.776471, 0.65098, 0.65098, 0.65098, 0.776471, 0.776471, 0.776471, 0.85098, 0.85098, 0.85098, 0.776471, 0.776471, 0.776471, 0.776471, 0.776471, 0.776471, 0.658824, 0.658824, 0.658824, 0.776471, 0.776471, 0.776471, 0.294118, 0.294118, 0.294118, 0.313726, 0.313726, 0.313726, 0.309804, 0.309804, 0.309804, 0.294118, 0.294118, 0.294118, 0.305882, 0.305882, 0.305882, 0.309804, 0.309804, 0.309804, 0.309804, 0.309804, 0.309804, 0.313726, 0.313726, 0.313726, 0.133333, 0.133333, 0.133333, 0.309804, 0.309804, 0.309804, 0.384314, 0.384314, 0.384314, 0.133333, 0.133333, 0.133333, 0.305882, 0.305882, 0.305882, 0.227451, 0.227451, 0.227451, 0.309804, 0.309804, 0.309804, 0.309804, 0.309804, 0.309804, 0.227451, 0.227451, 0.227451, 0.305882, 0.305882, 0.305882, 0.227451, 0.227451, 0.227451, 0.6, 0.6, 0.6, 0.592157, 0.592157, 0.592157, 0.592157, 0.584314, 0.541176, 0.6, 0.6, 0.588235, 0.227451, 0.227451, 0.227451, 0.592157, 0.592157, 0.592157, 0.305882, 0.305882, 0.305882, 0.309804, 0.309804, 0.309804, 0.309804, 0.309804, 0.309804, 0.305882, 0.305882, 0.305882, 0.592157, 0.592157, 0.592157, 0.227451, 0.227451, 0.227451, 0.458824, 0.458824, 0.458824, 0.6, 0.6, 0.6, 0.6, 0.6, 0.588235, 0.458824, 0.458824, 0.458824, 0.227451, 0.227451, 0.227451, 0.427451, 0.427451, 0.427451, 0.486275, 0.486275, 0.486275, 0.658824, 0.580392, 0.603922, 0.427451, 0.427451, 0.427451, 0.658824, 0.65098, 0.65098, 0.658824, 0.294118, 0.392157, 0.658824, 0.580392, 0.603922, 0.486275, 0.486275, 0.486275, 0.556863, 0.521569, 0.533333, 0.658824, 0.294118, 0.392157, 0.729412, 0.321569, 0.427451, 0.556863, 0.537255, 0.541176, 0.313726, 0.313726, 0.313726, 0.486275, 0.486275, 0.486275, 0.427451, 0.427451, 0.427451, 0.313726, 0.313726, 0.313726, 0.133333, 0.133333, 0.133333, 0.427451, 0.427451, 0.427451, 0.407843, 0.407843, 0.407843, 0.486275, 0.486275, 0.486275, 0.313726, 0.313726, 0.313726, 0.407843, 0.407843, 0.407843, 0.294118, 0.294118, 0.294118, 0.313726, 0.313726, 0.313726, 0.556863, 0.521569, 0.533333, 0.486275, 0.486275, 0.486275, 0.407843, 0.407843, 0.407843, 0.407843, 0.407843, 0.407843, 0.486275, 0.478431, 0.486275, 0.556863, 0.537255, 0.541176, 0.933333, 0.933333, 0.933333, 0.647059, 0.647059, 0.647059, 0.643137, 0.643137, 0.643137, 0.933333, 0.933333, 0.933333, 0.968627, 0.968627, 0.968627, 0.643137, 0.643137, 0.643137, 0.968627, 0.968627, 0.968627, 0.643137, 0.643137, 0.643137, 0.635294, 0.635294, 0.635294, 0.635294, 0.635294, 0.635294, 0.643137, 0.643137, 0.643137, 0.968627, 0.968627, 0.968627, 0.635294, 0.635294, 0.635294, 0.639216, 0.639216, 0.639216, 0.729412, 0.729412, 0.729412, 0.635294, 0.635294, 0.635294, 0.956863, 0.956863, 0.956863, 0.729412, 0.729412, 0.729412, 0.639216, 0.639216, 0.639216, 0.752941, 0.752941, 0.752941, 0.486275, 0.486275, 0.486275, 0.639216, 0.639216, 0.639216, 0.729412, 0.729412, 0.729412, 0.486275, 0.486275, 0.486275, 0.752941, 0.752941, 0.752941, 0.741176, 0.741176, 0.741176, 0.329412, 0.329412, 0.329412, 0.745098, 0.745098, 0.745098, 0.486275, 0.486275, 0.486275, 0.329412, 0.329412, 0.329412, 0.329412, 0.329412, 0.329412, 0.741176, 0.741176, 0.741176, 0.760784, 0.760784, 0.760784, 0.760784, 0.760784, 0.760784, 0.741176, 0.741176, 0.741176, 0.329412, 0.329412, 0.329412, 0.741176, 0.741176, 0.741176, 0.898039, 0.898039, 0.898039, 0.952941, 0.952941, 0.952941, 0.960784, 0.960784, 0.960784, 0.898039, 0.898039, 0.898039, 0.741176, 0.741176, 0.741176, 0.752941, 0.752941, 0.752941, 0.831373, 0.831373, 0.831373, 0.898039, 0.898039, 0.898039, 0.898039, 0.898039, 0.898039, 0.831373, 0.831373, 0.831373, 0.745098, 0.745098, 0.745098, 0.643137, 0.643137, 0.643137, 0.831373, 0.831373, 0.831373, 0.752941, 0.752941, 0.752941, 0.643137, 0.643137, 0.643137, 0.639216, 0.639216, 0.639216, 0.745098, 0.745098, 0.745098, 0.333333, 0.333333, 0.333333, 0.643137, 0.643137, 0.643137, 0.639216, 0.639216, 0.639216, 0.333333, 0.333333, 0.333333, 0.635294, 0.635294, 0.635294, 0.639216, 0.639216, 0.639216, 0.403922, 0.403922, 0.403922, 0.333333, 0.333333, 0.333333, 0.635294, 0.635294, 0.635294, 0.403922, 0.403922, 0.403922, 0.643137, 0.643137, 0.643137, 0.635294, 0.635294, 0.635294, 0.643137, 0.643137, 0.643137, 0.647059, 0.647059, 0.647059, 0.458824, 0.458824, 0.458824, 0.458824, 0.458824, 0.458824, 0.647059, 0.647059, 0.647059, 0.643137, 0.643137, 0.643137, 0.133333, 0.133333, 0.133333, 0.690196, 0.690196, 0.690196, 0.490196, 0.490196, 0.490196, 0.133333, 0.133333, 0.133333, 0.384314, 0.384314, 0.384314, 0.490196, 0.490196, 0.490196, 0.411765, 0.411765, 0.411765, 0.760784, 0.760784, 0.760784, 0.690196, 0.690196, 0.690196, 0.411765, 0.411765, 0.411765, 0.133333, 0.133333, 0.133333, 0.690196, 0.690196, 0.690196, 0.6, 0.6, 0.6, 0.384314, 0.384314, 0.384314, 0.490196, 0.490196, 0.490196, 0.490196, 0.490196, 0.490196, 0.384314, 0.384314, 0.384314, 0.6, 0.6, 0.6, 0.776471, 0.776471, 0.776471, 0.580392, 0.580392, 0.580392, 0.647059, 0.647059, 0.647059, 0.647059, 0.647059, 0.647059, 0.580392, 0.580392, 0.580392, 0.776471, 0.776471, 0.776471, 0.760784, 0.760784, 0.760784, 0.952941, 0.952941, 0.952941, 0.811765, 0.811765, 0.811765, 0.811765, 0.811765, 0.811765, 0.960784, 0.960784, 0.960784, 0.760784, 0.760784, 0.760784, 0.607843, 0.607843, 0.607843, 0.690196, 0.690196, 0.690196, 0.811765, 0.811765, 0.811765, 0.607843, 0.607843, 0.607843, 0.647059, 0.647059, 0.647059, 0.811765, 0.811765, 0.811765, 0.67451, 0.67451, 0.67451, 0.607843, 0.607843, 0.607843, 0.647059, 0.647059, 0.647059, 0.647059, 0.647059, 0.647059, 0.607843, 0.607843, 0.607843, 0.67451, 0.67451, 0.67451, 0.517647, 0.517647, 0.517647, 0.607843, 0.607843, 0.607843, 0.67451, 0.67451, 0.67451, 0.517647, 0.517647, 0.517647, 0.447059, 0.447059, 0.447059, 0.67451, 0.67451, 0.67451, 0.517647, 0.517647, 0.517647, 0.447059, 0.447059, 0.447059, 0.466667, 0.466667, 0.466667, 0.517647, 0.517647, 0.517647, 0.580392, 0.580392, 0.580392, 0.466667, 0.466667, 0.466667, 0.580392, 0.580392, 0.580392, 0.466667, 0.466667, 0.466667, 0.458824, 0.458824, 0.458824, 0.580392, 0.580392, 0.580392, 0.647059, 0.647059, 0.647059, 0.458824, 0.458824, 0.458824, 0.517647, 0.517647, 0.517647, 0.580392, 0.580392, 0.580392, 0.776471, 0.776471, 0.776471, 0.517647, 0.517647, 0.517647, 0.65098, 0.65098, 0.65098, 0.776471, 0.776471, 0.776471, 0.490196, 0.490196, 0.490196, 0.607843, 0.607843, 0.607843, 0.517647, 0.517647, 0.517647, 0.490196, 0.490196, 0.490196, 0.65098, 0.65098, 0.65098, 0.517647, 0.517647, 0.517647, 0.490196, 0.490196, 0.490196, 0.690196, 0.690196, 0.690196, 0.607843, 0.607843, 0.607843, 0.607843, 0.607843, 0.607843, 0.690196, 0.690196, 0.690196, 0.490196, 0.490196, 0.490196, 0.458824, 0.458824, 0.458824, 0.466667, 0.466667, 0.466667, 0.513726, 0.513726, 0.513726, 0.513726, 0.513726, 0.513726, 0.466667, 0.466667, 0.466667, 0.458824, 0.458824, 0.458824, 0.447059, 0.447059, 0.447059, 0.517647, 0.517647, 0.517647, 0.513726, 0.513726, 0.513726, 0.447059, 0.447059, 0.447059, 0.466667, 0.466667, 0.466667, 0.513726, 0.513726, 0.513726, 0.447059, 0.447059, 0.447059, 0.67451, 0.67451, 0.67451, 0.741176, 0.741176, 0.741176, 0.737255, 0.737255, 0.737255, 0.67451, 0.67451, 0.67451, 0.447059, 0.447059, 0.447059, 0.85098, 0.85098, 0.85098, 0.768627, 0.768627, 0.768627, 0.741176, 0.741176, 0.741176, 0.85098, 0.85098, 0.85098, 0.67451, 0.67451, 0.67451, 0.737255, 0.737255, 0.737255, 0.647059, 0.647059, 0.647059, 0.764706, 0.764706, 0.764706, 0.768627, 0.768627, 0.768627, 0.647059, 0.647059, 0.647059, 0.85098, 0.85098, 0.85098, 0.768627, 0.768627, 0.768627, 0.647059, 0.647059, 0.647059, 0.811765, 0.811765, 0.811765, 0.760784, 0.760784, 0.760784, 0.760784, 0.760784, 0.760784, 0.811765, 0.811765, 0.811765, 0.647059, 0.647059, 0.647059, 0.811765, 0.811765, 0.811765, 0.952941, 0.952941, 0.952941, 0.898039, 0.898039, 0.898039, 0.898039, 0.898039, 0.898039, 0.960784, 0.960784, 0.960784, 0.811765, 0.811765, 0.811765, 0.403922, 0.403922, 0.403922, 0.458824, 0.458824, 0.458824, 0.52549, 0.52549, 0.52549, 0.521569, 0.521569, 0.521569, 0.458824, 0.458824, 0.458824, 0.403922, 0.403922, 0.403922, 0.333333, 0.333333, 0.333333, 0.403922, 0.403922, 0.403922, 0.552941, 0.552941, 0.552941, 0.552941, 0.552941, 0.552941, 0.403922, 0.403922, 0.403922, 0.333333, 0.333333, 0.333333, 0.643137, 0.643137, 0.643137, 0.333333, 0.333333, 0.333333, 0.447059, 0.447059, 0.447059, 0.447059, 0.447059, 0.447059, 0.333333, 0.333333, 0.333333, 0.643137, 0.643137, 0.643137, 0.643137, 0.643137, 0.643137, 0.647059, 0.647059, 0.647059, 0.784314, 0.784314, 0.784314, 0.643137, 0.643137, 0.643137, 0.831373, 0.831373, 0.831373, 0.784314, 0.784314, 0.784314, 0.831373, 0.831373, 0.831373, 0.784314, 0.784314, 0.784314, 0.85098, 0.85098, 0.85098, 0.831373, 0.831373, 0.831373, 0.898039, 0.898039, 0.898039, 0.85098, 0.85098, 0.85098, 0.898039, 0.898039, 0.898039, 0.85098, 0.85098, 0.85098, 0.898039, 0.898039, 0.898039, 0.898039, 0.898039, 0.898039, 0.960784, 0.960784, 0.960784, 0.898039, 0.898039, 0.898039, 0.764706, 0.764706, 0.764706, 0.698039, 0.698039, 0.698039, 0.670588, 0.670588, 0.670588, 0.764706, 0.764706, 0.764706, 0.768627, 0.768627, 0.768627, 0.67451, 0.67451, 0.67451, 0.698039, 0.698039, 0.698039, 0.654902, 0.654902, 0.654902, 0.670588, 0.670588, 0.670588, 0.698039, 0.698039, 0.698039, 0.67451, 0.67451, 0.67451, 0.670588, 0.670588, 0.670588, 0.670588, 0.670588, 0.670588, 0.654902, 0.654902, 0.654902, 0.643137, 0.643137, 0.643137, 0.643137, 0.643137, 0.643137, 0.654902, 0.654902, 0.654902, 0.670588, 0.670588, 0.670588, 0.643137, 0.643137, 0.643137, 0.662745, 0.662745, 0.662745, 0.768627, 0.768627, 0.768627, 0.643137, 0.643137, 0.643137, 0.701961, 0.701961, 0.701961, 0.768627, 0.768627, 0.768627, 0.552941, 0.552941, 0.552941, 0.521569, 0.521569, 0.521569, 0.701961, 0.701961, 0.701961, 0.701961, 0.701961, 0.701961, 0.521569, 0.521569, 0.521569, 0.552941, 0.552941, 0.552941, 0.670588, 0.670588, 0.670588, 0.701961, 0.701961, 0.701961, 0.521569, 0.521569, 0.521569, 0.670588, 0.670588, 0.670588, 0.513726, 0.513726, 0.513726, 0.521569, 0.521569, 0.521569, 0.517647, 0.517647, 0.517647, 0.670588, 0.670588, 0.670588, 0.670588, 0.670588, 0.670588, 0.517647, 0.517647, 0.517647, 0.513726, 0.513726, 0.513726, 0.670588, 0.670588, 0.670588, 0.768627, 0.768627, 0.768627, 0.670588, 0.670588, 0.670588, 0.517647, 0.517647, 0.517647, 0.517647, 0.517647, 0.517647, 0.67451, 0.67451, 0.67451, 0.768627, 0.768627, 0.768627, 0.898039, 0.898039, 0.898039, 0.698039, 0.698039, 0.698039, 0.764706, 0.764706, 0.764706, 0.898039, 0.898039, 0.898039, 0.760784, 0.760784, 0.760784, 0.764706, 0.764706, 0.764706, 0.85098, 0.85098, 0.85098, 0.654902, 0.654902, 0.654902, 0.698039, 0.698039, 0.698039, 0.698039, 0.698039, 0.698039, 0.654902, 0.654902, 0.654902, 0.85098, 0.85098, 0.85098, 0.643137, 0.643137, 0.643137, 0.654902, 0.654902, 0.654902, 0.85098, 0.85098, 0.85098, 0.643137, 0.643137, 0.643137, 0.784314, 0.784314, 0.784314, 0.85098, 0.85098, 0.85098, 0.662745, 0.662745, 0.662745, 0.643137, 0.643137, 0.643137, 0.784314, 0.784314, 0.784314, 0.662745, 0.662745, 0.662745, 0.647059, 0.647059, 0.647059, 0.784314, 0.784314, 0.784314, 0.447059, 0.447059, 0.447059, 0.768627, 0.768627, 0.768627, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.768627, 0.768627, 0.768627, 0.447059, 0.447059, 0.447059, 0.552941, 0.552941, 0.552941, 0.768627, 0.768627, 0.768627, 0.447059, 0.447059, 0.447059, 0.447059, 0.447059, 0.447059, 0.768627, 0.768627, 0.768627, 0.552941, 0.552941, 0.552941, 0.329412, 0.329412, 0.329412, 0.411765, 0.411765, 0.411765, 0.27451, 0.27451, 0.27451, 0.27451, 0.27451, 0.27451, 0.411765, 0.411765, 0.411765, 0.329412, 0.329412, 0.329412, 0.486275, 0.486275, 0.486275, 0.329412, 0.329412, 0.329412, 0.380392, 0.380392, 0.380392, 0.380392, 0.380392, 0.380392, 0.329412, 0.329412, 0.329412, 0.486275, 0.486275, 0.486275, 0.486275, 0.486275, 0.486275, 0.490196, 0.490196, 0.490196, 0.690196, 0.690196, 0.690196, 0.486275, 0.486275, 0.486275, 0.729412, 0.729412, 0.729412, 0.690196, 0.690196, 0.690196, 0.729412, 0.729412, 0.729412, 0.690196, 0.690196, 0.690196, 0.878431, 0.878431, 0.878431, 0.729412, 0.729412, 0.729412, 0.956863, 0.956863, 0.956863, 0.878431, 0.878431, 0.878431, 0.956863, 0.956863, 0.956863, 0.878431, 0.878431, 0.878431, 0.870588, 0.870588, 0.870588, 0.956863, 0.956863, 0.956863, 0.968627, 0.968627, 0.968627, 0.870588, 0.870588, 0.870588, 0.968627, 0.968627, 0.968627, 0.870588, 0.870588, 0.870588, 0.878431, 0.878431, 0.878431, 0.968627, 0.968627, 0.968627, 0.933333, 0.933333, 0.933333, 0.878431, 0.878431, 0.878431, 0.380392, 0.380392, 0.380392, 0.27451, 0.27451, 0.27451, 0.878431, 0.878431, 0.878431, 0.380392, 0.380392, 0.380392, 0.870588, 0.870588, 0.870588, 0.878431, 0.878431, 0.878431, 0.870588, 0.870588, 0.870588, 0.878431, 0.878431, 0.878431, 0.490196, 0.490196, 0.490196, 0.490196, 0.490196, 0.490196, 0.878431, 0.878431, 0.878431, 0.870588, 0.870588, 0.870588, 0.878431, 0.878431, 0.878431, 0.690196, 0.690196, 0.690196, 0.490196, 0.490196, 0.490196, 0.490196, 0.490196, 0.490196, 0.690196, 0.690196, 0.690196, 0.878431, 0.878431, 0.878431, 0.776471, 0.776471, 0.776471, 0.933333, 0.933333, 0.933333, 0.878431, 0.878431, 0.878431, 0.776471, 0.721569, 0.737255, 0.658824, 0.65098, 0.65098, 0.878431, 0.878431, 0.878431, 0.658824, 0.658824, 0.658824, 0.878431, 0.878431, 0.878431, 0.27451, 0.27451, 0.27451, 0.27451, 0.27451, 0.27451, 0.878431, 0.878431, 0.878431, 0.658824, 0.65098, 0.65098, 0.133333, 0.133333, 0.133333, 0.427451, 0.427451, 0.427451, 0.27451, 0.27451, 0.27451, 0.27451, 0.27451, 0.27451, 0.427451, 0.427451, 0.427451, 0.133333, 0.133333, 0.133333, 0.662745, 0.662745, 0.662745, 0.184314, 0.235294, 0.662745, 0.380392, 0.392157, 0.478431, 0.317647, 0.356863, 0.662745, 0.109804, 0.14902, 0.478431, 0.160784, 0.215686, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.462745, 0.462745, 0.462745, 0.662745, 0.662745, 0.662745, 0.462745, 0.462745, 0.462745, 0.662745, 0.662745, 0.662745, 0.462745, 0.462745, 0.462745, 0.478431, 0.478431, 0.478431, 0.254902, 0.254902, 0.254902, 0.462745, 0.462745, 0.462745, 0.254902, 0.254902, 0.254902, 0.478431, 0.478431, 0.478431, 0.380392, 0.396078, 0.478431, 0.082353, 0.121569, 0.407843, 0.066667, 0.098039, 0.34902, 0.109804, 0.14902, 0.478431, 0.121569, 0.14902, 0.34902, 0.082353, 0.121569, 0.407843, 0.066667, 0.098039, 0.34902, 0.011765, 0.015686, 0.121569, 0.101961, 0.141176, 0.466667, 0.121569, 0.14902, 0.34902, 0.4, 0.407843, 0.466667, 0.011765, 0.015686, 0.121569, 0.047059, 0.070588, 0.254902, 0.066667, 0.098039, 0.34902, 0.090196, 0.129412, 0.419608, 0.188235, 0.196078, 0.254902, 0.419608, 0.419608, 0.419608, 0.121569, 0.14902, 0.34902, 0.466667, 0.466667, 0.466667, 0.662745, 0.662745, 0.662745, 0.419608, 0.419608, 0.419608, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.419608, 0.419608, 0.419608, 0.078431, 0.113725, 0.384314, 0.160784, 0.215686, 0.662745, 0.101961, 0.141176, 0.466667, 0.662745, 0.662745, 0.662745, 0.160784, 0.215686, 0.662745, 0.4, 0.407843, 0.466667, 0.188235, 0.243137, 0.662745, 0.160784, 0.215686, 0.662745, 0.262745, 0.321569, 0.815686, 0.662745, 0.662745, 0.662745, 0.639216, 0.658824, 0.815686, 0.160784, 0.215686, 0.662745, 0.662745, 0.662745, 0.662745, 0.815686, 0.815686, 0.815686, 0.662745, 0.662745, 0.662745, 0.882353, 0.882353, 0.882353, 0.815686, 0.815686, 0.815686, 0.662745, 0.662745, 0.662745, 0.815686, 0.815686, 0.815686, 0.854902, 0.854902, 0.854902, 0.882353, 0.882353, 0.882353, 0.929412, 0.929412, 0.929412, 0.854902, 0.854902, 0.854902, 0.882353, 0.882353, 0.882353, 0.215686, 0.286275, 0.843137, 0.231373, 0.305882, 0.901961, 0.262745, 0.321569, 0.815686, 0.521569, 0.564706, 0.854902, 0.231373, 0.305882, 0.901961, 0.639216, 0.658824, 0.815686, 0.231373, 0.305882, 0.901961, 0.219608, 0.290196, 0.831373, 0.356863, 0.415686, 0.854902, 0.607843, 0.635294, 0.831373, 0.211765, 0.282353, 0.831373, 0.521569, 0.564706, 0.854902, 0.854902, 0.854902, 0.854902, 0.831373, 0.831373, 0.831373, 0.929412, 0.929412, 0.929412, 0.858824, 0.858824, 0.858824, 0.831373, 0.831373, 0.831373, 0.929412, 0.929412, 0.929412, 0.827451, 0.827451, 0.831373, 0.662745, 0.662745, 0.662745, 0.858824, 0.858824, 0.858824, 0.501961, 0.521569, 0.662745, 0.317647, 0.356863, 0.662745, 0.854902, 0.854902, 0.858824, 0.219608, 0.286275, 0.831373, 0.184314, 0.235294, 0.662745, 0.827451, 0.827451, 0.831373, 0.317647, 0.356863, 0.662745, 0.160784, 0.215686, 0.662745, 0.607843, 0.635294, 0.831373, 0.662745, 0.662745, 0.662745, 0.831373, 0.831373, 0.831373, 0.662745, 0.662745, 0.662745, 0.831373, 0.831373, 0.831373, 0.831373, 0.831373, 0.831373, 0.662745, 0.662745, 0.662745, 0.831373, 0.831373, 0.831373, 0.901961, 0.901961, 0.901961, 0.831373, 0.831373, 0.831373, 0.894118, 0.894118, 0.894118, 0.901961, 0.901961, 0.901961, 0.831373, 0.831373, 0.831373, 0.901961, 0.901961, 0.901961, 0.843137, 0.843137, 0.843137, 0.894118, 0.894118, 0.894118, 0.831373, 0.831373, 0.831373, 0.843137, 0.843137, 0.843137, 0.894118, 0.894118, 0.894118, 0.843137, 0.843137, 0.843137, 0.662745, 0.662745, 0.662745, 0.831373, 0.831373, 0.831373, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.831373, 0.831373, 0.831373, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.662745, 0.407843, 0.407843, 0.407843, 0.662745, 0.662745, 0.662745, 0.407843, 0.407843, 0.407843, 0.662745, 0.662745, 0.662745, 0.407843, 0.407843, 0.407843, 0.384314, 0.384314, 0.384314, 0.176471, 0.176471, 0.176471, 0.407843, 0.407843, 0.407843, 0.176471, 0.176471, 0.176471, 0.384314, 0.384314, 0.384314, 0.176471, 0.176471, 0.176471, 0.121569, 0.121569, 0.121569, 0.407843, 0.407843, 0.407843, 0.176471, 0.176471, 0.176471, 0.407843, 0.407843, 0.407843, 0.121569, 0.121569, 0.121569, 0.407843, 0.407843, 0.407843, 0.407843, 0.407843, 0.407843, 0.662745, 0.662745, 0.662745, 0.407843, 0.407843, 0.407843, 0.662745, 0.662745, 0.662745, 0.407843, 0.407843, 0.407843, 0.101961, 0.101961, 0.101961, 0.345098, 0.345098, 0.345098, 0.094118, 0.094118, 0.094118, 0.317647, 0.317647, 0.317647, 0.345098, 0.345098, 0.345098, 0.094118, 0.094118, 0.094118, 0.352941, 0.352941, 0.352941, 0.427451, 0.427451, 0.427451, 0.101961, 0.101961, 0.101961, 0.345098, 0.345098, 0.345098, 0.427451, 0.427451, 0.427451, 0.101961, 0.101961, 0.101961, 0.352941, 0.352941, 0.352941, 0.619608, 0.619608, 0.619608, 0.427451, 0.427451, 0.427451, 0.352941, 0.352941, 0.352941, 0.427451, 0.427451, 0.427451, 0.619608, 0.619608, 0.619608, 0.619608, 0.619608, 0.619608, 0.694118, 0.694118, 0.694118, 0.596078, 0.596078, 0.596078, 0.619608, 0.619608, 0.619608, 0.596078, 0.596078, 0.596078, 0.694118, 0.694118, 0.694118, 0.694118, 0.694118, 0.694118, 0.72549, 0.72549, 0.72549, 0.654902, 0.65098, 0.607843, 0.694118, 0.694118, 0.694118, 0.654902, 0.647059, 0.564706, 0.72549, 0.72549, 0.72549, 0.603922, 0.603922, 0.6, 0.533333, 0.533333, 0.533333, 0.423529, 0.427451, 0.47451, 0.603922, 0.6, 0.556863, 0.458824, 0.458824, 0.47451, 0.533333, 0.533333, 0.52549, 0.180392, 0.180392, 0.180392, 0.321569, 0.321569, 0.321569, 0.423529, 0.427451, 0.47451, 0.505882, 0.505882, 0.52549, 0.321569, 0.321569, 0.321569, 0.458824, 0.458824, 0.47451, 0.52549, 0.52549, 0.52549, 0.321569, 0.321569, 0.321569, 0.556863, 0.556863, 0.556863, 0.505882, 0.505882, 0.52549, 0.556863, 0.556863, 0.556863, 0.321569, 0.321569, 0.321569, 0.52549, 0.52549, 0.52549, 0.819608, 0.819608, 0.819608, 0.556863, 0.556863, 0.556863, 0.619608, 0.619608, 0.619608, 0.819608, 0.819608, 0.819608, 0.556863, 0.556863, 0.556863, 0.819608, 0.819608, 0.819608, 0.94902, 0.94902, 0.94902, 0.619608, 0.619608, 0.619608, 0.654902, 0.654902, 0.654902, 0.94902, 0.94902, 0.94902, 0.619608, 0.619608, 0.619608, 0.94902, 0.94902, 0.94902, 0.937255, 0.937255, 0.937255, 0.654902, 0.654902, 0.654902, 0.654902, 0.654902, 0.654902, 0.937255, 0.937255, 0.937255, 0.654902, 0.654902, 0.654902, 0.654902, 0.654902, 0.654902, 0.937255, 0.937255, 0.937255, 0.745098, 0.745098, 0.745098, 0.654902, 0.654902, 0.654902, 0.745098, 0.745098, 0.745098, 0.937255, 0.937255, 0.937255, 0.992157, 0.992157, 0.992157, 0.945098, 0.945098, 0.945098, 0.745098, 0.745098, 0.745098, 0.72549, 0.72549, 0.72549, 0.945098, 0.945098, 0.945098, 0.745098, 0.745098, 0.745098, 0.945098, 0.945098, 0.945098, 0.882353, 0.882353, 0.882353, 0.72549, 0.72549, 0.72549, 0.654902, 0.654902, 0.654902, 0.882353, 0.882353, 0.882353, 0.72549, 0.72549, 0.72549, 0.882353, 0.882353, 0.882353, 0.988235, 0.988235, 0.988235, 0.654902, 0.654902, 0.654902, 0.658824, 0.658824, 0.658824, 0.988235, 0.988235, 0.988235, 0.654902, 0.654902, 0.654902, 0.545098, 0.54902, 0.6, 0.458824, 0.478431, 0.627451, 0.654902, 0.654902, 0.654902, 0.72549, 0.72549, 0.72549, 0.572549, 0.580392, 0.627451, 0.654902, 0.654902, 0.654902, 0.72549, 0.72549, 0.72549, 0.458824, 0.478431, 0.627451, 0.745098, 0.745098, 0.745098, 0.72549, 0.72549, 0.72549, 0.745098, 0.745098, 0.745098, 0.572549, 0.580392, 0.627451, 0.541176, 0.552941, 0.662745, 0.654902, 0.654902, 0.654902, 0.388235, 0.415686, 0.635294, 0.745098, 0.745098, 0.745098, 0.654902, 0.654902, 0.654902, 0.529412, 0.541176, 0.635294, 0.564706, 0.564706, 0.564706, 0.654902, 0.654902, 0.654902, 0.541176, 0.552941, 0.662745, 0.654902, 0.654902, 0.654902, 0.654902, 0.654902, 0.654902, 0.458824, 0.482353, 0.662745, 0.596078, 0.596078, 0.596078, 0.619608, 0.619608, 0.619608, 0.564706, 0.564706, 0.564706, 0.654902, 0.654902, 0.654902, 0.619608, 0.619608, 0.619608, 0.564706, 0.564706, 0.564706, 0.6, 0.6, 0.6, 0.556863, 0.556863, 0.556863, 0.596078, 0.596078, 0.596078, 0.619608, 0.619608, 0.619608, 0.556863, 0.556863, 0.556863, 0.596078, 0.596078, 0.596078, 0.443137, 0.45098, 0.533333, 0.52549, 0.52549, 0.52549, 0.6, 0.6, 0.6, 0.556863, 0.556863, 0.556863, 0.505882, 0.505882, 0.52549, 0.572549, 0.576471, 0.6, 0.141176, 0.188235, 0.54902, 0.423529, 0.427451, 0.478431, 0.443137, 0.45098, 0.533333, 0.505882, 0.505882, 0.52549, 0.458824, 0.458824, 0.478431, 0.137255, 0.180392, 0.533333, 0.141176, 0.188235, 0.54902, 0.141176, 0.192157, 0.596078, 0.423529, 0.427451, 0.478431, 0.262745, 0.298039, 0.54902, 0.458824, 0.458824, 0.478431, 0.513726, 0.521569, 0.596078, 0.603922, 0.603922, 0.6, 0.141176, 0.192157, 0.596078, 0.670588, 0.670588, 0.670588, 0.603922, 0.6, 0.556863, 0.670588, 0.670588, 0.670588, 0.513726, 0.521569, 0.596078, 0.545098, 0.54902, 0.6, 0.654902, 0.654902, 0.654902, 0.388235, 0.411765, 0.6, 0.658824, 0.658824, 0.658824, 0.654902, 0.654902, 0.654902, 0.6, 0.6, 0.6, 0.207843, 0.254902, 0.6, 0.388235, 0.411765, 0.6, 0.592157, 0.592157, 0.592157, 0.6, 0.6, 0.6, 0.592157, 0.592157, 0.592157, 0.6, 0.6, 0.6, 0.670588, 0.670588, 0.670588, 0.14902, 0.2, 0.611765, 0.592157, 0.592157, 0.592157, 0.6, 0.6, 0.6, 0.588235, 0.588235, 0.611765, 0.592157, 0.592157, 0.592157, 0.345098, 0.345098, 0.345098, 0.521569, 0.505882, 0.337255, 0.317647, 0.313726, 0.270588, 0.345098, 0.345098, 0.345098, 0.317647, 0.313726, 0.270588, 0.521569, 0.509804, 0.384314, 0.427451, 0.427451, 0.427451, 0.556863, 0.533333, 0.282353, 0.345098, 0.345098, 0.345098, 0.427451, 0.427451, 0.427451, 0.34902, 0.34902, 0.345098, 0.556863, 0.545098, 0.403922, 0.611765, 0.572549, 0.211765, 0.556863, 0.533333, 0.282353, 0.596078, 0.596078, 0.596078, 0.427451, 0.427451, 0.427451, 0.556863, 0.545098, 0.403922, 0.596078, 0.596078, 0.596078, 0.654902, 0.65098, 0.607843, 0.698039, 0.698039, 0.698039, 0.647059, 0.607843, 0.223529, 0.654902, 0.647059, 0.560784, 0.647059, 0.607843, 0.223529, 0.698039, 0.690196, 0.627451, 0.647059, 0.607843, 0.223529, 0.611765, 0.572549, 0.211765, 0.654902, 0.65098, 0.607843, 0.647059, 0.607843, 0.223529, 0.654902, 0.647059, 0.560784, 0.611765, 0.572549, 0.211765, 0.513726, 0.482353, 0.176471, 0.501961, 0.470588, 0.168627, 0.666667, 0.627451, 0.27451, 0.662745, 0.623529, 0.231373, 0.501961, 0.470588, 0.168627, 0.666667, 0.627451, 0.231373, 0.647059, 0.607843, 0.223529, 0.666667, 0.627451, 0.27451, 0.654902, 0.615686, 0.227451, 0.662745, 0.623529, 0.231373, 0.666667, 0.627451, 0.231373, 0.654902, 0.615686, 0.227451, 0.517647, 0.486275, 0.172549, 0.611765, 0.572549, 0.211765, 0.654902, 0.615686, 0.227451, 0.647059, 0.607843, 0.223529, 0.611765, 0.572549, 0.211765, 0.654902, 0.615686, 0.227451, 0.513726, 0.513726, 0.513726, 0.541176, 0.541176, 0.541176, 0.360784, 0.360784, 0.360784, 0.513726, 0.513726, 0.513726, 0.360784, 0.360784, 0.360784, 0.541176, 0.541176, 0.541176, 0.760784, 0.760784, 0.760784, 0.858824, 0.858824, 0.858824, 0.541176, 0.541176, 0.541176, 0.596078, 0.596078, 0.596078, 0.858824, 0.858824, 0.858824, 0.541176, 0.541176, 0.541176, 0.823529, 0.823529, 0.823529, 0.894118, 0.894118, 0.894118, 0.760784, 0.760784, 0.760784, 0.858824, 0.858824, 0.858824, 0.894118, 0.894118, 0.894118, 0.760784, 0.760784, 0.760784, 0.854902, 0.803922, 0.305882, 0.862745, 0.811765, 0.309804, 0.823529, 0.772549, 0.305882, 0.894118, 0.847059, 0.352941, 0.862745, 0.811765, 0.309804, 0.819608, 0.772549, 0.305882, 0.501961, 0.501961, 0.501961, 0.513726, 0.513726, 0.513726, 0.266667, 0.266667, 0.266667, 0.360784, 0.360784, 0.360784, 0.513726, 0.513726, 0.513726, 0.266667, 0.266667, 0.266667, 0.266667, 0.247059, 0.070588, 0.360784, 0.337255, 0.117647, 0.470588, 0.443137, 0.152941, 0.454902, 0.427451, 0.14902, 0.360784, 0.337255, 0.113725, 0.470588, 0.443137, 0.152941, 0.894118, 0.85098, 0.419608, 0.862745, 0.811765, 0.309804, 0.819608, 0.772549, 0.298039, 0.894118, 0.847059, 0.352941, 0.819608, 0.772549, 0.294118, 0.862745, 0.811765, 0.309804, 0.858824, 0.85098, 0.768627, 0.894118, 0.85098, 0.419608, 0.792157, 0.756863, 0.415686, 0.858824, 0.831373, 0.556863, 0.792157, 0.74902, 0.305882, 0.894118, 0.847059, 0.352941, 0.858824, 0.85098, 0.768627, 0.792157, 0.756863, 0.415686, 0.596078, 0.580392, 0.411765, 0.607843, 0.572549, 0.227451, 0.792157, 0.74902, 0.305882, 0.596078, 0.572549, 0.313726, 0.360784, 0.337255, 0.117647, 0.596078, 0.580392, 0.407843, 0.454902, 0.427451, 0.14902, 0.360784, 0.337255, 0.113725, 0.454902, 0.427451, 0.14902, 0.596078, 0.572549, 0.313726, 0.698039, 0.654902, 0.243137, 0.607843, 0.572549, 0.25098, 0.819608, 0.772549, 0.298039, 0.792157, 0.74902, 0.301961, 0.607843, 0.572549, 0.227451, 0.819608, 0.772549, 0.294118, 0.607843, 0.576471, 0.25098, 0.698039, 0.654902, 0.243137, 0.454902, 0.427451, 0.14902, 0.607843, 0.572549, 0.227451, 0.454902, 0.427451, 0.14902, 0.698039, 0.654902, 0.243137, 0.670588, 0.670588, 0.670588, 0.823529, 0.772549, 0.305882, 0.603922, 0.603922, 0.6, 0.670588, 0.670588, 0.670588, 0.603922, 0.6, 0.556863, 0.823529, 0.772549, 0.305882, 0.603922, 0.603922, 0.6, 0.760784, 0.74902, 0.623529, 0.67451, 0.670588, 0.639216, 0.603922, 0.6, 0.556863, 0.67451, 0.658824, 0.509804, 0.760784, 0.729412, 0.392157, 0.541176, 0.521569, 0.337255, 0.513726, 0.482353, 0.176471, 0.67451, 0.670588, 0.639216, 0.705882, 0.705882, 0.682353, 0.513726, 0.482353, 0.172549, 0.67451, 0.658824, 0.509804, 0.513726, 0.482353, 0.176471, 0.666667, 0.627451, 0.27451, 0.705882, 0.705882, 0.698039, 0.698039, 0.690196, 0.627451, 0.666667, 0.627451, 0.231373, 0.705882, 0.705882, 0.682353, 0.72549, 0.72549, 0.72549, 0.752941, 0.752941, 0.752941, 0.698039, 0.698039, 0.698039, 0.705882, 0.705882, 0.682353, 0.752941, 0.752941, 0.752941, 0.698039, 0.694118, 0.627451, 0.752941, 0.752941, 0.752941, 0.745098, 0.745098, 0.745098, 0.705882, 0.705882, 0.698039, 0.67451, 0.658824, 0.509804, 0.745098, 0.745098, 0.745098, 0.705882, 0.705882, 0.682353, 0.745098, 0.745098, 0.745098, 0.533333, 0.533333, 0.533333, 0.67451, 0.670588, 0.643137, 0.745098, 0.745098, 0.745098, 0.67451, 0.658824, 0.509804, 0.533333, 0.533333, 0.52549, 0.611765, 0.572549, 0.211765, 0.517647, 0.486275, 0.172549, 0.427451, 0.403922, 0.137255, 0.215686, 0.2, 0.054902, 0.517647, 0.482353, 0.172549, 0.427451, 0.4, 0.137255, 0.682353, 0.643137, 0.243137, 0.556863, 0.533333, 0.282353, 0.427451, 0.403922, 0.137255, 0.682353, 0.647059, 0.298039, 0.427451, 0.403922, 0.137255, 0.556863, 0.545098, 0.403922, 0.807843, 0.764706, 0.333333, 0.521569, 0.505882, 0.337255, 0.682353, 0.643137, 0.243137, 0.807843, 0.768627, 0.368627, 0.682353, 0.647059, 0.298039, 0.521569, 0.509804, 0.384314, 0.831373, 0.788235, 0.364706, 0.552941, 0.529412, 0.321569, 0.807843, 0.764706, 0.333333, 0.831373, 0.788235, 0.364706, 0.807843, 0.768627, 0.368627, 0.552941, 0.529412, 0.321569, 0.831373, 0.788235, 0.364706, 0.807843, 0.764706, 0.333333, 0.803922, 0.756863, 0.286275, 0.792157, 0.745098, 0.282353, 0.807843, 0.768627, 0.368627, 0.803922, 0.756863, 0.286275, 0.792157, 0.745098, 0.282353, 0.807843, 0.768627, 0.333333, 0.698039, 0.654902, 0.243137, 0.792157, 0.745098, 0.282353, 0.698039, 0.654902, 0.243137, 0.807843, 0.768627, 0.368627, 0.698039, 0.698039, 0.698039, 0.682353, 0.682353, 0.682353, 0.380392, 0.380392, 0.380392, 0.698039, 0.654902, 0.243137, 0.380392, 0.352941, 0.117647, 0.682353, 0.647059, 0.298039, 0.427451, 0.427451, 0.427451, 0.215686, 0.215686, 0.215686, 0.380392, 0.380392, 0.380392, 0.380392, 0.380392, 0.380392, 0.215686, 0.215686, 0.215686, 0.380392, 0.380392, 0.380392, 0.376471, 0.352941, 0.117647, 0.380392, 0.356863, 0.117647, 0.792157, 0.745098, 0.282353, 0.376471, 0.352941, 0.117647, 0.792157, 0.745098, 0.282353, 0.380392, 0.356863, 0.117647, 0.152941, 0.207843, 0.639216, 0.207843, 0.254902, 0.6, 0.156863, 0.211765, 0.647059, 0.396078, 0.427451, 0.639216, 0.431373, 0.454902, 0.647059, 0.6, 0.6, 0.6, 0.152941, 0.207843, 0.631373, 0.388235, 0.411765, 0.6, 0.152941, 0.207843, 0.639216, 0.301961, 0.337255, 0.631373, 0.396078, 0.427451, 0.639216, 0.6, 0.6, 0.6, 0.545098, 0.54902, 0.6, 0.388235, 0.411765, 0.6, 0.156863, 0.211765, 0.639216, 0.301961, 0.337255, 0.631373, 0.6, 0.6, 0.6, 0.25098, 0.294118, 0.639216, 0.14902, 0.2, 0.611765, 0.141176, 0.192157, 0.596078, 0.156863, 0.211765, 0.647059, 0.286275, 0.321569, 0.615686, 0.513726, 0.521569, 0.596078, 0.431373, 0.454902, 0.647059, 0.14902, 0.2, 0.615686, 0.141176, 0.192157, 0.596078, 0.141176, 0.192157, 0.6, 0.286275, 0.321569, 0.615686, 0.145098, 0.196078, 0.6, 0.513726, 0.521569, 0.596078, 0.141176, 0.192157, 0.6, 0.141176, 0.188235, 0.54902, 0.329412, 0.364706, 0.65098, 0.145098, 0.196078, 0.6, 0.160784, 0.215686, 0.65098, 0.262745, 0.298039, 0.54902, 0.333333, 0.364706, 0.65098, 0.443137, 0.45098, 0.533333, 0.635294, 0.635294, 0.635294, 0.160784, 0.215686, 0.65098, 0.403922, 0.431373, 0.635294, 0.137255, 0.180392, 0.533333, 0.635294, 0.635294, 0.635294, 0.6, 0.6, 0.6, 0.647059, 0.647059, 0.647059, 0.403922, 0.435294, 0.635294, 0.623529, 0.623529, 0.647059, 0.572549, 0.576471, 0.6, 0.596078, 0.596078, 0.596078, 0.564706, 0.564706, 0.564706, 0.647059, 0.647059, 0.647059, 0.662745, 0.662745, 0.67451, 0.564706, 0.564706, 0.564706, 0.623529, 0.623529, 0.647059, 0.564706, 0.564706, 0.564706, 0.541176, 0.552941, 0.662745, 0.67451, 0.67451, 0.67451, 0.180392, 0.231373, 0.631373, 0.458824, 0.482353, 0.662745, 0.666667, 0.666667, 0.67451, 0.203922, 0.247059, 0.631373, 0.537255, 0.552941, 0.662745, 0.176471, 0.235294, 0.698039, 0.184314, 0.235294, 0.631373, 0.203922, 0.258824, 0.698039, 0.458824, 0.482353, 0.662745, 0.176471, 0.235294, 0.698039, 0.384314, 0.415686, 0.635294, 0.168627, 0.223529, 0.67451, 0.203922, 0.258824, 0.698039, 0.215686, 0.262745, 0.67451, 0.529412, 0.541176, 0.635294, 0.168627, 0.223529, 0.67451, 0.458824, 0.478431, 0.627451, 0.156863, 0.211765, 0.639216, 0.215686, 0.262745, 0.67451, 0.25098, 0.294118, 0.639216, 0.572549, 0.580392, 0.627451, 0.12549, 0.172549, 0.54902, 0.168627, 0.223529, 0.67451, 0.121569, 0.168627, 0.533333, 0.129412, 0.176471, 0.54902, 0.129412, 0.176471, 0.533333, 0.215686, 0.262745, 0.67451, 0.109804, 0.14902, 0.486275, 0.176471, 0.235294, 0.698039, 0.12549, 0.172549, 0.54902, 0.109804, 0.14902, 0.486275, 0.129412, 0.176471, 0.54902, 0.203922, 0.258824, 0.698039, 0.203922, 0.247059, 0.631373, 0.176471, 0.235294, 0.698039, 0.07451, 0.105882, 0.341176, 0.109804, 0.14902, 0.486275, 0.203922, 0.258824, 0.701961, 0.066667, 0.098039, 0.341176, 0.67451, 0.67451, 0.67451, 0.203922, 0.247059, 0.631373, 0.427451, 0.427451, 0.427451, 0.066667, 0.098039, 0.341176, 0.180392, 0.231373, 0.631373, 0.25098, 0.266667, 0.427451, 0.623529, 0.623529, 0.623529, 0.647059, 0.647059, 0.647059, 0.427451, 0.427451, 0.427451, 0.329412, 0.360784, 0.623529, 0.25098, 0.266667, 0.427451, 0.623529, 0.623529, 0.647059, 0.635294, 0.635294, 0.635294, 0.643137, 0.643137, 0.643137, 0.721569, 0.721569, 0.729412, 0.329412, 0.360784, 0.623529, 0.623529, 0.623529, 0.647059, 0.207843, 0.266667, 0.729412, 0.243137, 0.305882, 0.807843, 0.333333, 0.364706, 0.65098, 0.721569, 0.721569, 0.729412, 0.203922, 0.270588, 0.807843, 0.207843, 0.266667, 0.729412, 0.160784, 0.215686, 0.65098, 0.141176, 0.192157, 0.6, 0.329412, 0.364706, 0.65098, 0.207843, 0.278431, 0.823529, 0.203922, 0.270588, 0.807843, 0.160784, 0.215686, 0.65098, 0.207843, 0.278431, 0.823529, 0.145098, 0.2, 0.615686, 0.141176, 0.192157, 0.596078, 0.207843, 0.27451, 0.811765, 0.207843, 0.278431, 0.823529, 0.145098, 0.196078, 0.6, 0.235294, 0.301961, 0.811765, 0.188235, 0.25098, 0.74902, 0.156863, 0.211765, 0.647059, 0.207843, 0.27451, 0.811765, 0.32549, 0.376471, 0.74902, 0.235294, 0.301961, 0.811765, 0.431373, 0.454902, 0.647059, 0.121569, 0.168627, 0.533333, 0.156863, 0.211765, 0.639216, 0.141176, 0.192157, 0.596078, 0.129412, 0.176471, 0.533333, 0.219608, 0.262745, 0.596078, 0.25098, 0.294118, 0.639216, 0.141176, 0.192157, 0.596078, 0.152941, 0.207843, 0.631373, 0.164706, 0.219608, 0.670588, 0.219608, 0.262745, 0.596078, 0.262745, 0.305882, 0.670588, 0.301961, 0.337255, 0.631373, 0.164706, 0.219608, 0.670588, 0.152941, 0.207843, 0.639216, 0.188235, 0.25098, 0.74902, 0.262745, 0.305882, 0.670588, 0.32549, 0.372549, 0.74902, 0.396078, 0.427451, 0.639216, 0.968627, 0.968627, 0.968627, 0.988235, 0.988235, 0.988235, 0.964706, 0.964706, 0.964706, 0.968627, 0.968627, 0.968627, 0.964706, 0.964706, 0.964706, 0.988235, 0.988235, 0.988235, 0.964706, 0.964706, 0.964706, 0.882353, 0.882353, 0.882353, 0.862745, 0.862745, 0.862745, 0.964706, 0.964706, 0.964706, 0.862745, 0.862745, 0.862745, 0.882353, 0.882353, 0.882353, 0.945098, 0.945098, 0.945098, 0.992157, 0.992157, 0.992157, 0.862745, 0.862745, 0.862745, 0.909804, 0.909804, 0.909804, 0.992157, 0.992157, 0.992157, 0.862745, 0.862745, 0.862745, 0.992157, 0.992157, 0.992157, 0.937255, 0.937255, 0.937255, 0.909804, 0.909804, 0.909804, 0.976471, 0.976471, 0.976471, 0.937255, 0.937255, 0.937255, 0.909804, 0.909804, 0.909804, 0.937255, 0.937255, 0.937255, 0.94902, 0.94902, 0.94902, 0.976471, 0.976471, 0.976471, 0.972549, 0.972549, 0.972549, 0.94902, 0.94902, 0.94902, 0.976471, 0.976471, 0.976471, 0.972549, 0.972549, 0.972549, 0.94902, 0.94902, 0.94902, 0.878431, 0.878431, 0.878431, 0.972549, 0.972549, 0.972549, 0.878431, 0.878431, 0.878431, 0.94902, 0.94902, 0.94902, 0.819608, 0.819608, 0.819608, 0.52549, 0.52549, 0.52549, 0.878431, 0.878431, 0.878431, 0.564706, 0.564706, 0.564706, 0.52549, 0.52549, 0.52549, 0.878431, 0.878431, 0.878431, 0.564706, 0.564706, 0.564706, 0.52549, 0.52549, 0.52549, 0.305882, 0.305882, 0.305882, 0.564706, 0.564706, 0.564706, 0.305882, 0.305882, 0.305882, 0.52549, 0.52549, 0.52549, 0.305882, 0.305882, 0.305882, 0.321569, 0.321569, 0.321569, 0.227451, 0.227451, 0.227451, 0.305882, 0.305882, 0.305882, 0.227451, 0.227451, 0.227451, 0.321569, 0.321569, 0.321569, 0.560784, 0.560784, 0.560784, 0.309804, 0.309804, 0.309804, 0.584314, 0.584314, 0.584314, 0.443137, 0.443137, 0.443137, 0.309804, 0.309804, 0.309804, 0.584314, 0.584314, 0.584314, 0.564706, 0.564706, 0.564706, 0.560784, 0.560784, 0.560784, 0.607843, 0.607843, 0.607843, 0.584314, 0.584314, 0.584314, 0.560784, 0.560784, 0.560784, 0.607843, 0.607843, 0.607843, 0.270588, 0.270588, 0.270588, 0.564706, 0.564706, 0.564706, 0.337255, 0.337255, 0.337255, 0.607843, 0.607843, 0.607843, 0.564706, 0.564706, 0.564706, 0.337255, 0.337255, 0.337255, 0.337255, 0.337255, 0.337255, 0.101961, 0.101961, 0.101961, 0.270588, 0.270588, 0.270588, 0.337255, 0.337255, 0.337255, 0.270588, 0.270588, 0.270588, 0.101961, 0.101961, 0.101961, 0.498039, 0.498039, 0.498039, 0.352941, 0.352941, 0.352941, 0.337255, 0.337255, 0.337255, 0.498039, 0.498039, 0.498039, 0.337255, 0.337255, 0.337255, 0.352941, 0.352941, 0.352941, 0.670588, 0.670588, 0.670588, 0.619608, 0.619608, 0.619608, 0.498039, 0.498039, 0.498039, 0.670588, 0.670588, 0.670588, 0.498039, 0.498039, 0.498039, 0.619608, 0.619608, 0.619608, 0.662745, 0.662745, 0.662745, 0.694118, 0.694118, 0.694118, 0.670588, 0.670588, 0.670588, 0.662745, 0.662745, 0.662745, 0.670588, 0.670588, 0.670588, 0.694118, 0.694118, 0.694118, 0.662745, 0.662745, 0.662745, 0.670588, 0.670588, 0.670588, 0.584314, 0.584314, 0.584314, 0.662745, 0.662745, 0.662745, 0.584314, 0.584314, 0.584314, 0.670588, 0.670588, 0.670588, 0.670588, 0.670588, 0.670588, 0.498039, 0.498039, 0.498039, 0.607843, 0.607843, 0.607843, 0.337255, 0.337255, 0.337255, 0.498039, 0.498039, 0.498039, 0.607843, 0.607843, 0.607843, 0.666667, 0.666667, 0.666667, 0.662745, 0.662745, 0.662745, 0.443137, 0.443137, 0.443137, 0.584314, 0.584314, 0.584314, 0.662745, 0.662745, 0.662745, 0.443137, 0.443137, 0.443137, 0.662745, 0.662745, 0.662745, 0.72549, 0.72549, 0.72549, 0.662745, 0.662745, 0.662745, 0.662745, 0.466667, 0.521569, 0.662745, 0.662745, 0.662745, 0.72549, 0.694118, 0.701961, 0.752941, 0.752941, 0.752941, 0.592157, 0.592157, 0.592157, 0.745098, 0.745098, 0.745098, 0.6, 0.6, 0.6, 0.592157, 0.592157, 0.592157, 0.745098, 0.745098, 0.745098, 0.72549, 0.72549, 0.72549, 0.662745, 0.662745, 0.662745, 0.752941, 0.752941, 0.752941, 0.592157, 0.592157, 0.592157, 0.666667, 0.666667, 0.666667, 0.752941, 0.752941, 0.752941, 0.533333, 0.533333, 0.533333, 0.745098, 0.745098, 0.745098, 0.458824, 0.458824, 0.458824, 0.6, 0.6, 0.6, 0.745098, 0.745098, 0.745098, 0.458824, 0.458824, 0.458824, 0.533333, 0.533333, 0.533333, 0.458824, 0.458824, 0.458824, 0.180392, 0.180392, 0.180392, 0.227451, 0.227451, 0.227451, 0.458824, 0.458824, 0.458824, 0.180392, 0.180392, 0.180392, 0.564706, 0.243137, 0.329412, 0.556863, 0.521569, 0.533333, 0.384314, 0.384314, 0.384314, 0.407843, 0.407843, 0.407843, 0.556863, 0.537255, 0.541176, 0.384314, 0.384314, 0.384314, 0.384314, 0.384314, 0.384314, 0.407843, 0.407843, 0.407843, 0.164706, 0.164706, 0.164706, 0.294118, 0.294118, 0.294118, 0.407843, 0.407843, 0.407843, 0.164706, 0.164706, 0.164706, 0.066667, 0.066667, 0.066667, 0.164706, 0.164706, 0.164706, 0.305882, 0.305882, 0.305882, 0.066667, 0.066667, 0.066667, 0.305882, 0.305882, 0.305882, 0.164706, 0.164706, 0.164706, 0.309804, 0.309804, 0.309804, 0.066667, 0.066667, 0.066667, 0.443137, 0.443137, 0.443137, 0.309804, 0.309804, 0.309804, 0.443137, 0.443137, 0.443137, 0.066667, 0.066667, 0.066667, 0.666667, 0.666667, 0.666667, 0.443137, 0.443137, 0.443137, 0.592157, 0.592157, 0.592157, 0.305882, 0.305882, 0.305882, 0.443137, 0.443137, 0.443137, 0.592157, 0.592157, 0.592157, 0.6, 0.6, 0.6, 0.564706, 0.564706, 0.564706, 0.384314, 0.384314, 0.384314, 0.6, 0.6, 0.6, 0.384314, 0.384314, 0.384314, 0.564706, 0.564706, 0.564706, 0.772549, 0.341176, 0.458824, 0.729412, 0.321569, 0.427451, 0.564706, 0.243137, 0.329412, 0.556863, 0.537255, 0.541176, 0.729412, 0.321569, 0.427451, 0.564706, 0.243137, 0.329412, 0.960784, 0.960784, 0.960784, 0.929412, 0.929412, 0.929412, 1.0, 1.0, 1.0, 0.980392, 0.980392, 0.980392, 0.929412, 0.929412, 0.929412, 1.0, 1.0, 1.0, 0.952941, 0.952941, 0.952941, 1.0, 1.0, 1.0, 0.945098, 0.945098, 0.945098, 0.952941, 0.952941, 0.952941, 0.945098, 0.945098, 0.945098, 1.0, 1.0, 1.0, 0.772549, 0.341176, 0.454902, 0.952941, 0.952941, 0.952941, 0.729412, 0.321569, 0.427451, 0.772549, 0.341176, 0.454902, 0.729412, 0.321569, 0.427451, 0.952941, 0.952941, 0.952941, 0.937255, 0.937255, 0.937255, 0.972549, 0.972549, 0.972549, 0.886275, 0.886275, 0.886275, 0.937255, 0.937255, 0.937255, 0.886275, 0.886275, 0.886275, 0.972549, 0.972549, 0.972549, 0.909804, 0.909804, 0.909804, 0.937255, 0.937255, 0.937255, 0.858824, 0.858824, 0.858824, 0.909804, 0.909804, 0.909804, 0.858824, 0.858824, 0.858824, 0.937255, 0.937255, 0.937255, 0.92549, 0.92549, 0.92549, 0.909804, 0.909804, 0.909804, 0.85098, 0.85098, 0.85098, 0.92549, 0.92549, 0.92549, 0.85098, 0.85098, 0.85098, 0.909804, 0.909804, 0.909804, 0.858824, 0.858824, 0.858824, 0.921569, 0.921569, 0.921569, 0.776471, 0.776471, 0.776471, 0.858824, 0.858824, 0.858824, 0.776471, 0.776471, 0.776471, 0.92549, 0.92549, 0.92549, 0.658824, 0.658824, 0.658824, 0.658824, 0.580392, 0.603922, 0.776471, 0.776471, 0.776471, 0.858824, 0.858824, 0.858824, 0.658824, 0.294118, 0.392157, 0.776471, 0.772549, 0.772549, 0.658824, 0.580392, 0.6, 0.729412, 0.321569, 0.427451, 0.858824, 0.858824, 0.858824, 0.658824, 0.294118, 0.392157, 0.858824, 0.858824, 0.858824, 0.729412, 0.321569, 0.427451, 0.858824, 0.858824, 0.858824, 0.945098, 0.945098, 0.945098, 0.92549, 0.92549, 0.92549, 0.858824, 0.858824, 0.858824, 0.92549, 0.92549, 0.92549, 0.945098, 0.945098, 0.945098, 0.921569, 0.921569, 0.921569, 0.980392, 0.980392, 0.980392, 0.909804, 0.909804, 0.909804, 0.921569, 0.921569, 0.921569, 0.909804, 0.909804, 0.909804, 0.980392, 0.980392, 0.980392, 0.909804, 0.909804, 0.909804, 0.929412, 0.929412, 0.929412, 0.937255, 0.937255, 0.937255, 0.909804, 0.909804, 0.909804, 0.937255, 0.937255, 0.937255, 0.929412, 0.929412, 0.929412, 0.976471, 0.976471, 0.976471, 0.972549, 0.972549, 0.972549, 0.952941, 0.952941, 0.952941, 0.937255, 0.937255, 0.937255, 0.972549, 0.972549, 0.972549, 0.952941, 0.952941, 0.952941, 0.894118, 0.894118, 0.894118, 0.952941, 0.952941, 0.952941, 0.960784, 0.960784, 0.960784, 0.929412, 0.929412, 0.929412, 0.952941, 0.952941, 0.952941, 0.960784, 0.960784, 0.960784, 0.964706, 0.964706, 0.964706, 0.862745, 0.862745, 0.862745, 0.976471, 0.976471, 0.976471, 0.909804, 0.909804, 0.909804, 0.862745, 0.862745, 0.862745, 0.976471, 0.976471, 0.976471, 0.894118, 0.894118, 0.894118, 0.964706, 0.964706, 0.964706, 0.952941, 0.952941, 0.952941, 0.894118, 0.894118, 0.894118, 0.952941, 0.952941, 0.952941, 0.964706, 0.964706, 0.964706, 0.878431, 0.878431, 0.878431, 0.564706, 0.564706, 0.564706, 0.886275, 0.886275, 0.886275, 0.6, 0.6, 0.6, 0.564706, 0.564706, 0.564706, 0.886275, 0.886275, 0.886275, 0.886275, 0.886275, 0.886275, 0.6, 0.6, 0.6, 0.858824, 0.858824, 0.858824, 0.886275, 0.886275, 0.886275, 0.858824, 0.858824, 0.858824, 0.6, 0.6, 0.6, 0.858824, 0.858824, 0.858824, 0.65098, 0.65098, 0.65098, 0.85098, 0.85098, 0.85098, 0.858824, 0.858824, 0.858824, 0.85098, 0.85098, 0.85098, 0.65098, 0.65098, 0.65098, 0.658824, 0.658824, 0.658824, 0.776471, 0.776471, 0.776471, 0.776471, 0.776471, 0.776471, 0.85098, 0.85098, 0.85098, 0.776471, 0.776471, 0.776471, 0.776471, 0.776471, 0.776471, 0.305882, 0.305882, 0.305882, 0.294118, 0.294118, 0.294118, 0.309804, 0.309804, 0.309804, 0.313726, 0.313726, 0.313726, 0.294118, 0.294118, 0.294118, 0.309804, 0.309804, 0.309804, 0.384314, 0.384314, 0.384314, 0.309804, 0.309804, 0.309804, 0.133333, 0.133333, 0.133333, 0.313726, 0.313726, 0.313726, 0.309804, 0.309804, 0.309804, 0.133333, 0.133333, 0.133333, 0.384314, 0.384314, 0.384314, 0.305882, 0.305882, 0.305882, 0.309804, 0.309804, 0.309804, 0.384314, 0.384314, 0.384314, 0.309804, 0.309804, 0.309804, 0.305882, 0.305882, 0.305882, 0.294118, 0.294118, 0.309804, 0.227451, 0.227451, 0.227451, 0.592157, 0.592157, 0.592157, 0.309804, 0.309804, 0.309804, 0.592157, 0.584314, 0.541176, 0.227451, 0.227451, 0.227451, 0.658824, 0.658824, 0.658824, 0.427451, 0.427451, 0.427451, 0.658824, 0.580392, 0.603922, 0.486275, 0.478431, 0.486275, 0.427451, 0.427451, 0.427451, 0.658824, 0.294118, 0.392157, 0.729412, 0.321569, 0.427451, 0.658824, 0.580392, 0.603922, 0.556863, 0.521569, 0.533333, 0.486275, 0.478431, 0.486275, 0.658824, 0.294118, 0.392157, 0.556863, 0.537255, 0.541176, 0.133333, 0.133333, 0.133333, 0.313726, 0.313726, 0.313726, 0.427451, 0.427451, 0.427451, 0.486275, 0.478431, 0.486275, 0.313726, 0.313726, 0.313726, 0.427451, 0.427451, 0.427451, 0.294118, 0.294118, 0.294118, 0.407843, 0.407843, 0.407843, 0.313726, 0.313726, 0.313726, 0.486275, 0.486275, 0.486275, 0.407843, 0.407843, 0.407843, 0.313726, 0.313726, 0.313726, 0.968627, 0.968627, 0.968627, 0.933333, 0.933333, 0.933333, 0.643137, 0.643137, 0.643137, 0.647059, 0.647059, 0.647059, 0.933333, 0.933333, 0.933333, 0.643137, 0.643137, 0.643137, 0.956863, 0.956863, 0.956863, 0.968627, 0.968627, 0.968627, 0.635294, 0.635294, 0.635294, 0.956863, 0.956863, 0.956863, 0.635294, 0.635294, 0.635294, 0.968627, 0.968627, 0.968627, 0.956863, 0.956863, 0.956863, 0.635294, 0.635294, 0.635294, 0.729412, 0.729412, 0.729412, 0.639216, 0.639216, 0.639216, 0.635294, 0.635294, 0.635294, 0.729412, 0.729412, 0.729412, 0.729412, 0.729412, 0.729412, 0.639216, 0.639216, 0.639216, 0.486275, 0.486275, 0.486275, 0.745098, 0.745098, 0.745098, 0.639216, 0.639216, 0.639216, 0.486275, 0.486275, 0.486275, 0.486275, 0.486275, 0.486275, 0.752941, 0.752941, 0.752941, 0.329412, 0.329412, 0.329412, 0.741176, 0.741176, 0.741176, 0.745098, 0.745098, 0.745098, 0.329412, 0.329412, 0.329412, 0.411765, 0.411765, 0.411765, 0.329412, 0.329412, 0.329412, 0.760784, 0.760784, 0.760784, 0.411765, 0.411765, 0.411765, 0.760784, 0.760784, 0.760784, 0.329412, 0.329412, 0.329412, 0.760784, 0.760784, 0.760784, 0.741176, 0.741176, 0.741176, 0.952941, 0.952941, 0.952941, 0.760784, 0.760784, 0.760784, 0.960784, 0.960784, 0.960784, 0.741176, 0.741176, 0.741176, 0.741176, 0.741176, 0.741176, 0.752941, 0.752941, 0.752941, 0.898039, 0.898039, 0.898039, 0.741176, 0.741176, 0.741176, 0.898039, 0.898039, 0.898039, 0.745098, 0.745098, 0.745098, 0.639216, 0.639216, 0.639216, 0.643137, 0.643137, 0.643137, 0.752941, 0.752941, 0.752941, 0.831373, 0.831373, 0.831373, 0.643137, 0.643137, 0.643137, 0.745098, 0.745098, 0.745098, 0.635294, 0.635294, 0.635294, 0.333333, 0.333333, 0.333333, 0.639216, 0.639216, 0.639216, 0.643137, 0.643137, 0.643137, 0.333333, 0.333333, 0.333333, 0.639216, 0.639216, 0.639216, 0.643137, 0.643137, 0.643137, 0.403922, 0.403922, 0.403922, 0.635294, 0.635294, 0.635294, 0.333333, 0.333333, 0.333333, 0.403922, 0.403922, 0.403922, 0.635294, 0.635294, 0.635294, 0.403922, 0.403922, 0.403922, 0.643137, 0.643137, 0.643137, 0.458824, 0.458824, 0.458824, 0.403922, 0.403922, 0.403922, 0.458824, 0.458824, 0.458824, 0.643137, 0.643137, 0.643137, 0.384314, 0.384314, 0.384314, 0.133333, 0.133333, 0.133333, 0.490196, 0.490196, 0.490196, 0.690196, 0.690196, 0.690196, 0.133333, 0.133333, 0.133333, 0.490196, 0.490196, 0.490196, 0.133333, 0.133333, 0.133333, 0.411765, 0.411765, 0.411765, 0.690196, 0.690196, 0.690196, 0.760784, 0.760784, 0.760784, 0.411765, 0.411765, 0.411765, 0.690196, 0.690196, 0.690196, 0.65098, 0.65098, 0.65098, 0.6, 0.6, 0.6, 0.490196, 0.490196, 0.490196, 0.65098, 0.65098, 0.65098, 0.490196, 0.490196, 0.490196, 0.6, 0.6, 0.6, 0.933333, 0.933333, 0.933333, 0.776471, 0.776471, 0.776471, 0.647059, 0.647059, 0.647059, 0.933333, 0.933333, 0.933333, 0.647059, 0.647059, 0.647059, 0.776471, 0.776471, 0.776471, 0.690196, 0.690196, 0.690196, 0.760784, 0.760784, 0.760784, 0.811765, 0.811765, 0.811765, 0.690196, 0.690196, 0.690196, 0.811765, 0.811765, 0.811765, 0.760784, 0.760784, 0.760784, 0.647059, 0.647059, 0.647059, 0.607843, 0.607843, 0.607843, 0.811765, 0.811765, 0.811765, 0.690196, 0.690196, 0.690196, 0.607843, 0.607843, 0.607843, 0.811765, 0.811765, 0.811765, 0.85098, 0.85098, 0.85098, 0.67451, 0.67451, 0.67451, 0.647059, 0.647059, 0.647059, 0.85098, 0.85098, 0.85098, 0.647059, 0.647059, 0.647059, 0.67451, 0.67451, 0.67451, 0.447059, 0.447059, 0.447059, 0.517647, 0.517647, 0.517647, 0.67451, 0.67451, 0.67451, 0.607843, 0.607843, 0.607843, 0.517647, 0.517647, 0.517647, 0.67451, 0.67451, 0.67451, 0.580392, 0.580392, 0.580392, 0.517647, 0.517647, 0.517647, 0.466667, 0.466667, 0.466667, 0.447059, 0.447059, 0.447059, 0.517647, 0.517647, 0.517647, 0.466667, 0.466667, 0.466667, 0.647059, 0.647059, 0.647059, 0.580392, 0.580392, 0.580392, 0.458824, 0.458824, 0.458824, 0.466667, 0.466667, 0.466667, 0.580392, 0.580392, 0.580392, 0.458824, 0.458824, 0.458824, 0.65098, 0.65098, 0.65098, 0.517647, 0.517647, 0.517647, 0.776471, 0.776471, 0.776471, 0.580392, 0.580392, 0.580392, 0.517647, 0.517647, 0.517647, 0.776471, 0.776471, 0.776471, 0.65098, 0.65098, 0.65098, 0.490196, 0.490196, 0.490196, 0.517647, 0.517647, 0.517647, 0.607843, 0.607843, 0.607843, 0.490196, 0.490196, 0.490196, 0.517647, 0.517647, 0.517647, 0.521569, 0.521569, 0.521569, 0.458824, 0.458824, 0.458824, 0.513726, 0.513726, 0.513726, 0.521569, 0.521569, 0.521569, 0.513726, 0.513726, 0.513726, 0.458824, 0.458824, 0.458824, 0.466667, 0.466667, 0.466667, 0.447059, 0.447059, 0.447059, 0.513726, 0.513726, 0.513726, 0.517647, 0.517647, 0.517647, 0.447059, 0.447059, 0.447059, 0.513726, 0.513726, 0.513726, 0.517647, 0.517647, 0.517647, 0.447059, 0.447059, 0.447059, 0.741176, 0.741176, 0.741176, 0.517647, 0.517647, 0.517647, 0.737255, 0.737255, 0.737255, 0.447059, 0.447059, 0.447059, 0.67451, 0.67451, 0.67451, 0.85098, 0.85098, 0.85098, 0.741176, 0.741176, 0.741176, 0.768627, 0.768627, 0.768627, 0.85098, 0.85098, 0.85098, 0.737255, 0.737255, 0.737255, 0.85098, 0.85098, 0.85098, 0.647059, 0.647059, 0.647059, 0.768627, 0.768627, 0.768627, 0.764706, 0.764706, 0.764706, 0.647059, 0.647059, 0.647059, 0.768627, 0.768627, 0.768627, 0.764706, 0.764706, 0.764706, 0.647059, 0.647059, 0.647059, 0.760784, 0.760784, 0.760784, 0.764706, 0.764706, 0.764706, 0.760784, 0.760784, 0.760784, 0.647059, 0.647059, 0.647059, 0.760784, 0.760784, 0.760784, 0.811765, 0.811765, 0.811765, 0.898039, 0.898039, 0.898039, 0.760784, 0.760784, 0.760784, 0.898039, 0.898039, 0.898039, 0.811765, 0.811765, 0.811765, 0.552941, 0.552941, 0.552941, 0.403922, 0.403922, 0.403922, 0.52549, 0.52549, 0.52549, 0.552941, 0.552941, 0.552941, 0.521569, 0.521569, 0.521569, 0.403922, 0.403922, 0.403922, 0.447059, 0.447059, 0.447059, 0.333333, 0.333333, 0.333333, 0.552941, 0.552941, 0.552941, 0.447059, 0.447059, 0.447059, 0.552941, 0.552941, 0.552941, 0.333333, 0.333333, 0.333333, 0.647059, 0.647059, 0.647059, 0.643137, 0.643137, 0.643137, 0.447059, 0.447059, 0.447059, 0.647059, 0.647059, 0.647059, 0.447059, 0.447059, 0.447059, 0.643137, 0.643137, 0.643137, 0.831373, 0.831373, 0.831373, 0.643137, 0.643137, 0.643137, 0.784314, 0.784314, 0.784314, 0.647059, 0.647059, 0.647059, 0.643137, 0.643137, 0.643137, 0.784314, 0.784314, 0.784314, 0.898039, 0.898039, 0.898039, 0.831373, 0.831373, 0.831373, 0.85098, 0.85098, 0.85098, 0.784314, 0.784314, 0.784314, 0.831373, 0.831373, 0.831373, 0.85098, 0.85098, 0.85098, 0.952941, 0.952941, 0.952941, 0.898039, 0.898039, 0.898039, 0.898039, 0.898039, 0.898039, 0.85098, 0.85098, 0.85098, 0.898039, 0.898039, 0.898039, 0.898039, 0.898039, 0.898039, 0.768627, 0.768627, 0.768627, 0.764706, 0.764706, 0.764706, 0.670588, 0.670588, 0.670588, 0.698039, 0.698039, 0.698039, 0.764706, 0.764706, 0.764706, 0.67451, 0.67451, 0.67451, 0.670588, 0.670588, 0.670588, 0.698039, 0.698039, 0.698039, 0.670588, 0.670588, 0.670588, 0.654902, 0.654902, 0.654902, 0.698039, 0.698039, 0.698039, 0.670588, 0.670588, 0.670588, 0.701961, 0.701961, 0.701961, 0.670588, 0.670588, 0.670588, 0.643137, 0.643137, 0.643137, 0.701961, 0.701961, 0.701961, 0.643137, 0.643137, 0.643137, 0.670588, 0.670588, 0.670588, 0.701961, 0.701961, 0.701961, 0.643137, 0.643137, 0.643137, 0.768627, 0.768627, 0.768627, 0.662745, 0.662745, 0.662745, 0.643137, 0.643137, 0.643137, 0.768627, 0.768627, 0.768627, 0.768627, 0.768627, 0.768627, 0.552941, 0.552941, 0.552941, 0.701961, 0.701961, 0.701961, 0.768627, 0.768627, 0.768627, 0.701961, 0.701961, 0.701961, 0.552941, 0.552941, 0.552941, 0.513726, 0.513726, 0.513726, 0.670588, 0.670588, 0.670588, 0.521569, 0.521569, 0.521569, 0.701961, 0.701961, 0.701961, 0.670588, 0.670588, 0.670588, 0.521569, 0.521569, 0.521569, 0.513726, 0.513726, 0.513726, 0.517647, 0.517647, 0.517647, 0.670588, 0.670588, 0.670588, 0.67451, 0.67451, 0.67451, 0.517647, 0.517647, 0.517647, 0.670588, 0.670588, 0.670588, 0.741176, 0.741176, 0.741176, 0.768627, 0.768627, 0.768627, 0.517647, 0.517647, 0.517647, 0.737255, 0.737255, 0.737255, 0.517647, 0.517647, 0.517647, 0.768627, 0.768627, 0.768627, 0.760784, 0.760784, 0.760784, 0.898039, 0.898039, 0.898039, 0.764706, 0.764706, 0.764706, 0.698039, 0.698039, 0.698039, 0.898039, 0.898039, 0.898039, 0.764706, 0.764706, 0.764706, 0.898039, 0.898039, 0.898039, 0.85098, 0.85098, 0.85098, 0.698039, 0.698039, 0.698039, 0.898039, 0.898039, 0.898039, 0.698039, 0.698039, 0.698039, 0.85098, 0.85098, 0.85098, 0.784314, 0.784314, 0.784314, 0.643137, 0.643137, 0.643137, 0.85098, 0.85098, 0.85098, 0.654902, 0.654902, 0.654902, 0.643137, 0.643137, 0.643137, 0.85098, 0.85098, 0.85098, 0.647059, 0.647059, 0.647059, 0.662745, 0.662745, 0.662745, 0.784314, 0.784314, 0.784314, 0.643137, 0.643137, 0.643137, 0.662745, 0.662745, 0.662745, 0.784314, 0.784314, 0.784314, 0.647059, 0.647059, 0.647059, 0.447059, 0.447059, 0.447059, 0.662745, 0.662745, 0.662745, 0.647059, 0.647059, 0.647059, 0.662745, 0.662745, 0.662745, 0.447059, 0.447059, 0.447059, 0.380392, 0.380392, 0.380392, 0.329412, 0.329412, 0.329412, 0.27451, 0.27451, 0.27451, 0.380392, 0.380392, 0.380392, 0.27451, 0.27451, 0.27451, 0.329412, 0.329412, 0.329412, 0.490196, 0.490196, 0.490196, 0.486275, 0.486275, 0.486275, 0.380392, 0.380392, 0.380392, 0.490196, 0.490196, 0.490196, 0.380392, 0.380392, 0.380392, 0.486275, 0.486275, 0.486275, 0.729412, 0.729412, 0.729412, 0.486275, 0.486275, 0.486275, 0.690196, 0.690196, 0.690196, 0.490196, 0.490196, 0.490196, 0.486275, 0.486275, 0.486275, 0.690196, 0.690196, 0.690196, 0.956863, 0.956863, 0.956863, 0.729412, 0.729412, 0.729412, 0.878431, 0.878431, 0.878431, 0.690196, 0.690196, 0.690196, 0.729412, 0.729412, 0.729412, 0.878431, 0.878431, 0.878431, 0.968627, 0.968627, 0.968627, 0.956863, 0.956863, 0.956863, 0.870588, 0.870588, 0.870588, 0.878431, 0.878431, 0.878431, 0.956863, 0.956863, 0.956863, 0.870588, 0.870588, 0.870588, 0.933333, 0.933333, 0.933333, 0.968627, 0.968627, 0.968627, 0.878431, 0.878431, 0.878431, 0.870588, 0.870588, 0.870588, 0.968627, 0.968627, 0.968627, 0.878431, 0.878431, 0.878431, 0.870588, 0.870588, 0.870588, 0.380392, 0.380392, 0.380392, 0.878431, 0.878431, 0.878431, 0.27451, 0.27451, 0.27451, 0.380392, 0.380392, 0.380392, 0.878431, 0.878431, 0.878431, 0.380392, 0.380392, 0.380392, 0.870588, 0.870588, 0.870588, 0.490196, 0.490196, 0.490196, 0.380392, 0.380392, 0.380392, 0.490196, 0.490196, 0.490196, 0.870588, 0.870588, 0.870588, 0.658824, 0.658824, 0.658824, 0.776471, 0.776471, 0.776471, 0.878431, 0.878431, 0.878431, 0.933333, 0.933333, 0.933333, 0.776471, 0.721569, 0.737255, 0.878431, 0.878431, 0.878431, 0.427451, 0.427451, 0.427451, 0.658824, 0.658824, 0.658824, 0.27451, 0.27451, 0.27451, 0.427451, 0.427451, 0.427451, 0.27451, 0.27451, 0.27451, 0.658824, 0.65098, 0.65098, 0.411765, 0.411765, 0.411765, 0.133333, 0.133333, 0.133333, 0.27451, 0.27451, 0.27451, 0.411765, 0.411765, 0.411765, 0.27451, 0.27451, 0.27451, 0.133333, 0.133333, 0.133333],

    "uvs": [],

    "faces": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 996, 997, 998, 999, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1080, 1081, 1082, 1083, 1084, 1085, 1086, 1087, 1088, 1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 1124, 1125, 1126, 1127, 1128, 1129, 1130, 1131, 1132, 1133, 1134, 1135, 1136, 1137, 1138, 1139, 1140, 1141, 1142, 1143, 1144, 1145, 1146, 1147, 1148, 1149, 1150, 1151, 1152, 1153, 1154, 1155, 1156, 1157, 1158, 1159, 1160, 1161, 1162, 1163, 1164, 1165, 1166, 1167, 1168, 1169, 1170, 1171, 1172, 1173, 1174, 1175, 1176, 1177, 1178, 1179, 1180, 1181, 1182, 1183, 1184, 1185, 1186, 1187, 1188, 1189, 1190, 1191, 1192, 1193, 1194, 1195, 1196, 1197, 1198, 1199, 1200, 1201, 1202, 1203, 1204, 1205, 1206, 1207, 1208, 1209, 1210, 1211, 1212, 1213, 1214, 1215, 1216, 1217, 1218, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 1226, 1227, 1228, 1229, 1230, 1231, 1232, 1233, 1234, 1235, 1236, 1237, 1238, 1239, 1240, 1241, 1242, 1243, 1244, 1245, 1246, 1247, 1248, 1249, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1259, 1260, 1261, 1262, 1263, 1264, 1265, 1266, 1267, 1268, 1269, 1270, 1271, 1272, 1273, 1274, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1284, 1285, 1286, 1287, 1288, 1289, 1290, 1291, 1292, 1293, 1294, 1295, 1296, 1297, 1298, 1299, 1300, 1301, 1302, 1303, 1304, 1305, 1306, 1307, 1308, 1309, 1310, 1311, 1312, 1313, 1314, 1315, 1316, 1317, 1318, 1319, 1320, 1321, 1322, 1323, 1324, 1325, 1326, 1327, 1328, 1329, 1330, 1331, 1332, 1333, 1334, 1335, 1336, 1337, 1338, 1339, 1340, 1341, 1342, 1343, 1344, 1345, 1346, 1347, 1348, 1349, 1350, 1351, 1352, 1353, 1354, 1355, 1356, 1357, 1358, 1359, 1360, 1361, 1362, 1363, 1364, 1365, 1366, 1367, 1368, 1369, 1370, 1371, 1372, 1373, 1374, 1375, 1376, 1377, 1378, 1379, 1380, 1381, 1382, 1383, 1384, 1385, 1386, 1387, 1388, 1389, 1390, 1391, 1392, 1393, 1394, 1395, 1396, 1397, 1398, 1399, 1400, 1401, 1402, 1403, 1404, 1405, 1406, 1407, 1408, 1409, 1410, 1411, 1412, 1413, 1414, 1415, 1416, 1417, 1418, 1419, 1420, 1421, 1422, 1423, 1424, 1425, 1426, 1427, 1428, 1429, 1430, 1431, 1432, 1433, 1434, 1435, 1436, 1437, 1438, 1439, 1440, 1441, 1442, 1443, 1444, 1445, 1446, 1447, 1448, 1449, 1450, 1451, 1452, 1453, 1454, 1455, 1456, 1457, 1458, 1459, 1460, 1461, 1462, 1463, 1464, 1465, 1466, 1467, 1468, 1469, 1470, 1471, 1472, 1473, 1474, 1475, 1476, 1477, 1478, 1479, 1480, 1481, 1482, 1483, 1484, 1485, 1486, 1487, 1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1498, 1499, 1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514, 1515, 1516, 1517, 1518, 1519, 1520, 1521, 1522, 1523, 1524, 1525, 1526, 1527, 1528, 1529, 1530, 1531, 1532, 1533, 1534, 1535, 1536, 1537, 1538, 1539, 1540, 1541, 1542, 1543, 1544, 1545, 1546, 1547, 1548, 1549, 1550, 1551, 1552, 1553, 1554, 1555, 1556, 1557, 1558, 1559, 1560, 1561, 1562, 1563, 1564, 1565, 1566, 1567, 1568, 1569, 1570, 1571, 1572, 1573, 1574, 1575, 1576, 1577, 1578, 1579, 1580, 1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1595, 1596, 1597, 1598, 1599, 1600, 1601, 1602, 1603, 1604, 1605, 1606, 1607, 1608, 1609, 1610, 1611, 1612, 1613, 1614, 1615, 1616, 1617, 1618, 1619, 1620, 1621, 1622, 1623, 1624, 1625, 1626, 1627, 1628, 1629, 1630, 1631, 1632, 1633, 1634, 1635, 1636, 1637, 1638, 1639, 1640, 1641, 1642, 1643, 1644, 1645, 1646, 1647, 1648, 1649, 1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663, 1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677, 1678, 1679, 1680, 1681, 1682, 1683, 1684, 1685, 1686, 1687, 1688, 1689, 1690, 1691, 1692, 1693, 1694, 1695, 1696, 1697, 1698, 1699, 1700, 1701, 1702, 1703, 1704, 1705, 1706, 1707, 1708, 1709, 1710, 1711, 1712, 1713, 1714, 1715, 1716, 1717, 1718, 1719, 1720, 1721, 1722, 1723, 1724, 1725, 1726, 1727, 1728, 1729, 1730, 1731, 1732, 1733, 1734, 1735, 1736, 1737, 1738, 1739, 1740, 1741, 1742, 1743, 1744, 1745, 1746, 1747, 1748, 1749, 1750, 1751, 1752, 1753, 1754, 1755, 1756, 1757, 1758, 1759, 1760, 1761, 1762, 1763, 1764, 1765, 1766, 1767, 1768, 1769, 1770, 1771, 1772, 1773, 1774, 1775, 1776, 1777, 1778, 1779, 1780, 1781, 1782, 1783, 1784, 1785, 1786, 1787, 1788, 1789, 1790, 1791, 1792, 1793, 1794, 1795, 1796, 1797, 1798, 1799, 1800, 1801, 1802, 1803, 1804, 1805, 1806, 1807, 1808, 1809, 1810, 1811, 1812, 1813, 1814, 1815, 1816, 1817, 1818, 1819, 1820, 1821, 1822, 1823, 1824, 1825, 1826, 1827, 1828, 1829, 1830, 1831, 1832, 1833, 1834, 1835, 1836, 1837, 1838, 1839, 1840, 1841, 1842, 1843, 1844, 1845, 1846, 1847, 1848, 1849, 1850, 1851, 1852, 1853, 1854, 1855, 1856, 1857, 1858, 1859, 1860, 1861, 1862, 1863, 1864, 1865, 1866, 1867, 1868, 1869, 1870, 1871, 1872, 1873, 1874, 1875, 1876, 1877, 1878, 1879, 1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 1890, 1891, 1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090, 2091, 2092, 2093, 2094, 2095, 2096, 2097, 2098, 2099, 2100, 2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2111, 2112, 2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2123, 2124, 2125, 2126, 2127, 2128, 2129, 2130, 2131, 2132, 2133, 2134, 2135, 2136, 2137, 2138, 2139, 2140, 2141, 2142, 2143, 2144, 2145, 2146, 2147, 2148, 2149, 2150, 2151, 2152, 2153, 2154, 2155, 2156, 2157, 2158, 2159, 2160, 2161, 2162, 2163, 2164, 2165, 2166, 2167, 2168, 2169, 2170, 2171, 2172, 2173, 2174, 2175, 2176, 2177, 2178, 2179, 2180, 2181, 2182, 2183, 2184, 2185, 2186, 2187, 2188, 2189, 2190, 2191, 2192, 2193, 2194, 2195, 2196, 2197, 2198, 2199, 2200, 2201, 2202, 2203, 2204, 2205, 2206, 2207, 2208, 2209, 2210, 2211, 2212, 2213, 2214, 2215, 2216, 2217, 2218, 2219, 2220, 2221, 2222, 2223, 2224, 2225, 2226, 2227, 2228, 2229, 2230, 2231, 2232, 2233, 2234, 2235, 2236, 2237, 2238, 2239, 2240, 2241, 2242, 2243, 2244, 2245, 2246, 2247, 2248, 2249, 2250, 2251, 2252, 2253, 2254, 2255, 2256, 2257, 2258, 2259, 2260, 2261, 2262, 2263, 2264, 2265, 2266, 2267, 2268, 2269, 2270, 2271, 2272, 2273, 2274, 2275, 2276, 2277, 2278, 2279, 2280, 2281, 2282, 2283, 2284, 2285, 2286, 2287, 2288, 2289, 2290, 2291, 2292, 2293, 2294, 2295, 2296, 2297, 2298, 2299, 2300, 2301, 2302, 2303, 2304, 2305, 2306, 2307, 2308, 2309, 2310, 2311, 2312, 2313, 2314, 2315, 2316, 2317, 2318, 2319, 2320, 2321, 2322, 2323, 2324, 2325, 2326, 2327, 2328, 2329, 2330, 2331, 2332, 2333, 2334, 2335, 2336, 2337, 2338, 2339, 2340, 2341, 2342, 2343, 2344, 2345, 2346, 2347, 2348, 2349, 2350, 2351, 2352, 2353, 2354, 2355, 2356, 2357, 2358, 2359, 2360, 2361, 2362, 2363, 2364, 2365, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2384, 2385, 2386, 2387, 2388, 2389, 2390, 2391, 2392, 2393, 2394, 2395, 2396, 2397, 2398, 2399, 2400, 2401, 2402, 2403, 2404, 2405, 2406, 2407, 2408, 2409, 2410, 2411, 2412, 2413, 2414, 2415, 2416, 2417, 2418, 2419, 2420, 2421, 2422, 2423, 2424, 2425, 2426, 2427, 2428, 2429, 2430, 2431, 2432, 2433, 2434, 2435, 2436, 2437, 2438, 2439, 2440, 2441, 2442, 2443, 2444, 2445, 2446, 2447, 2448, 2449, 2450, 2451, 2452, 2453, 2454, 2455, 2456, 2457, 2458, 2459, 2460, 2461, 2462, 2463, 2464, 2465, 2466, 2467, 2468, 2469, 2470, 2471, 2472, 2473, 2474, 2475, 2476, 2477, 2478, 2479, 2480, 2481, 2482, 2483, 2484, 2485, 2486, 2487, 2488, 2489, 2490, 2491, 2492, 2493, 2494, 2495, 2496, 2497, 2498, 2499, 2500, 2501, 2502, 2503, 2504, 2505, 2506, 2507, 2508, 2509, 2510, 2511, 2512, 2513, 2514, 2515, 2516, 2517, 2518, 2519, 2520, 2521, 2522, 2523, 2524, 2525, 2526, 2527, 2528, 2529, 2530, 2531, 2532, 2533, 2534, 2535, 2536, 2537, 2538, 2539, 2540, 2541, 2542, 2543, 2544, 2545, 2546, 2547, 2548, 2549, 2550, 2551, 2552, 2553, 2554, 2555, 2556, 2557, 2558, 2559, 2560, 2561, 2562, 2563, 2564, 2565, 2566, 2567, 2568, 2569, 2570, 2571, 2572, 2573, 2574, 2575, 2576, 2577, 2578, 2579, 2580, 2581, 2582, 2583, 2584, 2585, 2586, 2587, 2588, 2589, 2590, 2591, 2592, 2593, 2594, 2595, 2596, 2597, 2598, 2599, 2600, 2601, 2602, 2603, 2604, 2605, 2606, 2607, 2608, 2609, 2610, 2611, 2612, 2613, 2614, 2615, 2616, 2617, 2618, 2619, 2620, 2621, 2622, 2623, 2624, 2625, 2626, 2627, 2628, 2629, 2630, 2631, 2632, 2633, 2634, 2635, 2636, 2637, 2638, 2639, 2640, 2641, 2642, 2643, 2644, 2645, 2646, 2647, 2648, 2649, 2650, 2651, 2652, 2653, 2654, 2655, 2656, 2657, 2658, 2659, 2660, 2661, 2662, 2663, 2664, 2665, 2666, 2667, 2668, 2669, 2670, 2671, 2672, 2673, 2674, 2675, 2676, 2677, 2678, 2679, 2680, 2681, 2682, 2683, 2684, 2685, 2686, 2687, 2688, 2689, 2690, 2691, 2692, 2693, 2694, 2695, 2696, 2697, 2698, 2699, 2700, 2701, 2702, 2703, 2704, 2705, 2706, 2707, 2708, 2709, 2710, 2711, 2712, 2713, 2714, 2715, 2716, 2717, 2718, 2719, 2720, 2721, 2722, 2723, 2724, 2725, 2726, 2727, 2728, 2729, 2730, 2731, 2732, 2733, 2734, 2735, 2736, 2737, 2738, 2739, 2740, 2741, 2742, 2743, 2744, 2745, 2746, 2747, 2748, 2749, 2750, 2751, 2752, 2753, 2754, 2755, 2756, 2757, 2758, 2759, 2760, 2761, 2762, 2763, 2764, 2765, 2766, 2767, 2768, 2769, 2770, 2771, 2772, 2773, 2774, 2775, 2776, 2777, 2778, 2779, 2780, 2781, 2782, 2783, 2784, 2785, 2786, 2787, 2788, 2789, 2790, 2791, 2792, 2793, 2794, 2795, 2796, 2797, 2798, 2799, 2800, 2801, 2802, 2803, 2804, 2805, 2806, 2807, 2808, 2809, 2810, 2811, 2812, 2813, 2814, 2815, 2816, 2817, 2818, 2819, 2820, 2821, 2822, 2823, 2824, 2825, 2826, 2827, 2828, 2829, 2830, 2831, 2832, 2833, 2834, 2835, 2836, 2837, 2838, 2839, 2840, 2841, 2842, 2843, 2844, 2845, 2846, 2847, 2848, 2849, 2850, 2851, 2852, 2853, 2854, 2855, 2856, 2857, 2858, 2859, 2860, 2861, 2862, 2863, 2864, 2865, 2866, 2867, 2868, 2869, 2870, 2871, 2872, 2873, 2874, 2875, 2876, 2877, 2878, 2879, 2880, 2881, 2882, 2883, 2884, 2885, 2886, 2887, 2888, 2889, 2890, 2891, 2892, 2893, 2894, 2895, 2896, 2897, 2898, 2899, 2900, 2901, 2902, 2903],

    "bones": [],

    "boneWeights": [],

    "boneIndices": [],

    "animations": {}
};
/* unused harmony default export */ var _unused_webpack_default_export = (monkeyData);


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

module.exports = {"vertices":[-1000,999.999939,-1000.000122,-1000,1000.000122,999.999939,-1000,-999.999939,1000.000122,-1000,1000.000122,999.999939,1000,1000.000122,999.999939,1000,-999.999939,1000.000122,1000,1000.000122,999.999939,1000,999.999939,-1000.000122,1000,-1000.000122,-999.999939,1000,999.999939,-1000.000122,-1000,999.999939,-1000.000122,-1000,-1000.000122,-999.999939,1000,999.999939,-1000.000122,1000,1000.000122,999.999939,-1000,1000.000122,999.999939,-1000,-1000.000122,-999.999939,-1000,-999.999939,1000.000122,1000,-999.999939,1000.000122,-1000,-1000.000122,-999.999939,-1000,999.999939,-1000.000122,-1000,-999.999939,1000.000122,-1000,-999.999939,1000.000122,-1000,1000.000122,999.999939,1000,-999.999939,1000.000122,1000,-999.999939,1000.000122,1000,1000.000122,999.999939,1000,-1000.000122,-999.999939,1000,-1000.000122,-999.999939,1000,999.999939,-1000.000122,-1000,-1000.000122,-999.999939,-1000,999.999939,-1000.000122,1000,999.999939,-1000.000122,-1000,1000.000122,999.999939,1000,-1000.000122,-999.999939,-1000,-1000.000122,-999.999939,1000,-999.999939,1000.000122],"normals":[0.577349,-0.577349,0.577349,0.577349,-0.577349,-0.577349,0.577349,0.577349,-0.577349,0.577349,-0.577349,-0.577349,-0.577349,-0.577349,-0.577349,-0.577349,0.577349,-0.577349,-0.577349,-0.577349,-0.577349,-0.577349,-0.577349,0.577349,-0.577349,0.577349,0.577349,-0.577349,-0.577349,0.577349,0.577349,-0.577349,0.577349,0.577349,0.577349,0.577349,-0.577349,-0.577349,0.577349,-0.577349,-0.577349,-0.577349,0.577349,-0.577349,-0.577349,0.577349,0.577349,0.577349,0.577349,0.577349,-0.577349,-0.577349,0.577349,-0.577349,0.577349,0.577349,0.577349,0.577349,-0.577349,0.577349,0.577349,0.577349,-0.577349,0.577349,0.577349,-0.577349,0.577349,-0.577349,-0.577349,-0.577349,0.577349,-0.577349,-0.577349,0.577349,-0.577349,-0.577349,-0.577349,-0.577349,-0.577349,0.577349,0.577349,-0.577349,0.577349,0.577349,-0.577349,-0.577349,0.577349,0.577349,0.577349,0.577349,0.577349,-0.577349,0.577349,-0.577349,-0.577349,0.577349,0.577349,-0.577349,-0.577349,-0.577349,0.577349,0.577349,0.577349,0.577349,0.577349,-0.577349,0.577349,-0.577349],"colors":[],"uvs":[0.333578,0.499511,0.666422,0.499511,0.666422,0.000245,0.666422,0.999266,0.666422,0.5,0.333578,0.5,0.333089,0.5,0.000245,0.5,0.000245,0.999266,0.333089,0.000245,0.000245,0.000245,0.000245,0.499511,0.999755,0.499511,0.999755,0.000245,0.666911,0.000245,0.666911,0.5,0.666911,0.999266,0.999755,0.999266,0.333578,0.000245,0.333578,0.499511,0.666422,0.000245,0.333578,0.999266,0.666422,0.999266,0.333578,0.5,0.333089,0.999266,0.333089,0.5,0.000245,0.999266,0.333089,0.499511,0.333089,0.000245,0.000245,0.499511,0.666911,0.499511,0.999755,0.499511,0.666911,0.000245,0.999755,0.5,0.666911,0.5,0.999755,0.999266],"faces":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35],"bones":[],"boneWeights":[],"boneIndices":[],"animations":{}}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_object_game_object__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hud_hud__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_collision_utils__ = __webpack_require__(2);

const SQR_MAGNITUDE_ALLOWED_ABOVE_SURFACE = 4;
const EDGE_COLLISION_DAMP_FACTOR = 0.2;
const EDGE_COLLISION_PADDING_ROTATION = 0.5;
const STEER_SPEED = 0.02;

const SNOWBOARD_RESTITUTION = 0.48;
const SNOWBOARD_FRICTION = [0.187,0.01,0.187,1];
const BREAK_FRICTION = [0.187,0.12,0.187];


window.MathUtils = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__;


class Character extends __WEBPACK_IMPORTED_MODULE_0__game_object_game_object__["a" /* default */]{
  constructor(mesh, boundingBox, slope, transformationMatrix = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["identityMatrix4"]){
    super(mesh, transformationMatrix);
    this.mesh = mesh;
    this.boundingBox = boundingBox;
    this.speed = 0.2;
    this.fallSpeed = 0.15;
    this.slope = slope;
    this.currentSegmentNumber = 0;
    this.input = {left: false, right: false, back: false}
    this.velocity = [0,1,0];
    this.angularVelocityAxis = [0,0,1,0];
    this.angularVelocityAngle = 0;
    this.friction = SNOWBOARD_FRICTION;
    this.restitution = SNOWBOARD_RESTITUTION;
    this.boxDimensions = [0.5,5,0.5];
    this.capsuleRadius = 2;
    this.setPosition([0,0,16]);
    this.name = "snowboarder";
    this.currentAnimation = "right";
    this.currentAnimationFrame = 0;
    window.character = this;

  }

  update(){
    this._ensureAboveSurface();
    this._handleControls();
    this._getSurfaceData();
    this._moveForward();
    const surfaceOffset = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["subtractVectors"]
      (this.getPosition(),this.surfacePoint);
    const distanceFromSurface = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["vectorSquareMag"](surfaceOffset);

    this.velocity[2] -= this.fallSpeed;
    if(distanceFromSurface < this.capsuleRadius){
      this._planeAlign();
      this.velocity = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["projectVectorOntoPlane"](this.velocity, this.transformDirection([0,0,1]));
      let localVelocity = this.inverseTransformDirection(this.velocity);
      this._applyFriction(localVelocity);
      this.velocity = this.transformDirection(localVelocity);
    }
    super.update();
  }
  
  _getSurfaceData(){
    let localDownVector = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["multiplyVec4ByMatrix4"](
      this.slope.segmentMatrices[this.currentSegmentNumber],
      [0,0,-1,0]
    );
    let newFloorTriangle = this.slope.getSurroundingTriangle(this.getPosition(),this.currentSegmentNumber);
    this.floorTriangle = newFloorTriangle || this.floorTriangle;
    this.surfacePlaneNormal = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["planeNormal"](this.floorTriangle[0], this.floorTriangle[1],
      this.floorTriangle[2]);
    this.surfacePoint = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["vectorTriangleIntersection"](this.getPosition(),
     __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["multiplyVec4ByMatrix4"](this.slope.segmentMatrices[this.currentSegmentNumber],[0,0,-1,0]),
     this.floorTriangle[0], this.floorTriangle[1], this.floorTriangle[2]);
  }
  _ensureAboveSurface(){
    if(!this.floorTriangle) return;
    if(!__WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["pointIsAbovePlane"](this.getPosition(), this.floorTriangle[0],
        this.floorTriangle[1], this.floorTriangle[2])){
        const upVector = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["multiplyVec4ByMatrix4"](
          this.slope.segmentMatrices[this.currentSegmentNumber],
          [0,0,1,0]);
        this.setPosition(__WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["vectorTriangleIntersection"](this.getPosition(),upVector,
            this.floorTriangle[0], this.floorTriangle[1], this.floorTriangle[2]));
    }
  }
  _planeAlign(){
    const surfaceNormalLocal = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["multiplyVec4ByMatrix4"](
        __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["inverse_mat4_rot_pos"](__WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["mat4RotationComponent"](
          this.getTransformationMatrix()
        )),
        this.surfacePlaneNormal.concat(1)
    );
    const planeAlignAxis = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["vectorCross"](
      surfaceNormalLocal.slice(0,3), [0,0,1]);
    const planeAlignAngle = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["angleBetweenVectors"]([0,0,1],
      surfaceNormalLocal.slice(0,3));
      this.addAngularVelocity(__WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["axisAngleToQuaternion"](
        planeAlignAxis, planeAlignAngle/5));
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
      __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["axisAngleToQuaternion"](
        this.transformDirection([0,0,1]),
      -1 * direction * STEER_SPEED)
    );
  }

  _handleControls(){
    if(this.input.left ? !this.input.right : this.input.right){
      if(this.input.right){
        this._steer(-1);
      }
      else{
        this._steer(1);
      }
    }
    if(this.input.back){
      this.friction = BREAK_FRICTION
    }
    else{
      this.friction = SNOWBOARD_FRICTION;
    }
  }
  _handleCollision(collisionData){
  
    this.velocity = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["scaleVector"](
      __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["bounceVectorOffPlane"](this.velocity,
        collisionData.normal),
      this.restitution
    );
    // this.velocity = MathUtils.scaleVector(MathUtils.vectorNormalize(collisionData.normal),
    // MathUtils.vectorMag(this.velocity)); 
    
    // let pushBackVector = MathUtils.vectorNormalize(collisionData.normal);
    // pushBackVector = MathUtils.scaleVector(pushBackVector, 2);
    // this.setPosition(MathUtils.addVectors(this.getPosition(),
    //   pushBackVector));
    // const collisionOffsetVector = MathUtils.subtractVectors(
    //   collisionData.colliderPoint.slice(0,3),
    //   this.getPosition()
    // );
     let addAngularVelocAngle = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["angleBetweenVectors"](
      this.velocity,
       __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["scaleVector"](collisionData.normal, -1)
    );

     addAngularVelocAngle /= 15;
     addAngularVelocAngle *= __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["vectorMag"](this.velocity);
     const addAngularVelocAxis = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["vectorCross"](
      this.velocity,
      __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["scaleVector"](collisionData.normal, -1)
     );
     this.addAngularVelocity(__WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["axisAngleToQuaternion"](
       addAngularVelocAxis, addAngularVelocAngle)
     );
  }
  _handleEdgeCollision(collisionData){
   this._handleCollision(collisionData);
  };
  _handleTreeCollision(collisionData){
    collisionData.normal = collisionData.sphereNormal;
    this._handleCollision(collisionData);
  }
  _moveForward(){
    const edgeCollisionData = this.slope.boxIsBeyondEdge(
      this.getTransformationMatrix(), this.boxDimensions, this.currentSegmentNumber);
    const capsulePoint0 = this.getPosition();
    const capsulePoint1 = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["addVectors"](this.getPosition(), this.velocity);
    const obstacleCollisionData = this.slope.capsuleCollidesWithObstacle(capsulePoint0,
    capsulePoint1,this.capsuleRadius,this.currentSegmentNumber);
    const balloonCount = this.slope.capsuleCollidesWithBalloons(capsulePoint0, capsulePoint1,
      this.capsuleRadius,this.currentSegmentNumber);
    if(balloonCount > 0){
      __WEBPACK_IMPORTED_MODULE_2__hud_hud__["a" /* addPoints */](balloonCount);
    }
    __WEBPACK_IMPORTED_MODULE_2__hud_hud__["c" /* updateSpeed */](__WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["vectorMag"](this.velocity)*8);
    // this.slope.boxCollidesWithObstacle(
    //   this.getTransformationMatrix(), this.boxDimensions,
    //   this.velocity, this.currentSegmentNumber);

    if(edgeCollisionData){
      this._handleEdgeCollision(edgeCollisionData);
      return;
    }
    else if(obstacleCollisionData){
      this._handleTreeCollision(obstacleCollisionData);
    }
    let nextWorldPos = __WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["addVectors"](__WEBPACK_IMPORTED_MODULE_1__utils_math_utils__["projectVectorOntoPlane"](
      this.velocity, this.surfacePlaneNormal), this.getPosition());
    if(this.currentSegmentNumber < this.slope.segmentMatrices.length -1 &&
      slope.positionIsPastSegmentStart(nextWorldPos,
      this.currentSegmentNumber + 1)){
      ++this.currentSegmentNumber;
      if(this.slope.notifyOfCharacterSegmentNumber(this.currentSegmentNumber)){
        --this.currentSegmentNumber;
      }
      let triangleAfterMove = this.slope.getSurroundingTriangle(nextWorldPos,
         this.currentSegmentNumber) || this.floorTriangle;
    }
    else if (this.currentSegmentNumber > 0 && !slope.positionIsPastSegmentStart(nextWorldPos,this.currentSegmentNumber)) {
      --this.currentSegmentNumber;
      let triangleAfterMove = this.slope.getSurroundingTriangle(nextWorldPos,
         this.currentSegmentNumber) || this.floorTriangle;
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Character;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tree_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__balloon__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_object_game_object__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_collision_utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__game_object_mesh__ = __webpack_require__(3);
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
const TREE_COLLIDER_HEIGHT = 30;
const TREE_COLLIDER_WIDTH = 0.7;
const TREE_COLLIDER_DEPTH = 0.7;
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








class Slope extends __WEBPACK_IMPORTED_MODULE_2__game_object_game_object__["a" /* default */]{

  constructor(transformationMatrix = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["identityMatrix4"], rasterizer, img_src = "snow.jpg"){
    super(undefined);
    this._transformationMatrix = transformationMatrix.slice(0,16);
    this.mesh = new __WEBPACK_IMPORTED_MODULE_5__game_object_mesh__["a" /* default */]({
      faces: [],
      vertices: [],
      textured: true,
      img_src,
      uvs: [], rasterizer
    });

    this.rasterizer = rasterizer;
    this.currentTurn = "none";
    this.bufferedSegments = 0;
    this.uvH = 0;
    this.segmentMatrices = [transformationMatrix];
    this.segmentRotation = [-0.25,0,0];
    this.segmentPosition = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["multiplyVec4ByMatrix4"](transformationMatrix,
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
      unpackedVertices = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["multiplyVec4ByMatrix4"](
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
    this.sideGeometry = [];
    this.currentSideGeometryType = TREE_SEGMENT;
    this.treesCreatedSinceStart = 0;
    __WEBPACK_IMPORTED_MODULE_0__tree_js__["a" /* default */].textureBuffer = this.rasterizer.bufferTexture("tree.png");
    __WEBPACK_IMPORTED_MODULE_0__tree_js__["a" /* default */].textured = true;
    this.treeMesh= new __WEBPACK_IMPORTED_MODULE_5__game_object_mesh__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__tree_js__["a" /* default */]);
    this.treeMesh.buffers = this.rasterizer.sendMeshToGPU(this.treeMesh);
  }
  _setupBalloonMesh(){
    this.balloonMesh = new __WEBPACK_IMPORTED_MODULE_5__game_object_mesh__["a" /* default */](__WEBPACK_IMPORTED_MODULE_1__balloon__["a" /* default */]);
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
        transformationMatrix = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["mat_4_multiply"](
          __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["translationMatrix"](leftRightToggle * SEGMENT_WIDTH/2, 0, 0),
          transformationMatrix
        );
        let treeObject;
        for(let i = 0; i < TREES_PER_SEGMENT; ++i){
          transformationMatrix =
          __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["mat_4_multiply"](
            __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["translationMatrix"](0, SEGMENT_LENGTH * i / TREES_PER_SEGMENT, 0,1),
            transformationMatrix );
          treeObject = new __WEBPACK_IMPORTED_MODULE_2__game_object_game_object__["a" /* default */](this.treeMesh,transformationMatrix);
          treeObject.id = `tree${this.treesCreatedSinceStart}`;
          this.rasterizer.objects[treeObject.id] = treeObject;
          ++this.treesCreatedSinceStart;
          trees.push(treeObject);
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
        delete this.rasterizer.objects[treesSeg.trees[i].id];
      }
    }
  }
  _addObstacleSegment(){
    const obstacleSegment =[];
    const transformationMatrix =
    __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["mat_4_multiply"](
      __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["translationMatrix"](0, -SEGMENT_LENGTH/TREES_PER_SEGMENT, 0,1),
      this.segmentMatrices[this.segmentMatrices.length -1]);
    if(this.segmentsSinceStart > BEGINNING_NO_OBSTACLE_SEGMENTS && Math.random() < TREE_PROBABILITY_LENGTHWISE){
        const segment = 0;
        const widthWiseCount = Math.floor(Math.random()*
          TREE_MAX_DENSITY_WIDTHWISE);
        let id, gameObject, treeTransformation;
        for(let i = 0; i < widthWiseCount; ++i){
          treeTransformation = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["mat_4_multiply"](
            __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["translationMatrix"]((Math.random() * 0.8 + 0.1) * SEGMENT_WIDTH -SEGMENT_WIDTH/2,
             Math.random()* SEGMENT_LENGTH, 0),
             transformationMatrix
          );
          gameObject = new __WEBPACK_IMPORTED_MODULE_2__game_object_game_object__["a" /* default */](this.treeMesh, treeTransformation);
          id = `treeObstacle${this.treesCreatedSinceStart}`;
          gameObject.id = id;
          gameObject.collider = {type: BOX_COLLIDER, dimensions:[
            TREE_COLLIDER_WIDTH, TREE_COLLIDER_DEPTH, TREE_COLLIDER_HEIGHT,]};
          obstacleSegment.push(gameObject);
          this.rasterizer.objects[id] = gameObject;
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
        transformationMatrix = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["mat_4_multiply"](
          __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["translationMatrix"](Math.random() * SEGMENT_WIDTH - SEGMENT_WIDTH/2,
           SEGMENT_LENGTH/2, BALLOON_FLOAT_HEIGHT),
          this.segmentMatrices[this.segmentMatrices.length - 1]
        );
        newBalloon = new __WEBPACK_IMPORTED_MODULE_2__game_object_game_object__["a" /* default */](this.balloonMesh, transformationMatrix);
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
    const segmentStartLine = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["multiplyVec4ByMatrix4"](
      __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["mat4RotationComponent"](this.segmentMatrices[segmentNumber]),
        [-1,0,0,1]);
    const segmentStartNormal = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["vectorCross"]([0,0,1],
       segmentStartLine);
    const offsetVector = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["subtractVectors"](
         pos, __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["mat4TranslationComponent"](this.segmentMatrices[segmentNumber]));
    const result = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["vectorDot"](offsetVector, segmentStartNormal);
    return result < 0;
  }

  boxCollidesWithObstacle(boxMatrix, boxDimensions, movement, segment_number){
    let obstacle;
    let collisionData;
    for(let i = 0; i < this.obstacles[segment_number].length; ++i){
      obstacle = this.obstacles[segment_number][i];
      collisionData = __WEBPACK_IMPORTED_MODULE_4__utils_collision_utils__["b" /* movingBoxIntersectsBox */](
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
      collisionData = __WEBPACK_IMPORTED_MODULE_4__utils_collision_utils__["c" /* sphereCollidesCapsule */](__WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["mat4TranslationComponent"](
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
      if(__WEBPACK_IMPORTED_MODULE_4__utils_collision_utils__["c" /* sphereCollidesCapsule */](this.balloons[segment_number][key].getPosition(),
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
      transformedPosition = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["multiplyVec4ByMatrix4"](
        __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["inverse_mat4_rot_pos"](
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
          __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["multiplyVec4ByMatrix4"](object.position.concat(1),
            __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["inverse_mat4_rot_pos"](
              this.matrices[nextSegmentNumber]));
  }

  getSurroundingTriangle(pos, segmentNumber){
    const startIdx = 6 * EDGE_LOOP_RESOLUTION * segmentNumber;
    const vertex = this.mesh.packedVertex.bind(this.mesh);
    const inverseSegmentTransform = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["inverse_mat4_rot_pos"](
      this.segmentMatrices[segmentNumber]
    );
    const transformedPosition = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["multiplyVec4ByMatrix4"](
      inverseSegmentTransform,
      pos.concat(1)
    );
    let transformedTriangle;
    for(let i = startIdx; i < startIdx + 6 * EDGE_LOOP_RESOLUTION - 1; i+=3){
      transformedTriangle = []
      for(let j = 0; j < 3; ++j){
        transformedTriangle.push(
          __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["multiplyVec4ByMatrix4"](
            inverseSegmentTransform,
          vertex(this.mesh.faces[i+j]).concat(1))
        );
      }
      if(__WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["triangleContainsPoint"](transformedPosition, transformedTriangle[0],
        transformedTriangle[1],transformedTriangle[2])){
          return [vertex(this.mesh.faces[i]),
            vertex(this.mesh.faces[i + 1]), vertex(this.mesh.faces[i + 2])];
      }
    }
  }

  _boxIsBeyondEdge(boxMatrix, boxDimensions, segmentNumber, toggleLeft){
    const checkPoints = __WEBPACK_IMPORTED_MODULE_4__utils_collision_utils__["a" /* boxColliderToPoints */](boxMatrix, boxDimensions);
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
    const currentSegPoint = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["multiplyVec4ByMatrix4"](
      this.segmentMatrices[segmentNumber],
      [xOffset, 0, 0, 1]

    );
    const nextSegPoint = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["multiplyVec4ByMatrix4"](
      this.segmentMatrices[segmentNumber + 1],
      [xOffset, 0, 0, 1]
    );
    let vec0, vec1;
    if(toggleLeft){
      vec0 = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["subtractVectors"](nextSegPoint, currentSegPoint);
      vec1 = [0,0,1];
    }
    else{
      vec1 = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["subtractVectors"](nextSegPoint, currentSegPoint);
      vec0 = [0,0,1];
    }
    const edgeNormal = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["vectorCross"](vec0, vec1);
    const posOffset = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["subtractVectors"](pos, currentSegPoint);
    if(__WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["vectorDot"](posOffset, edgeNormal) < 0){
      let edgeVector =  toggleLeft? vec0: vec1;
      return{normal: edgeNormal, colliderPoint: pos,
         vector: edgeVector, edgePoint0: currentSegPoint,
        edgePoint1: nextSegPoint, toggleLeft};
    }
    return false;
  }

  generateSegment(){
    const pos = this.segmentPosition;
    this.generateNewSegmentRotation();

    let transformationMatrix = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["translationMatrix"](
      pos[0], pos[1], pos[2]
    );
    let xRot = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["xRotationMatrix"](this.segmentRotation[0]);
    if(Math.random()<= CLIFF_PROBABILITY){
      xRot = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["xRotationMatrix"](-Math.PI/3);
    }
    let yRot = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["yRotationMatrix"](this.segmentRotation[1]);
    let zRot = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["zRotationMatrix"](this.segmentRotation[2]);
    transformationMatrix = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["mat_4_multiply"](
      yRot,
      __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["mat_4_multiply"](
        xRot,
        __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["mat_4_multiply"](
          zRot,
          transformationMatrix
        )
      )
    );
    this.segmentPosition = __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["multiplyVec4ByMatrix4"](transformationMatrix,
       [0, SEGMENT_LENGTH, 0,1]);

     let newSegment = this.createEdgeLoop();
    // let transformedSegment = MathUtils.addVectors(newSegment, this.segmentPosition);
     let transformedSegment = [];
     let transformedPos;
     for(let i = 0; i < newSegment.length; i +=3){
       transformedPos = newSegment.slice(i, i+3);
       transformedPos.push(1);
       transformedPos =  __WEBPACK_IMPORTED_MODULE_3__utils_math_utils__["multiplyVec4ByMatrix4"](transformationMatrix,transformedPos);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Slope;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    "vertices": [1.557284, -4.881069, 1.220433, -2.305502, -4.881067, 1.220433, 0.265122, -1.595123, 15.595764, 5.357604, 3.060327, 2.000748, 1.557284, -4.881069, 1.220433, 0.265122, -1.595123, 15.595764, -2.305502, -4.881067, 1.220433, -5.014175, 2.409782, 3.088122, 0.265122, -1.595123, 15.595764, -0.217849, -0.647796, 18.588009, 0.149692, 0.434673, 18.588009, 0.149692, 0.434673, -2.595972, 0.149692, 0.434673, 18.588009, 0.517232, -0.647796, 18.588009, 0.517232, -0.647796, -2.595972, -0.217849, -0.647796, 18.588009, 0.517232, -0.647796, 18.588009, 0.149692, 0.434673, 18.588009, -0.217849, -0.647796, -2.595972, 0.517232, -0.647796, -2.595972, 0.517232, -0.647796, 18.588009, 1.835783, 2.397462, 16.168344, 1.178417, -2.402114, 16.409208, 0.074321, -0.154875, 22.801958, 1.178417, -2.402114, 16.409208, -1.606885, -2.66519, 16.403688, 0.074321, -0.154875, 22.801958, 1.557284, -4.881069, 9.418711, -2.552244, -6.14147, 10.179499, -1.606885, -2.66519, 16.403688, 3.756239, 2.69887, 10.140981, 1.557284, -4.881069, 9.418711, 1.178417, -2.402114, 16.409208, -5.047791, 2.294961, 10.932926, -2.981071, 2.698907, 16.168344, -1.606885, -2.66519, 16.403688, -1.606885, -2.66519, 16.403688, -2.981071, 2.698907, 16.168344, 0.074321, -0.154875, 22.801958, -0.217849, -0.647796, -2.595972, 0.149692, 0.434673, -2.595972, 0.517232, -0.647796, -2.595972, -2.118086, 4.178652, 1.220433, 1.7447, 4.17865, 1.220433, -0.825924, 1.598287, 15.595764, -5.918405, -2.057512, 2.000748, -2.118086, 4.178652, 1.220433, -0.825924, 1.598287, 15.595764, 1.7447, 4.17865, 1.220433, 4.453373, -1.546658, 3.088122, -0.825924, 1.598287, 15.595764, -2.396585, -1.536982, 16.168344, -1.739219, 2.231995, 16.409208, 0.060611, 0.03945, 22.883163, -1.739219, 2.231995, 16.409208, 1.046084, 2.438582, 16.403688, 0.060611, 0.03945, 22.883163, 1.991442, 5.168411, 10.179499, 1.046084, 2.438582, 16.403688, -1.739219, 2.231995, 16.409208, -4.317041, -1.77367, 10.140981, -2.118086, 4.178652, 9.418711, -1.739219, 2.231995, 16.409208, 4.486988, -1.456492, 10.932926, 2.420269, -1.773699, 16.168344, 1.046084, 2.438582, 16.403688, 1.046084, 2.438582, 16.403688, 2.420269, -1.773699, 16.168344, 0.060611, 0.03945, 22.883163, -0.217849, -0.647796, -2.595972, -0.217849, -0.647796, 18.588009, 0.149692, 0.434673, -2.595972, 0.149692, 0.434673, -2.595972, 0.149692, 0.434673, 18.588009, 0.517232, -0.647796, -2.595972, -0.217849, -0.647796, 18.588009, -0.217849, -0.647796, -2.595972, 0.517232, -0.647796, 18.588009, 1.178417, -2.402114, 16.409208, 1.557284, -4.881069, 9.418711, -1.606885, -2.66519, 16.403688, 1.835783, 2.397462, 16.168344, 3.756239, 2.69887, 10.140981, 1.178417, -2.402114, 16.409208, -2.552244, -6.14147, 10.179499, -5.047791, 2.294961, 10.932926, -1.606885, -2.66519, 16.403688, -2.118086, 4.178652, 9.418711, 1.991442, 5.168411, 10.179499, -1.739219, 2.231995, 16.409208, -2.396585, -1.536982, 16.168344, -4.317041, -1.77367, 10.140981, -1.739219, 2.231995, 16.409208, 1.991442, 5.168411, 10.179499, 4.486988, -1.456492, 10.932926, 1.046084, 2.438582, 16.403688],

    "normals": [-0.483688, 0.842769, -0.236122, 0.480911, 0.832118, -0.276193, -0.043703, 0.92346, -0.381115, -0.880398, 0.438948, -0.179449, -0.483688, 0.842769, -0.236122, -0.043703, 0.92346, -0.381115, 0.480911, 0.832118, -0.276193, 0.885617, 0.39256, -0.248085, -0.043703, 0.92346, -0.381115, -0.672292, -0.481735, 0.562059, 0.0, 0.839137, 0.54387, 0.0, 0.839137, -0.54387, 0.0, 0.839137, 0.54387, 0.672292, -0.481735, 0.562059, 0.672292, -0.481735, -0.562059, -0.672292, -0.481735, 0.562059, 0.672292, -0.481735, 0.562059, 0.0, 0.839137, 0.54387, -0.672292, -0.481735, -0.562059, 0.672292, -0.481735, -0.562059, 0.672292, -0.481735, 0.562059, -0.957732, 0.117985, -0.262307, -0.65627, 0.673482, -0.340129, -0.019562, 0.762871, -0.646229, -0.65627, 0.673482, -0.340129, 0.522965, 0.73104, -0.438185, -0.019562, 0.762871, -0.646229, -0.646443, 0.688803, -0.328013, 0.248054, 0.829218, -0.500809, 0.522965, 0.73104, -0.438185, -0.951964, 0.222114, -0.21073, -0.646443, 0.688803, -0.328013, -0.65627, 0.673482, -0.340129, 0.905881, 0.258431, -0.335429, 0.909146, 0.217292, -0.355266, 0.522965, 0.73104, -0.438185, 0.522965, 0.73104, -0.438185, 0.909146, 0.217292, -0.355266, -0.019562, 0.762871, -0.646229, -0.672292, -0.481735, -0.562059, 0.0, 0.839137, -0.54387, 0.672292, -0.481735, -0.562059, 0.452254, -0.869869, -0.196783, -0.451094, -0.860897, -0.235176, 0.035829, -0.950804, -0.307627, 0.831965, -0.528214, -0.169591, 0.452254, -0.869869, -0.196783, 0.035829, -0.950804, -0.307627, -0.451094, -0.860897, -0.235176, -0.846004, -0.477554, -0.237007, 0.035829, -0.950804, -0.307627, 0.942381, -0.145085, -0.30137, 0.647053, -0.669759, -0.364269, -0.060701, -0.809687, -0.583667, 0.647053, -0.669759, -0.364269, -0.517136, -0.753868, -0.405225, -0.060701, -0.809687, -0.583667, -0.318857, -0.868831, -0.378704, -0.517136, -0.753868, -0.405225, 0.647053, -0.669759, -0.364269, 0.935667, -0.291879, -0.198248, 0.636647, -0.733268, -0.238685, 0.647053, -0.669759, -0.364269, -0.887112, -0.328959, -0.32371, -0.906217, -0.27781, -0.318674, -0.517136, -0.753868, -0.405225, -0.517136, -0.753868, -0.405225, -0.906217, -0.27781, -0.318674, -0.060701, -0.809687, -0.583667, -0.672292, -0.481735, -0.562059, -0.672292, -0.481735, 0.562059, 0.0, 0.839137, -0.54387, 0.0, 0.839137, -0.54387, 0.0, 0.839137, 0.54387, 0.672292, -0.481735, -0.562059, -0.672292, -0.481735, 0.562059, -0.672292, -0.481735, -0.562059, 0.672292, -0.481735, 0.562059, -0.65627, 0.673482, -0.340129, -0.646443, 0.688803, -0.328013, 0.522965, 0.73104, -0.438185, -0.957732, 0.117985, -0.262307, -0.951964, 0.222114, -0.21073, -0.65627, 0.673482, -0.340129, 0.248054, 0.829218, -0.500809, 0.905881, 0.258431, -0.335429, 0.522965, 0.73104, -0.438185, 0.636647, -0.733268, -0.238685, -0.318857, -0.868831, -0.378704, 0.647053, -0.669759, -0.364269, 0.942381, -0.145085, -0.30137, 0.935667, -0.291879, -0.198248, 0.647053, -0.669759, -0.364269, -0.318857, -0.868831, -0.378704, -0.887112, -0.328959, -0.32371, -0.517136, -0.753868, -0.405225],

    "colors": [],

    "uvs": [0.478762, 0.015432, 0.731847, 0.015432, 0.478762, 0.993737, 0.225678, 0.015432, 0.478762, 0.015432, 0.225678, 0.993737, 0.731847, 0.015432, 0.984932, 0.015432, 0.731847, 0.993737, 0.15441, 0.171148, 0.15441, -0.011232, 0.15441, -0.011232, 0.009955, -0.011232, 0.009955, 0.171148, 0.009955, 0.171148, 0.15441, 0.171148, 0.009955, 0.171148, 0.15441, -0.011232, 0.15441, 0.171148, 0.009955, 0.171148, 0.009955, 0.171148, 0.225678, 0.504585, 0.478762, 0.504584, 0.225678, 0.993737, 0.478762, 0.504584, 0.731847, 0.504585, 0.478762, 0.993737, 0.478762, 0.015432, 0.731847, 0.015432, 0.731847, 0.504585, 0.225678, 0.015432, 0.478762, 0.015432, 0.478762, 0.504584, 0.984932, 0.015432, 0.984932, 0.504585, 0.731847, 0.504585, 0.731847, 0.504585, 0.984932, 0.504585, 0.731847, 0.993737, 0.15441, 0.171148, 0.009955, -0.011232, 0.009955, 0.171148, 0.478762, 0.015432, 0.731847, 0.015432, 0.478762, 0.993737, 0.225678, 0.015432, 0.478762, 0.015432, 0.225678, 0.993737, 0.731847, 0.015432, 0.984932, 0.015432, 0.731847, 0.993737, 0.225678, 0.504585, 0.478762, 0.504584, 0.225678, 0.993737, 0.478762, 0.504584, 0.731847, 0.504585, 0.478762, 0.993737, 0.731847, 0.015432, 0.731847, 0.504585, 0.478762, 0.504584, 0.225678, 0.015432, 0.478762, 0.015432, 0.478762, 0.504584, 0.984932, 0.015432, 0.984932, 0.504585, 0.731847, 0.504585, 0.731847, 0.504585, 0.984932, 0.504585, 0.731847, 0.993737, 0.15441, 0.171148, 0.15441, 0.171148, 0.15441, -0.011232, 0.009955, -0.011232, 0.009955, -0.011232, 0.009955, 0.171148, 0.15441, 0.171148, 0.15441, 0.171148, 0.009955, 0.171148, 0.478762, 0.504584, 0.478762, 0.015432, 0.731847, 0.504585, 0.225678, 0.504585, 0.225678, 0.015432, 0.478762, 0.504584, 0.731847, 0.015432, 0.984932, 0.015432, 0.731847, 0.504585, 0.478762, 0.015432, 0.731847, 0.015432, 0.478762, 0.504584, 0.225678, 0.504585, 0.225678, 0.015432, 0.478762, 0.504584, 0.731847, 0.015432, 0.984932, 0.015432, 0.731847, 0.504585],

    "faces": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95],

    "bones": [],

    "boneWeights": [],

    "boneIndices": [],

    "animations": {}
});


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    "vertices": [-2.072248, 1.505576, -0.832262, -0.791528, 2.436073, -0.832262, -0.489191, 1.505576, -2.17889, -2.072248, 1.505576, 0.832262, -1.280719, 0.930497, 2.17889, -0.489191, 1.505576, 2.17889, -2.072248, 1.505576, 0.832262, -0.791528, 2.436074, 0.832262, -0.791528, 2.436073, -0.832262, -0.489191, 1.505576, -2.17889, -0.791528, 2.436073, -0.832262, 0.791528, 2.436073, -0.832262, -0.489191, 1.505576, 2.17889, 0.489192, 1.505576, 2.17889, 0.791529, 2.436074, 0.832262, -0.791528, 2.436074, 0.832262, 0.791529, 2.436074, 0.832262, 0.791528, 2.436073, -0.832262, 0.489192, 1.505576, -2.17889, 0.791528, 2.436073, -0.832262, 2.072248, 1.505576, -0.832262, 0.489192, 1.505576, 2.17889, 1.28072, 0.930497, 2.17889, 2.072248, 1.505576, 0.832262, 0.791528, 2.436073, -0.832262, 0.791529, 2.436074, 0.832262, 2.072248, 1.505576, 0.832262, 1.28072, 0.930497, -2.17889, 2.072248, 1.505576, -0.832262, 2.561439, 0.0, -0.832262, 1.28072, 0.930497, 2.17889, 1.583057, -0.0, 2.17889, 2.56144, 0.0, 0.832262, 2.072248, 1.505576, 0.832262, 2.56144, 0.0, 0.832262, 2.561439, 0.0, -0.832262, 1.240287, -0.150705, -2.729312, 2.561439, 0.0, -0.832262, 2.072248, -1.505576, -0.832262, 1.583057, -0.0, 2.17889, 1.28072, -0.930497, 2.17889, 2.072248, -1.505576, 0.832262, 2.56144, 0.0, 0.832262, 2.072248, -1.505576, 0.832262, 2.072248, -1.505576, -0.832262, 1.003413, -0.879727, -2.729312, 2.072248, -1.505576, -0.832262, 0.791529, -2.436073, -0.832262, 1.28072, -0.930497, 2.17889, 0.489192, -1.505576, 2.17889, 0.791529, -2.436073, 0.832262, 2.072248, -1.505576, 0.832262, 0.791529, -2.436073, 0.832262, 0.791529, -2.436073, -0.832262, 0.38327, -1.330288, -2.729312, 0.791529, -2.436073, -0.832262, -0.791528, -2.436073, -0.832262, 0.489192, -1.505576, 2.17889, -0.489191, -1.505576, 2.17889, -0.791528, -2.436073, 0.832262, 0.791529, -2.436073, 0.832262, -0.791528, -2.436073, 0.832262, -0.791528, -2.436073, -0.832262, -0.791528, -2.436073, -0.832262, -2.072247, -1.505576, -0.832262, -1.003413, -0.879728, -2.729312, -0.489191, -1.505576, 2.17889, -1.280719, -0.930497, 2.17889, -2.072247, -1.505576, 0.832262, -0.791528, -2.436073, 0.832262, -2.072247, -1.505576, 0.832262, -2.072247, -1.505576, -0.832262, 0.0, -0.150705, -3.299341, -1.240287, -0.150705, -2.729312, -1.280719, 0.930497, -2.17889, -2.561439, 0.0, -0.832262, -2.561439, -0.0, 0.832262, -2.072248, 1.505576, 0.832262, -1.583056, 0.0, 2.17889, 0.0, -0.0, 2.693256, -1.280719, 0.930497, 2.17889, -2.561439, 0.0, -0.832262, -2.072248, 1.505576, -0.832262, -1.280719, 0.930497, -2.17889, -1.583056, 0.0, 2.17889, -1.280719, 0.930497, 2.17889, -2.072248, 1.505576, 0.832262, 0.0, -0.150705, -3.299341, -1.280719, 0.930497, -2.17889, -0.489191, 1.505576, -2.17889, -1.280719, 0.930497, 2.17889, 0.0, -0.0, 2.693256, -0.489191, 1.505576, 2.17889, 0.0, -0.150705, -3.299341, -0.489191, 1.505576, -2.17889, 0.489192, 1.505576, -2.17889, -0.489191, 1.505576, 2.17889, 0.0, -0.0, 2.693256, 0.489192, 1.505576, 2.17889, 0.0, -0.150705, -3.299341, 0.489192, 1.505576, -2.17889, 1.28072, 0.930497, -2.17889, 0.489192, 1.505576, 2.17889, 0.0, -0.0, 2.693256, 1.28072, 0.930497, 2.17889, 0.0, -0.150705, -3.299341, 1.28072, 0.930497, -2.17889, 1.240287, -0.150705, -2.729312, 1.28072, 0.930497, 2.17889, 0.0, -0.0, 2.693256, 1.583057, -0.0, 2.17889, 0.0, -0.150705, -3.299341, 1.240287, -0.150705, -2.729312, 1.003413, -0.879727, -2.729312, 1.583057, -0.0, 2.17889, 0.0, -0.0, 2.693256, 1.28072, -0.930497, 2.17889, 0.0, -0.150705, -3.299341, 1.003413, -0.879727, -2.729312, 0.38327, -1.330288, -2.729312, 1.28072, -0.930497, 2.17889, 0.0, -0.0, 2.693256, 0.489192, -1.505576, 2.17889, 0.0, -0.150705, -3.299341, 0.38327, -1.330288, -2.729312, -0.383269, -1.330288, -2.729312, 0.489192, -1.505576, 2.17889, 0.0, -0.0, 2.693256, -0.489191, -1.505576, 2.17889, 0.0, -0.150705, -3.299341, -0.383269, -1.330288, -2.729312, -1.003413, -0.879728, -2.729312, -0.489191, -1.505576, 2.17889, 0.0, -0.0, 2.693256, -1.280719, -0.930497, 2.17889, -2.072247, -1.505576, -0.832262, -2.561439, 0.0, -0.832262, -1.240287, -0.150705, -2.729312, -1.280719, -0.930497, 2.17889, -1.583056, 0.0, 2.17889, -2.561439, -0.0, 0.832262, 0.0, -0.150705, -3.299341, -1.003413, -0.879728, -2.729312, -1.240287, -0.150705, -2.729312, -2.072247, -1.505576, -0.832262, -2.072247, -1.505576, 0.832262, -2.561439, -0.0, 0.832262, -1.280719, -0.930497, 2.17889, 0.0, -0.0, 2.693256, -1.583056, 0.0, 2.17889, 0.057702, 0.443236, -4.228172, 0.393527, -0.383082, -4.381704, -0.601891, -0.248365, -4.31964, 0.393527, -0.383082, -4.381704, 0.057702, 0.443236, -4.228172, 0.0, -0.150705, -3.299341, -0.601891, -0.248365, -4.31964, 0.393527, -0.383082, -4.381704, 0.0, -0.150705, -3.299341, -0.601891, -0.248365, -4.31964, 0.0, -0.150705, -3.299341, 0.057702, 0.443236, -4.228172, -1.280719, 0.930497, -2.17889, -2.072248, 1.505576, -0.832262, -0.489191, 1.505576, -2.17889, -0.791528, 2.436074, 0.832262, -2.072248, 1.505576, 0.832262, -0.489191, 1.505576, 2.17889, -2.072248, 1.505576, -0.832262, -2.072248, 1.505576, 0.832262, -0.791528, 2.436073, -0.832262, 0.489192, 1.505576, -2.17889, -0.489191, 1.505576, -2.17889, 0.791528, 2.436073, -0.832262, -0.791528, 2.436074, 0.832262, -0.489191, 1.505576, 2.17889, 0.791529, 2.436074, 0.832262, -0.791528, 2.436073, -0.832262, -0.791528, 2.436074, 0.832262, 0.791528, 2.436073, -0.832262, 1.28072, 0.930497, -2.17889, 0.489192, 1.505576, -2.17889, 2.072248, 1.505576, -0.832262, 0.791529, 2.436074, 0.832262, 0.489192, 1.505576, 2.17889, 2.072248, 1.505576, 0.832262, 2.072248, 1.505576, -0.832262, 0.791528, 2.436073, -0.832262, 2.072248, 1.505576, 0.832262, 1.240287, -0.150705, -2.729312, 1.28072, 0.930497, -2.17889, 2.561439, 0.0, -0.832262, 2.072248, 1.505576, 0.832262, 1.28072, 0.930497, 2.17889, 2.56144, 0.0, 0.832262, 2.072248, 1.505576, -0.832262, 2.072248, 1.505576, 0.832262, 2.561439, 0.0, -0.832262, 1.003413, -0.879727, -2.729312, 1.240287, -0.150705, -2.729312, 2.072248, -1.505576, -0.832262, 2.56144, 0.0, 0.832262, 1.583057, -0.0, 2.17889, 2.072248, -1.505576, 0.832262, 2.561439, 0.0, -0.832262, 2.56144, 0.0, 0.832262, 2.072248, -1.505576, -0.832262, 0.38327, -1.330288, -2.729312, 1.003413, -0.879727, -2.729312, 0.791529, -2.436073, -0.832262, 2.072248, -1.505576, 0.832262, 1.28072, -0.930497, 2.17889, 0.791529, -2.436073, 0.832262, 2.072248, -1.505576, -0.832262, 2.072248, -1.505576, 0.832262, 0.791529, -2.436073, -0.832262, -0.383269, -1.330288, -2.729312, 0.38327, -1.330288, -2.729312, -0.791528, -2.436073, -0.832262, 0.791529, -2.436073, 0.832262, 0.489192, -1.505576, 2.17889, -0.791528, -2.436073, 0.832262, 0.791529, -2.436073, -0.832262, 0.791529, -2.436073, 0.832262, -0.791528, -2.436073, -0.832262, -0.383269, -1.330288, -2.729312, -0.791528, -2.436073, -0.832262, -1.003413, -0.879728, -2.729312, -0.791528, -2.436073, 0.832262, -0.489191, -1.505576, 2.17889, -2.072247, -1.505576, 0.832262, -0.791528, -2.436073, -0.832262, -0.791528, -2.436073, 0.832262, -2.072247, -1.505576, -0.832262, -2.072248, 1.505576, -0.832262, -2.561439, 0.0, -0.832262, -2.072248, 1.505576, 0.832262, -1.240287, -0.150705, -2.729312, -2.561439, 0.0, -0.832262, -1.280719, 0.930497, -2.17889, -2.561439, -0.0, 0.832262, -1.583056, 0.0, 2.17889, -2.072248, 1.505576, 0.832262, -1.003413, -0.879728, -2.729312, -2.072247, -1.505576, -0.832262, -1.240287, -0.150705, -2.729312, -2.072247, -1.505576, 0.832262, -1.280719, -0.930497, 2.17889, -2.561439, -0.0, 0.832262, -2.561439, 0.0, -0.832262, -2.072247, -1.505576, -0.832262, -2.561439, -0.0, 0.832262],

    "normals": [-0.773614, 0.562059, -0.292459, -0.29548, 0.909452, -0.292459, -0.217444, 0.672048, -0.707816, -0.773614, 0.562059, 0.292459, -0.505814, 0.367473, 0.780419, -0.193182, 0.594623, 0.780419, -0.773614, 0.562059, 0.292459, -0.29548, 0.909452, 0.292459, -0.29548, 0.909452, -0.292459, -0.217444, 0.672048, -0.707816, -0.29548, 0.909452, -0.292459, 0.29548, 0.909452, -0.292459, -0.193182, 0.594623, 0.780419, 0.193182, 0.594623, 0.780419, 0.29548, 0.909452, 0.292459, -0.29548, 0.909452, 0.292459, 0.29548, 0.909452, 0.292459, 0.29548, 0.909452, -0.292459, 0.217444, 0.672048, -0.707816, 0.29548, 0.909452, -0.292459, 0.773614, 0.562059, -0.292459, 0.193182, 0.594623, 0.780419, 0.505814, 0.367473, 0.780419, 0.773614, 0.562059, 0.292459, 0.29548, 0.909452, -0.292459, 0.29548, 0.909452, 0.292459, 0.773614, 0.562059, 0.292459, 0.573962, 0.453322, -0.681906, 0.773614, 0.562059, -0.292459, 0.958647, 0.004791, -0.284524, 0.505814, 0.367473, 0.780419, 0.625202, 0.0, 0.780419, 0.956267, 0.0, 0.292459, 0.773614, 0.562059, 0.292459, 0.956267, 0.0, 0.292459, 0.958647, 0.004791, -0.284524, 0.638356, 0.067324, -0.766747, 0.958647, 0.004791, -0.284524, 0.781152, -0.562822, -0.270119, 0.625202, 0.0, 0.780419, 0.505814, -0.367473, 0.780419, 0.773614, -0.562059, 0.292459, 0.956267, 0.0, 0.292459, 0.773614, -0.562059, 0.292459, 0.781152, -0.562822, -0.270119, 0.549333, -0.406812, -0.72985, 0.781152, -0.562822, -0.270119, 0.299722, -0.9176, -0.260994, 0.505814, -0.367473, 0.780419, 0.193182, -0.594623, 0.780419, 0.29548, -0.909452, 0.292459, 0.773614, -0.562059, 0.292459, 0.29548, -0.909452, 0.292459, 0.299722, -0.9176, -0.260994, 0.211371, -0.658406, -0.722343, 0.299722, -0.9176, -0.260994, -0.299722, -0.9176, -0.260994, 0.193182, -0.594623, 0.780419, -0.193182, -0.594623, 0.780419, -0.29548, -0.909452, 0.292459, 0.29548, -0.909452, 0.292459, -0.29548, -0.909452, 0.292459, -0.299722, -0.9176, -0.260994, -0.299722, -0.9176, -0.260994, -0.781152, -0.562822, -0.270119, -0.549333, -0.406812, -0.72985, -0.193182, -0.594623, 0.780419, -0.505814, -0.367473, 0.780419, -0.773614, -0.562059, 0.292459, -0.29548, -0.909452, 0.292459, -0.773614, -0.562059, 0.292459, -0.781152, -0.562822, -0.270119, 0.007508, 0.086612, -0.996185, -0.638356, 0.067324, -0.766747, -0.573962, 0.453322, -0.681906, -0.958647, 0.004791, -0.284524, -0.956267, 0.0, 0.292459, -0.773614, 0.562059, 0.292459, -0.625202, 0.0, 0.780419, 0.0, 0.0, 1.0, -0.505814, 0.367473, 0.780419, -0.958647, 0.004791, -0.284524, -0.773614, 0.562059, -0.292459, -0.573962, 0.453322, -0.681906, -0.625202, 0.0, 0.780419, -0.505814, 0.367473, 0.780419, -0.773614, 0.562059, 0.292459, 0.007508, 0.086612, -0.996185, -0.573962, 0.453322, -0.681906, -0.217444, 0.672048, -0.707816, -0.505814, 0.367473, 0.780419, 0.0, 0.0, 1.0, -0.193182, 0.594623, 0.780419, 0.007508, 0.086612, -0.996185, -0.217444, 0.672048, -0.707816, 0.217444, 0.672048, -0.707816, -0.193182, 0.594623, 0.780419, 0.0, 0.0, 1.0, 0.193182, 0.594623, 0.780419, 0.007508, 0.086612, -0.996185, 0.217444, 0.672048, -0.707816, 0.573962, 0.453322, -0.681906, 0.193182, 0.594623, 0.780419, 0.0, 0.0, 1.0, 0.505814, 0.367473, 0.780419, 0.007508, 0.086612, -0.996185, 0.573962, 0.453322, -0.681906, 0.638356, 0.067324, -0.766747, 0.505814, 0.367473, 0.780419, 0.0, 0.0, 1.0, 0.625202, 0.0, 0.780419, 0.007508, 0.086612, -0.996185, 0.638356, 0.067324, -0.766747, 0.549333, -0.406812, -0.72985, 0.625202, 0.0, 0.780419, 0.0, 0.0, 1.0, 0.505814, -0.367473, 0.780419, 0.007508, 0.086612, -0.996185, 0.549333, -0.406812, -0.72985, 0.211371, -0.658406, -0.722343, 0.505814, -0.367473, 0.780419, 0.0, 0.0, 1.0, 0.193182, -0.594623, 0.780419, 0.007508, 0.086612, -0.996185, 0.211371, -0.658406, -0.722343, -0.211371, -0.658406, -0.722343, 0.193182, -0.594623, 0.780419, 0.0, 0.0, 1.0, -0.193182, -0.594623, 0.780419, 0.007508, 0.086612, -0.996185, -0.211371, -0.658406, -0.722343, -0.549333, -0.406812, -0.72985, -0.193182, -0.594623, 0.780419, 0.0, 0.0, 1.0, -0.505814, -0.367473, 0.780419, -0.781152, -0.562822, -0.270119, -0.958647, 0.004791, -0.284524, -0.638356, 0.067324, -0.766747, -0.505814, -0.367473, 0.780419, -0.625202, 0.0, 0.780419, -0.956267, 0.0, 0.292459, 0.007508, 0.086612, -0.996185, -0.549333, -0.406812, -0.72985, -0.638356, 0.067324, -0.766747, -0.781152, -0.562822, -0.270119, -0.773614, -0.562059, 0.292459, -0.956267, 0.0, 0.292459, -0.505814, -0.367473, 0.780419, 0.0, 0.0, 1.0, -0.625202, 0.0, 0.780419, 0.160131, 0.9523, -0.259651, 0.706992, -0.51561, -0.483993, -0.889126, -0.268899, -0.370281, 0.706992, -0.51561, -0.483993, 0.160131, 0.9523, -0.259651, 0.007508, 0.086612, -0.996185, -0.889126, -0.268899, -0.370281, 0.706992, -0.51561, -0.483993, 0.007508, 0.086612, -0.996185, -0.889126, -0.268899, -0.370281, 0.007508, 0.086612, -0.996185, 0.160131, 0.9523, -0.259651, -0.573962, 0.453322, -0.681906, -0.773614, 0.562059, -0.292459, -0.217444, 0.672048, -0.707816, -0.29548, 0.909452, 0.292459, -0.773614, 0.562059, 0.292459, -0.193182, 0.594623, 0.780419, -0.773614, 0.562059, -0.292459, -0.773614, 0.562059, 0.292459, -0.29548, 0.909452, -0.292459, 0.217444, 0.672048, -0.707816, -0.217444, 0.672048, -0.707816, 0.29548, 0.909452, -0.292459, -0.29548, 0.909452, 0.292459, -0.193182, 0.594623, 0.780419, 0.29548, 0.909452, 0.292459, -0.29548, 0.909452, -0.292459, -0.29548, 0.909452, 0.292459, 0.29548, 0.909452, -0.292459, 0.573962, 0.453322, -0.681906, 0.217444, 0.672048, -0.707816, 0.773614, 0.562059, -0.292459, 0.29548, 0.909452, 0.292459, 0.193182, 0.594623, 0.780419, 0.773614, 0.562059, 0.292459, 0.773614, 0.562059, -0.292459, 0.29548, 0.909452, -0.292459, 0.773614, 0.562059, 0.292459, 0.638356, 0.067324, -0.766747, 0.573962, 0.453322, -0.681906, 0.958647, 0.004791, -0.284524, 0.773614, 0.562059, 0.292459, 0.505814, 0.367473, 0.780419, 0.956267, 0.0, 0.292459, 0.773614, 0.562059, -0.292459, 0.773614, 0.562059, 0.292459, 0.958647, 0.004791, -0.284524, 0.549333, -0.406812, -0.72985, 0.638356, 0.067324, -0.766747, 0.781152, -0.562822, -0.270119, 0.956267, 0.0, 0.292459, 0.625202, 0.0, 0.780419, 0.773614, -0.562059, 0.292459, 0.958647, 0.004791, -0.284524, 0.956267, 0.0, 0.292459, 0.781152, -0.562822, -0.270119, 0.211371, -0.658406, -0.722343, 0.549333, -0.406812, -0.72985, 0.299722, -0.9176, -0.260994, 0.773614, -0.562059, 0.292459, 0.505814, -0.367473, 0.780419, 0.29548, -0.909452, 0.292459, 0.781152, -0.562822, -0.270119, 0.773614, -0.562059, 0.292459, 0.299722, -0.9176, -0.260994, -0.211371, -0.658406, -0.722343, 0.211371, -0.658406, -0.722343, -0.299722, -0.9176, -0.260994, 0.29548, -0.909452, 0.292459, 0.193182, -0.594623, 0.780419, -0.29548, -0.909452, 0.292459, 0.299722, -0.9176, -0.260994, 0.29548, -0.909452, 0.292459, -0.299722, -0.9176, -0.260994, -0.211371, -0.658406, -0.722343, -0.299722, -0.9176, -0.260994, -0.549333, -0.406812, -0.72985, -0.29548, -0.909452, 0.292459, -0.193182, -0.594623, 0.780419, -0.773614, -0.562059, 0.292459, -0.299722, -0.9176, -0.260994, -0.29548, -0.909452, 0.292459, -0.781152, -0.562822, -0.270119, -0.773614, 0.562059, -0.292459, -0.958647, 0.004791, -0.284524, -0.773614, 0.562059, 0.292459, -0.638356, 0.067324, -0.766747, -0.958647, 0.004791, -0.284524, -0.573962, 0.453322, -0.681906, -0.956267, 0.0, 0.292459, -0.625202, 0.0, 0.780419, -0.773614, 0.562059, 0.292459, -0.549333, -0.406812, -0.72985, -0.781152, -0.562822, -0.270119, -0.638356, 0.067324, -0.766747, -0.773614, -0.562059, 0.292459, -0.505814, -0.367473, 0.780419, -0.956267, 0.0, 0.292459, -0.958647, 0.004791, -0.284524, -0.781152, -0.562822, -0.270119, -0.956267, 0.0, 0.292459],

    "colors": [0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.933333, 0.623529, 0.690196, 0.678431, 0.141176, 0.141176, 0.690196, 0.152941, 0.156863, 0.933333, 0.623529, 0.690196, 0.913725, 0.007843, 0.062745, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.690196, 0.152941, 0.156863, 0.756863, 0.184314, 0.223529, 0.913725, 0.007843, 0.062745, 0.913725, 0.007843, 0.062745, 0.913725, 0.007843, 0.062745, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.756863, 0.184314, 0.223529, 0.682353, 0.145098, 0.14902, 0.921569, 0.003922, 0.062745, 0.678431, 0.141176, 0.141176, 0.913725, 0.007843, 0.062745, 0.921569, 0.003922, 0.062745, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.682353, 0.145098, 0.14902, 0.678431, 0.141176, 0.141176, 0.929412, 0.0, 0.058824, 0.921569, 0.003922, 0.062745, 0.929412, 0.0, 0.058824, 0.678431, 0.141176, 0.141176, 0.686275, 0.113725, 0.156863, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.929412, 0.0, 0.058824, 0.929412, 0.0, 0.058824, 0.929412, 0.0, 0.058824, 0.678431, 0.141176, 0.141176, 0.65098, 0.086275, 0.145098, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.92549, 0.0, 0.058824, 0.929412, 0.0, 0.058824, 0.92549, 0.0, 0.058824, 0.678431, 0.141176, 0.141176, 0.65098, 0.086275, 0.145098, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.964706, 0.384314, 0.411765, 0.92549, 0.0, 0.058824, 0.964706, 0.384314, 0.411765, 0.678431, 0.141176, 0.141176, 0.698039, 0.156863, 0.164706, 0.678431, 0.141176, 0.141176, 0.815686, 0.152941, 0.227451, 0.678431, 0.141176, 0.141176, 0.682353, 0.145098, 0.145098, 0.894118, 0.047059, 0.094118, 0.964706, 0.384314, 0.411765, 0.894118, 0.047059, 0.094118, 0.678431, 0.141176, 0.141176, 0.541176, 0.07451, 0.121569, 0.85098, 0.152941, 0.247059, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.929412, 0.0, 0.058824, 0.933333, 0.623529, 0.690196, 0.678431, 0.141176, 0.141176, 0.243137, 0.0, 0.015686, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.933333, 0.623529, 0.690196, 0.560784, 0.082353, 0.121569, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.243137, 0.0, 0.015686, 0.690196, 0.152941, 0.156863, 0.560784, 0.082353, 0.121569, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.690196, 0.152941, 0.156863, 0.243137, 0.0, 0.015686, 0.756863, 0.184314, 0.223529, 0.560784, 0.082353, 0.121569, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.756863, 0.184314, 0.223529, 0.243137, 0.0, 0.015686, 0.682353, 0.145098, 0.14902, 0.560784, 0.082353, 0.121569, 0.678431, 0.141176, 0.141176, 0.796078, 0.14902, 0.211765, 0.682353, 0.145098, 0.14902, 0.243137, 0.0, 0.015686, 0.678431, 0.141176, 0.141176, 0.541176, 0.07451, 0.121569, 0.690196, 0.098039, 0.164706, 0.65098, 0.086275, 0.145098, 0.678431, 0.141176, 0.141176, 0.243137, 0.0, 0.015686, 0.678431, 0.141176, 0.141176, 0.541176, 0.07451, 0.121569, 0.65098, 0.086275, 0.145098, 0.65098, 0.086275, 0.145098, 0.678431, 0.141176, 0.141176, 0.243137, 0.0, 0.015686, 0.678431, 0.141176, 0.141176, 0.541176, 0.07451, 0.121569, 0.65098, 0.086275, 0.145098, 0.85098, 0.152941, 0.247059, 0.678431, 0.141176, 0.141176, 0.243137, 0.0, 0.015686, 0.678431, 0.141176, 0.141176, 0.541176, 0.07451, 0.121569, 0.772549, 0.14902, 0.196078, 0.815686, 0.152941, 0.227451, 0.678431, 0.141176, 0.141176, 0.243137, 0.0, 0.015686, 0.682353, 0.145098, 0.145098, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.85098, 0.152941, 0.247059, 0.682353, 0.145098, 0.145098, 0.678431, 0.141176, 0.141176, 0.929412, 0.0, 0.058824, 0.541176, 0.07451, 0.121569, 0.815686, 0.152941, 0.227451, 0.85098, 0.152941, 0.247059, 0.678431, 0.141176, 0.141176, 0.890196, 0.027451, 0.07451, 0.929412, 0.0, 0.058824, 0.682353, 0.145098, 0.145098, 0.243137, 0.0, 0.015686, 0.678431, 0.141176, 0.141176, 0.239216, 0.0, 0.015686, 0.239216, 0.0, 0.015686, 0.239216, 0.0, 0.015686, 0.239216, 0.0, 0.015686, 0.239216, 0.0, 0.015686, 0.560784, 0.082353, 0.121569, 0.513726, 0.070588, 0.109804, 0.239216, 0.0, 0.015686, 0.541176, 0.07451, 0.121569, 0.239216, 0.0, 0.015686, 0.560784, 0.082353, 0.121569, 0.25098, 0.003922, 0.019608, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.913725, 0.007843, 0.062745, 0.933333, 0.623529, 0.690196, 0.690196, 0.152941, 0.156863, 0.678431, 0.141176, 0.141176, 0.933333, 0.623529, 0.690196, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.913725, 0.007843, 0.062745, 0.690196, 0.152941, 0.156863, 0.913725, 0.007843, 0.062745, 0.678431, 0.141176, 0.141176, 0.913725, 0.007843, 0.062745, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.913725, 0.007843, 0.062745, 0.756863, 0.184314, 0.223529, 0.921569, 0.003922, 0.062745, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.921569, 0.003922, 0.062745, 0.686275, 0.113725, 0.156863, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.921569, 0.003922, 0.062745, 0.682353, 0.145098, 0.14902, 0.929412, 0.0, 0.058824, 0.678431, 0.141176, 0.141176, 0.921569, 0.003922, 0.062745, 0.678431, 0.141176, 0.141176, 0.654902, 0.098039, 0.145098, 0.686275, 0.113725, 0.156863, 0.678431, 0.141176, 0.141176, 0.929412, 0.0, 0.058824, 0.678431, 0.141176, 0.141176, 0.929412, 0.0, 0.058824, 0.678431, 0.141176, 0.141176, 0.929412, 0.0, 0.058824, 0.678431, 0.141176, 0.141176, 0.65098, 0.086275, 0.145098, 0.65098, 0.086275, 0.145098, 0.678431, 0.141176, 0.141176, 0.929412, 0.0, 0.058824, 0.678431, 0.141176, 0.141176, 0.92549, 0.0, 0.058824, 0.678431, 0.141176, 0.141176, 0.929412, 0.0, 0.058824, 0.678431, 0.141176, 0.141176, 0.85098, 0.152941, 0.247059, 0.65098, 0.086275, 0.145098, 0.678431, 0.141176, 0.141176, 0.92549, 0.0, 0.058824, 0.678431, 0.141176, 0.141176, 0.964706, 0.384314, 0.411765, 0.678431, 0.141176, 0.141176, 0.92549, 0.0, 0.058824, 0.678431, 0.141176, 0.141176, 0.772549, 0.14902, 0.196078, 0.698039, 0.156863, 0.164706, 0.815686, 0.152941, 0.227451, 0.964706, 0.384314, 0.411765, 0.678431, 0.141176, 0.141176, 0.894118, 0.047059, 0.094118, 0.678431, 0.141176, 0.141176, 0.964706, 0.384314, 0.411765, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.933333, 0.623529, 0.690196, 0.85098, 0.152941, 0.247059, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.929412, 0.0, 0.058824, 0.678431, 0.141176, 0.141176, 0.933333, 0.623529, 0.690196, 0.815686, 0.152941, 0.227451, 0.678431, 0.141176, 0.141176, 0.85098, 0.152941, 0.247059, 0.890196, 0.027451, 0.07451, 0.682353, 0.145098, 0.145098, 0.929412, 0.0, 0.058824, 0.678431, 0.141176, 0.141176, 0.678431, 0.141176, 0.141176, 0.929412, 0.0, 0.058824],

    "uvs": [],

    "faces": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251],

    "bones": [],

    "boneWeights": [],

    "boneIndices": [],

    "animations": {}
});


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addPoints;
/* harmony export (immutable) */ __webpack_exports__["c"] = updateSpeed;
/* harmony export (immutable) */ __webpack_exports__["d"] = updateTime;
/* harmony export (immutable) */ __webpack_exports__["b"] = setStartTime;
const state = {time: 0, startTime: 0,
bestTime: 0, points: 0, speed: 0}

function addPoints(points){
    state.points += points;
    renderPoints();
};

function updateSpeed(speed){
    state.speed = Math.round(speed);
    renderSpeed();
}
function updateTime(time){
    state.time = time;
    renderTime();
}
function setStartTime(time){
    state.startTime = time;
}
function renderPoints(){
    document.querySelector(".hud-points_val").innerHTML = `${state.points}`;
};

function renderSpeed(){
    document.querySelector(".hud-speed_val").innerHTML = `${state.speed}`;
}

function renderTime(){
    const elapsed = state.time - state.startTime;
    document.querySelector(".hud-time_val").innerHTML =
    `${renderMinutes(elapsed)}'${renderSeconds(elapsed)}"${renderMilliseconds(elapsed)}`;
}

function renderMinutes(milliseconds){
    const minutes = Math.floor(milliseconds/60000);
    return `${minutes < 10 ? "0": ""}${minutes}`
}
function renderSeconds(milliseconds){
    const seconds = Math.floor((milliseconds% 60000)/1000);
    return `${seconds < 10 ? "0": ""}${seconds}`
}

function renderMilliseconds(milliseconds){
    const m = milliseconds % 1000;
    if(m < 10) return`00${m}`;
    else if(m < 100) return `0${m}`;
    else return `${m}`;
}

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

module.exports = {"uvs":[],"vertices":[-0.0037879,0.729358,-3.57311,-0.00378806,0.0340871,-3.56644,-0.699091,0.0340873,-3.56645,-0.699091,0.729359,-3.57311,-0.00378885,0.749076,-1.51651,-0.00378943,0.0538053,-1.50984,-0.699092,0.0538058,-1.50984,-0.699092,0.749077,-1.51651,-0.0168107,0.747445,-1.68664,-0.0168108,0.0521742,-1.67997,-0.712114,0.0521745,-1.67997,-0.712114,0.747446,-1.68664,-0.0168117,0.768922,0.553325,-0.0168122,0.0736504,0.559991,-0.712115,0.0736508,0.55999,-0.712115,0.768922,0.553324,0.777515,0.729358,-3.57311,0.777515,0.034087,-3.56644,0.0822114,0.0340872,-3.56644,0.0822118,0.729358,-3.57311,0.777514,0.749076,-1.51651,0.777513,0.0538051,-1.50984,0.0822102,0.0538056,-1.50984,0.0822106,0.749077,-1.51651,1.90635,0.91357,-0.250507,1.90635,-0.0863843,-0.24092,0.906345,-0.086384,-0.240921,0.906346,0.91357,-0.250508,1.90634,0.929119,1.37127,1.90634,-0.0708355,1.38086,0.906344,-0.0708347,1.38086,0.906344,0.929119,1.37127,-0.883972,1.34017,-0.0470643,-0.883972,0.340213,-0.0374769,-1.88397,0.340213,-0.0374784,-1.88397,1.34017,-0.0470662,-0.875093,0.929119,1.37127,-0.875094,-0.0708348,1.38086,-1.87509,-0.070834,1.38086,-1.87509,0.92912,1.37127,0.754533,0.918306,0.243404,0.754532,-0.0816484,0.252992,-0.754533,-0.081648,0.25299,-0.754533,0.918306,0.243403,0.754532,0.931874,1.65863,0.754531,-0.0680799,1.66821,-0.754534,-0.0680791,1.66821,-0.754534,0.931875,1.65862,1.92457,0.927548,1.20746,1.92457,-0.0724056,1.21705,0.924574,-0.0724053,1.21705,0.924575,0.927549,1.20746,1.92457,0.943305,2.85086,1.92457,-0.0566493,2.86045,0.924573,-0.0566486,2.86045,0.924574,0.943305,2.85086,-0.875093,0.927503,1.20265,-0.875093,-0.0724512,1.21223,-1.87509,-0.0724508,1.21223,-1.87509,0.927503,1.20264,-0.875094,0.943052,2.82442,-0.875094,-0.0569022,2.83401,-1.87509,-0.0569015,2.83401,-1.87509,0.943053,2.82442,0.754532,0.929417,1.40228,0.754532,-0.0705375,1.41187,-0.754534,-0.070537,1.41187,-0.754533,0.929417,1.40228,0.754532,0.942985,2.8175,0.75453,-0.0569689,2.82709,-0.754535,-0.0569681,2.82709,-0.754534,0.942986,2.8175,0.499998,0.944513,2.9768,0.499998,-0.0554413,2.98639,-0.500002,-0.055441,2.98639,-0.500001,0.944513,2.9768,0.499998,0.9541,3.97676,0.499997,-0.0458543,3.98634,-0.500003,-0.0458535,3.98634,-0.500002,0.9541,3.97675,0.777514,0.747445,-1.68663,0.777514,0.052174,-1.67997,0.0822104,0.0521743,-1.67997,0.0822107,0.747446,-1.68664,0.777513,0.768921,0.553326,0.777512,0.0736502,0.559992,0.0822091,0.0736507,0.559991,0.0822095,0.768922,0.553325,3.65468,1.57478,-3.78786,3.65468,-0.831993,-3.76479,-3.54163,-0.831991,-3.76479,-3.54163,1.57478,-3.78787,3.65468,1.57838,-3.41144,3.65467,-0.828385,-3.38837,-3.54163,-0.828382,-3.38837,-3.54163,1.57839,-3.41144],"faces":[160,1,3,0,0,0,0,0,0,0,160,7,5,4,1,1,1,2,2,2,160,4,1,0,2,2,2,2,2,2,160,5,2,1,3,3,3,0,0,0,160,6,3,2,4,4,4,0,0,0,160,0,7,4,5,5,5,0,0,0,160,9,11,8,6,6,6,0,0,0,160,15,13,12,7,7,7,0,0,0,160,12,9,8,8,8,8,2,2,2,160,9,14,10,9,9,9,2,2,2,160,14,11,10,10,10,10,0,0,0,160,8,15,12,11,11,11,0,0,0,160,17,19,16,12,12,12,0,0,0,160,23,21,20,13,13,13,2,2,2,160,20,17,16,14,14,14,2,2,2,160,17,22,18,15,15,15,0,0,0,160,22,19,18,16,16,16,0,0,0,160,16,23,20,17,17,17,2,2,2,160,24,26,27,18,18,18,2,2,2,160,31,29,28,19,19,19,0,0,0,160,28,25,24,20,20,20,2,2,2,160,25,30,26,21,21,21,2,2,2,160,30,27,26,22,22,22,0,0,0,160,24,31,28,23,23,23,0,0,0,160,33,35,32,24,24,24,0,0,0,160,39,37,36,25,25,25,0,0,0,160,36,33,32,26,26,26,0,0,0,160,33,38,34,27,27,27,3,4,5,160,38,35,34,28,28,28,4,6,5,160,32,39,36,29,29,29,0,0,0,160,41,43,40,30,30,30,0,0,0,160,47,45,44,31,31,31,2,2,2,160,44,41,40,32,32,32,2,2,2,160,41,46,42,33,33,33,2,2,2,160,46,43,42,34,34,34,0,0,0,160,40,47,44,35,35,35,0,0,0,160,49,51,48,36,36,36,0,0,0,160,55,53,52,37,37,37,2,2,7,160,52,49,48,38,38,38,7,2,2,160,49,54,50,39,39,39,2,2,2,160,54,51,50,40,40,40,0,0,0,160,48,55,52,41,41,41,0,0,0,160,57,59,56,42,42,42,0,0,0,160,63,61,60,43,43,43,8,2,9,160,60,57,56,44,44,44,0,0,0,160,57,62,58,45,45,45,0,0,0,160,62,59,58,46,46,46,7,10,11,160,56,63,60,47,47,47,12,8,9,160,65,67,64,48,48,48,0,0,0,160,71,69,68,49,49,49,13,2,7,160,68,65,64,50,50,50,0,0,0,160,65,70,66,51,51,51,2,7,2,160,70,67,66,52,52,52,0,0,0,160,64,71,68,53,53,53,0,0,0,160,73,75,72,54,54,54,0,0,0,160,79,77,76,55,55,55,14,7,15,160,76,73,72,56,56,56,0,0,0,160,73,78,74,57,57,57,2,16,2,160,78,75,74,58,58,58,16,13,2,160,72,79,76,59,59,59,0,0,0,160,81,83,80,60,60,60,0,0,0,160,87,85,84,61,61,61,2,2,2,160,84,81,80,62,62,62,2,2,2,160,81,86,82,63,63,63,2,2,2,160,86,83,82,64,64,64,0,0,0,160,80,87,84,65,65,65,0,0,0,160,89,91,88,66,66,66,0,0,0,160,95,93,92,67,67,67,2,17,18,160,92,89,88,68,68,68,18,19,20,160,93,90,89,69,69,69,17,2,19,160,94,91,90,70,70,70,0,0,0,160,88,95,92,71,71,71,0,0,0,160,1,2,3,72,72,72,0,0,0,160,7,6,5,73,73,73,2,2,2,160,4,5,1,74,74,74,2,2,2,160,5,6,2,75,75,75,0,0,0,160,6,7,3,76,76,76,0,0,0,160,0,3,7,77,77,77,0,0,0,160,9,10,11,78,78,78,0,0,0,160,15,14,13,79,79,79,0,0,0,160,12,13,9,80,80,80,2,2,2,160,9,13,14,81,81,81,2,2,2,160,14,15,11,82,82,82,0,0,0,160,8,11,15,83,83,83,0,0,0,160,17,18,19,84,84,84,0,0,0,160,23,22,21,85,85,85,2,2,2,160,20,21,17,86,86,86,2,2,2,160,17,21,22,87,87,87,0,0,0,160,22,23,19,88,88,88,0,0,0,160,16,19,23,89,89,89,2,2,2,160,24,25,26,90,90,90,2,2,2,160,31,30,29,91,91,91,0,0,0,160,28,29,25,92,92,92,2,2,2,160,25,29,30,93,93,93,2,2,2,160,30,31,27,94,94,94,0,0,0,160,24,27,31,95,95,95,0,0,0,160,33,34,35,96,96,96,0,0,0,160,39,38,37,97,97,97,0,0,0,160,36,37,33,98,98,98,0,0,0,160,33,37,38,99,99,99,3,21,4,160,38,39,35,100,100,100,4,22,6,160,32,35,39,101,101,101,0,0,0,160,41,42,43,102,102,102,0,0,0,160,47,46,45,103,103,103,2,2,2,160,44,45,41,104,104,104,2,2,2,160,41,45,46,105,105,105,2,2,2,160,46,47,43,106,106,106,0,0,0,160,40,43,47,107,107,107,0,0,0,160,49,50,51,108,108,108,0,0,0,160,55,54,53,109,109,109,2,2,2,160,52,53,49,110,110,110,7,2,2,160,49,53,54,111,111,111,2,2,2,160,54,55,51,112,112,112,0,0,0,160,48,51,55,113,113,113,0,0,0,160,57,58,59,114,114,114,0,0,0,160,63,62,61,115,115,115,8,7,2,160,60,61,57,116,116,116,0,0,0,160,57,61,62,117,117,117,0,0,0,160,62,63,59,118,118,118,7,8,10,160,56,59,63,119,119,119,12,10,8,160,65,66,67,120,120,120,0,0,0,160,71,70,69,121,121,121,13,7,2,160,68,69,65,122,122,122,0,0,0,160,65,69,70,123,123,123,2,2,7,160,70,71,67,124,124,124,0,0,0,160,64,67,71,125,125,125,0,0,0,160,73,74,75,126,126,126,0,0,0,160,79,78,77,127,127,127,14,16,7,160,76,77,73,128,128,128,0,0,0,160,73,77,78,129,129,129,2,7,16,160,78,79,75,130,130,130,16,14,13,160,72,75,79,131,131,131,0,0,0,160,81,82,83,132,132,132,0,0,0,160,87,86,85,133,133,133,2,2,2,160,84,85,81,134,134,134,2,2,2,160,81,85,86,135,135,135,2,2,2,160,86,87,83,136,136,136,0,0,0,160,80,83,87,137,137,137,0,0,0,160,89,90,91,138,138,138,0,0,0,160,95,94,93,139,139,139,2,7,17,160,92,93,89,140,140,140,18,17,19,160,93,94,90,141,141,141,17,7,2,160,94,95,91,142,142,142,0,0,0,160,88,91,95,143,143,143,0,0,0],"skinIndices":[11,0,11,0,11,0,11,0,11,0,11,0,11,0,11,0,10,7,10,0,10,7,10,7,7,10,7,10,10,7,10,7,9,0,9,0,9,0,9,0,9,0,9,0,9,0,9,0,4,0,4,0,4,0,4,0,4,0,4,0,4,0,4,0,6,0,6,0,6,0,6,0,6,0,6,0,6,0,6,0,7,0,7,0,7,0,7,0,7,0,7,0,7,0,7,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,3,0,5,0,5,0,5,0,5,0,5,0,5,0,5,0,5,0,1,7,1,7,1,7,7,1,1,0,1,0,1,7,1,7,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,8,0,8,0,8,0,8,0,8,7,7,8,7,8,8,7,12,11,12,11,12,11,12,11,12,11,12,11,12,11,12,11],"skinWeights":[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0.973308,0.00338325,0.975624,0,0.962704,0.0245921,0.962079,0.0258429,0.90341,0.0965904,0.875988,0.124012,0.879096,0.120904,0.881455,0.118545,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0.912809,0.087191,0.936508,0.063492,0.532342,0.467658,0.71695,0.28305,0.976508,0,0.982741,0,0.924228,0.0757717,0.912705,0.0872951,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0.991055,0,0.986477,0,0.982202,0,0.994865,0,0.680964,0.319036,0.548042,0.451958,0.855648,0.144352,0.864373,0.135627,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],"metadata":{"uvs":0,"vertices":96,"faces":144,"bones":13,"colors":23,"generator":"io_three","type":"Geometry","normals":144,"version":3},"bones":[{"parent":-1,"name":"root","pos":[-0.0980752,0.67258,1.46535],"rotq":[0,0,0,1]},{"parent":0,"name":"chest","pos":[-8.9407e-8,0.0015738,0.164151],"rotq":[0,0,0,1]},{"parent":1,"name":"head","pos":[-7.89762e-7,0.0140436,1.46474],"rotq":[0,0,0,1]},{"parent":1,"name":"arm.l","pos":[1.41295,0.00991476,1.03416],"rotq":[0,0,0,1]},{"parent":3,"name":"arm1.l","pos":[0.0180862,-0.0109016,-1.13708],"rotq":[0,0,0,1]},{"parent":1,"name":"arm.r","pos":[-1.41747,0.00991547,1.03416],"rotq":[0,0,0,1]},{"parent":5,"name":"arm1.r","pos":[0.0180862,-0.0109017,-1.13708],"rotq":[0,0,0,1]},{"parent":0,"name":"hips","pos":[-0.00753006,0.0028652,0.298835],"rotq":[0,0,0,1]},{"parent":7,"name":"leg.l","pos":[0.414465,-0.0108972,-1.13658],"rotq":[0,0,0,1]},{"parent":8,"name":"leg1.l","pos":[-0.00461566,-0.0194892,-2.03276],"rotq":[0,0,0,1]},{"parent":7,"name":"leg.r","pos":[-0.381307,-0.010897,-1.13658],"rotq":[0,0,0,1]},{"parent":10,"name":"leg1.r","pos":[-0.00461566,-0.0194892,-2.03276],"rotq":[0,0,0,1]},{"parent":0,"name":"board","pos":[0.00000264496,-0.0476404,-4.96892],"rotq":[0,0,0,1]}],"colors":[16777215,0,14373119,14639871,14573311,15240959,16242687,14373375,14640127,14639103,15774207,14707711,15308287,14505983,15041279,14707455,14440191,14639615,14773247,14840319,14973439,14439935,15708415],"influencesPerVertex":2,"animations":[{"fps":24,"hierarchy":[{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.0980752,0.67258,1.46535]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.0980752,0.67258,1.46535]}],"parent":-1},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-8.94074e-8,0.0015827,0.164151]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-8.94074e-8,0.0015827,0.164151]}],"parent":0},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-7.89762e-7,0.0140436,1.46474]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-7.89762e-7,0.0140436,1.46474]}],"parent":1},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[1.41295,0.0099266,1.03416]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[1.41295,0.0099266,1.03416]}],"parent":2},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[0.0180862,-0.0109016,-1.13708]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[0.0180862,-0.0109016,-1.13708]}],"parent":3},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-1.41747,0.00992643,1.03416]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-1.41747,0.00992643,1.03416]}],"parent":4},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[0.0180862,-0.0109017,-1.13708]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[0.0180862,-0.0109017,-1.13708]}],"parent":5},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.00753006,0.00287052,0.298835]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00753006,0.00287052,0.298835]}],"parent":6},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[0.414458,-0.0108979,-1.13658]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[0.414458,-0.0108979,-1.13658]}],"parent":7},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.00461566,-0.0194892,-2.03276]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00461566,-0.0194892,-2.03276]}],"parent":8},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.381301,-0.010898,-1.13658]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.381301,-0.010898,-1.13658]}],"parent":9},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.00461566,-0.0194892,-2.03276]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00461566,-0.0194892,-2.03276]}],"parent":10},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[0.00000264495,-0.0474956,-4.96892]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[0.00000264495,-0.0474956,-4.96892]}],"parent":11}],"name":"idle","length":0.0416667},{"fps":24,"hierarchy":[{"keys":[{"rot":[-0.0544338,-0.081196,0.805796,0.584069],"scl":[1,1,1],"time":0,"pos":[-5.54813,0.215896,0.924989]},{"rot":[0.116393,0.0853326,0.771145,0.620085],"scl":[1,1,1],"time":0.0416667,"pos":[-5.54813,0.215896,0.924989]}],"parent":-1},{"keys":[{"rot":[0.12865,-0.0775696,0.349412,0.924848],"scl":[1,1,1],"time":0,"pos":[-8.94074e-8,0.0015827,0.164151]},{"rot":[0.12865,-0.0775696,0.349412,0.924848],"scl":[1,1,1],"time":0.0416667,"pos":[-8.94074e-8,0.0015827,0.164151]}],"parent":0},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-7.89762e-7,0.0140436,1.46474]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-7.89762e-7,0.0140436,1.46474]}],"parent":1},{"keys":[{"rot":[0.322892,-0.0415969,-0.231565,0.916727],"scl":[1,1,1],"time":0,"pos":[1.41295,0.0099266,1.03416]},{"rot":[0.322892,-0.0415969,-0.231565,0.916727],"scl":[1,1,1],"time":0.0416667,"pos":[1.41295,0.0099266,1.03416]}],"parent":2},{"keys":[{"rot":[-0.119394,-0.00874016,-0.0424961,0.991899],"scl":[1,1,1],"time":0,"pos":[0.0180862,-0.0109016,-1.13708]},{"rot":[-0.119394,-0.00874016,-0.0424961,0.991899],"scl":[1,1,1],"time":0.0416667,"pos":[0.0180862,-0.0109016,-1.13708]}],"parent":3},{"keys":[{"rot":[0.0782291,0.141293,0.378302,0.911484],"scl":[1,1,1],"time":0,"pos":[-1.41747,0.00992643,1.03416]},{"rot":[0.0782291,0.141293,0.378302,0.911484],"scl":[1,1,1],"time":0.0416667,"pos":[-1.41747,0.00992643,1.03416]}],"parent":4},{"keys":[{"rot":[-0.456055,0.100851,-0.0244564,0.88388],"scl":[1,1,1],"time":0,"pos":[0.0180862,-0.0109017,-1.13708]},{"rot":[-0.456055,0.100851,-0.0244564,0.88388],"scl":[1,1,1],"time":0.0416667,"pos":[0.0180862,-0.0109017,-1.13708]}],"parent":5},{"keys":[{"rot":[0.0670468,-0.0202221,0.00310295,0.99754],"scl":[1,1,1],"time":0,"pos":[-0.00753006,0.00287052,0.298835]},{"rot":[0.0670468,-0.0202221,0.00310295,0.99754],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00753006,0.00287052,0.298835]}],"parent":6},{"keys":[{"rot":[0.213517,0.109439,0.0241033,0.970491],"scl":[1,1,1],"time":0,"pos":[0.414557,-0.0203373,-1.13118]},{"rot":[0.213517,0.109439,0.0241033,0.970491],"scl":[1,1,1],"time":0.0416667,"pos":[0.414557,-0.0203373,-1.13118]}],"parent":7},{"keys":[{"rot":[0.29922,0.0114261,-0.0709937,0.951471],"scl":[1,1,1],"time":0,"pos":[0.0186173,0.00158981,-1.93317]},{"rot":[0.29922,0.0114261,-0.0709937,0.951471],"scl":[1,1,1],"time":0.0416667,"pos":[0.0186173,0.00158981,-1.93317]}],"parent":8},{"keys":[{"rot":[0.274085,-0.187141,-0.0412846,0.942418],"scl":[1,1,1],"time":0,"pos":[-0.3814,-0.0014586,-1.14199]},{"rot":[0.274085,-0.187141,-0.0412846,0.942418],"scl":[1,1,1],"time":0.0416667,"pos":[-0.3814,-0.0014586,-1.14199]}],"parent":9},{"keys":[{"rot":[0.356407,0.0167184,0.114117,0.927185],"scl":[1,1,1],"time":0,"pos":[0.03408,-0.0276718,-2.12896]},{"rot":[0.356407,0.0167184,0.114117,0.927185],"scl":[1,1,1],"time":0.0416667,"pos":[0.03408,-0.0276718,-2.12896]}],"parent":10},{"keys":[{"rot":[-0.0047572,0.0484919,0.00551187,0.998797],"scl":[1,1,1],"time":0,"pos":[-1.30293,-2.55252,-3.86087]},{"rot":[-0.0047572,0.0484919,0.00551187,0.998797],"scl":[1,1,1],"time":0.0416667,"pos":[-1.30293,-2.55252,-3.86087]}],"parent":11}],"name":"left","length":0.0416667},{"fps":24,"hierarchy":[{"keys":[{"rot":[0.127755,0.0718124,0.683175,0.715398],"scl":[1,1,1],"time":0,"pos":[-1.00754,0.673361,1.55763]},{"rot":[0.127755,0.0718124,0.683175,0.715398],"scl":[1,1,1],"time":0.0416667,"pos":[-1.00754,0.673361,1.55763]}],"parent":-1},{"keys":[{"rot":[-0.107331,0.0614976,0.457137,0.880752],"scl":[1,1,1],"time":0,"pos":[-8.94074e-8,0.0015827,0.164151]},{"rot":[-0.107331,0.0614976,0.457137,0.880752],"scl":[1,1,1],"time":0.0416667,"pos":[-8.94074e-8,0.0015827,0.164151]}],"parent":0},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-7.89762e-7,0.0140436,1.46474]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-7.89762e-7,0.0140436,1.46474]}],"parent":1},{"keys":[{"rot":[0.0352868,-0.308933,-0.156698,0.937423],"scl":[1,1,1],"time":0,"pos":[1.41295,0.0099266,1.03416]},{"rot":[0.0352868,-0.308933,-0.156698,0.937423],"scl":[1,1,1],"time":0.0416667,"pos":[1.41295,0.0099266,1.03416]}],"parent":2},{"keys":[{"rot":[-0.218832,0.107618,-0.0181391,0.96964],"scl":[1,1,1],"time":0,"pos":[0.0180862,-0.0109016,-1.13708]},{"rot":[-0.218832,0.107618,-0.0181391,0.96964],"scl":[1,1,1],"time":0.0416667,"pos":[0.0180862,-0.0109016,-1.13708]}],"parent":3},{"keys":[{"rot":[0.394527,0.223841,0.328244,0.828553],"scl":[1,1,1],"time":0,"pos":[-1.41747,0.00992643,1.03416]},{"rot":[0.394527,0.223841,0.328244,0.828553],"scl":[1,1,1],"time":0.0416667,"pos":[-1.41747,0.00992643,1.03416]}],"parent":4},{"keys":[{"rot":[-0.243999,0.0710752,0.000764138,0.967167],"scl":[1,1,1],"time":0,"pos":[0.0180862,-0.0109017,-1.13708]},{"rot":[-0.243999,0.0710752,0.000764138,0.967167],"scl":[1,1,1],"time":0.0416667,"pos":[0.0180862,-0.0109017,-1.13708]}],"parent":5},{"keys":[{"rot":[0.0670468,-0.0202221,0.00310295,0.99754],"scl":[1,1,1],"time":0,"pos":[-0.00753006,0.00287052,0.298835]},{"rot":[0.0670468,-0.0202221,0.00310295,0.99754],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00753006,0.00287052,0.298835]}],"parent":6},{"keys":[{"rot":[0.100896,0.106487,0.00733581,0.989155],"scl":[1,1,1],"time":0,"pos":[0.414458,-0.0108979,-1.13658]},{"rot":[0.100896,0.106487,0.00733581,0.989155],"scl":[1,1,1],"time":0.0416667,"pos":[0.414458,-0.0108979,-1.13658]}],"parent":7},{"keys":[{"rot":[0.0901168,0.00318413,-0.016037,0.995797],"scl":[1,1,1],"time":0,"pos":[-0.000301665,0.00116005,-2.00576]},{"rot":[0.0901168,0.00318413,-0.016037,0.995797],"scl":[1,1,1],"time":0.0416667,"pos":[-0.000301665,0.00116005,-2.00576]}],"parent":8},{"keys":[{"rot":[0.163072,-0.195808,-0.0230166,0.966714],"scl":[1,1,1],"time":0,"pos":[-0.381301,-0.010898,-1.13658]},{"rot":[0.163072,-0.195808,-0.0230166,0.966714],"scl":[1,1,1],"time":0.0416667,"pos":[-0.381301,-0.010898,-1.13658]}],"parent":9},{"keys":[{"rot":[0.157991,0.00494421,0.0384193,0.98668],"scl":[1,1,1],"time":0,"pos":[0.00795971,-0.0368856,-2.05925]},{"rot":[0.157991,0.00494421,0.0384193,0.98668],"scl":[1,1,1],"time":0.0416667,"pos":[0.00795971,-0.0368856,-2.05925]}],"parent":10},{"keys":[{"rot":[-0.144979,0.0456864,0.0205958,0.988165],"scl":[1,1,1],"time":0,"pos":[-1.30293,-2.55252,-3.86087]},{"rot":[-0.144979,0.0456864,0.0205958,0.988165],"scl":[1,1,1],"time":0.0416667,"pos":[-1.30293,-2.55252,-3.86087]}],"parent":11}],"name":"neutral","length":0.0416667},{"fps":24,"hierarchy":[{"keys":[{"rot":[0.135407,0.084393,0.481368,0.861874],"scl":[1,1,1],"time":0,"pos":[2.78893,0.434049,0.153787]},{"rot":[0.135407,0.084393,0.481368,0.861874],"scl":[1,1,1],"time":0.0416667,"pos":[2.78893,0.434049,0.153787]}],"parent":-1},{"keys":[{"rot":[-0.0769487,0.0751761,0.648924,0.75321],"scl":[1,1,1],"time":0,"pos":[-8.94074e-8,0.0015827,0.164151]},{"rot":[-0.0769487,0.0751761,0.648924,0.75321],"scl":[1,1,1],"time":0.0416667,"pos":[-8.94074e-8,0.0015827,0.164151]}],"parent":0},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-7.89762e-7,0.0140436,1.46474]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-7.89762e-7,0.0140436,1.46474]}],"parent":1},{"keys":[{"rot":[-0.227734,-0.0476811,-0.0558572,0.97095],"scl":[1,1,1],"time":0,"pos":[1.41295,0.0099266,1.03416]},{"rot":[-0.227734,-0.0476811,-0.0558572,0.97095],"scl":[1,1,1],"time":0.0416667,"pos":[1.41295,0.0099266,1.03416]}],"parent":2},{"keys":[{"rot":[-0.218832,0.107618,-0.0181391,0.96964],"scl":[1,1,1],"time":0,"pos":[0.0180862,-0.0109016,-1.13708]},{"rot":[-0.218832,0.107618,-0.0181391,0.96964],"scl":[1,1,1],"time":0.0416667,"pos":[0.0180862,-0.0109016,-1.13708]}],"parent":3},{"keys":[{"rot":[0.394527,0.223841,0.328244,0.828553],"scl":[1,1,1],"time":0,"pos":[-1.41747,0.00992643,1.03416]},{"rot":[0.394527,0.223841,0.328244,0.828553],"scl":[1,1,1],"time":0.0416667,"pos":[-1.41747,0.00992643,1.03416]}],"parent":4},{"keys":[{"rot":[-0.243999,0.0710752,0.000764138,0.967167],"scl":[1,1,1],"time":0,"pos":[0.0180862,-0.0109017,-1.13708]},{"rot":[-0.243999,0.0710752,0.000764138,0.967167],"scl":[1,1,1],"time":0.0416667,"pos":[0.0180862,-0.0109017,-1.13708]}],"parent":5},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.00753006,0.00287052,0.298835]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00753006,0.00287052,0.298835]}],"parent":6},{"keys":[{"rot":[0.120018,0.0835968,0.0327158,0.988705],"scl":[1,1,1],"time":0,"pos":[0.414458,-0.0108979,-1.13658]},{"rot":[0.120018,0.0835968,0.0327158,0.988705],"scl":[1,1,1],"time":0.0416667,"pos":[0.414458,-0.0108979,-1.13658]}],"parent":7},{"keys":[{"rot":[0.414799,0.105067,-0.0799959,0.900279],"scl":[1,1,1],"time":0,"pos":[-0.00461566,-0.0194892,-2.03276]},{"rot":[0.414799,0.105067,-0.0799959,0.900279],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00461566,-0.0194892,-2.03276]}],"parent":8},{"keys":[{"rot":[0.0491772,-0.296227,0.00261679,0.953847],"scl":[1,1,1],"time":0,"pos":[-0.381301,-0.010898,-1.13658]},{"rot":[0.0491772,-0.296227,0.00261679,0.953847],"scl":[1,1,1],"time":0.0416667,"pos":[-0.381301,-0.010898,-1.13658]}],"parent":9},{"keys":[{"rot":[0.0755081,5.22629e-8,3.24678e-7,0.997145],"scl":[1,1,1],"time":0,"pos":[-0.00461566,-0.0194892,-2.03276]},{"rot":[0.0755081,5.22629e-8,3.24678e-7,0.997145],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00461566,-0.0194892,-2.03276]}],"parent":10},{"keys":[{"rot":[0.522036,0.378633,0.0824377,0.759815],"scl":[1,1,1],"time":0,"pos":[-3.16337,2.19936,-1.38168]},{"rot":[0.522036,0.378633,0.0824377,0.759815],"scl":[1,1,1],"time":0.0416667,"pos":[-3.16337,2.19936,-1.38168]}],"parent":11}],"name":"right","length":0.0416667},{"fps":24,"hierarchy":[{"keys":[{"rot":[0.135407,0.084393,0.481368,0.861874],"scl":[1,1,1],"time":0,"pos":[2.78893,0.434049,0.153787]},{"rot":[0.135407,0.084393,0.481368,0.861874],"scl":[1,1,1],"time":0.0416667,"pos":[2.78893,0.434049,0.153787]}],"parent":-1},{"keys":[{"rot":[-0.0769487,0.0751761,0.648924,0.75321],"scl":[1,1,1],"time":0,"pos":[-8.94074e-8,0.0015827,0.164151]},{"rot":[-0.0769487,0.0751761,0.648924,0.75321],"scl":[1,1,1],"time":0.0416667,"pos":[-8.94074e-8,0.0015827,0.164151]}],"parent":0},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-7.89762e-7,0.0140436,1.46474]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-7.89762e-7,0.0140436,1.46474]}],"parent":1},{"keys":[{"rot":[-0.227734,-0.0476811,-0.0558572,0.97095],"scl":[1,1,1],"time":0,"pos":[1.41295,0.0099266,1.03416]},{"rot":[-0.227734,-0.0476811,-0.0558572,0.97095],"scl":[1,1,1],"time":0.0416667,"pos":[1.41295,0.0099266,1.03416]}],"parent":2},{"keys":[{"rot":[-0.218832,0.107618,-0.0181391,0.96964],"scl":[1,1,1],"time":0,"pos":[0.0180862,-0.0109016,-1.13708]},{"rot":[-0.218832,0.107618,-0.0181391,0.96964],"scl":[1,1,1],"time":0.0416667,"pos":[0.0180862,-0.0109016,-1.13708]}],"parent":3},{"keys":[{"rot":[0.394527,0.223841,0.328244,0.828553],"scl":[1,1,1],"time":0,"pos":[-1.41747,0.00992643,1.03416]},{"rot":[0.394527,0.223841,0.328244,0.828553],"scl":[1,1,1],"time":0.0416667,"pos":[-1.41747,0.00992643,1.03416]}],"parent":4},{"keys":[{"rot":[-0.243999,0.0710752,0.000764138,0.967167],"scl":[1,1,1],"time":0,"pos":[0.0180862,-0.0109017,-1.13708]},{"rot":[-0.243999,0.0710752,0.000764138,0.967167],"scl":[1,1,1],"time":0.0416667,"pos":[0.0180862,-0.0109017,-1.13708]}],"parent":5},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.00753006,0.00287052,0.298835]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00753006,0.00287052,0.298835]}],"parent":6},{"keys":[{"rot":[0.120018,0.0835968,0.0327158,0.988705],"scl":[1,1,1],"time":0,"pos":[0.414458,-0.0108979,-1.13658]},{"rot":[0.120018,0.0835968,0.0327158,0.988705],"scl":[1,1,1],"time":0.0416667,"pos":[0.414458,-0.0108979,-1.13658]}],"parent":7},{"keys":[{"rot":[0.414799,0.105067,-0.0799959,0.900279],"scl":[1,1,1],"time":0,"pos":[-0.00461566,-0.0194892,-2.03276]},{"rot":[0.414799,0.105067,-0.0799959,0.900279],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00461566,-0.0194892,-2.03276]}],"parent":8},{"keys":[{"rot":[0.0491772,-0.296227,0.00261679,0.953847],"scl":[1,1,1],"time":0,"pos":[-0.381301,-0.010898,-1.13658]},{"rot":[0.0491772,-0.296227,0.00261679,0.953847],"scl":[1,1,1],"time":0.0416667,"pos":[-0.381301,-0.010898,-1.13658]}],"parent":9},{"keys":[{"rot":[0.0755081,5.22629e-8,3.24678e-7,0.997145],"scl":[1,1,1],"time":0,"pos":[-0.00461566,-0.0194892,-2.03276]},{"rot":[0.0755081,5.22629e-8,3.24678e-7,0.997145],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00461566,-0.0194892,-2.03276]}],"parent":10},{"keys":[{"rot":[-0.121423,0.00501353,0.0292124,0.992158],"scl":[1,1,1],"time":0,"pos":[-1.49238,-0.229471,-4.33776]},{"rot":[-0.121423,0.00501353,0.0292124,0.992158],"scl":[1,1,1],"time":0.0416667,"pos":[-1.49238,-0.229471,-4.33776]}],"parent":11}],"name":"right.001","length":0.0416667},{"fps":24,"hierarchy":[{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.0980752,0.67258,1.46535]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.0980752,0.67258,1.46535]}],"parent":-1},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-8.94074e-8,0.0015827,0.164151]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-8.94074e-8,0.0015827,0.164151]}],"parent":0},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-7.89762e-7,0.0140436,1.46474]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-7.89762e-7,0.0140436,1.46474]}],"parent":1},{"keys":[{"rot":[0.00552386,-0.348245,0.000083855,0.937387],"scl":[1,1,1],"time":0,"pos":[1.41295,0.0099266,1.03416]},{"rot":[0.00552386,-0.348245,0.000083855,0.937387],"scl":[1,1,1],"time":0.0416667,"pos":[1.41295,0.0099266,1.03416]}],"parent":2},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[0.0180862,-0.0109016,-1.13708]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[0.0180862,-0.0109016,-1.13708]}],"parent":3},{"keys":[{"rot":[-0.0366737,0.650894,-0.164072,0.740319],"scl":[1,1,1],"time":0,"pos":[-1.41747,0.00992643,1.03416]},{"rot":[-0.0366737,0.650894,-0.164072,0.740319],"scl":[1,1,1],"time":0.0416667,"pos":[-1.41747,0.00992643,1.03416]}],"parent":4},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[0.0180862,-0.0109017,-1.13708]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[0.0180862,-0.0109017,-1.13708]}],"parent":5},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.00753006,0.00287052,0.298835]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00753006,0.00287052,0.298835]}],"parent":6},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[0.414458,-0.0108979,-1.13658]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[0.414458,-0.0108979,-1.13658]}],"parent":7},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.00461566,-0.0194892,-2.03276]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00461566,-0.0194892,-2.03276]}],"parent":8},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.381301,-0.010898,-1.13658]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.381301,-0.010898,-1.13658]}],"parent":9},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.00461566,-0.0194892,-2.03276]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00461566,-0.0194892,-2.03276]}],"parent":10},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[0.00000264495,-0.0474956,-4.96892]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[0.00000264495,-0.0474956,-4.96892]}],"parent":11}],"name":"root","length":0.0416667},{"fps":24,"hierarchy":[{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.0980752,0.67258,1.46535]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.0980752,0.67258,1.46535]}],"parent":-1},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-8.94074e-8,0.0015827,0.164151]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-8.94074e-8,0.0015827,0.164151]}],"parent":0},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-7.89762e-7,0.0140436,1.46474]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-7.89762e-7,0.0140436,1.46474]}],"parent":1},{"keys":[{"rot":[0.00552386,-0.348245,0.000083855,0.937387],"scl":[1,1,1],"time":0,"pos":[1.41295,0.0099266,1.03416]},{"rot":[0.00552386,-0.348245,0.000083855,0.937387],"scl":[1,1,1],"time":0.0416667,"pos":[1.41295,0.0099266,1.03416]}],"parent":2},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[0.0180862,-0.0109016,-1.13708]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[0.0180862,-0.0109016,-1.13708]}],"parent":3},{"keys":[{"rot":[-0.0366737,0.650894,-0.164072,0.740319],"scl":[1,1,1],"time":0,"pos":[-1.41747,0.00992643,1.03416]},{"rot":[-0.0366737,0.650894,-0.164072,0.740319],"scl":[1,1,1],"time":0.0416667,"pos":[-1.41747,0.00992643,1.03416]}],"parent":4},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[0.0180862,-0.0109017,-1.13708]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[0.0180862,-0.0109017,-1.13708]}],"parent":5},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.00753006,0.00287052,0.298835]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00753006,0.00287052,0.298835]}],"parent":6},{"keys":[{"rot":[8.49148e-7,-0.281402,-0.00000329545,0.95959],"scl":[1,1,1],"time":0,"pos":[0.414458,-0.0108979,-1.13658]},{"rot":[8.49148e-7,-0.281402,-0.00000329545,0.95959],"scl":[1,1,1],"time":0.0416667,"pos":[0.414458,-0.0108979,-1.13658]}],"parent":7},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.00461566,-0.0194892,-2.03276]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00461566,-0.0194892,-2.03276]}],"parent":8},{"keys":[{"rot":[0.00000215092,0.394481,0.00000457386,0.918904],"scl":[1,1,1],"time":0,"pos":[-0.381301,-0.010898,-1.13658]},{"rot":[0.00000215092,0.394481,0.00000457386,0.918904],"scl":[1,1,1],"time":0.0416667,"pos":[-0.381301,-0.010898,-1.13658]}],"parent":9},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.00461566,-0.0194892,-2.03276]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00461566,-0.0194892,-2.03276]}],"parent":10},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[0.00000264495,-0.0474956,-4.96892]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[0.00000264495,-0.0474956,-4.96892]}],"parent":11}],"name":"spread","length":0.0416667},{"fps":24,"hierarchy":[{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.0980752,0.67258,1.46535]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.0980752,0.67258,1.46535]}],"parent":-1},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-8.94074e-8,0.0015827,0.164151]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-8.94074e-8,0.0015827,0.164151]}],"parent":0},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-7.89762e-7,0.0140436,1.46474]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-7.89762e-7,0.0140436,1.46474]}],"parent":1},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[1.41295,0.0099266,1.03416]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[1.41295,0.0099266,1.03416]}],"parent":2},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[0.0180862,-0.0109016,-1.13708]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[0.0180862,-0.0109016,-1.13708]}],"parent":3},{"keys":[{"rot":[-0.0113117,0.714586,-0.000157129,0.699456],"scl":[1,1,1],"time":0,"pos":[-1.41747,0.00992643,1.03416]},{"rot":[-0.0113117,0.714586,-0.000157129,0.699456],"scl":[1,1,1],"time":0.0416667,"pos":[-1.41747,0.00992643,1.03416]}],"parent":4},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-1.15862,0.06583,-8.00638]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-1.15862,0.06583,-8.00638]}],"parent":5},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.00753006,0.00287052,0.298835]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00753006,0.00287052,0.298835]}],"parent":6},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[0.414458,-0.0108979,-1.13658]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[0.414458,-0.0108979,-1.13658]}],"parent":7},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.00461566,-0.0194892,-2.03276]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00461566,-0.0194892,-2.03276]}],"parent":8},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.381301,-0.010898,-1.13658]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.381301,-0.010898,-1.13658]}],"parent":9},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[-0.00461566,-0.0194892,-2.03276]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[-0.00461566,-0.0194892,-2.03276]}],"parent":10},{"keys":[{"rot":[0,0,0,1],"scl":[1,1,1],"time":0,"pos":[0.00000264495,-0.0474956,-4.96892]},{"rot":[0,0,0,1],"scl":[1,1,1],"time":0.0416667,"pos":[0.00000264495,-0.0474956,-4.96892]}],"parent":11}],"name":"wave","length":0.0416667}],"normals":[6.80835e-7,-0.00958745,-0.999954,-5.09539e-7,0.00958745,0.999954,1,-2.35986e-7,4.6473e-7,-3.06598e-7,-0.999954,0.00958729,-1,3.37326e-7,-5.82875e-7,5.19256e-7,0.999954,-0.00958732,0.00000119516,-0.00958745,-0.999954,-0.00000119631,0.00958753,0.999954,1,-2.36721e-7,4.5796e-7,-3.53987e-7,-0.999954,0.0095874,-1,4.23246e-7,-5.62861e-7,4.4011e-7,0.999954,-0.0095873,0.0000013666,-0.00958745,-0.999954,-0.00000119535,0.00958762,0.999954,1,-1.66718e-7,4.94294e-7,-3.98572e-7,-0.999954,0.00958736,-1,4.44373e-7,-5.9477e-7,5.25831e-7,0.999954,-0.00958726,0.00000142679,-0.00958735,-0.999954,-0.00000142679,0.00958741,0.999954,1,-2.34884e-7,3.69778e-7,-3.04344e-7,-0.999954,0.00958735,-1,4.69768e-7,-7.39556e-7,4.30928e-7,0.999954,-0.00958718,0.00000192877,-0.00958733,-0.999954,-0.00000154506,0.00958741,0.999954,0.99998,-0.0000604262,-0.00627756,3.63272e-7,-0.960478,-0.278356,-0.99998,0.0000606671,0.0062775,2.66176e-8,0.960478,0.278356,0.00000114159,-0.00958739,-0.999954,-0.00000117999,0.00958741,0.999954,1,-2.35985e-7,2.54964e-7,-2.6687e-7,-0.999954,0.00958742,-1,5.90366e-7,-5.95296e-7,4.85311e-7,0.999954,-0.00958717,0.00000154565,-0.00958729,-0.999954,-9.49949e-7,0.00958729,0.999954,1,-2.35626e-7,2.92412e-7,-3.0374e-7,-0.999954,0.00958745,-1,4.71252e-7,-5.84824e-7,4.26356e-7,0.999954,-0.00958729,9.4963e-7,-0.00958741,-0.999954,-7.10599e-7,0.00958776,0.999954,1,-2.33827e-7,4.80026e-7,-4.18042e-7,-0.999954,0.0095874,-1,4.71178e-7,-5.92559e-7,4.83673e-7,0.999954,-0.00958725,0.00000141807,-0.00958729,-0.999954,-0.00000126022,0.00958729,0.999954,1,-2.35581e-7,2.97077e-7,-3.48849e-7,-0.999954,0.00958736,-1,5.89962e-7,-6.37409e-7,4.07076e-7,0.999954,-0.00958717,9.50202e-7,-0.00958729,-0.999954,-0.0000023786,0.00958729,0.999954,1,-2.34408e-7,4.19499e-7,-3.07336e-7,-0.999954,0.00958742,-1,4.70529e-7,-6.60192e-7,6.18876e-7,0.999954,-0.00958686,0.00000136824,-0.00958745,-0.999954,-0.00000153729,0.00958753,0.999954,1,-1.6685e-7,4.80574e-7,-3.99431e-7,-0.999954,0.00958742,-1,4.44422e-7,-5.89674e-7,5.29118e-7,0.999954,-0.00958727,5.27208e-7,-0.00958734,-0.999954,-5.26726e-7,0.00958735,0.999954,1,-2.4061e-7,-0.00000443136,-3.03244e-7,-0.999954,0.00958561,-1,0.00000125732,-0.00000317896,3.69502e-7,0.999954,-0.00958577,6.82889e-7,-0.00958745,-0.999954,-6.79191e-7,0.00958728,0.999954,1,-8.33419e-7,6.73106e-7,-6.92341e-7,-0.999954,0.00958742,-1,3.37326e-7,-5.82875e-7,5.209e-7,0.999954,-0.00958732,0.0000011968,-0.00958745,-0.999954,-0.00000136527,0.00958737,0.999954,1,-7.92248e-7,6.3625e-7,-6.66771e-7,-0.999954,0.0095873,-1,3.37271e-7,-5.88647e-7,5.25831e-7,0.999954,-0.00958727,0.00000136783,-0.00958745,-0.999954,-0.00000136496,0.00958745,0.999954,1,-6.79375e-7,6.73101e-7,-6.98916e-7,-0.999954,0.00958726,-1,4.87372e-7,-5.80691e-7,5.27474e-7,0.999954,-0.00958726,0.00000141276,-0.00958733,-0.999954,-0.00000154229,0.00958729,0.999954,1,-9.45879e-7,8.17626e-7,-7.82232e-7,-0.999954,0.00958705,-1,4.69768e-7,-7.39556e-7,4.30928e-7,0.999954,-0.00958718,0.00000145566,-0.00958781,-0.999954,-0.0000016615,0.00958729,0.999954,0.99998,-0.000060961,-0.00627733,-2.72524e-7,-0.960478,-0.278356,-0.99998,0.0000606638,0.0062775,-8.01888e-8,0.960478,0.278356,0.00000110342,-0.00958745,-0.999954,-0.00000117958,0.00958741,0.999954,1,-0.00000106476,8.52545e-7,-5.64303e-7,-0.999954,0.0095871,-1,5.30361e-7,-6.36838e-7,4.05941e-7,0.999954,-0.00958725,0.00000142766,-0.00958741,-0.999954,-9.4713e-7,0.00958729,0.999954,1,-7.09659e-7,5.87109e-7,-6.87115e-7,-0.999954,0.00958721,-1,4.71252e-7,-5.84824e-7,4.32071e-7,0.999954,-0.00958729,9.49702e-7,-0.00958741,-0.999954,-7.08151e-7,0.00958776,0.999954,1,-7.67073e-7,8.15912e-7,-7.44431e-7,-0.999954,0.0095872,-1,4.71177e-7,-5.92559e-7,4.26357e-7,0.999954,-0.00958729,0.00000141863,-0.00958729,-0.999954,-0.00000125869,0.00958729,0.999954,1,-0.00000106435,8.94659e-7,-5.52718e-7,-0.999954,0.00958715,-1,5.29957e-7,-6.78951e-7,4.08591e-7,0.999954,-0.00958717,9.50773e-7,-0.00958729,-0.999954,-0.0000019004,0.00958777,0.999954,1,-7.06651e-7,9.00885e-7,-7.33509e-7,-0.999954,0.009587,-1,4.70529e-7,-6.60193e-7,3.66754e-7,0.999954,-0.00958711,0.00000136783,-0.00958745,-0.999954,-0.00000144955,0.00958762,0.999954,1,-6.79643e-7,6.45149e-7,-8.17604e-7,-0.999954,0.00958729,-1,5.1965e-7,-5.67112e-7,3.56033e-7,0.999954,-0.00958732,5.27208e-7,-0.00958734,-0.999954,-5.26255e-7,0.00958735,0.999954,1,-0.0000017283,0.00000571699,-4.02632e-7,-0.999954,0.00958751,-1,8.36824e-7,-0.00000570845,3.03245e-7,0.999954,-0.00958704]}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {"actions":{"ArmatureAction":{"0.0":[[-0.009297394193708897,0.06665600836277008,0.9977326393127441,0.15054571628570557,0.9960267543792725,-0.08775816112756729,0.015144399367272854,-0.23992919921875,0.08856870234012604,0.9939091801643372,-0.0655752420425415,1.7327848672866821,0,0,0,1],[-0.8777579069137573,0.11803282797336578,0.46433746814727783,0.16148792207241058,0.4590340256690979,-0.0703912302851677,0.8856258392333984,-0.2543354332447052,0.13721822202205658,0.9905116558074951,0.00760541670024395,1.895943284034729,0,0,0,1],[-0.8753068447113037,-0.13197581470012665,-0.4645031690597534,-0.9565918445587158,0.45782777667045593,0.07768341153860092,-0.885539174079895,0.3215969502925873,0.15288151800632477,-0.9882041215896606,-0.007577934768050909,3.11422061920166,0,0,0,1],[-0.8465474247932434,0.13830220699310303,-0.5133936405181885,-1.106684684753418,0.5292224287986755,0.30922114849090576,-0.790016770362854,0.4099443554878235,0.04937548190355301,-0.9408718943595886,-0.3351115882396698,1.9903607368469238,0,0,0,1],[-0.8761293292045593,-0.13197584450244904,-0.46450337767601013,1.5276774168014526,0.45825791358947754,0.0776834785938263,-0.8855391144752502,-0.9779419898986816,0.1530403345823288,-0.9882044196128845,-0.007577946409583092,2.725834369659424,0,0,0,1],[-0.8448110222816467,0.36632490158081055,-0.39100390672683716,1.3775845766067505,0.5357217788696289,0.5538991689682007,-0.6375048756599426,-0.8895944952964783,-0.01678706705570221,-0.747688353061676,-0.663857638835907,1.6019738912582397,0,0,0,1],[-0.8777565956115723,0.11803291738033295,0.4643399715423584,0.3343837857246399,0.45903658866882324,-0.07039104402065277,0.8856245279312134,-0.3574453294277191,0.13721822202205658,0.9905116558074951,0.0076048183254897594,3.3468565940856934,0,0,0,1],[-0.33537235856056213,-0.1293480545282364,-0.9331632852554321,0.1705349087715149,0.9275535345077515,0.12801606953144073,-0.35110101103782654,-0.27365562319755554,0.16487517952919006,-0.9833007454872131,0.07704614847898483,2.029146432876587,0,0,0,1],[-0.29083526134490967,0.3254116177558899,-0.8997340202331543,-0.11217576265335083,0.8161234259605408,0.5751932859420776,-0.05577537417411804,0.2647424340248108,0.4993693232536316,-0.7505102157592773,-0.43285655975341797,0.9391078948974609,0,0,0,1],[-0.1455557942390442,-0.35094618797302246,-0.9250131845474243,0.5493401885032654,0.8999333381652832,0.34147581458091736,-0.2711639702320099,1.4340293407440186,0.4110322594642639,-0.8719117045402527,0.26612505316734314,-0.586573600769043,0,0,0,1],[-0.21851295232772827,0.21772471070289612,-0.9512346386909485,0.14508485794067383,0.7953858971595764,-0.5250144600868225,-0.3028808832168579,-0.4819554388523102,-0.5653507709503174,-0.8227773308753967,-0.05844965577125549,0.8909710645675659,0,0,0,1],[-0.36250072717666626,-0.3535799980163574,-0.8623071908950806,0.5876885652542114,0.773223876953125,-0.630653440952301,-0.06645876169204712,-1.5492359399795532,-0.5203125476837158,-0.6908425092697144,0.5020078420639038,-0.7816195487976074,0,0,0,1],[-0.07034644484519958,0.009882692247629166,0.9974736571311951,0.10645425319671631,0.9975218772888184,0.0020119252149015665,0.07032991200685501,-0.8058582544326782,-0.0013117424678057432,0.9999490976333618,-0.009999722242355347,-1.9259004592895508,0,0,0,1]]},"idle":{"0.0":[[0.9999887943267822,0.004724592436105013,0.000157377275172621,-0.09115003049373627,0.00011207420175196603,0.009587527252733707,-0.999954104423523,0.10864168405532837,-0.0047258841805160046,0.9999428987503052,0.009586833417415619,2.090467929840088,0,0,0,1],[0.9999887943267822,0.004724598024040461,0.0001582247787155211,-0.09037444740533829,0.00011292161798337474,0.009587529115378857,-0.999954104423523,0.11021548509597778,-0.0047258976846933365,0.9999428987503052,0.00958683155477047,2.2546167373657227,0,0,0,1],[0.9995080232620239,0.011178389191627502,0.000030772818718105555,1.3274418115615845,0.00007621292024850845,-0.009585960768163204,0.9999541640281677,0.12013095617294312,0.011166541837155819,-0.999891459941864,-0.009586161002516747,3.2820892333984375,0,0,0,1],[0.9995594024658203,-0.004724687896668911,-0.000045011845941189677,1.340154767036438,-4.963440005667508e-7,-0.009587331674993038,0.9999541640281677,0.10922908037900925,-0.004743360448628664,-0.9999426007270813,-0.009587172418832779,2.144937515258789,0,0,0,1],[1.000449299812317,0.011178391054272652,0.00003100158937741071,-1.5029398202896118,0.00007637377711944282,-0.009586012922227383,0.9999541640281677,0.12013077735900879,0.011192035861313343,-0.9998917579650879,-0.009586205706000328,3.2954626083374023,0,0,0,1],[1.0005005598068237,-0.004724535159766674,-0.00004496920155361295,-1.4902268648147583,-7.649941835552454e-8,-0.009587342850863934,0.9999541640281677,0.10922884196043015,-0.004702756647020578,-0.9999433159828186,-0.009587177075445652,2.1583104133605957,0,0,0,1],[0.9999887943267822,0.004724606405943632,0.0001553436159156263,-0.08345380425453186,0.00011004145198967308,0.009587324224412441,-0.999954104423523,0.12425941228866577,-0.004725878592580557,0.9999428987503052,0.009586639702320099,3.7193448543548584,0,0,0,1],[0.999970018863678,-0.008683126419782639,-0.00006554686842719093,-0.09726791083812714,-0.00001767202775226906,-0.009587090462446213,0.999954104423523,0.11150693893432617,-0.008683455176651478,-0.9999161958694458,-0.009583610109984875,2.3893351554870605,0,0,0,1],[0.9999832510948181,-0.006995632778853178,-0.00005621922900900245,0.3118215799331665,-0.000010822443982760888,-0.009587334468960762,0.999954104423523,0.10060971975326538,-0.006995962932705879,-0.9999294281005859,-0.009583903476595879,1.2508057355880737,0,0,0,1],[0.9999966025352478,-0.004724635276943445,-0.00004535818879958242,0.2976004481315613,8.918959792936221e-8,-0.009587506763637066,0.999954104423523,0.08112002164125443,-0.004724983125925064,-0.9999427795410156,-0.009584126994013786,-0.7819098234176636,0,0,0,1],[0.9999832510948181,-0.006995632778853178,-0.00005622032404062338,-0.48394107818603516,-0.000010821140676853247,-0.009587305597960949,0.999954104423523,0.10060954093933105,-0.006995962932705879,-0.9999294877052307,-0.009583873674273491,1.2545653581619263,0,0,0,1],[0.9999966025352478,-0.004724590107798576,-0.000045356748159974813,-0.4981622099876404,8.82255335454829e-8,-0.009587499313056469,0.999954104423523,0.08111989498138428,-0.0047249384224414825,-0.9999428391456604,-0.009584118612110615,-0.7781506776809692,0,0,0,1],[0.9999887943267822,0.004724573809653521,0.00015740144590381533,-0.11462728679180145,0.00011209971125936136,0.009587281383574009,-0.999954104423523,0.06100011616945267,-0.0047258660197257996,0.9999428987503052,0.00958658754825592,-2.8784008026123047,0,0,0,1]]},"left":{"0.0":[[-0.537280797958374,-0.1638566255569458,0.8273332118988037,-1.7988924980163574,0.8433572053909302,-0.11465515196323395,0.5249789953231812,-0.34930774569511414,0.008836770430207253,0.9797985553741455,0.19979169964790344,1.5758781433105469,0,0,0,1],[-0.955136239528656,0.11983611434698105,0.27083954215049744,-1.8257908821105957,0.27214330434799194,-0.005664557218551636,0.9622401595115662,-0.36812928318977356,0.1168452799320221,0.9927775859832764,-0.027202174067497253,1.736720085144043,0,0,0,1],[-0.9526500105857849,-0.13500967621803284,-0.2710198760032654,-3.051368236541748,0.2720838785171509,0.009993004612624645,-0.962188720703125,0.010689705610275269,0.13254933059215546,-0.9907938241958618,0.027225809171795845,2.9285497665405273,0,0,0,1],[-0.925553023815155,-0.05811409652233124,-0.3730897307395935,-3.204911470413208,0.3503110110759735,0.23594824969768524,-0.9063924551010132,0.022054500877857208,0.1406441628932953,-0.9700263142585754,-0.19811946153640747,1.8017445802688599,0,0,0,1],[-0.953545331954956,-0.13500970602035522,-0.2710200846195221,-0.34802424907684326,0.2723400592803955,0.009993053041398525,-0.9621886610984802,-0.7598957419395447,0.13268902897834778,-0.9907941222190857,0.027225792407989502,2.5978381633758545,0,0,0,1],[-0.9175031781196594,0.34136632084846497,-0.20636166632175446,-0.5015674829483032,0.3963095545768738,0.7198977470397949,-0.5698789954185486,-0.7485308647155762,-0.04581465199589729,-0.6043702960014343,-0.7953981757164001,1.4710325002670288,0,0,0,1],[-0.9551354646682739,0.11983615905046463,0.2708422541618347,-1.6502535343170166,0.272146075963974,-0.005664357449859381,0.9622393846511841,-0.3764267861843109,0.11684519052505493,0.9927775859832764,-0.02720271423459053,3.1909523010253906,0,0,0,1],[-0.5458853840827942,0.03208116441965103,-0.8372484445571899,-1.8438159227371216,0.8366937041282654,0.07378637790679932,-0.5426884889602661,-0.3899231553077698,0.044367171823978424,-0.996757447719574,-0.06711749732494354,1.8686230182647705,0,0,0,1],[-0.4821675717830658,0.6023193597793579,-0.6361845135688782,-2.0131139755249023,0.8189982175827026,0.5677435994148254,-0.08319094777107239,0.05309419333934784,0.31107938289642334,-0.5611433982849121,-0.7670373916625977,0.6723324060440063,0,0,0,1],[-0.35794711112976074,0.12070134282112122,-0.9259103536605835,-0.7886835336685181,0.8571836948394775,0.4357285797595978,-0.2745695412158966,1.207236886024475,0.3703010082244873,-0.8919496536254883,-0.2594258785247803,-0.46839308738708496,0,0,0,1],[0.0366722047328949,0.7862132787704468,-0.6168701648712158,-1.6246044635772705,0.7940478920936584,-0.3977234959602356,-0.459690660238266,-0.6299431324005127,-0.6067545413970947,-0.47296378016471863,-0.6388684511184692,0.8010311126708984,0,0,0,1],[-0.14483948051929474,0.176802396774292,-0.9735335111618042,-0.026343464851379395,0.6920057535171509,-0.685155987739563,-0.22737836837768555,-1.438459038734436,-0.7072176933288574,-0.7066172957420349,-0.0231076180934906,-0.1604377031326294,0,0,0,1],[-0.41614416241645813,-0.2264823466539383,0.8806415796279907,-0.14912927150726318,0.9049699902534485,-0.008769452571868896,0.42538508772850037,-0.13176825642585754,-0.08861944079399109,0.9739757776260376,0.20860911905765533,-1.7383798360824585,0,0,0,1]]},"neutral":{"0.0":[[-0.009297394193708897,0.06665600836277008,0.9977326393127441,0.15054571628570557,0.9960267543792725,-0.08775816112756729,0.015144399367272854,-0.23992919921875,0.08856870234012604,0.9939091801643372,-0.0655752420425415,1.7327848672866821,0,0,0,1],[-0.8777579069137573,0.11803282797336578,0.46433746814727783,0.16148792207241058,0.4590340256690979,-0.0703912302851677,0.8856258392333984,-0.2543354332447052,0.13721822202205658,0.9905116558074951,0.00760541670024395,1.895943284034729,0,0,0,1],[-0.8753068447113037,-0.13197581470012665,-0.4645031690597534,-0.9565918445587158,0.45782777667045593,0.07768341153860092,-0.885539174079895,0.3215969502925873,0.15288151800632477,-0.9882041215896606,-0.007577934768050909,3.11422061920166,0,0,0,1],[-0.8465474247932434,0.13830220699310303,-0.5133936405181885,-1.106684684753418,0.5292224287986755,0.30922114849090576,-0.790016770362854,0.4099443554878235,0.04937548190355301,-0.9408718943595886,-0.3351115882396698,1.9903607368469238,0,0,0,1],[-0.8761293292045593,-0.13197584450244904,-0.46450337767601013,1.5276774168014526,0.45825791358947754,0.0776834785938263,-0.8855391144752502,-0.9779419898986816,0.1530403345823288,-0.9882044196128845,-0.007577946409583092,2.725834369659424,0,0,0,1],[-0.8448110222816467,0.36632490158081055,-0.39100390672683716,1.3775845766067505,0.5357217788696289,0.5538991689682007,-0.6375048756599426,-0.8895944952964783,-0.01678706705570221,-0.747688353061676,-0.663857638835907,1.6019738912582397,0,0,0,1],[-0.8777565956115723,0.11803291738033295,0.4643399715423584,0.3343837857246399,0.45903658866882324,-0.07039104402065277,0.8856245279312134,-0.3574453294277191,0.13721822202205658,0.9905116558074951,0.0076048183254897594,3.3468565940856934,0,0,0,1],[-0.33537235856056213,-0.1293480545282364,-0.9331632852554321,0.1705349087715149,0.9275535345077515,0.12801606953144073,-0.35110101103782654,-0.27365562319755554,0.16487517952919006,-0.9833007454872131,0.07704614847898483,2.029146432876587,0,0,0,1],[-0.29083526134490967,0.3254116177558899,-0.8997340202331543,-0.11217576265335083,0.8161234259605408,0.5751932859420776,-0.05577537417411804,0.2647424340248108,0.4993693232536316,-0.7505102157592773,-0.43285655975341797,0.9391078948974609,0,0,0,1],[-0.1455557942390442,-0.35094618797302246,-0.9250131845474243,0.5493401885032654,0.8999333381652832,0.34147581458091736,-0.2711639702320099,1.4340293407440186,0.4110322594642639,-0.8719117045402527,0.26612505316734314,-0.586573600769043,0,0,0,1],[-0.21851295232772827,0.21772471070289612,-0.9512346386909485,0.14508485794067383,0.7953858971595764,-0.5250144600868225,-0.3028808832168579,-0.4819554388523102,-0.5653507709503174,-0.8227773308753967,-0.05844965577125549,0.8909710645675659,0,0,0,1],[-0.36250072717666626,-0.3535799980163574,-0.8623071908950806,0.5876885652542114,0.773223876953125,-0.630653440952301,-0.06645876169204712,-1.5492359399795532,-0.5203125476837158,-0.6908425092697144,0.5020078420639038,-0.7816195487976074,0,0,0,1],[-0.07034644484519958,0.009882692247629166,0.9974736571311951,0.10645425319671631,0.9975218772888184,0.0020119252149015665,0.07032991200685501,-0.8058582544326782,-0.0013117424678057432,0.9999490976333618,-0.009999722242355347,-1.9259004592895508,0,0,0,1]]},"right":{"0.0":[[0.5220980644226074,0.27297329902648926,0.8080217838287354,2.0999841690063477,0.8527669310569763,-0.18288147449493408,-0.48922714591026306,-0.13055072724819183,0.014226283878087997,0.9444786906242371,-0.32826465368270874,1.8896915912628174,0,0,0,1],[-0.7613660097122192,0.10307733714580536,0.64007568359375,2.1447949409484863,0.6357618570327759,-0.07469173520803452,0.7682631611824036,-0.16057226061820984,0.1269988864660263,0.9918650388717651,-0.00866488367319107,2.0447354316711426,0,0,0,1],[-0.7591840624809265,-0.11517104506492615,-0.6402193903923035,1.1757314205169678,0.6343668699264526,0.08479363471269608,-0.7681431174278259,0.6606006622314453,0.14268629252910614,-0.9897198677062988,0.008690436370670795,3.2499706745147705,0,0,0,1],[-0.7120476365089417,0.34380990266799927,-0.6117913722991943,1.0447502136230469,0.6972867250442505,0.2511140704154968,-0.6711095571517944,0.7570343613624573,-0.07726345211267471,-0.9048137068748474,-0.41871586441993713,2.124386787414551,0,0,0,1],[-0.7598973512649536,-0.11517104506492615,-0.6402195692062378,3.330507755279541,0.6349632143974304,0.08479370176792145,-0.7681429982185364,-1.1391135454177856,0.14283552765846252,-0.9897201657295227,0.008690422400832176,2.890514373779297,0,0,0,1],[-0.7477409839630127,0.3170999586582184,-0.583884060382843,3.19952654838562,0.6646341681480408,0.34067490696907043,-0.6652924418449402,-1.042679786682129,-0.011891341768205166,-0.8851067423820496,-0.4652613401412964,1.764930009841919,0,0,0,1],[-0.7613641619682312,0.1030774638056755,0.6400778293609619,2.295783758163452,0.6357640624046326,-0.07469157129526138,0.7682613730430603,-0.26998159289360046,0.12699884176254272,0.9918650388717651,-0.00866545271128416,3.497631072998047,0,0,0,1],[-0.08195081353187561,-0.23309552669525146,-0.9689959287643433,2.1776299476623535,0.9606093168258667,0.24059271812438965,-0.13912510871887207,-0.1916254460811615,0.26556283235549927,-0.9422215819358826,0.20419761538505554,2.1718411445617676,0,0,0,1],[-0.045577146112918854,0.053584590554237366,-0.9975239634513855,1.878744125366211,0.737207293510437,0.6756696105003357,0.002604246139526367,0.4838995635509491,0.6741333603858948,-0.7352581024169922,-0.07029551267623901,1.2136900424957275,0,0,0,1],[0.023675676435232162,-0.7220911383628845,-0.6913946270942688,1.9876739978790283,0.8835785388946533,0.3386519253253937,-0.32344210147857666,1.857440710067749,0.4676952362060547,-0.6032382249832153,0.6460392475128174,-0.28098607063293457,0,0,0,1],[-0.34019482135772705,-0.43556806445121765,-0.8333969712257385,1.9432073831558228,0.9012623429298401,-0.40391847491264343,-0.1568024456501007,-0.27975839376449585,-0.2683227062225342,-0.8044477105140686,0.5299704670906067,0.9994009733200073,0,0,0,1],[-0.3577064275741577,-0.7833293676376343,-0.5083737373352051,1.0577588081359863,0.9162716269493103,-0.3995095193386078,-0.029145143926143646,-1.100867748260498,-0.18026679754257202,-0.47623008489608765,0.8606455326080322,-0.6359280347824097,0,0,0,1],[0.30794548988342285,0.20950302481651306,0.9280507564544678,0.20566177368164062,0.9512064456939697,-0.08768531680107117,-0.29583442211151123,-0.13804125785827637,0.01939823478460312,0.9738684296607971,-0.22628289461135864,-1.4148281812667847,0,0,0,1]]},"right.001":{"0.0":[[0.5220980644226074,0.2729732394218445,0.8080217242240906,2.789620876312256,0.8526965975761414,-0.14712989330291748,-0.5012597441673279,-0.13055072724819183,-0.01794632151722908,0.9507040977478027,-0.30957964062690735,0.7652837038040161,0,0,0,1],[-0.7613659501075745,0.10307727754116058,0.64007568359375,2.8344316482543945,0.6400994062423706,-0.03722992539405823,0.7673895359039307,-0.15470334887504578,0.10293042659759521,0.993976354598999,-0.03763410076498985,0.9213495850563049,0,0,0,1],[-0.7591840028762817,-0.11517097800970078,-0.6402193903923035,1.8653682470321655,0.6392970681190491,0.04740554466843605,-0.7672685980796814,0.7113415002822876,0.11865929514169693,-0.9922137260437012,0.03765510767698288,2.0947563648223877,0,0,0,1],[-0.7120475172996521,0.34380993247032166,-0.6117913126945496,1.7343871593475342,0.6938766837120056,0.21680980920791626,-0.6864239573478699,0.7652546167373657,-0.10350700467824936,-0.9136407971382141,-0.3931067883968353,0.9663363695144653,0,0,0,1],[-0.7598972916603088,-0.11517098546028137,-0.6402195692062378,4.020143985748291,0.6398985981941223,0.04740559309720993,-0.7672684788703918,-1.1006495952606201,0.11878592520952225,-0.992214024066925,0.03765508905053139,1.8034327030181885,0,0,0,1],[-0.7477409243583679,0.31710001826286316,-0.583884060382843,3.88916277885437,0.6637127995491028,0.3070501685142517,-0.6823664307594299,-1.0467363595962524,-0.036949917674064636,-0.8973257541656494,-0.4398385286331177,0.6750121116638184,0,0,0,1],[-0.7613641023635864,0.10307740420103073,0.6400778293609619,2.9854204654693604,0.6401016116142273,-0.037229765206575394,0.7673876881599426,-0.2092381864786148,0.10293030738830566,0.993976354598999,-0.03763459995388985,2.37733793258667,0,0,0,1],[0.5210915207862854,-0.2750385105609894,-0.8079727292060852,2.8672664165496826,0.8532329797744751,0.14375361800193787,0.5013374090194702,-0.18094059824943542,-0.021738268435001373,-0.9506252408027649,0.3095814287662506,1.0495357513427734,0,0,0,1],[0.3998824954032898,-0.5398621559143066,-0.7407058477401733,2.773423433303833,0.9054767489433289,0.10730060935020447,0.4106205403804779,0.3396817147731781,-0.14219938218593597,-0.8348856568336487,0.5317394137382507,-0.0385211706161499,0,0,0,1],[0.2889184057712555,-0.9573104381561279,0.009238779544830322,1.6759597063064575,0.8793580532073975,0.26917487382888794,0.39279139041900635,0.5578087568283081,-0.3785075843334198,-0.1053573489189148,0.9195833206176758,-1.7357261180877686,0,0,0,1],[0.6086099147796631,-0.00474635511636734,-0.7934569120407104,2.3578805923461914,0.6055301427841187,0.6490131616592407,0.46057137846946716,-0.3388253450393677,0.5127742290496826,-0.7607652544975281,0.3978699743747711,-0.02421271800994873,0,0,0,1],[0.6086273193359375,-0.12280840426683426,-0.783896267414093,2.3482320308685303,0.6040499210357666,0.7123267650604248,0.35738644003868103,0.9805271625518799,0.5144965052604675,-0.6910225749015808,0.5077232122421265,-1.5707414150238037,0,0,0,1],[0.4706829786300659,0.07122437655925751,0.8794227838516235,0.9779952764511108,0.8821566104888916,-0.019875258207321167,-0.47053655982017517,-0.8590248227119446,-0.016034884378314018,0.9972622394561768,-0.07218606770038605,-3.392073154449463,0,0,0,1]]},"root":{"0.0":[[0.9999887943267822,0.004724592436105013,0.000157377275172621,-0.09115003049373627,0.00011207420175196603,0.009587527252733707,-0.999954104423523,0.10864168405532837,-0.0047258841805160046,0.9999428987503052,0.009586833417415619,2.090467929840088,0,0,0,1],[0.9999887943267822,0.004724598024040461,0.0001582247787155211,-0.09037444740533829,0.00011292161798337474,0.009587529115378857,-0.999954104423523,0.11021548509597778,-0.0047258976846933365,0.9999428987503052,0.00958683155477047,2.2546167373657227,0,0,0,1],[0.9995080232620239,0.011178389191627502,0.000030772818718105555,1.3274418115615845,0.00007621292024850845,-0.009585960768163204,0.9999541640281677,0.12013095617294312,0.011166541837155819,-0.999891459941864,-0.009586161002516747,3.2820892333984375,0,0,0,1],[0.9995594024658203,-0.004724687896668911,-0.000045011845941189677,1.340154767036438,-4.963440005667508e-7,-0.009587331674993038,0.9999541640281677,0.10922908037900925,-0.004743360448628664,-0.9999426007270813,-0.009587172418832779,2.144937515258789,0,0,0,1],[0.8882144689559937,-0.45917850732803345,0.035410236567258835,-1.5029398202896118,-0.014180999249219894,0.04958225041627884,0.998669445514679,0.12013077735900879,-0.46007055044174194,-0.8870900273323059,0.03750963509082794,3.2954626083374023,0,0,0,1],[0.8808066248893738,-0.47323814034461975,0.035342730581760406,-2.0251522064208984,-0.013315304182469845,0.04980005696415901,0.9986705183982849,0.1765194535255432,-0.47410932183265686,-0.8796654343605042,0.03754446282982826,2.2865970134735107,0,0,0,1],[0.9999887943267822,0.004724606405943632,0.0001553436159156263,-0.08345380425453186,0.00011004145198967308,0.009587324224412441,-0.999954104423523,0.12425941228866577,-0.004725878592580557,0.9999428987503052,0.009586639702320099,3.7193448543548584,0,0,0,1],[0.999970018863678,-0.008683126419782639,-0.00006554686842719093,-0.09726791083812714,-0.00001767202775226906,-0.009587090462446213,0.999954104423523,0.11150693893432617,-0.008683455176651478,-0.9999161958694458,-0.009583610109984875,2.3893351554870605,0,0,0,1],[0.9999832510948181,-0.006995632778853178,-0.00005621922900900245,0.3118215799331665,-0.000010822443982760888,-0.009587334468960762,0.999954104423523,0.10060971975326538,-0.006995962932705879,-0.9999294281005859,-0.009583903476595879,1.2508057355880737,0,0,0,1],[0.9999966025352478,-0.004724635276943445,-0.00004535818879958242,0.2976004481315613,8.918959792936221e-8,-0.009587506763637066,0.999954104423523,0.08112002164125443,-0.004724983125925064,-0.9999427795410156,-0.009584126994013786,-0.7819098234176636,0,0,0,1],[0.9999832510948181,-0.006995632778853178,-0.00005622032404062338,-0.48394107818603516,-0.000010821140676853247,-0.009587305597960949,0.999954104423523,0.10060954093933105,-0.006995962932705879,-0.9999294877052307,-0.009583873674273491,1.2545653581619263,0,0,0,1],[0.9999966025352478,-0.004724590107798576,-0.000045356748159974813,-0.4981622099876404,8.82255335454829e-8,-0.009587499313056469,0.999954104423523,0.08111989498138428,-0.0047249384224414825,-0.9999428391456604,-0.009584118612110615,-0.7781506776809692,0,0,0,1],[0.9999887943267822,0.004724573809653521,0.00015740144590381533,-0.11462728679180145,0.00011209971125936136,0.009587281383574009,-0.999954104423523,0.06100011616945267,-0.0047258660197257996,0.9999428987503052,0.00958658754825592,-2.8784008026123047,0,0,0,1]]},"spread":{"0.0":[[0.9999887943267822,0.004724592436105013,0.000157377275172621,-0.09115003049373627,0.00011207420175196603,0.009587527252733707,-0.999954104423523,0.10864168405532837,-0.0047258841805160046,0.9999428987503052,0.009586833417415619,2.090467929840088,0,0,0,1],[0.9999887943267822,0.004724598024040461,0.0001582247787155211,-0.09037444740533829,0.00011292161798337474,0.009587529115378857,-0.999954104423523,0.11021548509597778,-0.0047258976846933365,0.9999428987503052,0.00958683155477047,2.2546167373657227,0,0,0,1],[0.43330568075180054,0.9007294178009033,0.008605663664638996,1.3274418115615845,0.00007386039942502975,-0.009589431807398796,0.999954104423523,0.12013095617294312,0.901150107383728,-0.4334859549999237,-0.0042235879227519035,3.2820892333984375,0,0,0,1],[0.4475816488265991,0.8937217593193054,0.008572956547141075,2.3518190383911133,-0.0000029037983040325344,-0.00959076453000307,0.999954104423523,0.10922513157129288,0.8941392302513123,-0.4477679133415222,-0.004291987977921963,2.7890963554382324,0,0,0,1],[0.5665212869644165,-0.8246296644210815,-0.007960245944559574,-1.5029398202896118,0.0000844169408082962,-0.009594985283911228,0.9999540448188782,0.12013077735900879,-0.8242354393005371,-0.5662224292755127,-0.005363499280065298,3.2954626083374023,0,0,0,1],[0.5533422231674194,-0.8335299491882324,-0.00800336617976427,-2.4407708644866943,0.000007823029591236264,-0.009596442803740501,0.9999540448188782,0.10921863466501236,-0.8331314921379089,-0.5530502200126648,-0.005300976801663637,2.6515116691589355,0,0,0,1],[0.9999887943267822,0.004724606405943632,0.0001553436159156263,-0.08345380425453186,0.00011004145198967308,0.009587324224412441,-0.999954104423523,0.12425941228866577,-0.004725878592580557,0.9999428987503052,0.009586639702320099,3.7193448543548584,0,0,0,1],[0.999970018863678,-0.008683126419782639,-0.00006554686842719093,-0.09726791083812714,-0.00001767202775226906,-0.009587090462446213,0.999954104423523,0.11150693893432617,-0.008683455176651478,-0.9999161958694458,-0.009583610109984875,2.3893351554870605,0,0,0,1],[0.84458988904953,0.5354036092758179,0.00513378856703639,0.3118215799331665,-0.000003264285624027252,-0.009582985192537308,0.999954104423523,0.10060971975326538,0.5354238748550415,-0.844544529914856,-0.0080886110663414,1.2508057355880737,0,0,0,1],[0.8433717489242554,0.5373203158378601,0.005143041722476482,1.4002217054367065,0.000007637452654307708,-0.009583140723407269,0.999954104423523,0.08112886548042297,0.537340521812439,-0.8433264493942261,-0.008082919754087925,-0.46603429317474365,0,0,0,1],[0.6822206974029541,-0.7311234474182129,-0.006989925634115934,-0.48394107818603516,-0.000020296312868595123,-0.00957906898111105,0.9999541640281677,0.10060954093933105,-0.731151282787323,-0.6821838617324829,-0.006546554155647755,1.2545653581619263,0,0,0,1],[0.6838794350624084,-0.7295722365379333,-0.006982636637985706,-1.9702122211456299,-0.000009405625860381406,-0.009579284116625786,0.9999541640281677,0.08113664388656616,-0.7296000719070435,-0.6838425993919373,-0.00655461335554719,-0.13221848011016846,0,0,0,1],[0.9999887943267822,0.004724573809653521,0.00015740144590381533,-0.11462728679180145,0.00011209971125936136,0.009587281383574009,-0.999954104423523,0.06100011616945267,-0.0047258660197257996,0.9999428987503052,0.00958658754825592,-2.8784008026123047,0,0,0,1]]},"wave":{"0.0":[[0.9999887943267822,0.004724592436105013,0.000157377275172621,-0.09115003049373627,0.00011207420175196603,0.009587527252733707,-0.999954104423523,0.10864168405532837,-0.0047258841805160046,0.9999428987503052,0.009586833417415619,2.090467929840088,0,0,0,1],[0.9999887943267822,0.004724598024040461,0.0001582247787155211,-0.09037444740533829,0.00011292161798337474,0.009587529115378857,-0.999954104423523,0.11021548509597778,-0.0047258976846933365,0.9999428987503052,0.00958683155477047,2.2546167373657227,0,0,0,1],[0.43330568075180054,0.9007294178009033,0.008605663664638996,1.3274418115615845,0.00007386039942502975,-0.009589431807398796,0.999954104423523,0.12013095617294312,0.901150107383728,-0.4334859549999237,-0.0042235879227519035,3.2820892333984375,0,0,0,1],[0.4475816488265991,0.8937217593193054,0.008572956547141075,2.3518190383911133,-0.0000029037983040325344,-0.00959076453000307,0.999954104423523,0.10922513157129288,0.8941392302513123,-0.4477679133415222,-0.004291987977921963,2.7890963554382324,0,0,0,1],[0.5665212869644165,-0.8246296644210815,-0.007960245944559574,-1.5029398202896118,0.0000844169408082962,-0.009594985283911228,0.9999540448188782,0.12013077735900879,-0.8242354393005371,-0.5662224292755127,-0.005363499280065298,3.2954626083374023,0,0,0,1],[0.5533422231674194,-0.8335299491882324,-0.00800336617976427,-2.4407708644866943,0.000007823029591236264,-0.009596442803740501,0.9999540448188782,0.10921863466501236,-0.8331314921379089,-0.5530502200126648,-0.005300976801663637,2.6515116691589355,0,0,0,1],[0.9999887943267822,0.004724606405943632,0.0001553436159156263,-0.08345380425453186,0.00011004145198967308,0.009587324224412441,-0.999954104423523,0.12425941228866577,-0.004725878592580557,0.9999428987503052,0.009586639702320099,3.7193448543548584,0,0,0,1],[0.999970018863678,-0.008683126419782639,-0.00006554686842719093,-0.09726791083812714,-0.00001767202775226906,-0.009587090462446213,0.999954104423523,0.11150693893432617,-0.008683455176651478,-0.9999161958694458,-0.009583610109984875,2.3893351554870605,0,0,0,1],[0.9999832510948181,-0.006995632778853178,-0.00005621922900900245,0.3118215799331665,-0.000010822443982760888,-0.009587334468960762,0.999954104423523,0.10060971975326538,-0.006995962932705879,-0.9999294281005859,-0.009583903476595879,1.2508057355880737,0,0,0,1],[0.9999966025352478,-0.004724635276943445,-0.00004535818879958242,0.2976004481315613,8.918959792936221e-8,-0.009587506763637066,0.999954104423523,0.08112002164125443,-0.004724983125925064,-0.9999427795410156,-0.009584126994013786,-0.7819098234176636,0,0,0,1],[0.9999832510948181,-0.006995632778853178,-0.00005622032404062338,-0.48394107818603516,-0.000010821140676853247,-0.009587305597960949,0.999954104423523,0.10060954093933105,-0.006995962932705879,-0.9999294877052307,-0.009583873674273491,1.2545653581619263,0,0,0,1],[0.9999966025352478,-0.004724590107798576,-0.000045356748159974813,-0.4981622099876404,8.82255335454829e-8,-0.009587499313056469,0.999954104423523,0.08111989498138428,-0.0047249384224414825,-0.9999428391456604,-0.009584118612110615,-0.7781506776809692,0,0,0,1],[0.9999887943267822,0.004724573809653521,0.00015740144590381533,-0.11462728679180145,0.00011209971125936136,0.009587281383574009,-0.999954104423523,0.06100011616945267,-0.0047258660197257996,0.9999428987503052,0.00958658754825592,-2.8784008026123047,0,0,0,1]]}},"inverseBindPoses":[[0.9999889135360718,0.00011207439820282161,-0.0047258841805160046,0.10101616382598877,0.0047245929017663,0.009587470442056656,0.9999428987503052,-2.0909597873687744,0.00015737733338028193,-0.9999540448188782,0.00958689022809267,0.08860994875431061,0,0,0,1],[0.9999889135360718,0.00011292181443423033,-0.004725898150354624,0.1010160893201828,0.004724598024040461,0.009587472304701805,0.9999428987503052,-2.255117893218994,0.00015822485147509724,-0.9999540448188782,0.009586888365447521,0.0886099562048912,0,0,0,1],[1.000367283821106,0.00007642118725925684,0.011182975955307484,-1.3646419048309326,0.011171558871865273,-0.009585905820131302,-0.9998916983604431,3.2680556774139404,0.000030850638722768053,0.9999539256095886,-0.009586215019226074,-0.08870355784893036,0,0,0,1],[1.0004184246063232,-2.87258131947965e-7,-0.004726933315396309,-1.3305764198303223,-0.00474518584087491,-0.009587278589606285,-0.9999430775642395,2.1522216796875,-0.00004499918213696219,0.9999539256095886,-0.009587227366864681,-0.08859974145889282,0,0,0,1],[0.999426007270813,0.00007612113404320553,0.011172453872859478,1.4652494192123413,0.011186526156961918,-0.009585951454937458,-0.9998913407325745,3.3130688667297363,0.00003090565951424651,0.9999539852142334,-0.009586265310645103,-0.08848763257265091,0,0,0,1],[0.9994775056838989,-3.2813406392051547e-7,-0.0047223311848938465,1.4996405839920044,-0.004700134973973036,-0.00958727765828371,-0.9999425411224365,2.1522293090820312,-0.000044987405999563634,0.9999538660049438,-0.009587232023477554,-0.08859863877296448,0,0,0,1],[0.9999889135360718,0.00011004164116457105,-0.004725878592580557,0.10101637989282608,0.004724606871604919,0.009587266482412815,0.9999428987503052,-3.7199294567108154,0.00015534370322711766,-0.9999540448188782,0.009586697444319725,0.08861043304204941,0,0,0,1],[0.9999545216560364,-0.000017674185073701665,-0.008683290332555771,0.11801274865865707,-0.008683159947395325,-0.009583817794919014,-0.9999164938926697,2.389359712600708,-0.00006557802407769486,0.9999539852142334,-0.009586882777512074,-0.08860190957784653,0,0,0,1],[0.9999678134918213,-0.000010830125575012062,-0.006995797157287598,-0.3030600845813751,-0.006995691917836666,-0.009584062732756138,-0.9999297261238098,1.2538634538650513,-0.00005625052654067986,0.9999539852142334,-0.009587176144123077,-0.08859585225582123,0,0,0,1],[0.9999810457229614,7.409050084561386e-8,-0.004724816419184208,-0.3012892007827759,-0.004724728409200907,-0.009584234096109867,-0.99994295835495,-0.7796816229820251,-0.00004538963912636973,0.9999539852142334,-0.009587399661540985,-0.08859926462173462,0,0,0,1],[0.9999677538871765,-0.000010828814993146807,-0.00699579669162631,0.49270322918891907,-0.006995691452175379,-0.009584031999111176,-0.9999296069145203,1.2520560026168823,-0.000056251617934321985,0.9999539256095886,-0.00958714634180069,-0.08860442042350769,0,0,0,1],[0.9999811053276062,7.312280558835482e-8,-0.004724771250039339,0.49447622895240784,-0.004724683705717325,-0.009584225714206696,-0.99994295835495,-0.7796825170516968,-0.00004538821303867735,0.9999540448188782,-0.009587392210960388,-0.08859921991825104,0,0,0,1],[0.9999889135360718,0.00011209990771021694,-0.0047258660197257996,0.10101624578237534,0.004724574275314808,0.009587224572896957,0.9999428987503052,2.8781933784484863,0.00015740151866339147,-0.9999540448188782,0.009586644358932972,0.08860956132411957,0,0,0,1]],"jointNameIndices":{"root":0,"chest":1,"arm.l":2,"arm1.l":3,"arm.r":4,"arm1.r":5,"head":6,"hips":7,"leg.l":8,"leg1.l":9,"leg.r":10,"leg1.r":11,"board":12}}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map