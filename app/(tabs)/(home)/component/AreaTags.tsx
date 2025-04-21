import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
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
    colors: { buttonColor, buttonActiveColor },
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
                  backgroundColor: isSelected ? buttonActiveColor : buttonColor,
                  borderColor: buttonColor,
                },
              ]}
            >
              <Text style={[styles.buttonText]}>{item.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  flexRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 15,
  },
  tagButtons: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#eeeeee",
  },
});
