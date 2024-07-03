import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  Pressable,
} from "react-native";
import FormField from "../components/formfield";
import Button from "../components/button";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";

interface SignInProps {
  // Define any props if needed
}

const SignIn: React.FC<SignInProps> = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { signin } = useAuth();
  const router = useRouter();

  const handleSignin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please enter all fields.");
      return;
    }

    const res = await signin(emailRef.current, passwordRef.current);

    if (!res.success) {
      Alert.alert("Sign In", res.msg);
    } else {
      // Handle successful sign-in, e.g., navigate to a different screen
      router.push("/home"); // Example route, change as needed
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.Text}>signin</Text>
        <View style={styles.container}>
          <FormField
            title="Email"
            placeholder="Enter your email"
            onChangeText={(value) => (emailRef.current = value)}
          />
          <FormField
            onChangeText={(value) => (passwordRef.current = value)}
            title="Password"
            placeholder="Enter your password"
            secureTextEntry
          />

          <View style={styles.linkContainer}>
            <Link href="/forget">
              <View style={styles.linkContent}>
                <Text style={styles.linkText}>Forget Password?</Text>
                <FontAwesome name="long-arrow-right" size={24} color="black" />
              </View>
            </Link>
          </View>

          <Button title="SIGN UP" onPress={handleSignin} />
          <View style={{ marginTop: 20 }}>
            <View style={styles.linkContent}>
              <Text style={styles.linkText}>Don't have a Account?</Text>
              <Pressable onPress={() => router.push("signup")}>
                <Text style={{ fontWeight: "500", color: "blue" }}>
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
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
    marginTop: 60,
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

export default SignIn;
