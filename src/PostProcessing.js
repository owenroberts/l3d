/*
	setup post processing
*/
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { LinesPass } from './LinesPass.js';
import vertexShader from './vert.glsl';
import blenderShader from './blend.glsl';
import Animator from './Animator.js';


export default function PostProcessing(params) {

	const { scene1, scene2, renderer, camera, noScene2 } = params;

	const renderPass1 = new RenderPass(scene1, camera);
	const linesPass1 = new LinesPass({
		width: renderer.domElement.clientWidth,
		height: renderer.domElement.clientHeight,
		scene: scene1,
		camera: camera,
		uniforms: {
			lineColor: { type: 'vec3', value: new THREE.Color(0x000000) },
			bgColor: { type: 'vec3', value: new THREE.Color(0xC7C7C7) },
			lineWidth: 1,
			numLines: 5,
			diffuseCutoff: { type: 'float', value: 40 },
			normalCutoff: { type: 'float', value: 50 },
			noiseMultiplier: { type: 'float', value: 10 },
		}
	});

	const composer = new EffectComposer(renderer);
	composer.addPass( renderPass1 );
	composer.addPass( linesPass1 );

	let scene2Composer, linesPass2;

	const animators = {
		diffuse: new Animator({
			value: 40,
			valueClamp: [30, 60],
			increment: 1,
			randomRange: [-1, 1],
			clampRange: [-3, 2],
			count: 24,
		}),
		normal: new Animator({
			value: 50,
			valueClamp: [10, 100],
			increment: 1,
			randomRange: [-1, 1],
			clampRange: [-3, 2],
			count: 24,
		}),
		noise: new Animator({
			value: 10,
			valueClamp: [2, 14],
			increment: 1,
			randomRange: [-1, 1],
			clampRange: [-3, 2],
			count: 24,
		}),
	};

	if (!noScene2) {
	
		const renderPass2 = new RenderPass(scene2, camera);
		linesPass2 = new LinesPass({
			width: renderer.domElement.clientWidth,
			height: renderer.domElement.clientHeight,
			scene: scene2,
			camera: camera,
			uniforms: {
				lineColor: { type: 'vec3', value: new THREE.Color(0xFFFFFF) },
				bgColor: { type: 'vec3', value: new THREE.Color(0xC7C7C7) },
				lineWidth: 1,
				numLines: 5,
			}
		});

		const outputPass = new OutputPass();
		scene2Composer = new EffectComposer(renderer);
		scene2Composer.renderToScreen = false;
		scene2Composer.addPass(renderPass2);
		scene2Composer.addPass(linesPass2);
		scene2Composer.addPass(outputPass); 
		// https://codesandbox.io/p/devbox/preserve-depth-forked-738cmp?file=%2Fsrc%2Fswap-pass.ts%3A145%2C38

		const mixPass = new ShaderPass(
			new THREE.ShaderMaterial( {
				uniforms: {
					baseTexture: { value: null },
					blendTexture: { value: scene2Composer.renderTarget2.texture }
				},
				vertexShader: vertexShader,
				fragmentShader: blenderShader,
				defines: {}
			} ), 'baseTexture'
		);
		mixPass.needsSwap = true;

		composer.addPass( mixPass );
	}

	function update(value) {

		// animators.diffuse.update();
		// animators.normal.update();


		linesPass1.material.uniforms.diffuseCutoff.value = animators.diffuse.update()
		linesPass1.material.uniforms.normalCutoff.value = animators.normal.update();
		linesPass1.material.uniforms.noiseMultiplier.value = animators.noise.update();

		// linesPass1.material.uniforms.noiseOffset.value.x = value.x;
		// linesPass1.material.uniforms.noiseOffset.value.y = value.y;

		if (!linesPass2) return;
		
		linesPass2.material.uniforms.noiseOffset.value.x = value.x;
		linesPass2.material.uniforms.noiseOffset.value.y = value.y;
	}

	function process() {
		if (!noScene2) scene2Composer.render();
		composer.render();
	}

	function setSize(w, h) {
		composer.setSize(w, h);
		if (scene2Composer) scene2Composer.setSize(w, h);
	}

	return { process, update, setSize };

}