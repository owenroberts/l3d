import{c as it,r as f,d as st,e as se,m as te,D as xt}from"./Doodoo-CtZp_IRM.js";import{R as Xe,L as qe,C as ye,E as Ze,A as V,O as bt,S as St,a as at,v as Mt,b as Pt,M as G,I as he,c as le,m as rt,d as W,V as x,e as ct,D as Ce,J,f as lt,g as kt,h as Ee,T as Re,U as dt,i as ke,j as Ae,B as je,k as At,F as Ye,l as Te,n as pe,W as _t,o as ut,p as Ue,q as zt,r as Lt,s as Ct,t as Et,P as Rt,u as Ut,w as Bt,x as Dt,y as pt,z as Tt,G as Ot,H as Ft,K as jt,N as It}from"./blend-DoexH5HP.js";function Gt(c){const{scene1:e,scene2:o,renderer:t,camera:n,noScene2:w}=c,u=new Xe(e,n),i=new qe({width:t.domElement.clientWidth,height:t.domElement.clientHeight,scene:e,camera:n,uniforms:{lineColor:{type:"vec3",value:new ye(0)},bgColor:{type:"vec3",value:new ye(13092807)},lineWidth:1,numLines:5,diffuseCutoff:{type:"float",value:40},normalCutoff:{type:"float",value:50},noiseMultiplier:{type:"float",value:10}}}),r=new Ze(t);r.addPass(u),r.addPass(i);let a,d;const h={diffuse:new V({value:40,valueClamp:[30,60],increment:1,randomRange:[-1,1],clampRange:[-3,2],count:24}),normal:new V({value:50,valueClamp:[10,100],increment:1,randomRange:[-1,1],clampRange:[-3,2],count:24}),noise:new V({value:10,valueClamp:[2,14],increment:1,randomRange:[-1,1],clampRange:[-3,2],count:24})};if(!w){const m=new Xe(o,n);d=new qe({width:t.domElement.clientWidth,height:t.domElement.clientHeight,scene:o,camera:n,uniforms:{lineColor:{type:"vec3",value:new ye(16777215)},bgColor:{type:"vec3",value:new ye(13092807)},lineWidth:1,numLines:5,diffuseCutoff:{type:"float",value:40},normalCutoff:{type:"float",value:50},noiseMultiplier:{type:"float",value:10}}});const p=new bt;a=new Ze(t),a.renderToScreen=!1,a.addPass(m),a.addPass(d),a.addPass(p);const _=new St(new at({uniforms:{baseTexture:{value:null},blendTexture:{value:a.renderTarget2.texture}},vertexShader:Mt,fragmentShader:Pt,defines:{}}),"baseTexture");_.needsSwap=!0,r.addPass(_)}function l(m){i.material.uniforms.diffuseCutoff.value=h.diffuse.update(),i.material.uniforms.normalCutoff.value=h.normal.update(),i.material.uniforms.noiseMultiplier.value=h.noise.update()}function g(){w||a.render(),r.render()}function s(m,p){r.setSize(m,p),a&&a.setSize(m,p)}return{process:g,update:l,setSize:s}}function Wt(c){const{worldRadius:e,scene:o}=c,t=new G(new he(e,3),new le({color:65535}));t.castShadow=!1,t.receiveShadow=!0;const n=rt(t.geometry),w=n.getAttribute("position"),u=n.getAttribute("normal"),i=e*4/Math.sqrt(10+2*Math.sqrt(5));function r(l){const g=a(l),s=it(g),m=g.filter(_=>_.index!=s.index).map(_=>_.index),p=f(a(s.position,m));if(p&&st(.5)){const _=new W;_.position.copy(s.position),_.up.copy(s.normal),_.lookAt(p.position),_.translateZ(s.position.distanceTo(p.position)/2);const L=new x().copy(s.normal).add(p.normal).divideScalar(2);return{position:_.position,normal:L}}return s}function a(l,g){const s=[];g||(g=Array.from(Array(w.count).keys()));const m=new x;for(let p=0;p<g.length;p++){const _=g[p];m.fromBufferAttribute(w,_);const L=m.distanceTo(l);L>0&&L<i/3&&s.push(d(_))}return s}function d(l){return{position:new x().fromBufferAttribute(w,l),normal:new x().fromBufferAttribute(u,l),index:l}}function h(){return se(w.count-1)}return{getNext:r,getGlobePos:d,getRandomVertex:h,getGlobe:()=>t}}function Nt(){let c=0,e=new ct;function o(){c===6&&(e.x=(e.x+f(-.1,.1)).clamp(0,2),e.y=(e.y+f(-.1,.1)).clamp(0,2),c=0),c++}return{update:o,getValue:()=>e}}function Vt(c){const{camera:e}=c;let o=new x,t=new W;function n(){o.setFromMatrixPosition(t.matrixWorld),e.position.lerp(o,.02)}return{update:n,getGoal:()=>t}}function Ht(c){const{globe:e,scene:o}=c;let t,n,w=1e6;const u=new W,i=new le({color:4013373,side:Ce});function r(){const y=e.getRandomVertex();t=e.getGlobePos(y),n=e.getNext(t.position),u.position.set(t.position.x,t.position.y,t.position.z),u.up.copy(t.normal),u.lookAt(n.position)}let a=.005;const d=.5,h=new J,l=new J,g=[],s=[],m=.6,p=.3,_=d*2.2,L=d*5,v=3,A=4,M=7;function b(){const y=new lt(d,d*2,2,5),z=new G(y,i);z.castShadow=!0,h.add(z),h.setPosition(0,_,0),h.rotateX(Math.PI*.5),h.setOrigins(),h.setLerpSpeed(2),u.add(h.get());const I=new he(d*1.5,1),U=new G(I,i);U.castShadow=!0,l.add(U),l.setPosition(0,L,d*2),l.randomRotation(),l.setOrigins(),u.add(l.get());const R=new kt(d*1,d*1,3),me=new G(R,i);me.castShadow=!0;const ue=new J;ue.add(me),ue.addPosition(d*-1,d*1.5,0),ue.randomRotation(),l.add(ue.get());const ve=new J;ve.add(me.clone()),ve.addPosition(d*1,d*1.5,0),ve.randomRotation(),l.add(ve.get());for(let N=0;N<M;N++){const E=new J,K=d*.6;N===0?(E.copy(h.get().position),E.addPosition(0,d*1.2,-d*1.2),E.rotateX(-Math.PI*.2),u.add(E.get())):(E.addPosition(0,K,0),g[N-1].add(E)),E.rotateX(N*Math.PI*.02),E.add(P(new x(0,0,0),new x(0,K,0))),E.setOrigins(),E.setRotateSpeed(v),g.push(E)}for(let N=0;N<4;N++){const E=new J,K=new J,We=d*1,Ne=.2,Ve=new x(0,0,0),He=new x(0,-We,0);E.copy(h.getPosition()),E.addPosition(0,d*-.5,0),E.rotateX(Math.PI*Ne),E.setOrigins(),E.setRotateSpeed(A),E.add(P(Ve,He)),K.setPosition(0,-We,0),K.rotateX(Math.PI*-Ne*2),K.add(P(Ve,He)),K.setRotateSpeed(A),u.add(E.get()),E.add(K),s.push({joints:[E,K],phase:N*2})}const ee=d*.6;s[0].joints[0].addPosition(ee,0,ee),s[2].joints[0].addPosition(ee,0,-ee),s[1].joints[0].addPosition(-ee,0,ee),s[3].joints[0].addPosition(-ee,0,-ee),s[0].joints[0].rotateY(m),s[1].joints[0].rotateY(-m),s[2].joints[0].rotateY(-p),s[3].joints[0].rotateY(p),s.forEach(N=>N.joints.forEach(E=>E.setOrigins()))}b();function P(y,z){const I=new Ee(y,z),U=new Re(I,1,.08,3),R=new G(U,i);return R.castShadow=!0,u.add(R),R}function S(){const y=new he(f(.01,.05),1),z=new G(y,i);z.position.copy(u.position),z.quaternion.copy(u.quaternion),z.translateX(f(-.8,.8)),z.translateZ(f(1)),o.add(z)}const k={walk:{tail:new V({increment:3,randomRange:[-.1,.1],clampRange:[-.5,.5],func:y=>te(Math.sin(y),-1,1,.2,.3)}),legs:new V({increment:4,randomRange:[-.1,.1],clampRange:[-.2,.2]}),body:new V({increment:10,func:y=>te(Math.sin(y),-1,1,0,.5)})},idle:{head:new V({increment:1.25,randomRange:[-.1,.1],clampRange:[-.25,0],func:y=>te(Math.sin(y+.1),-1,1,-1,1)}),tail:new V({increment:1.25,randomRange:[-.1,.1],clampRange:[-.25,0],func:y=>te(Math.sin(y),-1,1,-1.2,1.2)})},crumbs:new V({increment:1,count:36,randomRange:[-1,1],clampRange:[-10,10],func:(y,z)=>{z.isCount&&S()}})};function C(y){const z=k.walk.tail.update(y);for(let R=1;R<g.length;R++)g[R].setTargetRotation({x:z+R*.05}),g[R].rotate(y);const I=k.walk.legs.update(y);for(let R=0;R<s.length;R++){const me=te(Math.sin(s[R].phase+I),-1,1,-2,2),ue=te(Math.sin(s[R].phase+I*2),-1,1,1.25,-1.25);s[R].joints[0].setTargetRotation({x:me}),s[R].joints[0].rotate(y),s[R].joints[1].setTargetRotation({x:ue}),s[R].joints[1].rotate(y)}const U=k.walk.body.update(y);h.setTargetPosition({y:_+U}),h.lerp(y),l.setTargetPosition({y:L-U}),l.lerp(y),k.crumbs.update(y)}function O(y){for(let z=1;z<g.length;z++)g[z].unrotate(y);for(let z=0;z<s.length;z++)s[z].joints[0].unrotate(y),s[z].joints[1].unrotate(y);h.unlerp(y)}function F(y){const z=k.idle.head.update(y);l.setTargetRotation({y:z}),l.rotate(y);const I=k.idle.tail.update(y);for(let U=1;U<g.length;U++)g[U].setTargetRotation({z:I+U*.05*Math.sign(I)}),g[U].rotate(y)}function j(y,z){if(isNaN(y))return;let I=y/1e3;if(z){C(I);const U=u.position.distanceTo(n.position);U>.1&&w-U>0?(u.translateZ(a*y),w=U):(w=1e6,u.up.copy(n.normal),n=e.getNext(n.position),u.lookAt(n.position))}else h.isAtOrigin()?F(I):O(I)}function de(y){y.code}return document.addEventListener("keydown",de),{update:j,globeSetup:r,getStart:()=>t,isLoaded:()=>!0,getModel:()=>u}}ke.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ct(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Ae.line={uniforms:dt.merge([ke.common,ke.fog,ke.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class _e extends at{constructor(e){super({type:"LineMaterial",uniforms:dt.clone(Ae.line.uniforms),vertexShader:Ae.line.vertexShader,fragmentShader:Ae.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1))}}const Ke=new je,xe=new x;class ft extends At{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],o=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],t=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(t),this.setAttribute("position",new Ye(e,3)),this.setAttribute("uv",new Ye(o,2))}applyMatrix4(e){const o=this.attributes.instanceStart,t=this.attributes.instanceEnd;return o!==void 0&&(o.applyMatrix4(e),t.applyMatrix4(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let o;e instanceof Float32Array?o=e:Array.isArray(e)&&(o=new Float32Array(e));const t=new Te(o,6,1);return this.setAttribute("instanceStart",new pe(t,3,0)),this.setAttribute("instanceEnd",new pe(t,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let o;e instanceof Float32Array?o=e:Array.isArray(e)&&(o=new Float32Array(e));const t=new Te(o,6,1);return this.setAttribute("instanceColorStart",new pe(t,3,0)),this.setAttribute("instanceColorEnd",new pe(t,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new _t(e.geometry)),this}fromLineSegments(e){const o=e.geometry;return this.setPositions(o.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new je);const e=this.attributes.instanceStart,o=this.attributes.instanceEnd;e!==void 0&&o!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Ke.setFromBufferAttribute(o),this.boundingBox.union(Ke))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ut),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,o=this.attributes.instanceEnd;if(e!==void 0&&o!==void 0){const t=this.boundingSphere.center;this.boundingBox.getCenter(t);let n=0;for(let w=0,u=e.count;w<u;w++)xe.fromBufferAttribute(e,w),n=Math.max(n,t.distanceToSquared(xe)),xe.fromBufferAttribute(o,w),n=Math.max(n,t.distanceToSquared(xe));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}class mt extends ft{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const o=e.length-3,t=new Float32Array(2*o);for(let n=0;n<o;n+=3)t[2*n]=e[n],t[2*n+1]=e[n+1],t[2*n+2]=e[n+2],t[2*n+3]=e[n+3],t[2*n+4]=e[n+4],t[2*n+5]=e[n+5];return super.setPositions(t),this}setColors(e){const o=e.length-3,t=new Float32Array(2*o);for(let n=0;n<o;n+=3)t[2*n]=e[n],t[2*n+1]=e[n+1],t[2*n+2]=e[n+2],t[2*n+3]=e[n+3],t[2*n+4]=e[n+4],t[2*n+5]=e[n+5];return super.setColors(t),this}fromLine(e){const o=e.geometry;return this.setPositions(o.attributes.position.array),this}}const Je=new x,$e=new x,B=new Ue,D=new Ue,X=new Ue,Be=new x,De=new zt,T=new Lt,Qe=new x,be=new je,Se=new ut,q=new Ue;let Z,ce;function et(c,e,o){return q.set(0,0,-e,1).applyMatrix4(c.projectionMatrix),q.multiplyScalar(1/q.w),q.x=ce/o.width,q.y=ce/o.height,q.applyMatrix4(c.projectionMatrixInverse),q.multiplyScalar(1/q.w),Math.abs(Math.max(q.x,q.y))}function Xt(c,e){const o=c.matrixWorld,t=c.geometry,n=t.attributes.instanceStart,w=t.attributes.instanceEnd,u=Math.min(t.instanceCount,n.count);for(let i=0,r=u;i<r;i++){T.start.fromBufferAttribute(n,i),T.end.fromBufferAttribute(w,i),T.applyMatrix4(o);const a=new x,d=new x;Z.distanceSqToSegment(T.start,T.end,d,a),d.distanceTo(a)<ce*.5&&e.push({point:d,pointOnLine:a,distance:Z.origin.distanceTo(d),object:c,face:null,faceIndex:i,uv:null,uv1:null})}}function qt(c,e,o){const t=e.projectionMatrix,w=c.material.resolution,u=c.matrixWorld,i=c.geometry,r=i.attributes.instanceStart,a=i.attributes.instanceEnd,d=Math.min(i.instanceCount,r.count),h=-e.near;Z.at(1,X),X.w=1,X.applyMatrix4(e.matrixWorldInverse),X.applyMatrix4(t),X.multiplyScalar(1/X.w),X.x*=w.x/2,X.y*=w.y/2,X.z=0,Be.copy(X),De.multiplyMatrices(e.matrixWorldInverse,u);for(let l=0,g=d;l<g;l++){if(B.fromBufferAttribute(r,l),D.fromBufferAttribute(a,l),B.w=1,D.w=1,B.applyMatrix4(De),D.applyMatrix4(De),B.z>h&&D.z>h)continue;if(B.z>h){const v=B.z-D.z,A=(B.z-h)/v;B.lerp(D,A)}else if(D.z>h){const v=D.z-B.z,A=(D.z-h)/v;D.lerp(B,A)}B.applyMatrix4(t),D.applyMatrix4(t),B.multiplyScalar(1/B.w),D.multiplyScalar(1/D.w),B.x*=w.x/2,B.y*=w.y/2,D.x*=w.x/2,D.y*=w.y/2,T.start.copy(B),T.start.z=0,T.end.copy(D),T.end.z=0;const m=T.closestPointToPointParameter(Be,!0);T.at(m,Qe);const p=Ct.lerp(B.z,D.z,m),_=p>=-1&&p<=1,L=Be.distanceTo(Qe)<ce*.5;if(_&&L){T.start.fromBufferAttribute(r,l),T.end.fromBufferAttribute(a,l),T.start.applyMatrix4(u),T.end.applyMatrix4(u);const v=new x,A=new x;Z.distanceSqToSegment(T.start,T.end,A,v),o.push({point:A,pointOnLine:v,distance:Z.origin.distanceTo(A),object:c,face:null,faceIndex:l,uv:null,uv1:null})}}}class Zt extends G{constructor(e=new ft,o=new _e({color:Math.random()*16777215})){super(e,o),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,o=e.attributes.instanceStart,t=e.attributes.instanceEnd,n=new Float32Array(2*o.count);for(let u=0,i=0,r=o.count;u<r;u++,i+=2)Je.fromBufferAttribute(o,u),$e.fromBufferAttribute(t,u),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Je.distanceTo($e);const w=new Te(n,2,1);return e.setAttribute("instanceDistanceStart",new pe(w,1,0)),e.setAttribute("instanceDistanceEnd",new pe(w,1,1)),this}raycast(e,o){const t=this.material.worldUnits,n=e.camera;n===null&&!t&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const w=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Z=e.ray;const u=this.matrixWorld,i=this.geometry,r=this.material;ce=r.linewidth+w,i.boundingSphere===null&&i.computeBoundingSphere(),Se.copy(i.boundingSphere).applyMatrix4(u);let a;if(t)a=ce*.5;else{const h=Math.max(n.near,Se.distanceToPoint(Z.origin));a=et(n,h,r.resolution)}if(Se.radius+=a,Z.intersectsSphere(Se)===!1)return;i.boundingBox===null&&i.computeBoundingBox(),be.copy(i.boundingBox).applyMatrix4(u);let d;if(t)d=ce*.5;else{const h=Math.max(n.near,be.distanceToPoint(Z.origin));d=et(n,h,r.resolution)}be.expandByScalar(d),Z.intersectsBox(be)!==!1&&(t?Xt(this,o):qt(this,n,o))}}class Yt extends Zt{constructor(e=new mt,o=new _e({color:Math.random()*16777215})){super(e,o),this.isLine2=!0,this.type="Line2"}}function Kt(c){const{scene1:e,scene2:o,worldRadius:t,w:n,h:w,noScene2:u}=c,i=new x(1,0,0);new x(0,1,0);const r=new x(0,0,1);let a=e;const d=new _e({color:16777215,linewidth:3}),h=new _e({color:16777215,linewidth:1});d.resolution.set(n,w),h.resolution.set(n,w);const l=new G(new he(t-2,4),new le);l.rotation.set(f(Math.PI),f(Math.PI),f(Math.PI)),g(l);function g(v,A=!1){const M=rt(v.geometry),b=M.getAttribute("position"),P=M.getAttribute("normal"),S=[],k=se(b.count*.6,b.count*.8);for(let C=0;C<k;C++){const O=se(b.count-1);if(S.includes(O))continue;S.push(O);const F=new x().fromBufferAttribute(b,O),j=new x().fromBufferAttribute(P,O);A&&j.negate();const de=f([1,1,1,1,2,3,4]);if(de===1&&m(F,j,5),de===2){const y=se(2,4);for(let z=0;z<y;z++)p(F,j,5)}de===3&&_(F,j),de===4&&L(F,j)}}if(!u){const v=new G(new he(t*1.25,3),new le({side:Et}));o.add(v),a=o}function s(v,A,M=d){if(f(["line","tube"])=="tube"){const P=new Ee(v,A),S=new Re(P,1,.09,3),k=new G(S);k.castShadow=!0,a.add(k)}else{const P=new mt;P.setPositions([v.x,v.y,v.z,A.x,A.y,A.z]);const S=new Yt(P,M);S.castShadow=!0,a.add(S)}}function m(v,A,M){const b=v.clone().addScaledVector(A,M);if(s(v,b),M>1){M--;const P=se(1,3);for(let S=0;S<P;S++){const k=b.clone().addScaledVector(A,f(-1,0)),C=A.clone();C.x=C.x+f(-.5,.5),C.y=C.y+f(-.5,.5),C.z=C.z+f(-.5,.5),m(k,C,M)}}}function p(v,A,M){const b=f(Math.PI*2),P=f(.2,.6),S=new W;S.position.copy(v),S.lookAt(v.clone().add(A)),S.rotateOnAxis(r,b),S.rotateOnAxis(i,P),S.translateZ(M),s(v,S.position);const k=new W;k.position.copy(S.position),k.lookAt(v),k.rotateOnAxis(r,-b),k.rotateOnAxis(i,P*2),k.translateZ(M),s(S.position,k.position),M-=f(1,2),M>1&&p(k.position,A,M)}function _(v,A){const M=f(2,4),b=new W;b.position.copy(v),b.lookAt(v.clone().add(A)),b.rotateOnAxis(r,f(Math.PI*2)),b.rotateOnAxis(i,f(.2,.6));const P=M*f(.25,1.5);for(let S=0;S<5;S++){const k=b.clone();k.translateX(S*-P/2);const C=k.clone();C.translateZ(f(2,6)),s(k.position,C.position)}}function L(v,A){const M=se(4,8),b=se(20,40),P=v.clone().addScaledVector(A,b);for(let S=0;S<M;S++){const k=new W;k.position.copy(P),k.lookAt(P.clone().add(A));const C=k.clone(),O=f(2,20),F=f(2,20),j=f(2,4);k.translateX(f(-1,1)*O),k.translateY(f(-1,1)*F),k.translateZ(f(-1,1)*j),C.translateX(f(-1,1)*O),C.translateY(f(-1,1)*F),C.translateZ(f(-1,1)*j),s(k.position,C.position,h)}}}function Jt(c){const{scene:e,worldRadius:o}=c,t=128,n=1,w=f(.2,.5),u=new Rt(w,w),i=new le({side:Ce}),r=new Ut(u,i,t);r.castShadow=!1,e.add(r);const a=new W;for(let h=0;h<t;h++)f(Math.PI*2),a.position.x=Math.sin(f(Math.PI*2))*o*n,a.position.y=Math.cos(f(Math.PI*2))*o*n,a.position.z=Math.sin(f(Math.PI*2))*Math.cos(f(Math.PI*2))*o*n,a.rotation.x=f(Math.PI*2),a.rotation.y=f(Math.PI*2),a.rotation.z=f(Math.PI*2),a.updateMatrix(),r.setMatrixAt(h,a.matrix);function d(){r.rotation.x+=1e-4,r.rotation.y+=1e-4}return{update:d,get:()=>r}}function $t(c){const{scene:e,debugRender:o}=c;o&&e.add(new Bt(15659007,.1));const t=new Dt(16777215,1e3);t.name="Spot Light",t.angle=1,t.penumbra=0,t.position.set(20,25,0),t.castShadow=!0,t.shadow.camera.near=8,t.shadow.camera.far=30,t.shadow.mapSize.width=1024,t.shadow.mapSize.height=1024,e.add(t);const n=new x(20,25,0),w=12;function u(i){const r=new W;r.position.copy(i.position),r.rotation.copy(i.rotation),r.up.copy(i.up),r.translateX(n.x),r.translateY(n.y),t.position.copy(r.position),t.target.position.copy(new x(0,0,0)),t.target.updateMatrixWorld();const d=r.position.clone().distanceTo(new x(0,0,0));for(let h=1;h<w;h++){const l=h/w*Math.PI*2,g=new W;g.lookAt(t.position),g.rotateX(l),g.rotateY(f(-.5,.5)),g.translateZ(d);const s=t.clone();s.position.copy(g.position),s.target.position.copy(new x(0,0,0)),s.target.updateMatrixWorld(),e.add(s)}}return{setPosition:u}}function Qt(c){const{scene:e,parent:o}=c,t=.006,n={radius:30,align:1,center:1,separation:2,seek:1,boundary:1};o.position.add(new x(f(-5,5),f(0,10),f(-5,5)));const w=new W,u=new le({color:11513775,side:Ce});function i(l,g){const s=new Ee(l,g),m=new Re(s,1,.08,3),p=new G(m,u);return p.castShadow=!0,w.add(p),p}const r=f(.5,2),a=[];for(let l=0;l<3;l++){const g=new x(0,0,0),s=new x(-r/2,0,-r),m=new x(r/2,0,-r),p=new J;p.addPosition(0,0,r*1/3*l*-1),p.add(i(g,s)),p.add(i(g,m)),p.setRotateSpeed(2),p.setOrigins(),w.add(p.get()),a.push(p)}const d=new V({increment:1,func:(l,g)=>te(Math.cos(l*(2+g.i*.1)),-1,1,-1,1)});function h(l){for(let g=0;g<3;g++){const s=d.update(l,{i:g});a[g].setTargetRotation({x:s}),a[g].rotate(l)}}return{update:h,get:()=>w,getSpeed:()=>t,getFlocking:()=>n}}function en(c){const{start:e,next:o,scene:t,type:n,boundaries:w}=c,u=new x(0,0,0),i=new W;i.position.copy(e.position),i.up.copy(e.normal),i.lookAt(o.position),t.add(i);const r=new n({scene:t,parent:i});i.add(r.get());let a=r.getSpeed(),d=r.getFlocking(),h=!1;const l=new x(0,0,0),g=new x(0,0,0),s=8*a,m=.2*a;function p(M,b){const P=new x,S=new x,k=new x;let C=0;for(let O=0;O<M.length;O++){if(i.id===M[O].getID())continue;const F=M[O].getProps(),j=i.position.distanceTo(F.position);j<d.radius&&(C++,k.add(F.position),P.add(F.velocity),S.copy(i.position).sub(F.position),S.normalize(),S.divideScalar(j),S.multiplyScalar(d.radius-j))}C>0&&(S.normalize(),S.sub(l),S.multiplyScalar(d.separation),S.multiplyScalar(s),S.clampScalar(-m,m),v(S),P.divideScalar(C),P.normalize(),P.sub(l),P.multiplyScalar(d.align),P.multiplyScalar(s),P.clampScalar(-m,m),v(P))}function _(M){const b=M.clone().sub(i.position);b.multiplyScalar(s);const P=b.sub(l);P.clampScalar(-m,m),P.multiplyScalar(d.seek),v(P)}function L(){const M=i.position.distanceTo(u);if(M<w[0]){const b=i.position.clone().sub(u);b.normalize(),b.multiplyScalar(d.boundary),b.multiplyScalar(s).sub(l),b.clampScalar(-m,m),v(b)}if(M>w[1]){const b=u.clone().sub(i.position);b.normalize(),b.multiplyScalar(d.boundary),b.multiplyScalar(s).sub(l),b.clampScalar(-m,m),v(b)}}function v(M){g.add(M)}function A(M,b,P){r.update(M),p(b),_(P),L(),l.add(g),l.clampScalar(-s,s),i.position.add(l),g.multiplyScalar(0),i.lookAt(i.position.clone().add(l)),i.position.distanceTo(P)<1&&(h=!0)}return{update:A,getObject:()=>i,getID:()=>i.id,getPosition:()=>i.position,getVelocity:()=>l,getProps:()=>({position:i.position,velocity:l}),didReachTarget:()=>h?(h=!1,!0):!1}}function tn(c){const{position:e,scene:o,parent:t}=c,n=.00125,w={radius:20,align:1,center:1,separation:.75,seek:1.5,boundary:5},u=new W,i=new le({color:4013373,side:Ce});u.up.copy(t.up),t.translateX(f(-3,3)),t.translateZ(f(-2,2));function r(m,p){const _=new Ee(m,p),L=new Re(_,1,.08,3),v=new G(L,i);return v.castShadow=!0,u.add(v),v}const a=f(.1,.25),d=f(3,6),h=[];for(let m=0;m<d;m++){const p=new J;m>0&&p.translateZ(a*-4*m);const _=new lt(a,a*2,1,5),L=new G(_,i);if(L.translateZ(-a*2),L.rotateX(Math.PI/2),L.castShadow=!0,p.add(L),m===0){const v=L.position.clone();v.add(new x(0,0,f(a,a*1.5)));const A=v.clone(),M=v.clone();A.add(new x(f(-a*2,-a),f(a,a*2),0)),M.add(new x(f(a*2,a),f(a,a*2),0)),p.add(r(v,A)),p.add(r(v,M))}p.setRotateSpeed(.25),p.setLerpSpeed(.25),p.setOrigins(),u.add(p.get()),h.push(p)}const l=new V({increment:1,func:(m,p)=>te(Math.sin(m+p.i/d*2),-1,1,-3,3)}),g=it(["x","y"]);function s(m){for(let p=0;p<d;p++){const _=l.update(m,{i:p}),L={};L[g]=_,h[p].setTargetPosition(L),h[p].lerp(m)}}return{update:s,get:()=>u,getSpeed:()=>n,getFlocking:()=>w}}function tt(c){const{globe:e,scene:o,type:t,height:n,boundaries:w}=c,u=[];let i,r,a=new x;function d(){const s=e.getRandomVertex();i=e.getGlobePos(s),r=e.getNext(i.position),a=r.position.addScaledVector(r.normal,n)}d();const h=f(3,8);for(let s=0;s<h;s++){const m=new en({start:i,next:r,scene:o,type:t,boundaries:w});u.push(m)}function l(){r=e.getNext(r.position);const s=r.position.addScaledVector(r.normal,n);a.copy(s)}function g(s){if(!isNaN(s))for(let m=0;m<u.length;m++)u[m].update(s,u,a),u[m].didReachTarget()&&l()}return{update:g,getNewTarget:l,globeSetup:d,setTarget:s=>{a.copy(s)},getTarget:()=>a,getNext:()=>r,getFlock:()=>u}}const nn="C4",on="F3",sn=160,an="l3d_theme_17",rn=[0,2,4,5,7,9,11],cn=!1,ln=[[!0,!0,!1,!0],[!1,!1,!0,!0]],dn=[[["F3","4n"],["C4","4n"],["G3","4n"],["D4","4n"],["A3","4n"],["C4","4n"],["B3","4n"],["rest","4n"],["rest","4n"],["rest","4n"],["rest","4n"],["rest","4n"],["D4","8n"],["F3","8n"],["D4","8n"],["F3","8n"],["D4","4n"],["rest","4n"],["F3","8n"],["C4","8n"],["F3","8n"],["C4","8n"],["F3","4n"],["rest","8n"],["rest","8n"]],[["rest","2n"],["rest","2n"],["F4","2n"],["C5","4n"],["A4","4n"],["D4","2n"],["rest","4n"],["A4","4n"],["rest","4n"],["C5","4n"],["rest","4n"],["F4","4n"],["D4","2n"],["rest","4n"],["rest","4n"]]],un={instruments:{stack:[{list:["fmSynth","choir"]},{list:["piano","choir"]}],options:["choir","fmSynth","bamboo","piano","flute","guitar","strings","toms","crow_bass","choirA","choirE","choirI","choirO","choirU"],type:"stack"},beatList:{list:[4,2,8],index:0,mod:{type:{value:"range"},chance:{value:1},min:{value:0},max:{value:0,mod:{max:{value:3},chance:{value:.09999999999999999},type:{value:"walkUp"},min:{value:0,step:1},step:{value:1,step:.01},kick:{value:0,step:1}}},step:{value:1,step:.01},kick:{value:4,step:1}},type:"number-list"},double:{value:.1,step:.05,type:"number"},fxLimit:{value:0,mod:{min:{value:1},max:{value:1},step:{value:1},kick:{value:8},chance:{value:1},type:{value:"value",options:["value","range","walk","walkUp","walkDown"]}},type:"number"},fxList:{list:["distortion","bitCrush","cheby","chorus","autoFilter","autoPanner","feedback","phaser","pingPong","tremolo","vibrato"],index:0,mod:{type:{value:"range"},min:{value:0,mod:{min:{value:0,step:1},max:{value:10,step:1},step:{value:1,step:.01},kick:{value:0,step:1},chance:{value:1,step:.05},type:{value:"walk",options:["value","range","walk","walkUp","walkDown"]}}},max:{value:0,mod:{min:{value:1,step:1},max:{value:10,step:1},step:{value:1,step:.01},kick:{value:0,step:1},chance:{value:1,step:.05},type:{value:"walk",options:["value","range","walk","walkUp","walkDown"]}}},step:{value:1,step:.01},kick:{value:0,step:1},chance:{value:.25,step:.05}},type:"number-list"},slice:{type:"bundle",chance:{value:.1,step:.05,type:"number"},length:{value:1,mod:{type:{value:"range"},min:{value:1},max:{value:3,mod:{max:{value:8},type:{type:"walkUp"},min:{value:0,step:1},step:{value:1,step:.01},kick:{value:4,step:1},chance:{value:.25,step:.05}}},step:{value:1,step:.01},kick:{value:4,step:1},chance:{value:.25,step:.05}},type:"number"}},shift:{type:"bundle",chance:{value:.10000000000000002,step:.05,type:"number"},length:{value:16,mod:{min:{value:16,mod:{min:{value:8},max:{value:16},type:{value:"walkDown"},step:{value:1,step:.01},kick:{value:4,step:1},chance:{value:.25,step:.05}}},max:{value:32},type:{value:"range"},step:{value:1,step:.01},kick:{value:4,step:1},chance:{value:.25,step:.05}},type:"number"}},startIndex:{value:0,mod:{max:{value:0,mod:{min:{value:0},max:{value:8},chance:{value:.2},type:{value:"walkUp"},kick:{value:2},step:{value:1,step:.01}}},type:{value:"range"},chance:{value:1},min:{value:0,step:1},step:{value:1,step:.01},kick:{value:4,step:1}},type:"number"},startDelay:{list:[0,1,2,4,8,3,5,7],index:0,mod:{type:{value:"range"},chance:{value:1},kick:{value:4},min:{value:0},max:{value:0,mod:{min:{value:0},max:{value:12},chance:{value:.2},type:{value:"walkUp"},step:{value:1,step:.01},kick:{value:4,step:1}}},step:{value:1,step:.01}},type:"number-list"},distortion:{type:"bundle",chance:{value:.1,type:"chance"},distortion:{value:.1,step:.01,mod:{min:{value:.05},max:{value:.1},type:{value:"range"},step:{value:1,step:.01},kick:{value:0,step:1},chance:{value:.5,step:.05}},type:"number"}},bitCrush:{type:"bundle",chance:{value:.1,type:"chance"},bits:{list:[3,4,6,8,12,16],mod:{min:{value:0},max:{value:5},type:{value:"range"},chance:{value:1},step:{value:1,step:.01},kick:{value:0,step:1}},type:"number-list",index:0}}},pn=[{counts:3,loops:[{harmony:0,playBeat:4,instrument:"fmSynth",double:!1}]}],fn={tonic:nn,transpose:on,bpm:sn,title:an,scale:rn,useOctave:cn,sequence:ln,parts:dn,mods:un,startLoops:pn},re=128;let ae=1,$=960*ae,ne=540*ae;const H=new pt,Ie=new pt,ht=new Tt,ze=document.getElementById("longies");ze.appendChild(ht.dom);const Q=new Ot({antialias:!0});Q.setSize($,ne);Q.shadowMap.enabled=!0;Q.shadowMap.type=Ft;Q.setPixelRatio(window.devicePixelRatio);ze.appendChild(Q.domElement);let ge=!0;ge=!1;const mn=new $t({scene:H,debugRender:ge}),Y=new jt(75,$/ne,.1,1e3);Y.position.set(0,10,50);const hn=new It(Y,Q.domElement);let Oe=!1,gt=!1;const Fe=new Gt({scene1:H,scene2:Ie,noScene2:gt,renderer:Q,camera:Y}),we=new Wt({scene:H,worldRadius:re});H.add(we.getGlobe());Ie.add(we.getGlobe().clone());new Kt({scene1:H,scene2:Ie,worldRadius:re,w:$,h:ne,noScene2:gt});const Ge=new Vt({camera:Y}),ie=new Ht({globe:we,scene:H}),gn=new Jt({scene:H,worldRadius:re}),Le=[];for(let c=0;c<5;c++)if(st(.5)){let e=new tt({scene:H,globe:we,type:Qt,height:10,boundaries:[re,re+25]});Le.push(e)}else{let e=new tt({scene:H,globe:we,type:tn,height:0,boundaries:[re-.5,re+.5]});Le.push(e)}ie.globeSetup();const nt=ie.getStart();Y.position.copy(nt.position).addScaledVector(nt.normal,10);H.add(ie.getModel());ie.getModel().add(Ge.getGoal());Ge.getGoal().position.set(4,4,-8);mn.setPosition(ie.getModel());new Nt;let Me=null,Pe;function wt(c){Me||(Me=c),ht.update(),requestAnimationFrame(wt);const e=c-Me;Me=c,ge?Q.render(H,Y):Fe.process(),ie.update(e,fe[0]==="play"),gn.update();for(let o=0;o<Le.length;o++)Le[o].update(e/1e3);fe[1]==="play"&&Fe.update(),Oe?hn.update():ie.isLoaded()&&(Ge.update(),Pe=ie.getModel(),Y.up.copy(Pe.up),Y.lookAt(Pe.position.clone().addScaledVector(Pe.up,4)))}requestAnimationFrame(wt);function wn(c){$===960*ae?($=window.innerWidth*ae,ne=window.innerHeight*ae):($=960*ae,ne=540*ae),Y.aspect=$/ne,Y.updateProjectionMatrix(),Q.setSize($,ne),Fe.setSize($,ne)}let oe,fe=["rest"];const ot=document.getElementById("controls"),vn=document.getElementById("start"),yn=document.getElementById("back");vn.addEventListener("click",yt);yn.addEventListener("click",()=>{location.href="../index.html"});document.addEventListener("keydown",xn);function xn(c){c.code==="Comma"?oe.stop():c.code==="KeyP"&&(oe.printLoops(),oe.printParams()),c.code==="Space"&&yt(),c.code==="Enter"&&oe.stop(),c.code==="KeyF"&&vt(),c.code==="KeyC"&&(Oe=!Oe),c.code==="KeyD"&&(ge=!ge)}const bn=document.getElementById("fullscreen");bn.addEventListener("click",vt);document.addEventListener("fullscreenchange",wn);function vt(){document.fullscreenElement?document.exitFullscreen&&(document.exitFullscreen(),ot.style.display="block",ze.style.cursor="inherit"):(document.documentElement.requestFullscreen(),ot.style.display="none",ze.style.cursor="none")}function yt(){if(oe){if(oe.getStatusIsPlaying())return}else Sn()}function Sn(){oe=new xt({...fn,samplesURL:"../../doodoo/samples/",onModulate:c=>{},onNote:c=>{const e=c.loopIndex,o=c.note[0];fe[e]===void 0&&(fe[e]="rest"),o==="rest"?fe[e]="rest":o!==null&&(fe[e]="play")}}),console.log("doodoo",oe)}
