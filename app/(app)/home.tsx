import Button from "@/components/button";
import { useAuth } from "@/context/authContext";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Home = () => {
  const { logout, user } = useAuth();
  const handelLogout = async () => {
    await logout();
  };
  console.log("user data:", user);

  return (
    <View>
      <Text>home</Text>
      <Button title="logout" onPress={handelLogout} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
