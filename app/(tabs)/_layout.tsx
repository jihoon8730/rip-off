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
            borderRadius: 30,
            height: 60,
            borderTopWidth: 0,
            elevation: 5, // 안드로이드 그림자
            shadowOpacity: 0.5, // iOS 그림자
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
                color={focused ? bottomActiveColor : bottomInactiveColor}
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
                color={focused ? bottomActiveColor : bottomInactiveColor}
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
    backgroundColor: "#242E3C",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
