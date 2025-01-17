import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ErrorMessage = ({ errorValue }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: -20,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
  },
});

export default ErrorMessage;
