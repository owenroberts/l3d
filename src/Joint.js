/*
	joint for procedural cat
*/

import * as THREE from 'three';
import '../doodoo/ui/lib/cool/cool.js'; // fuck off

export default function Joint() {

	const obj = new THREE.Object3D();
	const oQ = new THREE.Quaternion(); // original quat
	const tQ = new THREE.Quaternion(); // target quat
	const oP = new THREE.Vector3(); // original position
	const tP = new THREE.Vector3(); // target position

	const rotateSpeed = 0.01;

	return {
		get: () => { return obj; },
		add: child => { 
			if (child.isMesh || child.isObject3D) obj.add(child); 
			else obj.add(child.get());
		},
		copy: o => {
			if (o.isVector3)  obj.position.copy(o);
			if (o.isQuaternion) obj.quaternion.copy(o);
		},
		setTargetRotation: (x, y, z) => {
			tQ.setFromEuler(new THREE.Euler(x, y, z));
		},
		rotate: () => {
			obj.quaternion.rotateTowards(tQ, rotateSpeed);
		},
		unrotate: () => {
			obj.quaternion.rotateTowards(oQ, rotateSpeed);
		},
		setOrigins: () => {
			oQ.copy(obj.quaternion);
			oP.copy(obj.position);
		},
		setPosition: (x, y, z) => {
			obj.position.set(x, y, z);
		},
		addPosition: (x, y, z) => {
			obj.position.add(new THREE.Vector3(x, y, z));
		},
		rotateX: angle => { obj.rotateX(angle); },
		rotateY: angle => { obj.rotateY(angle); },
		rotateZ: angle => { obj.rotateZ(angle); },

	};

}