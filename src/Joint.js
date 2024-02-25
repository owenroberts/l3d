/*
	joint for procedural cat
*/

import * as THREE from 'three';
import '../doodoo/ui/lib/cool/cool.js'; // fuck off

export default function Joint() {

	const obj = new THREE.Object3D();
	const oQ = new THREE.Quaternion(); // original quat
	const tQ = new THREE.Quaternion(); // target quat
	const tE = new THREE.Euler(); // target euler for copying
	const oP = new THREE.Vector3(); // original position
	const tP = new THREE.Vector3(); // target position

	let rotateSpeed = 1;
	let lerpSpeed = 1;

	/* 
		weirdly rotate speed doesn't seem to do anything? 
		its relationship between time and speed, 
		if the speed is too slow to make it to the end of phase it doesn't matter
		so maybe it should be an angle that's just update by time ... 
		or are we overusing timeElapsed ... 
		i think step doesn't matter unless its lower than target rotation
		obvi, if target rotation is less than step, its already there ..
	*/

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
			tE.set(x, y, z);
			tQ.setFromEuler(tE);
		},
		rotate: () => {
			if (obj.quaternion.equals(tQ)) return;
			obj.quaternion.rotateTowards(tQ, 1); 
		},
		unrotate: timeElapsed => {
			if (obj.quaternion.equals(oQ)) return;
			obj.quaternion.rotateTowards(oQ, timeElapsed * rotateSpeed);
		},
		setLerpSpeed: value => { lerpSpeed = value; },
		setTargetPosition: (x, y, z) => { tP.set(x, y, z); },
		lerp: () => { obj.position.lerp(tP, 1); },
		unlerp: timeElapsed => {
			obj.position.lerp(oP, timeElapsed * lerpSpeed);
		},
		setOrigins: () => {
			oQ.copy(obj.quaternion);
			oP.copy(obj.position);
		},
		isAtOrigin: () => {
			if (obj.position.distanceTo(oP) < 0.01) {
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
		rotateX: a => { obj.rotateX(a); },
		rotateY: a => { obj.rotateY(a); },
		rotateZ: a => { obj.rotateZ(a); },
		randomRotation: () => {
			for (let i = 0; i < obj.children.length; i++) {
				if (obj.children[i].isMesh) {
					const r = new THREE.Euler(
						Cool.random(0, Math.PI * 2),
						Cool.random(0, Math.PI * 2),
						Cool.random(0, Math.PI * 2),
					);
					obj.children[i].quaternion.setFromEuler(r);
				}
			}
		}
	};

}