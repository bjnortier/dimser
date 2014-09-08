"use strict";

// Heavily adapted from the Quaternion implementation in THREE.js
// https://github.com/mrdoob/three.js/blob/master/src/math/Quaternion.js

var util = require('util');

var Quaternion = function(x, y, z, w) {
  Array.call(this);
  this[0] = x || 0;
  this[1] = y || 0;
  this[2] = z || 0;
  this[3] = (w !== undefined) ? w : 1;
};

util.inherits(Quaternion, Array);

Quaternion.prototype.setFromAxisAngle = function(axis, angle) {
  // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
  // assumes axis is normalized
  var halfAngle = angle/2;
  var s = Math.sin(halfAngle);
  this[0] = axis[0] * s;
  this[1] = axis[1] * s;
  this[2] = axis[2] * s;
  this[3] = Math.cos(halfAngle);
  return this;
};

Quaternion.prototype.toString = function() {
  return JSON.stringify(this);
};

module.exports = Quaternion;