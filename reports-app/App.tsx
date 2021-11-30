import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppearanceProvider } from "react-native-appearance";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { AuthProvider } from "./database/AuthProvider";

const queryClient = new QueryClient();

if (LogBox) {
  LogBox.ignoreLogs(["Setting a timer"]);
}

export default function App() {
  const isCacheLoaded = useCachedResources();

  if (!isCacheLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppearanceProvider>
        <SafeAreaProvider>
          <AuthProvider>
            <Navigation />
            <StatusBar />
          </AuthProvider>
        </SafeAreaProvider>
      </AppearanceProvider>
    </QueryClientProvider>
  );
}
