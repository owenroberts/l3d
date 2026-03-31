/*
	worm flock
*/

import * as THREE from 'three';
import * as Cool from '../../cool/cool.js';
import { Joint, Animator } from '../../tre/Tre.js';
import { mat, addLine } from './Common.js';

export function Worm() {

	const speed = 0.00125;
	const flocking = {
		radius: 20,
		align: 1, 
		center: 1, 
		separation: 0.75,
		seek: 1.5,
		boundary: 5,
	};

	const model = new THREE.Object3D();
	const coord = Cool.choice(['x', 'y']);
	const s = Cool.random(0.01, 0.05);
	const jointCount = Cool.randomInt(3, 6);
	const joints = [];

	function setup(position) {

		for (let i = 0; i < jointCount; i++) {
			
			const joint = new Joint();
			if (i > 0) joint.translateZ(s * -4 * i);
			// if (i > 0) joint.translateZ(s * -4);
			const geo = new THREE.CapsuleGeometry(s, s * 2, 1, 5);
			const mesh = new THREE.Mesh(geo, mat);
			mesh.translateZ(-s * 2);
			mesh.rotateX(Math.PI / 2);
			mesh.castShadow = true;
			joint.add(mesh);

			if (i === 0) {
				const p1 = mesh.position.clone();
				p1.add(new THREE.Vector3(0, 0, Cool.random(s, s * 1.5)));
				const p2 = p1.clone();
				const p3 = p1.clone();
				p2.add(new THREE.Vector3(
					Cool.random(-s * 2, -s),
					Cool.random(s, s * 2),
					0, // Cool.random(-s * 2, s),
				));

				p3.add(new THREE.Vector3(
					Cool.random(s * 2, s),
					Cool.random(s, s * 2),
					0, // Cool.random(-s * 2, s),
				));

				joint.add(addLine(p1, p2));
				joint.add(addLine(p1, p3));
			}

			joint.setRotateSpeed(0.25);
			joint.setLerpSpeed(0.25);
			joint.setOrigins();
			
			model.add(joint.get());
			joints.push(joint);
		}

		// console.log({ jointCount, joints });
	}

	const animator = new Animator({
		increment: 1,
		func: (value, params) => {
			return Cool.map(Math.sin(value + (params.i / jointCount) * 2), -1, 1, -3, 3);
		}
	});

	function update(timeElapsed) {
		// if (!isLoaded) return;
		// mixer.update(timeElapsed / 1000);

		for (let i = 0; i < jointCount; i++) {
			const a = animator.update(timeElapsed, { i });
			const t = {};
			t[coord] = a;
			if (joints[i]) joints[i].setTargetPosition(t);
			if (joints[i]) joints[i].lerp(timeElapsed);
		}
	}

	return {
		setup, update,
		get: () => { return model; },
		getSpeed: () => { return speed; },
		getFlocking: () => { return flocking; },
	};
}