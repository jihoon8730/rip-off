import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  useTheme,
} from "react-native-paper";

import { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  custom: "property",
  colors: {
    ...DefaultTheme.colors,
    bottomActiveColor: "#FBFFFF",
    bottomInactiveColor: "#808A97",
    backgroundColor: "#232E3C",
  },
};

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
