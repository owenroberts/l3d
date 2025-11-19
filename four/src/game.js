/*
	four ~ choices
*/

import * as Cool from '../../cool/cool.js';
import { Game, Sprite, TextButton, TextSprite, Button, GameAnim } from '../../lines/src/Engine.js';
import { Doodoo } from '../../doodoo/src/Doodoo.js';
import { Controls } from '../../public/js/controls.js';

import Stats from 'three/addons/libs/stats.module.js';
import comp from '../compositions/choices.json';

/* this is the game part */
const gme = new Game({
	loadingMessage: "title",
	loadingSplash: "splash",
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
	events: ['touch', 'keyboard', 'mouse'],
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

let controls;
let doodoo, sprites = [];
let modCount = 16;
let spriteIndexes = Cool.shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
let indexOffset = 0;

function start() {
	if (doodoo) doodoo.stop();
	startDoodoo();
}

function stop() {
	if (doodoo) {
		doodoo.stop();
		for (let i = 0; i < sprites.length; i++) {
			sprites[i].animation.stop();
		}
	}
}

function resize() {
	if (document.fullscreen) {
		gme.renderer.setScale(2);
	} else {
		gme.renderer.setScale(1);
	}
}

function startDoodoo() {
	doodoo = new Doodoo({
		...comp,
		withCount: modCount,
		samplesURL: '../doodoo/samples/',
		onModulate: (playCount, sequenceCount) => {
			onModulate(playCount, sequenceCount);
		},
		onNote: params => { onNote(params) },
	});
	controls.addDoodoo(doodoo);
}

function onModulate(playCount, sequenceCount) {
	
	if (playCount > 0) {
		sprites[0].animation.currentFrame = (sprites[0].animation.currentFrame + 1) % 3;
	}

	for (let i = 1; i < sprites.length; i++) {
		sprites[i].animation.stop();
	}

	if (modCount === sequenceCount) {
		for (let i = 1; i < sprites.length; i++) {
			sprites[i].isActive = false;
		}
	}
}

function onNote(params) {
	const index = params.loopIndex;
	if (index === 0) return;
	const note = params.note[0];
	
	// cyle through sprites
	const spriteIndex = spriteIndexes[(index + indexOffset - 1) % (spriteIndexes.length)]; 
	const sprite = sprites[spriteIndex];
	
	if (note === 'rest') {
		sprite.animation.stop();
	} else if (note !== null) {
		// sprite.animation.play();
		// sprite.animation.currentFrame = (sprite.animation.currentFrame + 1) % sprite.animation.endFrame;
		sprite.animation.nextFrame();
		sprite.isActive = true;
	}
}

gme.start = function() {
	// console.log('gme', gme);

	controls = Controls(start, stop, doodoo, resize);

	// bg
	sprites[0] = new Sprite(0, 0, gme.anims.sprites.bg);
	sprites[0].isActive = true;
	gme.scenes.main.addToDisplay(sprites[0]);

	for (let i = 1; i <= 16; i++) {
		sprites[i] = new Sprite(0, 0, gme.anims.sprites[`gp_${i - 1}`]);
		sprites[i].isActive = false;
		sprites[i].animation.sequenceIndex = i - 1;
		sprites[i].animation.onPlayedState = function() {
			indexOffset = (indexOffset + 1) % (spriteIndexes.length);
			sprites[i].animation.stop();
		};
		gme.scenes.main.addToDisplay(sprites[i]);
	}
	
	gme.scenes.current = 'main';
};

gme.draw = function() {
	gme.scenes.current.display();
};