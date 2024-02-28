import * as THREE from 'three';
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './doodoo/ui/lib/cool/cool.js'; // fuck off

import CameraControls from './src/CameraControls.js';
import CatLines from './src/CatLines.js';
import Flock from './src/Flock.js';
import Bird from './src/Bird.js';
import Worm from './src/Worm.js';
import Globe from './src/Globe.js';


let w = 960, h = 540;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera( 75, w / h, 0.1, 1000 );
camera.position.set(50, 50, 50);
camera.lookAt(new THREE.Vector3(0, 0, 0));
// scene.add(new THREE.AxesHelper(5));

const renderer = new THREE.WebGLRenderer();
renderer.setSize( w, h );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls(camera, renderer.domElement);

const showCube = false;
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const cube = new THREE.Mesh(geometry, material);
if (showCube) scene.add(cube);

function lights() {
	const light = new THREE.DirectionalLight(0xffffff, 0.5);
	light.castShadow = true;
	light.position.set(2, 2, 2);
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;
	light.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(light);
	scene.add(new THREE.AmbientLight(0xeeefff, 0.1));
}
lights();

const X_AXIS = new THREE.Vector3(1, 0, 0);
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const Z_AXIS = new THREE.Vector3(0, 0, 1);

const worldRadius = 128;
const globe = new Globe({ scene, worldRadius });
scene.add(globe.getGlobe());

const cc = new CameraControls({ camera });
let useControls = false; // debug
let ccTarget;

// let birdFlock = new Flock({ 
// 	scene, 
// 	globe, 
// 	type: Bird, 
// 	height: 10, 
// 	boundaries: [worldRadius, worldRadius + 25]
// });

let wormFlock = new Flock({
	scene, 
	globe, 
	type: Worm, 
	height: 0, 
	boundaries: [worldRadius, worldRadius + 2]
});

const b = wormFlock.getFlock()[0].getObject();
b.add(cc.getGoal()); // parents camera goal to the cat
cc.getGoal().position.set(0, 2, -4);
camera.position.copy(b.position).add(new THREE.Vector3(0, 4, -8));

let previousTime = null;
function animate(time) {
	if (!previousTime) previousTime = time;
	requestAnimationFrame( animate );
	const timeElapsed = time - previousTime;
	previousTime = time;
	renderer.render(scene, camera);

	wormFlock.update(timeElapsed / 1000);
	// wormFlock.update(timeElapsed);

	if (useControls) {
		controls.update();
	} else {
		cc.update();
		ccTarget =  wormFlock.getFlock()[0].getObject();
		// camera.up.copy(ccTarget.up);
		camera.lookAt(ccTarget.position);
	}

	if (showCube) cube.rotation.x += 0.01;
	if (showCube) cube.rotation.y += 0.01;
}
animate();

function keyDown(ev) {
	if (ev.code === 'KeyC') useControls = !useControls;
}
document.addEventListener('keydown', keyDown);
