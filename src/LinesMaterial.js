import * as THREE from 'three';
import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'


export class LinesMaterial extends THREE.ShaderMaterial {
	constructor(params) {
		super({
			uniforms: {
				lineColor: params.uniforms.lineColor,
				bgColor: params.uniforms.bgColor,
				tDiffuse: { value: null },
				uNormals: { value: null },
				uTexture: { value: null },
				noiseOffset: { value: new THREE.Vector2(0.5, 0) },
				uResolution: { value: new THREE.Vector2(1, 1) },
			},
		vertexShader,
		fragmentShader
	});
  }
}