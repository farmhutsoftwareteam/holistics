const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

module.exports = {
  name: "holistics",
  slug: "holistics",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/Symbol.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/Symbol.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/Symbol.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        // Use a custom splash image that matches our logo
        image: "./assets/images/Symbol.png", // Using existing splash icon
        imageResizeMode: "contain",
        backgroundColor: "#ECF0EB", // Match our app's background color
      },
    ],
    "expo-font",
  ],
  experiments: {
    typedRoutes: true,
  },
};
