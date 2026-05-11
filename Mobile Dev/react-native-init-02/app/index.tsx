import React, { useState } from "react";

import {
  StyleSheet,
  Switch,
  Text,
  useColorScheme,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const systemScheme = useColorScheme();

  // Initial value from system theme
  const [isDarkMode, setIsDarkMode] =
    useState(systemScheme === "dark");

  const theme = {
    light: {
      background: "#F7F7F7",
      card: "#FFFFFF",
      text: "#222222",
    },

    dark: {
      background: "#121212",
      card: "#1E1E1E",
      text: "#FFFFFF",
    },
  };

  const currentTheme = isDarkMode
    ? theme.dark
    : theme.light;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            currentTheme.background,
        },
      ]}
    >
      <View style={styles.row}>
        <Text
          style={[
            styles.title,
            {
              color: currentTheme.text,
            },
          ]}
        >
          Dark Mode
        </Text>

        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
        />
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor:
              currentTheme.card,
          },
        ]}
      >
        <Text
          style={{
            color: currentTheme.text,
          }}
        >
          Theme Switching
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
  },

  card: {
    padding: 20,
    borderRadius: 20,
  },
});