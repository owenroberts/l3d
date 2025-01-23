/*
	can we flock ??
*/
import * as THREE from 'three';
import * as Cool from '../../cool/cool.js';
import { FlockMember } from './FlockMember.js';

export function Flock(params) {

	const { type, height, boundaries } = params;

	let reachedTarget = false;

	const members = [];
	
	const count = Cool.random(3, 8);
	for (let i = 0; i < count; i++) {
		const member = new FlockMember({ type, boundaries });
		members.push(member);
	}

	function update(timeElapsed, target) {
		let timeElapsedInSeconds = timeElapsed / 1000;
		for (let i = 0; i < members.length; i++) {
			members[i].update(timeElapsedInSeconds, members, target);
			if (members[i].reachedTarget()) {
				// getNewTarget();
				reachedTarget = true;
			}
		}
	}

	return { 
		update,
		getMembers: () => { return members; },
		reachedTarget: () => {
			if (reachedTarget) {
				reachedTarget = false;
				return true;
			} else {
				return false;
			}
		},
	};
}
