import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IntroScreen1({ navigation }) {
  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/564x/a6/f6/70/a6f67083abbc111c1b4fc1d628efcc07.jpg",
      }}
      style={styles.backgroundImage}
      imageStyle={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.indicators}>
          <View style={[styles.indicator, styles.activeIndicator]} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>
        <Text style={styles.title}>Aplikasi Manajemen Event (M-Event)</Text>
        <Text style={styles.description}>
          Aplikasi manajemen event yang dirancang untuk mempermudah
          penyelenggara acara dalam mengelola dan mempromosikan event mereka.
        </Text>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => navigation.navigate("Intro2")}
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
    opacity: 0.5, // Adjust the opacity as needed
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent background to make text more readable
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
