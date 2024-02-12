/*
	setup scenery 
*/
import * as THREE from 'three';
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { Line2 } from 'three/addons/lines/Line2.js';

export default function Scenery(params) {

	const { scene1, scene2, worldRadius, w, h, noScene2 } = params;

	const X_AXIS = new THREE.Vector3(1, 0, 0);
	const Y_AXIS = new THREE.Vector3(0, 1, 0);
	const Z_AXIS = new THREE.Vector3(0, 0, 1);

	// inner globe is a way to generate some pionts and normals for addings trees ... 
	const innerGlobe = new THREE.Mesh(
		// offset, need to figure out real number here
		new THREE.IcosahedronGeometry(worldRadius - 2, 4), 
		new THREE.MeshStandardMaterial(),
		// new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true }),
	);
	innerGlobe.rotation.set(Cool.random(Math.PI), Cool.random(Math.PI), Cool.random(Math.PI));
	// scene1.add(innerGlobe);

	const indexedGlobe = BufferGeometryUtils.mergeVertices(innerGlobe.geometry);
	const globePosition = indexedGlobe.getAttribute('position');
	const globeNormal = indexedGlobe.getAttribute('normal');
	const usedPositions = [];
	
	const treeMaterial = new LineMaterial( { color: 0xff00ff, linewidth: 3 } );
	treeMaterial.resolution.set(w, h);
	
	const nTrees = Cool.randInt(globePosition.count * 0.33, globePosition.count * 0.66);
	for (let i = 0; i < nTrees; i++) {
		const vertIndex = Cool.randInt(globePosition.count - 1);
		if (usedPositions.includes(vertIndex)) continue;
		usedPositions.push(vertIndex);


		const position = new THREE.Vector3().fromBufferAttribute(globePosition, vertIndex);
		const normal = new THREE.Vector3().fromBufferAttribute(globeNormal, vertIndex);
		const pos2 = position.clone().addScaledVector(normal, 5);
		
		const type = 2; // Cool.randInt(1, 3);

		if (type === 1) {
			// tallTreeBranch(position, pos2, 5);
			tallTreeBranch(position, normal, 5);
		}

		if (type === 2) {
			// make angly bush
			const b = Cool.randInt(2, 4);
			for (let i = 0; i < b; i++) {
				anglyBush(position, normal, 5);
			}
		}
	}

	function addLine(pos, pos2) {
		const geometry = new LineGeometry();
		geometry.setPositions([
			pos.x, pos.y, pos.z,
			pos2.x, pos2.y, pos2.z,
		]);
		const line = new Line2(geometry, treeMaterial);
		if (noScene2) scene1.add(line);
		else scene2.add(line);
	}

	function tallTreeBranch(position, normal, length) {
		const pos2 = position.clone().addScaledVector(normal, length);
		addLine(position, pos2);
		if (length > 1) {
			length--;

			const b = Cool.randInt(1, 3);
			for (let i = 0; i < b; i++) {
				const p = pos2.clone().addScaledVector(normal, Cool.random(-1, 0));
				const n = normal.clone();
				n.x = n.x + Cool.random(-0.5, 0.5);
				n.y = n.y + Cool.random(-0.5, 0.5);
				n.z = n.z + Cool.random(-0.5, 0.5);
				tallTreeBranch(p, n, length);

			}
		}
	}

	function tallTreeBranch2(pos, pos2, length) {
		// https://natureofcode.com/fractals/#trees -- sort of based on this
		addLine(pos, pos2);

		if (length > 1) {
			
			length--;

			const b = Cool.randInt(1, 3);
			for (let i = 0; i < b; i++) {

				let n = new THREE.Vector3()
					.subVectors(pos2, pos)
					.normalize()
				
				const p = pos2.clone()
					.addScaledVector(n, Cool.random(-1, 0))

				n.applyAxisAngle(new THREE.Vector3(0, 0, 1), Cool.random(-0.5, 0.5));
				n.applyAxisAngle(new THREE.Vector3(0, 1, 0), Cool.random(-0.5, 0.5));
				n.applyAxisAngle(new THREE.Vector3(1, 0, 0), Cool.random(-0.5, 0.5));
				
				p.addScaledVector(n, length);
				
				tallTreeBranch(pos2, p, length);
			}
		}
	}

	function treeBranch(pos, pos2, length, type, branchAgain=true) {
		
		// const pos2 = position.clone().addScaledVector(normal, length);
		const points = [
			pos.x, pos.y, pos.z,
			pos2.x, pos2.y, pos2.z,
		];
		
		const geometry = new LineGeometry();
		geometry.setPositions(points);
		const line = new Line2(geometry, treeMaterial);
		if (noScene2) scene1.add(line);
		else scene2.add(line);

		if (length > 1 && branchAgain) {
			
			if (!type) type = 2; // Cool.randInt(1, 3);
			if (type === 1) {
				length--;

				const b = Cool.randInt(1, 3);
				for (let i = 0; i < b; i++) {

					let n = new THREE.Vector3()
						.subVectors(pos2, pos)
						.normalize()
					
					const p = pos2.clone()
						.addScaledVector(n, Cool.random(-1, 0))

					n.applyAxisAngle(new THREE.Vector3(0, 0, 1), Cool.random(-0.5, 0.5));
					n.applyAxisAngle(new THREE.Vector3(0, 1, 0), Cool.random(-0.5, 0.5));
					n.applyAxisAngle(new THREE.Vector3(1, 0, 0), Cool.random(-0.5, 0.5));
					
					p.addScaledVector(n, length);
					
					treeBranch(pos2, p, length, type);
				}
			}

			if (type === 2) {
				length--;

				const b = Cool.randInt(2, 4);
				for (let i = 0; i < b; i++) {

					let n = new THREE.Vector3()
						.subVectors(pos2, pos)
						.normalize()
					
					const p = pos2.clone()
						.addScaledVector(n, Cool.random(-1, 0))

					const rn = Cool.random([[1, 0, 0], [0, 0, 1]]);
					const axis = new THREE.Vector3(...rn);
					const angle = Cool.random(2.5, 3) * Cool.random([-1, 1]);
					n.applyAxisAngle(axis, angle);
					p.addScaledVector(n, length + 1);

					// fuck no

					// n.applyAxisAngle(new THREE.Vector3(0, 1, 0), Cool.random(-0.5, 0.5));
					// n.applyAxisAngle(new THREE.Vector3(1, 0, 0), Cool.random(-0.5, 0.5));
					

					n.applyAxisAngle(axis, -angle);
					const p2 = p.clone()
						p.addScaledVector(n, length);
					
					treeBranch(pos2, p, length, type, false);
					treeBranch(p, p2, length - 1, type, true);
				}
			}

			if (type === 3) {
				// const n = normal.clone();
				// const p = pos2.clone();
				
				let p = new THREE.Vector3()
					.subVectors(position, pos2)
					.multiplyScalar(-1)
					.add(position);
  
				let n = new THREE.Vector3()
					.subVectors(position, pos2)
					.applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI * 0.5)
					.normalize();

				// length -= 2;
				const p1 = p.clone().addScaledVector(n, -length);
				treeBranch(p1, n, length * 2, type, false);

				for (let i = 0; i < 5; i++) {
					const np = p.clone().addScaledVector(n, (i - 2) * length / 2);
					treeBranch(np, normal, length, type, false);
				}
			}
		}
	}

	function anglyBush(position, normal, length) {

		const z_angle = Cool.random(Math.PI * 2);
		const x_angle = Cool.random(0.2, 0.6);

		const o = new THREE.Object3D();
		o.position.copy(position);
		o.lookAt(position.clone().add(normal));
		o.rotateOnAxis(Z_AXIS, z_angle);
		o.rotateOnAxis(X_AXIS, x_angle);
		o.translateZ(length);
		addLine(position, o.position);

		const o2 = new THREE.Object3D();
		o2.position.copy(o.position);
		o2.lookAt(position);
		o2.rotateOnAxis(Z_AXIS, -z_angle);
		o2.rotateOnAxis(X_AXIS, x_angle * 2);
		o2.translateZ(length);
		addLine(o.position, o2.position);

		length -= Cool.random(1, 2);
		if (length > 1) {
			anglyBush(o2.position, normal, length);
		}

	}
}


