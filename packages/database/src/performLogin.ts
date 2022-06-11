import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "firebase/auth";

interface Config {
  email: string;
  password: string;
}
export const performLogin = (config?: Config, auth?: Auth) => {
  // console.log("Starting perform login");

  if (!config || !auth) {
    // throw new Error("Accessing login without correct setup");
    console.log("Accessing login without correct setup", { config, auth });
    return Promise.resolve(false);
  }

  // console.log("Login starting");

  return signInWithEmailAndPassword(auth, config.email, config.password).catch(
    (error) => {
      console.log("Firebase error", {
        code: error.code,
        message: error.message,
      });
      throw error;
    }
  );
};
