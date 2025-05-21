import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import AppText from "../components/AppText";
import colors from "../utils/colors";
import { useAppTheme } from "../contexts/AppThemeContext";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const CategoriesPicker = ({
  selectedCategory,
  onChange,
}: {
  selectedCategory: string;
  onChange: (value: string) => void;
}) => {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);

  // Use colors based on theme
  const bgColor =
    theme === "light" ? colors.lightBackground : colors.darkBackground;
  const textColor = theme === "light" ? colors.lightText : colors.darkText;
  const accentColor = colors.accent;

  // Capitalize selected category for display
  const selectedLabel =
    selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

  return (
    <View style={{ marginVertical: 10 }}>
      <TouchableOpacity
        style={[
          styles.selector,
          { backgroundColor: bgColor, borderColor: accentColor },
        ]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <AppText style={[styles.selectedText, { color: textColor }]}>
          {selectedLabel}
        </AppText>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: bgColor }]}>
            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const isSelected = item === selectedCategory;
                return (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      isSelected && { backgroundColor: accentColor + "33" }, // 20% opacity
                    ]}
                    onPress={() => {
                      onChange(item);
                      setModalVisible(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <AppText
                      style={[
                        styles.optionText,
                        { color: isSelected ? accentColor : textColor },
                      ]}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </AppText>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectedText: {
    fontSize: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "#00000088", // translucent black
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  modalContent: {
    borderRadius: 12,
    maxHeight: "60%",
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
  },
});

export default CategoriesPicker;
