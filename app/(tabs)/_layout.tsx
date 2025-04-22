import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-paper";
import { useAppTheme } from "@/app/_layout";

export default function TabLayout() {
  const {
    colors: { primary, bottomInactiveColor, backgroundColor },
  } = useAppTheme();
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: primary,
          tabBarInactiveTintColor: bottomInactiveColor,
          tabBarStyle: {
            borderRadius: 30,
            height: 60,
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "홈",
            tabBarIcon: ({ focused }) => (
              <Icon
                source="home-variant-outline"
                color={focused ? primary : bottomInactiveColor}
                size={25}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(settings)"
          options={{
            title: "설정",
            tabBarIcon: ({ focused }) => (
              <Icon
                source="cog-outline"
                color={focused ? primary : bottomInactiveColor}
                size={25}
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
  },
});
