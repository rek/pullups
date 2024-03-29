import { getDatabase, performLogin } from "database";
import * as React from "react";

import { Loading, Login } from "../common";
import { config } from "../config";
import { Authenticated } from "./Authenticated";

export type Credentials = {
  email: string;
  password: string;
};
export const App = () => {
  const [credentials, setCredentials] = React.useState<Credentials>();
  const [state, setState] = React.useState<
    "Loading" | "Error" | "Success" | ""
  >("");

  const handleLogout = () => {
    // console.log("Running logout");
    setCredentials({ email: "", password: "" });
    setState("");
  };

  React.useEffect(() => {
    const { auth } = getDatabase(config);
    performLogin({ ...config, ...credentials }, auth)
      .then((success) => {
        if (success) {
          setState("Success");
        }
      })
      .catch((error: unknown) => {
        console.log("Firebase error:", error);
        setState("Error");
      });
  }, [credentials?.email, credentials?.password]);

  if (state === "Loading") {
    return <Loading />;
  }

  if (state === "Error" || state === "") {
    return (
      <Login
        error={state === "Error" ? "Login error." : ""}
        setCredentials={setCredentials}
      />
    );
  }

  return <Authenticated logout={handleLogout} />;
};
