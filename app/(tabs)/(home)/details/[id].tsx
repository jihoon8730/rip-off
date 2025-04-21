import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useAppTheme } from "@/app/_layout";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const {
    colors: { backgroundColor },
  } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}
    >
      <Text>Details of user {id} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
