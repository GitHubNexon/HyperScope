import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import dayjs from "dayjs";

interface HeaderProps {
  title: string;
  rightComponent?: React.ReactNode;
}

const Header = ({ title, rightComponent }: HeaderProps) => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <AppText size={20} weight="SemiBold" style={styles.title}>
        {title}
      </AppText>
      <View style={styles.rightSide}>
        <View style={styles.timeContainer}>
          <AppText size={16} weight="Medium" style={styles.time}>
            {currentTime.format("HH:mm:ss")}
          </AppText>
          <AppText size={12} weight="Light" style={styles.date}>
            {currentTime.format("MM/DD/YYYY")}
          </AppText>
        </View>
        {rightComponent && (
          <View style={styles.rightComponent}>{rightComponent}</View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    flex: 1,
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeContainer: {
    alignItems: "flex-end",
  },
  rightComponent: {
    marginLeft: 15,
  },
  time: {
    marginBottom: 2,
  },
  date: {
    opacity: 0.8,
  },
});

export default Header;
