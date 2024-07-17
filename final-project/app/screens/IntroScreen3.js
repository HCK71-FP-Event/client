import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IntroScreen3({ navigation }) {
  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/564x/a6/f6/70/a6f67083abbc111c1b4fc1d628efcc07.jpg",
      }} // Replace with your image URL
      style={styles.backgroundImage}
      imageStyle={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.indicators}>
          <View style={styles.indicator} />
          <View style={styles.indicator} />
          <View style={[styles.indicator, styles.activeIndicator]} />
        </View>
        <Text style={styles.title}>Fitur Aplikasi</Text>
        <Text style={styles.description}>
          Nikmati fitur-fitur seperti tracking event terdekat dengan pin point lokasi, pembelian ticket event, serta anda juga dapat membuat event anda sendiri!!!
        </Text>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Ionicons name="arrow-forward-circle" size={48} color="black" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  image: {
    opacity: 0.5,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  indicators: {
    flexDirection: "row",
    marginTop: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "gray",
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  arrowButton: {
    marginBottom: 30,
  },
});
