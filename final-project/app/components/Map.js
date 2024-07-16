import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, View, Text, ActivityIndicator, Pressable } from "react-native";
import Axios from "../utils/axios";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [events, setEvents] = useState([]);
  const pinColor = "#00BFFF";

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      fetchEvents(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchEvents = async (latitude, longitude) => {
    try {
      const response = await Axios.get(
        `/event?long=${longitude}&lat=${latitude}`
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      if (error.response && error.response.status === 401) {
        setErrorMsg("Unauthorized: Please check your login credentials.");
      } else {
        setErrorMsg("Error fetching events: " + error.message);
      }
    }
  };
  console.log(events);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.card}>
          {location ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="You are here"
              />
              {events.map((event) => (
                <Marker
                  key={event.id}
                  coordinate={{
                    latitude: event.location.coordinates[1],
                    longitude: event.location.coordinates[0],
                  }}
                  title={event.name}
                  pinColor={pinColor}
                />
              ))}
            </MapView>
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>{errorMsg || "Waiting.."}</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fafafa",
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
