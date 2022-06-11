import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;
let firebaseDoingAuth: Promise<unknown>;

export interface Config {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}
export const getDatabase = (config?: Config) => {
  // console.log("Starting get database");
  if (app) {
    return {
      app,
      auth,
      firestore,
      firebaseDoingAuth,
    };
  }

  if (!config) {
    throw new Error("Accessing database without config");
  }

  app = initializeApp(config);
  firestore = getFirestore(app);
  auth = getAuth(app);

  return {
    app,
    auth,
    firestore,
    firebaseDoingAuth,
  };
};
