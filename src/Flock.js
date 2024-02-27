/*
	can we flock ??
*/
import * as THREE from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import Bird from './Bird.js';
import '../doodoo/ui/lib/cool/cool.js'; // fuck off


export default function Flock(params) {

	const { globe, scene } = params;

	const birds = [];
	const height = 10;
	let start, next, target = new THREE.Vector3();

	function globeSetup() {
		const vertIndex = globe.getRandomVertex();
		start = globe.getGlobePos(vertIndex);
		next = globe.getNext(start.position);
		target = next.position.addScaledVector(next.normal, height);
	}
	
	const b = Cool.random(3, 8);
	for (let i = 0; i < b; i++) {
		// const bird = new Bird({ position: start.position, scene });
		const bird = new Bird({ position: new THREE.Vector3(0, 0, 0), scene });
		birds.push(bird);
	}

	function getNewTarget() {
		next = globe.getNext(next.position);
		const v = next.position.addScaledVector(next.normal, height);
		target.copy(v);
	}

	function update(time, timeElapsed) {
		if (isNaN(timeElapsed)) return;
		for (let i = 0; i < birds.length; i++) {
			birds[i].update(time, timeElapsed, birds, target);
			// if (birds[i].didReachTarget()) getNewTarget();
		}
	}

	return { 
		update, getNewTarget,
		setTarget: position => { target.copy(position); },
		getTarget: () => { return target; },
	};
}
