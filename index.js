import { Doodoo } from './doodoo/src/Doodoo.js';
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

	const playBtn = document.getElementById("play-btn");
	const stopBtn = document.getElementById("stop-btn");
	const infoBtn = document.getElementById("info-btn");
	const info = document.getElementById("info");

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
		document.getElementById("play-" + key).addEventListener('click', () => {
			playComp(key, false);
		});

		compUis[key] = {};
		compUis[key].num = document.getElementById("num-" + key);
		compUis[key].num.value = numSettings[key];
		compUis[key].num.addEventListener('change', () => {
			numSettings[key] = +compUis[key].num.value;
			saveNums();
		});

		compUis[key].track = document.getElementById("track-" + key);
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
		
		const count = numSettings[key];
		
		doodoo = new Doodoo({
			...comps[key],
			samplesURL: './doodoo/samples/',
			withCount: count,
			onModulate: (playCount, sequenceCount) => {
				if (sequenceCount >= count) {
					doodoo.stop();
					compUis[key].track.classList.remove("active");
					
					if (key === 'four' || !keepPlaying) {
						isPlaying = false;
					} else if (keepPlaying) {
						const i = order.indexOf(key) + 1;
						playComp(order[i], keepPlaying);
					}
				}
			}
		});
	}

	function stop() {
		doodoo.stop();
		isPlaying = false;
		compUis[current].track.classList.remove("active");
		current = "none";
	}
}