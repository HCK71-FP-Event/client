import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainStack from "./app/navigators/MainStack";
import AuthProvider from "./app/context/AuthContext";
import Home from "./app/screens/Home";

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn);

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    // Hides native splash screen after 2s
    const hideSplashScreen = async () => {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 2000);
    };

    hideSplashScreen();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainStack" component={MainStack} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#aabbcc",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
