import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TouchableNativeFeedback,
  GestureResponderEvent,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  const TouchableComponent =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <View style={styles.buttonContainer}>
      <TouchableComponent
        style={styles.button}
        activeOpacity={0.8}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={title}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "90%",
    borderRadius: 25,
    overflow: "hidden",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#DB3022",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default Button;
