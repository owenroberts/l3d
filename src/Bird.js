/*
	bird obj for flock
*/
import * as THREE from 'three';



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
		separation: 3,
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
	const lines = { left: [], right: [], }
	for (let i = 0; i < 3; i++) {
		const p1 = new THREE.Vector3(0, 0, s * 1/3 * i * -1);
		const p2 = new THREE.Vector3(-s / 2, 0, (s + s * 1/3 * i) * -1);
		const p3 = new THREE.Vector3(s / 2, 0, (s + s * 1/3 * i) * -1);
		lines.left.push(addLine(p1, p2));
		lines.right.push(addLine(p1, p3));
	}

	function loadModel(gltf) {
		model = clone(gltf.scene);
		// model.add(new THREE.AxesHelper(10));
		model.position.set(
			Cool.random(-10, 10),
			Cool.random(-10, 10),
			Cool.random(-10, 10),
		);
		model.traverse(obj => {
			if (obj.isMesh) obj.castShadow = true;
		});
		mixer = new THREE.AnimationMixer(model);
		gltf.animations.forEach(a => {
			animations[a.name] = a;
		});
		mixer.clipAction(animations['Flapping']).play();
		isLoaded = true;
		scene.add(model);
	}

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

		for (let i = 0; i < 3; i++) {
			const a = Cool.map(Math.cos(time * (0.01 + i * 0.001)) * Math.PI, 0, Math.PI * 2, 0, 1)
			lines.left[i].rotation.x = a;
			lines.right[i].rotation.x = a;
		}

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
		loadModel, update,
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