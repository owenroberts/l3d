/*
	pig character
*/

import * as THREE from 'three';
import * as Cool from '../../cool/cool.js';
import { Joint, Animator, getAxesHelper } from '../../tre/Tre.js';
import { mat, addLine } from './Common.js';

export function Pig() {
	
	const model = new THREE.Object3D();

	let state = 'idling'; // walking, idling
	const s = 0.75; // size

	const bodyHeight = s * 1.75;
	const tailSegNum = 20;
	
	const body = new Joint();
	const head = new Joint();
	const tail = [];
	const legs = [];

	function createModel() {
		const bodyGeo = new THREE.CylinderGeometry(s, s * 0.75, s * 3, 5);
		const bodyMesh = new THREE.Mesh(bodyGeo, mat);
		body.add(bodyMesh);
		bodyMesh.castShadow = true;
		body.setPosition(0, bodyHeight, -s);
		body.rotateX(Math.PI * 0.5);
		body.setOrigins();
		body.setLerpSpeed(2);
		model.add(body.get());

		const headGeo = new THREE.CylinderGeometry(s * 0.75, s * 0.5, s, 5);
		const headMesh = new THREE.Mesh(headGeo, mat);
		headMesh.castShadow = true;
		head.add(headMesh);
		head.setPosition(0, bodyHeight, s * 1.5);
		head.rotateX(Math.PI * -0.5);
		head.rotateZ(Cool.random(-Math.PI * 0.125, Math.PI * 0.125));
		head.rotateY(Cool.random(-Math.PI * 0.125, Math.PI * 0.125));
		head.setOrigins();
		model.add(head.get());

		const noseGeo = new THREE.IcosahedronGeometry(s * 0.125, 0);
		const noseMesh = new THREE.Mesh(noseGeo, mat);
		noseMesh.castShadow = true;
		const noseLeft = new Joint();
		noseLeft.add(noseMesh);
		noseLeft.randomRotation();
		noseLeft.addPosition(Cool.random(0.125, 0.25), -s * 0.5, Cool.random(-0.25, 0.25));
		head.add(noseLeft.get());

		const noseRight = new Joint();
		noseRight.add(noseMesh.clone());
		noseRight.randomRotation();
		noseRight.addPosition(Cool.random(0.125, 0.25) * -1, -s * 0.5, Cool.random(-0.25, 0.25));
		head.add(noseRight.get());

		const earGeo = new THREE.ConeGeometry(s * 0.4, s * 0.4, 3);
		const earMesh = new THREE.Mesh(earGeo, mat);
		earMesh.castShadow = true;
		const earLeft = new Joint();
		earLeft.add(earMesh);
		earLeft.rotateZ(Cool.random(Math.PI * -0.25, Math.PI * 0.25));
		earLeft.rotateX(Cool.random(Math.PI * -0.25, Math.PI * 0.25));
		earLeft.addPosition(s * 0.5, 0, s * 0.5);
		head.add(earLeft.get());

		const earRight = new Joint();
		earRight.add(earMesh.clone());
		earRight.rotateZ(Cool.random(Math.PI * -0.25, Math.PI * 0.25));
		earRight.rotateX(Cool.random(Math.PI * -0.25, Math.PI * 0.25));
		earRight.addPosition(s * -0.5, 0, s * 0.5);
		head.add(earRight.get());

		for (let i = 0; i < tailSegNum; i++) {
			const j = new Joint();
			const h = s * 0.1;
			if (i === 0) {
				j.copy(body.get().position);
				j.addPosition(0, s * 0.75, -s * 1.2);
				j.rotateX(-Math.PI * 0.005);
				j.rotateY(-Math.PI * 0.05);
				model.add(j.get());
			} else {
				j.addPosition(0, h, 0);
				tail[i - 1].add(j);
			}
			j.rotateX(i * Math.PI * 0.01);
			j.rotateZ(i * Math.PI * 0.02);
			const l = addLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, h, 0), .04);
			j.add(l);
			j.setOrigins();
			tail.push(j);
		}

		// legs
		for (let i = 0; i < 4; i++) {
			const j1 = new Joint();
			const j2 = new Joint();
			const h = s * 1;
			const p1 = new THREE.Vector3(0, 0, 0);
			const p2 = new THREE.Vector3(0, -h, 0);
			const p3 = new THREE.Vector3(0, -h * 0.25, 0);

			j1.copy(body.getPosition());
			j1.addPosition(0, s * -0.5, 0);
			j1.setOrigins();
			const l1 = addLine(p1, p2);
			j1.add(l1);

			j2.setPosition(0, -h, 0);
			j2.rotateX(Math.PI * -0.5);
			
			const l2 = addLine(p1, p3);
			j2.add(l2);
			
			model.add(j1.get());
			j1.add(j2);
			legs.push({ joint: j1, phase: i * 2 });
		}
		const ls = s * 0.6;

		legs[0].joint.addPosition(ls, 0, ls);
		legs[2].joint.addPosition(ls, 0, -ls);
		legs[1].joint.addPosition(-ls, 0, ls);
		legs[3].joint.addPosition(-ls, 0, -ls);

		legs.forEach(l => l.joint.setOrigins());
	}
	createModel();

	const animators = {
		walk: {
			tail: Animator({
				increment: 10,
				func: value => {
					return Cool.map(Math.sin(value), -1, 1, -0.1, 0);
				}
			}),
			head: Animator({
				increment: 10,
				func: value => {
					return Cool.map(Math.sin(value), -1, 1, -0.25, 0.25);
				}
			}),
			legs: Animator({ 
				increment: 5,
			}),
			body: Animator({ 
				increment: 10,
				func: value => {
					return Cool.map(Math.sin(value), -1, 1, -0.125, 0.125);
				}
			}),
		},
		idle: {
			head: Animator({
				increment: 1,
				func: value => {
					return Cool.map(Math.sin(value), -1, 1, -0.5, 0.5);
				}
			}),
			tail: Animator({
				increment: 1,
				func: value => {
					return Cool.map(Math.sin(value), -1, 1, 0.1, 0.5);
				}
			}),
		}
	};

	function idle(timeElapsedInSeconds) {

		const headRotation = animators.idle.head.update(timeElapsedInSeconds);
		head.setTargetRotation({ z: headRotation });
		head.rotate(timeElapsedInSeconds);

		const tailRotation = animators.idle.tail.update(timeElapsedInSeconds);
		for (let i = 1; i < tail.length; i++) {
			tail[i].setTargetRotation({ z: tailRotation + i * 0.05 * Math.sign(tailRotation) });
			tail[i].rotate(timeElapsedInSeconds);
		}
	}

	function reset(timeElapsedInSeconds) {
		for (let i = 1; i < tail.length; i++) {
			tail[i].unrotate(timeElapsedInSeconds);
		}

		for (let i = 0; i < legs.length; i++) {
			legs[i].joint.unrotate(timeElapsedInSeconds);
			legs[i].joint.unrotate(timeElapsedInSeconds);
		}

		body.unlerp(timeElapsedInSeconds);
	}

	function walk(timeElapsedInSeconds) {

		const legRotation = animators.walk.legs.update(timeElapsedInSeconds);
		for (let i = 0; i < legs.length; i++) {
			const a1 = Cool.map(Math.sin(legs[i].phase + legRotation), -1, 1, -2, 1.5);
			legs[i].joint.setTargetRotation({ x: a1 });
			legs[i].joint.rotate(timeElapsedInSeconds);
		}

		const headRotation = animators.walk.head.update(timeElapsedInSeconds);
		head.setTargetRotation({ z: headRotation });
		head.rotate(timeElapsedInSeconds);

		const tailRotation = animators.walk.tail.update(timeElapsedInSeconds);
		for (let i = 1; i < tail.length; i++) {
			tail[i].setTargetRotation({ y: tailRotation + i * 0.005 * Math.sign(tailRotation) });
			tail[i].rotate(timeElapsedInSeconds);
		}

		const bodyPosition = animators.walk.body.update(timeElapsedInSeconds);
		body.setTargetPosition({ y: bodyHeight + bodyPosition });
		body.lerp(timeElapsedInSeconds);

		head.setTargetPosition({ y: bodyHeight - bodyPosition });
		// head.lerp(timeElapsedInSeconds);

	}


	function update(timeElapsed, isWalking) {

		let timeElapsedInSeconds = timeElapsed / 1000;

		if (isWalking) {
		// if (state === 'walking') {
			walk(timeElapsedInSeconds);
		} else {
			if (!body.isAtOrigin()) {
				reset(timeElapsedInSeconds);
			} else {
				idle(timeElapsedInSeconds);
			}
		}
		
	}

	/* debug */
	function keyDown(ev) {
		if (ev.code === 'KeyW') {
			if (state === 'walking') state = 'idling';
			else state = 'walking';
		}
	}
	document.addEventListener('keydown', keyDown);


	return {
		update,
		getModel: () => { return model; },
	};
}