// containers/CategoriesContainer.tsx
import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import {
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import colors from "../utils/colors";
import AppText from "../components/AppText";

type Category = {
  id: string;
  title: string;
  iconLib: "MaterialIcons" | "FontAwesome5" | "Entypo" | "Ionicons";
  iconName: string;
};

const categories: Category[] = [
  {
    id: "1",
    title: "Business",
    iconLib: "MaterialIcons",
    iconName: "business-center",
  },
  {
    id: "2",
    title: "Entertainment",
    iconLib: "Ionicons",
    iconName: "videocam",
  },
  { id: "3", title: "Health", iconLib: "FontAwesome5", iconName: "heartbeat" },
  { id: "4", title: "Science", iconLib: "Entypo", iconName: "lab-flask" },
  {
    id: "5",
    title: "Sports",
    iconLib: "MaterialIcons",
    iconName: "sports-soccer",
  },
  {
    id: "6",
    title: "Technology",
    iconLib: "FontAwesome5",
    iconName: "microchip",
  },
  { id: "7", title: "Travel", iconLib: "Entypo", iconName: "aircraft" },
  { id: "8", title: "Food", iconLib: "MaterialIcons", iconName: "restaurant" },
  { id: "9", title: "Politics", iconLib: "FontAwesome5", iconName: "landmark" },
  { id: "10", title: "Education", iconLib: "Ionicons", iconName: "school" },
];

const ICON_SIZE = 40;
const numColumns = 3;
const screenWidth = Dimensions.get("window").width;
const cardSize = screenWidth / numColumns - 24;

const IconRenderer = ({ lib, name }: { lib: string; name: string }) => {
  const color = colors.accent;
  const size = ICON_SIZE;

  switch (lib) {
    case "MaterialIcons":
      return <MaterialIcons name={name as any} size={size} color={color} />;
    case "FontAwesome5":
      return <FontAwesome5 name={name as any} size={size} color={color} />;
    case "Entypo":
      return <Entypo name={name as any} size={size} color={color} />;
    case "Ionicons":
      return <Ionicons name={name as any} size={size} color={color} />;
    default:
      return null;
  }
};

const CategoriesContainer = () => {
  return (
    <View style={styles.container}>
      {categories.map((item) => (
        <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.7}>
          <View style={styles.iconContainer}>
            <IconRenderer lib={item.iconLib} name={item.iconName} />
          </View>
          <AppText
            style={styles.title}
            size={14}
            weight="Medium"
            numberOfLines={1}
          >
            {item.title}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  card: {
    width: cardSize,
    height: cardSize,
    margin: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightBackground,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 10,
  },
  title: {
    textAlign: "center",
    color: colors.accent,
  },
});

export default CategoriesContainer;
