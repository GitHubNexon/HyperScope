// contexts/FontThemeContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as Font from "expo-font";
import { TextStyle } from "react-native";

type FontWeight = "Light" | "Regular" | "Medium" | "SemiBold" | "Bold";

interface FontContextProps {
  isFontLoaded: boolean;
  getFontFamily: (weight: FontWeight) => string;
}

const FontThemeContext = createContext<FontContextProps | undefined>(undefined);

export const FontThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "SpaceGrotesk-Light": require("../assets/fonts/SpaceGrotesk-Light.ttf"),
        "SpaceGrotesk-Regular": require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
        "SpaceGrotesk-Medium": require("../assets/fonts/SpaceGrotesk-Medium.ttf"),
        "SpaceGrotesk-SemiBold": require("../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
        "SpaceGrotesk-Bold": require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
      });
      setIsFontLoaded(true);
    };
    loadFonts();
  }, []);

  const getFontFamily = (weight: FontWeight): string =>
    `SpaceGrotesk-${weight}`;

  return (
    <FontThemeContext.Provider value={{ isFontLoaded, getFontFamily }}>
      {children}
    </FontThemeContext.Provider>
  );
};

export const useFontTheme = () => {
  const context = useContext(FontThemeContext);
  if (!context)
    throw new Error("useFontTheme must be used within FontThemeProvider");
  return context;
};
