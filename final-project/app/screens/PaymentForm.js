import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Linking, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Axios from "../utils/axios";
import Modal from "react-native-modal";

export default function PaymentForm({ route, navigation }) {
  const { event, user } = route.params;
  const [ticketQuantity, setTicketQuantity] = useState("1"); // Set default to "1"
  const [totalPrice, setTotalPrice] = useState(event.price);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    calculateTotalPrice();
  }, [ticketQuantity]);

  const calculateTotalPrice = () => {
    const price = parseFloat(event.price);
    const quantity = parseInt(ticketQuantity);
    if (!isNaN(price) && !isNaN(quantity)) {
      setTotalPrice(price * quantity);
    }
  };

  const handleSubmit = async () => {
    try {
      const endpoint = event.isFree ? `/payment/free-event/${event.id}` : `/payment/midtrans/initiate/${event.id}`;

      const response = await Axios.post(endpoint, {
        quantity: ticketQuantity,
      });

      if (event.isFree) {
        setModalTitle("Success");
        setModalMessage("Your free event ticket has been booked.");
        setModalVisible(true);
      } else {
        const { redirect_url } = response.data;
        Linking.openURL(redirect_url);
        setModalTitle("Success");
        setModalMessage("Your payment has been initiated.");
        setModalVisible(true);
      }
      console.log("masuk line 37");
      navigation.navigate("Home");
    } catch (error) {
      setModalTitle("Error");
      setModalMessage(error.message);
      setModalVisible(true);
    }
  };

  const formatToIDR = (amount) => {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  const closeModal = () => {
    setModalVisible(false);
    if (modalTitle === "Success") {
      navigation.navigate("Home");
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Form Ticket</Text>
          <Text style={styles.label}>Nama Customer:</Text>
          <TextInput style={styles.input} editable={false} value={user.fullName} />

          <Text style={styles.label}>Email Customer:</Text>
          <TextInput style={styles.input} value={user.email} keyboardType="email-address" editable={false} />

          <Text style={styles.label}>Nama Event:</Text>
          <TextInput style={styles.input} value={event.name} editable={false} />

          <Text style={styles.label}>Tanggal dan Waktu Event:</Text>
          <TextInput style={styles.input} value={new Date(event.eventDate).toLocaleDateString()} editable={false} />

          <Text style={styles.label}>Harga Satuan Tiket:</Text>
          <TextInput style={styles.input} value={formatToIDR(event.price)} editable={false} />

          <Text style={styles.label}>Quantity Tiket:</Text>
          <TextInput
            style={styles.input}
            value={ticketQuantity}
            onChangeText={(text) => {
              setTicketQuantity(text.replace(/[^0-9]/g, ""));
            }}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Total Harga:</Text>
          <TextInput style={styles.input} value={formatToIDR(totalPrice)} editable={false} />

          <View style={styles.buttonContainer}>
            <Button title="Bayar" onPress={handleSubmit} color="#7B1FA2" />
          </View>
        </View>
      </ScrollView>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{modalTitle}</Text>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
          <Button title="OK" onPress={closeModal} />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3E5F5",
    paddingBottom: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
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
    borderRadius: 5,
    padding: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});
