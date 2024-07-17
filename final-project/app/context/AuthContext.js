import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isIntroSeen, setIsIntroSeen] = useState(null);

  useEffect(() => {
    async function checkLoginStatus() {
      const token = await AsyncStorage.getItem("access_token");
      const introSeen = await AsyncStorage.getItem("introSeen");

      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setIsIntroSeen(introSeen === "true");
    }

    checkLoginStatus();
  }, []);

  const setIntroSeen = async () => {
    try {
      await AsyncStorage.setItem("introSeen", "true");
      setIsIntroSeen(true);
    } catch (error) {
      console.error("Error setting introSeen flag", error);
    }
  };

  const clearIntroSeen = async () => {
    try {
      await AsyncStorage.removeItem("introSeen");
      setIsIntroSeen(false);
    } catch (error) {
      console.error("Error clearing introSeen flag", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isIntroSeen, setIntroSeen, clearIntroSeen }}
    >
      {children}
    </AuthContext.Provider>
  );
}
