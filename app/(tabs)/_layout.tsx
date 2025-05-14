import { Tabs } from "expo-router";
import { Icon } from "react-native-paper";
import { useAppTheme } from "@/app/_layout";

export default function TabLayout() {
  const {
    colors: { primary, bottomInactiveColor },
  } = useAppTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: bottomInactiveColor,
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0,
          // FAB.group 형식으로 변경하면서 bottom Tabs hide
          display: "none",
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
  );
}
