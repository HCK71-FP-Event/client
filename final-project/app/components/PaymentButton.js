// PaymentButton.js
import React, { useState } from "react";
import { Button, View, Modal, Alert } from "react-native";
import { WebView } from "react-native-webview";

const PaymentButton = ({ eventId, quantity }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [snapToken, setSnapToken] = useState("");

  const handlePayment = async () => {
    try {
      const response = await fetch(
        `https://7576-182-253-55-187.ngrok-free.app/payment/midtrans/initiate/${eventId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const data = await response.json();
      setSnapToken(data.transactionToken);
      setModalVisible(true);
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const handleWebViewMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);

    switch (data.status) {
      case "success":
        Alert.alert("Payment Success!", "Your payment was successful.");
        break;
      case "pending":
        Alert.alert("Payment Pending", "Your payment is pending.");
        break;
      case "error":
        Alert.alert("Payment Failed", "Your payment failed.");
        break;
      default:
        break;
    }
    setModalVisible(false);
  };

  return (
    <View>
      <Button title="Pay!" onPress={handlePayment} />
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <WebView
          source={{
            uri: `https://app.sandbox.midtrans.com/snap/v2/vtweb/e5877ebc-11e4-458a-a9e1-7291a3e016b1`,
          }}
          onMessage={handleWebViewMessage}
        />
      </Modal>
    </View>
  );
};

export default PaymentButton;
