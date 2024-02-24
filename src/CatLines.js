/*
	make a cat out of lines instead of models ... 
*/
import * as THREE from 'three';
import Joint from './Joint.js';
import '../doodoo/ui/lib/cool/cool.js'; // fuck off

export default function CatLines(params) {

	const { scene } = params;

	const model = new THREE.Object3D();
	const mat = new THREE.MeshStandardMaterial({ 
		color: 0x3d3d3d,
		side: THREE.DoubleSide,
		// wireframe: true,
	});

	let state = 'idling'; // idling
	const s = 1; // size

	const body = new Joint();
	body.add(new THREE.Mesh(
		new THREE.IcosahedronGeometry(s * 1.4, 0), 
		mat
	));
	body.setPosition(0, s * 3, 0);
	body.randomRotation();
	body.setOrigins();
	body.setLerpSpeed(2);
	model.add(body.get());

	const head = new Joint();
	head.add(new THREE.Mesh(
		new THREE.IcosahedronGeometry(s * 1.5, 0),
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

	const tailRotateSpeed = 1, legRotateSpeed = 20;	
	const tailSegNum = 7;
	const tail = [];
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

	const legs = [];
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

	function walk(timeInSeconds, timeElapsedInSeconds) {
		let p = Math.cos(timeInSeconds * 2);
		let a = Cool.map(p, -1, 1, 0.3, 0.6);
		
		for (let i = 1; i < tail.length; i++) {
			tail[i].setTargetRotation(a, 0, 0);
			tail[i].rotate(timeElapsedInSeconds);
			a += 0.01;
		}

		for (let i = 0; i < legs.length; i++) {
			const phase = timeInSeconds * 2 + legs[i].phase;
			const p1 = Math.sin((timeInSeconds + legs[i].phase) * 2);
			const p2 = Math.sin((timeInSeconds + legs[i].phase) * 3);
			const a1 = Cool.map(p1, -1, 1, -2, 2);
			const a2 = Cool.map(p2, -1, 1, 2, -2);
			legs[i].joints[0].setTargetRotation(a1, 0, 0);
			legs[i].joints[0].rotate(timeElapsedInSeconds);
			legs[i].joints[1].setTargetRotation(a2, 0, 0);
			legs[i].joints[1].rotate(timeElapsedInSeconds);
		}

		const c = Cool.map(p, -1, 1, 0, 1);
		body.setTargetPosition(0, s * 3 + c, 0);
		body.lerp(timeElapsedInSeconds);
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

	function idle(timeInSeconds, timeElapsedInSeconds) {
		let p = Math.cos(timeInSeconds * 2);
		const ha = Cool.map(p, -1, 1, -1, 1);
		head.setTargetRotation(-ha, ha, 0);
		head.rotate(timeElapsedInSeconds);

		p = Math.cos(timeInSeconds);
		let ta = Cool.map(p, -1, 1, -1, 1);
		for (let i = 1; i < tail.length; i++) {
			tail[i].setTargetRotation(0, 0, ta);
			tail[i].rotate(timeElapsedInSeconds);
			ta += 0.01;
		}
	}

	function update(time, timeElapsed) {

		if (isNaN(timeElapsed)) return;
		let timeInSeconds = time / 1000;
		let timeElapsedInSeconds = timeElapsed / 1000;

		if (state === 'walking') walk(timeInSeconds, timeElapsedInSeconds);
		else if (state === 'idling' && !body.isAtOrigin()) reset(timeElapsedInSeconds);
		else idle(timeInSeconds, timeElapsedInSeconds);
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
		getModel: () => { return model; },
	};
}