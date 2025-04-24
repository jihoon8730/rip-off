import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useAppTheme } from "@/app/_layout";
import GoBackHandler from "@/app/components/GoBackHandler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ImageBackground } from "expo-image";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/app/queryKeys";

export default function DetailsScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const {
    colors: { backgroundColor },
  } = useAppTheme();

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.FESTIVAL.DETAILS, id],
  });
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <GoBackHandler />
      <Text>Details of user {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
