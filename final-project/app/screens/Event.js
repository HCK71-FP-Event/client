import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import EventCard from "../components/EventCard";

const Event = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        title: "Event A",
        date: "2024-08-01",
        location: {
          name: "Location A",
          lat: 37.78825,
          lng: -122.4324,
        },
      },
      {
        id: 2,
        title: "Event B",
        date: "2024-08-02",
        location: {
          name: "Location B",
          lat: 37.785834,
          lng: -122.406417,
        },
      },
      {
        id: 3,
        title: "Event C",
        date: "2024-08-03",
        location: {
          name: "Location C",
          lat: 37.7749,
          lng: -122.4194,
        },
      },
    ];

    setData(dummyData);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="keyboard-arrow-left" size={24} color={"#000"} />
        </TouchableOpacity>
        <Text style={styles.headerText}>DetailEvent</Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.eventList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  eventList: {
    flexGrow: 1,
  },
});

export default Event;
