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

function addLine(pos, pos2) {
	const line = new THREE.LineCurve3(pos, pos2);
	const tube = new THREE.TubeGeometry(line, 1, .08, 3);
	const mesh = new THREE.Mesh(tube, mat);
	mesh.castShadow = true;
	// model.add(mesh);
	return mesh;
}

export { mat, addLine };