import React, { useEffect, useState } from "react";
import { View, StatusBar, FlatList, StyleSheet } from "react-native";
import Axios from "../utils/axios";
import Map from "../components/Map";
import Card from "../components/Card";

export default function EventMap() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get("/event");
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Map data={data} />
      <View style={styles.listContainer}>
        <StatusBar />
        <FlatList
          data={data}
          renderItem={({ item }) => <Card data={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    // padding: 20,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#fafafa",
    // padding: 10,
    marginBottom: 60,
  },
});
