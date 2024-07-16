import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const CreateEvent = () => {
  const navigation = useNavigation();
  const [eventName, setEventName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [category, setCategory] = useState("sport"); // Default category
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // Handle submission logic here, e.g., sending data to server
    console.log("Submitting event:", {
      eventName,
      imageUrl,
      longitude,
      latitude,
      category,
      eventDate,
      description,
    });

    // Assuming navigation to another screen after submission
    navigation.goBack(); // Navigate back after submission
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.label}>Kategori:</Text>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Sport" value="sport" />
        <Picker.Item label="Clothing" value="clothing" />
        <Picker.Item label="Art" value="art" />
        <Picker.Item label="Music" value="music" />
        <Picker.Item label="Culinary" value="culinary" />
      </Picker>

      <Text style={styles.label}>Tanggal Event:</Text>
      <TextInput
        style={styles.input}
        value={eventDate}
        onChangeText={setEventDate}
        placeholder="Tanggal Event"
      />

      <Text style={styles.label}>Deskripsi:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        multiline
        placeholder="Deskripsi Event"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
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
    padding: 5,
    marginBottom: 5,
    color: "#533263",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#533263",
    borderRadius: 20,
    marginBottom: 10,
    color: "#533263",
  },
});

export default CreateEvent;
