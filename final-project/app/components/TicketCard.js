import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { Easing, useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import Axios from "../utils/axios";

export default function TicketCard({ data, onPress }) {
//   const { id } = data;
  const scale = useSharedValue(1);
//   const [ticket, setTicket] = useState("");

//   const fetchData = async () => {
//     const response = await Axios.get(`/transactions/${id}`);
//     setTicket(response.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   console.log(ticket, "ticket");

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
      <TouchableOpacity style={styles.card} onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={0.8}>
        <Image
          style={styles.image}
          source={{
            uri: data.Event.imageUrl,
          }}
        />
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.title}>{data.Event.name}</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>Quantity: {data.quantity}</Text>
            </View>
            <View style={styles.dateContainer}>
              {new Date(data.Event.eventDate) > new Date() ? (
                <Text style={{ fontSize: 12, fontWeight: "bold", color: "green" }}>Event Date: {data.Event.eventDate.slice(0, 10)}</Text>
              ) : (
                <Text style={{ fontSize: 12, fontWeight: "bold", color: "red" }}>Event Date: {data.Event.eventDate.slice(0, 10)}</Text>
              )}
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
  dateContainer: {
    marginTop: 5,
    alignSelf: "flex-start",
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
