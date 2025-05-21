import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useAppTheme } from "../contexts/AppThemeContext";
import { Feather } from "@expo/vector-icons"; // Make sure this is installed
import colors from "../utils/colors";

const AppMode = () => {
  const { theme, toggleTheme } = useAppTheme();
  const isDark = theme === "dark";

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.button}>
      <View style={styles.iconContainer}>
        <Feather
          name={isDark ? "sun" : "moon"}
          size={20}
          color={isDark ? colors.primary : colors.neutral}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 999,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppMode;
