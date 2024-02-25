/*
	make a cat out of lines instead of models ... 
*/
import * as THREE from 'three';
import Joint from './Joint.js';
import Animator from './Animator.js';
import '../doodoo/ui/lib/cool/cool.js'; // fuck off
// import '../doodoo/src/Property.js';
// import '../doodoo/src/Modulator.js';


export default function CatLines(params) {

	const { globe, scene } = params;
	let start, next;
	
	const model = new THREE.Object3D();
	const mat = new THREE.MeshStandardMaterial({ 
		color: 0x3d3d3d,
		side: THREE.DoubleSide,
		// wireframe: true,
	});

	function globeSetup() {
		const vertIndex = globe.getRandomVertex();
		start = globe.getGlobePos(vertIndex);
		next = globe.getNext(start.position);
		model.position.set(start.position.x, start.position.y, start.position.z);
		model.up.copy(start.normal);
		model.lookAt(next.position);
	}

	let state = 'idling'; // walking, idling
	let speed = 0.005; // default 0.005
	const s = 0.5; // size

	const body = new Joint();
	const head = new Joint();
	const tail = [];
	const legs = [];
	const tailRotateSpeed = 3, legRotateSpeed = 4;	
	const tailSegNum = 7;
	const fa = 0.6; // front leg angle
	const ba = 0.3; // back leg angle, def better way to do this ... 
	const bodyHeight = s * 2.2;
	const headHeight = s * 5;
	
	function createModel() {

		// const bodyGeo = new THREE.IcosahedronGeometry(s * 1.4, 1);
		const bodyGeo = new THREE.CapsuleGeometry( s, s * 2, 2, 5); 
		const bodyMesh = new THREE.Mesh(bodyGeo, mat);
		bodyMesh.castShadow = true;
		body.add(bodyMesh);
		body.setPosition(0, bodyHeight, 0);
		body.rotateX(Math.PI * 0.5); 
		// body.randomRotation();
		body.setOrigins();
		body.setLerpSpeed(2);
		model.add(body.get());

		const headGeo = new THREE.IcosahedronGeometry(s * 1.5, 1);
		const headMesh = new THREE.Mesh(headGeo, mat);
		headMesh.castShadow = true;
		head.add(headMesh);
		head.setPosition(0, headHeight, s * 2);
		head.randomRotation();
		model.add(head.get());

		const earGeo = new THREE.ConeGeometry(s * 1, s * 1, 3);
		const earMesh = new THREE.Mesh(earGeo, mat);
		earMesh.castShadow = true;
		const earLeft = new Joint();
		earLeft.add(earMesh);
		earLeft.addPosition(s * -1, s * 1.5, 0);
		earLeft.randomRotation();
		head.add(earLeft.get());

		const earRight = new Joint();
		earRight.add(earMesh.clone());
		earRight.addPosition(s * 1, s * 1.5, 0);
		earRight.randomRotation();
		head.add(earRight.get());

		for (let i = 0; i < tailSegNum; i++) {
			const j = new Joint();
			const h = s * 0.6;
			if (i === 0) {
				j.copy(body.get().position);
				j.addPosition(0, s * 1.2, -s * 1.2);
				j.rotateX(-Math.PI * 0.2);
				model.add(j.get());
			} else {
				j.addPosition(0, h, 0);
				tail[i - 1].add(j);
			}
			j.rotateX(i * Math.PI * 0.02);
			j.add(addLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, h, 0)));
			j.setOrigins();
			j.setRotateSpeed(tailRotateSpeed);
			tail.push(j);
		}

		// legs
		for (let i = 0; i < 4; i++) {
			const j1 = new Joint();
			const j2 = new Joint();
			const h = s * 1;
			const a = 0.2;
			const p1 = new THREE.Vector3(0, 0, 0);
			const p2 = new THREE.Vector3(0, -h, 0);

			j1.copy(body.getPosition());
			j1.addPosition(0, s * -0.5, 0);
			j1.rotateX(Math.PI * a);
			j1.setOrigins();
			j1.setRotateSpeed(legRotateSpeed);
			j1.add(addLine(p1, p2));

			j2.setPosition(0, -h, 0);
			j2.rotateX(Math.PI * -a * 2);
			j2.add(addLine(p1, p2));
			j2.setRotateSpeed(legRotateSpeed);
			
			
			model.add(j1.get());
			j1.add(j2);
			legs.push({ joints: [j1, j2], phase: i * 2 });
		}
		const ls = s * 0.6;

		legs[0].joints[0].addPosition(ls, 0, ls);
		legs[2].joints[0].addPosition(ls, 0, -ls);
		legs[1].joints[0].addPosition(-ls, 0, ls);
		legs[3].joints[0].addPosition(-ls, 0, -ls);

		
		legs[0].joints[0].rotateY(fa);
		legs[1].joints[0].rotateY(-fa);
		legs[2].joints[0].rotateY(-ba);
		legs[3].joints[0].rotateY(ba);

		legs.forEach(l => l.joints.forEach(j => j.setOrigins()));
	}
	createModel();

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

	/* animations */
	const animators = {
		walk: {
			tail: new Animator({
				increment: 3, 
				randomRange: [-0.1, 0.1],
				clampRange: [-0.5, 0.5],
				func: value => {
					return Cool.map(Math.sin(value), -1, 1, 0.2, 0.3);
				}
			}),
			legs: new Animator({ 
				increment: 4,
				randomRange: [-0.1, 0.1],
				clampRange: [-0.2, 0.2],
			}),
			body: new Animator({ 
				increment: 10,
				func: value => {
					return Cool.map(Math.sin(value), -1, 1, 0, 0.5);
				}
			}),
		},
		idle: {
			head: new Animator({
				increment: 1.25,
				randomRange: [-0.1, 0.1],
				clampRange: [-0.25, 0],
				func: value => {
					return Cool.map(Math.sin(value + 0.1), -1, 1, -1, 1);
					// return Math.sin(value + 0.1);
				}
			}),
			tail: new Animator({
				increment: 1.25,
				randomRange: [-0.1, 0.1],
				clampRange: [-0.25, 0],
				func: value => {
					return Cool.map(Math.sin(value), -1, 1, -1.2, 1.2);
				}
			}),
		}
	};

	function walk(timeElapsedInSeconds) {

		const tailRotation = animators.walk.tail.update(timeElapsedInSeconds);
		for (let i = 1; i < tail.length; i++) {
			tail[i].setTargetRotation(tailRotation + i * 0.05, 0, 0);
			tail[i].rotate(timeElapsedInSeconds);
		}

		const legRotation = animators.walk.legs.update(timeElapsedInSeconds);
		for (let i = 0; i < legs.length; i++) {
			
			// is there a way to do this as part of animator?
			// default func param for now ...  
			const a1 = Cool.map(Math.sin(legs[i].phase + legRotation), -1, 1, -2, 2);
			const a2 = Cool.map(Math.sin(legs[i].phase + legRotation * 2), -1, 1, 1.25, -1.25);

			legs[i].joints[0].setTargetRotation(a1, i < 2 ? fa : ba, 0);
			legs[i].joints[0].rotate(timeElapsedInSeconds);
			legs[i].joints[1].setTargetRotation(a2, 0, 0);
			legs[i].joints[1].rotate(timeElapsedInSeconds);
		}

		const bodyPosition = animators.walk.body.update(timeElapsedInSeconds);
		body.setTargetPosition(0, bodyHeight + bodyPosition, 0);
		body.lerp(timeElapsedInSeconds);

		head.setTargetPosition(0, headHeight - bodyPosition, s * 2);
		head.lerp(timeElapsedInSeconds);
	}

	function reset(timeElapsedInSeconds) {
		for (let i = 1; i < tail.length; i++) {
			tail[i].unrotate(timeElapsedInSeconds);
		}

		for (let i = 0; i < legs.length; i++) {
			legs[i].joints[0].unrotate(timeElapsedInSeconds);
			legs[i].joints[1].unrotate(timeElapsedInSeconds);
		}

		body.unlerp(timeElapsedInSeconds);
	}

	function idle(timeElapsedInSeconds) {

		const headRotation = animators.idle.head.update(timeElapsedInSeconds);
		head.setTargetRotation(0, headRotation, 0);
		head.rotate(timeElapsedInSeconds);

		const tailRotation = animators.idle.tail.update(timeElapsedInSeconds);
		for (let i = 1; i < tail.length; i++) {
			tail[i].setTargetRotation(0, 0, tailRotation + i * 0.05 * Math.sign(tailRotation));
			tail[i].rotate(timeElapsedInSeconds);
		}
	}

	function update(timeElapsed) {

		if (isNaN(timeElapsed)) return;
		let timeElapsedInSeconds = timeElapsed / 1000;

		// if (state === 'walking' && isWalking) {
		if (state === 'walking') {
			walk(timeElapsedInSeconds);

			// const walkDistance = model.position.distanceTo(next.position);
			// if (walkDistance > 0.1) {
			// 	model.translateZ(speed * timeElapsed);
			// } else {
			// 	model.up.copy(next.normal);
			// 	next = globe.getNext(next.position);
			// 	model.lookAt(next.position);
			// }
		} else if (state === 'idling' && !body.isAtOrigin()) {
			reset(timeElapsedInSeconds);
		} else {
			idle(timeElapsedInSeconds);
		}
	}

	/* key commands */
	function keyDown(ev) {
		if (ev.code === 'KeyW') {
			// isWalking = !isWalking;
			if (state == 'walking') state = 'idling';
			else state = 'walking';
		}
	}
	document.addEventListener('keydown', keyDown);

	return {
		update, globeSetup,
		isLoaded: () => { return true; }, // remove if using this one
		getModel: () => { return model; },
	};
}