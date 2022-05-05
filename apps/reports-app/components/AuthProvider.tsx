import * as React from "react";
import { getDatabase } from "database";
import Constants from "expo-constants";

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = React.useState(true);

  const { firebaseDoingAuth } = getDatabase({
    apiKey: Constants.manifest?.extra?.apiKey,
    authDomain: Constants.manifest?.extra?.authDomain,
    projectId: Constants.manifest?.extra?.projectId,
    storageBucket: Constants.manifest?.extra?.storageBucket,
    messagingSenderId: Constants.manifest?.extra?.messagingSenderId,
    appId: Constants.manifest?.extra?.appId,
    measurementId: Constants.manifest?.extra?.measurementId,
    email: Constants.manifest?.extra?.user,
    password: Constants.manifest?.extra?.pass,
  });

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
