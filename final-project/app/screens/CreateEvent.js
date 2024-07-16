import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Axios from "../utils/axios";
import axios from "axios";

const CreateEvent = ({ navigation }) => {
  // const navigation = useNavigation();
  const [eventName, setEventName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("sport"); // Default category
  const [eventDate, setEventDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowDatePicker(Platform.OS === "ios");
    setEventDate(currentDate);
  };

  const fetchCategoryData = async () => {
    const response = await Axios.get("/categories");
    setCategories(response.data);
  };

  const fetchData = async () => {
    const response = await Axios.get("/allEvent");
    setEvents(response.data);
  };

  const handleSubmit = async () => {
    try {
      // Handle submission logic here, e.g., sending data to server
      console.log("Submitting event:", {
        eventName,
        imageUrl,
        longitude,
        latitude,
        category,
        eventDate: eventDate.toISOString(),
        description,
        quantity,
      });

      console.log("sebelum await");

      //   await Axios({
      //     method: "POST",
      //   url: "/event",
      // data: {
      //   name: eventName,
      //   imageUrl: imageUrl,
      //   long: parseFloat(longitude),
      //   lat: parseFloat(latitude),
      //   CategoryId: category,
      //   eventDate,
      //   quantity,
      //   description: description,
      // }},
      //   );

      const result = await Axios.post("/event", {
        name: eventName,
        imageUrl: imageUrl,
        long: parseFloat(longitude),
        lat: parseFloat(latitude),
        CategoryId: category,
        eventDate: eventDate,
        quantity: quantity,
        description: description,
      });

      // Assuming navigation to another screen after submission
      navigation.navigate("Home"); // Navigate back after submission
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchCategoryData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.label}>Nama Event:</Text>
        <TextInput
          style={styles.input}
          value={eventName}
          onChangeText={setEventName}
          placeholder="Nama Event"
        />

        <Text style={styles.label}>URL Gambar:</Text>
        <TextInput
          style={styles.input}
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="URL Gambar"
        />

        <Text style={styles.label}>Longitude:</Text>
        <TextInput
          style={styles.input}
          value={longitude}
          onChangeText={setLongitude}
          keyboardType="numeric"
          placeholder="Longitude"
        />

        <Text style={styles.label}>Latitude:</Text>
        <TextInput
          style={styles.input}
          value={latitude}
          onChangeText={setLatitude}
          keyboardType="numeric"
          placeholder="Latitude"
        />

        <Text style={styles.label}>Quantity:</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          placeholder="Quantity"
        />

        <Text style={styles.label}>Kategori:</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          {categories.map((el, idx) => (
            <Picker.Item label={el.name} value={el.id} key={idx} />
          ))}
        </Picker>

        <Text style={styles.label}>Tanggal Event:</Text>
        <View>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.datePickerButton}
          >
            <Text>{eventDate.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={eventDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        <Text style={styles.label}>Deskripsi:</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={description}
          onChangeText={setDescription}
          multiline
          placeholder="Deskripsi Event"
        />

        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContainer: {
    padding: 20,
    paddingBottom: 80, // Add extra padding at the bottom
  },
  label: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#533263",
  },
  input: {
    borderWidth: 1,
    borderColor: "#533263",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: "#533263",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#533263",
    borderRadius: 10,
    marginBottom: 10,
    color: "#533263",
  },
  datePickerButton: {
    height: 40,
    justifyContent: "center",
    borderColor: "#533263",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default CreateEvent;
