import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-paper";
import { useAppTheme } from "@/app/_layout";

export default function TabLayout() {
  const {
    colors: { bottomActiveColor, bottomInactiveColor },
  } = useAppTheme();
  return (
    <SafeAreaView style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: bottomActiveColor,
          tabBarInactiveTintColor: bottomInactiveColor,
          tabBarStyle: {
            backgroundColor: "#242E3C",
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="(home)/index"
          options={{
            title: "홈",
            tabBarIcon: ({ focused }) => (
              <Icon
                source="home-variant-outline"
                color={focused ? bottomActiveColor : bottomInactiveColor}
                size={20}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(settings)/index"
          options={{
            title: "설정",
            tabBarIcon: ({ focused }) => (
              <Icon
                source="cog-outline"
                color={focused ? bottomActiveColor : bottomInactiveColor}
                size={20}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242E3C",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
