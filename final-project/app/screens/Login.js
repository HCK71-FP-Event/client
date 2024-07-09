import React, { useState, useContext } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import { LOGIN_USER } from "../config/queries";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const { setIsLoggedIn } = useContext(AuthContext);

  async function handleLogin() {
    try {
      const response = await loginUser({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });

      const { access_token } = response.data.login;

      await AsyncStorage.setItem("access_token", access_token);

      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.logoContainer}>
          <Image
            source={require("../assets/xlogo.jpeg")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View> */}
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subTitle}>
          or{" "}
          <Text
            style={styles.joinX}
            onPress={() => navigation.navigate("Register")}
          >
            Join X
          </Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Phone, email, or username"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>
            {loading ? "Signing in..." : "Sign in"}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    height: 80,
    width: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
  },
  joinX: {
    color: "#000000",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 50,
  },
  signInButton: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
