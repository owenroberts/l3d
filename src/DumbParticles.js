import * as THREE from 'three';


export default function Particles(params) {

	const { scene, worldRadius } = params;

	const count = 128;
	// const particles = new THREE.BufferGeometry();
	// const positions = new Float32Array(particleCount * 3);
	const dist = 1;

	const size = Cool.random(0.2, 0.5);
	const geo = new THREE.PlaneGeometry(size, size);
	const mat = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });
	const mesh = new THREE.InstancedMesh(geo, mat, count);
	scene.add(mesh);

	const dumby = new THREE.Object3D();
	for (let i = 0; i < count; i++) {
		
		const angle = Cool.random(Math.PI * 2);
		dumby.position.x = Math.sin(Cool.random(Math.PI * 2)) * worldRadius * dist;
		dumby.position.y = Math.cos(Cool.random(Math.PI * 2)) * worldRadius * dist;
		dumby.position.z = Math.sin(Cool.random(Math.PI * 2)) * Math.cos(Cool.random(Math.PI * 2)) * worldRadius * dist;

		dumby.rotation.x = Cool.random(Math.PI * 2);
		dumby.rotation.y = Cool.random(Math.PI * 2);
		dumby.rotation.z = Cool.random(Math.PI * 2);
		
		dumby.updateMatrix();
		mesh.setMatrixAt(i, dumby.matrix);
	}

	function update() {
		mesh.rotation.x += 0.0001;
		mesh.rotation.y += 0.0001;
	}

	return { 
		update, 
		get: () => { return mesh; }, 
	};
}