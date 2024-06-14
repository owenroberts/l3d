import{c as it,r as p,a as st,b as se,d as te,D as vt}from"./Doodoo-ghMZrfjj.js";import{C as ve,S as at,M as G,I as he,a as le,O as W,V as S,b as rt,D as Ee,c as ct,d as St,L as Ce,T as Re,U as lt,e as Ae,f as _e,B as Ie,g as xt,F as Xe,h as De,i as fe,W as bt,j as dt,k as Be,l as Mt,m as Pt,n as At,o as _t,P as zt,p as Lt,A as Et,q as Ct,r as ut,s as Rt,t as Bt,u as Tt}from"./three-Bp_Ykcir.js";import{R as qe,L as Ze,E as Ye,A as V,O as Ut,S as Dt,v as Ot,b as kt,m as ft,J,a as jt,c as It}from"./blend-CpI24EKB.js";import{c as Ft}from"./l3d_theme_17-B90w5pWU.js";function Gt(l){const{scene1:e,scene2:o,renderer:t,camera:n,noScene2:w}=l,u=new qe(e,n),i=new Ze({width:t.domElement.clientWidth,height:t.domElement.clientHeight,scene:e,camera:n,uniforms:{lineColor:{type:"vec3",value:new ve(0)},bgColor:{type:"vec3",value:new ve(13092807)},lineWidth:1,numLines:5,diffuseCutoff:{type:"float",value:40},normalCutoff:{type:"float",value:50},noiseMultiplier:{type:"float",value:10}}}),r=new Ye(t);r.addPass(u),r.addPass(i);let a,d;const h={diffuse:new V({value:40,valueClamp:[30,60],increment:1,randomRange:[-1,1],clampRange:[-3,2],count:24}),normal:new V({value:50,valueClamp:[10,100],increment:1,randomRange:[-1,1],clampRange:[-3,2],count:24}),noise:new V({value:10,valueClamp:[2,14],increment:1,randomRange:[-1,1],clampRange:[-3,2],count:24})};if(!w){const m=new qe(o,n);d=new Ze({width:t.domElement.clientWidth,height:t.domElement.clientHeight,scene:o,camera:n,uniforms:{lineColor:{type:"vec3",value:new ve(16777215)},bgColor:{type:"vec3",value:new ve(13092807)},lineWidth:1,numLines:5,diffuseCutoff:{type:"float",value:40},normalCutoff:{type:"float",value:50},noiseMultiplier:{type:"float",value:10}}});const f=new Ut;a=new Ye(t),a.renderToScreen=!1,a.addPass(m),a.addPass(d),a.addPass(f);const z=new Dt(new at({uniforms:{baseTexture:{value:null},blendTexture:{value:a.renderTarget2.texture}},vertexShader:Ot,fragmentShader:kt,defines:{}}),"baseTexture");z.needsSwap=!0,r.addPass(z)}function c(m){i.material.uniforms.diffuseCutoff.value=h.diffuse.update(),i.material.uniforms.normalCutoff.value=h.normal.update(),i.material.uniforms.noiseMultiplier.value=h.noise.update()}function g(){w||a.render(),r.render()}function s(m,f){r.setSize(m,f),a&&a.setSize(m,f)}return{process:g,update:c,setSize:s}}function Wt(l){const{worldRadius:e,scene:o}=l,t=new G(new he(e,3),new le({color:65535}));t.castShadow=!1,t.receiveShadow=!0;const n=ft(t.geometry),w=n.getAttribute("position"),u=n.getAttribute("normal"),i=e*4/Math.sqrt(10+2*Math.sqrt(5));function r(c){const g=a(c),s=it(g),m=g.filter(z=>z.index!=s.index).map(z=>z.index),f=p(a(s.position,m));if(f&&st(.5)){const z=new W;z.position.copy(s.position),z.up.copy(s.normal),z.lookAt(f.position),z.translateZ(s.position.distanceTo(f.position)/2);const E=new S().copy(s.normal).add(f.normal).divideScalar(2);return{position:z.position,normal:E}}return s}function a(c,g){const s=[];g||(g=Array.from(Array(w.count).keys()));const m=new S;for(let f=0;f<g.length;f++){const z=g[f];m.fromBufferAttribute(w,z);const E=m.distanceTo(c);E>0&&E<i/3&&s.push(d(z))}return s}function d(c){return{position:new S().fromBufferAttribute(w,c),normal:new S().fromBufferAttribute(u,c),index:c}}function h(){return se(w.count-1)}return{getNext:r,getGlobePos:d,getRandomVertex:h,getGlobe:()=>t}}function Nt(){let l=0,e=new rt;function o(){l===6&&(e.x=(e.x+p(-.1,.1)).clamp(0,2),e.y=(e.y+p(-.1,.1)).clamp(0,2),l=0),l++}return{update:o,getValue:()=>e}}function Vt(l){const{camera:e}=l;let o=new S,t=new W;function n(){o.setFromMatrixPosition(t.matrixWorld),e.position.lerp(o,.02)}return{update:n,getGoal:()=>t}}function Ht(l){const{globe:e,scene:o}=l;let t,n,w=1e6;const u=new W,i=new le({color:4013373,side:Ee});function r(){const v=e.getRandomVertex();t=e.getGlobePos(v),n=e.getNext(t.position),u.position.set(t.position.x,t.position.y,t.position.z),u.up.copy(t.normal),u.lookAt(n.position)}let a=.005;const d=.5,h=new J,c=new J,g=[],s=[],m=.6,f=.3,z=d*2.2,E=d*5,y=3,_=4,M=7;function x(){const v=new ct(d,d*2,2,5),L=new G(v,i);L.castShadow=!0,h.add(L),h.setPosition(0,z,0),h.rotateX(Math.PI*.5),h.setOrigins(),h.setLerpSpeed(2),u.add(h.get());const F=new he(d*1.5,1),T=new G(F,i);T.castShadow=!0,c.add(T),c.setPosition(0,E,d*2),c.randomRotation(),c.setOrigins(),u.add(c.get());const B=new St(d*1,d*1,3),me=new G(B,i);me.castShadow=!0;const ue=new J;ue.add(me),ue.addPosition(d*-1,d*1.5,0),ue.randomRotation(),c.add(ue.get());const ye=new J;ye.add(me.clone()),ye.addPosition(d*1,d*1.5,0),ye.randomRotation(),c.add(ye.get());for(let N=0;N<M;N++){const R=new J,K=d*.6;N===0?(R.copy(h.get().position),R.addPosition(0,d*1.2,-d*1.2),R.rotateX(-Math.PI*.2),u.add(R.get())):(R.addPosition(0,K,0),g[N-1].add(R)),R.rotateX(N*Math.PI*.02),R.add(P(new S(0,0,0),new S(0,K,0))),R.setOrigins(),R.setRotateSpeed(y),g.push(R)}for(let N=0;N<4;N++){const R=new J,K=new J,We=d*1,Ne=.2,Ve=new S(0,0,0),He=new S(0,-We,0);R.copy(h.getPosition()),R.addPosition(0,d*-.5,0),R.rotateX(Math.PI*Ne),R.setOrigins(),R.setRotateSpeed(_),R.add(P(Ve,He)),K.setPosition(0,-We,0),K.rotateX(Math.PI*-Ne*2),K.add(P(Ve,He)),K.setRotateSpeed(_),u.add(R.get()),R.add(K),s.push({joints:[R,K],phase:N*2})}const ee=d*.6;s[0].joints[0].addPosition(ee,0,ee),s[2].joints[0].addPosition(ee,0,-ee),s[1].joints[0].addPosition(-ee,0,ee),s[3].joints[0].addPosition(-ee,0,-ee),s[0].joints[0].rotateY(m),s[1].joints[0].rotateY(-m),s[2].joints[0].rotateY(-f),s[3].joints[0].rotateY(f),s.forEach(N=>N.joints.forEach(R=>R.setOrigins()))}x();function P(v,L){const F=new Ce(v,L),T=new Re(F,1,.08,3),B=new G(T,i);return B.castShadow=!0,u.add(B),B}function b(){const v=new he(p(.01,.05),1),L=new G(v,i);L.position.copy(u.position),L.quaternion.copy(u.quaternion),L.translateX(p(-.8,.8)),L.translateZ(p(1)),o.add(L)}const A={walk:{tail:new V({increment:3,randomRange:[-.1,.1],clampRange:[-.5,.5],func:v=>te(Math.sin(v),-1,1,.2,.3)}),legs:new V({increment:4,randomRange:[-.1,.1],clampRange:[-.2,.2]}),body:new V({increment:10,func:v=>te(Math.sin(v),-1,1,0,.5)})},idle:{head:new V({increment:1.25,randomRange:[-.1,.1],clampRange:[-.25,0],func:v=>te(Math.sin(v+.1),-1,1,-1,1)}),tail:new V({increment:1.25,randomRange:[-.1,.1],clampRange:[-.25,0],func:v=>te(Math.sin(v),-1,1,-1.2,1.2)})},crumbs:new V({increment:1,count:36,randomRange:[-1,1],clampRange:[-10,10],func:(v,L)=>{L.isCount&&b()}})};function C(v){const L=A.walk.tail.update(v);for(let B=1;B<g.length;B++)g[B].setTargetRotation({x:L+B*.05}),g[B].rotate(v);const F=A.walk.legs.update(v);for(let B=0;B<s.length;B++){const me=te(Math.sin(s[B].phase+F),-1,1,-2,2),ue=te(Math.sin(s[B].phase+F*2),-1,1,1.25,-1.25);s[B].joints[0].setTargetRotation({x:me}),s[B].joints[0].rotate(v),s[B].joints[1].setTargetRotation({x:ue}),s[B].joints[1].rotate(v)}const T=A.walk.body.update(v);h.setTargetPosition({y:z+T}),h.lerp(v),c.setTargetPosition({y:E-T}),c.lerp(v),A.crumbs.update(v)}function k(v){for(let L=1;L<g.length;L++)g[L].unrotate(v);for(let L=0;L<s.length;L++)s[L].joints[0].unrotate(v),s[L].joints[1].unrotate(v);h.unlerp(v)}function j(v){const L=A.idle.head.update(v);c.setTargetRotation({y:L}),c.rotate(v);const F=A.idle.tail.update(v);for(let T=1;T<g.length;T++)g[T].setTargetRotation({z:F+T*.05*Math.sign(F)}),g[T].rotate(v)}function I(v,L){if(isNaN(v))return;let F=v/1e3;if(L){C(F);const T=u.position.distanceTo(n.position);T>.1&&w-T>0?(u.translateZ(a*v),w=T):(w=1e6,u.up.copy(n.normal),n=e.getNext(n.position),u.lookAt(n.position))}else h.isAtOrigin()?j(F):k(F)}function de(v){v.code}return document.addEventListener("keydown",de),{update:I,globeSetup:r,getStart:()=>t,isLoaded:()=>!0,getModel:()=>u}}Ae.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new rt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};_e.line={uniforms:lt.merge([Ae.common,Ae.fog,Ae.line]),vertexShader:`
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
		`};class ze extends at{constructor(e){super({type:"LineMaterial",uniforms:lt.clone(_e.line.uniforms),vertexShader:_e.line.vertexShader,fragmentShader:_e.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1))}}const Ke=new Ie,Se=new S;class pt extends xt{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],o=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],t=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(t),this.setAttribute("position",new Xe(e,3)),this.setAttribute("uv",new Xe(o,2))}applyMatrix4(e){const o=this.attributes.instanceStart,t=this.attributes.instanceEnd;return o!==void 0&&(o.applyMatrix4(e),t.applyMatrix4(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let o;e instanceof Float32Array?o=e:Array.isArray(e)&&(o=new Float32Array(e));const t=new De(o,6,1);return this.setAttribute("instanceStart",new fe(t,3,0)),this.setAttribute("instanceEnd",new fe(t,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let o;e instanceof Float32Array?o=e:Array.isArray(e)&&(o=new Float32Array(e));const t=new De(o,6,1);return this.setAttribute("instanceColorStart",new fe(t,3,0)),this.setAttribute("instanceColorEnd",new fe(t,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new bt(e.geometry)),this}fromLineSegments(e){const o=e.geometry;return this.setPositions(o.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ie);const e=this.attributes.instanceStart,o=this.attributes.instanceEnd;e!==void 0&&o!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Ke.setFromBufferAttribute(o),this.boundingBox.union(Ke))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new dt),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,o=this.attributes.instanceEnd;if(e!==void 0&&o!==void 0){const t=this.boundingSphere.center;this.boundingBox.getCenter(t);let n=0;for(let w=0,u=e.count;w<u;w++)Se.fromBufferAttribute(e,w),n=Math.max(n,t.distanceToSquared(Se)),Se.fromBufferAttribute(o,w),n=Math.max(n,t.distanceToSquared(Se));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}class mt extends pt{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const o=e.length-3,t=new Float32Array(2*o);for(let n=0;n<o;n+=3)t[2*n]=e[n],t[2*n+1]=e[n+1],t[2*n+2]=e[n+2],t[2*n+3]=e[n+3],t[2*n+4]=e[n+4],t[2*n+5]=e[n+5];return super.setPositions(t),this}setColors(e){const o=e.length-3,t=new Float32Array(2*o);for(let n=0;n<o;n+=3)t[2*n]=e[n],t[2*n+1]=e[n+1],t[2*n+2]=e[n+2],t[2*n+3]=e[n+3],t[2*n+4]=e[n+4],t[2*n+5]=e[n+5];return super.setColors(t),this}fromLine(e){const o=e.geometry;return this.setPositions(o.attributes.position.array),this}}const Je=new S,$e=new S,U=new Be,D=new Be,X=new Be,Te=new S,Ue=new Mt,O=new Pt,Qe=new S,xe=new Ie,be=new dt,q=new Be;let Z,ce;function et(l,e,o){return q.set(0,0,-e,1).applyMatrix4(l.projectionMatrix),q.multiplyScalar(1/q.w),q.x=ce/o.width,q.y=ce/o.height,q.applyMatrix4(l.projectionMatrixInverse),q.multiplyScalar(1/q.w),Math.abs(Math.max(q.x,q.y))}function Xt(l,e){const o=l.matrixWorld,t=l.geometry,n=t.attributes.instanceStart,w=t.attributes.instanceEnd,u=Math.min(t.instanceCount,n.count);for(let i=0,r=u;i<r;i++){O.start.fromBufferAttribute(n,i),O.end.fromBufferAttribute(w,i),O.applyMatrix4(o);const a=new S,d=new S;Z.distanceSqToSegment(O.start,O.end,d,a),d.distanceTo(a)<ce*.5&&e.push({point:d,pointOnLine:a,distance:Z.origin.distanceTo(d),object:l,face:null,faceIndex:i,uv:null,uv1:null})}}function qt(l,e,o){const t=e.projectionMatrix,w=l.material.resolution,u=l.matrixWorld,i=l.geometry,r=i.attributes.instanceStart,a=i.attributes.instanceEnd,d=Math.min(i.instanceCount,r.count),h=-e.near;Z.at(1,X),X.w=1,X.applyMatrix4(e.matrixWorldInverse),X.applyMatrix4(t),X.multiplyScalar(1/X.w),X.x*=w.x/2,X.y*=w.y/2,X.z=0,Te.copy(X),Ue.multiplyMatrices(e.matrixWorldInverse,u);for(let c=0,g=d;c<g;c++){if(U.fromBufferAttribute(r,c),D.fromBufferAttribute(a,c),U.w=1,D.w=1,U.applyMatrix4(Ue),D.applyMatrix4(Ue),U.z>h&&D.z>h)continue;if(U.z>h){const y=U.z-D.z,_=(U.z-h)/y;U.lerp(D,_)}else if(D.z>h){const y=D.z-U.z,_=(D.z-h)/y;D.lerp(U,_)}U.applyMatrix4(t),D.applyMatrix4(t),U.multiplyScalar(1/U.w),D.multiplyScalar(1/D.w),U.x*=w.x/2,U.y*=w.y/2,D.x*=w.x/2,D.y*=w.y/2,O.start.copy(U),O.start.z=0,O.end.copy(D),O.end.z=0;const m=O.closestPointToPointParameter(Te,!0);O.at(m,Qe);const f=At.lerp(U.z,D.z,m),z=f>=-1&&f<=1,E=Te.distanceTo(Qe)<ce*.5;if(z&&E){O.start.fromBufferAttribute(r,c),O.end.fromBufferAttribute(a,c),O.start.applyMatrix4(u),O.end.applyMatrix4(u);const y=new S,_=new S;Z.distanceSqToSegment(O.start,O.end,_,y),o.push({point:_,pointOnLine:y,distance:Z.origin.distanceTo(_),object:l,face:null,faceIndex:c,uv:null,uv1:null})}}}class Zt extends G{constructor(e=new pt,o=new ze({color:Math.random()*16777215})){super(e,o),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,o=e.attributes.instanceStart,t=e.attributes.instanceEnd,n=new Float32Array(2*o.count);for(let u=0,i=0,r=o.count;u<r;u++,i+=2)Je.fromBufferAttribute(o,u),$e.fromBufferAttribute(t,u),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Je.distanceTo($e);const w=new De(n,2,1);return e.setAttribute("instanceDistanceStart",new fe(w,1,0)),e.setAttribute("instanceDistanceEnd",new fe(w,1,1)),this}raycast(e,o){const t=this.material.worldUnits,n=e.camera;n===null&&!t&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const w=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Z=e.ray;const u=this.matrixWorld,i=this.geometry,r=this.material;ce=r.linewidth+w,i.boundingSphere===null&&i.computeBoundingSphere(),be.copy(i.boundingSphere).applyMatrix4(u);let a;if(t)a=ce*.5;else{const h=Math.max(n.near,be.distanceToPoint(Z.origin));a=et(n,h,r.resolution)}if(be.radius+=a,Z.intersectsSphere(be)===!1)return;i.boundingBox===null&&i.computeBoundingBox(),xe.copy(i.boundingBox).applyMatrix4(u);let d;if(t)d=ce*.5;else{const h=Math.max(n.near,xe.distanceToPoint(Z.origin));d=et(n,h,r.resolution)}xe.expandByScalar(d),Z.intersectsBox(xe)!==!1&&(t?Xt(this,o):qt(this,n,o))}}class Yt extends Zt{constructor(e=new mt,o=new ze({color:Math.random()*16777215})){super(e,o),this.isLine2=!0,this.type="Line2"}}function Kt(l){const{scene1:e,scene2:o,worldRadius:t,w:n,h:w,noScene2:u}=l,i=new S(1,0,0);new S(0,1,0);const r=new S(0,0,1);let a=e;const d=new ze({color:16777215,linewidth:3}),h=new ze({color:16777215,linewidth:1});d.resolution.set(n,w),h.resolution.set(n,w);const c=new G(new he(t-2,4),new le);c.rotation.set(p(Math.PI),p(Math.PI),p(Math.PI)),g(c);function g(y,_=!1){const M=ft(y.geometry),x=M.getAttribute("position"),P=M.getAttribute("normal"),b=[],A=se(x.count*.6,x.count*.8);for(let C=0;C<A;C++){const k=se(x.count-1);if(b.includes(k))continue;b.push(k);const j=new S().fromBufferAttribute(x,k),I=new S().fromBufferAttribute(P,k);_&&I.negate();const de=p([1,1,1,1,2,3,4]);if(de===1&&m(j,I,5),de===2){const v=se(2,4);for(let L=0;L<v;L++)f(j,I,5)}de===3&&z(j,I),de===4&&E(j,I)}}if(!u){const y=new G(new he(t*1.25,3),new le({side:_t}));o.add(y),a=o}function s(y,_,M=d){if(p(["line","tube"])=="tube"){const P=new Ce(y,_),b=new Re(P,1,.09,3),A=new G(b);A.castShadow=!0,a.add(A)}else{const P=new mt;P.setPositions([y.x,y.y,y.z,_.x,_.y,_.z]);const b=new Yt(P,M);b.castShadow=!0,a.add(b)}}function m(y,_,M){const x=y.clone().addScaledVector(_,M);if(s(y,x),M>1){M--;const P=se(1,3);for(let b=0;b<P;b++){const A=x.clone().addScaledVector(_,p(-1,0)),C=_.clone();C.x=C.x+p(-.5,.5),C.y=C.y+p(-.5,.5),C.z=C.z+p(-.5,.5),m(A,C,M)}}}function f(y,_,M){const x=p(Math.PI*2),P=p(.2,.6),b=new W;b.position.copy(y),b.lookAt(y.clone().add(_)),b.rotateOnAxis(r,x),b.rotateOnAxis(i,P),b.translateZ(M),s(y,b.position);const A=new W;A.position.copy(b.position),A.lookAt(y),A.rotateOnAxis(r,-x),A.rotateOnAxis(i,P*2),A.translateZ(M),s(b.position,A.position),M-=p(1,2),M>1&&f(A.position,_,M)}function z(y,_){const M=p(2,4),x=new W;x.position.copy(y),x.lookAt(y.clone().add(_)),x.rotateOnAxis(r,p(Math.PI*2)),x.rotateOnAxis(i,p(.2,.6));const P=M*p(.25,1.5);for(let b=0;b<5;b++){const A=x.clone();A.translateX(b*-P/2);const C=A.clone();C.translateZ(p(2,6)),s(A.position,C.position)}}function E(y,_){const M=se(4,8),x=se(20,40),P=y.clone().addScaledVector(_,x);for(let b=0;b<M;b++){const A=new W;A.position.copy(P),A.lookAt(P.clone().add(_));const C=A.clone(),k=p(2,20),j=p(2,20),I=p(2,4);A.translateX(p(-1,1)*k),A.translateY(p(-1,1)*j),A.translateZ(p(-1,1)*I),C.translateX(p(-1,1)*k),C.translateY(p(-1,1)*j),C.translateZ(p(-1,1)*I),s(A.position,C.position,h)}}}function Jt(l){const{scene:e,worldRadius:o}=l,t=128,n=1,w=p(.2,.5),u=new zt(w,w),i=new le({side:Ee}),r=new Lt(u,i,t);r.castShadow=!1,e.add(r);const a=new W;for(let h=0;h<t;h++)p(Math.PI*2),a.position.x=Math.sin(p(Math.PI*2))*o*n,a.position.y=Math.cos(p(Math.PI*2))*o*n,a.position.z=Math.sin(p(Math.PI*2))*Math.cos(p(Math.PI*2))*o*n,a.rotation.x=p(Math.PI*2),a.rotation.y=p(Math.PI*2),a.rotation.z=p(Math.PI*2),a.updateMatrix(),r.setMatrixAt(h,a.matrix);function d(){r.rotation.x+=1e-4,r.rotation.y+=1e-4}return{update:d,get:()=>r}}function $t(l){const{scene:e,debugRender:o}=l;o&&e.add(new Et(15659007,.1));const t=new Ct(16777215,1e3);t.name="Spot Light",t.angle=1,t.penumbra=0,t.position.set(20,25,0),t.castShadow=!0,t.shadow.camera.near=8,t.shadow.camera.far=30,t.shadow.mapSize.width=1024,t.shadow.mapSize.height=1024,e.add(t);const n=new S(20,25,0),w=12;function u(i){const r=new W;r.position.copy(i.position),r.rotation.copy(i.rotation),r.up.copy(i.up),r.translateX(n.x),r.translateY(n.y),t.position.copy(r.position),t.target.position.copy(new S(0,0,0)),t.target.updateMatrixWorld();const d=r.position.clone().distanceTo(new S(0,0,0));for(let h=1;h<w;h++){const c=h/w*Math.PI*2,g=new W;g.lookAt(t.position),g.rotateX(c),g.rotateY(p(-.5,.5)),g.translateZ(d);const s=t.clone();s.position.copy(g.position),s.target.position.copy(new S(0,0,0)),s.target.updateMatrixWorld(),e.add(s)}}return{setPosition:u}}function Qt(l){const{scene:e,parent:o}=l,t=.006,n={radius:30,align:1,center:1,separation:2,seek:1,boundary:1};o.position.add(new S(p(-5,5),p(0,10),p(-5,5)));const w=new W,u=new le({color:11513775,side:Ee});function i(c,g){const s=new Ce(c,g),m=new Re(s,1,.08,3),f=new G(m,u);return f.castShadow=!0,w.add(f),f}const r=p(.5,2),a=[];for(let c=0;c<3;c++){const g=new S(0,0,0),s=new S(-r/2,0,-r),m=new S(r/2,0,-r),f=new J;f.addPosition(0,0,r*1/3*c*-1),f.add(i(g,s)),f.add(i(g,m)),f.setRotateSpeed(2),f.setOrigins(),w.add(f.get()),a.push(f)}const d=new V({increment:1,func:(c,g)=>te(Math.cos(c*(2+g.i*.1)),-1,1,-1,1)});function h(c){for(let g=0;g<3;g++){const s=d.update(c,{i:g});a[g].setTargetRotation({x:s}),a[g].rotate(c)}}return{update:h,get:()=>w,getSpeed:()=>t,getFlocking:()=>n}}function en(l){const{start:e,next:o,scene:t,type:n,boundaries:w}=l,u=new S(0,0,0),i=new W;i.position.copy(e.position),i.up.copy(e.normal),i.lookAt(o.position),t.add(i);const r=new n({scene:t,parent:i});i.add(r.get());let a=r.getSpeed(),d=r.getFlocking(),h=!1;const c=new S(0,0,0),g=new S(0,0,0),s=8*a,m=.2*a;function f(M,x){const P=new S,b=new S,A=new S;let C=0;for(let k=0;k<M.length;k++){if(i.id===M[k].getID())continue;const j=M[k].getProps(),I=i.position.distanceTo(j.position);I<d.radius&&(C++,A.add(j.position),P.add(j.velocity),b.copy(i.position).sub(j.position),b.normalize(),b.divideScalar(I),b.multiplyScalar(d.radius-I))}C>0&&(b.normalize(),b.sub(c),b.multiplyScalar(d.separation),b.multiplyScalar(s),b.clampScalar(-m,m),y(b),P.divideScalar(C),P.normalize(),P.sub(c),P.multiplyScalar(d.align),P.multiplyScalar(s),P.clampScalar(-m,m),y(P))}function z(M){const x=M.clone().sub(i.position);x.multiplyScalar(s);const P=x.sub(c);P.clampScalar(-m,m),P.multiplyScalar(d.seek),y(P)}function E(){const M=i.position.distanceTo(u);if(M<w[0]){const x=i.position.clone().sub(u);x.normalize(),x.multiplyScalar(d.boundary),x.multiplyScalar(s).sub(c),x.clampScalar(-m,m),y(x)}if(M>w[1]){const x=u.clone().sub(i.position);x.normalize(),x.multiplyScalar(d.boundary),x.multiplyScalar(s).sub(c),x.clampScalar(-m,m),y(x)}}function y(M){g.add(M)}function _(M,x,P){r.update(M),f(x),z(P),E(),c.add(g),c.clampScalar(-s,s),i.position.add(c),g.multiplyScalar(0),i.lookAt(i.position.clone().add(c)),i.position.distanceTo(P)<1&&(h=!0)}return{update:_,getObject:()=>i,getID:()=>i.id,getPosition:()=>i.position,getVelocity:()=>c,getProps:()=>({position:i.position,velocity:c}),didReachTarget:()=>h?(h=!1,!0):!1}}function tn(l){const{position:e,scene:o,parent:t}=l,n=.00125,w={radius:20,align:1,center:1,separation:.75,seek:1.5,boundary:5},u=new W,i=new le({color:4013373,side:Ee});u.up.copy(t.up),t.translateX(p(-3,3)),t.translateZ(p(-2,2));function r(m,f){const z=new Ce(m,f),E=new Re(z,1,.08,3),y=new G(E,i);return y.castShadow=!0,u.add(y),y}const a=p(.1,.25),d=p(3,6),h=[];for(let m=0;m<d;m++){const f=new J;m>0&&f.translateZ(a*-4*m);const z=new ct(a,a*2,1,5),E=new G(z,i);if(E.translateZ(-a*2),E.rotateX(Math.PI/2),E.castShadow=!0,f.add(E),m===0){const y=E.position.clone();y.add(new S(0,0,p(a,a*1.5)));const _=y.clone(),M=y.clone();_.add(new S(p(-a*2,-a),p(a,a*2),0)),M.add(new S(p(a*2,a),p(a,a*2),0)),f.add(r(y,_)),f.add(r(y,M))}f.setRotateSpeed(.25),f.setLerpSpeed(.25),f.setOrigins(),u.add(f.get()),h.push(f)}const c=new V({increment:1,func:(m,f)=>te(Math.sin(m+f.i/d*2),-1,1,-3,3)}),g=it(["x","y"]);function s(m){for(let f=0;f<d;f++){const z=c.update(m,{i:f}),E={};E[g]=z,h[f].setTargetPosition(E),h[f].lerp(m)}}return{update:s,get:()=>u,getSpeed:()=>n,getFlocking:()=>w}}function tt(l){const{globe:e,scene:o,type:t,height:n,boundaries:w}=l,u=[];let i,r,a=new S;function d(){const s=e.getRandomVertex();i=e.getGlobePos(s),r=e.getNext(i.position),a=r.position.addScaledVector(r.normal,n)}d();const h=p(3,8);for(let s=0;s<h;s++){const m=new en({start:i,next:r,scene:o,type:t,boundaries:w});u.push(m)}function c(){r=e.getNext(r.position);const s=r.position.addScaledVector(r.normal,n);a.copy(s)}function g(s){if(!isNaN(s))for(let m=0;m<u.length;m++)u[m].update(s,u,a),u[m].didReachTarget()&&c()}return{update:g,getNewTarget:c,globeSetup:d,setTarget:s=>{a.copy(s)},getTarget:()=>a,getNext:()=>r,getFlock:()=>u}}const re=128;let ae=1,$=960*ae,ne=540*ae;const H=new ut,Fe=new ut;new jt;const Oe=document.getElementById("longies"),Q=new Rt({antialias:!0});Q.setSize($,ne);Q.shadowMap.enabled=!0;Q.shadowMap.type=Bt;Q.setPixelRatio(window.devicePixelRatio);Oe.appendChild(Q.domElement);let ge=!0;ge=!1;const nn=new $t({scene:H,debugRender:ge}),Y=new Tt(75,$/ne,.1,1e3);Y.position.set(0,10,50);const on=new It(Y,Q.domElement);let ke=!1,ht=!1;const je=new Gt({scene1:H,scene2:Fe,noScene2:ht,renderer:Q,camera:Y}),we=new Wt({scene:H,worldRadius:re});H.add(we.getGlobe());Fe.add(we.getGlobe().clone());new Kt({scene1:H,scene2:Fe,worldRadius:re,w:$,h:ne,noScene2:ht});const Ge=new Vt({camera:Y}),ie=new Ht({globe:we,scene:H}),sn=new Jt({scene:H,worldRadius:re}),Le=[];for(let l=0;l<5;l++)if(st(.5)){let e=new tt({scene:H,globe:we,type:Qt,height:10,boundaries:[re,re+25]});Le.push(e)}else{let e=new tt({scene:H,globe:we,type:tn,height:0,boundaries:[re-.5,re+.5]});Le.push(e)}ie.globeSetup();const nt=ie.getStart();Y.position.copy(nt.position).addScaledVector(nt.normal,10);H.add(ie.getModel());ie.getModel().add(Ge.getGoal());Ge.getGoal().position.set(4,4,-8);nn.setPosition(ie.getModel());new Nt;let Me=null,Pe;function gt(l){Me||(Me=l),requestAnimationFrame(gt);const e=l-Me;Me=l,ge?Q.render(H,Y):je.process(),ie.update(e,pe[0]==="play"),sn.update();for(let o=0;o<Le.length;o++)Le[o].update(e/1e3);pe[1]==="play"&&je.update(),ke?on.update():ie.isLoaded()&&(Ge.update(),Pe=ie.getModel(),Y.up.copy(Pe.up),Y.lookAt(Pe.position.clone().addScaledVector(Pe.up,4)))}requestAnimationFrame(gt);function an(l){$===960*ae?($=window.innerWidth*ae,ne=window.innerHeight*ae,ot.style.display="none",Oe.style.cursor="none"):($=960*ae,ne=540*ae,ot.style.display="block",Oe.style.cursor="inherit"),Y.aspect=$/ne,Y.updateProjectionMatrix(),Q.setSize($,ne),je.setSize($,ne)}let oe,pe=["rest"];const rn=24,ot=document.getElementById("controls"),cn=document.getElementById("start"),ln=document.getElementById("back");cn.addEventListener("click",yt);ln.addEventListener("click",()=>{location.href="../index.html"});document.addEventListener("keydown",dn);function dn(l){l.code==="Comma"?oe.stop():l.code==="KeyP"&&(oe.printLoops(),oe.printParams()),l.code==="Space"&&yt(),l.code==="Enter"&&oe.stop(),l.code==="KeyF"&&wt(),l.code==="KeyC"&&(ke=!ke),l.code==="KeyD"&&(ge=!ge)}const un=document.getElementById("fullscreen");un.addEventListener("click",wt);document.addEventListener("fullscreenchange",an);function wt(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen()}function yt(){if(oe){if(oe.getStatusIsPlaying())return}else fn()}function fn(){oe=new vt({...Ft,withCount:rn,samplesURL:"../doodoo/samples/",onNote:l=>{const e=l.loopIndex,o=l.note[0];pe[e]===void 0&&(pe[e]="rest"),o==="rest"?pe[e]="rest":o!==null&&(pe[e]="play")}}),console.log("doodoo",oe)}
