const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
// metro.config.js
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  "@": "./app",
};

module.exports = wrapWithReanimatedMetroConfig(
  withNativeWind(config, {
    input: "./global.css",
  })
);
