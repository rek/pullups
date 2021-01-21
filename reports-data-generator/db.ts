import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/auth';
// import 'firebase/database';

const firebaseConfig = {
	apiKey: "AIzaSyDWj9Gt6pjZGhlNUKRjnsWMfyqKjf6X7YI",
	authDomain: "pullups-4eb8a.firebaseapp.com",
	projectId: "pullups-4eb8a",
	storageBucket: "pullups-4eb8a.appspot.com",
	messagingSenderId: "386867108595",
	appId: "1:386867108595:web:d71bb3d993ed9dbc1d3586",
	measurementId: "G-ZKSJGD9GBQ",
};

const app = firebase.initializeApp(firebaseConfig);

firebase.analytics();

const firestore = app.firestore()

export {
	app,
	firestore
}

