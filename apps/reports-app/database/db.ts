import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Constants from "expo-constants";

import "firebase/firestore";
import "firebase/analytics";
import "firebase/auth";

const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.apiKey,
  authDomain: Constants.manifest?.extra?.authDomain,
  projectId: Constants.manifest?.extra?.projectId,
  storageBucket: Constants.manifest?.extra?.storageBucket,
  messagingSenderId: Constants.manifest?.extra?.messagingSenderId,
  appId: Constants.manifest?.extra?.appId,
  measurementId: Constants.manifest?.extra?.measurementId,
};
const email = Constants.manifest?.extra?.user;
const password = Constants.manifest?.extra?.pass;

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);

const firebaseDoingAuth = signInWithEmailAndPassword(
  auth,
  email,
  password
).catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log("errorCode", errorCode);
  console.log("errorMessage", errorMessage);
  throw error;
});

export { app, firestore, firebaseDoingAuth };
