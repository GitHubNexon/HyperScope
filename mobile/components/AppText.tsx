// components/AppText.tsx

import React from "react";
import { Text, TextProps, TextStyle, StyleProp } from "react-native";
import { useAppTheme } from "../contexts/AppThemeContext";
import { useFontTheme } from "../contexts/FontThemeContext";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  size?: number;
  weight?: "Light" | "Regular" | "Medium" | "SemiBold" | "Bold";
  color?: string;
  style?: StyleProp<TextStyle>;
}

const AppText = ({
  children,
  size = 16,
  weight = "Regular",
  color,
  style,
  ...rest
}: AppTextProps) => {
  const { getFontFamily, isFontLoaded } = useFontTheme();
  const { theme } = useAppTheme();

  const defaultColor = theme === "light" ? "#222831" : "#DFD0B8";

  if (!isFontLoaded) return null;

  return (
    <Text
      style={[
        {
          fontSize: size,
          fontFamily: getFontFamily(weight),
          color: color || defaultColor,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default AppText;
