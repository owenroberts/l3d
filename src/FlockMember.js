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

	const model = new type({ scene });
	obj.add(model.get());
	scene.add(obj);
	
	let speed = model.getSpeed();
	let is2D = model.is2D();

	// let speed = 0.025;
	let reachedTarget = false;
	const velocity = new THREE.Vector3(0, 0, 0);
	const acceleration = new THREE.Vector3(0, 0, 0);
	const maxSpeed = 8 * speed;
	const maxForce = 0.2 * speed;

	const flocking = {
		radius: 20,
		align: 2,
		center: 1,
		separation: 1,
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
			
			// console.log(distance, flocking.radius)
			if (distance < flocking.radius) {
				// console.log('distance', distance);
				
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
		const desired = target.clone().sub(obj.position);
		desired.multiplyScalar(maxSpeed);
		const steer = desired.sub(velocity);
		steer.clampScalar(-maxForce, maxForce);
		applyForce(steer);
	}

	function applyForce(force) {
		// if (is2D) force.z = 0;
		acceleration.add(force);
	}

	function update(timeElapsed, others, target) {
		// if (!isLoaded) return;
		// mixer.update(timeElapsed / 1000);

		model.update(timeElapsed);

		// flock(others);
		
		if (obj.position.distanceTo(target) > 2) { 
			flock(others);
			seek(target);
			
			velocity.add(acceleration);
			velocity.clampScalar(-maxSpeed, maxSpeed);
			obj.position.add(velocity);
			acceleration.multiplyScalar(0);
			obj.lookAt(obj.position.clone().add(velocity));
		} else {
			flock(others);
			reachedTarget = true;
		}
	}

	return { 
		update,
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