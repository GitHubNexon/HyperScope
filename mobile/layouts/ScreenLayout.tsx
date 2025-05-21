import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";
import Header from "../components/Header";

interface ScreenLayoutProps {
  title: string;
  children: React.ReactNode;
  scroll?: boolean;
  rightComponent?: React.ReactNode; // new prop
}

const ScreenLayout = ({
  title,
  children,
  scroll = true,
  rightComponent,
}: ScreenLayoutProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const Container = scroll ? ScrollView : View;

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: theme.background, paddingTop: insets.top },
      ]}
    >
      <Header title={title} rightComponent={rightComponent} />
      <Container
        style={styles.content}
        contentContainerStyle={scroll ? { padding: 20 } : undefined}
      >
        {children}
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default ScreenLayout;
