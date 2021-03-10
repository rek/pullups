import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Text, View } from "./components/Themed";

import { firebaseDoingAuth } from "./db";

const queryClient = new QueryClient();

export default function App() {
  const isCacheLoaded = useCachedResources();
  const colorScheme = useColorScheme();
  const [dbLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    firebaseDoingAuth.then(() => {
      setLoading(false);
    });
  }, []);

  if (!isCacheLoaded || dbLoading) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
