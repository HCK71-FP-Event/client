import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Axios from "../utils/axios";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function DetailTicket({ route }) {
  const { id } = route.params;
  const [data, setData] = useState("");
  const [geo, setGeo] = useState("");

  const fetchData = async () => {
    const response = await Axios.get(`/transactions/${id}`);
    setData(response.data);
  };

  const fetchDataGeo = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.long}&key=${process.env.EXPO_PUBLIC_API_GEOCODING}`
      );
      if (response?.data?.results[0]?.formatted_address) {
        setGeo(response.data.results[0].formatted_address || "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      fetchDataGeo();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>e-tiket</Text>
          {/* <Text style={styles.subHeaderText}>e-ticket</Text> */}
          <Text style={styles.headerTextRight}>M-EVENT</Text>
        </View>

        <View style={styles.bookingCodeContainer}>
          <Text style={styles.bookingCodeLabel}>Kode Pemesanan</Text>
          <Text style={styles.bookingCode}>{data.OrderId}</Text>
          {/* <View style={styles.barcode} /> */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>BIODATA</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>: {data.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>: {data.address}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Telephone</Text>
            <Text style={styles.value}>: {data.phoneNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>: {data.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Date</Text>
            <Text style={styles.value}>: {data.paymentDate?.slice(0, 10)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Status</Text>
            <Text style={styles.value}>: {data.status}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>EVENT DETAIL</Text>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>EVENT DATE</Text>
            <Text style={styles.tableHeader}>EVENT NAME</Text>
            <Text style={styles.tableHeader}>VENUE</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{data.eventDate?.slice(0, 10)}</Text>
            <Text style={styles.tableCell}>{data.event}</Text>
            <Text style={styles.tableCell}>{geo}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>TICKET DETAIL</Text>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>QUANTITY</Text>
            <Text style={styles.tableHeader}>GRAND TOTAL</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{data.ticketQuantity}</Text>
            <Text style={styles.tableCell}>
              {data.isFree
                ? "FREE"
                : `Rp. ${data?.grandTotal?.toLocaleString("id-ID")}`}{" "}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContainer: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 12,
    color: "#888",
  },
  headerTextRight: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookingCodeContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  bookingCodeLabel: {
    fontSize: 16,
  },
  bookingCode: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#F57C00",
  },
  barcode: {
    width: 200,
    height: 40,
    backgroundColor: "#000",
    marginTop: 10,
  },
  section: {
    marginBottom: 50,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    width: 110,
    fontWeight: "bold",
  },
  value: {
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 5,
  },
});
