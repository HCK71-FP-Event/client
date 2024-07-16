import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PaymentForm({ route }) {
  // console.log(route);
  const { event, user } = route.params;
  console.log(event.price);
  const [eventPrice, setPrice] = useState(event.price);
  const [eventName, setEventName] = useState(event ? event.name : "");
  const [eventDate, setEventDate] = useState(
    event ? event.eventDate : new Date()
  );
  const [ticketPrice, setTicketPrice] = useState(event ? event.price : "");
  const [ticketQuantity, setTicketQuantity] = useState("1"); // Set default to "1"
  const [totalPrice, setTotalPrice] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    calculateTotalPrice();
  }, [ticketPrice, ticketQuantity]);

  const calculateTotalPrice = () => {
    const price = parseFloat(ticketPrice);
    const quantity = parseInt(ticketQuantity);
    if (!isNaN(price) && !isNaN(quantity)) {
      setTotalPrice(price * quantity);
    }
  };

  const handleSubmit = () => {
    Alert.alert("Pembayaran Berhasil", `Total Harga: Rp.${totalPrice}`, [
      {
        text: "OK",
        onPress: () => navigation.navigate("Home"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Form Ticket</Text>
        <Text style={styles.label}>Nama Customer:</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value={user.fullName}
        />

        <Text style={styles.label}>Email Customer:</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          keyboardType="email-address"
          editable={false}
        />

        <Text style={styles.label}>Nama Event:</Text>
        <TextInput
          style={styles.input}
          value={eventName}
          onChangeText={setEventName}
          editable={false}
        />

        <Text style={styles.label}>
          Tanggal dan Waktu Event: {new Date(eventDate).toLocaleDateString()}
        </Text>

        <Text style={styles.label}>Harga Satuan Tiket: {event.price}</Text>
        <TextInput style={styles.input} value={`${event.price}`} editable={false} />

        <Text style={styles.label}>Quantity Tiket:</Text>
        <TextInput
          style={styles.input}
          value={ticketQuantity}
          onChangeText={(text) => {
            // Ensure only numbers are entered
            setTicketQuantity(text.replace(/[^0-9]/g, ""));
            calculateTotalPrice();
          }}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Total Harga: Rp.{totalPrice}</Text>

        <View style={styles.buttonContainer}>
          <Button title="Bayar" onPress={handleSubmit} color="#FFFFFF" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3E5F5",
  },
  formContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    margin: 20,
    elevation: 3,
    width: "90%",
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A148C",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    color: "#4A148C",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#BA68C8",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    height: 50,
    backgroundColor: "#FFFFFF",
    color: "#4A148C",
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: "#7B1FA2",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
});
