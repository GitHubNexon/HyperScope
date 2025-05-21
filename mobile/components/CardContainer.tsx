// components/CardContainer.tsx

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import dayjs from "dayjs";
import AppText from "./AppText";
import colors from "../utils/colors";
import { useAppTheme } from "../contexts/AppThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface CardContainerProps {
  title: string;
  image?: string;
  description: string;
  date?: Date;
  link?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

const CardContainer = ({
  title,
  image,
  description,
  date,
  link,
  icon,
}: CardContainerProps) => {
  const { theme } = useAppTheme();
  const backgroundColor =
    theme === "light" ? colors.lightBackground : colors.darkBackground;
  const cardColor = theme === "light" ? "#f5f5f5" : colors.neutral;

  return (
    <View style={[styles.card, { backgroundColor: cardColor }]}>
      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color={colors.accent}
          style={styles.icon}
        />
      )}
      <AppText weight="Bold" size={18}>
        {title}
      </AppText>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <AppText style={styles.description}>{description}</AppText>

      {date && (
        <AppText size={12} color={colors.accent}>
          {dayjs(date).format("MMMM D, YYYY")}
        </AppText>
      )}

      {link && (
        <TouchableOpacity onPress={() => Linking.openURL(link)}>
          <AppText size={14} color="#1E90FF">
            Read More
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  image: {
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
  },
  description: {
    marginTop: 8,
    marginBottom: 10,
  },
  icon: {
    marginBottom: 8,
  },
});

export default CardContainer;
