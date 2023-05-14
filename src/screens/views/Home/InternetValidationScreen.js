import React from 'react';
import { View, Text, StyleSheet,  Image } from 'react-native';
import NoInternetImage from '../../../../assets/no-internet.png';
import {useNetInfo} from "@react-native-community/netinfo";

const InternetValidationScreen = () => {


    return (
        <View style={styles.container}>
          <Image source={NoInternetImage} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>Sin conexión a internet</Text>
          <Text style={styles.message}>Verifica tu conexión y vuelve a intentarlo.</Text>
        </View>
      );// Si hay conexión, no mostrar la pantalla de "No Internet"
  

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
  },
});

export default InternetValidationScreen;
