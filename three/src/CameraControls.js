/*
	randomized camera movement
*/

import * as THREE from 'three';
import * as Cool from '../../cool/cool.js';
import { Joint, Animator } from '../../tre/Tre.js';

export function CameraControls(params) {

	const { camera, scene } = params;

	const cc = Joint();
	const ccCam = Joint();
	cc.setOrigins();
	cc.add(ccCam);
	ccCam.add(camera);
	ccCam.setOrigins();
	camera.position.set(0, 0, 8);

	let anim;
	let camAnim = Cool.CounterSequence();

	const origin = new THREE.Vector3(0, 0, 0);
	camera.lookAt(origin);

	function update(timeElapsedInSeconds) {
		// if (!anim) return;
		camAnim.update(timeElapsedInSeconds);
		camera.lookAt(origin);
	}

	function addAnimation() {
		const counter = Cool.Counter(Cool.randomInt(6, 48));
		const step = Cool.randomInt(3, 6);
		if (Cool.coinFlip()) {
			addTranslateAnimation(counter, step);
		} else {
			addRotateAnimation(counter, step)
		}

		camAnim.add(Cool.randomInt(12, 24), false, () => {
			addAnimation();
		});
	}

	function addRotateAnimation(counter, step) {
		let startRotation = cc.getRotation().y;
		let increment = Cool.random(0.5, 2) / counter.getDuration() * Cool.random([-1, 1]);
		camAnim.add(step, true, (timeElapsedInSeconds) => {
			ccCam.rotateY(increment * timeElapsedInSeconds);
			counter.update();
			if (counter.isDone()) camAnim.next();
		});
	}

	function addTranslateAnimation(counter, step) {
		
		let increment = Cool.random(5, 40) / counter.getDuration() * Cool.random([-1, 1]);
		const z = ccCam.getPosition().z;
		if (Math.abs(z) >= 2 && Math.sign(increment) === Math.sign(z)) {
			increment *= -1;
		}

		camAnim.add(step, true, (timeElapsedInSeconds) => {
			ccCam.translateZ(increment * timeElapsedInSeconds);
			counter.update();
			if (counter.isDone()) camAnim.next();
			const pos = ccCam.getPosition();
			if (Math.abs(pos.z) > 2) {
				camAnim.next();
			}
		});
	}

	function endAnimations() {
		camAnim.stop();
	}

	document.addEventListener('keydown', keyDown);
	function keyDown(ev) {
		if (ev.code === 'KeyA') addAnimation();
	}

	return { update, addAnimation, endAnimations };
}