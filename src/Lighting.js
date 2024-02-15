/*
	set up lights for shadows
*/
import * as THREE from 'three';

export default function Lighting(params) {

	const { scene, debugRender } = params;

	// if (debugRender) scene.add(new THREE.AmbientLight(0xeeefff, 0.1));

	const spotLight = new THREE.SpotLight( 0xffffff, 1000 );
	spotLight.name = 'Spot Light';
	spotLight.angle = 1;
	spotLight.penumbra = 0;
	spotLight.position.set(20, 25, 0);
	spotLight.castShadow = true;
	spotLight.shadow.camera.near = 8;
	spotLight.shadow.camera.far = 30;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	scene.add( spotLight );

	const lightOffset = new THREE.Vector3(20, 25, 0);
	const numLights = 12;

	function setPosition(catModel) {
		const lightGoal = new THREE.Object3D();
		lightGoal.position.copy(catModel.position);
		lightGoal.rotation.copy(catModel.rotation);
		lightGoal.up.copy(catModel.up);
		lightGoal.translateX(lightOffset.x);
		lightGoal.translateY(lightOffset.y);

		// const axesHelper = new THREE.AxesHelper( 5 );
		// axesHelper.position.copy(lightGoal.position);
		// scene.add( axesHelper );

		spotLight.position.copy(lightGoal.position);
		spotLight.target.position.copy(new THREE.Vector3(0, 0, 0));

		spotLight.target.updateMatrixWorld();

		const dist = lightGoal.position.clone().distanceTo(new THREE.Vector3(0, 0, 0));
		const pos = lightGoal.position.clone();

		// good enough for now
		// add some more lights ... 
		for (let i = 1; i < numLights + 1; i++) {
			const a = i / numLights * Math.PI * 2;
			const light = spotLight.clone();
			const goal = new THREE.Object3D();
			goal.rotation.x = Math.sin(a) * dist * Cool.random(2, 4);
			goal.rotation.y = Math.cos(a) * dist * Cool.random(2, 4);
			goal.rotation.z = Math.cos(a) * Math.sin(a) * dist;
			goal.translateOnAxis(pos.normalize(), dist);

			// const axesHelper = new THREE.AxesHelper( 5 );
			// axesHelper.position.copy(goal.position);
			// scene.add( axesHelper );
			
			light.position.copy(goal.position);
			light.target.position.copy(new THREE.Vector3(0, 0, 0));
			light.target.updateMatrixWorld();
			scene.add(light);

			// const spotLightHelper = new THREE.SpotLightHelper(light);
			// scene.add( spotLightHelper );
		}

		// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
		// scene.add( spotLightHelper );
	}

	return { setPosition };


}