import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { TexturePass } from 'three/addons/postprocessing/TexturePass.js';
import { CopyShader } from 'three/addons/shaders/CopyShader.js';
import { ClearPass } from 'three/addons/postprocessing/ClearPass.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { Line2 } from 'three/addons/lines/Line2.js';

import { LinesPass } from './src/LinesPass.js';
import vertexShader from './src/vert.glsl';
import blenderShader from './src/blend.glsl';

import './doodoo/build/doodoo.min.js'; // holy shit what
import './doodoo/build/lib/tone/build/Tone.js';
import './doodoo/ui/lib/cool/cool.js'; // fuck off
// https://lea.verou.me/blog/2020/07/import-non-esm-libraries-in-es-modules-with-client-side-vanilla-js/

let w = 960, h = 540;
const scene1 = new THREE.Scene();
const scene2 = new THREE.Scene();

const stats = new Stats();
const container = document.getElementById("longies");
container.appendChild(stats.dom);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

/* for testing */
function lights() {
	const light = new THREE.DirectionalLight(0xffffff, 0.5);
	light.castShadow = true;
	light.position.set(2, 2, 2);
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;
	light.lookAt(new THREE.Vector3(0, 0, 0));
	scene1.add(light);
	scene1.add(new THREE.AmbientLight(0xeeefff, 0.1));
}
lights();

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(0, 10, 50);
const controls = new OrbitControls(camera, renderer.domElement);
let useControls = false; // debug
/* looks better https://jsfiddle.net/Fyrestar/6519yedL/ nice! simple and only kind of dumb */
const cc = {
	temp: new THREE.Vector3,
	goal:  new THREE.Object3D,
};

let composer, scene2Composer;
let noScene2 = false;
function post() {

	const renderPass1 = new RenderPass(scene1, camera);
	const linesPass1 = new LinesPass({
		width: renderer.domElement.clientWidth,
		height: renderer.domElement.clientHeight,
		scene: scene1,
		camera: camera,
		uniforms: {
			lineColor: { type: 'vec3', value: new THREE.Color(0x000000) },
			bgColor: { type: 'vec3', value: new THREE.Color(0xC7C7C7) },
			lineWidth: 1,
			numLines: 5,
		}
	});

	composer = new EffectComposer(renderer);
	composer.addPass( renderPass1 );
	composer.addPass( linesPass1 );

	if (noScene2) return;
	
	const renderPass2 = new RenderPass(scene2, camera);
	const linesPass2 = new LinesPass({
		width: renderer.domElement.clientWidth,
		height: renderer.domElement.clientHeight,
		scene: scene2,
		camera: camera,
		uniforms: {
			lineColor: { type: 'vec3', value: new THREE.Color(0xFFFFFF) },
			bgColor: { type: 'vec3', value: new THREE.Color(0xC7C7C7) },
			lineWidth: 1,
			numLines: 5,
		}
	});

	const outputPass = new OutputPass();
	scene2Composer = new EffectComposer(renderer);
	scene2Composer.renderToScreen = false;
	scene2Composer.addPass(renderPass2);
	scene2Composer.addPass(linesPass2);
	scene2Composer.addPass(outputPass); 
	// https://codesandbox.io/p/devbox/preserve-depth-forked-738cmp?file=%2Fsrc%2Fswap-pass.ts%3A145%2C38

	const mixPass = new ShaderPass(
		new THREE.ShaderMaterial( {
			uniforms: {
				baseTexture: { value: null },
				blendTexture: { value: scene2Composer.renderTarget2.texture }
			},
			vertexShader: vertexShader,
			fragmentShader: blenderShader,
			defines: {}
		} ), 'baseTexture'
	);
	mixPass.needsSwap = true;

	composer.addPass( mixPass );
}
post();

function addTestCube(x, y, z, size=0.5) {
	var box = new THREE.Mesh(
		new THREE.BoxGeometry(size, size, size), 
		new THREE.MeshBasicMaterial({ color: "red", wireframe: true })
	);
	// box.position.setFromSphericalCoords(
	// 	worldRadius + 0.1, 
	// 	THREE.MathUtils.degToRad(x), 
	// 	THREE.MathUtils.degToRad(y)
	// );
	box.position.set(x, y, z);
	// box.position.setFromSphericalCoords(radius + 0.1, THREE.Math.degToRad(23), THREE.Math.degToRad(23));
	// box.lookAt(sphere.position);
	scene.add(box);
	return box;
}

const worldRadius = 64;
const globe = new THREE.Mesh(
	// new THREE.SphereGeometry(worldRadius, 32, 16),
	new THREE.IcosahedronGeometry(worldRadius, 3),
	// new THREE.MeshStandardMaterial(),
	// new THREE.MeshStandardMaterial({ color: 0x00ffff, wireframe: true }),
	new THREE.MeshStandardMaterial({ color: 0x00ffff }),
);
scene1.add(globe);
scene2.add(globe.clone());

let treeMaterial;
function scenery() {
	const innerGlobe = new THREE.Mesh(
		// new THREE.SphereGeometry(worldRadius, 32, 16),
		new THREE.IcosahedronGeometry(worldRadius - 1, 4),
		// new THREE.MeshStandardMaterial(),
		new THREE.MeshStandardMaterial({ color: 0x00ffff, wireframe: true }),
	);
	innerGlobe.rotation.set(Cool.random(Math.PI), Cool.random(Math.PI), Cool.random(Math.PI));
	// scene.add(innerGlobe);

	const indexedGlobe = BufferGeometryUtils.mergeVertices(innerGlobe.geometry);
	const globePosition = indexedGlobe.getAttribute('position');
	const globeNormal = indexedGlobe.getAttribute('normal');
	const usedPositions = [];
	const nTrees = Cool.randInt(globePosition.count * 0.33, globePosition.count * 0.66);
	treeMaterial = new LineMaterial( { color: 0xff00ff, linewidth: 3 } );
	treeMaterial.resolution.set(w, h);

	for (let i = 0; i < nTrees; i++) {
		const vertIndex = Cool.randInt(globePosition.count - 1);
		if (usedPositions.includes(vertIndex)) continue;
		const position = new THREE.Vector3().fromBufferAttribute(globePosition, vertIndex);
		const normal = new THREE.Vector3().fromBufferAttribute(globeNormal, vertIndex);
		treeBranch(position, normal, 5);
		usedPositions.push(vertIndex);
	}
}
scenery();

function treeBranch(position, normal, length) {
	// https://natureofcode.com/fractals/#trees -- sort of based on this
	const pos2 = position.clone().addScaledVector(normal, length);
	const points = [
		position.x, position.y, position.z,
		pos2.x, pos2.y, pos2.z,
	];
	const geometry = new LineGeometry();
	geometry.setPositions(points);
	const line = new Line2(geometry, treeMaterial);
	// console.log('lines', lines);
	scene2.add(line);

	if (length > 1) {
		length--;
		const b = Cool.randInt(1, 3);
		for (let i = 0; i < b; i++) {
			const n = normal.clone();
			const p = pos2.clone();
			p.addScaledVector(normal, Cool.random(-1, 0));
			n.x = n.x + Cool.random(-0.5, 0.5);
			n.y = n.y + Cool.random(-0.5, 0.5);
			n.z = n.z + Cool.random(-0.5, 0.5);
			treeBranch(p, n, length);	
		}
	}
}

const indexedGlobe = BufferGeometryUtils.mergeVertices(globe.geometry);
const globePosition = indexedGlobe.getAttribute('position');
const globeNormal = indexedGlobe.getAttribute('normal');
// console.log('globe', globe);
// console.log('globe indexed', indexedGlobe);
const segmentLength = worldRadius * 4 / Math.sqrt((10 + 2 * Math.sqrt(5)));
// console.log('seg', segmentLength); 

function getNext(pos) {
	const neighbors = [];
	const v = new THREE.Vector3();
	for (let i = 0; i < globePosition.count; i++) {
		v.fromBufferAttribute(globePosition, i);
		// console.log(v.distanceTo(pos));
		const d = v.distanceTo(pos);
		// later now prev neighbor
		// hard coded for now -- don't even remember why this was an issue????
		if (d > 0 && d < segmentLength / 3) {
			// console.log(v.x, v.y, v.z)
			// console.log('d', d);
			// addTestCube(v.x, v.y, v.z);
			neighbors.push(getGlobePos(i));
		}
	}
	// console.log('neighbors', neighbors);
	return Cool.choice(neighbors);
}

function getGlobePos(index) {
	return {
		position: new THREE.Vector3().fromBufferAttribute(globePosition, index),
		normal: new THREE.Vector3().fromBufferAttribute(globeNormal, index),
		index: index,
	};
}

function addHelper(pos) {
	scene.add(new THREE.ArrowHelper( pos.normal, pos.position, 1, 0xff00ff ));
}

function getNextWalkPosition() {
	const prev = cat.next;
	const next = getNext(prev.position);
	cat.next = next;
	cat.model.up.copy(prev.normal);
	cat.model.lookAt(next.position);
}

/* load models */
const loadingManager = new THREE.LoadingManager();
const loader = new GLTFLoader(loadingManager);
let cat = {};
loader.load("./models/cat_1.glb", gltf => {
	cat.model = clone(gltf.scene);
	console.log('cat model', gltf);
	// console.log('cat', cat);
	const vertIndex = Cool.randInt(globePosition.count - 1);
	cat.start = getGlobePos(vertIndex);
	cat.next = getNext(cat.start.position);
	cat.model.position.set(cat.start.position.x, cat.start.position.y, cat.start.position.z);
	cat.model.up.copy(cat.start.normal);
	cat.model.lookAt(cat.next.position);
	
	cat.mixer = new THREE.AnimationMixer(cat.model);
	// camera.position.set(0, 0, 100);
	// camera.up = new THREE.Vector3(0,0,1);
	// camera.lookAt(cat.model);
	// camera.position.z = 100;
	// console.log('cam', camera);
	cat.animations = {};
	gltf.animations.forEach(anim => {
		cat.animations[anim.name] = anim;
	});
	
	cat.mixer.clipAction(cat.animations['Idle_1']).play();
	scene1.add(cat.model);

	cat.model.add(cc.goal);
	cc.goal.position.set(0, 4, -8);
	console.log('cat', cat);
});

const noiseEffect = {
	count: 0,
	value: new THREE.Vector2(),
};

let previousTime = null;
function animate(time) {
	if (!previousTime) previousTime = time;
	stats.update();
	const timeElapsed = time - previousTime;
	requestAnimationFrame(animate);

	// renderer.render(scene1, camera);
	if (scene2Composer) scene2Composer.render();
	composer.render();
	
	if (cat.mixer) cat.mixer.update(timeElapsed / 1000);
	previousTime = time;

	if (!cat.model) return;

	if (tracks[0] === 'play') {
		const walkDistance = cat.model.position.distanceTo(cat.next.position);
		if (walkDistance > 0.1) {
			cat.model.translateZ(0.05);
		} else {
			getNextWalkPosition();
		}
	}

	// does this need to be optimized?
	if (tracks[0] === 'play') {
		cat.mixer.clipAction(cat.animations['Idle_1']).stop();
		cat.mixer.clipAction(cat.animations['Walk1']).play();
	} else {
		cat.mixer.clipAction(cat.animations['Walk1']).stop();
		cat.mixer.clipAction(cat.animations['Idle_1']).play();
	}

	// console.log(tracks[1])
	if (tracks[1] === 'play') {
		if (noiseEffect.count === 6) {
			noiseEffect.value.x = (noiseEffect.value.x + Cool.random(-0.1, 0.1)).clamp(0, 2);
			noiseEffect.value.y = (noiseEffect.value.y + Cool.random(-0.1, 0.1)).clamp(0, 2);
			linesPass1.material.uniforms.noiseOffset.value.x = noiseEffect.value.x;
			linesPass1.material.uniforms.noiseOffset.value.y = noiseEffect.value.y;
			noiseEffect.count = 0;
		}
		noiseEffect.count++;
	}

	if (useControls) {
		controls.update();
		return;
	}


	cc.temp.setFromMatrixPosition(cc.goal.matrixWorld);
	camera.position.lerp(cc.temp, 0.02);
	camera.up.copy(cat.model.up);
	camera.lookAt(cat.model.position.clone().addScaledVector(cat.model.up, 4));
}
requestAnimationFrame(animate);

function onWindowResize() {
	if (w === 960) {
		w = window.innerWidth;
		h = window.innerHeight;
		console.log(w, h);
	} else {
		w = 960;
		h = 540;
	}
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
	renderer.setSize(w, h);
}

let doodoo, comp;
let tracks = ['rest'];
const controlsDiv = document.getElementById('controls');
const startButton = document.getElementById('start');
startButton.addEventListener('click', start);

const fullScreenButton = document.getElementById('fullscreen');
fullScreenButton.addEventListener('click', toggleFullScreen);
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
	if (ev.code === 'KeyF') {
		toggleFullScreen();
		// onWindowResize();
	}
	if (ev.code === 'KeyC') useControls = !useControls;
}

document.addEventListener("fullscreenchange", () => {
 	onWindowResize();
});

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
		fetch('./doodoo/compositions/longy_1.json')
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