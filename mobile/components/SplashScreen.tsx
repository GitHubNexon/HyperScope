import React from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../utils/colors";

const SplashScreen = () => (
  <View style={styles.container}>
    <Image
      source={require("../assets/images/SplashIcon.png")}
      style={{ width: 150, height: 150 }}
      resizeMode="contain"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground || "#222831",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
