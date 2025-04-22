import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import { AreaItem } from "@/types/area";
import { useAppTheme } from "@/app/_layout";

export default function AreaTags({
  areaData,
  onSelect,
}: {
  areaData: AreaItem[];
  onSelect?: (code: string | null) => void;
}) {
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const {
    colors: { buttonColor, primary },
  } = useAppTheme();

  const handlePress = (code: string) => {
    const newCode = code === selectedCode ? null : code;
    setSelectedCode(newCode);
    onSelect?.(newCode);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flexRow}
      >
        {areaData?.map((item: AreaItem) => {
          const isSelected = selectedCode === item.code;
          return (
            <Pressable
              key={item.code}
              onPress={() => handlePress(item.code)}
              style={[
                styles.tagButtons,
                {
                  backgroundColor: isSelected ? primary : buttonColor,
                  borderColor: buttonColor,
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: isSelected ? "#FFFFFF" : "#000000",
                  },
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  flexRow: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  tagButtons: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    // 그림자 공통 속성
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // 플랫폼별 속성
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 1 },
      },
      android: {
        elevation: 2,
        borderColor: "transparent",
      },
    }),
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
