import { Doodoo } from './doodoo/src/Doodoo.js';
import { map } from './cool/cool.js';
import compOne from './one/compositions/longy_1.json';
import compTwo from './two/compositions/l3d_theme_17.json';
import compThree from './three/compositions/drummys.json';
import compFour from './four/compositions/graphy.json';

window.addEventListener("load", load);

function load() {

	const comps = {
		'one': compOne,
		'two': compTwo,
		'three': compThree,
		'four': compFour,
	};

	let doodoo; // there's only one doodoo
	let isPlaying = false;
	let current = "none";
	const order = ["one", "two", "three", "four"];
	let fft, fftCtx;

	const playBtn = document.getElementById("play-btn");
	const stopBtn = document.getElementById("stop-btn");
	const infoBtn = document.getElementById("info-btn");
	const info = document.getElementById("info");
	const fftCanvas = document.getElementById("fft-canvas");

	infoBtn.addEventListener('click', () => {
		info.classList.toggle('visible');
	});

	const compUis = {};
	let numSettings = {
		"one": 12, 
		"two": 8,
		"three": 8, 
		"four": 16,
	};

	playBtn.addEventListener('click', playAll);
	stopBtn.addEventListener('click', stop);

	const settings = localStorage.getItem('doodoo-nums');
	if (settings) {
		numSettings = JSON.parse(settings);
	}

	function saveNums() {
		localStorage.setItem('doodoo-nums', JSON.stringify(numSettings));
	}

	for (const key in comps) {

		const btn = document.getElementById("play-" + key);
		btn.addEventListener('click', () => {
			if (current == key && doodoo.getStatusIsPlaying()) {
				doodoo.stop();
				btn.innerText = '⏵︎';
			} else {
				playComp(key, false);
				
			}
		});
		
		const num = document.getElementById("num-" + key);
		num.value = numSettings[key];
		num.addEventListener('change', () => {
			numSettings[key] = +compUis[key].num.value;
			saveNums();
		});

		const track = document.getElementById("track-" + key);

		compUis[key] = { btn, num, track };
	}

	function playAll() {
		if (isPlaying) return;
		isPlaying = true;
		playComp("one", true);
	}

	function playComp(key, keepPlaying) {
		let waitTime = 0;
		if (doodoo) {
			doodoo.stop();
		}
		// setTimeout()
		
		if (current !== 'none') compUis[current].track.classList.remove("active");
		current = key;
		compUis[key].track.classList.add("active");
		compUis[key].btn.innerText = '⏹';
		
		const count = numSettings[key];
		
		doodoo = new Doodoo({
			...comps[key],
			samplesURL: './doodoo/samples/',
			withCount: count,
			useFFT: true,
			getFFT: toneFFT => {
				fft = toneFFT;
				if (fft) setupFFT();
			},
			onModulate: (playCount, sequenceCount) => {
				if (sequenceCount >= count) {
					doodoo.stop();
					compUis[key].track.classList.remove("active");
					compUis[key].btn.innerText = '⏵︎';
					
					if (key === 'four' || !keepPlaying) {
						isPlaying = false;
					} else if (keepPlaying) {
						const i = order.indexOf(key) + 1;
						playComp(order[i], keepPlaying);
					}
				}
			}
		});

		// if doodoo is playing need to stop before using anchors ... 
		anchorSetup();
	}

	function stop() {
		doodoo.stop();
		isPlaying = false;
		compUis[current].track.classList.remove("active");
		compUis[current].btn.innerText = '⏵︎';
		current = "none";
	}

	/* stop doodoo if any anchor is clicked */
	function anchorSetup() {
		const anchors = document.getElementsByTagName('a');
		Array.from(anchors).forEach(a => {
			a.addEventListener('click', ev => {
				ev.preventDefault();
				doodoo.stop();
				setTimeout(() => {
					location.href = a.href;
				}, 300);
			});
		});
	}

	function setupFFT() {
		if (fftCanvas.getContext('2d')) {
			fftCtx = fftCanvas.getContext('2d');
			fftCtx.fillStyle = 'black';
			fftCtx.fillRect(0, 0, 64, 32);
		} else {
			return;
		}
		fftTimer = performance.now();
		requestAnimationFrame(updateFFT);
	}

	let levels;
	const fftInterval = 1000 / 24;
	let fftTimer = 0;

	function updateFFT() {
		requestAnimationFrame(updateFFT);
		if (!fft) return;
		const time = performance.now();
		if (time > fftTimer + fftInterval ) {
			fftTimer = time;

			fftCtx.fillStyle = 'black';
			fftCtx.fillRect(0, 0, 64, 32);

			fftCtx.fillStyle = '#ad95df';
			levels = fft.getValue();

			for (let i = 0; i < levels.length; i++) {
				const v = map(levels[i], -120, 12, 0, 28, true);
				const x = i * 4;
				fftCtx.fillRect(x + 1, 30 - v, 2, v);
			}
		}
	}
	
}