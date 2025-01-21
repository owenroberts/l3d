/*
	make a cat out of lines instead of models ... 
	removing cat lines, making that another character
	just follows and adds footsteps
	maybe add to camera ?
*/
import * as THREE from 'three';
import * as Cool from '../../cool/cool.js';
import { Animator, getAxesHelper } from '../../tre/Tre.js';
import { mat } from './Common.js';


export function Follow(params) {

	const { globe, scene } = params;
	const target = new THREE.Object3D();
	
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

	let state = 'idling'; // walking, idling
	let speed = 0.005; // default 0.005

	function breadcrumb() {
		const geo = new THREE.IcosahedronGeometry(Cool.random(0.01, 0.05), 1);
		const crumb = new THREE.Mesh(geo, mat);
		crumb.position.copy(target.position);
		crumb.quaternion.copy(target.quaternion);
		crumb.translateX(Cool.random(-0.8, 0.8));
		crumb.translateZ(Cool.random(1));
		scene.add(crumb);
	}

	/* animations */
	const animators = {
		crumbs: new Animator({
			increment: 1,
			count: 36,
			randomRange: [-1, 1],
			clampRange: [-10, 10],
			func: (value, params) => {
				if (params.isCount) breadcrumb();
			}
		}),
	};

	function walk(timeElapsedInSeconds) {
		animators.crumbs.update(timeElapsedInSeconds);
	}

	function update(timeElapsed, isWalking) {

		if (isNaN(timeElapsed)) return;
		let timeElapsedInSeconds = timeElapsed / 1000;

		if (isWalking) {
			walk(timeElapsedInSeconds);
			const walkDistance = target.position.distanceTo(nextPosition);
			if (walkDistance > 0.1 && (prevDistance - walkDistance) > 0 ) {
				target.translateZ(speed * timeElapsed);
				prevDistance = walkDistance;
			} else {
				reachedNext = true;
			}
		}
	}

	return {
		setup, update, setTarget,
		// getStart: () => { return start; },
		getTarget: () => { return target; },
		reachedNext: () => { return reachedNext; },
		getNextPosition: () => { return nextPosition; },
	};
}