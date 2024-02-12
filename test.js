import * as THREE from 'three';
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import './doodoo/ui/lib/cool/cool.js'; // fuck off

let w = 960, h = 540;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera( 75, w / h, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( w, h );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
const material = new THREE.MeshStandardMaterial( { color: 0xaaaaaa } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 90;

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

const mat1 = new LineMaterial( { color: 0x000000, linewidth: 0.005 } );
const mat2 = new LineMaterial( { color: 0x00ffff, linewidth: 0.005 } );
function addLine(pos, pos2, mat=mat1) {
	const geometry = new LineGeometry();
	geometry.setPositions([
		pos.x, pos.y, pos.z,
		pos2.x, pos2.y, pos2.z,
	]);
	const line = new Line2(geometry, mat);
	scene.add(line);
}

// const position = new THREE.Vector3(0, 0, 0);
// position.x = Cool.random(1, 3);
// position.y = Cool.random(1, 3);
// position.z = Cool.random(1, 3);
// const normal = new THREE.Vector3(1, -1, 0);
// normal.x = Cool.random(-1, 1);
// normal.y = Cool.random(-1, 1);
// normal.z = Cool.random(-1, 1);


const X_AXIS = new THREE.Vector3(1, 0, 0);
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const Z_AXIS = new THREE.Vector3(0, 0, 1);

const globe = new THREE.Mesh(
	// offset, need to figure out real number here
	new THREE.IcosahedronGeometry(64, 2), 
	// new THREE.MeshStandardMaterial(),
	new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true }),
);
scene.add(globe);

const indexedGlobe = BufferGeometryUtils.mergeVertices(globe.geometry);
const globePosition = indexedGlobe.getAttribute('position');
const globeNormal = indexedGlobe.getAttribute('normal');
const index = Cool.randInt(globePosition.count - 1);
const position = new THREE.Vector3().fromBufferAttribute(globePosition, index);
const normal = new THREE.Vector3().fromBufferAttribute(globeNormal, index);

const pos2 = position.clone().addScaledVector(normal, 5);
addLine(position, pos2, mat2);

function branch(position, normal, length) {
	
	const z_angle = Cool.random(Math.PI * 2);
	const x_angle = Cool.random(0.2, 0.6);

	const o = new THREE.Object3D();
	o.position.copy(position);
	o.lookAt(position.clone().add(normal));
	o.rotateOnAxis(Z_AXIS, z_angle);
	o.rotateOnAxis(X_AXIS, x_angle);
	o.translateZ(length);
	addLine(position, o.position);

	const o2 = new THREE.Object3D();
	o2.position.copy(o.position);
	o2.lookAt(position);
	o2.rotateOnAxis(Z_AXIS, -z_angle);
	o2.rotateOnAxis(X_AXIS, x_angle * 2);
	o2.translateZ(length);
	addLine(o.position, o2.position);

	length -= Cool.random(1, 2);
	if (length > 1) {
		branch(o2.position, normal, length);
	}
}

const b = Cool.randInt(2, 4);
for (let i = 0; i < b; i++) {
	branch(position, normal, 4);
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
}
animate();

