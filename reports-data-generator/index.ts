import {Firestore} from '@google-cloud/firestore';

import data1 from './pullup_adam_9.data'

// Create a new client
const firestore = new Firestore();

console.log('Starting data load...')

const getRandom = (min: number, max: number) => Number((Math.random() * (max - min) + min).toFixed(0));
const generatePullup = (min = getRandom(0, 20)) => {
	let current = 0
	const max = getRandom(80, 100)

	const pullup = []

	while (current < max) {
		pullup.push(getRandom(current - 2, current + 2))
		current++
	}
	while (current >= min) {
		pullup.push(current--)
	}

	return pullup
}

const generatePullups = (count: number) => {
	let results = []
	for (let i = 0; i <= count; i++) {
		results = results.concat(generatePullup(i === 0 ? 0 : undefined))
	}

	return results
}

const runDataGeneration = async () => {

	const type = 'pullup';

	const user = 'adam';
	const weight = 95.7;

	// const user = 'anette';
	// const weight = 67;

	// firestore.collection("users").doc("adam.logs")
	const ref = await firestore.collection("users").doc(user)

	const existing = await ref.get()
	const data = existing.data();

	await ref.update({
		logs: [
			...data.logs,
			{
				// data: generatePullups(getRandom(2, 5)),
				data: data1,
				created: new Date(),
				weight,
				interval: 1,

				duration: 32715 - 27218,
				type
			}
		]
	});
}

runDataGeneration()
