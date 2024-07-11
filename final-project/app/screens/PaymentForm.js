import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";

export default function PaymentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [ticketPrice, setTicketPrice] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const calculateTotalPrice = () => {
    const price = parseFloat(ticketPrice);
    const quantity = parseInt(ticketQuantity);
    if (!isNaN(price) && !isNaN(quantity)) {
      setTotalPrice(price * quantity);
    }
  };

  const handleSubmit = () => {
    // Logika untuk mengirim data atau pemrosesan lebih lanjut
    Alert.alert("Pembayaran Berhasil", `Total Harga: ${totalPrice}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nama Customer:</Text>
      <Text style={styles.input} value={name} onChangeText={setName}>
        Value name
      </Text>

      <Text style={styles.label}>Email Customer: </Text>
      <Text style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address">
        {" "}
        Value email{" "}
      </Text>

      <Text style={styles.label}>Nama Event:</Text>
      <Text style={styles.input} value={eventName} onChangeText={setEventName}>
        {" "}
        Value event name{" "}
      </Text>

      <Text style={styles.label}>Tanggal dan Waktu Event: value tanggal event </Text>

      <Text style={styles.label}>Harga Satuan Tiket:</Text>
      <Text
        style={styles.input}
        value={ticketPrice}
        onChangeText={(text) => {
          setTicketPrice(text);
          calculateTotalPrice();
        }}
        keyboardType="numeric"
      >
        Rp. 100_000
      </Text>

      <Text style={styles.label}>Quantity Tiket:</Text>
      <TextInput
        style={styles.input}
        value={ticketQuantity}
        onChangeText={(text) => {
          setTicketQuantity(text);
          calculateTotalPrice();
        }}
        keyboardType="numeric"
        placeholder="isi value"
      />

      <Text style={styles.label}>Total Harga: Rp.{totalPrice}</Text>

      <Button title="Bayar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginTop: 20,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 5,
  },
});
