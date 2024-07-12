import React from "react";
import { View, Text } from "react-native";
import EventCard from "../components/EventCard"; // Adjust the import path as necessary

export default function DetailEventScreen({ route }) {
  const { event } = route.params; // Ensure event is correctly retrieved from route params

  if (!event) {
    return <Text>No event data available</Text>; // Fallback in case event is undefined
  }

  return (
    <View>
      <EventCard data={event} />
    </View>
  );
}
