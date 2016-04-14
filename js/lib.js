var Lib = window.Lib || {};
Lib.createRay = require('ray-aabb');
window.Lib = Lib;
/*
                    +------+
                   /      /|
(-1, 1, 0) ---->  +------+ |
                  |      | +
                  |      |/
                  +------+
*/

var ray_origin = [-1, 1, 0];
var ray_direction = [1, 0, 0];
var ray = Lib.createRay(ray_origin, ray_direction);

var box = [
  [0, 0, 0],
  [2, 2, 2]
];

console.log(ray.intersects(box));
// outputs: true

// avoid allocating new memory by reusing rays
ray.update(ray_origin, [-1, 0, 0]);

console.log(ray.intersects(box));
// outputs: false

var normal = [0, 0, 0];
var d = ray.intersects(box, normal);
console.log(d);
// outputs: 1

console.log(normal);
// outputs: [ 0, 0, 0 ]

