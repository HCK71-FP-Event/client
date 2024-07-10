import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default function Map() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <MapView style={styles.map} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingTop: 20,
  },
  card: {
    width: "90%",
    height: "40%",
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
