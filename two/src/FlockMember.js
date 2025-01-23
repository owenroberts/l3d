/*
	flock functions
*/
import * as THREE from 'three';
import * as Cool from '../../cool/cool.js';
import { Bird } from './Bird.js';

export function FlockMember(params) {

	const { type, boundaries } = params;

	const earthCenter = new THREE.Vector3(0, 0, 0);

	const obj = new THREE.Object3D();
	const model = new type();

	obj.add(model.get());

	let speed =  model.getSpeed();
	let flocking = model.getFlocking();

	let reachedTarget = false;
	const velocity = new THREE.Vector3(0, 0, 0);
	const acceleration = new THREE.Vector3(0, 0, 0);
	const maxSpeed = 8 * speed;
	const maxForce = 0.2 * speed;

	function setup(start, next) {
		obj.position.copy(start.position);
		obj.up.copy(start.normal);
		obj.lookAt(next.position);

		if (type.name === 'Bird') {
			obj.position.add(new THREE.Vector3(
				Cool.random(-5, 5),
				Cool.random(0, 10),
				Cool.random(-5, 5),
			));
		}

		if (type.name === 'Worm') {
			obj.translateX(Cool.random(-3, 3));
			obj.translateZ(Cool.random(-2, 2));
			model.get().up.copy(obj.up);
			model.setup(obj.position);
		}
	}

	function flock(others, target) {
		const alignment = new THREE.Vector3(); // flock velocity
		const separation = new THREE.Vector3();
		const center = new THREE.Vector3();
		let count = 0;
		
		for (let i = 0; i < others.length; i++) {
			if (obj.id === others[i].getID()) continue;
			const other = others[i].getProps();
			const distance = obj.position.distanceTo(other.position);
			if (distance < flocking.radius) {

				count++;

				center.add(other.position);

				alignment.add(other.velocity);

				separation.copy(obj.position).sub(other.position);
				separation.normalize();
				separation.divideScalar(distance);
				separation.multiplyScalar((flocking.radius - distance));
			}
		}

		if (count > 0) {
			separation.normalize();
			separation.sub(velocity);
			separation.multiplyScalar(flocking.separation);
			separation.multiplyScalar(maxSpeed);
			separation.clampScalar(-maxForce, maxForce);
			applyForce(separation);

			alignment.divideScalar(count);
			alignment.normalize();
			alignment.sub(velocity);
			alignment.multiplyScalar(flocking.align);
			alignment.multiplyScalar(maxSpeed);
			alignment.clampScalar(-maxForce, maxForce);
			applyForce(alignment);

			// center.divideScalar(count);
			// seek(center);
		}
	}

	function seek(target) {
		const desired = target.position.clone().sub(obj.position);
		desired.multiplyScalar(maxSpeed);
		const steer = desired.sub(velocity);
		steer.clampScalar(-maxForce, maxForce);
		steer.multiplyScalar(flocking.seek);
		applyForce(steer);
	}

	function boundary() {
		const d = obj.position.distanceTo(earthCenter);
		if (d < boundaries[0]) { 
			// console.log('bottom')
			const direction = obj.position.clone().sub(earthCenter);
			direction.normalize();
			direction.multiplyScalar(flocking.boundary);
			direction.multiplyScalar(maxSpeed).sub(velocity);
			direction.clampScalar(-maxForce, maxForce);
			applyForce(direction);
		}

		if (d > boundaries[1]) { 
			// console.log('top')
			const direction = earthCenter.clone().sub(obj.position);
			direction.normalize();
			direction.multiplyScalar(flocking.boundary);
			direction.multiplyScalar(maxSpeed).sub(velocity);
			direction.clampScalar(-maxForce, maxForce);
			applyForce(direction);
		}
	}

	function applyForce(force) {
		acceleration.add(force);
	}

	function update(timeElapsed, others, target) {
		// return;
		// if (!isLoaded) return;
		// mixer.update(timeElapsed / 1000);

		model.update(timeElapsed);
		
		flock(others);
		seek(target);
		boundary();
		
		velocity.add(acceleration);
		velocity.clampScalar(-maxSpeed, maxSpeed);
		obj.position.add(velocity);
		acceleration.multiplyScalar(0);
		obj.lookAt(obj.position.clone().add(velocity));

		if (obj.position.distanceTo(target.position) < 1) { 
			reachedTarget = true;
		}
	}

	return { 
		setup, update,
		getObject: () => { return obj; },
		getID: () => { return obj.id; },
		getPosition: () => { return obj.position; },
		getVelocity: () => { return velocity; },
		getProps: () => {
			return {
				position: obj.position,
				velocity
			};
		},
		reachedTarget: () => {
			if (reachedTarget) {
				reachedTarget = false;
				return true;
			} else {
				return false;
			}
		}
	};
}