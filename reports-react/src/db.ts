import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/auth";
// import "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.SNOWPACK_PUBLIC_apiKey,
  authDomain: import.meta.env.SNOWPACK_PUBLIC_authDomain,
  projectId: import.meta.env.SNOWPACK_PUBLIC_projectId,
  storageBucket: import.meta.env.SNOWPACK_PUBLIC_storageBucket,
  messagingSenderId: import.meta.env.SNOWPACK_PUBLIC_messagingSenderId,
  appId: import.meta.env.SNOWPACK_PUBLIC_appId,
  measurementId: import.meta.env.SNOWPACK_PUBLIC_measurementId,
};

const app = firebase.initializeApp(firebaseConfig);

const email = import.meta.env.SNOWPACK_PUBLIC_user || "";
const password = import.meta.env.SNOWPACK_PUBLIC_pass || "";

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

firebase.analytics();

export { app, firestore, firebaseDoingAuth };
