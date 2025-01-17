import React from "react";
import { Text } from "@rneui/themed";
import { StyleSheet } from "react-native";

const Heading = ({ title, ...size }) => (
  <Text {...size} style={styles.heading}>
    {title}
  </Text>
);

const styles = StyleSheet.create({
  heading: {
    color: "#533263",
    fontWeight: "bold",
  },
});

export default Heading;
