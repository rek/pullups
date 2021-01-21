import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/auth';
// import 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.SNOWPACK_PUBLIC_apiKey,
  authDomain: import.meta.env.SNOWPACK_PUBLIC_authDomain,
  projectId: import.meta.env.SNOWPACK_PUBLIC_projectId,
  storageBucket: import.meta.env.SNOWPACK_PUBLIC_storageBucket,
  messagingSenderId: import.meta.env.SNOWPACK_PUBLIC_messagingSenderId,
  appId: import.meta.env.SNOWPACK_PUBLIC_appId,
  measurementId: import.meta.env.SNOWPACK_PUBLIC_measurementId
};

const app = firebase.initializeApp(firebaseConfig);

firebase.analytics();

const firestore = app.firestore()

export {
  app,
  firestore
}

