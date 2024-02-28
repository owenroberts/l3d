/*
	flock functions
*/
import * as THREE from 'three';
import Bird from './Bird.js';

export default function FlockMember(params) {

	const { start, next, scene, type } = params;

	const obj = new THREE.Object3D();
	obj.position.copy(start.position);
	obj.up.copy(start.normal);
	obj.lookAt(next.position);

	const model = new type({ scene, parent: obj });
	obj.add(model.get());
	scene.add(obj);
	
	let speed = model.getSpeed();
	let is2D = model.is2D();

	let reachedTarget = false;
	const velocity = new THREE.Vector3(0, 0, 0);
	const acceleration = new THREE.Vector3(0, 0, 0);
	const maxSpeed = 8 * speed;
	const maxForce = 0.2 * speed;

	const flocking = {
		radius: 20,
		align: 2, // 2,
		center: 1, // 1,
		separation: 1,
		seek: 1,
	};

	function flock(others) {
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
				// separation.multiplyScalar(flocking.separation);
			}
		}

			// console.log(separation.length());
		if (separation.length() > 0) {
			separation.normalize();
			separation.multiplyScalar(maxSpeed);
			separation.sub(velocity);
			separation.clampScalar(-maxForce, maxForce);
			separation.multiplyScalar(flocking.separation);
			applyForce(separation);
		}

		// alignment
		if (count > 0) {
			alignment.divideScalar(count);
			alignment.normalize();
			alignment.multiplyScalar(maxSpeed);
			alignment.sub(velocity);
			alignment.clampScalar(-maxForce, maxForce);
			alignment.multiplyScalar(flocking.align);
			applyForce(alignment);

			// cohesion
			center.divideScalar(count);
			seek(center);
		}
		// console.log(alignment);
	}

	function seek(target) {
		const desired = target.clone().sub(obj.position);
		desired.multiplyScalar(maxSpeed);
		const steer = desired.sub(velocity);
		steer.clampScalar(-maxForce, maxForce);
		steer.multiplyScalar(flocking.seek);
		applyForce(steer);
	}

	function applyForce(force) {
		acceleration.add(force);
	}

	function update(timeElapsed, others, target) {
		// if (!isLoaded) return;
		// mixer.update(timeElapsed / 1000);

		// model.update(timeElapsed);

		// flock(others);
		// console.log (obj.position.distanceTo(target))
		if (obj.position.distanceTo(target) > 1) { 
			flock(others);
			// seek(target);
			
			velocity.add(acceleration);
			velocity.clampScalar(-maxSpeed, maxSpeed);
			// console.log(velocity);
			obj.position.add(velocity);
			acceleration.multiplyScalar(0);
			obj.lookAt(obj.position.clone().add(velocity));
		} else {
			// flock(others);
			console.log('new target')
			reachedTarget = true;
		}
	}

	return { 
		update,
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