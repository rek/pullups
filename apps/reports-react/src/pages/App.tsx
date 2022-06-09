import * as React from "react";
import { getDatabase, performLogin } from "database";

import { Loading, Login } from "../common";
import { config } from "../config";
import { Authenticated } from "./Authenticated";

export type Credentials = {
  email: string;
  password: string;
};
export const App = () => {
  const [credentials, setCredentials] = React.useState<Credentials>();
  const [state, setState] = React.useState<"Loading" | "Error" | "Success">(
    "Loading"
  );

  React.useEffect(() => {
    getDatabase(config);
  }, []);

  React.useEffect(() => {
    performLogin(credentials)
      .then(() => {
        setState("Success");
      })
      .catch((error: unknown) => {
        console.log("Firebase error:", error);
        setState("Error");
      });
  }, [credentials?.email, credentials?.password]);

  if (state === "Loading") {
    return <Loading />;
  }

  if (state === "Error") {
    return <Login setCredentials={setCredentials} />;
  }

  return <Authenticated />;
};
