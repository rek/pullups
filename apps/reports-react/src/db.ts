import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/auth";
// import "firebase/database";

const firebaseConfig = {
  // apiKey: import.meta.env.SNOWPACK_PUBLIC_APIKEY,
  // appId: import.meta.env.SNOWPACK_PUBLIC_APPID,
  // authDomain: import.meta.env.SNOWPACK_PUBLIC_AUTHDOMAIN,
  // measurementId: import.meta.env.SNOWPACK_PUBLIC_measurementId,
  // messagingSenderId: import.meta.env.SNOWPACK_PUBLIC_MESSAGINGSENDERID,
  // projectId: import.meta.env.SNOWPACK_PUBLIC_PROJECTID,
  // storageBucket: import.meta.env.SNOWPACK_PUBLIC_STORAGEBUCKET,
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

const app = firebase.initializeApp(firebaseConfig);

// const email = import.meta.env.SNOWPACK_PUBLIC_USER || "";
// const password = import.meta.env.SNOWPACK_PUBLIC_PASS || "";
const email = import.meta.env.VITE_user || "";
const password = import.meta.env.VITE_pass || "";

const firestore = app.firestore();

const firebaseDoingAuth = firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("errorCode", errorCode);
    console.log("errorMessage", errorMessage);
    throw error;
  });

firebase.analytics();

export { app, firestore, firebaseDoingAuth };
