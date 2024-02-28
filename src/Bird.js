/*
	bird obj for flock
*/
import * as THREE from 'three';
import Joint from './Joint.js';
import Animator from './Animator.js';

export default function Bird(params) {

	const { scene, parent } = params;

	const speed = 0.006;
	const flocking = {
		radius: 30,
		align: 1, 
		center: 1, 
		separation: 2,
		seek: 1,
		boundary: 1,
	};

	parent.position.add(new THREE.Vector3(
		Cool.random(-5, 5),
		Cool.random(0, 10),
		Cool.random(-5, 5),
	));

	const model = new THREE.Object3D();
	const mat = new THREE.MeshStandardMaterial({ 
		color: 0xafafaf,
		side: THREE.DoubleSide,
		// wireframe: true,
	});

	
	function addHelper(position) {
		const a = new THREE.AxesHelper(5);
		a.position.copy(position);
		scene.add(a);
		return a;
	}

	function addLine(pos, pos2) {
		const line = new THREE.LineCurve3(pos, pos2);
		const tube = new THREE.TubeGeometry(line, 1, .08, 3);
		const mesh = new THREE.Mesh(tube, mat);
		mesh.castShadow = true;
		model.add(mesh);
		return mesh;
	}

	const s = Cool.random(0.5, 2);
	const lines = { left: [], right: [], };
	const joints = [];
	for (let i = 0; i < 3; i++) {
		const p1 = new THREE.Vector3(0, 0, 0);
		const p2 = new THREE.Vector3(-s / 2, 0, -s);
		const p3 = new THREE.Vector3(s / 2, 0, -s);
		// lines.left.push(addLine(p1, p2));
		// lines.right.push(addLine(p1, p3));

		const joint = new Joint();
		joint.addPosition(0, 0, s * 1/3 * i * -1);
		joint.add(addLine(p1, p2));
		joint.add(addLine(p1, p3));
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