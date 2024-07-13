import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Permissions from "expo-permissions";

const imageDataURL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSviRMCGgqQ4I_iNG11jPQgvSK6SoMKvevcxA&s";

export default function EditProfile({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(imageDataURL);
  const [email, setEmail] = useState("jou@mail.com");
  const [password, setPassword] = useState("shalinka");
  const [fullName, setFullName] = useState("Joufando Anggol");
  const [phoneNumber, setPhoneNumber] = useState("08123456789");
  const [address, setAdress] = useState("Jl. Bukit golf pondok indah");

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split("T")[0];

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [startedDate, setStartedDate] = useState("12/12/2023");

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Permissions.askAsync(
        Permissions.CAMERA
      );
      const { status: mediaLibraryStatus } = await Permissions.askAsync(
        Permissions.MEDIA_LIBRARY
      );

      if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
        alert(
          "Sorry, we need camera and media library permissions to make this work!"
        );
      }
    })();
  }, []);

  const handleChangeStartDate = (event, date) => {
    const selectedDate = date || selectedStartDate;
    setOpenStartDatePicker(false);
    setSelectedStartDate(selectedDate);
    setStartedDate(selectedDate.toLocaleDateString());
  };

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  function renderDatePicker() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openStartDatePicker}
      >
        <View
          style={{
            margin: 20,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            padding: 35,
            width: "90%",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <DateTimePicker
            mode="date"
            value={selectedStartDate}
            minimumDate={new Date(startDate)}
            onChange={handleChangeStartDate}
          />

          <TouchableOpacity onPress={handleOnPressStartDate}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <Ionicons name="arrow-back" size={24} color={"#000"} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Edit Profile
        </Text>
      </View>

      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <TouchableOpacity onPress={handleUploadImage}>
            <Image
              source={{ uri: selectedImage }}
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: "#fff",
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                zIndex: 9999,
                backgroundColor: "#533263",
                borderRadius: 16,
                padding: 2,
              }}
            >
              <Ionicons name="camera" size={32} color={"#fff"} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <TouchableOpacity onPress={handleTakePhoto}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 50,
                width: 150,
                borderRadius: 25,
                backgroundColor: "#533263",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Take Photo
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text>Email</Text>
            <View
              style={{
                height: 40,
                width: "100%",
                borderColor: "#C5C6C7",
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={email}
                onChangeText={(value) => setEmail(value)}
                editable={true}
              />
            </View>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text>Password</Text>
            <View
              style={{
                height: 40,
                width: "100%",
                borderColor: "#C5C6C7",
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={password}
                onChangeText={(value) => setPassword(value)}
                editable={true}
                secureTextEntry
              />
            </View>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text>Full Name</Text>
            <View
              style={{
                height: 40,
                width: "100%",
                borderColor: "#C5C6C7",
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={fullName}
                onChangeText={(value) => setFullName(value)}
                editable={true}
              />
            </View>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text>Date of Birth</Text>
            <TouchableOpacity
              onPress={handleOnPressStartDate}
              style={{
                height: 40,
                width: "100%",
                borderColor: "#C5C6C7",
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <Text>{selectedStartDate.toDateString()}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text>Phone Number</Text>
            <View
              style={{
                height: 40,
                width: "100%",
                borderColor: "#C5C6C7",
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={phoneNumber}
                onChangeText={(value) => setPhoneNumber(value)}
                editable={true}
              />
            </View>
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text>Address</Text>
            <View
              style={{
                height: 40,
                width: "100%",
                borderColor: "#C5C6C7",
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={address}
                onChangeText={(value) => setAdress(value)}
                editable={true}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 22,
          }}
        >
          <TouchableOpacity
            onPress={() => console.log("Profile Updated")}
            style={{
              height: 50,
              width: 250,
              borderRadius: 25,
              backgroundColor: "#533263",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {renderDatePicker()}
    </SafeAreaView>
  );
}
