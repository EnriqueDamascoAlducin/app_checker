import React from "react";
import { useState, useEffect } from "react";
import styles from "../../../styles/account/stylebk";
import { Image, Keyboard, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, View, Text } from "react-native";
import { Button } from "react-native-elements";
import CheckerIcon from '../../../../assets/checker_icon.png';


export default function LoginScreen({ login }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);


  const onLoginPress = () => {
    setHasError(login(user, password))
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.imageContainer}>
              <Image source={CheckerIcon} style={styles.logo} />
              <Text style={styles.redlogoText}>Control de</Text>
              <Text style={styles.greenLogoText}>Acceso</Text>
            {hasError ? <Text>
                <Text style={styles.errorLogin}>No se encontro un usuario </Text>
                <Text style={styles.errorLogin}>con esta información</Text> 
              </Text> 
              : <></> }
          </View>
          <View style={styles.loginFormView}>
            <TextInput placeholder="Usuario" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={setUser} />
            <TextInput placeholder="Contraseña" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={setPassword} secureTextEntry={true} />
            <Button buttonStyle={styles.loginButton} onPress={() => onLoginPress()} title="Ingresar" />
          </View>
        </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
