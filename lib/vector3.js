"use strict";

// # class Vector

// Represents a 3D vector.
//
// Derived from the Vector implementation in CSG.js
// https://github.com/evanw/csg.js/blob/master/csg.js
// and Three.js Vector3
// http://threejs.org/docs/#Reference/Math/Vector3
//
// Vector objects are immutable, and all functions
// return new Vector objects

var util = require('util');

var Vector = function(x) {
  Array.call(this);
  if (arguments.length === 3) {
    this[0] = arguments[0];
    this[1] = arguments[1];
    this[2] = arguments[2];
  } else if ('x' in x) {
    this[0] = x[0];
    this[1] = x[1];
    this[2] = x[2];
  } else {
    this[0] = x[0];
    this[1] = x[1];
    this[2] = x[2];
  }
};

util.inherits(Vector, Array);

Vector.prototype.negate = function() {
  return new Vector(-this[0], -this[1], -this[2]);
};

Vector.prototype.add = function(a) {
  return new Vector(this[0] + a[0], this[1] + a[1], this[2] + a[2]);
};

Vector.prototype.sub = function(a) {
  return new Vector(this[0] - a[0], this[1] - a[1], this[2] - a[2]);
};

Vector.prototype.multiplyScalar = function(a) {
  return new Vector(this[0] * a, this[1] * a, this[2] * a);
};

Vector.prototype.divideScalar = function(a) {
  return new Vector(this[0] / a, this[1] / a, this[2] / a);
};

Vector.prototype.length = function() {
  return Math.sqrt(this.dot(this));
};

Vector.prototype.normalize = function() {
  return this.divideScalar(this.length());
};

Vector.prototype.dot = function(a) {
  return this[0] * a[0] + this[1] * a[1] + this[2] * a[2];
};

Vector.prototype.cross = function(a) {
  return new Vector(
    this[1] * a[2] - this[2] * a[1],
    this[2] * a[0] - this[0] * a[2],
    this[0] * a[1] - this[1] * a[0]
  );
};

// http://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line#Vector_formulation
Vector.prototype.distanceToLine = function(a,b) {
  var n = b.subtract(a).normalize();
  var perpendicular = (a.sub(this)).sub(n.multiplyScalar(a.sub(this).dot(n)));
  return perpendicular.length();
};

Vector.prototype.toString = function() {
  return JSON.stringify(this);
};

Vector.prototype.toArray = function() {
  return [this[0], this[1], this[2]];
};

// Adapted from Vector3 in THREE.js
// https://github.com/mrdoob/three.js/blob/master/src/math/Vector3.js
Vector.prototype.applyQuaternion = function(q) {
  var x = this[0];
  var y = this[1];
  var z = this[2];

  var qx = q[0];
  var qy = q[1];
  var qz = q[2];
  var qw = q[3];

  // calculate quat * vector
  var ix =  qw * x + qy * z - qz * y;
  var iy =  qw * y + qz * x - qx * z;
  var iz =  qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z;

  // calculate result * inverse quat
  this[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  this[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  this[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  return this;
};


module.exports = Vector;