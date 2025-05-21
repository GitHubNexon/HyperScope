const { exec } = require("child_process");

const dependencies = [
  // 🧩 UI & Components
  "@expo/vector-icons", // Icon support
  "react-native-paper", // Material Design UI
  "react-native-animatable", // Declarative animations
  "react-native-elements", // Cross-platform UI toolkit
  "react-native-toast-message", // Toast notifications
  "react-native-modal", // Modals with animation and flexibility

  // 🧭 Navigation
  "@react-navigation/native", // Navigation core
  "@react-navigation/native-stack", // Native stack navigation
  "@react-navigation/drawer", // Drawer navigation
  "@react-navigation/bottom-tabs", // Bottom tab navigation

  //Context
  "react-native-safe-area-context",

  // ⚙️ Core Expo SDK
  "expo", // Expo runtime
  "expo-font", // Font loading
  "expo-linking", // Deep linking
  "expo-notifications", // Push/local notifications
  "expo-router", // File-based routing
  "expo-splash-screen", // Splash screen config
  "expo-status-bar", // Status bar config
  "expo-system-ui", // System UI config
  "expo-web-browser", // In-app browser
  "expo-image-picker", // Camera/gallery file picker
  "expo-media-library", // Media access
  "expo-file-system", // File access and manipulation
  "expo-location", // Access to GPS/location
  "expo-haptics", // Haptic feedback support

  // 🧠 State Management
  "zustand", // Lightweight global state (React hooks)
  "@reduxjs/toolkit", // Redux state management
  "react-redux", // React bindings for Redux
  "jotai", // Minimal reactive state management
  "recoil", // Facebook's atomic state management

  // 📆 Date/Time
  "moment", // Date/time utils
  "dayjs", // Lightweight date alternative

  // 🔐 Auth/Security
  "@react-native-async-storage/async-storage", // Key-value storage
  "react-native-keychain", // Secure storage
  "bcryptjs", // Password hashing
  "jsonwebtoken", // JWT creation/verification

  // 📦 HTTP & Networking
  "axios", // HTTP client
  "socket.io-client", // Real-time WebSocket

  // 🧾 Forms & Validation
  "react-hook-form", // Form management
  "yup", // Schema validation
  "zod", // TypeScript-friendly validation

  // 📦 Backend / Mock APIs
  "json-server", // Mock REST API
  "lowdb", // Lightweight local DB

  // 🧪 Testing
  "jest", // Testing framework
  "@testing-library/react-native", // UI testing for RN
  "msw", // Mock Service Worker for network request mocking

  // 🌐 Web Compatibility (for Expo Web)
  "react-dom", // React DOM rendering
  "react-native-web", // React Native for web

  // ⚙️ Utility Libraries
  "lodash", // Utility functions
  "uuid", // Unique ID generation
  "qs", // Query string parsing
  "class-validator", // Decorator-based validation
  "styled-components",

  // 📱 Device APIs (optional, but useful)
  "react-native-device-info", // Device specs
  "react-native-localize", // Detect device locale/timezone
  "react-native-permissions", // Manage device permissions
];


const installAll = () => {
  const deps = dependencies.join(" ");
  console.log("Installing dependencies...");
  const command = `npm install ${deps} --save --legacy-peer-deps`; 

  const child = exec(command);

  child.stdout.on("data", (data) => {
    process.stdout.write(data);
  });

  child.stderr.on("data", (data) => {
    process.stderr.write(data);
  });

  child.on("exit", (code) => {
    if (code === 0) {
      console.log("\nAll dependencies installed successfully!");
    } else {
      console.error(`\nInstallation exited with code ${code}`);
    }
  });
};

installAll();
