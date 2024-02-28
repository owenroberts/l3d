/*
	can we flock ??
*/
import * as THREE from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import FlockMember from './FlockMember.js';
import Bird from './Bird.js';
import Worm from './Worm.js';
import '../doodoo/ui/lib/cool/cool.js'; // fuck off

export default function Flock(params) {

	const { globe, scene, type, height } = params;

	const members = [];
	let start, next, target = new THREE.Vector3;

	function globeSetup() {
		const vertIndex = globe.getRandomVertex();
		start = globe.getGlobePos(vertIndex);
		next = globe.getNext(start.position);
		target = next.position.addScaledVector(next.normal, height);

		// const a = addHelper(start.position);
		// a.up.copy(start.normal);
		// a.lookAt(next.position);
		// console.log(start, next, target);
	}
	globeSetup();

	function addHelper(position) {
		const a = new THREE.AxesHelper(5);
		a.position.copy(position);
		scene.add(a);
		return a;
	}
	
	const count = Cool.random(3, 8);
	for (let i = 0; i < count; i++) {
		const member = new FlockMember({ start, next, scene, type });
		members.push(member);
	}

	function getNewTarget() {
		// console.log('next', next);
		next = globe.getNext(next.position);
		const v = next.position.addScaledVector(next.normal, height);
		target.copy(v);

		addHelper(target);
		// console.log('new', target);
	}

	function update(timeElapsed) {
		if (isNaN(timeElapsed)) return;
		for (let i = 0; i < members.length; i++) {
			members[i].update(timeElapsed, members, target);
			if (members[i].didReachTarget()) getNewTarget();
		}
	}

	return { 
		update, getNewTarget, globeSetup,
		setTarget: position => { target.copy(position); },
		getTarget: () => { return target; },
	};
}
