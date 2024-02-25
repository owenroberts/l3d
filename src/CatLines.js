/*
	make a cat out of lines instead of models ... 
*/
import * as THREE from 'three';
import Joint from './Joint.js';
import '../doodoo/ui/lib/cool/cool.js'; // fuck off

export default function CatLines(params) {

	const { globe, scene } = params;
	let start, next;
	
	const model = new THREE.Object3D();
	const mat = new THREE.MeshStandardMaterial({ 
		color: 0x3d3d3d,
		side: THREE.DoubleSide,
		// wireframe: true,
	});

	const vertIndex = globe.getRandomVertex();
	start = globe.getGlobePos(vertIndex);
	next = globe.getNext(start.position);
	model.position.set(start.position.x, start.position.y, start.position.z);
	model.up.copy(start.normal);
	model.lookAt(next.position);

	let state = 'walking'; // walking, idling
	let speed = 0.005; // default 0.005
	const s = 0.5; // size

	const body = new Joint();
	const head = new Joint();
	const tail = [];
	const legs = [];
	const tailRotateSpeed = 3, legRotateSpeed = 4;	
	const tailSegNum = 7;
	const fa = 0.5; // front leg angle
	const ba = 0.3; // back leg angle, def better way to do this ... 
	
	function createModel() {

		body.add(new THREE.Mesh(
			new THREE.IcosahedronGeometry(s * 1.4, 1), 
			mat
		));
		body.setPosition(0, s * 3, 0);
		body.randomRotation();
		body.setOrigins();
		body.setLerpSpeed(2);
		model.add(body.get());

		head.add(new THREE.Mesh(
			new THREE.IcosahedronGeometry(s * 1.5, 1),
			mat
		));
		head.setPosition(0, s * 5, s * 2);
		head.randomRotation();
		model.add(head.get());

		const earMesh = new THREE.Mesh(
			new THREE.ConeGeometry(s * 0.5, s * 0.5, 3),
			mat
		);
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
			const h = s * 0.8;
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
			j1.addPosition(0, s * -1.2, 0);
			j1.rotateX(Math.PI * a);
			j1.setOrigins();
			j1.setRotateSpeed(legRotateSpeed);
			j1.add(addLine(p1, p2));

			j2.setPosition(0, -h, 0);
			j2.rotateX(Math.PI * -a * 2);
			j2.add(addLine(p1, p2));
			j2.setRotateSpeed(legRotateSpeed);
			j2.setOrigins();
			
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
	let w = 0, wi = 3;
	let l = 0, li = 5;
	let bp = 0, bpi = 10;
	function walk(timeElapsedInSeconds) {
		
		w += wi * timeElapsedInSeconds;
		wi = (wi + Cool.random(-0.1, 0.1)).clamp(1.9, 2.1);
		let wa = Cool.map(Math.sin(w), -1, 1, 0.2, 0.3);
		for (let i = 1; i < tail.length; i++) {
			tail[i].setTargetRotation(wa + i * 0.05, 0, 0);
			tail[i].rotate();
			// a += 0.01;
		}

		l += li * timeElapsedInSeconds;
		li = (li + Cool.random(-0.1, 0.1)).clamp(4.8, 5.2);
		for (let i = 0; i < legs.length; i++) {
			
			const a1 = Cool.map(Math.sin(legs[i].phase + l), -1, 1, -2, 2);
			const a2 = Cool.map(Math.sin(legs[i].phase + l * 2), -1, 1, 1.25, -1.25);

			legs[i].joints[0].setTargetRotation(a1, i < 2 ? fa : ba, 0);
			legs[i].joints[0].rotate();
			legs[i].joints[1].setTargetRotation(a2, 0, 0);
			legs[i].joints[1].rotate();
		}

		// const c = Cool.map(p, -1, 1, 0, 1);
		bp += bpi * timeElapsedInSeconds;
		let bpp = Cool.map(Math.sin(bp), -1, 1, 0, 0.5);
		body.setTargetPosition(0, s * 3 + bpp, 0);
		body.lerp();

		head.setTargetPosition(0, s * 5 - bpp, s * 2);
		head.lerp();
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

	let a = 0, ai = 1.25;
	function idle(timeElapsedInSeconds) {

		a += ai * timeElapsedInSeconds;
		ai = (ai + Cool.random(-0.1, 0.1)).clamp(1, 1.25);

		const ha = Cool.map(Math.sin(a + 0.1), -1, 1, -1, 1);
		head.setTargetRotation(0, ha, 0);
		head.rotate();
		
		const ta = Cool.map(Math.sin(a), -1, 1, -1.2, 1.2);
		for (let i = 1; i < tail.length; i++) {
			tail[i].setTargetRotation(0, 0, ta + i * 0.05 * Math.sign(ta));
			tail[i].rotate();
		}
	}

	function update(timeElapsed, isWalking) {

		if (isNaN(timeElapsed)) return;
		let timeElapsedInSeconds = timeElapsed / 1000;

		if (state === 'walking' && isWalking) {
			walk(timeElapsedInSeconds);
			const walkDistance = model.position.distanceTo(next.position);
			if (walkDistance > 0.1) {
				model.translateZ(speed * timeElapsed);
			} else {
				model.up.copy(next.normal);
				next = globe.getNext(next.position);
				model.lookAt(next.position);
			}
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
		update,
		isLoaded: () => { return true; }, // remove if using this one
		getModel: () => { return model; },
	};
}