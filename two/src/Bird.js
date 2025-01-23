/*
	bird obj for flock
*/
import * as THREE from 'three';
import * as Cool from '../../cool/cool.js';
import { Joint, Animator } from '../../tre/Tre.js';
import { mat, addLine } from './Common.js';

export function Bird() {

	const speed = 0.006;
	const flocking = {
		radius: 30,
		align: 1, 
		center: 1, 
		separation: 2,
		seek: 1,
		boundary: 1,
	};

	const model = new THREE.Object3D();

	const s = Cool.random(0.5, 2);
	const lines = { left: [], right: [], };
	const joints = [];
	for (let i = 0; i < 3; i++) {
		const p1 = new THREE.Vector3(0, 0, 0);
		const p2 = new THREE.Vector3(-s / 2, 0, -s);
		const p3 = new THREE.Vector3(s / 2, 0, -s);

		const joint = new Joint();
		joint.addPosition(0, 0, s * 1/3 * i * -1);

		const l1 = addLine(p1, p2);
		const l2 = addLine(p1, p3); 
		joint.add(l1);
		joint.add(l2);
		joint.setRotateSpeed(2);
		joint.setOrigins();
		model.add(joint.get());
		joints.push(joint);
	}

	const animator = new Animator({
		increment: 1,
		func: (value, params) => {
			return Cool.map(Math.cos(value * (2 + params.i * 0.1)), -1, 1, -1, 1);
		}
	});

	function update(timeElapsed) {
		for (let i = 0; i < 3; i++) {
			const a = animator.update(timeElapsed, { i });
			joints[i].setTargetRotation({ x: a });
			joints[i].rotate(timeElapsed);
		}
	}

	return {
		update,
		get: () => { return model; },
		getSpeed: () => { return speed; },
		getFlocking: () => { return flocking; },
	};
}