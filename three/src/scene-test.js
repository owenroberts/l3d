/* longies 3 */

import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Sky } from 'three/addons/objects/Sky.js';

import * as Cool from '../../cool/cool.js';
import { PostProcessing } from './PostProcessing.js';
import { Doodoo } from '../../doodoo/src/Doodoo.js';
import { CameraControls } from './CameraControls.js';

const debug = false;
let w = 960, h = 540;
const stats = new Stats();
const container = document.getElementById("longies");
if (debug) container.appendChild(stats.dom);

const renderer = new THREE.WebGLRenderer({ 
	antialias: false,
});
renderer.setSize(w, h);
renderer.setClearColor(0x123123, 1);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.4;
container.appendChild(renderer.domElement);

let debugRender = true;
debugRender = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);

let controls;
let useControls = debug; // debug
controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 8);

const sky = new Sky();
const sun = new THREE.Vector3();
const skyScene = new THREE.Scene();
sky.scale.setScalar(10);
skyScene.add(sky);
const phi = THREE.MathUtils.degToRad(15);
const theta = THREE.MathUtils.degToRad(15);
sun.setFromSphericalCoords( 1, phi, theta );
sky.material.uniforms[ 'sunPosition' ].value.copy(sun);
sky.material.uniforms[ 'turbidity' ].value = 0.5;
sky.material.uniforms[ 'rayleigh' ].value = 0.25;

const post = new PostProcessing({ scene, skyScene, renderer, camera });

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

cube.position.set(8, 0, 0);
let speed = 0.01;
let target = new THREE.Vector3(8, 0, 0);
// let count = 5, counter = 0;


let cubeAnimation = Cool.CounterSequence();

cubeAnimation.add(5, true, () => {
	if (cube.position.x > -8) {
		cube.position.x -= 0.5;
	} else {
		cubeAnimation.next();
	}
});

cubeAnimation.add(24);
cubeAnimation.add(5, true, () => {
	if (cube.position.x < 8) {
		cube.position.x += 0.5;
	}
});

let previousTime = null;
function animate(time) {
	if (!previousTime) previousTime = time;
	if (debug) stats.update();
	requestAnimationFrame(animate);
	const timeElapsed = time - previousTime;
	previousTime = time;

	// renderer.clear();
	if (debugRender) renderer.render(scene1, camera);
	else post.process();

	cubeAnimation.update();
}
requestAnimationFrame(animate);

