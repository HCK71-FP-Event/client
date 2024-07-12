// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Home from "../screens/Home.js";
// import AddPost from "../screens/AddPost.js";
// import Profile from "../screens/Profile.js";
// import { Ionicons } from "@expo/vector-icons";
// import { TouchableOpacity, Alert } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext.js";
// import XHeader from "../components/xheader.js";
// import client from "../config/apolloClient.js";

// const Tab = createBottomTabNavigator();

// export default function BottomTabNavigator({ navigation }) {
//   const { setIsLoggedIn } = useContext(AuthContext);

//   async function handleLogout() {
//     try {
//       await client.resetStore();

//       await AsyncStorage.removeItem("access_token");

//       setIsLoggedIn(false);
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     }
//   }

//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: true,
//         headerTitle: () => <XHeader />,
//         headerRight: () => (
//           <TouchableOpacity onPress={handleLogout} style={{ marginRight: 10 }}>
//             <Ionicons name="log-out-outline" size={24} color="#0077b5" />
//           </TouchableOpacity>
//         ),
//         tabBarActiveTintColor: "#0077b5",
//         tabBarInactiveTintColor: "#B1BEC4",
//         tabBarIcon: ({ color, size }) => {
//           let iconName;

//           switch (route.name) {
//             case "Home":
//               iconName = "home";
//               break;
//             case "Post":
//               iconName = "add-circle";
//               break;
//             case "Profile":
//               iconName = "person";
//               break;
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Post" component={AddPost} />
//       <Tab.Screen name="Profile" component={Profile} />
//     </Tab.Navigator>
//   );
// }
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLoginStatus() {
      const token = await AsyncStorage.getItem("access_token");

      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
