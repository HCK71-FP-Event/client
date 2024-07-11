import { Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/screens/Home";
import NotificationScreen from "./app/screens/NotificationScreen";
import EventScreen from "./app/screens/EventScreen";
import PaymentForm from "./app/screens/PaymentForm";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator;

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="PaymentForm" component={PaymentForm} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Events" component={EventScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleStyle: {
            fontWeight: "semibold",
          },
          // headerTitle: () => {
          //   return (
          //     <Image
          //       style={{ height: 50, width: 100 }}
          //       source={{
          //         uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGMunX7h3P-Y8aCpPC5ebk-aYzfAu4SK1WwQ&s",
          //       }}
          //     />
          //   );
          // },
        }}
        component={MyTabs}
      >
        <Stack.Screen
          name="Payment Form"
          option={{
            title: "Payment Form",
          }}
          component={PaymentForm}
        />
        {/* <Stack.Screen
          name="Home"
          option={{
            title: "Home",
          }}
          component={Home}
        /> */}
        {/* <Stack.Screen
          name="EventScreen"
          option={{
            title: "Event",
          }}
          component={EventScreen}
        /> */}
        {/* <Stack.Screen name="Events" component={EventScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
