import Constants from "expo-constants";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import "firebase/database";

const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  measurementId: Constants.manifest.extra.measurementId,
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const email = Constants.manifest.extra.user || "";
const password = Constants.manifest.extra.pass || "";

const firestore = app.firestore();

const firebaseDoingAuth = firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("errorCode", errorCode);
    console.log("errorMessage", errorMessage);
  });

export { app, firestore, firebaseDoingAuth };
