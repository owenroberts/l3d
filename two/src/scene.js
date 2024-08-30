/*
	two
*/

import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { PostProcessing } from './PostProcessing.js';
import { Globe } from './Globe.js';
import { NoiseEffect } from './NoiseEffect.js';
import { CameraControls } from './CameraControls.js';
import { Cat } from './CatLines.js';
import { Scenery } from './Scenery.js';
import { Particles } from './DumbParticles.js';
import { Lighting } from './Lighting.js';
import { Flock } from './Flock.js';
import { Bird } from './Bird.js';
import { Worm } from './Worm.js';

import { Doodoo } from '../../doodoo/src/Doodoo.js';
import * as Cool from '../../cool/cool.js';

import comp from '../compositions/l3d_theme_17.json';

// console.log('perf low?', Cool.testLowPerformance());

const debug = false;
const worldRadius = 128;
let dpr = 1; // devicePixelRatio;
let w = 960 * dpr, h = 540 * dpr;

const scene1 = new THREE.Scene();
const scene2 = new THREE.Scene();

const stats = new Stats();
const container = document.getElementById("longies");
if (debug) container.appendChild(stats.dom);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
// renderer.autoClear = false;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);
// renderer.domElement.style.width = '960px';
// renderer.domElement.style.height = '540px';


let debugRender = true;
debugRender = false;
const lights = new Lighting({ scene: scene1, debugRender });
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(0, 10, 50);
const controls = new OrbitControls(camera, renderer.domElement);
let useControls = false; // debug

let noScene2 = false;
// noScene2 = true;
const post = new PostProcessing({ scene1, scene2, noScene2, renderer, camera });

function addTestCube(x, y, z, size=0.5) {
	var box = new THREE.Mesh(
		new THREE.BoxGeometry(size, size, size), 
		new THREE.MeshBasicMaterial({ color: "red", wireframe: true })
	);
	box.position.set(x, y, z);
	scene1.add(box);
	return box;
}

function addHelper(pos) {
	scene1.add(new THREE.ArrowHelper(pos.normal, pos.position, 1, 0xff00ff));
}

const globe = new Globe({ scene: scene1, worldRadius });
scene1.add(globe.getGlobe());
if (!noScene2) scene2.add(globe.getGlobe().clone());
const scenery = new Scenery({ scene1, scene2, worldRadius, w, h, noScene2 });
const cc = new CameraControls({ camera });
const cat = new Cat({ globe, scene: scene1 });
const particles = new Particles({ scene: scene1, worldRadius });
const flocks = [];
for (let i = 0; i < 5; i++) {
	if (Cool.chance(0.5)) {
		let birdFlock = new Flock({ 
			scene: scene1, 
			globe, 
			type: Bird, 
			height: 10, 
			boundaries: [worldRadius, worldRadius + 25],
		});
		flocks.push(birdFlock);
	} else {
		let wormFlock = new Flock({
			scene: scene1, 
			globe, 
			type: Worm, 
			height: 0, 
			boundaries: [worldRadius - 0.5, worldRadius + 0.5],
		});
		flocks.push(wormFlock);
	}
	// flocks[i].globeSetup();
}

cat.globeSetup();
const catStart = cat.getStart();
camera.position.copy(catStart.position).addScaledVector(catStart.normal, 10); // 1000 for final
scene1.add(cat.getModel());
cat.getModel().add(cc.getGoal()); // parents camera goal to the cat
cc.getGoal().position.set(4, 4, -8);
lights.setPosition(cat.getModel());

const noiseEffect = new NoiseEffect();
let previousTime = null;
let catModel;

function animate(time) {
	if (!previousTime) previousTime = time;
	if (debug) stats.update();
	requestAnimationFrame(animate);
	const timeElapsed = time - previousTime;
	previousTime = time;

	// renderer.clear();
	if (debugRender) renderer.render(scene1, camera);
	else post.process();

	cat.update(timeElapsed, tracks[0] === 'play');

	particles.update();

	for (let i = 0; i < flocks.length; i++) {
		flocks[i].update(timeElapsed / 1000);
	}

	if (tracks[1] === 'play') {
		// noiseEffect.update();
		// post.update(noiseEffect.getValue());
		post.update();
	}

	if (useControls) {
		controls.update();
	} else if (cat.isLoaded()) {
		cc.update();
		// cc.temp.setFromMatrixPosition(cc.goal.matrixWorld);
		// camera.position.lerp(cc.temp, 0.02);
		catModel = cat.getModel();
		camera.up.copy(catModel.up);
		camera.lookAt(catModel.position.clone().addScaledVector(catModel.up, 4));
	}
}
requestAnimationFrame(animate);

function onWindowResize(e) {
	
	if (w === 960 * dpr) {
		w = window.innerWidth * dpr;
		h = window.innerHeight * dpr;
		controlsDiv.style.display = 'none';
		container.style.cursor = 'none';
	} else {
		w = 960 * dpr;
		h = 540 * dpr;
		controlsDiv.style.display = 'block';
		container.style.cursor = 'inherit';
	}

	camera.aspect = w / h;
	camera.updateProjectionMatrix();
	renderer.setSize(w, h);
	post.setSize(w, h);

}

let doodoo;
let tracks = ['rest'];
const modCount = 8;
const controlsDiv = document.getElementById('controls');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const backButton = document.getElementById('back');

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
backButton.addEventListener('click', () => {
	if (doodoo) {
		doodoo.stop();
		setTimeout(() => {
			location.href = '../index.html';
		}, 300);
	} else {
		location.href = '../index.html';
	}
});

document.addEventListener('keydown', keyDown);
function keyDown(ev) {

	/* debugging */
	if (ev.code === 'Comma') doodoo.stop();
	else if (ev.code === 'KeyP') {
		doodoo.printLoops();
		doodoo.printParams();
	}

	/* key commands */
	if (ev.code === 'Space') start();
	if (ev.code === 'Enter') doodoo.stop();
	if (ev.code === 'KeyF') toggleFullScreen();
	if (ev.code === 'KeyC') useControls = !useControls;
	if (ev.code === 'KeyD') debugRender = !debugRender;
}

const fullScreenButton = document.getElementById('fullscreen');
fullScreenButton.addEventListener('click', toggleFullScreen);
document.addEventListener("fullscreenchange", onWindowResize);


function toggleFullScreen() {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else if (document.exitFullscreen) {
		document.exitFullscreen();
	}
}

function start() {
	if (doodoo) {
		if (doodoo.getStatusIsPlaying()) return;
		// doodoo.stop();
		// startDoodoo();
	} else {
		startDoodoo();
	}		
}

function stop() {
	if (doodoo) {
		doodoo.stop();
	}
}

function startDoodoo() {
	doodoo = new Doodoo({
		...comp,
		// withRecording: true,
		withCount: modCount,
		samplesURL: '../doodoo/samples/',
		// onModulate: (playCount, sequenceCount) => {
		// 	if (modCount === sequenceCount) {
		// 		doodoo.stop();
		// 	}
		// },
		onNote: params => {
			// console.log(params.loopIndex, params.note[0]);
			const index = params.loopIndex;
			const note = params.note[0];
			if (tracks[index] === undefined) tracks[index] = 'rest';
			if (note === 'rest') {
				tracks[index] = 'rest';
			} else if (note !== null) {
				tracks[index] = 'play';
			}
		}
	});
	console.log('doodoo', doodoo);
}