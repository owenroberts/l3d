import * as Cool from '../../cool/cool.js';
import { Game, Sprite, TextButton, TextSprite, Button } from '../../lines/src/GameEngine.js';
import { Doodoo } from '../../doodoo/src/Doodoo.js';
import Stats from 'three/addons/libs/stats.module.js';
import comp from '../compositions/graphy.json';

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
	location.href = '../index.html';
});

const fullScreenButton = document.getElementById('fullscreen');
fullScreenButton.addEventListener('click', getFullscreen);
document.addEventListener("fullscreenchange", onWindowResize);


let doodoo, sprites = [];
let modCount = 16;
let spriteIndexes = Cool.shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
let indexOffset = 0;

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
	if (doodoo) doodoo.stop();
	startDoodoo();
}

function startDoodoo() {
	doodoo = new Doodoo({
		...comp,
		// withRecording: true,
		withCount: modCount,
		samplesURL: '../../doodoo/samples/',
		// volume: -12,
		// autoStart: false,
		onModulate: count => {
			for (let i = 0; i < sprites.length; i++) {
				sprites[i].animation.stop();
			}
		},
		onNote: params => {
			const index = params.loopIndex;
			const note = params.note[0];
			let i;
			if (index === 0) i = index;
			if (index > 0) i = spriteIndexes[(index + indexOffset - 1) % (spriteIndexes.length)];
			
			const sprite = sprites[i];
			if (note === 'rest') {
				sprite.animation.stop();
			} else if (note !== null) {
				sprite.animation.play();
				sprite.isActive = true;
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

	sprites[0] = new Sprite(0, 0, gme.anims.sprites.bg);
	gme.scenes.main.addToDisplay(sprites[0]);

	for (let i = 1; i <= 16; i++) {
		sprites[i] = new Sprite(0, 0, gme.anims.sprites[`g4_${i}`]);
		sprites[i].isActive = false;
		const animation = sprites[i].animation;
		animation.loop = false;
		animation.createNewState('reverse', 0, animation.endFrame, -1);
		animation.state = 'default';
		animation.onPlayedState = function() {
			if (animation.stateName === 'default') {
				animation.state = 'reverse';
				animation.stop();
				animation.frame = animation.endFrame;
			} else {
				animation.state = 'default';
				animation.stop();
				animation.frame = 0;
			}
			indexOffset = (indexOffset + 1) % (spriteIndexes.length);
		};
		gme.scenes.main.addToDisplay(sprites[i]);
	}
	
	sprites[0].isActive = true;
	gme.scenes.current = 'main';
};

gme.draw = function() {
	gme.scenes.current.display();
};