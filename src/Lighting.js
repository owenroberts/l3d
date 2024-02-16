/*
	set up lights for shadows
*/
import * as THREE from 'three';

export default function Lighting(params) {

	const { scene, debugRender } = params;

	if (debugRender) scene.add(new THREE.AmbientLight(0xeeefff, 0.1));

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

		const pos = lightGoal.position.clone();
		const dist = pos.distanceTo(new THREE.Vector3(0, 0, 0));

		// good enough for now
		// add some more lights ... 
		for (let i = 1; i < numLights; i++) {
			const a = i / numLights * Math.PI * 2;
			const goal = new THREE.Object3D();
			goal.lookAt(spotLight.position);
			goal.rotateX(a);
			goal.rotateY(Cool.random(-0.5, 0.5));
			goal.translateZ(dist);
			
			// const axesHelper = new THREE.AxesHelper( 5 );
			// axesHelper.position.copy(goal.position);
			// axesHelper.rotation.copy(goal.rotation);
			// scene.add(axesHelper);

			const light = spotLight.clone();
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