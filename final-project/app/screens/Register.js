import { StatusBar } from "expo-status-bar";
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
import Axios from "../utils/axios"; // Ensure this is the correct path to your Axios instance

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter your email address"),
  password: Yup.string()
    .label("Password")
    .required("Please enter your password")
    .min(4, "Password must have at least 4 characters"),
  fullname: Yup.string()
    .label("Fullname")
    .required("Please enter your full name"),
  birthOfDate: Yup.string()
    .label("BirthOfDate")
    .required("Please enter your birth of date"),
  phoneNumber: Yup.string()
    .label("Phone Number")
    .required("Please enter your phone number"),
  address: Yup.string().label("Address").required("Please enter your address"),
  avatar: Yup.string().label("Avatar").required("Please enter your avatar"),
});

export default function Register({ navigation }) {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await Axios.post("/register", {
        email: values.email,
        password: values.password,
        fullName: values.fullname,
        birthOfDate: values.birthOfDate,
        phoneNumber: values.phoneNumber,
        address: values.address,
        avatar: values.avatar,
      });

      alert(
        "Registration Successful With: " +
          JSON.stringify(response.data.message.email)
      );
      navigation.navigate("Login"); // Navigate to login after successful registration
    } catch (error) {
      alert("Registration Failed: " + error.response.data.message);
    } finally {
      setSubmitting(false);
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
        <Heading h2 title="Register" />
        <View style={styles.form}>
          <Formik
            initialValues={{
              fullname: "",
              email: "",
              password: "",
              birthOfDate: "",
              phoneNumber: "",
              address: "",
              avatar: "",
            }}
            onSubmit={handleSubmit}
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

                <FormInput
                  name="fullname"
                  label="Full Name"
                  value={values.fullname}
                  onChangeText={handleChange("fullname")}
                  onBlur={handleBlur("fullname")}
                  placeholder="Enter Full Name"
                  returnKeyType="done"
                  autoCapitalize="none"
                  iconName="person-sharp"
                  iconColor="#533263"
                />
                <ErrorMessage
                  errorValue={touched.fullname && errors.fullname}
                />

                <FormInput
                  name="birthOfDate"
                  label="Birth of Date"
                  value={values.birthOfDate}
                  onChangeText={handleChange("birthOfDate")}
                  onBlur={handleBlur("birthOfDate")}
                  placeholder="Enter Birth of Date"
                  returnKeyType="done"
                  autoCapitalize="none"
                  iconName="calendar"
                  iconColor="#533263"
                />
                <ErrorMessage
                  errorValue={touched.birthOfDate && errors.birthOfDate}
                />

                <FormInput
                  name="phoneNumber"
                  label="Phone Number"
                  value={values.phoneNumber}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  placeholder="Enter Phone Number"
                  returnKeyType="done"
                  autoCapitalize="none"
                  iconName="call"
                  iconColor="#533263"
                />
                <ErrorMessage
                  errorValue={touched.phoneNumber && errors.phoneNumber}
                />

                <FormInput
                  name="address"
                  label="Address"
                  value={values.address}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  placeholder="Enter Address"
                  returnKeyType="done"
                  autoCapitalize="none"
                  iconName="location"
                  iconColor="#533263"
                />
                <ErrorMessage errorValue={touched.address && errors.address} />

                <FormInput
                  name="avatar"
                  label="Avatar"
                  value={values.avatar}
                  onChangeText={handleChange("avatar")}
                  onBlur={handleBlur("avatar")}
                  placeholder="Put your image URL"
                  returnKeyType="done"
                  autoCapitalize="none"
                  iconName="image"
                  iconColor="#533263"
                />
                <ErrorMessage errorValue={touched.avatar && errors.avatar} />

                <FormButton
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  buttonType="solid"
                  title="SIGN UP"
                  buttonColor="#533263"
                  loading={isSubmitting}
                />
              </>
            )}
          </Formik>
        </View>
        <Text style={styles.Text}>
          Already have an account?{" "}
          <Text
            style={styles.signUp}
            onPress={() => navigation.navigate("Login")}
          >
            Sign In
          </Text>
        </Text>
        <StatusBar style="auto" />
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
