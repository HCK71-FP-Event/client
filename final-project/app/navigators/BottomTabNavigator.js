import React, { useContext } from "react";
import {
  View,
  Platform,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Tickets from "../screens/Tickets";
import Profile from "../screens/Profile";
import Event from "../screens/Event";
import EventMap from "../screens/EventMap";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "#533263",
  },
};

function EventStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EventList"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="EventDetail" component={Event} />
    </Stack.Navigator>
  );
}

export default function BottomTabNav() {
  const { setIsLoggedIn } = useContext(AuthContext);

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("access_token");
      setIsLoggedIn(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={EventStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                size={24}
                color={focused ? "#F0FFFF" : "#000000"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Tickets"
          component={Tickets}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="ticket"
                size={24}
                color={focused ? "#F0FFFF" : "#000000"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="EventScreen"
          component={EventMap}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#533263",
                  height: Platform.OS === "ios" ? 50 : 60,
                  width: Platform.OS === "ios" ? 50 : 60,
                  top: Platform.OS === "ios" ? -10 : -20,
                  borderRadius: Platform.OS === "ios" ? 25 : 30,
                  borderWidth: 2,
                  borderColor: "#fff",
                }}
              >
                <Ionicons name="location" size={24} color={"#fff"} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Events"
          component={Tickets} // Use the stack navigator here
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="calendar-number-sharp"
                size={24}
                color={focused ? "#F0FFFF" : "#000000"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person"
                size={24}
                color={focused ? "#F0FFFF" : "#000000"}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color={"#fff"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#533263",
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
