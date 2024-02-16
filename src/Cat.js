/*
	handle cat and animations
*/
import * as THREE from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

export default function Cat(params) {

	const { globe } = params;
	let model, mixer, start, next;
	const animations = {};
	let speed = 0.005;
	let isLoaded = false;

	function loadModel(gltf) {
		model = clone(gltf.scene);
		model.traverse(obj => {
			if (obj.isMesh) {
				obj.castShadow = true;
			}
		});
		mixer = new THREE.AnimationMixer(model);
		gltf.animations.forEach(a => {
			animations[a.name] = a;
		});
		mixer.clipAction(animations['Idle_1']).play();

		const vertIndex = globe.getRandomVertex();
		start = globe.getGlobePos(vertIndex);
		next = globe.getNext(start.position);
		model.position.set(start.position.x, start.position.y, start.position.z);
		model.up.copy(start.normal);
		model.lookAt(next.position);
		
		isLoaded = true;
	}

	function update(timeElapsed, isWalking) {
		if (!isLoaded) return;

		mixer.update(timeElapsed / 1000);

		if (isWalking) {
			mixer.clipAction(animations['Idle_1']).stop();
			mixer.clipAction(animations['Walk1']).play();
		} else {
			mixer.clipAction(animations['Walk1']).stop();
			mixer.clipAction(animations['Idle_1']).play();
		}
	
		if (isWalking) {
			const walkDistance = model.position.distanceTo(next.position);
			if (walkDistance > 0.1) {
				model.translateZ(speed * timeElapsed);
			} else {
				model.up.copy(next.normal);
				next = globe.getNext(next.position);
				model.lookAt(next.position);
			}
		}
	}

	return { 
		loadModel, update,
		isLoaded: () => { return isLoaded; },
		getModel: () => { return model; },
	};
}