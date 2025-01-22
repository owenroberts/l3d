/*
	breadcrumbs animation
	leaves bread crumbs following the main follow
*/

import * as THREE from 'three';
import * as Cool from '../../cool/cool.js';
import { Animator } from '../../tre/Tre.js';
import { mat } from './Common.js';

export function Breadcrumbs(scene) {

	let target;

	function setTarget(obj) {
		target = obj;
	}

	function breadcrumb() {
		const geo = new THREE.IcosahedronGeometry(Cool.random(0.01, 0.05), 1);
		const crumb = new THREE.Mesh(geo, mat);
		crumb.position.copy(target.position);
		crumb.quaternion.copy(target.quaternion);
		crumb.translateX(Cool.random(-0.8, 0.8));
		crumb.translateZ(Cool.random(1));
		scene.add(crumb);
	}

	const animator = Animator({
		increment: 1,
		count: 36,
		randomRange: [-1, 1],
		clampRange: [-10, 10],
		func: (value, params) => {
			if (params.isCount) breadcrumb();
		}
	});

	function update(timeElapsed, isWalking) {
		if (!isWalking) return;
		const timeElapsedInSeconds = timeElapsed / 1000;
		animator.update(timeElapsedInSeconds);
	}

	return { update, setTarget };
}