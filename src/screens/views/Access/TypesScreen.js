import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import backgroundImage from '../../../../assets/clock_wolf.png';
import { routes } from "../../../utils/routes";

const TypeScreen = ({ navigation }) => {
  const handleEntradaPress = () => {
    console.log('Botón Entrada presionado');
    navigation.navigate(routes.access.register.tab_key,{type:'entrada'});
  };

  const handleComidasPress = () => {
    console.log('Botón Comidas presionado');
    navigation.navigate(routes.access.register.tab_key,{type:'comida'});
  };

  const handleSalidaPress = () => {
    console.log('Botón Salida presionado');
    navigation.navigate(routes.access.register.tab_key,{type:'salida'});
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleEntradaPress}>
          <Text style={styles.buttonText}>Entradas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleComidasPress}>
          <Text style={styles.buttonText}>Comidas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSalidaPress}>
          <Text style={styles.buttonText}>Salidas</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#4A4A4A',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'capitalize',
  },
});

export default TypeScreen;
