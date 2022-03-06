import * as React from "react";

import { useFirebase } from "../database/useFirebase";
import { IDToken } from "./types";
import { Loading } from "./Loading";

export const ProvideIDToken = ({ children }: { children: React.ReactNode }) => {
  const { data } = useFirebase();

  if (!data) {
    return <Loading />;
  }

  return React.cloneElement<IDToken>(
    children as React.ReactElement<React.PropsWithChildren<IDToken>>,
    {
      idToken: data,
    }
  );
};
