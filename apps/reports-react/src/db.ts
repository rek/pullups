import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
  apiKey: String(import.meta.env.VITE_apiKey),
  authDomain: String(import.meta.env.VITE_authDomain),
  projectId: String(import.meta.env.VITE_projectId),
  storageBucket: String(import.meta.env.VITE_storageBucket),
  messagingSenderId: String(import.meta.env.VITE_messagingSenderId),
  appId: String(import.meta.env.VITE_appId),
  measurementId: String(import.meta.env.VITE_measurementId),
};

const app = initializeApp(firebaseConfig);

// const email = import.meta.env.SNOWPACK_PUBLIC_USER || "";
// const password = import.meta.env.SNOWPACK_PUBLIC_PASS || "";
const email = String(import.meta.env.VITE_user) || "";
const password = String(import.meta.env.VITE_pass) || "";

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

// firebase.analytics();

export { app, firestore, firebaseDoingAuth };
