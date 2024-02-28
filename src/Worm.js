/*
	worm flock
*/

/*
	bird obj for flock
*/
import * as THREE from 'three';
import Joint from './Joint.js';
import Animator from './Animator.js';

export default function Worm(params) {

	const { position, scene, parent } = params;

	const speed = 0.0001;
	const flocking = {
		radius: 20,
		align: 1, 
		center: 1, 
		separation: 0.5,
		seek: 1.5,
		boundary: 2.5,
	};

	const model = new THREE.Object3D();
	const mat = new THREE.MeshStandardMaterial({ 
		color: 0x3d3d3d,
		side: THREE.DoubleSide,
		// wireframe: true,
	});

	parent.position.add(new THREE.Vector3(
		Cool.random(-5, 5),
		0,  // + Cool.random(-10, 10),
		Cool.random(-5, 5),
	));

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

	const s = Cool.random(0.1, 0.25);
	const jointCount = Cool.random(3, 6);
	const joints = [];
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
		// if (i === 0) model.add(joint.get());
		// else joints[i - 1].add(joint);
		
		// joint.add(addHelper(mesh.position));
		joints.push(joint);
	}

	const animator = new Animator({
		increment: 1,
		func: (value, params) => {
			return Cool.map(Math.sin(value + (params.i / jointCount) * 2), -1, 1, -3, 3);
		}
	});

	const coord = Cool.choice(['x', 'y']);

	function update(timeElapsed) {
		// if (!isLoaded) return;
		// mixer.update(timeElapsed / 1000);

		for (let i = 0; i < jointCount; i++) {
			const a = animator.update(timeElapsed, { i });
			const t = {};
			t[coord] = a;
			joints[i].setTargetPosition(t);
			joints[i].lerp(timeElapsed);
		}
	}

	return {
		update,
		get: () => { return model; },
		getSpeed: () => { return speed; },
		getFlocking: () => { return flocking; },
	};
}