import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import client from "../config/apolloClient";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {
  const { setIsLoggedIn } = useContext(AuthContext);

  async function handleLogout() {
    try {
      await client.resetStore();

      await AsyncStorage.removeItem("access_token");

      setIsLoggedIn(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 10 }}>
            <Ionicons name="log-out-outline" size={24} color="#0077b5" />
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: "#0077b5",
        tabBarInactiveTintColor: "#B1BEC4",
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}
