/*
	make a cat out of lines instead of models ... 
*/
import * as THREE from 'three';
import Joint from './Joint.js';
import '../doodoo/ui/lib/cool/cool.js'; // fuck off

export default function CatLines(params) {

	const { scene } = params;

	let isWalking = true;
	const model = new THREE.Object3D();
	const mat = new THREE.MeshStandardMaterial({ 
		color: 0x3d3d3d,
		side: THREE.DoubleSide,
		// wireframe: true,
	});

	const s = 1;

	function randomRotation(mesh) {
		mesh.rotation.x = Cool.random(0, Math.PI * 2);
		mesh.rotation.y = Cool.random(0, Math.PI * 2);
		mesh.rotation.z = Cool.random(0, Math.PI * 2);
	}

	const body = new THREE.Object3D();
	body.add(new THREE.Mesh(
		new THREE.IcosahedronGeometry(s * 1.4, 0), 
		mat
	));
	body.position.set(0, s * 3, 0);
	randomRotation(body);
	model.add(body);
	addHelper(body.position);

	const head = new THREE.Object3D();
	head.add(new THREE.Mesh(
		new THREE.IcosahedronGeometry(s * 1.5, 0),
		mat
	));
	head.position.set(0, s * 5, s * 2);
	randomRotation(head);
	model.add(head);

	const earLeft = new THREE.Mesh(
		new THREE.ConeGeometry(s * 0.5, s * 0.5, 3),
		mat
	);
	earLeft.position.copy(head.position);
	earLeft.position.add(new THREE.Vector3(s * -1, s * 1.5, 0));
	randomRotation(earLeft);
	model.add(earLeft);

	const earRight = earLeft.clone();
	earRight.position.add(new THREE.Vector3(s * 2, 0, 0));
	randomRotation(earRight);
	model.add(earRight);

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

	const tailSegNum = 7;
	const tail = [];

	for (let i = 0; i < tailSegNum; i++) {
		// const o = new THREE.Object3D();
		const j = new Joint();
		const h = s * 0.8;
		if (i === 0) {
			j.copy(body.position);
			j.addPosition(0, s * 1.2, -s * 1.2);
			// o.position.copy(body.position).add(new THREE.Vector3(0, s * 1.2, -s * 1.2));
			j.rotateX(-Math.PI * 0.2);
			model.add(j.get());
		} else {
			// o.position.add(new THREE.Vector3(0, h, 0));
			j.addPosition(0, h, 0);
			tail[i - 1].add(j);
		}

		const p1 = new THREE.Vector3(0, 0, 0);
		const p2 = new THREE.Vector3(0, h, 0);
		j.rotateX(i * Math.PI * 0.02);
		j.add(addLine(p1, p2));
		j.setOrigins();
		// o.oQ = o.quaternion.clone();
		// o.oT = new THREE.Quaternion();
		tail.push(j);
	}

	const legs = [];
	for (let i = 0; i < 4; i++) {
		const o1 = new THREE.Object3D();
		const o2 = new THREE.Object3D();
		const h = s * 1;
		const a = 0.2;
		const p1 = new THREE.Vector3(0, 0, 0);
		const p2 = new THREE.Vector3(0, -h, 0);

		o1.position.copy(body.position).add(new THREE.Vector3(0, s * -1.2, 0));
		o1.rotateX(Math.PI * a);
		o1.add(addLine(p1, p2));

		o2.position.set(0, -h, 0);
		o2.rotateX(Math.PI * -a * 2);
		o2.add(addLine(p1, p2));
		o1.add(o2);

		model.add(o1);
		legs.push({o1, o2, phase: Cool.random(i * 1, i * 1 + 2)});
	}
	const ls = s * 0.6;
	legs[0].o1.position.add(new THREE.Vector3(ls, 0, ls));
	legs[2].o1.position.add(new THREE.Vector3(ls, 0, -ls));
	legs[1].o1.position.add(new THREE.Vector3(-ls, 0, ls));
	legs[3].o1.position.add(new THREE.Vector3(-ls, 0, -ls));

	function update(time, timeElapsed) {

		if (isWalking) {
			let a = Cool.map(Math.cos(time * 0.002), -1, 1, 0.3, 0.6);
			for (let i = 1; i < tail.length; i++) {
				// tail[i].oT.setFromEuler(new THREE.Euler(a, 0, 0));
				// tail[i].quaternion.rotateTowards(tail[i].oT, 0.01);
				tail[i].setTargetRotation(a, 0, 0);
				tail[i].rotate();
				a += 0.01;
			}

			for (let i = 0; i < legs.length; i++) {
				const phase = time * 0.002 + legs[i].phase;
				// console.log(phase, Math.sin(phase));
				const b1 = Cool.map(Math.sin(phase), -1, 1, -2, 2);
				const b2 = Cool.map(Math.sin(phase * 3), -1, 1, 2, -2);
				legs[i].o1.rotation.x = b1;
				legs[i].o2.rotation.x = b2;

			}

			const c = Cool.map(Math.sin(time * 0.006), -1, 1, 0, 0.5);
			body.position.y = s * 3 + c;
		} else {
			for (let i = 1; i < tail.length; i++) {
				// tail[i].quaternion.rotateTowards(tail[i].oQ, 0.01);
				tail[i].unrotate();
			}
		}


	}

	/* key commands */
	function keyDown(ev) {
		if (ev.code === 'KeyW') isWalking = !isWalking;
	}
	document.addEventListener('keydown', keyDown);

	return {
		update,
		getModel: () => { return model; },
	};
}