import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

let app: FirebaseApp;
let firestore: Firestore;
let firebaseDoingAuth: Promise<unknown>;

interface Config {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
  email: string;
  password: string;
}
export const getDatabase = (config?: Config) => {
  if (app) {
    return {
      app,
      firestore,
      firebaseDoingAuth,
    };
  }

  if (!config) {
    throw new Error("Accessing database without config");
  }

  app = initializeApp(config);
  firestore = getFirestore(app);
  const auth = getAuth(app);

  firebaseDoingAuth = signInWithEmailAndPassword(
    auth,
    config.email,
    config.password
  ).catch((error) => {
    console.log("Firebase error", { code: error.code, message: error.message });
    throw error;
  });

  return {
    app,
    firestore,
    firebaseDoingAuth,
  };
};
