/*
	one
*/

import * as Cool from '../../cool/cool.js';
import { Game, Sprite, TextButton, TextSprite, Button } from '../../lines/src/GameEngine.js';
import { Doodoo } from '../../doodoo/src/Doodoo.js';
import Stats from 'three/addons/libs/stats.module.js';
import comp from '../compositions/longy_1.json';


// loading animation pre lines render
const title = document.getElementById('title');
function loadingAnimation() {
	let t = '~' + title.textContent + '~';
	title.textContent = t;
}
let loadingInterval = setInterval(loadingAnimation, 1000 / 12);

const isMobile = Cool.mobilecheck();
if (isMobile) document.body.classList.add('mobile');


/* this is the game part */
const gme = new Game({
	dps: 30,
	lineWidth: 1,
	// zoom: 2,
	// scale: 2,
	width: 960,
	height: 540,
	multiColor: true,
	checkRetina: true,
	// debug: true,
	// stats: true,
	suspend: true,
	events: isMobile ? ['touch'] : ['keyboard', 'mouse'],
	scenes: ['main'],
	bounds: {
		left: -1024,
		top: 1024,
		right: 1024,
		bottom: 1024,
	},
	// drawBg: '#C7C7C7', // for recording
});

gme.load({
	animations: {
		sprites: './data/sprites.json',	
	}
}, false);

const controls = document.getElementById('controls');
const startButton = document.getElementById('start');
const backButton = document.getElementById('back');

startButton.addEventListener('click', start);
backButton.addEventListener('click', () => {
	if (doodoo) {
		doodoo.stop();
		setTimeout(() => {
			location.href = '../index.html';
		}, 300);
	} else {
		location.href = '../index.html';
	}
});

const fullScreenButton = document.getElementById('fullscreen');
fullScreenButton.addEventListener('click', getFullscreen);
document.addEventListener("fullscreenchange", onWindowResize);

let doodoo, sprites = [];
let modCount = 12;

document.addEventListener('keydown', keyDown);

function keyDown(ev) {

	/* debugging */
	if (ev.code === 'Comma') doodoo.stop();
	else if (ev.code === 'KeyP') {
		doodoo.printLoops();
		doodoo.printParams();
	}

	/* key commands */
	if (ev.code === 'Space') start();
	if (ev.code === 'Enter') doodoo.stop();
	if (ev.code === 'KeyF') getFullscreen();
}

function start() {
	if (doodoo) {
		doodoo.stop();
		startDoodoo();
	} else {
		startDoodoo();
	}		
}

function startDoodoo() {
	doodoo = new Doodoo({
		...comp,
		// withRecording: true,
		withCount: modCount,
		samplesURL: '../doodoo/samples/',
		// volume: -12,
		// autoStart: false,
		onModulate: (playCount, sequenceCount) => {

			for (let i = 0; i < sprites.length; i++) {
				sprites[i].animation.stop();
			}
			
			if (modCount === sequenceCount) {
				sprites[1].isActive = false;
				sprites[2].isActive = false;
				sprites[3].isActive = false;
			}
			
		},
		onNote: params => {
			// console.log(params.loopIndex, params.note[0]);
			const index = params.loopIndex;
			const note = params.note[0];
			if (sprites[index]) {
				const sprite = sprites[index];
				if (note === 'rest') {
					sprite.animation.stop();
				} else if (note !== null) {
					sprite.animation.play();
					sprite.isActive = true;
				}
			}
		}
	});
	// console.log('doodoo', doodoo);
}

function onWindowResize(e) {
	if (document.fullscreen) {
		gme.renderer.setScale(2);
		controls.style.display = 'none';
	} else {
		gme.renderer.setScale(1);
		controls.style.display = 'block';
	}
}

function getFullscreen() {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else if (document.exitFullscreen) {
		document.exitFullscreen();
	}
}

gme.start = function() {
	// console.log('gme', gme);
	document.getElementById('splash').remove();
	clearInterval(loadingInterval);
	// gme.renderer.setScale(2);

	// const { sprites } = gme.anims;
	sprites[0] = new Sprite(0, 0, gme.anims.sprites.bg);
	// sprites[1] = new Sprite(0, 0, gme.anims.sprites.guy_1);
	sprites[1] = new Sprite(0, 0, gme.anims.sprites.circles);
	sprites[2] = new Sprite(0, 0, gme.anims.sprites.trees);
	sprites[3] = new Sprite(0, 0, gme.anims.sprites.cat_guy);
	
	for (let i = 0; i < sprites.length; i++) {
		sprites[i].isActive = false;
		gme.scenes.main.addToDisplay(sprites[i]);
	}
	
	sprites[0].isActive = true;
	gme.scenes.current = 'main';

};

gme.draw = function() {
	gme.scenes.current.display();
};