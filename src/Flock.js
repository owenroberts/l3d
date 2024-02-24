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
	
	const vertIndex = globe.getRandomVertex();
	const start = globe.getGlobePos(vertIndex);
	let next = globe.getNext(start.position);
	const target = next.position.addScaledVector(next.normal, height);
	
	const b = Cool.random(3, 8);
	for (let i = 0; i < b; i++) {
		const bird = new Bird({ position: start.position, scene });
		birds.push(bird);
	}

	function getNewTarget() {
		next = globe.getNext(next.position);
		const v  = next.position.addScaledVector(next.normal, height);
		target.copy(v);
	}

	function update(time, timeElapsed) {
		for (let i = 0; i < birds.length; i++) {
			birds[i].update(time, timeElapsed, birds, target);
			if (birds[i].didReachTarget()) getNewTarget();
		}
	}

	return { 
		update, getNewTarget,
		getTarget: () => { return target; },
	};
}
