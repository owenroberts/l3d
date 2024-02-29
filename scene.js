import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import Globe from './src/Globe.js';
import NoiseEffect from './src/NoiseEffect.js';
import CameraControls from './src/CameraControls.js';
import PostProcessing from './src/PostProcessing.js';
import Cat from './src/CatLines.js';

import Scenery from './src/Scenery.js';
import Particles from './src/DumbParticles.js';
import Lighting from './src/Lighting.js';
import Flock from './src/Flock.js';
import Bird from './src/Bird.js';
import Worm from './src/Worm.js';

import './doodoo/build/doodoo.min.js'; // holy shit what
import './doodoo/build/lib/tone/build/Tone.js';
import './doodoo/ui/lib/cool/cool.js'; // fuck off
// https://lea.verou.me/blog/2020/07/import-non-esm-libraries-in-es-modules-with-client-side-vanilla-js/

const worldRadius = 128;
let w = 960, h = 540;
const scene1 = new THREE.Scene();
const scene2 = new THREE.Scene();

const stats = new Stats();
const container = document.getElementById("longies");
container.appendChild(stats.dom);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
// renderer.autoClear = false;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

let debugRender = true;
debugRender = false;
const lights = new Lighting({ scene: scene1, debugRender });
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(0, 10, 50);
const controls = new OrbitControls(camera, renderer.domElement);
let useControls = false; // debug

let noScene2 = false;
noScene2 = true;
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
		console.log('birds');
		let birdFlock = new Flock({ 
			scene: scene1, 
			globe, 
			type: Bird, 
			height: 10, 
			boundaries: [worldRadius, worldRadius + 25],
		});
		flocks.push(birdFlock);
	} else {
		console.log('worms');

		let wormFlock = new Flock({
			scene: scene1, 
			globe, 
			type: Worm, 
			height: 0, 
			boundaries: [worldRadius - 1, worldRadius + 1],
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
	stats.update();
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

function onWindowResize() {
	if (w === 960) {
		w = window.innerWidth;
		h = window.innerHeight;
	} else {
		w = 960;
		h = 540;
	}
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
	renderer.setSize(w, h);
	post.setSize(w, h);
}

let doodoo, comp;
let tracks = ['rest'];
const controlsDiv = document.getElementById('controls');
const startButton = document.getElementById('start');
startButton.addEventListener('click', start);

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
		// gme.renderer.setScale(2);
		// scale three
		controlsDiv.style.display = 'none';
		container.style.cursor = 'none';

	} else if (document.exitFullscreen) {
		document.exitFullscreen();
		// gme.renderer.setScale(1);
		// scale three
		controlsDiv.style.display = 'block';
		container.style.cursor = 'inherit';
	}
}

function start() {
	if (doodoo) {
		doodoo.stop();
		startDoodoo();
	} else {
		fetch('./doodoo/compositions/l3d_theme_15.json')
			.then(res => res.json())
			.then(json => {
				comp = json;
				startDoodoo();
			});
	}		
}

function startDoodoo() {
	doodoo = new Doodoo({
		...comp,
		// withRecording: true,
		// withCount: modCount,
		samplesURL: './doodoo/samples/',
		// volume: -12,
		// autoStart: false,
		onModulate: count => {
			// if (count === modCount) recorder.stop();
		},
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