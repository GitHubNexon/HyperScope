import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { ThemeProvider } from "styled-components/native";
import colors from "../utils/colors";

type ThemeType = "light" | "dark";

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
}

const AppThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const lightTheme = {
  background: colors.lightBackground,
  text: colors.lightText,
  primary: colors.primary,
};

const darkTheme = {
  background: colors.darkBackground,
  text: colors.darkText,
  primary: colors.primary,
};

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme: ColorSchemeName = Appearance.getColorScheme();
  const [theme, setTheme] = useState<ThemeType>(
    colorScheme === "dark" ? "dark" : "light"
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === "dark" ? "dark" : "light");
    });
    return () => subscription.remove();
  }, []);

  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <AppThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(AppThemeContext);
  if (!context)
    throw new Error("useAppTheme must be used within AppThemeProvider");
  return context;
};
