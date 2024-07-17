import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Tickets from "../screens/Tickets";
import Profile from "../screens/Profile";
import Event from "../screens/Event";
import EventMap from "../screens/EventMap";

import CreateEvent from "../screens/CreateEvent";

import PaymentForm from "../screens/PaymentForm";
import EditProfile from "../screens/EditProfile";
import Ticket from "../screens/Tickets";
import DetailTicket from '../screens/DetailTicket'

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
    height: 50,
    backgroundColor: "#533263",
  },
};

function EventStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EventList" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="EventDetail" component={Event} />
      <Stack.Screen name="PaymentForm" component={PaymentForm} />
    </Stack.Navigator>
  );
}

function EventProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileHome" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}

function EventTicketsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TicketHome" component={Ticket} options={{ headerShown: false }} />
      <Stack.Screen name="TicketDetail" component={DetailTicket} />
    </Stack.Navigator>
  );
}

export default function BottomTabNav() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={EventStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => <Ionicons name="home" size={24} color={focused ? "#F0FFFF" : "#000000"} />,
          }}
        />
        <Tab.Screen
          name="Tickets"
          component={EventTicketsNavigator}
          options={{
            tabBarIcon: ({ focused }) => <Ionicons name="ticket" size={24} color={focused ? "#F0FFFF" : "#000000"} />,
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
          component={CreateEvent} // Use the stack navigator here
          options={{
            tabBarIcon: ({ focused }) => <Ionicons name="add-circle" size={24} color={focused ? "#F0FFFF" : "#000000"} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={EventProfileNavigator}
          options={{
            tabBarIcon: ({ focused }) => <Ionicons name="person" size={24} color={focused ? "#F0FFFF" : "#000000"} />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
