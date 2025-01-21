/*
	one ~ i dont think i think i dont
*/

import * as Cool from '../../cool/cool.js';
import { Game, Sprite, TextButton, TextSprite, Button } from '../../lines/src/Engine.js';
import { Animator } from '../../lines/src/Lines.js';
import { Doodoo } from '../../doodoo/src/Doodoo.js';
import { getMidiDelta } from '../../doodoo/src/Midi.js';
import { Controls } from '../../public/js/controls.js'; 
import Stats from 'three/addons/libs/stats.module.js';
import comp from '../compositions/longy_1.json';

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
	stats: true,
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
let doodoo, sprites = [], animators = [];
let modCount = 12;
let notePrev = [];

function start() {
	if (doodoo) {
		doodoo.stop();
		startDoodoo();
	} else {
		startDoodoo();
	}		
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
		// withRecording: true,
		withCount: modCount,
		samplesURL: '../doodoo/samples/',
		// volume: -12,
		// autoStart: false,
		onModulate: (playCount, sequenceCount) => {
			onModulate(playCount, sequenceCount);
		},
		onNote: params => { onNote(params) },
	});
	controls.addDoodoo(doodoo);
}

function onNote(params) {
	const index = params.loopIndex;
	const note = params.note[0];
	// console.log(index, note);
	
	if (sprites[index]) {
		const sprite = sprites[index];
		if (note === 'rest') {
			sprite.animation.stop();
		} else if (note !== null) {

			if (index < 2) {
				sprite.animation.play();
				sprite.isActive = true;
			} else {
				const rIndex = Cool.randomInt(0, sprites[index].animation.layers.length - 1);
				const rLayer = sprites[index].animation.layers[rIndex];
				rLayer.isVisible = !rLayer.isVisible;
				if (Cool.coinFlip()) animators[index].update();
			}
		}
	}
}

function onModulate(playCount, sequenceCount) {
	for (let i = 0; i < sprites.length; i++) {
		sprites[i].animation.stop();
	}
	
	if (modCount === sequenceCount) {
		sprites[1].isActive = false;
		sprites[2].isActive = false;
		sprites[3].isActive = false;
	}
}

gme.start = function() {
	// console.log('gme', gme);

	controls = Controls(start, stop, doodoo, resize);


	// const { sprites } = gme.anims;
	sprites[0] = new Sprite(0, 0, gme.anims.sprites.bg);
	// sprites[1] = new Sprite(0, 0, gme.anims.sprites.guy_1);
	sprites[1] = new Sprite(0, 0, gme.anims.sprites.circles);
	
	sprites[3] = new Sprite(0, 0, gme.anims.sprites.faces_cat);
	sprites[2] = new Sprite(0, 0, gme.anims.sprites.faces_pig);
	sprites[4] = new Sprite(0, 0, gme.anims.sprites.faces_bird);

	for (let i = 0; i < sprites.length; i++) {
		if (i < 2) {
			sprites[i].isActive = false;
		} else {
			sprites[i].animation.layers.forEach(l => l.isVisible = false);
			sprites[i].currentAnimDir = 1;
			animators[i] = new Animator(sprites[i].animation);
		}
		gme.scenes.main.addToDisplay(sprites[i]);
	}

	sprites[0].isActive = true;
	gme.scenes.current = 'main';
};

gme.draw = function() {
	gme.scenes.current.display();
};