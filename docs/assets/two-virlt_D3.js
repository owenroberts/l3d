import{c as Yt,d as f,a as Kt,e as at,m as N,D as ye}from"./Doodoo-DDRS58Ea.js";import{C as wt,S as Jt,M as F,I as lt,a as ft,O as G,V as y,b as $t,D as Qt,L as te,T as ee,c as ne,d as oe,e as Dt,U as ie,f as bt,g as Mt,B as Ot,h as ve,F as Et,i as Ct,j as dt,W as xe,k as se,l as zt,m as ae,n as Se,o as be,p as Me,P as Pe,q as Ae,A as ze,r as Te,s as re,t as _e,u as Re,v as Le,w as Ce}from"./three-8HCRBytU.js";import{R as It,L as Ft,E as Gt,A as E,O as je,S as Ue,v as Oe,b as Be,m as ce,J as U,a as ke,c as De}from"./BufferGeometryUtils-Cud8scOr.js";import{c as Ee}from"./l3d_theme_17-hMxEYKsb.js";import{C as Ie}from"./controls-CvS0yecC.js";function Fe(s){const{scene1:t,scene2:o,renderer:n,camera:e,noScene2:i}=s,p=new It(t,e),r=new Ft({width:n.domElement.clientWidth,height:n.domElement.clientHeight,scene:t,camera:e,uniforms:{lineColor:{type:"vec3",value:new wt(0)},bgColor:{type:"vec3",value:new wt(13092807)},lineWidth:1,numLines:5,diffuseCutoff:{type:"float",value:40},normalCutoff:{type:"float",value:50},noiseMultiplier:{type:"float",value:10}}}),c=new Gt(n);c.addPass(p),c.addPass(r);let d,x;const l={diffuse:new E({value:40,valueClamp:[30,60],increment:1,randomRange:[-1,1],clampRange:[-3,2],count:24}),normal:new E({value:50,valueClamp:[10,100],increment:1,randomRange:[-1,1],clampRange:[-3,2],count:24}),noise:new E({value:10,valueClamp:[2,14],increment:1,randomRange:[-1,1],clampRange:[-3,2],count:24})};if(!i){const h=new It(o,e);x=new Ft({width:n.domElement.clientWidth,height:n.domElement.clientHeight,scene:o,camera:e,uniforms:{lineColor:{type:"vec3",value:new wt(16777215)},bgColor:{type:"vec3",value:new wt(13092807)},lineWidth:1,numLines:5,diffuseCutoff:{type:"float",value:40},normalCutoff:{type:"float",value:50},noiseMultiplier:{type:"float",value:10}}});const b=new je;d=new Gt(n),d.renderToScreen=!1,d.addPass(h),d.addPass(x),d.addPass(b);const P=new Ue(new Jt({uniforms:{baseTexture:{value:null},blendTexture:{value:d.renderTarget2.texture}},vertexShader:Oe,fragmentShader:Be,defines:{}}),"baseTexture");P.needsSwap=!0,c.addPass(P)}function u(h){r.material.uniforms.diffuseCutoff.value=l.diffuse.update(),r.material.uniforms.normalCutoff.value=l.normal.update(),r.material.uniforms.noiseMultiplier.value=l.noise.update()}function z(){i||d.render(),c.render()}function S(h,b){c.setSize(h,b),d&&d.setSize(h,b)}return{process:z,update:u,setSize:S}}function Ge(s){const{worldRadius:t,scene:o}=s,n=new F(new lt(t,3),new ft({color:65535}));n.castShadow=!1,n.receiveShadow=!0;const e=ce(n.geometry),i=e.getAttribute("position"),p=e.getAttribute("normal"),r=t*4/Math.sqrt(10+2*Math.sqrt(5));function c(u){const z=d(u),S=Yt(z),h=z.filter(P=>P.index!=S.index).map(P=>P.index),b=f(d(S.position,h));if(b&&Kt(.5)){const P=new G;P.position.copy(S.position),P.up.copy(S.normal),P.lookAt(b.position),P.translateZ(S.position.distanceTo(b.position)/2);const j=new y().copy(S.normal).add(b.normal).divideScalar(2);return{position:P.position,normal:j}}return S}function d(u,z){const S=[];z||(z=Array.from(Array(i.count).keys()));const h=new y;for(let b=0;b<z.length;b++){const P=z[b];h.fromBufferAttribute(i,P);const j=h.distanceTo(u);j>0&&j<r/3&&S.push(x(P))}return S}function x(u){return{position:new y().fromBufferAttribute(i,u),normal:new y().fromBufferAttribute(p,u),index:u}}function l(){return at(i.count-1)}return{getNext:c,getGlobePos:x,getRandomVertex:l,getGlobe:()=>n}}function Ne(){let s=0,t=new $t;function o(){s===6&&(t.x=(t.x+f(-.1,.1)).clamp(0,2),t.y=(t.y+f(-.1,.1)).clamp(0,2),s=0),s++}return{update:o,getValue:()=>t}}function We(s){const{camera:t}=s;let o=new y,n=new G;function e(){o.setFromMatrixPosition(n.matrixWorld),t.position.lerp(o,.02)}return{update:e,getGoal:()=>n}}function de(){const s=new G;let t,o,n=0,e=.004,i=new y,p=new y,r=1e6,c=!1;function d(u,z){s.position.set(u.position.x,u.position.y,u.position.z),s.up.copy(u.normal),s.lookAt(z.position),i.copy(z.position),p.copy(z.normal)}function x(u){n++,c=!1,r=1e6,s.up.copy(p),i.copy(u.position),p.copy(u.normal),s.lookAt(i)}function l(u,z){if(!isNaN(u))if(o)o.update(u,s),o.reachedTarget()&&(c=!0);else{if(z){const S=s.position.distanceTo(i);S>.1&&r-S>0?(s.translateZ(e*u),r=S):c=!0}t&&t.update(u,z)}}return{setup:d,update:l,addAnimation:u=>{t=u},addFlock:u=>{o=u},getFlock:()=>o,setTarget:x,getTarget:()=>s,reachedNext:()=>c,getNextPosition:()=>i,getNext:()=>({position:i,normal:p}),getNextCount:()=>n,getType:()=>o?"flock":"follow"}}const K=new ft({color:4013373,side:Qt});function $(s,t,o=.08){const n=new te(s,t),e=new ee(n,1,o,3),i=new F(e,K);return i.castShadow=!0,i}function He(){const s=new G,t=.5,o=new U,n=new U,e=[],i=[],p=.6,r=.3,c=t*2.2,d=t*5,x=3,l=4,u=7;function z(){const a=new ne(t,t*2,2,5),m=new F(a,K);m.castShadow=!0,o.add(m),o.setPosition(0,c,0),o.rotateX(Math.PI*.5),o.setOrigins(),o.setLerpSpeed(2),s.add(o.get());const v=new lt(t*1.5,1),R=new F(v,K);R.castShadow=!0,n.add(R),n.setPosition(0,d,t*2),n.randomRotation(),n.setOrigins(),s.add(n.get());const w=new oe(t*1,t*1,3),M=new F(w,K);M.castShadow=!0;const T=new U;T.add(M),T.addPosition(t*-1,t*1.5,0),T.randomRotation(),n.add(T.get());const C=new U;C.add(M.clone()),C.addPosition(t*1,t*1.5,0),C.randomRotation(),n.add(C.get());for(let A=0;A<u;A++){const _=new U,O=t*.6;A===0?(_.copy(o.get().position),_.addPosition(0,t*1.2,-t*1.2),_.rotateX(-Math.PI*.2),s.add(_.get())):(_.addPosition(0,O,0),e[A-1].add(_)),_.rotateX(A*Math.PI*.02);const X=$(new y(0,0,0),new y(0,O,0));_.add(X),_.setOrigins(),_.setRotateSpeed(x),e.push(_)}for(let A=0;A<4;A++){const _=new U,O=new U,X=t*1,ht=.2,mt=new y(0,0,0),gt=new y(0,-X,0);_.copy(o.getPosition()),_.addPosition(0,t*-.5,0),_.rotateX(Math.PI*ht),_.setOrigins(),_.setRotateSpeed(l);const _t=$(mt,gt);_.add(_t),O.setPosition(0,-X,0),O.rotateX(Math.PI*-ht*2);const we=$(mt,gt);O.add(we),O.setRotateSpeed(l),s.add(_.get()),_.add(O),i.push({joints:[_,O],phase:A*2})}const L=t*.6;i[0].joints[0].addPosition(L,0,L),i[2].joints[0].addPosition(L,0,-L),i[1].joints[0].addPosition(-L,0,L),i[3].joints[0].addPosition(-L,0,-L),i[0].joints[0].rotateY(p),i[1].joints[0].rotateY(-p),i[2].joints[0].rotateY(-r),i[3].joints[0].rotateY(r),i.forEach(A=>A.joints.forEach(_=>_.setOrigins()))}z();const S={walk:{tail:E({increment:3,randomRange:[-.1,.1],clampRange:[-.5,.5],func:a=>N(Math.sin(a),-1,1,.2,.3)}),legs:E({increment:4,randomRange:[-.1,.1],clampRange:[-.2,.2]}),body:E({increment:10,func:a=>N(Math.sin(a),-1,1,0,.5)})},idle:{head:E({increment:1.25,randomRange:[-.1,.1],clampRange:[-.25,0],func:a=>N(Math.sin(a+.1),-1,1,-1,1)}),tail:E({increment:1.25,randomRange:[-.1,.1],clampRange:[-.25,0],func:a=>N(Math.sin(a),-1,1,-1.2,1.2)})}};function h(a){const m=S.walk.tail.update(a);for(let w=1;w<e.length;w++)e[w].setTargetRotation({x:m+w*.05}),e[w].rotate(a);const v=S.walk.legs.update(a);for(let w=0;w<i.length;w++){const M=N(Math.sin(i[w].phase+v),-1,1,-2,2),T=N(Math.sin(i[w].phase+v*2),-1,1,1.25,-1.25);i[w].joints[0].setTargetRotation({x:M}),i[w].joints[0].rotate(a),i[w].joints[1].setTargetRotation({x:T}),i[w].joints[1].rotate(a)}const R=S.walk.body.update(a);o.setTargetPosition({y:c+R}),o.lerp(a),n.setTargetPosition({y:d-R}),n.lerp(a)}function b(a){for(let m=1;m<e.length;m++)e[m].unrotate(a);for(let m=0;m<i.length;m++)i[m].joints[0].unrotate(a),i[m].joints[1].unrotate(a);o.unlerp(a)}function P(a){const m=S.idle.head.update(a);n.setTargetRotation({y:m}),n.rotate(a);const v=S.idle.tail.update(a);for(let R=1;R<e.length;R++)e[R].setTargetRotation({z:v+R*.05*Math.sign(v)}),e[R].rotate(a)}function j(a,m){let v=a/1e3;m?h(v):o.isAtOrigin()?P(v):b(v)}function g(a){a.code}return document.addEventListener("keydown",g),{update:j,getModel:()=>s}}function Ve(){const s=new G,t=.75,o=t*1.75,n=20,e=new U,i=new U,p=[],r=[];function c(){const h=new Dt(t,t*.75,t*3,5),b=new F(h,K);e.add(b),b.castShadow=!0,e.setPosition(0,o,-t),e.rotateX(Math.PI*.5),e.setOrigins(),e.setLerpSpeed(2),s.add(e.get());const P=new Dt(t*.75,t*.5,t,5),j=new F(P,K);j.castShadow=!0,i.add(j),i.setPosition(0,o,t*1.5),i.rotateX(Math.PI*-.5),i.rotateZ(f(-Math.PI*.125,Math.PI*.125)),i.rotateY(f(-Math.PI*.125,Math.PI*.125)),i.setOrigins(),s.add(i.get());const g=new lt(t*.125,0),a=new F(g,K);a.castShadow=!0;const m=new U;m.add(a),m.randomRotation(),m.addPosition(f(.125,.25),-t*.5,f(-.25,.25)),i.add(m.get());const v=new U;v.add(a.clone()),v.randomRotation(),v.addPosition(f(.125,.25)*-1,-t*.5,f(-.25,.25)),i.add(v.get());const R=new oe(t*.4,t*.4,3),w=new F(R,K);w.castShadow=!0;const M=new U;M.add(w),M.rotateZ(f(Math.PI*-.25,Math.PI*.25)),M.rotateX(f(Math.PI*-.25,Math.PI*.25)),M.addPosition(t*.5,0,t*.5),i.add(M.get());const T=new U;T.add(w.clone()),T.rotateZ(f(Math.PI*-.25,Math.PI*.25)),T.rotateX(f(Math.PI*-.25,Math.PI*.25)),T.addPosition(t*-.5,0,t*.5),i.add(T.get());for(let L=0;L<n;L++){const A=new U,_=t*.1;L===0?(A.copy(e.get().position),A.addPosition(0,t*.75,-t*1.2),A.rotateX(-Math.PI*.005),A.rotateY(-Math.PI*.05),s.add(A.get())):(A.addPosition(0,_,0),p[L-1].add(A)),A.rotateX(L*Math.PI*.01),A.rotateZ(L*Math.PI*.02);const O=$(new y(0,0,0),new y(0,_,0),.04);A.add(O),A.setOrigins(),p.push(A)}for(let L=0;L<4;L++){const A=new U,_=new U,O=t*1,X=new y(0,0,0),ht=new y(0,-O,0),mt=new y(0,-O*.25,0);A.copy(e.getPosition()),A.addPosition(0,t*-.5,0),A.setOrigins();const gt=$(X,ht);A.add(gt),_.setPosition(0,-O,0),_.rotateX(Math.PI*-.5);const _t=$(X,mt);_.add(_t),s.add(A.get()),A.add(_),r.push({joint:A,phase:L*2})}const C=t*.6;r[0].joint.addPosition(C,0,C),r[2].joint.addPosition(C,0,-C),r[1].joint.addPosition(-C,0,C),r[3].joint.addPosition(-C,0,-C),r.forEach(L=>L.joint.setOrigins())}c();const d={walk:{tail:E({increment:10,func:h=>N(Math.sin(h),-1,1,-.1,0)}),head:E({increment:10,func:h=>N(Math.sin(h),-1,1,-.25,.25)}),legs:E({increment:5}),body:E({increment:10,func:h=>N(Math.sin(h),-1,1,-.125,.125)})},idle:{head:E({increment:1,func:h=>N(Math.sin(h),-1,1,-.5,.5)}),tail:E({increment:1,func:h=>N(Math.sin(h),-1,1,.1,.5)})}};function x(h){const b=d.idle.head.update(h);i.setTargetRotation({z:b}),i.rotate(h);const P=d.idle.tail.update(h);for(let j=1;j<p.length;j++)p[j].setTargetRotation({z:P+j*.05*Math.sign(P)}),p[j].rotate(h)}function l(h){for(let b=1;b<p.length;b++)p[b].unrotate(h);for(let b=0;b<r.length;b++)r[b].joint.unrotate(h),r[b].joint.unrotate(h);e.unlerp(h)}function u(h){const b=d.walk.legs.update(h);for(let a=0;a<r.length;a++){const m=N(Math.sin(r[a].phase+b),-1,1,-2,1.5);r[a].joint.setTargetRotation({x:m}),r[a].joint.rotate(h)}const P=d.walk.head.update(h);i.setTargetRotation({z:P}),i.rotate(h);const j=d.walk.tail.update(h);for(let a=1;a<p.length;a++)p[a].setTargetRotation({y:j+a*.005*Math.sign(j)}),p[a].rotate(h);const g=d.walk.body.update(h);e.setTargetPosition({y:o+g}),e.lerp(h),i.setTargetPosition({y:o-g})}function z(h,b){let P=h/1e3;b?u(P):e.isAtOrigin()?x(P):l(P)}function S(h){h.code}return document.addEventListener("keydown",S),{update:z,getModel:()=>s}}function Xe(s){let t;function o(p){t=p}function n(){const p=new lt(f(.01,.05),1),r=new F(p,K);r.position.copy(t.position),r.quaternion.copy(t.quaternion),r.translateX(f(-.8,.8)),r.translateZ(f(1)),s.add(r)}const e=E({increment:1,count:36,randomRange:[-1,1],clampRange:[-10,10],func:(p,r)=>{r.isCount&&n()}});function i(p,r){if(!r)return;const c=p/1e3;e.update(c)}return{update:i,setTarget:o}}bt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new $t(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Mt.line={uniforms:ie.merge([bt.common,bt.fog,bt.line]),vertexShader:`
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
		`};class Pt extends Jt{constructor(t){super({type:"LineMaterial",uniforms:ie.clone(Mt.line.uniforms),vertexShader:Mt.line.vertexShader,fragmentShader:Mt.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1))}}const Nt=new Ot,yt=new y;class le extends ve{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],o=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new Et(t,3)),this.setAttribute("uv",new Et(o,2))}applyMatrix4(t){const o=this.attributes.instanceStart,n=this.attributes.instanceEnd;return o!==void 0&&(o.applyMatrix4(t),n.applyMatrix4(t),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let o;t instanceof Float32Array?o=t:Array.isArray(t)&&(o=new Float32Array(t));const n=new Ct(o,6,1);return this.setAttribute("instanceStart",new dt(n,3,0)),this.setAttribute("instanceEnd",new dt(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let o;t instanceof Float32Array?o=t:Array.isArray(t)&&(o=new Float32Array(t));const n=new Ct(o,6,1);return this.setAttribute("instanceColorStart",new dt(n,3,0)),this.setAttribute("instanceColorEnd",new dt(n,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new xe(t.geometry)),this}fromLineSegments(t){const o=t.geometry;return this.setPositions(o.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ot);const t=this.attributes.instanceStart,o=this.attributes.instanceEnd;t!==void 0&&o!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Nt.setFromBufferAttribute(o),this.boundingBox.union(Nt))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new se),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,o=this.attributes.instanceEnd;if(t!==void 0&&o!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let e=0;for(let i=0,p=t.count;i<p;i++)yt.fromBufferAttribute(t,i),e=Math.max(e,n.distanceToSquared(yt)),yt.fromBufferAttribute(o,i),e=Math.max(e,n.distanceToSquared(yt));this.boundingSphere.radius=Math.sqrt(e),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}class ue extends le{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(t){const o=t.length-3,n=new Float32Array(2*o);for(let e=0;e<o;e+=3)n[2*e]=t[e],n[2*e+1]=t[e+1],n[2*e+2]=t[e+2],n[2*e+3]=t[e+3],n[2*e+4]=t[e+4],n[2*e+5]=t[e+5];return super.setPositions(n),this}setColors(t){const o=t.length-3,n=new Float32Array(2*o);for(let e=0;e<o;e+=3)n[2*e]=t[e],n[2*e+1]=t[e+1],n[2*e+2]=t[e+2],n[2*e+3]=t[e+3],n[2*e+4]=t[e+4],n[2*e+5]=t[e+5];return super.setColors(n),this}fromLine(t){const o=t.geometry;return this.setPositions(o.attributes.position.array),this}}const Wt=new y,Ht=new y,B=new zt,k=new zt,Z=new zt,Rt=new y,Lt=new ae,D=new Se,Vt=new y,vt=new Ot,xt=new se,q=new zt;let Y,ct;function Xt(s,t,o){return q.set(0,0,-t,1).applyMatrix4(s.projectionMatrix),q.multiplyScalar(1/q.w),q.x=ct/o.width,q.y=ct/o.height,q.applyMatrix4(s.projectionMatrixInverse),q.multiplyScalar(1/q.w),Math.abs(Math.max(q.x,q.y))}function Ze(s,t){const o=s.matrixWorld,n=s.geometry,e=n.attributes.instanceStart,i=n.attributes.instanceEnd,p=Math.min(n.instanceCount,e.count);for(let r=0,c=p;r<c;r++){D.start.fromBufferAttribute(e,r),D.end.fromBufferAttribute(i,r),D.applyMatrix4(o);const d=new y,x=new y;Y.distanceSqToSegment(D.start,D.end,x,d),x.distanceTo(d)<ct*.5&&t.push({point:x,pointOnLine:d,distance:Y.origin.distanceTo(x),object:s,face:null,faceIndex:r,uv:null,uv1:null})}}function qe(s,t,o){const n=t.projectionMatrix,i=s.material.resolution,p=s.matrixWorld,r=s.geometry,c=r.attributes.instanceStart,d=r.attributes.instanceEnd,x=Math.min(r.instanceCount,c.count),l=-t.near;Y.at(1,Z),Z.w=1,Z.applyMatrix4(t.matrixWorldInverse),Z.applyMatrix4(n),Z.multiplyScalar(1/Z.w),Z.x*=i.x/2,Z.y*=i.y/2,Z.z=0,Rt.copy(Z),Lt.multiplyMatrices(t.matrixWorldInverse,p);for(let u=0,z=x;u<z;u++){if(B.fromBufferAttribute(c,u),k.fromBufferAttribute(d,u),B.w=1,k.w=1,B.applyMatrix4(Lt),k.applyMatrix4(Lt),B.z>l&&k.z>l)continue;if(B.z>l){const g=B.z-k.z,a=(B.z-l)/g;B.lerp(k,a)}else if(k.z>l){const g=k.z-B.z,a=(k.z-l)/g;k.lerp(B,a)}B.applyMatrix4(n),k.applyMatrix4(n),B.multiplyScalar(1/B.w),k.multiplyScalar(1/k.w),B.x*=i.x/2,B.y*=i.y/2,k.x*=i.x/2,k.y*=i.y/2,D.start.copy(B),D.start.z=0,D.end.copy(k),D.end.z=0;const h=D.closestPointToPointParameter(Rt,!0);D.at(h,Vt);const b=be.lerp(B.z,k.z,h),P=b>=-1&&b<=1,j=Rt.distanceTo(Vt)<ct*.5;if(P&&j){D.start.fromBufferAttribute(c,u),D.end.fromBufferAttribute(d,u),D.start.applyMatrix4(p),D.end.applyMatrix4(p);const g=new y,a=new y;Y.distanceSqToSegment(D.start,D.end,a,g),o.push({point:a,pointOnLine:g,distance:Y.origin.distanceTo(a),object:s,face:null,faceIndex:u,uv:null,uv1:null})}}}class Ye extends F{constructor(t=new le,o=new Pt({color:Math.random()*16777215})){super(t,o),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,o=t.attributes.instanceStart,n=t.attributes.instanceEnd,e=new Float32Array(2*o.count);for(let p=0,r=0,c=o.count;p<c;p++,r+=2)Wt.fromBufferAttribute(o,p),Ht.fromBufferAttribute(n,p),e[r]=r===0?0:e[r-1],e[r+1]=e[r]+Wt.distanceTo(Ht);const i=new Ct(e,2,1);return t.setAttribute("instanceDistanceStart",new dt(i,1,0)),t.setAttribute("instanceDistanceEnd",new dt(i,1,1)),this}raycast(t,o){const n=this.material.worldUnits,e=t.camera;e===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const i=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Y=t.ray;const p=this.matrixWorld,r=this.geometry,c=this.material;ct=c.linewidth+i,r.boundingSphere===null&&r.computeBoundingSphere(),xt.copy(r.boundingSphere).applyMatrix4(p);let d;if(n)d=ct*.5;else{const l=Math.max(e.near,xt.distanceToPoint(Y.origin));d=Xt(e,l,c.resolution)}if(xt.radius+=d,Y.intersectsSphere(xt)===!1)return;r.boundingBox===null&&r.computeBoundingBox(),vt.copy(r.boundingBox).applyMatrix4(p);let x;if(n)x=ct*.5;else{const l=Math.max(e.near,vt.distanceToPoint(Y.origin));x=Xt(e,l,c.resolution)}vt.expandByScalar(x),Y.intersectsBox(vt)!==!1&&(n?Ze(this,o):qe(this,e,o))}}class Ke extends Ye{constructor(t=new ue,o=new Pt({color:Math.random()*16777215})){super(t,o),this.isLine2=!0,this.type="Line2"}}function Je(s){const{scene1:t,scene2:o,worldRadius:n,w:e,h:i,noScene2:p}=s,r=new y(1,0,0);new y(0,1,0);const c=new y(0,0,1);let d=t;const x=new Pt({color:16777215,linewidth:3}),l=new Pt({color:16777215,linewidth:1});x.resolution.set(e,i),l.resolution.set(e,i);const u=new F(new lt(n-2,4),new ft);u.rotation.set(f(Math.PI),f(Math.PI),f(Math.PI)),z(u);function z(g,a=!1){const m=ce(g.geometry),v=m.getAttribute("position"),R=m.getAttribute("normal"),w=[],M=at(v.count*.6,v.count*.8);for(let T=0;T<M;T++){const C=at(v.count-1);if(w.includes(C))continue;w.push(C);const L=new y().fromBufferAttribute(v,C),A=new y().fromBufferAttribute(R,C);a&&A.negate();const _=f([1,1,1,1,2,3,4]);if(_===1&&h(L,A,5),_===2){const O=at(2,4);for(let X=0;X<O;X++)b(L,A,5)}_===3&&P(L,A),_===4&&j(L,A)}}if(!p){const g=new F(new lt(n*1.25,3),new ft({side:Me}));o.add(g),d=o}function S(g,a,m=x){if(f(["line","tube"])=="tube"){const R=new te(g,a),w=new ee(R,1,.09,3),M=new F(w);M.castShadow=!0,d.add(M)}else{const R=new ue;R.setPositions([g.x,g.y,g.z,a.x,a.y,a.z]);const w=new Ke(R,m);w.castShadow=!0,d.add(w)}}function h(g,a,m){const v=g.clone().addScaledVector(a,m);if(S(g,v),m>1){m--;const R=at(1,3);for(let w=0;w<R;w++){const M=v.clone().addScaledVector(a,f(-1,0)),T=a.clone();T.x=T.x+f(-.5,.5),T.y=T.y+f(-.5,.5),T.z=T.z+f(-.5,.5),h(M,T,m)}}}function b(g,a,m){const v=f(Math.PI*2),R=f(.2,.6),w=new G;w.position.copy(g),w.lookAt(g.clone().add(a)),w.rotateOnAxis(c,v),w.rotateOnAxis(r,R),w.translateZ(m),S(g,w.position);const M=new G;M.position.copy(w.position),M.lookAt(g),M.rotateOnAxis(c,-v),M.rotateOnAxis(r,R*2),M.translateZ(m),S(w.position,M.position),m-=f(1,2),m>1&&b(M.position,a,m)}function P(g,a){const m=f(2,4),v=new G;v.position.copy(g),v.lookAt(g.clone().add(a)),v.rotateOnAxis(c,f(Math.PI*2)),v.rotateOnAxis(r,f(.2,.6));const R=m*f(.25,1.5);for(let w=0;w<5;w++){const M=v.clone();M.translateX(w*-R/2);const T=M.clone();T.translateZ(f(2,6)),S(M.position,T.position)}}function j(g,a){const m=at(4,8),v=at(20,40),R=g.clone().addScaledVector(a,v);for(let w=0;w<m;w++){const M=new G;M.position.copy(R),M.lookAt(R.clone().add(a));const T=M.clone(),C=f(2,20),L=f(2,20),A=f(2,4);M.translateX(f(-1,1)*C),M.translateY(f(-1,1)*L),M.translateZ(f(-1,1)*A),T.translateX(f(-1,1)*C),T.translateY(f(-1,1)*L),T.translateZ(f(-1,1)*A),S(M.position,T.position,l)}}}function $e(s){const{scene:t,worldRadius:o}=s,n=128,e=1,i=f(.2,.5),p=new Pe(i,i),r=new ft({side:Qt}),c=new Ae(p,r,n);c.castShadow=!1,t.add(c);const d=new G;for(let l=0;l<n;l++)f(Math.PI*2),d.position.x=Math.sin(f(Math.PI*2))*o*e,d.position.y=Math.cos(f(Math.PI*2))*o*e,d.position.z=Math.sin(f(Math.PI*2))*Math.cos(f(Math.PI*2))*o*e,d.rotation.x=f(Math.PI*2),d.rotation.y=f(Math.PI*2),d.rotation.z=f(Math.PI*2),d.updateMatrix(),c.setMatrixAt(l,d.matrix);function x(){c.rotation.x+=1e-4,c.rotation.y+=1e-4}return{update:x,get:()=>c}}function Qe(s){const{scene:t,debugRender:o}=s;o&&t.add(new ze(15659007,.1));const n=new Te(16777215,1e3);n.name="Spot Light",n.angle=1,n.penumbra=0,n.position.set(20,25,0),n.castShadow=!0,n.shadow.camera.near=8,n.shadow.camera.far=30,n.shadow.mapSize.width=1024,n.shadow.mapSize.height=1024,t.add(n);const e=new y(20,25,0),i=12;function p(r){const c=new G;c.position.copy(r.position),c.rotation.copy(r.rotation),c.up.copy(r.up),c.translateX(e.x),c.translateY(e.y),n.position.copy(c.position),n.target.position.copy(new y(0,0,0)),n.target.updateMatrixWorld();const x=c.position.clone().distanceTo(new y(0,0,0));for(let l=1;l<i;l++){const u=l/i*Math.PI*2,z=new G;z.lookAt(n.position),z.rotateX(u),z.rotateY(f(-.5,.5)),z.translateZ(x);const S=n.clone();S.position.copy(z.position),S.target.position.copy(new y(0,0,0)),S.target.updateMatrixWorld(),t.add(S)}}return{setPosition:p}}function tn(){const t={radius:30,align:1,center:1,separation:2,seek:1,boundary:1},o=new G,n=f(.5,2),e=[];for(let r=0;r<3;r++){const c=new y(0,0,0),d=new y(-n/2,0,-n),x=new y(n/2,0,-n),l=new U;l.addPosition(0,0,n*1/3*r*-1);const u=$(c,d),z=$(c,x);l.add(u),l.add(z),l.setRotateSpeed(2),l.setOrigins(),o.add(l.get()),e.push(l)}const i=new E({increment:1,func:(r,c)=>N(Math.cos(r*(2+c.i*.1)),-1,1,-1,1)});function p(r){for(let c=0;c<3;c++){const d=i.update(r,{i:c});e[c].setTargetRotation({x:d}),e[c].rotate(r)}}return{update:p,get:()=>o,getSpeed:()=>.006,getFlocking:()=>t}}function en(s){const{type:t,boundaries:o}=s,n=new y(0,0,0),e=new G,i=new t;e.add(i.get());let p=i.getSpeed(),r=i.getFlocking(),c=!1;const d=new y(0,0,0),x=new y(0,0,0),l=8*p,u=.2*p;function z(g,a){e.position.copy(g.position),e.up.copy(g.normal),e.lookAt(a.position),t.name==="Bird"&&e.position.add(new y(f(-5,5),f(0,10),f(-5,5))),t.name==="Worm"&&(e.translateX(f(-3,3)),e.translateZ(f(-2,2)),i.get().up.copy(e.up),i.setup(e.position))}function S(g,a){const m=new y,v=new y,R=new y;let w=0;for(let M=0;M<g.length;M++){if(e.id===g[M].getID())continue;const T=g[M].getProps(),C=e.position.distanceTo(T.position);C<r.radius&&(w++,R.add(T.position),m.add(T.velocity),v.copy(e.position).sub(T.position),v.normalize(),v.divideScalar(C),v.multiplyScalar(r.radius-C))}w>0&&(v.normalize(),v.sub(d),v.multiplyScalar(r.separation),v.multiplyScalar(l),v.clampScalar(-u,u),P(v),m.divideScalar(w),m.normalize(),m.sub(d),m.multiplyScalar(r.align),m.multiplyScalar(l),m.clampScalar(-u,u),P(m))}function h(g){const a=g.position.clone().sub(e.position);a.multiplyScalar(l);const m=a.sub(d);m.clampScalar(-u,u),m.multiplyScalar(r.seek),P(m)}function b(){const g=e.position.distanceTo(n);if(g<o[0]){const a=e.position.clone().sub(n);a.normalize(),a.multiplyScalar(r.boundary),a.multiplyScalar(l).sub(d),a.clampScalar(-u,u),P(a)}if(g>o[1]){const a=n.clone().sub(e.position);a.normalize(),a.multiplyScalar(r.boundary),a.multiplyScalar(l).sub(d),a.clampScalar(-u,u),P(a)}}function P(g){x.add(g)}function j(g,a,m){i.update(g),S(a),h(m),b(),d.add(x),d.clampScalar(-l,l),e.position.add(d),x.multiplyScalar(0),e.lookAt(e.position.clone().add(d)),e.position.distanceTo(m.position)<1&&(c=!0)}return{setup:z,update:j,getObject:()=>e,getID:()=>e.id,getPosition:()=>e.position,getVelocity:()=>d,getProps:()=>({position:e.position,velocity:d}),reachedTarget:()=>c?(c=!1,!0):!1}}function Zt(s){const{type:t,height:o,boundaries:n}=s;let e=!1;const i=[],p=f(3,8);for(let c=0;c<p;c++){const d=new en({type:t,boundaries:n});i.push(d)}function r(c,d){let x=c/1e3;for(let l=0;l<i.length;l++)i[l].update(x,i,d),i[l].reachedTarget()&&(e=!0)}return{update:r,getMembers:()=>i,reachedTarget:()=>e?(e=!1,!0):!1}}function nn(){const t={radius:20,align:1,center:1,separation:.75,seek:1.5,boundary:5},o=new G,n=Yt(["x","y"]),e=f(.01,.05),i=f(3,6),p=[];function r(x){for(let l=0;l<i;l++){const u=new U;l>0&&u.translateZ(e*-4*l);const z=new ne(e,e*2,1,5),S=new F(z,K);if(S.translateZ(-e*2),S.rotateX(Math.PI/2),S.castShadow=!0,u.add(S),l===0){const h=S.position.clone();h.add(new y(0,0,f(e,e*1.5)));const b=h.clone(),P=h.clone();b.add(new y(f(-e*2,-e),f(e,e*2),0)),P.add(new y(f(e*2,e),f(e,e*2),0)),u.add($(h,b)),u.add($(h,P))}u.setRotateSpeed(.25),u.setLerpSpeed(.25),u.setOrigins(),o.add(u.get()),p.push(u)}}const c=new E({increment:1,func:(x,l)=>N(Math.sin(x+l.i/i*2),-1,1,-3,3)});function d(x){for(let l=0;l<i;l++){const u=c.update(x,{i:l}),z={};z[n]=u,p[l].setTargetPosition(z),p[l].lerp(x)}}return{setup:r,update:d,get:()=>o,getSpeed:()=>.00125,getFlocking:()=>t}}const it=128;let rt=1,Q=960*rt,ot=540*rt;const W=new re,Bt=new re;new ke;const jt=document.getElementById("longies"),nt=new _e({antialias:!0});nt.setSize(Q,ot);nt.shadowMap.enabled=!0;nt.shadowMap.type=Re;nt.setPixelRatio(window.devicePixelRatio);jt.appendChild(nt.domElement);const qt=new Le;let pt=!0;pt=!1;const on=new Qe({scene:W,debugRender:pt}),I=new Ce(75,Q/ot,.1,1e3);I.position.set(0,10,50);const Tt=new De(I,nt.domElement);Tt.minDistance=it+5;Tt.maxDistance=1100;let Ut=!1,fe=!1;const kt=new Fe({scene1:W,scene2:Bt,noScene2:fe,renderer:nt,camera:I}),st=new Ge({scene:W,worldRadius:it});W.add(st.getGlobe());Bt.add(st.getGlobe().clone());new Je({scene1:W,scene2:Bt,worldRadius:it,w:Q,h:ot,noScene2:fe});const pe=new We({camera:I}),V=de(),he=Xe(W);W.add(V.getTarget());V.addAnimation(he);he.setTarget(V.getTarget());const At=st.getGlobePos(st.getRandomVertex());V.setup(At,st.getNext(At.position));const sn=new $e({scene:W,worldRadius:it}),H=[];let tt=V.getTarget();const ut=pe.getGoal();I.position.copy(At.position).addScaledVector(At.normal,150);tt.add(ut);const me=new y(0,4,-8);ut.position.copy(me);on.setPosition(tt);new Ne;let St=null;I.up.copy(tt.up);I.lookAt(tt.position.clone().addScaledVector(tt.up,4));function an(){if(pe.update(),tt=V.getTarget(),I.up.copy(tt.up),I.lookAt(tt.position.clone().addScaledVector(tt.up,4)),Kt(.1)&&et.isPlaying()){const s=f(-1,1);ut.translateZ(s),ut.position.z=Math.min(me.z,ut.position.z)}}function rn(s){V.update(s,J[0]==="play"),V.reachedNext()&&V.setTarget(st.getNext(V.getNextPosition())),sn.update();for(let t=H.length-1;t>=0;t--)H[t].update(s,J[Math.min(t,J.length-1)]==="play"),H[t].reachedNext()&&H[t].setTarget(st.getNext(H[t].getNextPosition())),H[t].getNextCount()>1&&(I.updateMatrix(),I.updateMatrixWorld(),qt.setFromProjectionMatrix(new ae().multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse)),qt.containsPoint(H[t].getTarget().position)||(H[t].getType()==="flock"?H[t].getFlock().getMembers().forEach(o=>{W.remove(o.getObject())}):W.remove(H[t].getTarget()),H.splice(t,1)));J[1]==="play"&&kt.update()}function cn(){let s=de();W.add(s.getTarget());const t=V.getNext(),o=st.getNext(t.position);s.setup(o,t),H.push(s);const n=f(["cat","birds","worms","pig"]);if(n==="cat"){let e=He();s.addAnimation(e),s.getTarget().add(e.getModel())}if(n==="pig"){let e=Ve();s.addAnimation(e),s.getTarget().add(e.getModel())}if(n==="birds"){let e=new Zt({type:tn,height:10,boundaries:[it,it+25]});e.getMembers().forEach(i=>{W.add(i.getObject()),i.setup(o,t)}),s.addFlock(e)}if(n==="worms"){let e=new Zt({type:nn,height:1,boundaries:[it,it+1]});e.getMembers().forEach(i=>{W.add(i.getObject()),i.setup(o,t)}),s.addFlock(e)}}function dn(s){const t=s.loopIndex,o=s.note[0];J[t]===void 0&&(J[t]="rest"),o==="rest"?J[t]="rest":o!==null&&(J[t]="play")}function ln(s,t){t%1===0&&t>0&&cn()}function ge(s){St||(St=s),requestAnimationFrame(ge);const t=s-St;St=s,pt?nt.render(W,I):kt.process(),rn(t),Ut?Tt.update():et&&an()}requestAnimationFrame(ge);let et,J=["rest"];const un=8;function fn(){if(et){if(et.isPlaying())return}else hn()}function pn(){et&&et.stop();for(let s=0;s<J.length;s++)J[s]="rest"}function hn(){et=new ye({...Ee,withCount:un,samplesURL:"../doodoo/samples/",onNote:s=>{dn(s)},onModulate:(s,t)=>{ln(s,t)}}),Tt.addDoodoo(et)}function mn(){Q===960*rt?(Q=window.innerWidth*rt,ot=window.innerHeight*rt,jt.style.cursor="none"):(Q=960*rt,ot=540*rt,jt.style.cursor="inherit"),I.aspect=Q/ot,I.updateProjectionMatrix(),nt.setSize(Q,ot),kt.setSize(Q,ot)}Ie(fn,pn,et,mn);document.addEventListener("keydown",gn);function gn(s){s.code==="KeyC"&&(Ut=!Ut),s.code==="KeyD"&&(pt=!pt)}
