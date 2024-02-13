/*
	set up globe and get points
*/
import * as THREE from 'three';
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

export default function Globe(params) {

	const { worldRadius } = params;

	const globe = new THREE.Mesh(
		// new THREE.SphereGeometry(worldRadius, 32, 16),
		new THREE.IcosahedronGeometry(worldRadius, 3),
		// new THREE.MeshStandardMaterial(),
		// new THREE.MeshStandardMaterial({ color: 0x00ffff, wireframe: true }),
		new THREE.MeshStandardMaterial({ color: 0x00ffff, side: THREE.DoubleSide }),
	);

	const indexedGlobe = BufferGeometryUtils.mergeVertices(globe.geometry);
	const globePosition = indexedGlobe.getAttribute('position');
	const globeNormal = indexedGlobe.getAttribute('normal');
	const segmentLength = worldRadius * 4 / Math.sqrt((10 + 2 * Math.sqrt(5)));

	function getNext(pos) {
		const neighbors = [];
		const v = new THREE.Vector3();
		for (let i = 0; i < globePosition.count; i++) {
			v.fromBufferAttribute(globePosition, i);
			const d = v.distanceTo(pos);
			if (d > 0 && d < segmentLength / 3) {
				neighbors.push(getGlobePos(i));
			}
		}
		return Cool.choice(neighbors);
	}

	function getGlobePos(index) {
		return {
			position: new THREE.Vector3().fromBufferAttribute(globePosition, index),
			normal: new THREE.Vector3().fromBufferAttribute(globeNormal, index),
			index: index,
		};
	}

	// function getNextWalkPosition() {
	// 	const prev = cat.next;
	// 	const next = getNext(prev.position);
	// 	cat.next = next;
	// 	cat.model.up.copy(prev.normal);
	// 	cat.model.lookAt(next.position);
	// }

	function getRandomVertex() {
		return Cool.randInt(globePosition.count - 1);
	}

	return { 
		getNext, getGlobePos, getRandomVertex,
		getGlobe: () => { return globe; },
	};

}