/*
	controls position of camera
	looks better https://jsfiddle.net/Fyrestar/6519yedL/ nice! simple and only kind of dumb 
*/

import * as THREE from 'three';

export default function CameraControls(params) {

	const { camera } = params;

	let temp = new THREE.Vector3;
	let goal = new THREE.Object3D;

	function update() {
		temp.setFromMatrixPosition(goal.matrixWorld);
		camera.position.lerp(temp, 0.02);
	}

	return { 
		update,
		getGoal: () => { return goal; },
	};

}