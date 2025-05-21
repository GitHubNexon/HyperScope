import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import Home from "../screens/Home";
import Categories from "../screens/Categories";
import Notifications from "../screens/Notifications";
import About from "../screens/About";

const Tab = createBottomTabNavigator();

const AppLayout = () => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.background,
            borderTopColor: "transparent",
            elevation: 10,
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.text,
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Feather.glyphMap = "home";

            switch (route.name) {
              case "Home":
                iconName = "home";
                break;
              case "Categories":
                iconName = "grid";
                break;
              case "Notifications":
                iconName = "bell";
                break;
              case "About":
                iconName = "info";
                break;
            }

            return <Feather name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Categories" component={Categories} />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppLayout;
