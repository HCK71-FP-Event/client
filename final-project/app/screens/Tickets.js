import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList } from "react-native";
import Axios from "../utils/axios";
import TicketCard from "../components/TicketCard";
import { useFocusEffect } from "@react-navigation/native";


export default function Ticket({ navigation }) {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await Axios.get(`/transactions`);
    setData(response.data);
  };

  useFocusEffect(
    useCallback(() => {
    fetchData();
  }, []));
  return (
    <SafeAreaView style={styles.container}>
      <Text>My Tickets</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => <TicketCard data={item} onPress={() => navigation.navigate("TicketDetail", { id: item.id })} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContainer: {
    padding: 20,
  },
});
