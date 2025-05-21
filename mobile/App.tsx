import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppThemeProvider } from "./contexts/AppThemeContext";
import { FontThemeProvider } from "./contexts/FontThemeContext";
import AppLayout from "./layouts/AppLayout";
import SplashScreen from "./components/SplashScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show splash screen for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <FontThemeProvider>
          <AppLayout />
        </FontThemeProvider>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}
