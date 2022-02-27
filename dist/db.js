import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';

import firebase from "../_snowpack/pkg/firebase/app.js";
import "../_snowpack/pkg/firebase/firestore.js";
import "../_snowpack/pkg/firebase/analytics.js";
import "../_snowpack/pkg/firebase/auth.js";
const firebaseConfig = {
  apiKey: __SNOWPACK_ENV__.SNOWPACK_PUBLIC_APIKEY,
  appId: __SNOWPACK_ENV__.SNOWPACK_PUBLIC_APPID,
  authDomain: __SNOWPACK_ENV__.SNOWPACK_PUBLIC_AUTHDOMAIN,
  measurementId: __SNOWPACK_ENV__.SNOWPACK_PUBLIC_measurementId,
  messagingSenderId: __SNOWPACK_ENV__.SNOWPACK_PUBLIC_MESSAGINGSENDERID,
  projectId: __SNOWPACK_ENV__.SNOWPACK_PUBLIC_PROJECTID,
  storageBucket: __SNOWPACK_ENV__.SNOWPACK_PUBLIC_STORAGEBUCKET
};
const app = firebase.initializeApp(firebaseConfig);
const email = __SNOWPACK_ENV__.SNOWPACK_PUBLIC_USER || "";
const password = __SNOWPACK_ENV__.SNOWPACK_PUBLIC_PASS || "";
const firestore = app.firestore();
const firebaseDoingAuth = firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log("errorCode", errorCode);
  console.log("errorMessage", errorMessage);
  throw error;
});
firebase.analytics();
export {app, firestore, firebaseDoingAuth};
