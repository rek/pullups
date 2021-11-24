import * as React from "react";

import { useFirebase } from "../hooks/useFirebase";
import { Loading } from "./Loading";

export const ProvideIDToken: React.FC = ({ children }) => {
  const { data } = useFirebase();

  if (!data) {
    return <Loading />;
  }

  return React.cloneElement<{ idToken: string }>(
    children as React.ReactElement<any>,
    {
      idToken: data,
    }
  );
};
