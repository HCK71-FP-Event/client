import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";

const EventCard = ({ event }) => {
  const translateX = useSharedValue(0);
  const [mapVisible, setMapVisible] = useState(false);

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

  const toggleMap = () => {
    setMapVisible((prev) => !prev);
  };

  if (!event) {
    return null;
  }

  return (
    <View style={styles.cardContainer}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <View style={styles.cardContent}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.date}>{event.date || "2024-08-01"}</Text>
            <Text style={styles.location}>
              {event.location && event.location.name
                ? event.location.name
                : "Unknown Location"}
            </Text>
          </View>
          <TouchableOpacity style={styles.mapToggle} onPress={toggleMap}>
            <Text style={styles.mapToggleText}>
              {mapVisible ? "Hide Map" : "Show Map"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
      {mapVisible &&
        event.location &&
        event.location.lat &&
        event.location.lng && (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: event.location.lat,
                longitude: event.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: event.location.lat,
                  longitude: event.location.lng,
                }}
                title={event.title || "Event Title"}
                description={event.location.name || "Location Name"}
              />
            </MapView>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    width: "80%",
    height: 200,
    position: "relative",
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapToggle: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 5,
    borderRadius: 5,
    zIndex: 1,
  },
  mapToggleText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
});

export default EventCard;
