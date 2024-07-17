import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import Axios from "../utils/axios";
import EventCard from "../components/EventCard";
import MapView, { Marker } from "react-native-maps";

const Event = ({ route }) => {
  const { id } = route.params;
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    fetchEventDetail();
  }, [id]);

  const fetchEventDetail = async () => {
    try {
      const response = await Axios.get(`/allEvent/${id}`);
      console.log(response.data.user);
      setUser(response.data.user);
      setEvent(response.data.eventById);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMap = () => {
    setMapVisible((prev) => !prev);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Failed to load event data</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No event data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <EventCard
        event={event}
        user={user}
        style={styles.eventCard}
        onToggleMap={handleToggleMap}
      />
      <Modal visible={mapVisible} animationType="slide">
        <View style={styles.fullScreenMapContainer}>
          <MapView
            style={styles.fullScreenMap}
            initialRegion={{
              latitude: event.location.coordinates[1],
              longitude: event.location.coordinates[0],
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: event.location.coordinates[1],
                longitude: event.location.coordinates[0],
              }}
              title={event.name}
              description={event.Category?.name}
            />
          </MapView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleToggleMap}
          >
            <Text style={styles.closeButtonText}>Close Map</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  eventCard: {
    margin: 1,
  },
  fullScreenMapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenMap: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Event;
