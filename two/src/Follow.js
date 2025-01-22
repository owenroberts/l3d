/*
	make a cat out of lines instead of models ... 
	removing cat lines, making that another character
	just follows and adds footsteps
	maybe add to camera ?
*/
import * as THREE from 'three';
import * as Cool from '../../cool/cool.js';
import { getAxesHelper } from '../../tre/Tre.js';

export function Follow() {

	const target = new THREE.Object3D();
	let animation; // model and animation update
	
	let speed = 0.005; // default 0.005
	let nextPosition = new THREE.Vector3();
	let nextNormal = new THREE.Vector3();
	let prevDistance = 1_000_000;
	let reachedNext = false;
	
	function setup(start, next) {
		target.position.set(start.position.x, start.position.y, start.position.z);
		target.up.copy(start.normal);
		target.lookAt(next.position);
		target.add(getAxesHelper());
		// console.log(start, next);
		nextPosition.copy(next.position);
		nextNormal.copy(next.normal);
	}

	function setTarget(next) {
		reachedNext = false;
		prevDistance = 1_000_000;
		
		target.up.copy(nextNormal);
		// next = globe.getNext(next.position);
		nextPosition.copy(next.position);
		nextNormal.copy(next.normal);
		
		target.lookAt(nextPosition);
	}

	function addAnimation(_animation) {
		animation = _animation;
	}

	function update(timeElapsed, isWalking) {

		if (isNaN(timeElapsed)) return;
		
		if (isWalking) {
			const walkDistance = target.position.distanceTo(nextPosition);
			if (walkDistance > 0.1 && (prevDistance - walkDistance) > 0) {
				target.translateZ(speed * timeElapsed);
				prevDistance = walkDistance;
			} else {
				reachedNext = true;
			}
			if (animation) {
				animation.update(timeElapsed, isWalking);
			}
		}
	}

	return {
		setup, update, setTarget, addAnimation,
		// getStart: () => { return start; },
		getTarget: () => { return target; },
		reachedNext: () => { return reachedNext; },
		getNextPosition: () => { return nextPosition; },
	};
}