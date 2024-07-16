import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, View } from "react-native";
import AuthStack from "./AuthStack.js";
import BottomTabNav from "./BottomTabNavigator.js";
import { AuthContext } from "../context/AuthContext.js";
import DetailEventScreen from "../screens/DetailEventScreen";
import PaymentForm from "../screens/PaymentForm";

const Stack = createStackNavigator();

export default function MainStack() {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Main" component={BottomTabNav} />
          <Stack.Screen
            name="DetailEventScreen"
            component={DetailEventScreen}
          />
          <Stack.Screen name="PaymentForm" component={PaymentForm} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
