import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";


const EventCard = ({ event, style, onToggleMap, onBuyTicket }) => {
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (_) => {
      translateX.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  if (!event) {
    return null;
  }

  return (
    <View style={[styles.cardContainer, style]}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Image
            style={styles.image}
            source={{
              uri: event.imageUrl,
            }}
          />
          <View style={styles.cardContent}>
            <Text style={styles.title}>{event.name}</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{event.Category.name}</Text>
            </View>
            <Text style={styles.date}>
              {event.eventDate
                ? new Date(event.eventDate).toLocaleDateString()
                : "Unknown Date"}
            </Text>
            <Text style={styles.description}>{event.description}</Text>
            <Text style={styles.quantity}>Quantity: {event.quantity}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.mapToggle} onPress={onToggleMap}>
              <Text style={styles.mapToggleText}>Show Map</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyButton} onPress={onBuyTicket}>
              <Text style={styles.buyButtonText}>Buy Ticket</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  categoryContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  category: {
    fontSize: 14,
    color: "#555",
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  quantity: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  mapToggle: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  mapToggleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  buyButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buyButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default EventCard;
