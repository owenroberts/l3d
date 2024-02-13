/*
	controls noise effect
*/
import * as THREE from 'three';


import '../doodoo/ui/lib/cool/cool.js'; 

export default function NoiseEffect() {
	
	let count = 0;
	let value = new THREE.Vector2();

	function update() {
		if (count === 6) {
			value.x = (value.x + Cool.random(-0.1, 0.1)).clamp(0, 2);
			value.y = (value.y + Cool.random(-0.1, 0.1)).clamp(0, 2);
			count = 0;
		}
		count++;
	}

	return { 
		update,
		getValue: () => { return value; },
	};

}