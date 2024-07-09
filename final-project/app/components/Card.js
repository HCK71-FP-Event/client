import { Button, Image, Text, View } from "react-native";

export default function Card({ data }) {
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
          uri: `https://picsum.photos/200/300?random=${data.id}`,
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {data.title.substring(0, 20)}
          </Text>
          <Text style={{ fontSize: 11 }}>{data.body.substring(0, 50)}</Text>
        </View>
        <Button title="Kill Him!!" />
      </View>
    </View>
  );
}
