import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState, useContext } from "react";
import Axios from "../utils/axios";
import Svg, { Path } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

const { height } = Dimensions.get("window");

export default function Profile({ navigation }) {
  const [userData, setUserData] = useState({});
  const { setIsLoggedIn } = useContext(AuthContext);

  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("access_token");
      setIsLoggedIn(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  const fetchData = async () => {
    const response = await Axios.get(`/currentUser`);
    setUserData(response.data);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#6a51ae" />
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri:
              userData.coverImage ||
              "https://i.pinimg.com/474x/cd/92/37/cd92379f92f30f07b989a88996c44408.jpg",
          }}
          resizeMode="cover"
          style={styles.headerImage}
        />
        <TouchableOpacity
          onPress={navigateToEditProfile}
          style={styles.editButton}
        >
          <View style={styles.editIconContainer}>
            <Ionicons name="pencil" size={20} color="#333" />
          </View>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <Image
          source={{
            uri:
              userData.avatar ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSviRMCGgqQ4I_iNG11jPQgvSK6SoMKvevcxA&s",
          }}
          resizeMode="cover"
          style={styles.profileImage}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{userData.fullName}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.profileInfoContainer}>
        <View style={styles.detailsCard}>
          {userData.address && (
            <ProfileDetail icon="location" text={userData.address} />
          )}
          {userData.birthOfDate && (
            <ProfileDetail icon="calendar" text={userData.birthOfDate} />
          )}
          {userData.phoneNumber && (
            <ProfileDetail icon="call" text={userData.phoneNumber} />
          )}
          {userData.email && (
            <ProfileDetail icon="mail" text={userData.email} />
          )}
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      <Svg
        height="15%"
        width="100%"
        viewBox="0 0 1440 320"
        style={styles.bottomWave}
      >
        <Path fill="#6a51ae" d="M0,224L1440,64L1440,320L0,320Z" />
      </Svg>
    </SafeAreaView>
  );
}

const ProfileDetail = ({ icon, text }) => (
  <View style={styles.detailContainer}>
    <Ionicons name={icon} size={24} style={styles.detailIcon} color="#777" />
    <Text style={styles.detailText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  headerContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 70,
  },
  headerImage: {
    height: 240,
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  editButton: {
    position: "absolute",
    right: 20,
    top: 40,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  editIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  editText: {
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
  },
  profileImage: {
    height: 140,
    width: 140,
    borderRadius: 70,
    borderColor: "#dcdcdc",
    borderWidth: 3,
    position: "absolute",
    bottom: -70,
    left: "50%",
    marginLeft: -70,
  },
  nameContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  nameText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 24,
  },
  profileInfoContainer: {
    alignItems: "center",
    padding: 20,
    paddingTop: 0,
  },
  detailsCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  detailIcon: {
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#555",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6a51ae",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  bottomWave: {
    position: "absolute",
    bottom: 0,
  },
});
