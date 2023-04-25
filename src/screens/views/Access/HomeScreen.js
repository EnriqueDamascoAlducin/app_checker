import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { routes } from "../../../utils/routes";
const HomeScreen = ({navigation}) => {
  const handleNewRegister = () => {
    navigation.navigate(routes.access.register.tab_key);
  }
  const handleAccessList = () => {
    navigation.navigate(routes.access.list.tab_key);
  }
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/header.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Accesos</Text>
        <TouchableOpacity style={styles.button} onPress={handleAccessList}>
          <Text style={styles.buttonText}>de hoy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={handleNewRegister}>
          <Text style={styles.buttonText}>Nuevo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 50,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default HomeScreen;