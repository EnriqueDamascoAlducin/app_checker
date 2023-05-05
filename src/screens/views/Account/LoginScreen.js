import Logo from "../../../../assets/checker_icon.png";
import { Platform } from "react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ModernLoginTemplate = ({ login, loginError }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login(user, password);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
useEffect(()=>{},[])
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={(Platform && Platform.OS === "ios" )? "padding" : "height"}
      >
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          onChangeText={setUser}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <Image
              source={require("../../../../assets/loader.gif")}
              style={styles.loader}
            />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>
        {loginError ? (
          <Text style={styles.title}>
            {loginError}
          </Text>
        ) : (
          <></>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333", // Fondo oscuro
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // Texto blanco
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 16,
    color: "#fff", // Texto blanco
  },
  button: {
    backgroundColor: "#fff", // Botón blanco con texto negro
    width: "100%",
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000", // Texto negro
  },
  forgotButton: {
    marginBottom: 20,
  },
  forgotLink: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // Texto blanco
    textDecorationLine: "underline",
  },
  bottomText: {
    fontSize: 16,
    color: "#fff", // Texto blanco
    marginBottom: 10,
  },
  bottomButton: {
    marginBottom: 20,
  },
  bottomLink: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // Texto blanco
    textDecorationLine: "underline",
  },
  loader: {
    width: 20,
    height: 20,
  },
});

export default ModernLoginTemplate;
