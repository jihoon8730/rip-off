import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  FAB,
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Portal,
  useTheme,
} from "react-native-paper";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { Home, Plus, X, Settings } from "lucide-react-native";
import { useRouter } from "expo-router";

SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  custom: "property",
  colors: {
    ...DefaultTheme.colors,
    primary: "#3D70F6",
    bottomInactiveColor: "#B5B5B5",
    backgroundColor: "#FFFFFF",
    buttonColor: "#FFFFFF",
    inputColor: "#FFFFFF",
  },
};

export type AppTheme = typeof theme;
const queryClient = new QueryClient();

export const useAppTheme = () => useTheme<AppTheme>();

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  const router = useRouter();
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }: any) => setState({ open });

  const { open } = state;

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
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <Portal>
          <FAB.Group
            open={open}
            visible
            icon={
              open
                ? (props) => <X {...props} />
                : (props) => <Plus {...props} />
            }
            color="#3D70F6"
            fabStyle={{
              backgroundColor: "#FFFFFF",
            }}
            backdropColor="rgba(0, 0, 0, 0.5)"
            actions={[
              {
                icon: (props) => <Home {...props} color="#3D70F6" />,
                label: "홈",
                onPress: () => router.push("/(tabs)/(home)"),
                style: { backgroundColor: "#FFFFFF" },
                labelStyle: { color: "#FFFFFF" },
              },
              {
                icon: (props) => <Settings {...props} color="#3D70F6" />,
                label: "설정",
                onPress: () => router.push("/(tabs)/(settings)"),
                style: { backgroundColor: "#FFFFFF" },
                labelStyle: { color: "#FFFFFF" },
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
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
    </QueryClientProvider>
  );
}
