import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

export default function Card({ data, onPress }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.95, {
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, {
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    });
  };

  return (
    <Animated.View style={[styles.cardContainer, animatedStyle]}>
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Image
          style={styles.image}
          source={{
            uri: data.imageUrl,
          }}
        />
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.title}>{data.name}</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{data.Category.name}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.detailsButton} onPress={onPress}>
            <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    height: 150,
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
    gap: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
  },
  image: {
    width: 100,
    height: "100%",
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  categoryContainer: {
    marginTop: 5,
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  category: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    textAlign: "center",
  },
  detailsButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 5,
  },
});
