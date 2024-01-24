import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { LinesPass } from './src/LinesPass.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xC7C7C7);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 1.75;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

let uniforms = {
	lineColor: { type: 'vec3', value: new THREE.Color(0x000000) },
	bgColor: { type: 'vec3', value: new THREE.Color(0xC7C7C7) },
	lineWidth: 1,
	numLines: 5,
};

const worldRadius = 32;
const globe = new THREE.Mesh(
	// new THREE.SphereGeometry(worldRadius, 32, 16),
	new THREE.IcosahedronGeometry(worldRadius, 3),
	new THREE.MeshStandardMaterial({ color: 0x00ffff, wireframe: true }),
);
// globe.position.set(0, 0, 0);
scene.add(globe);

/* for testing */
const light = new THREE.DirectionalLight(0xffffff, 0.5);
light.castShadow = true;
light.position.set(2, 2, 2);
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(light);
scene.add(new THREE.AmbientLight(0xeeefff, 0.1));

// camera.position.z = 50;
camera.position.set(0, 10, 50);

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const linesPass = new LinesPass({
  width: renderer.domElement.clientWidth,
  height: renderer.domElement.clientHeight,
  scene,
  camera,
  uniforms,
});
composer.addPass(renderPass);
composer.addPass(linesPass);

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

function addTestCube(x, y, z, size=0.2) {
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
}

console.log('globe', globe);
// console.log('geo', globe.geometry);

// addTestCube(0, 0);
const indexedGlobe = BufferGeometryUtils.mergeVertices(globe.geometry);
console.log('indexed', indexedGlobe);
const positionAttribute = indexedGlobe.getAttribute('position');
const vert = new THREE.Vector3();
// for ( let i = 0; i < indexedGlobe.index.count; i++ ) {
// 	vert.fromBufferAttribute(indexedGlobe.attributes.position, indexedGlobe.index.getX(i));
// 	// console.log(i, vert.x, vert.y, vert.z);
// 	addTestCube(vert.x, vert.y, vert.z, (i + 1) / 100);
// }
// for (let i = 0; i < positionAttribute.count; i++) {
for (let i = 0; i < 7; i++) {
	vert.fromBufferAttribute(positionAttribute, i);
	// console.log(i, vert.x, vert.y, vert.z);
	// addTestCube(vert.x, vert.y, vert.z, (i + 1) / 10);
}


/* load models */
const loadingManager = new THREE.LoadingManager();
const loader = new GLTFLoader(loadingManager);
let cat = {};
loader.load("./models/cat_1.glb", gltf => {
	cat.model = clone(gltf.scene);
	console.log('cat model', gltf);
	// cat.scale.setScalar(0.1);
	// cat.model.scale.set(0.1, 0.1, 0.1);
	cat.model.position.setFromSphericalCoords(
		worldRadius + 0.1, 
		THREE.MathUtils.degToRad(60), 
		THREE.MathUtils.degToRad(0)
	);
	cat.model.lookAt(globe.position);
	cat.model.rotation.x = cat.model.rotation.x + Math.PI / 2;
	// cat.model.rotation.set(0, 0, 0);
	cat.mixer = new THREE.AnimationMixer(cat.model);
	// camera.position.set(0, 0, 100);
	// camera.up = new THREE.Vector3(0,0,1);
	// camera.lookAt(cat.model);
	// camera.position.z = 100;
	console.log('cam', camera);
	cat.animations = {};
	gltf.animations.forEach(anim => {
		cat.animations[anim.name] = anim;
	});
	console.log('cat', cat, cat.animations['Walk1']);
	cat.mixer.clipAction(cat.animations['Walk1']).play();
	scene.add(cat.model);
});

let previousTime = null;
function animate(time) {
	if (!previousTime) previousTime = time;
	const timeElapsed = time - previousTime;
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	// composer.render();
	if (cat.mixer) cat.mixer.update(timeElapsed / 1000);
	controls.update();
	previousTime = time;
}
requestAnimationFrame(animate);
