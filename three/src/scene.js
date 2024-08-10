/* longies 3 */

import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Sky } from 'three/addons/objects/Sky.js';

import * as Cool from '../../cool/cool.js';
import { PostProcessing } from './PostProcessing.js';
import { Doodoo } from '../../doodoo/src/Doodoo.js';
import { Singer } from './Singer.js';
import { CameraControls } from './CameraControls.js';

const debug = false;
let w = 960, h = 540;
const stats = new Stats();
const container = document.getElementById("longies");
if (debug) container.appendChild(stats.dom);

import comp from '../compositions/drummys.json';

const renderer = new THREE.WebGLRenderer({ 
	antialias: false,
});
renderer.setSize(w, h);
renderer.setClearColor(0x123123, 1);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.autoClear = false;
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.4;
container.appendChild(renderer.domElement);

let debugRender = true;
debugRender = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
const cc = CameraControls({ camera, scene });

let controls;
let useControls = debug; // debug
// useControls = true;
if (useControls) controls = new OrbitControls(camera, renderer.domElement);

const pig = new Singer({ scene });
const bird = new Singer({ scene });
const cat = new Singer({ scene });

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

function addTestCube(x, y, z, size=0.5) {
	var box = new THREE.Mesh(
		new THREE.BoxGeometry(size, size, size), 
		new THREE.MeshBasicMaterial({ color: "red", wireframe: true })
	);
	box.position.set(x, y, z);
	scene.add(box);
	return box;
}

function addHelper(pos) {
	scene1.add(new THREE.ArrowHelper(pos.normal, pos.position, 1, 0xff00ff));
}
// addTestCube(0, 0, 0, 1);

/* load models */
const loader = new GLTFLoader();
loader.load("./models/piggy_top.glb", gltf => {
	pig.loadModel('top', gltf);
});
loader.load("./models/piggy_bottom.glb", gltf => {
	pig.loadModel('bottom', gltf);
});

loader.load("./models/birdy_top.glb", gltf => {
	bird.loadModel('top', gltf);
});
loader.load("./models/birdy_bottom.glb", gltf => {
	bird.loadModel('bottom', gltf);
});

loader.load("./models/kitty_top.glb", gltf => {
	cat.loadModel('top', gltf);
});
loader.load("./models/kitty_bottom.glb", gltf => {
	cat.loadModel('bottom', gltf);
});

let offset = 4;
let offR = 1 / 6;
pig.get().translateZ(offset);
bird.get().rotateY(Math.PI * offR);
bird.get().translateZ(offset);
cat.get().rotateY(-Math.PI * offR);
cat.get().translateZ(offset);

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

	cc.update(timeElapsed / 1000);

	if (tracks[0] === 'play') {
		post.update();
	}

	pig.update(timeElapsed / 100, tracks[1] === 'play');
	bird.update(timeElapsed / 100, tracks[2] === 'play');
	cat.update(timeElapsed / 100, tracks[3] === 'play');

	if (useControls) {
		controls.update();
	}
}
requestAnimationFrame(animate);

function onWindowResize() {
	if (w === 960) {
		w = screen.width; // window.innerWidth;
		h = screen.height; // window.innerHeight;
		controlsDiv.style.display = 'none';
		container.style.cursor = 'none';
	} else {
		w = 960;
		h = 540;
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
const backButton = document.getElementById('back');

startButton.addEventListener('click', start);
backButton.addEventListener('click', () => {
	doodoo.stop();
	setTimeout(() => {
		location.href = '../index.html';
	}, 300);
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
		doodoo.stop();
		startDoodoo();
	} else {
		startDoodoo();
		cc.set();
	}		
}

function startDoodoo() {
	doodoo = new Doodoo({
		...comp,
		withCount: modCount,
		samplesURL: '../doodoo/samples/',
		// onModulate: (playCount, sequenceCount) => {
		// 	if (modCount === sequenceCount) {
		// 		doodoo.stop();
		// 	}
		// },
		onLoop: totalPlays => {
			for (let i = 0; i < tracks.length; i++) {
				tracks[i] = 'rest';
			}
		},
		onNote: params => {
			// if (params.loopIndex == 2) console.log(params.loopIndex, params.note[0]);
			
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
}