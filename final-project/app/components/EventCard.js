import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const EventCard = ({ event, user, style, onToggleMap }) => {
  const translateX = useSharedValue(0);
  const navigation = useNavigation();

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

  const handleBuyTicket = () => {
    navigation.navigate("PaymentForm", { event, user });
  };

  if (!event) {
    return null;
  }

  return (
    <View style={[styles.cardContainer, style]}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <View style={styles.contentContainer}>
            <Image
              style={styles.image}
              source={{
                uri: event.imageUrl,
              }}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
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
              <Text style={styles.quantity}>Tickets Left: {event.quantity}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.mapToggle} onPress={onToggleMap}>
                  <Text style={styles.mapToggleText}>Show Map</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={handleBuyTicket}
                >
                  <Text style={styles.buyButtonText}>Buy Ticket</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    marginBottom: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  image: {
    width: 120,
    height: 170,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  categoryContainer: {
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
  },
  category: {
    fontSize: 12,
    color: "#555",
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  quantity: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  mapToggle: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    elevation: 3,
  },
  mapToggleText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  buyButton: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    elevation: 3,
  },
  buyButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default EventCard;
