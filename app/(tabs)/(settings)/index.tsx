import { View, StyleSheet, Text } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    backgroundColor: "#242E3C",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FBFFFF",
    fontSize: 24,
  },
});
