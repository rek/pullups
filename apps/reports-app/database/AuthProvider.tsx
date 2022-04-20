import * as React from "react";

// import { useFirebase } from "./useFirebase";
import { firebaseDoingAuth } from "./db";

export const AuthProvider: React.FC = ({ children }) => {
  // const { isLoading } = useFirebase();
  const [loading, setLoading] = React.useState(true);

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
