import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import AppText from "./AppText";

type DialogProps = {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  isProceed?: string;
  isCanceled?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isOpen: boolean;
};

export default function Dialog({
  icon,
  title = "Are you sure?",
  description = "This action cannot be undone. Please confirm to proceed.",
  isProceed = "Yes, Proceed",
  isCanceled = "Cancel",
  onConfirm,
  onCancel,
  isOpen,
}: DialogProps) {
  const theme = useTheme();

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isOpen}
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={[styles.dialog, { backgroundColor: theme.background }]}>
          <View style={styles.icon}>
            {icon || (
              <MaterialIcons name="warning" size={36} color={theme.primary} />
            )}
          </View>
          <AppText
            weight="bold"
            size={20}
            style={styles.title}
            color={theme.text}
          >
            {title}
          </AppText>
          <AppText size={16} style={styles.description} color={theme.text}>
            {description}
          </AppText>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.cancel, { backgroundColor: theme.primary + "20" }]}
              onPress={onCancel}
            >
              <AppText size={16} color={theme.text}>
                {isCanceled}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.proceed, { backgroundColor: theme.primary }]}
              onPress={onConfirm}
            >
              <AppText size={16} color="#fff">
                {isProceed}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dialog: {
    width: 300,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    marginBottom: 20,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancel: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  proceed: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});
