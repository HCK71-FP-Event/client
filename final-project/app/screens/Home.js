import React, { useCallback, useState } from "react";
import {
  FlatList,
  StatusBar,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Card from "../components/Card";
import Axios from "../utils/axios";

export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [categories, setCategories] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
      fetchCategoryData();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      fetchData(search, filter);
    }, [filter, search])
  );

  const fetchCategoryData = async () => {
    try {
      const response = await Axios.get("/categories");
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async (search = "", filter = "") => {
    try {
      const response = await Axios.get(
        `/allEvent?search=${search}&filter=${filter}`
      );
      console.log(response.data.allEvent);
      setData(response.data.allEvent);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = () => {
    fetchData(search, filter);
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar animated={true} backgroundColor="#4A148C" hidden={false} />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search events"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "" && styles.filterButtonActive,
            ]}
            onPress={() => setFilter("")}
          >
            <Text style={styles.filterButtonText}>All</Text>
          </TouchableOpacity>
          {categories.map((el, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.filterButton,
                filter === el.name && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(el.name)}
            >
              <Text style={styles.filterButtonText}>{el.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Card
              data={item}
              onPress={() =>
                navigation.navigate("EventDetail", { id: item.id })
              }
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 24,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
  },
  filterButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  filterButtonActive: {
    backgroundColor: "#007bff",
  },
  filterButtonText: {
    color: "#333",
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 10,
  },
});
