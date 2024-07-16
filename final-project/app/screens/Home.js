import React, { useEffect, useState } from "react";
import {
  FlatList,
  StatusBar,
  View,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import Card from "../components/Card";
import Axios from "../utils/axios";

export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async (search = "", filter = "") => {
    try {
      const response = await Axios.get(
        `/allEvent?search=${search}&filter=${filter}`
      );
      setData(response.data.allEvent);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = () => {
    fetchData(search, filter);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search events"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Filter by category"
          value={filter}
          onChangeText={(text) => setFilter(text)}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Card
            data={item}
            onPress={() => navigation.navigate("EventDetail", { id: item.id })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
  },
});
