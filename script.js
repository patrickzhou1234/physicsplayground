/// <reference path="babylon.d.ts" />

const canvas = document.getElementById("babcanv"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true);
var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true;
    scene.enablePhysics(new BABYLON.Vector3(0,-9.81, 0), new BABYLON.AmmoJSPlugin);
    
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 10, 30, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 20, -30));
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 30, height: 30}, scene);
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.MeshImpostor, {mass:0, restitution:0.3}, scene);
    var wallz = [15, 0, 0, -15];
    var wallrot = [0, 1, 1, 0];
    var wallx = [null, -15, 15, null];
    for (i=0;i<4;i++) {
        var wall = BABYLON.MeshBuilder.CreatePlane("wall", {width:30, height:2}, scene);
        wall.physicsImpostor = new BABYLON.PhysicsImpostor(wall, BABYLON.PhysicsImpostor.MeshImpostor, {mass:0, restitution: 0.9}, scene);
        wall.position.y = 1;
        wall.position.z = wallz[i];
        if (wallrot[i] == 1) {
            wall.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI/2, BABYLON.Space.LOCAL);
        }
        if  (!(wallx[i] == null)) {
            wall.position.x = wallx[i];
        }
    }
    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});
