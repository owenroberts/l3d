/*
	this should be a Prop/Mod thing maybe?
	animate a value over time ...
	works with joint
*/

import '../doodoo/ui/lib/cool/cool.js'; // fuck off

export default function Animator(params) {

	let value = params.value ?? 0;
	let increment = params.increment ?? 1;
	let func = params.func ?? ((value) => { return value; });

	let counter = 0;
	let count = params.count ?? 0;

	// random range randomizes the increment
	let range = params.randomRange ?? [0, 0];
	let randomize = Math.abs(range[0]) + Math.abs(range[1]) !== 0;

	// clamp range clamps the increment
	let min = params.clampRange ? increment + params.clampRange[0] : 0;
	let max = params.clampRange ? increment + params.clampRange[1] : 1;

	// console.log(value, increment, randomize, range, min, max);

	function update(timeElapsedInSeconds=1, params={}) {
		// console.log(counter, count, value, increment);
		let isCount = false;
		if (counter === count) {
			value += increment * timeElapsedInSeconds;
			if (randomize) {
				increment = (increment + Cool.random(...range)).clamp(min, max);
			}
			counter = 0;
			isCount = true;
		} else {
			counter++;
		}

		if (params.valueClamp) {
		// console.log(value.clamp(...params.valueClamp));
			value = value.clamp(...params.valueClamp);
		}
		// console.log(counter, count, value, increment);
		return func(value, params, isCount);
	}

	return { update };
}