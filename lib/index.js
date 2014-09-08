var hershey = require('hershey');

var V3 = require('./vector3');
var Quaternion = require('./quaternion');

function rotateAroundAxis(position, axis, angle) {
  if (angle !== 0) {
    var quaternion = new Quaternion().setFromAxisAngle(axis, angle);
    return position.applyQuaternion(quaternion);
  } else {
    return position;
  }
}

// Create a linear dimension.
// from and to are corners
// normal is the normal of the dimension plane
module.exports.linear = function(from, to, normal) {

  from = new V3(from);
  to = new V3(to);
  normal = new V3(normal);
  var lines = [];

  // The main direction of the line
  var dimLineDirection = to.sub(from).normalize();
  var dimLength = to.sub(from).length();

  // ----- Bookends -----

  // The hershey height is 24. The bookends are double the text line height
  var bookendDirection = normal.cross(dimLineDirection).normalize();
  lines.push([from.sub(bookendDirection.multiplyScalar(48)), from.sub(bookendDirection)]);
  lines.push([to.sub(bookendDirection.multiplyScalar(48)), to.sub(bookendDirection)]);

  // ----- Text -----

  // Generates lines in the XY plane. Convert to Vector3 coordinates
  var result = hershey.stringToLines('ABC');
  var textCenter = from.add(to.sub(from).multiplyScalar(0.5)).add(new V3(36,0,0));
  var glyphLines = result.lines.map(function(points) {
    return points.map(function(p) {
      // First transform to the default XY orientation, which is from -Y to +Y
      // with text 'up' being in the -X direction. The text is centered on the 
      // X axis
      var p1 = new V3(p[1], -result.width/2 + p[0], 0);
      var p2 = p1.add(textCenter);
      return rotateAroundAxis(p2, new V3(0,0,1), 0);
    });
  });
  lines = lines.concat(glyphLines);

  // ----- Arrows and dimension line -----

  var centeredLines = [
    [
      from,
      from.add(bookendDirection.multiplyScalar(2).add(dimLineDirection.multiplyScalar(8))),
      from.add(bookendDirection.multiplyScalar(-2).add(dimLineDirection.multiplyScalar(8))),
      from,
    ],
    [
      to,
      to.add(bookendDirection.multiplyScalar(2).add(dimLineDirection.multiplyScalar(-8))),
      to.add(bookendDirection.multiplyScalar(-2).add(dimLineDirection.multiplyScalar(-8))),
      to,
    ],
    [
      from, from.add(dimLineDirection.multiplyScalar(dimLength/2 - result.width/2)),
    ],
    [
      to, to.add(dimLineDirection.multiplyScalar(-(dimLength/2 - result.width/2))),
    ]
  ];
  var positionedLines = centeredLines.map(function(line) {
    return line.map(function(p) {
      return p.add(new V3(bookendDirection.multiplyScalar(-36)));
    });
  });

  lines = lines.concat(positionedLines);

  return lines;
};
