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
// import { CatLines } from './CatLines.js';
import { Follow } from './Follow.js';
import { CatLines } from './CatLines.js';
import { Breadcrumbs } from './Breadcrumbs.js';
import { Scenery } from './Scenery.js';
import { Particles } from './DumbParticles.js';
import { Lighting } from './Lighting.js';
import { Flock } from './Flock.js';
import { Bird } from './Bird.js';
import { Worm } from './Worm.js';

import { Doodoo } from '../../doodoo/src/Doodoo.js';
import * as Cool from '../../cool/cool.js';

import comp from '../compositions/l3d_theme_17.json';

import { Controls } from '../../public/js/controls.js';

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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

let debugRender = true;
debugRender = false;
const lights = new Lighting({ scene: scene1, debugRender });
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(0, 10, 50);
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = worldRadius + 5;
controls.maxDistance = 1_100;
let useControls = false; // debug

let noScene2 = false;
const post = new PostProcessing({ scene1, scene2, noScene2, renderer, camera });

const globe = new Globe({ scene: scene1, worldRadius });
scene1.add(globe.getGlobe());
if (!noScene2) scene2.add(globe.getGlobe().clone());
const scenery = new Scenery({ scene1, scene2, worldRadius, w, h, noScene2 });

const cc = new CameraControls({ camera });
const follow = Follow();
const breadcrumbs = Breadcrumbs(scene1);
scene1.add(follow.getTarget());
follow.addAnimation(breadcrumbs);
breadcrumbs.setTarget(follow.getTarget());
// follow.globeSetup();
const followStart = globe.getGlobePos(globe.getRandomVertex());
follow.setup(followStart, globe.getNext(followStart.position));

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
		// flocks.push(birdFlock);
	} else {
		let wormFlock = new Flock({
			scene: scene1, 
			globe, 
			type: Worm, 
			height: 0, 
			boundaries: [worldRadius - 0.5, worldRadius + 0.5],
		});
		// flocks.push(wormFlock);
	}
	// flocks[i].globeSetup();
}

// set original camera position
let followTarget = follow.getTarget(); // used in anim update
const cameraGoal = cc.getGoal();
camera.position.copy(followStart.position).addScaledVector(followStart.normal, 150); // 1000 for final
followTarget.add(cameraGoal); // parents camera goal to the cat
const cameraGoalPosition = [0, 4, -8];
cameraGoal.position.set(...cameraGoalPosition); // camera offset
lights.setPosition(followTarget);

const noiseEffect = new NoiseEffect();
let previousTime = null;

camera.up.copy(followTarget.up);
camera.lookAt(followTarget.position.clone().addScaledVector(followTarget.up, 4));

function ccUpdate() {
	cc.update();
	followTarget = follow.getTarget();
	camera.up.copy(followTarget.up);
	camera.lookAt(followTarget.position.clone().addScaledVector(followTarget.up, 4));

	// idk think about this more
	if (Cool.chance(0.5)) {
		// const coord = Cool.random(['x', 'y', 'z']);
		const amount = Cool.random(-1, 1);
		// console.log('cc', coord, amount);
		// cameraGoal.position.x += amount;
	}
}

function sceneUpdate(timeElapsed) {
	// renderer.clear();
	if (debugRender) renderer.render(scene1, camera);
	else post.process();

	follow.update(timeElapsed, tracks[0] === 'play');
	if (follow.reachedNext()) {
		follow.setTarget(globe.getNext(follow.getNextPosition()));
	}

	particles.update();

	for (let i = 0; i < flocks.length; i++) {
		flocks[i].update(timeElapsed, tracks[0] === 'play');
		if (flocks[i].reachedNext()) {
			flocks[i].setTarget(globe.getNext(flocks[i].getNextPosition()));
		}
	}

	if (tracks[1] === 'play') {
		// noiseEffect.update();
		// post.update(noiseEffect.getValue());
		post.update();
	}
}

// circumstance to add bird flock, cat, worms, etc
// number of plays? certain amount of variation?
// find nearby vertex (one that can't be seen?)
// point it at the follow (or follow at it)
// let it go for a while (until out of screen)

function addThing() {

	let catFollow = Follow();
	let cat = CatLines();
	catFollow.addAnimation(cat);
	catFollow.getTarget().add(cat.getModel());
	scene1.add(catFollow.getTarget());

	const followTargetPosition = follow.getTarget().position; 
	const start = globe.getNext(followTargetPosition);
	catFollow.setup(start, globe.getNext(start.position));

	flocks.push(catFollow);
}

addThing();


function onNote(params) {
	const index = params.loopIndex;
	const note = params.note[0];
	if (tracks[index] === undefined) tracks[index] = 'rest';
	if (note === 'rest') {
		tracks[index] = 'rest';
	} else if (note !== null) {
		tracks[index] = 'play';
	}
}

function onModulate(playCount, sequenceCount) {
	console.log('on mod', playCount, sequenceCount);
}

function animate(time) {
	if (!previousTime) previousTime = time;
	if (debug) stats.update();
	requestAnimationFrame(animate);
	const timeElapsed = time - previousTime;
	previousTime = time;

	sceneUpdate(timeElapsed);

	if (useControls) {
		controls.update();
	} else if (doodoo) {
		ccUpdate();
	}
}
requestAnimationFrame(animate);

let doodoo;
let tracks = ['rest'];
const modCount = 8;

function start() {
	if (doodoo) {
		if (doodoo.isPlaying()) return;
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
		withCount: modCount,
		samplesURL: '../doodoo/samples/',
		onNote: params => { onNote(params); },
		onModulate: (playCount, sequenceCount) => {
			onModulate(playCount, sequenceCount);
		},
	});
}

function resize() {
	if (w === 960 * dpr) {
		w = window.innerWidth * dpr;
		h = window.innerHeight * dpr;
		container.style.cursor = 'none';
	} else {
		w = 960 * dpr;
		h = 540 * dpr;
		container.style.cursor = 'inherit';
	}

	camera.aspect = w / h;
	camera.updateProjectionMatrix();
	renderer.setSize(w, h);
	post.setSize(w, h);
}

const debugControls = Controls(start, stop, doodoo, resize);

// three specific controls
document.addEventListener('keydown', keyDown);
function keyDown(ev) {
	if (ev.code === 'KeyC') useControls = !useControls;
	if (ev.code === 'KeyD') debugRender = !debugRender;
}