import * as THREE from 'three';
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './doodoo/ui/lib/cool/cool.js'; // fuck off
import CatLines from './src/CatLines.js'

let w = 960, h = 540;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera( 75, w / h, 0.1, 1000 );
camera.position.set(8, 8, 8);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(new THREE.AxesHelper(5));

const renderer = new THREE.WebGLRenderer();
renderer.setSize( w, h );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
const material = new THREE.MeshStandardMaterial( { color: 0xaaaaaa } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

function lights() {
	const light = new THREE.DirectionalLight(0xffffff, 0.5);
	light.castShadow = true;
	light.position.set(2, 2, 2);
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;
	light.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(light);
	// scene.add(new THREE.AmbientLight(0xeeefff, 0.1));
}
lights();

const X_AXIS = new THREE.Vector3(1, 0, 0);
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const Z_AXIS = new THREE.Vector3(0, 0, 1);

const cat = new CatLines({ scene });
scene.add(cat.getModel());

let previousTime = null;
function animate(time) {
	if (!previousTime) previousTime = time;
	requestAnimationFrame( animate );
	const timeElapsed = time - previousTime;
	previousTime = time;

	renderer.render( scene, camera );

	cat.update(time, timeElapsed);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
}
animate();

