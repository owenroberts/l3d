/*
	set up globe and get points
*/
import * as THREE from 'three';
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

export default function Globe(params) {

	const { worldRadius, scene } = params;

	const globe = new THREE.Mesh(
		// new THREE.SphereGeometry(worldRadius, 32, 16),
		new THREE.IcosahedronGeometry(worldRadius, 3),
		// new THREE.MeshStandardMaterial(),
		new THREE.MeshStandardMaterial({ 
			color: 0x00ffff, 
			wireframe: true,
		}),
	);

	globe.castShadow = false;
	globe.receiveShadow = true;

	const indexedGlobe = BufferGeometryUtils.mergeVertices(globe.geometry);
	const globePosition = indexedGlobe.getAttribute('position');
	const globeNormal = indexedGlobe.getAttribute('normal');
	const segmentLength = worldRadius * 4 / Math.sqrt((10 + 2 * Math.sqrt(5)));

	function getNext(position) {
		const neighbors = getClosestNeighbors(position);
		const choice = Cool.choice(neighbors);
		const indexes = neighbors.filter(n => n.index != choice.index).map(n => n.index);
		const nextDoor = Cool.random(getClosestNeighbors(choice.position, indexes));
		if (nextDoor && Cool.chance(0.5)) {

			const o = new THREE.Object3D();
			o.position.copy(choice.position);
			o.up.copy(choice.normal);
			o.lookAt(nextDoor.position);
			o.translateZ(choice.position.distanceTo(nextDoor.position) / 2);

			const avgNormal = new THREE.Vector3().copy(choice.normal)
				.add(nextDoor.normal)
				.divideScalar(2);

			// addHelper({ position: o.position, normal: avgNormal }, false);
			return { position: o.position, normal: avgNormal };
		}
		return choice;
	}

	function getClosestNeighbors(position, indexes) {
		const neighbors = [];
		if (!indexes) indexes = Array.from(Array(globePosition.count).keys());
		const v = new THREE.Vector3();
		for (let i = 0; i < indexes.length; i++) {
			const index = indexes[i];
			v.fromBufferAttribute(globePosition, index);
			const d = v.distanceTo(position);
			if (d > 0 && d < segmentLength / 3) {
				neighbors.push(getGlobePos(index));
			}
		}
		return neighbors;
	}

	function getGlobePos(index) {
		return {
			position: new THREE.Vector3().fromBufferAttribute(globePosition, index),
			normal: new THREE.Vector3().fromBufferAttribute(globeNormal, index),
			index: index,
		};
	}

	function getRandomVertex() {
		return Cool.randInt(globePosition.count - 1);
	}

	function addHelper(obj, addAxes=true) {
		scene.add(new THREE.ArrowHelper(obj.normal, obj.position, 2, 0xff00ff));
		const axesHelper = new THREE.AxesHelper( 5 );
		axesHelper.position.copy(obj.position);
		// axesHelper.lookAt(globe.position);
		// axesHelper.rotation.copy(obj.normal);
		if (addAxes) scene.add( axesHelper );
		return { axes: axesHelper };
	}

	return { 
		getNext, getGlobePos, getRandomVertex,
		getGlobe: () => { return globe; },
	};

}