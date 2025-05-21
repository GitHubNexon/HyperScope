import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AppText from "./AppText"; // Make sure path is correct

const STATUS_CONFIG = {
  info: { color: "#2196F3", icon: "info" },
  success: { color: "#4CAF50", icon: "check-circle" },
  warning: { color: "#FF9800", icon: "warning" },
  error: { color: "#F44336", icon: "error" },
};

type ToastProps = {
  message?: string;
  time?: number;
  isInfo?: boolean;
  isSuccess?: boolean;
  isWarning?: boolean;
  isError?: boolean;
  onClose?: () => void;
  style?: ViewStyle;
};

export const Toast = ({
  message = "Something happened!",
  time = 5000,
  isInfo,
  isSuccess,
  isWarning,
  isError,
  onClose,
  style,
}: ToastProps) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const status = isSuccess
    ? "success"
    : isWarning
    ? "warning"
    : isError
    ? "error"
    : "info";

  const { color, icon } = STATUS_CONFIG[status];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    timerRef.current = setTimeout(() => {
      closeToast();
    }, time);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const closeToast = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onClose) onClose();
    });
  };

  return (
    <TouchableWithoutFeedback onPress={closeToast}>
      <Animated.View
        style={[
          styles.toast,
          {
            backgroundColor: color,
            opacity,
            transform: [{ translateY }],
          },
          style,
        ]}
      >
        <MaterialIcons name={icon} size={24} color="#fff" />
        <AppText style={styles.message} size={16} color="#fff">
          {message}
        </AppText>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    zIndex: 9999,
  },
  message: {
    marginLeft: 10,
    flex: 1,
  },
});
