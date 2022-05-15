import * as React from "react";
import { getDatabase } from "database";
import Constants from "expo-constants";
import { PropsWithChildrenOnly } from "..";

const config = {
  apiKey: Constants.manifest?.extra?.apiKey,
  authDomain: Constants.manifest?.extra?.authDomain,
  projectId: Constants.manifest?.extra?.projectId,
  storageBucket: Constants.manifest?.extra?.storageBucket,
  messagingSenderId: Constants.manifest?.extra?.messagingSenderId,
  appId: Constants.manifest?.extra?.appId,
  measurementId: Constants.manifest?.extra?.measurementId,
  email: Constants.manifest?.extra?.user,
  password: Constants.manifest?.extra?.pass,
};

export const AuthProvider: React.FC<PropsWithChildrenOnly> = ({ children }) => {
  const [loading, setLoading] = React.useState(true);

  const { firebaseDoingAuth } = getDatabase(config);

  React.useEffect(() => {
    firebaseDoingAuth
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log("Firebase error:", error);
      });
  }, []);

  if (loading) {
    return null;
  }

  return <>{children}</>;
};
