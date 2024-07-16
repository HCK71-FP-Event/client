import React from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function Profile({ navigation }) {
  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="auto" backgroundColor="#808080" />
      <View style={{ width: "100%", position: "relative" }}>
        <Image
          source={{
            uri: "https://i.pinimg.com/474x/cd/92/37/cd92379f92f30f07b989a88996c44408.jpg",
          }}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
          }}
        />
        <TouchableOpacity
          onPress={navigateToEditProfile}
          style={{
            position: "absolute",
            right: 2,
            backgroundColor: "transparent",
            paddingVertical: 5,
            paddingHorizontal: 2,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.2, // Ubah dari "20%" menjadi 0.2 untuk nilai opacity
            }}
          >
            <Ionicons name="pencil" size={20} color="black" />
          </View>
          <Text
            style={{
              marginLeft: 8,
              marginHorizontal: 2,
              marginVertical: 2,
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSviRMCGgqQ4I_iNG11jPQgvSK6SoMKvevcxA&s",
          }}
          resizeMode="contain"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: "#0000ff",
            borderWidth: 2,
            marginTop: -50,
          }}
        />

        <Text
          style={{
            marginVertical: 2,
            color: "#0000ff",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Joufando
        </Text>

        <View style={{ flexDirection: "row", marginVertical: 2, alignItems: "center" }}>
          <Ionicons name="location" size={24} color="black" />
          <Text>Jakarta, Indonesia</Text>
        </View>

        <View style={{ flex: 1, flexDirection: "row", marginVertical: 2 }}>
          <View style={{ flexDirection: "column", alignItems: "center", marginHorizontal: 6 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#0000ff" }}>5</Text>
            <Text style={{ fontSize: 12, fontWeight: "normal" }}>Interests</Text>
          </View>
          <View style={{ flexDirection: "column", alignItems: "center", marginHorizontal: 6 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#0000ff" }}>2</Text>
            <Text style={{ fontSize: 12, fontWeight: "normal" }}>Tickets</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
