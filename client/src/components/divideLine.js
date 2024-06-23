import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function DivideLine() {
  return <View style={styles.lineStyle} />;
}

const styles = StyleSheet.create({
  lineStyle: {
    marginTop: -2,
    borderWidth: 0.5,
    width: 290,
    opacity: 0.5,
    margin: 10,
  },
});
