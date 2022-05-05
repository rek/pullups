import * as React from "react";

import { getDatabase } from "database";
import { IDToken } from "./types";
import { Loading } from "./Loading";

export const ProvideIDToken = ({ children }: { children: React.ReactNode }) => {
  const { app } = getDatabase();

  if (!app) {
    return <Loading />;
  }

  return React.cloneElement<IDToken>(
    children as React.ReactElement<React.PropsWithChildren<IDToken>>,
    {
      idToken: app.name,
    }
  );
};
