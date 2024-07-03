import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Alert,
  Image,
} from "react-native";
import FormField from "../components/formfield";
import Button from "../components/button";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@/context/authContext";

const Signup = () => {
  const { signup } = useAuth();
  const handleSignup = async () => {
    if (!usernameRef.current || !emailRef.current || !passwordRef.current) {
      Alert.alert("sign In", "Please enter all fields.");
    }

    let res = await signup(
      emailRef.current,
      passwordRef.current,
      usernameRef.current
    );
    if (!res.success) {
      Alert.alert("sign In", res.msg);
      return;
    }
  };
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.Text}>Sign Up</Text>
        <View style={styles.container}>
          <FormField
            title="Username"
            placeholder="Enter your username"
            onChangeText={(value) => (usernameRef.current = value)}
          />
          <FormField
            title="Email"
            placeholder="Enter your email"
            onChangeText={(value) => (emailRef.current = value)}
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            onChangeText={(value) => (passwordRef.current = value)}
            secureTextEntry
          />

          <View style={styles.linkContainer}>
            <Link href="/signin">
              <View style={styles.linkContent}>
                <Text style={styles.linkText}>Already have an account?</Text>
                <FontAwesome name="long-arrow-right" size={24} color="black" />
              </View>
            </Link>
          </View>

          <Button title="SIGN UP" onPress={handleSignup} />
          <View style={styles.bottom}>
            <Text style={{ textAlign: "center", margin: 10 }}>
              Or sign up with social account
            </Text>
            <View style={styles.imgcontiner}>
              <View style={styles.iconbutton}>
                <Link href={""}>
                  <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={require("../assets/icons/google.png")}
                  />
                </Link>
              </View>
              <View style={styles.iconbutton}>
                <Link href={""}>
                  <Image
                    style={styles.image}
                    source={require("../assets/icons/facebook.png")}
                  />
                </Link>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  Text: {
    fontSize: 30,
    fontWeight: "600",
    paddingLeft: 15,
    paddingVertical: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  linkContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  linkContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    marginRight: 5,
  },
  bottom: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  imgcontiner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  iconbutton: {
    backgroundColor: "#fff",
    overflow: "hidden",
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    marginHorizontal: 20,
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default Signup;
