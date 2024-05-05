import { Doodoo } from './doodoo/src/Doodoo.js';

window.addEventListener("load", load);

function load() {

	const compUrls = {
		'one': './one/compositions/longy_1.json',
		'two': './doodoo/compositions/l3d_theme_17.json',
		'three': './doodoo/compositions/drummys.json',
		'four': './four/compositions/graphy.json',
	};
	const comps = {};
	let loadCount = 0;
	function loadCompositions() {
		for (const key in compUrls) {
			const comp = fetch(compUrls[key])
				.then(res => res.json())
				.then(json => { 
					comps[key] = json;
					loadCount++;
					if (loadCount === 4) {
						onLoad(comps);
					} 
				})
				.catch(err => { console.log('my err', err); });
		}
	}
	loadCompositions();
}

function onLoad(comps) {

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
		"two": 12, 
		"three": 12, 
		"four": 12,
	};

	playBtn.addEventListener('click', playAll);
	stopBtn.addEventListener('click', stop);

	const settings = localStorage.getItem('doodoo-nums');
	if (settings) {
		numSettings = JSON.parse(settings);
	}

	for (const key in comps) {
		document.getElementById("play-" + key).addEventListener('click', () => {
			playComp(key, false);
		});

		compUis[key] = {};
		compUis[key].num = document.getElementById("num-" + key);
		compUis[key].num.value = numSettings[key];
		compUis[key].num.addEventListener('click', () => {
			numSettings[key] = +compUis[key].num.value;
			localStorage.setItem('doodoo-nums', JSON.stringify(numSettings));
		});

		compUis[key].track = document.getElementById("track-" + key);
	}

	function playAll() {
		if (isPlaying) return;
		isPlaying = true;
		if (current === "none") {
			playComp("one", true);
		}
	}

	function playComp(key, keepPlaying) {
		if (doodoo) doodoo.stop();
		
		current = key;
		compUis[key].track.classList.add("active");
		
		const count = numSettings[key];
		
		doodoo = new Doodoo({
			...comps[key],
			samplesURL: '../../doodoo/samples/',
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