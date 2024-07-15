import { useNavigation } from "@react-navigation/native";
import { Button, Image, Text, View } from "react-native";

export default function Card({ data }) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 150,
        width: "100%",
        backgroundColor: "#f3f3f3",
        padding: 10,
        flexDirection: "row",
        gap: 10,
        borderRadius: 7,
        marginBottom: 8,
      }}
    >
      <Image
        style={{ width: 100, height: "100%", borderRadius: 8 }}
        source={{
          uri: data.imageUrl,
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{data.name}</Text>
          <Text style={{ fontSize: 11 }}>{`${data.eventDate}`}</Text>
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
