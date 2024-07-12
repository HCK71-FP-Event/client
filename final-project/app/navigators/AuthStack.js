// import { createStackNavigator } from "@react-navigation/stack";
// import Login from "../screens/Login";
// import Register from "../screens/Register";

// const Stack = createStackNavigator();

// export default function AuthStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="Register" component={Register} />
//     </Stack.Navigator>
//   );
// }

// AuthStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import LogoTitle from "../components/LogoTitle";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={
          {
            // headerTitle: (props) => <LogoTitle {...props} />,
          }
        }
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}
