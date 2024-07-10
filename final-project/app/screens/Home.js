import { useEffect, useState } from "react";
import { FlatList, StatusBar, View, StyleSheet } from "react-native";
import Card from "../components/Card";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar />
      <FlatList
        data={data}
        renderItem={({ item }) => <Card data={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    gap: 10,
  },
});
