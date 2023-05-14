import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import LoaderScreen from "../Home/LoaderScreen";
import { routes } from "../../../utils/routes";
const Profile = ({ logout }) => {
  var qrPath = routes.domain.url + "api/guest/qr";
  const timerLapse = 10;

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
        getQr(valueJson.guest_id);
      }
    } catch (e) {
      setUser(null);
      console.log("Account screeen catch ln 46");
    }
  };

  const getQr = async (guest_id = null) => {
    if (!guest_id) return;
    qrPath += "?guest_id=" + guest_id;
    await fetch(qrPath)
      .then(async (response) => response.json())
      .then(async (data) => {
        setQr(data.qr);
        setCreationQr(data.message);
        setShowQr(true);
        return data;
      })
      .catch((error) => {
        console.log("error geting token");
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
    if (!isLogged) {
      setTimeout(function () {
        getData();
        startTimer();
        hideQr();
      }, 1000);
    } else {
      getQr(user.guest_id);
      startTimer();
      hideQr();
    }
  }, [qrReloaded]);
  if (!isLogged) {
    return <LoaderScreen />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: user
                ? user.profile_photo_url
                : "https://picsum.photos/200/200",
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{user.fullname ?? "Guest"}</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Text
                style={styles.buttonText}
                onPress={
                  !showQr
                    ? reloadQr
                    : () => {
                        console.log("error loading");
                      }
                }
              >
                {showQr ? "Recargar en " + timer : "Generar QR"}
              </Text>
            </View>
            <View style={[styles.button, styles.secondaryButton]}>
              <Text
                style={[styles.buttonText, styles.secondaryButtonText]}
                onPress={logout}
              >
                Cerrar sesión
              </Text>
            </View>
          </View>

          <GetAccountInfo showQr={showQr} creationQr={creationQr} qr={qr} />
        </View>
      </ScrollView>
    </View>
  );
};

function GetAccountInfo({ showQr, creationQr, qr }) {
  if (showQr) {
    return (
      <>
        <View style={showQr ? styles.qrContainer : { display: "none" }}>
          <Text style={styles.qrCreationAt}>{creationQr}</Text>
          <QrImage qr={qr} />
        </View>
      </>
    );
  } else {
    return <></>;
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
  container: {
    flex: 1,
    backgroundColor: "#7c7c7c",
  },
  header: {
    backgroundColor: "#7c7c7c",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  qrContainer: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  qrCreationAt: {
    marginTop: 15,
    marginBottom: 25,
    fontSize: 17,
    color: "white",
  },
  qr: {
    width: 300,
    height: 300,
    borderWidth: 5,
    marginTop: 15,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollView: {
    backgroundColor: "#7c7c7c",
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  infoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bio: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#222",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
  },
  secondaryButtonText: {
    color: "#fff",
  },
});

export default Profile;
