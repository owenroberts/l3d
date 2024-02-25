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

	return {
		get: () => { return obj; },
		getPosition: () => { return obj.position; },
		setRotateSpeed: value => { rotateSpeed = value; },
		setLerpSpeed: value => { lerpSpeed = value; },
		setPosition: (x, y, z) => { obj.position.set(x, y, z); },
		add: child => { 
			if (child.isMesh || child.isObject3D) obj.add(child); 
			else obj.add(child.get());
		},
		copy: o => {
			if (o.isVector3) obj.position.copy(o);
			if (o.isQuaternion) obj.quaternion.copy(o);
		},
		setTargetRotation: (x, y, z) => {
			tE.set(x, y, z);
			tQ.setFromEuler(tE);
		},
		rotate: timeElapsed => {
			if (obj.quaternion.equals(tQ)) return;
			obj.quaternion.rotateTowards(tQ, timeElapsed * rotateSpeed); 
		},
		unrotate: timeElapsed => {
			if (obj.quaternion.equals(oQ)) return;
			obj.quaternion.rotateTowards(oQ, timeElapsed * rotateSpeed);
		},
		setTargetPosition: (x, y, z) => { 
			tP.set(x, y, z); 
		},
		lerp: timeElapsed => { 
			obj.position.lerp(tP, timeElapsed * lerpSpeed); 
		},
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