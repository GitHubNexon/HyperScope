import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../utils/colors";
import { useAppTheme } from "../contexts/AppThemeContext";
import AppText from "../components/AppText";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationComponentProps) => {
  const { theme } = useAppTheme();
  const isLight = theme === "light";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, currentPage === 1 && styles.disabledButton]}
        disabled={currentPage === 1}
        onPress={() => onPageChange(currentPage - 1)}
      >
        <AppText weight="Bold" color="#fff">
          Prev
        </AppText>
      </TouchableOpacity>

      <AppText weight="Medium" size={16}>
        Page {currentPage} of {totalPages}
      </AppText>

      <TouchableOpacity
        style={[
          styles.button,
          currentPage === totalPages && styles.disabledButton,
        ]}
        disabled={currentPage === totalPages}
        onPress={() => onPageChange(currentPage + 1)}
      >
        <AppText weight="Bold" color="#fff">
          Next
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: colors.accent + "88", // transparent
  },
});

export default PaginationComponent;
