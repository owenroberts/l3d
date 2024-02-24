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

	let rotateSpeed = 1;
	let lerpSpeed = 1;

	return {
		get: () => { return obj; },
		getPosition: () => { return obj.position; },
		add: child => { 
			if (child.isMesh || child.isObject3D) obj.add(child); 
			else obj.add(child.get());
		},
		copy: o => {
			if (o.isVector3) obj.position.copy(o);
			if (o.isQuaternion) obj.quaternion.copy(o);
		},
		setRotateSpeed: value => { rotateSpeed = value; },
		setTargetRotation: (x, y, z) => {
			tQ.setFromEuler(new THREE.Euler(x, y, z));
		},
		rotate: timeElapsed => {
			if (obj.quaternion.equals(tQ)) return;
			// console.log('rotate', rotateSpeed * timeElapsed);
			obj.quaternion.rotateTowards(tQ, rotateSpeed * timeElapsed);
		},
		unrotate: timeElapsed => {
			if (obj.quaternion.equals(oQ)) return;
			// console.log('unrotate', rotateSpeed * timeElapsed);
			obj.quaternion.rotateTowards(oQ, rotateSpeed * timeElapsed);
		},
		setLerpSpeed: value => { lerpSpeed = value; },
		setTargetPosition: (x, y, z) => { tP.set(x, y, z); },
		lerp: timeElapsed => {
			obj.position.lerp(tP, lerpSpeed * timeElapsed);
		},
		unlerp: timeElapsed => {
			obj.position.lerp(oP, lerpSpeed * timeElapsed);
		},
		setOrigins: () => {
			oQ.copy(obj.quaternion);
			oP.copy(obj.position);
		},
		isAtOrigin: () => {
			if (obj.position.distanceTo(oP) < 0.1) {
				obj.position.copy(oP);
			}
			return obj.position.equals(oP) && obj.quaternion.equals(oQ);
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
		randomRotation: () => {
			const rr = new THREE.Euler(
				Cool.random(0, Math.PI * 2),
				Cool.random(0, Math.PI * 2),
				Cool.random(0, Math.PI * 2),
			);
			obj.quaternion.setFromEuler(rr);
		}
	};

}