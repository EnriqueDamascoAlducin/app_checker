import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import React from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SuccessIcon from "../../../../assets/success_icon.png";
import WarningIcon from "../../../../assets/warning_icon.png";
import ErrorIcon from "../../../../assets/error_icon.png";

export default function AccesosScreen({ route }) {
  const { type } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [responseQr, setResponseQr] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        const valueJson = await JSON.parse(value);
        setUser(valueJson);
      }
    } catch (e) {
      setUser(null);
      console.log("Account screeen catch ln 46");
    }
  };

  const validateQr = async (url) => {
    if (!user.token) return;

    const response = await fetch(url + '&type='+type, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`, // notice the Bearer before your token
      },
    })
      .then(async (response) => {
        return await response.json();
      })
      .then(async (data) => await data)
      .catch(async (error) => {
        console.log("error validando qr");
        return await error;
      });
    console.log(response);
    setResponseQr(response);
  };
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getData();
    getBarCodeScannerPermissions();
    console.log(type);
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    validateQr(data);
    setScanned(true);
    setShowModal(true);
  };
  if (hasPermission === null) {
    return <Text>Solicitando permiso de la camara</Text>;
  }
  if (hasPermission === false) {
    return <Text>Debes aceptar el permiso</Text>;
  }

  if (showModal === true) {
    return (
      <ShowModal
        setScanned={setScanned}
        setShowModal={setShowModal}
        responseQr={responseQr}
      />
    );
  }

  return (
    <View style={styles.mainContainer}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
      />
    </View>
  );
}
function ShowModal({ setScanned, setShowModal, responseQr }) {
  const [modalVisible, setModalVisible] = useState(true);
  if (!responseQr) return <></>;
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{responseQr.message}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setScanned(false);
                setShowModal(false);
              }}
            >
              {responseQr.status == "success" ? (
                <Image
                  style={styles.modalIcon}
                  source={SuccessIcon}
                  alt="succes icon"
                />
              ) : responseQr.status == "warning" ? (
                <Image
                  style={styles.modalIcon}
                  source={WarningIcon}
                  alt="warning icon"
                />
              ) : (
                <Image
                  style={styles.modalIcon}
                  source={ErrorIcon}
                  alt="error icon"
                />
              )}
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#9921E8",
  },
  //modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "white",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalIcon: {
    width: 50,
    height: 50,
  },
  scanner: {
    ...StyleSheet.absoluteFillObject,
    // en caso de modificar el tamaño del scanner
    /*top: 100, // Adjust the top position to move the scanner down
    height: 500, // Adjust the height to make the scanner smaller
    marginHorizontal: 20, // Add horizontal margins to center the scanner*/
  },
});
