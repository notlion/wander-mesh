(function(){

'use strict';

// Vec2 ripped from Plask.org

function Vec2(x, y) {
  this.x = x; this.y = y;
}

Vec2.prototype.set = function(x, y) {
  this.x = x; this.y = y;

  return this;
};

Vec2.prototype.setVec2 = function(v) {
  this.x = v.x; this.y = v.y;

  return this;
};

// Returns the dot product, this . b.
Vec2.prototype.dot = function(b) {
  return this.x * b.x + this.y * b.y;
};

// Add two Vec2s, this = a + b.
Vec2.prototype.add2 = function(a, b) {
  this.x = a.x + b.x;
  this.y = a.y + b.y;

  return this;
};

// Add a Vec2, this = this + b.
Vec2.prototype.add = function(b) {
  return this.add2(this, b);
};

Vec2.prototype.added = function(b) {
  return new Vec2(this.x + b.x,
                  this.y + b.y);
};

// Subtract two Vec2s, this = a - b.
Vec2.prototype.sub2 = function(a, b) {
  this.x = a.x - b.x;
  this.y = a.y - b.y;

  return this;
};

// Subtract another Vec2, this = this - b.
Vec2.prototype.sub = function(b) {
  return this.sub2(this, b);
};

Vec2.prototype.subbed = function(b) {
  return new Vec2(this.x - b.x,
                  this.y - b.y);
};

// Multiply two Vec2s, this = a * b.
Vec2.prototype.mul2 = function(a, b) {
  this.x = a.x * b.x;
  this.y = a.y * b.y;

  return this;
};

// Multiply by another Vec2, this = this * b.
Vec2.prototype.mul = function(b) {
  return this.mul2(this, b);
};

Vec2.prototype.mulled = function(b) {
  return new Vec2(this.x * b.x,
                  this.y * b.y);
};

// Multiply by a scalar.
Vec2.prototype.scale = function(s) {
  this.x *= s; this.y *= s;

  return this;
};

Vec2.prototype.scaled = function(s) {
  return new Vec2(this.x * s, this.y * s);
};

// Interpolate between this and another Vec2 |b|, based on |t|.
Vec2.prototype.lerp = function(b, t) {
  this.x = this.x + (b.x-this.x)*t;
  this.y = this.y + (b.y-this.y)*t;

  return this;
};

Vec2.prototype.lerped = function(b, t) {
  return new Vec2(this.x + (b.x-this.x)*t,
                  this.y + (b.y-this.y)*t);
};

// Magnitude (length).
Vec2.prototype.length = function() {
  var x = this.x, y = this.y;
  return Math.sqrt(x*x + y*y);
};

// Magnitude squared.
Vec2.prototype.lengthSquared = function() {
  var x = this.x, y = this.y;
  return x*x + y*y;
};

// Distance to Vec2 |b|.
Vec2.prototype.dist = function(b) {
  var x = b.x - this.x;
  var y = b.y - this.y;
  return Math.sqrt(x*x + y*y);
};

// Squared Distance to Vec2 |b|.
Vec2.prototype.distSquared = function(b) {
  var x = b.x - this.x;
  var y = b.y - this.y;
  return x*x + y*y;
};

// Normalize, scaling so the magnitude is 1.  Invalid for a zero vector.
Vec2.prototype.normalize = function() {
  return this.scale(1/this.length());
};

Vec2.prototype.normalized = function() {
  return this.dup().normalize();
};

// Rotate around the origin by |theta| radians (counter-clockwise).
Vec2.prototype.rotate = function(theta) {
  var st = Math.sin(theta);
  var ct = Math.cos(theta);
  var x = this.x, y = this.y;
  this.x = x * ct - y * st;
  this.y = x * st + y * ct;
  return this;
};

Vec2.prototype.rotated = function(theta) {
  return this.dup().rotate(theta);
};

// Reflect a vector about the normal |n|.  The vectors should both be unit.
Vec2.prototype.reflect = function(n) {
  // r = u - 2(u.n)n
  // This could could basically be:
  //   this.sub(n.scaled(this.dot(n) * 2));
  // But we avoid some extra object allocated / etc and just flatten it.
  var s = this.dot(n) * 2;
  this.x -= n.x * s;
  this.y -= n.y * s;

  return this;
};

Vec2.prototype.reflected = function(n) {
  var s = this.dot(n) * 2;
  return new Vec2(this.x - n.x * s, this.y - n.y * s);
};

Vec2.prototype.dup = function() {
  return new Vec2(this.x, this.y);
};

Vec2.prototype.debugString = function() {
  return 'x: ' + this.x + ' y: ' + this.y;
};

angular.module('tracks.vec', []).factory('vec', function() {
  return { Vec2: Vec2 };
});

}());
