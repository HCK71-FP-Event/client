import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Axios from "../utils/axios";

const imageDataURL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSviRMCGgqQ4I_iNG11jPQgvSK6SoMKvevcxA&s";


export default function EditProfile({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(imageDataURL);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthOfDate, setBirthOfDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const fetchData = async () => {
    try {
      const response = await Axios.get("/currentUser");
      setEmail(response.data.email);
      setFullName(response.data.fullName);
      setPhoneNumber(response.data.phoneNumber);
      setAddress(response.data.address);
      setBirthOfDate(response.data.birthOfDate);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (
        cameraStatus.status !== "granted" ||
        mediaLibraryStatus.status !== "granted"
      ) {
        Alert.alert(
          "Permissions required",
          "Sorry, we need camera and media library permissions to make this work!"
        );
      }
    })();
  }, []);


  const handleChangeStartDate = (event, date) => {
    if (date) {
      setSelectedStartDate(date);
    }
    setOpenStartDatePicker(false);
  };

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  const handleTakePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await Axios.put("/user", {
        email: email,
        fullName: fullName,
        phoneNumber: phoneNumber,
        address: address,
        birthOfDate: birthOfDate,
      });
      if (response.status === 200) {
        Alert.alert(
          "Success",
          "Profile updated successfully!",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("ProfileHome"),
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setBirthOfDate(date.toISOString().split("T")[0]); // Format date to YYYY-MM-DD
    hideDatePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header} />
      <ScrollView>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleUploadImage}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.profileImage}
            />
            <View style={styles.cameraIconContainer}>
              <Ionicons name="camera" size={32} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.takePhotoContainer}>
          <TouchableOpacity onPress={handleTakePhoto}>
            <View style={styles.takePhotoButton}>
              <Text style={styles.takePhotoButtonText}>Take Photo</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text>Email</Text>
          <View style={styles.inputBox}>
            <TextInput
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text>Full Name</Text>
          <View style={styles.inputBox}>
            <TextInput
              value={fullName}
              onChangeText={(value) => setFullName(value)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text>Date of Birth</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <View style={styles.inputBox}>
              <Text>{birthOfDate || "Select Date"}</Text>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Phone Number</Text>
          <View style={styles.inputBox}>
            <TextInput
              value={phoneNumber}
              onChangeText={(value) => setPhoneNumber(value)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text>Address</Text>
          <View style={styles.inputBox}>
            <TextInput
              value={address}
              onChangeText={(value) => setAddress(value)}
            />
          </View>
        </View>

        <View style={styles.saveButtonContainer}>
          <TouchableOpacity
            onPress={handleUpdateProfile}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 22,
  },
  header: {
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 22,
  },
  profileImage: {
    height: 170,
    width: 170,
    borderRadius: 85,
    borderWidth: 2,
    borderColor: "#fff",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 10,
    zIndex: 9999,
    backgroundColor: "#533263",
    borderRadius: 16,
    padding: 2,
  },
  takePhotoContainer: {
    alignItems: "center",
    marginVertical: 22,
  },
  takePhotoButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 150,
    borderRadius: 25,
    backgroundColor: "#533263",
  },
  takePhotoButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "column",
    marginBottom: 6,
  },
  inputBox: {
    height: 40,
    width: "100%",
    borderColor: "#C5C6C7",
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 6,
    justifyContent: "center",
    paddingLeft: 8,
  },
  saveButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 22,
  },
  saveButton: {
    height: 50,
    width: 250,
    borderRadius: 25,
    backgroundColor: "#533263",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
};
