/*
	two
*/

import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { PostProcessing } from './PostProcessing.js';
import { Globe } from './Globe.js';
import { NoiseEffect } from './NoiseEffect.js';
import { CameraControls } from './CameraControls.js';
import { Follow } from './Follow.js';
import { CatLines } from './CatLines.js';
import { Pig } from './Pig.js';
import { Breadcrumbs } from './Breadcrumbs.js';
import { Scenery } from './Scenery.js';
import { Particles } from './DumbParticles.js';
import { Lighting } from './Lighting.js';
import { Flock } from './Flock.js';
import { Bird } from './Bird.js';
import { Worm } from './Worm.js';

import { Doodoo } from '../../doodoo/src/Doodoo.js';
import * as Cool from '../../cool/cool.js';
import { getAxesHelper } from '../../tre/Tre.js';

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
const frustum = new THREE.Frustum();

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

// set original camera position
let followTarget = follow.getTarget(); // used in anim update
const cameraGoal = cc.getGoal();
camera.position.copy(followStart.position).addScaledVector(followStart.normal, 150); // 1000 for final
followTarget.add(cameraGoal); // parents camera goal to the cat
const cameraGoalOrigin = new THREE.Vector3(0, 4, -8);
cameraGoal.position.copy(cameraGoalOrigin); // camera offset
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
	if (Cool.chance(0.1) && doodoo.isPlaying()) {
		// const coord = Cool.random(['x', 'y', 'z']);
		const amount = Cool.random(-1, 1);
		cameraGoal.translateZ(amount);
		cameraGoal.position.z = Math.min(cameraGoalOrigin.z, cameraGoal.position.z);
	}
}

function sceneUpdate(timeElapsed) {
	
	follow.update(timeElapsed, tracks[0] === 'play');
	if (follow.reachedNext()) {
		follow.setTarget(globe.getNext(follow.getNextPosition()));
	}

	particles.update();

	for (let i = flocks.length - 1; i >= 0; i--) {
		flocks[i].update(timeElapsed, tracks[Math.min(i, tracks.length - 1)] === 'play');
		if (flocks[i].reachedNext()) {
			flocks[i].setTarget(globe.getNext(flocks[i].getNextPosition()));
		}
		if (flocks[i].getNextCount() > 1) {
			camera.updateMatrix();
			camera.updateMatrixWorld();
			frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
			if (!frustum.containsPoint(flocks[i].getTarget().position)) {
				if (flocks[i].getType() === 'flock') {
					flocks[i].getFlock().getMembers().forEach(m => {
						scene1.remove(m.getObject());
					});
				} else {
					scene1.remove(flocks[i].getTarget());
				}
				flocks.splice(i, 1);
			}
		}
	}

	if (tracks[1] === 'play') {
		// noiseEffect.update();
		// post.update(noiseEffect.getValue());
		post.update();
	}
}

function addThing() {

	let follower = Follow();
	scene1.add(follower.getTarget());

	// next position for player
	const next = follow.getNext(); 
	// get start position for cat around next position for player'
	const start = globe.getNext(next.position); 
	// aim him toward next position of the player
	follower.setup(start, next);
	flocks.push(follower);

	// scene1.add(getAxesHelper(next.position));

	const type = Cool.random(['cat', 'birds', 'worms', 'pig']);
	// console.log('add', type);

	if (type === 'cat') {
		let cat = CatLines();
		follower.addAnimation(cat); // add obj with update func
		follower.getTarget().add(cat.getModel()); // parent model
	}

	if (type === 'pig') {
		let pig = Pig();
		follower.addAnimation(pig);
		follower.getTarget().add(pig.getModel());
	}

	if (type === 'birds') {
		let birdFlock = new Flock({ 
			type: Bird,
			height: 10,
			boundaries: [worldRadius, worldRadius + 25],
		});

		birdFlock.getMembers().forEach(m => {
			scene1.add(m.getObject());
			m.setup(start, next);
		});

		follower.addFlock(birdFlock);
	}

	if (type === 'worms') {
		let wormFlock = new Flock({
			type: Worm, 
			height: 1, 
			boundaries: [worldRadius, worldRadius + 1],
		});

		wormFlock.getMembers().forEach(m => {
			scene1.add(m.getObject());
			m.setup(start, next);
		});

		follower.addFlock(wormFlock);
	}
}

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
	// console.log('on mod', playCount, sequenceCount);
	if (sequenceCount % 1 === 0 && sequenceCount > 0) {
		addThing();
	}
}

function animate(time) {
	if (!previousTime) previousTime = time;
	if (debug) stats.update();
	requestAnimationFrame(animate);
	const timeElapsed = time - previousTime;
	previousTime = time;

	// renderer.clear();
	if (debugRender) renderer.render(scene1, camera);
	else post.process();

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
	for (let i = 0; i < tracks.length; i++) {
		tracks[i] = 'rest';
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
	controls.addDoodoo(doodoo);
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