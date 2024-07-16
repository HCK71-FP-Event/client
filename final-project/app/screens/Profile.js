import React from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Axios from "../utils/axios";

export default function Profile({ navigation }) {
  const [userData, setUserData] = useState({});
  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const fetchData = async () => {
    const response = await Axios.get(`/currentUser`);
    setUserData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" backgroundColor="#808080" />
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: "https://i.pinimg.com/474x/cd/92/37/cd92379f92f30f07b989a88996c44408.jpg",
          }}
          resizeMode="cover"
          style={styles.headerImage}
        />
        <TouchableOpacity onPress={navigateToEditProfile} style={styles.editButton}>
          <View style={styles.editIconContainer}>
            <Ionicons name="pencil" size={20} color="black" />
          </View>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfoContainer}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSviRMCGgqQ4I_iNG11jPQgvSK6SoMKvevcxA&s",
          }}
          resizeMode="contain"
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>{userData.fullName}</Text>
        {userData.address && <ProfileDetail icon="location" text={userData.address} />}
        {userData.birthOfDate && <ProfileDetail icon="calendar" text={userData.birthOfDate} />}
        {userData.phoneNumber && <ProfileDetail icon="call" text={userData.phoneNumber} />}
        {userData.email && <ProfileDetail icon="mail" text={userData.email} />}
      </View>
    </SafeAreaView>
  );
}

const ProfileDetail = ({ icon, text }) => (
  <View style={styles.detailContainer}>
    <Ionicons name={icon} size={24} style={styles.detailIcon} color="black" />
    <Text style={styles.detailText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    width: "100%",
    position: "relative",
  },
  headerImage: {
    height: 228,
    width: "100%",
  },
  editButton: {
    position: "absolute",
    right: 10,
    top: 30,
    backgroundColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.7,
  },
  editIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  editText: {
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 16,
  },
  profileInfoContainer: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  profileImage: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: "#0000ff",
    borderWidth: 2,
    marginTop: -50,
  },
  nameText: {
    marginVertical: 10,
    color: "#0000ff",
    fontWeight: "bold",
    fontSize: 18,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'center',
    marginVertical: 15, // Increase margin between rows
    // paddingHorizontal: 102,
    paddingHorizontal: 20,
  },
  detailIcon: {
    width: 30,
    textAlign: "center",
    marginRight: 10
  },
  detailText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
    textAlign: "left",
  },
});
