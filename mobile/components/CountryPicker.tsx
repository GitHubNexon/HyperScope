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

const countries = [
  { label: "United States", value: "us" },
  { label: "Philippines", value: "ph" },
  { label: "United Kingdom", value: "gb" },
  { label: "Canada", value: "ca" },
  // Add more countries if needed
];

const CountryPicker = ({
  selectedCountry,
  onChange,
}: {
  selectedCountry: string;
  onChange: (value: string) => void;
}) => {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const bgColor =
    theme === "light" ? colors.lightBackground : colors.darkBackground;
  const textColor = theme === "light" ? colors.lightText : colors.darkText;
  const accentColor = colors.accent;

  const selectedLabel =
    countries.find((c) => c.value === selectedCountry)?.label ||
    "Select country";

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
              data={countries}
              keyExtractor={(item) => item.value}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const isSelected = item.value === selectedCountry;
                return (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      isSelected && { backgroundColor: accentColor + "33" },
                    ]}
                    onPress={() => {
                      onChange(item.value);
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
                      {item.label}
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
    backgroundColor: "#00000088",
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

export default CountryPicker;
