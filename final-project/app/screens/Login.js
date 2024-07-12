import React from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import Heading from "../components/Heading";
import FormButton from "../components/FormButton";
import { useContext, useState } from "react";
import Axios from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter your email address"),
  password: Yup.string()
    .label("Password")
    .required("Please enter your password")
    .min(4, "Password must have at least 4 characters"),
});

export default function Login({ navigation }) {
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = async (values, actions) => {
    try {
      let response = await Axios({
        method: "POST",
        url: "/login",
        data: {
          email: values.email,
          password: values.password,
        },
      });
      await AsyncStorage.setItem("access_token", response.data.access_token);
      setIsLoggedIn(true);
      navigation.navigate("Main");
    } catch (error) {
      console.error(error.message);
      actions.setFieldError(
        "general",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.avoidKeyboard}
      behavior="padding"
      enabled
      keyboardVerticalOffset={85}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Heading h2 title="Login" />
        <View style={styles.form}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, actions) => handleLogin(values, actions)}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              values,
              handleSubmit,
              errors,
              isValid,
              isSubmitting,
              touched,
              handleBlur,
            }) => (
              <>
                <FormInput
                  name="email"
                  label="Email Address"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholder="Enter email"
                  keyboardType="email-address"
                  returnKeyType="done"
                  autoCapitalize="none"
                  iconName="mail"
                  iconColor="#533263"
                />
                <ErrorMessage errorValue={touched.email && errors.email} />

                <FormInput
                  name="password"
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  placeholder="Enter password"
                  returnKeyType="done"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  iconName="lock-closed"
                  iconColor="#533263"
                />
                <ErrorMessage
                  errorValue={touched.password && errors.password}
                />

                <ErrorMessage errorValue={errors.general} />

                <FormButton
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  buttonType="solid"
                  title="SIGN IN"
                  buttonColor="#533263"
                  loading={isSubmitting}
                />
              </>
            )}
          </Formik>
        </View>
        <Text style={styles.Text}>
          Don't have an account?{" "}
          <Text
            style={styles.signUp}
            onPress={() => navigation.navigate("Register")}
          >
            Sign Up
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FAFBFE",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  heading: {
    color: "#533263",
    fontWeight: "bold",
  },
  form: {
    width: "90%",
    marginTop: 20,
  },
  avoidKeyboard: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  Text: {
    marginTop: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  signUp: {
    color: "#7B68EE",
    fontWeight: "bold",
  },
});
