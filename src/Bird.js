/*
	bird obj for flock
*/
import * as THREE from 'three';
import Joint from './Joint.js';
import Animator from './Animator.js';

export default function Bird(params) {

	const { position, scene } = params;

	// let model, mixer, start, next;
	const animations = {};
	let speed = 0.005;
	let isLoaded = false;
	let reachedTarget = false;

	const velocity = new THREE.Vector3(0, 0, 0);
	const acceleration = new THREE.Vector3(0, 0, 0);
	const maxSpeed = 8 * 0.025;
	const maxForce = 0.2 * 0.025;

	const flocking = {
		radius: 20,
		align: 2,
		center: 1,
		separation: 1,
	};

	const model = new THREE.Object3D();
	model.position.set(
		position.x + Cool.random(-10, 10),
		position.y + Cool.random(-10, 10),
		position.z + Cool.random(-10, 10),
	);
	scene.add(model);
	// addHelper(model.position);

	function addHelper(position) {
		const a = new THREE.AxesHelper(5);
		a.position.copy(position);
		scene.add(a);
		return a;
	}

	function addLine(pos, pos2) {
		// addHelper(pos);
		// addHelper(pos2);
				
		const line = new THREE.LineCurve3(pos, pos2);
		const tube = new THREE.TubeGeometry(line, 1, .08, 3);
		const mat = new THREE.MeshStandardMaterial({ 
			color: 0xafafaf,
			side: THREE.DoubleSide,
		});
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

	function flock(others) {
		const alignment = new THREE.Vector3(); // flock velocity
		const separation = new THREE.Vector3();
		const center = new THREE.Vector3();
		let count = 0;
		
		for (let i = 0; i < others.length; i++) {
			if (model.id === others[i].getID()) continue;
			const other = others[i].getProps();
			const distance = model.position.distanceTo(other.position);
			
			// console.log(distance, flocking.radius)
			if (distance < flocking.radius) {
				// console.log('distance', distance);
				
				count++;

				center.add(other.position);
				alignment.add(other.velocity);

				separation.copy(model.position).sub(other.position);
				separation.normalize();
				separation.divideScalar(distance);
				separation.multiplyScalar((flocking.radius - distance));
				// separation.multiplyScalar(flocking.separation);
			}
		}

		// separation.normalize();
		if (separation.length() > 0) {
			// console.log(separation.length());
			separation.normalize();
			separation.multiplyScalar(maxSpeed);
			separation.multiplyScalar(flocking.separation);
			separation.sub(velocity);
			separation.clampScalar(-maxForce, maxForce);
			// console.log(separation.length());
			applyForce(separation);
		}

		// alignment
		if (count > 0) {
			alignment.divideScalar(count);
			alignment.normalize();
			alignment.multiplyScalar(maxSpeed);
			alignment.multiplyScalar(flocking.align);
			alignment.sub(velocity);
			alignment.clampScalar(-maxForce, maxForce);
			applyForce(alignment);

			// cohesion
			center.divideScalar(count);
			// seek(center);
		}
	}

	function seek(target) {
		const desired = target.clone().sub(model.position);
		desired.multiplyScalar(maxSpeed);
		const steer = desired.sub(velocity);
		steer.clampScalar(-maxForce, maxForce);
		applyForce(steer);
	}

	function applyForce(force) {
		acceleration.add(force);
	}

	function update(time, timeElapsed, others, target) {
		// if (!isLoaded) return;
		// mixer.update(timeElapsed / 1000);
		let timeElapsedInSeconds = timeElapsed / 1000;

		for (let i = 0; i < 3; i++) {
			const a = animator.update(timeElapsedInSeconds, { i });
			joints[i].setTargetRotation({ x: a });
			joints[i].rotate(timeElapsedInSeconds);
		}

		return;

		if (model.position.distanceTo(target) > 2) { 
			flock(others);
			seek(target);
			
			velocity.add(acceleration);
			velocity.clampScalar(-maxSpeed, maxSpeed);
			model.position.add(velocity);
			acceleration.multiplyScalar(0);
			model.lookAt(model.position.clone().add(velocity));

		} else {
			reachedTarget = true;
		}
	}

	return { 
		update,
		getID: () => { return model.id; },
		getPosition: () => { return model.position; },
		getVelocity: () => { return velocity; },
		getProps: () => {
			return {
				position: model.position,
				velocity
			};
		},
		didReachTarget: () => {
			if (reachedTarget) {
				reachedTarget = false;
				return true;
			} else {
				return false;
			}
		}
	};
}