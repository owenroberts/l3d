/*
	controls for playback
*/

export function Controls(start, stop, doodoo, resize) {
	
	const controls = document.getElementById('controls');
	const startButton = document.getElementById('start');
	const stopButton = document.getElementById('stop');
	const backButton = document.getElementById('back');
	
	startButton.addEventListener('click', start);
	stopButton.addEventListener('click', stop);

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

	/* debugging & key commands*/
	function keyDown(ev) {
		if (doodoo) {
			if (ev.code === 'Comma') doodoo.stop();
			else if (ev.code === 'KeyP') {
				doodoo.printLoops();
				doodoo.printParams();
				doodoo.printComp();
			}
			if (ev.code === 'Enter') doodoo.stop();	
		}

		if (ev.code === 'Space') start();
		if (ev.code === 'KeyF') getFullscreen();
	}
	document.addEventListener('keydown', keyDown);

	function onWindowResize() {
		if (document.fullscreen) {
			controls.style.display = 'none';
		} else {
			controls.style.display = 'block';
		}
		resize();
	}
	document.addEventListener("fullscreenchange", onWindowResize);

	const fullScreenButton = document.getElementById('fullscreen');
	fullScreenButton.addEventListener('click', getFullscreen);
	

	function getFullscreen() {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}

	return {
		addDoodoo: dd => {
			doodoo = dd;
		},
	};
}






