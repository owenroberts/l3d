/*
	load and animate top and bottom pig skull
*/

import * as THREE from 'three';
import * as Cool from '../../cool/cool.js';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { Joint, Animator } from '../../tre/Tre.js';

export function Singer(params) {
	
	const { scene } = params;
	let obj = new Joint();
	scene.add(obj.get());

	let loaded = { top: false, bottom: false };
	let top;
	let bottom = new Joint();
	// bottom.setRotateSpeed(1000);

	bottom.anim = new Animator({
		increment: 100,
		// randomRange: [-0.1, 0.1],
		func: (value, params)  => {
			// console.log(params.timeElapsedInSeconds, value, Math.sin(value));
			const x1 = Math.cos(value * 0.02);
    		const x2 = Math.cos(value * 0.01);
    		const v = ((x1 > x2 ? x1 : x2) + x1) / 2;
			const r = Cool.map(v, -1, 1, 0.3, 0.5, true);
			bottom.setTargetRotation({ x: r });
			bottom.rotate(params.timeElapsedInSeconds);
		}
	});

	function loadModel(part, gltf) {
		loaded[part] = true;

		gltf.scene.traverse(child => {
			if (child.isMesh) {
				child.material = new THREE.MeshStandardMaterial({
					color: 0xffffff, 
					// wireframe: true,
				});
			}
		});
		
		if (part === 'top') {
			top = clone(gltf.scene);
			obj.add(top);
		}

		if (part === 'bottom') {
			const b = clone(gltf.scene);
			bottom.add(b);
			bottom.setOrigins();
			obj.add(bottom);
		}
	}

	function update(timeElapsedInSeconds, isPlaying) {
		if (isPlaying) {
			bottom.anim.update(timeElapsedInSeconds, { timeElapsedInSeconds });
		} else {
			// bottom.setTargetRotation({ x: 0 });
			// bottom.rotate(timeElapsedInSeconds);
			bottom.unrotate(timeElapsedInSeconds);
		}
	}

	return { 
		loadModel,
		update,
		isLoaded: () => { return loaded.top && loaded.bottom; },
		get: () => { return obj; },
	}
}