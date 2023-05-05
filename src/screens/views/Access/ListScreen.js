import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Collapsible from "react-native-collapsible";
import DatePickerScreen from "../Home/DatePickerScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { routes } from "../../../utils/routes";
import LoaderScreen from "../Home/LoaderScreen";

const ListWithSearch = () => {
  const url = routes.domain.url + "api/list";
  const reportApi = routes.domain.url + "api/report";
  const [activeItem, setActiveItem] = useState(null);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [fileError, setFileError] = useState('');
  const [file, setFile] = useState(null);
  const [showLoaderScreen, setShowLoaderScreen] = useState(false);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        const valueJson = await JSON.parse(value);
        setUser(valueJson);
        var currentDate = new Date();
        let dateObj = new Date(currentDate);
        dateObj.setHours(dateObj.getHours() - 6);
        let newDateString = dateObj.toISOString();
        const fecha = new Date(newDateString);
        const fechaYMD = fecha.toISOString().substring(0, 10);
        reloadItems(valueJson, fechaYMD);
      }
    } catch (e) {
      setUser(null);
      console.log("Account screeen catch ln 46");
    }
  };
  const reloadItems = async (userInfo, date) => {
    if (!userInfo.token) return;
    const response = await fetch(url + "?date=" + date, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`, // notice the Bearer before your token
      },
    })
      .then(async (response) => {
        return await response.json();
      })
      .then(async (data) => await data)
      .catch(async (error) => {
        console.log("error obteniendo el listado");
        return await error;
      });
    setItems(response);
  };
  const downloadReport = async (type) => {
    setShowLoaderScreen(true);
    if (!user.token) return;
    const response = await fetch(reportApi + "?type=" + type, {
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
        console.log("error obteniendo el listado");
        return await error;
      });
      console.log(response);
      if(response.success) {
        Linking.openURL(response.file);
        setFile(response.file);
      } else {
        setFileError(response.message);
      }
      setShowLoaderScreen(false);
  };
  const handleItemPress = (id) => {
    if (id === activeItem) {
      setActiveItem(null);
    } else {
      setActiveItem(id);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if(showLoaderScreen) {
    return <LoaderScreen />
  }
  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {user && user.permissions.downloadReport ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <CapsuleButtonGroup
                leftButtonText="del 28 al 12"
                onLeftButtonPress={() => {downloadReport(1)}}
                rightButtonText="del 13 al 27"
                onRightButtonPress={() => {downloadReport(2)}}
              />
              {fileError ? <Text >{fileError}</Text> : <></>}
              {file ? <Text onPress={() => {Linking.openURL(file)} } style={styles.reportUrl} >Descargar Archivo</Text> : <></>}
            </View>
          ) : (
            <></>
          )}
          {user && user.permissions.filterByDate ? (
            <DatePickerScreen reloadItems={reloadItems} user={user} />
          ) : (
            <></>
          )}
          {Object.entries(items).map(([employee, logs]) => {
            return (
              <View key={employee} style={styles.itemContainer}>
                <TouchableOpacity
                  style={styles.itemHeader}
                  onPress={() => handleItemPress(employee)}
                >
                  <Text style={styles.itemHeaderText}>{employee}</Text>
                </TouchableOpacity>
                <Collapsible collapsed={activeItem !== employee}>
                  <View style={styles.itemDetails}>
                    {logs.map((log, index) => {
                      const description = JSON.parse(log.description);
                      return (
                        <Text
                          style={styles.itemDescriptionContainer}
                          key={log.id}
                        >
                          <View style={styles.itemDescription}>
                            <Text
                              style={
                                log.type == "entrada"
                                  ? styles.typeEntrada
                                  : log.type == "comida" ||
                                    log.type == "regreso_comida"
                                  ? styles.typeCOmida
                                  : styles.typeSalida
                              }
                            >
                              {"Tipo: " + log.type}{" "}
                            </Text>
                          </View>
                          <View style={styles.itemDescription}>
                            <Text
                              style={
                                log.type == "entrada"
                                  ? styles.typeEntrada
                                  : log.type == "comida" ||
                                    log.type == "regreso_comida"
                                  ? styles.typeCOmida
                                  : styles.typeSalida
                              }
                            >
                              {"Mensaje: " + description.message}{" "}
                            </Text>
                          </View>

                          <View style={styles.itemDescription}>
                            <Text
                              style={
                                log.type == "entrada"
                                  ? styles.typeEntrada
                                  : log.type == "comida" ||
                                    log.type == "regreso_comida"
                                  ? styles.typeCOmida
                                  : styles.typeSalida
                              }
                            >
                              {"Hora de llegada: " +
                                log.created_at.split(" ")[1]}{" "}
                            </Text>
                          </View>
                          {log.type == "entrada" ? (
                            <View style={styles.itemDescription}>
                              <Text style={styles.typeEntrada}>
                                {"Hora de entrada: " + description.entry_time}
                              </Text>
                            </View>
                          ) : log.type == "salida" ? (
                            <View style={styles.itemDescription}>
                              <Text style={styles.typeSalida}>
                                {"Hora de salida: " + description.out_time}
                              </Text>
                            </View>
                          ) : (
                            <></>
                          )}
                        </Text>
                      );
                    })}
                  </View>
                </Collapsible>
              </View>
            );
          })}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const CapsuleButton = ({ text, onPress, style }) => (
  <TouchableOpacity style={[styles.btnbutton, style]} onPress={onPress}>
    <Text style={styles.btnbuttonText}>{text}</Text>
  </TouchableOpacity>
);

const CapsuleButtonGroup = ({
  leftButtonText,
  rightButtonText,
  onLeftButtonPress,
  onRightButtonPress,
}) => (
  <View style={styles.btncontainer}>
    <CapsuleButton
      text={leftButtonText}
      onPress={onLeftButtonPress}
      style={styles.btnleftButton}
    />
    <CapsuleButton
      text={rightButtonText}
      onPress={onRightButtonPress}
      style={styles.btnrightButton}
    />
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    marginTop: 10,
  },
  itemContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  itemHeader: {
    backgroundColor: "#e6e6e6",
    padding: 16,
  },
  itemHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDetails: {
    padding: 16,
  },
  itemDescription: {},
  itemDescriptionContainer: {
    marginBottom: 8,
    paddingTop: 10,
  },
  itemPrice: {
    fontWeight: "bold",
  },
  typeSalida: {
    marginBottom: 0,
    paddingTop: 0,
    fontWeight: "bold",
    color: "#ed4040",
  },
  typeCOmida: {
    marginBottom: 0,
    paddingTop: 0,
    fontWeight: "bold",
    color: "#ff8811",
  },
  typeEntrada: {
    marginBottom: 0,
    paddingTop: 0,
    fontWeight: "bold",
    color: "#548bea",
  },

  btncontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  btnbutton: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  btnleftButton: {
    backgroundColor: "#3498db",
    marginRight: 5,
  },
  btnrightButton: {
    backgroundColor: "#2ecc71",
    marginLeft: 5,
  },
  btnbuttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  reportUrl : {
    textAlign : 'center',
    fontSize : 16,
    color : 'blue',
    marginBottom : 10,
    marginTop : 8
  }
});

export default ListWithSearch;
