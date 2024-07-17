import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";

export default function DetailTicket() {
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
          <Text style={styles.bookingCode}>Order id</Text>
          {/* <View style={styles.barcode} /> */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>BIODATA</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>: Fiki</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>: Jalan Rawa</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Telephone</Text>
            <Text style={styles.value}>: 0852</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>: email@gmail.com</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Date</Text>
            <Text style={styles.value}>: 08 MAY 2019, 12:51:16</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Status</Text>
            <Text style={styles.value}>: PAID</Text>
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
            <Text style={styles.tableCell}>06 JUN 2019</Text>
            <Text style={styles.tableCell}>Nama Event</Text>
            <Text style={styles.tableCell}>Lokasi Event</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>TICKET DETAIL</Text>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>QUANTITY</Text>
            <Text style={styles.tableHeader}>GRAND TOTAL</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>1</Text>
            <Text style={styles.tableCell}>Rp. 100000</Text>
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
    fontSize: 28,
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
