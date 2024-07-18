import React, { useCallback, useState } from "react";
import { View, StatusBar, FlatList, StyleSheet, Text, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import Axios from "../utils/axios";
import Map from "../components/Map";
import Card from "../components/Card";
import { useFocusEffect } from "@react-navigation/native";

export default function EventMap({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
        fetchEvents(location.coords.latitude, location.coords.longitude);
      })();
    }, [])
  );

  const fetchEvents = async (latitude, longitude) => {
    try {
      const { data } = await Axios.get(`/event?lat=${latitude}&long=${longitude}`);
      setData(data);
    } catch (err) {
      console.error(err);
      setErrorMsg("Error fetching events: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Map data={data} userLocation={userLocation} />
      <View style={styles.listContainer}>
        <StatusBar />
        {data.length === 0 ? (
          <Text style={styles.noEventsText}>No events nearby</Text>
        ) : (
          <FlatList data={data} renderItem={({ item }) => <Card data={item} onPress={() => navigation.navigate("EventDetail", { id: item.id })} />} keyExtractor={(item) => item.id.toString()} contentContainerStyle={styles.listContent} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: -20, // To lift the list view slightly above the map
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#333",
  },
  noEventsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888",
  },
  listContent: {
    paddingBottom: 60,
  },
});
