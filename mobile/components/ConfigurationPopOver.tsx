import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Animated,
  Easing,
} from "react-native";
import colors from "../utils/colors";
import CategoriesPicker from "./CategoriesPicker";
import CountryPicker from "./CountryPicker";
import AppText from "./AppText";

interface ConfigurationPopOverProps {
  visible: boolean;
  onClose: () => void;
  selectedCountry: string;
  selectedCategory: string;
  onCountryChange: (country: string) => void;
  onCategoryChange: (category: string) => void;
}

const ConfigurationPopOver: React.FC<ConfigurationPopOverProps> = ({
  visible,
  onClose,
  selectedCountry,
  selectedCategory,
  onCountryChange,
  onCategoryChange,
}) => {
  const slideAnim = useRef(new Animated.Value(50)).current; // start 50px below

  useEffect(() => {
    if (visible) {
      // Slide up modal content when visible
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    } else {
      // Slide down modal content when hiding
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }).start();
    }
  }, [visible, slideAnim]);

  return (
    <Modal visible={visible} transparent animationType="none">
      <SafeAreaView style={styles.safeArea}>
        {/* Overlay always visible immediately with no animation */}
        <View style={styles.overlay} />

        {/* Animated sliding modal container */}
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <AppText style={styles.title}>Configure News Filters</AppText>

          <View style={styles.pickerItem}>
            <AppText style={styles.label}>Select Country</AppText>
            <CountryPicker
              selectedCountry={selectedCountry}
              onChange={onCountryChange}
            />
          </View>

          <View style={styles.pickerItem}>
            <AppText style={styles.label}>Select Category</AppText>
            <CategoriesPicker
              selectedCategory={selectedCategory}
              onChange={onCategoryChange}
            />
          </View>

          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)", // fixed opacity shadow
  },
  container: {
    backgroundColor: colors.lightBackground,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: colors.accent,
  },
  pickerItem: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontWeight: "600",
    color: colors.accent,
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: colors.lightBackground,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ConfigurationPopOver;
