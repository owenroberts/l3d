import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CatLines } from './CatLines.js';
import { Pig } from './Pig.js';
import * as Cool from '../../cool/cool.js';
import { getAxesHelper } from '../../tre/Tre.js';
import { Lighting } from './Lighting.js';
import { PostProcessing } from './PostProcessing.js';

const debug = false;
let dpr = 1; // devicePixelRatio;
let w = 960 * dpr, h = 540 * dpr;
const scene = new THREE.Scene();
const container = document.getElementById("longies");
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

let debugRender = true;
debugRender = false;

const lights = Lighting({ scene, debugRender });
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(0, 5, 4);
const controls = new OrbitControls(camera, renderer.domElement);
// controls.minDistance = worldRadius + 5;
controls.maxDistance = 1_100;
let useControls = false; // debug

const post = new PostProcessing({ scene1: scene, noScene2: true, renderer, camera });

let cat = CatLines();
scene.add(cat.getModel());
cat.getModel().position.x -= 2;

let pig = Pig();
scene.add(pig.getModel());
pig.getModel().position.x += 2;


let previousTime = null;
function animate(time) {
	if (!previousTime) previousTime = time;
	if (debug) stats.update();
	requestAnimationFrame(animate);
	const timeElapsed = time - previousTime;
	previousTime = time;

	if (debugRender) renderer.render(scene, camera);
	else post.process();

	cat.update(timeElapsed, true);
	pig.update(timeElapsed, true);
}
requestAnimationFrame(animate);