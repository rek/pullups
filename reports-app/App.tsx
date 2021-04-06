import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { useFirebase } from "./hooks/useFirebase";

const queryClient = new QueryClient();

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const isCacheLoaded = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isCacheLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AuthProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const AuthProvider: React.FC = ({ children }) => {
  const { isLoading } = useFirebase();

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};
