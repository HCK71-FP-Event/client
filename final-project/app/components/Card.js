import { useNavigation } from "@react-navigation/native";
import { Button, Image, Text, View, StyleSheet } from "react-native";

export default function Card({ data }) {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: data.imageUrl,
        }}
      />
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.title}>{data.name}</Text>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{data.Category.name}</Text>
          </View>
        </View>
        <Button
          onPress={() =>
            navigation.navigate("Details", {
              id: data.id,
            })
          }
          title="Details"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 150,
    width: "100%",
    backgroundColor: "#f3f3f3",
    padding: 10,
    flexDirection: "row",
    gap: 10,
    borderRadius: 7,
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: "100%",
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  categoryContainer: {
    marginTop: 5,
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    paddingHorizontal: 10, 
    paddingVertical: 5,
  },
  category: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#333", // Text color inside the capsule
  },
});
