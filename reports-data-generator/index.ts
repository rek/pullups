import {Firestore} from '@google-cloud/firestore';

// Create a new client
const firestore = new Firestore();

console.log('Starting data load...')

const generatePullup = () => {
	let current = 0
	const max = 100

	const pullup = []

	while (current < max) {
		pullup.push(current++)
	}
	while (current >= 0) {
		pullup.push(current--)
	}

	return pullup
}

const runDataGeneration = async () => {

	// firestore.collection("users").doc("adam.logs")
	const ref = await firestore.collection("users").doc("adam")

	const existing = await ref.get()
	const data = existing.data();

	await ref.update({
		logs: [
			...data.logs,
			{
				data: generatePullup(),
				start: '123'
			}
		]
	});

}


runDataGeneration()
