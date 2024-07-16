import React, { useEffect, useState } from "react";
import { View, StatusBar, FlatList, StyleSheet, Text, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import Axios from "../utils/axios";
import Map from "../components/Map";
import Card from "../components/Card";

export default function EventMap() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchEvents(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

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
        <Text>Loading events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Map data={data} />
      <View style={styles.listContainer}>
        <StatusBar />
        {data.length === 0 ? (
          <Text style={styles.noEventsText}>No events nearby</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => <Card data={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
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
    backgroundColor: "#fafafa",
    marginBottom: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noEventsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888",
  },
});
