import AsyncStorage from "@react-native-async-storage/async-storage";

export const setIntroSeen = async () => {
  try {
    await AsyncStorage.setItem("introSeen", "true");
  } catch (error) {
    console.error("Error setting introSeen flag", error);
  }
};

export const getIntroSeen = async () => {
  try {
    const value = await AsyncStorage.getItem("introSeen");
    return value === "true";
  } catch (error) {
    console.error("Error getting introSeen flag", error);
    return false;
  }
};

export const clearIntroSeen = async () => {
  try {
    await AsyncStorage.removeItem("introSeen");
  } catch (error) {
    console.error("Error clearing introSeen flag", error);
  }
};
