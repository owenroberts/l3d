/*
	randomized camera movement
*/

import * as THREE from 'three';
import * as Cool from '../../cool/cool.js';
import { Joint, Animator } from '../../three_stuff/ThreeStuff.js';

export function CameraControls(params) {

	const { camera, scene } = params;

	const cc = Joint();
	const ccCam = Joint();
	cc.setOrigins();
	cc.add(ccCam);
	ccCam.add(camera);
	ccCam.setOrigins();
	camera.position.set(0, 0, 8);

	// cc.add(new THREE.AxesHelper(3));
	// scene.add(cc.get());
	// scene.add(new THREE.AxesHelper(3));

	let anim;

	const origin = new THREE.Vector3(0, 0, 0);
	camera.lookAt(origin);
	// set();

	function update(timeElapsedInSeconds) {
		if (!anim) return;
		anim.update(timeElapsedInSeconds);
		camera.lookAt(origin);
	}

	function set() {

		cc.setOrigins();
		ccCam.setOrigins();

		let type = Cool.random(['rotate', 'translate']);
		let direction = Cool.random([-1, 1]);
		let count = Cool.randomInt(200, 2000);
		let counter = 0;
		let increment = Cool.random(0.001, 0.05);

		let startRotation = cc.getRotation().y;

		// count /= 10;
		// increment *= 5;

		anim = Animator({
			increment,
			func: (value, params) => {
				if (counter >= count) return set();
				else counter++;
				
				// console.log(type, Math.round(counter / count * 10) / 10, axis, value * direction);
				// console.log(type, axis, value);
				const target = {};

				if (type === 'rotate') {
					cc.setTargetRotation({ y: startRotation + value * direction });
					cc.rotate(params.timeElapsedInSeconds);
				}

				if (type === 'translate') {
					target.z = value * direction;
					if (target.z >= 2) target.z = 2;
					if (target.z <= -2) target.z = -2;
					ccCam.setTargetPosition(target);
					ccCam.lerp(params.timeElapsedInSeconds);
				}
				
			}
		});
		
	}

	return { update, set };
}