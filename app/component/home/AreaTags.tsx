import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function AreaTags() {
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#D3D3D3" : "#FFFFFF",
            },
          ]}
          onPress={() => console.log("Area 1 Pressed")}
        >
          <Text>111</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  flexRow: {
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
