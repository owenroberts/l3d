// https://tympanus.net/codrops/2022/11/29/sketchy-pencil-effect-with-three-js-post-processing/
import { Pass, FullScreenQuad } from 'three/addons/postprocessing/Pass.js';
import { CopyShader } from 'three/addons/shaders/CopyShader.js';
import { LinesMaterial } from './LinesMaterial.js';
import * as THREE from 'three';

export class LinesPass extends Pass {
	
	constructor({ width, height, scene, camera, uniforms }) {
		super();

		this.scene = scene;
		this.camera = camera;
		
		this.material = new LinesMaterial({ uniforms });
		// this.material.blending = THREE.CustomBlending;
		// this.material.blendEquation = THREE.AddEquation;
		// this.material.blendSrc = THREE.SrcColor;
		// this.material.blendDst = THREE.OneMinusSrcAlphaFactor;

		this.fsQuad = new FullScreenQuad(this.material);
		this.material.uniforms.uResolution.value = new THREE.Vector2(width, height);

		const normalBuffer = new THREE.WebGLRenderTarget(width, height);
		normalBuffer.texture.format = THREE.RGBAFormat;
		// normalBuffer.texture.type = THREE.HalfFloatType;
		// normalBuffer.texture.type = THREE.UnsignedShort4444Type;
		// this breaks the particles but idk what it does ... 

		normalBuffer.texture.minFilter = THREE.NearestFilter;
		normalBuffer.texture.magFilter = THREE.NearestFilter;
		normalBuffer.texture.generateMipmaps = false;
		normalBuffer.stencilBuffer = false;
		this.normalBuffer = normalBuffer;
		this.normalMaterial = new THREE.MeshNormalMaterial();

		// this.needsSwap = false;

		const loader = new THREE.TextureLoader();
		loader.load('./imgs/image-7.png', texture => {
			this.material.uniforms.uTexture.value = texture;
		});
	}

	dispose() {
		this.material.dispose();
		this.fsQuad.dispose();
	}

	render(renderer, writeBuffer, readBuffer) {
		// console.log(readBuffer)
		
		// this.material.uniforms['tDiffuse'].value = readBuffer.texture;
		renderer.setRenderTarget(this.normalBuffer);
		
		const overrideMaterialValue = this.scene.overrideMaterial;
		
		this.scene.overrideMaterial = this.normalMaterial;
		renderer.render(this.scene, this.camera);
		this.scene.overrideMaterial = overrideMaterialValue;

		this.material.uniforms.uNormals.value = this.normalBuffer.texture;
		this.material.uniforms.tDiffuse.value = readBuffer.texture;
		
		if (this.renderToScreen) {
			renderer.setRenderTarget(null);
			this.fsQuad.render(renderer);
		} else {
			renderer.setRenderTarget(writeBuffer);
			if (this.clear) renderer.clear();
			this.fsQuad.render(renderer);
		}
	}
}