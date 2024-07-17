import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";

export default function Ticket() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View>
          <Text>List Ticket</Text>
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
});
