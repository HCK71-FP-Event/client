import { View, Platform } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Tickets from "../screens/Tickets";
import Profile from "../screens/Profile";
import DetailEventScreen from "../screens/DetailEventScreen";
import EventScreen from "../screens/EventScreen";


const Tab = createBottomTabNavigator();

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

export default function BottomTabNav() {
  return (

    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
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
        component={EventScreen}
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
        component={DetailEventScreen}
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
  );
}
