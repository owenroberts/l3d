/*
	common funcs and stuff in two
*/

import * as THREE from 'three';

// default material
const mat = new THREE.MeshStandardMaterial({ 
	color: 0x3d3d3d,
	side: THREE.DoubleSide,
	// wireframe: true,
});

export { mat };