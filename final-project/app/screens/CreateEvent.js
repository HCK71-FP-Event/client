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
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Axios from "../utils/axios";

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

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowDatePicker(Platform.OS === "ios");
    setEventDate(currentDate);
  };

  const fetchCategoryData = async () => {
    const response = await Axios.get("/categories");
    setCategories(response.data);
  };

  const handleSubmit = async () => {
    try {
      // Handle submission logic here, e.g., sending data to server


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
    fetchCategoryData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Your Event</Text>
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
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} color="#7B1FA2" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3E5F5",
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A148C",
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    margin: 20,
    elevation: 3,
    width: "90%",
    maxWidth: 400,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 5,
    padding: 10,
  },
});

export default CreateEvent;
