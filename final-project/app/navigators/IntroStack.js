import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import IntroScreen1 from "../screens/IntroScreen1";
import IntroScreen2 from "../screens/IntroScreen2";
import IntroScreen3 from "../screens/IntroScreen3";

const Stack = createStackNavigator();

export default function IntroStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Intro1" component={IntroScreen1} />
      <Stack.Screen name="Intro2" component={IntroScreen2} />
      <Stack.Screen name="Intro3" component={IntroScreen3} />
    </Stack.Navigator>
  );
}
