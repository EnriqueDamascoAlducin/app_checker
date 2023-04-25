import React from "react";

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import ProfileBackground from "../../../../assets/header.jpg";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { routes } from "../../../utils/routes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoaderScreen from "../Home/LoaderScreen";

const qrPath = routes.domain.url + "api/qr";
const timerLapse = 10;
const AccountScreen = () => {
  const [user, setUser] = useState(null);
  const [qr, setQr] = useState(null);
  const [creationQr, setCreationQr] = useState(null);
  const [qrReloaded, setQrReloaded] = useState(0);
  const [showQr, setShowQr] = useState(true);
  const [timer, setTimer] = useState(timerLapse);
  const [isLogged, setIsLogged] = useState(false);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        const valueJson = await JSON.parse(value);
        setUser(valueJson);
        setIsLogged(true);
        getQr(valueJson.token);
      }
    } catch (e) {
      setUser(null);
      console.log("Account screeen catch ln 46");
    }
  };
  const getQr = async (token) => {
    if (!token) return;
    await fetch(qrPath, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`, // notice the Bearer before your token
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setQr(data.qr);
        setCreationQr(data.message);
        setShowQr(true);
        return data;
      })
      .catch((error) => {
        console.log("error catch account screen ln 60");
        return error;
      });
  };
  const hideQr = () => {
    setTimeout(() => {
      setShowQr(false);
    }, timerLapse * 1000);
  };

  const reloadQr = () => {
    setQrReloaded(qrReloaded + 1);
  };
  const startTimer = () => {
    var sec = timerLapse;
    setTimer(sec);
    var timer = setInterval(function () {
      sec--;
      if (sec < 0) {
        clearInterval(timer);
      }
      setTimer(sec);
    }, 1000);
  };
  useEffect(() => {
    if(!isLogged) {
      setTimeout(function () {
        getData();
        startTimer();
        hideQr();
      }, 1000);
    } else {
      getData();
      startTimer();
      hideQr();
    }
  }, [qrReloaded]);
  if (!isLogged) {
    return <LoaderScreen />;
  }
  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Image source={ProfileBackground} style={styles.coverPhoto} />
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: user
                    ? user.profile_photo_url
                    : "https://www.bootdey.com/img/Content/avatar/avatar1.png",
                }}
                style={styles.avatar}
              />
            </View>
            <GetAccountInfo
              showQr={showQr}
              reloadQr={reloadQr}
              timer={timer}
              creationQr={creationQr}
              qr={qr}
              user={user}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </KeyboardAwareScrollView>
  );
};

function GetAccountInfo({ showQr, reloadQr, timer, creationQr, qr, user }) {
  if (showQr) {
    return (
      <>
        <View style={showQr ? styles.qrContainer : { display: "none" }}>
          <Text style={styles.qrCreationAt}>{creationQr}</Text>
          <QrImage qr={qr} />
        </View>
        <Text style={styles.buttonTImer}>{"Recargar en " + timer}</Text>
      </>
    );
  } else {
    return (
      <>
        <Text style={styles.name}>
          {user ? user.nick_name ?? user.fullname : "Invitado"}
        </Text>
        <Text style={styles.email}>{user ? user.email : ""} </Text>
        <Text style={styles.button} onPress={reloadQr}>
          {"Recargar QR"}
        </Text>
      </>
    );
  }
}
function QrImage({ qr }) {
  if (qr) {
    return <Image source={{ uri: qr }} style={styles.qr} />;
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#7c7c7c",
  },
  containerView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  coverPhoto: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: -75,
  },
  qrContainer: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderWidth: 5,
    borderRadius: 100,
    borderColor: "white",
  },
  qr: {
    width: 300,
    height: 300,
    borderWidth: 5,
    borderColor: "white",
    marginTop: 15,
  },
  name: {
    marginTop: 15,
    fontSize: 23,
    fontWeight: "bold",
    color: "white",
  },
  email: {
    marginTop: 15,
    fontSize: 17,
    color: "white",
  },
  qrCreationAt: {
    marginTop: 15,
    marginBottom: 25,
    fontSize: 17,
    color: "white",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    color: "white",
    marginTop: 10,
  },

  buttonTImer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    color: "white",
    marginTop: 35,
  },
});

export default AccountScreen;
