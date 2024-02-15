/*
	a fuckin particle system
*/
import * as THREE from 'three';


export default function Particles(params) {

	const { scene, worldRadius } = params;

	const particleCount = 128;
	const particles = new THREE.BufferGeometry();
	const positions = new Float32Array(particleCount * 3);
	const dist = 1;

	for (let i = 0; i < particleCount; i++) {
		const index = i * 3;
		
		// positions[index] = Math.random() * dist - dist / 2;
		// positions[index + 1] = Math.random() * dist - dist / 2;
		// positions[index + 2] = Math.random() * dist - dist / 2;
		
		const angle = Cool.random(Math.PI * 2);
		positions[index + 0] = Math.sin(Cool.random(Math.PI * 2)) * worldRadius * dist;
		positions[index + 1] = Math.cos(Cool.random(Math.PI * 2)) * worldRadius * dist;
		positions[index + 2] = Math.sin(Cool.random(Math.PI * 2)) * Math.cos(Cool.random(Math.PI * 2)) * worldRadius * dist;
	}

	particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	const texture = new THREE.TextureLoader().load('./img/particle.png');
	const particleMaterial = new THREE.PointsMaterial({
		color: 0xffffff,
		size: 0.1,
		// sizeAttenuation: true,
	});

	const particleSystem = new THREE.Points(particles, particleMaterial);
	scene.add(particleSystem);

	function update() {
		particleSystem.rotation.x += 0.0001;
		particleSystem.rotation.y += 0.0001;
	}

	return { 
		update, 
		get: () => { return particleSystem; }, 
	};


}