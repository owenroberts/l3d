/*
	testing new flock
*/
import * as THREE from 'three';

export default function NewFlock(params) {
	const { scene } = params;

	const members = [];
	let start, next, target = new THREE.Vector3;

	function init() {
		start = {
			position: new THREE.Vector3(
				Cool.random(-20, 20),
				0, // Cool.random(-20, 20),
				Cool.random(-20, 20),
			)
		}
		next = { position: start.position.clone() };

		const a = addHelper(start.position);
		a.lookAt(next.position);
		
		// const b = addHelper(next.position);
	}

	init();
	getNewTarget();

	function addHelper(position) {
		const a = new THREE.AxesHelper(5);
		a.position.copy(position);
		scene.add(a);
		return a;
	}

	const count = Cool.random(3, 8);
	for (let i = 0; i < count; i++) {
		const member = new FlockMember({ scene, start, next });
		members.push(member);
	}

	function getNewTarget() {
		// next = globe.getNext(next.position);
		const position = next.position.clone().add(new THREE.Vector3(
			Cool.random(20, 50) * Cool.random([-1, 1]),
			Cool.random(20, 50) * Cool.random([-1, 1]),
			Cool.random(20, 50) * Cool.random([-1, 1]),
		));
		next.position.copy(position);
		// const v = next.position.addScaledVector(next.normal, height);
		target.copy(position);
		addHelper(target);
	}

	function update(timeElapsed) {
		if (isNaN(timeElapsed)) return;
		for (let i = 0; i < members.length; i++) {
			members[i].update(timeElapsed, members, target);
			if (members[i].didReachTarget()) getNewTarget();
		}
	}

	return { 
		update,
		getNewTarget,
		// globeSetup,
		setTarget: position => { target.copy(position); },
		getTarget: () => { return target; },
		getNext: () => { return next; },
		getFlock: () => { return members; },
	};
}

function FlockMember(params) {
	
	const { start, next, scene } = params;

	const obj = new THREE.Object3D();
	obj.position.copy(start.position);
	// obj.up.copy(start.normal);
	obj.lookAt(next.position);
	obj.position.add(new THREE.Vector3(
		Cool.random(-5, 5),
		Cool.random(0, 10),
		Cool.random(-5, 5),
	));
	const h = addHelper(new THREE.Vector3(0, 0, 0))
	obj.add(h);
	scene.add(obj);

	const geometry = new THREE.ConeGeometry(1, 2, 8); 
	const material = new THREE.MeshStandardMaterial({
		color: 0xffff00,
		// wireframe: true,
	});
	const cone = new THREE.Mesh(geometry, material);
	cone.rotateX(Math.PI / 2);
	obj.add(cone);

	function addHelper(position) {
		const a = new THREE.AxesHelper(5);
		a.position.copy(position);
		scene.add(a);
		return a;
	}

	let speed = 0.005; // model.getSpeed();
	let reachedTarget = false;
	const velocity = new THREE.Vector3(0, 0, 0);
	const acceleration = new THREE.Vector3(0, 0, 0);
	const maxSpeed = 8 * speed;
	const maxForce = 0.2 * speed;

	const flocking = {
		radius: 20,
		align: 1, // 2,
		center: 1, // 1,
		separation: 1.5,
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

		if (count > 0) {
			separation.normalize();
			separation.multiplyScalar(maxSpeed);
			separation.sub(velocity);
			separation.clampScalar(-maxForce, maxForce);
			separation.multiplyScalar(flocking.separation);
			applyForce(separation);

			alignment.divideScalar(count);
			alignment.normalize();
			alignment.multiplyScalar(maxSpeed);
			alignment.sub(velocity);
			alignment.clampScalar(-maxForce, maxForce);
			alignment.multiplyScalar(flocking.align);
			applyForce(alignment);

			center.divideScalar(count);
			seek(center);
		}
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
		
		flock(others);
		seek(target);

		velocity.add(acceleration);
		velocity.clampScalar(-maxSpeed, maxSpeed);
		obj.position.add(velocity);
		acceleration.multiplyScalar(0);
		obj.lookAt(obj.position.clone().add(velocity));

		if (obj.position.distanceTo(target) < 1) {
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

function Member(params) {



}