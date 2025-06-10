import React from "react";
import { View, Text, StyleSheet, Platform } from 'react-native';

interface PlaceAddrProps {
  addr: string;
}

export default function PlaceAddr({ addr }: PlaceAddrProps) {
  return (
    <View style={
      styles.container
    }>
      <Text style={styles.subTitle}>장소</Text>
      <Text>{addr}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  }
})
