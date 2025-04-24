import { Pressable, View } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function GoBackHandler() {
  const router = useRouter();
  return (
    <View>
      <Pressable
        onPress={() => {
          router.back();
        }}
      >
        <ChevronLeft size={32} />
      </Pressable>
    </View>
  );
}
