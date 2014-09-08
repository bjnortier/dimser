
var $ = require('jquery');

var Viewport = require('./viewport');
var Trackball = require('./trackball');

var viewport = new Viewport($('#viewport')[0]);
new Trackball([viewport]);

var boxGeom = new THREE.BoxGeometry(50,150,30);
var boxMat1 = new THREE.MeshLambertMaterial({
  color: 0x0000ff,
  // transparent: true,
  // opacity: 0.2,
});
var boxMat2 = new THREE.MeshBasicMaterial({
  color: 0x006600,
  wireframe: true,
});
viewport.scene.add(THREE.SceneUtils.createMultiMaterialObject(
  boxGeom,
  [
    boxMat1,
    boxMat2,
  ]));

var dimser = require('../../..');
var lines = dimser.linear([25, -75, 15], [25, 75, 15], [0,0,1], '50.0');

lines.forEach(function(points) {
  viewport.addLine(points);
});
