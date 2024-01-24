import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [data, setData] = useState("");

  const updateUser = (newData) => {
    setData(newData);
  };

  const [user, setUser] = useState(null);



  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log("Error catc ln 28");
    }
  };


  const logout = async () => {
    try {
      const itemValue = await AsyncStorage.getItem("user");
      if (itemValue !== null) {
        await AsyncStorage.removeItem("user");
        setUserLogged(null);
      }
    } catch (error) {
      console.log("error catc ln 92");
    }
  };

  const login = async (userAccount, passwordAccount) => {
    let data = {
      email: userAccount,
      password: passwordAccount,
    };
    if (!userAccount || !passwordAccount) {
      setLoginError("Sin Permisos para acceder");
      return false;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, requestOptions)
      .then(async (response) => {
        return response.json();
      })
      .then(async (data) => {
        if (
          !data.is_guest &&
          !data.permissions.showTabAccount &&
          !data.permissions.showAccesstTab
        ) {
          setLoginError("Sin Permisos para acceder");
        } else {
          setLoginError("");
        }
        if (typeof data === "object" && data.success) {
          setUserLogged(data);
          try {
            await storeData(data);
          } catch (Exception) {
            setUserLogged(null);
            setLoginError("Error Almacenando la Información");
          }
        } else {
          setUserLogged(null);
          console.log("catcha app navigation ln 67");
          setLoginError("No se encontro ningun usuario con esta información");
        }
        return data;
      })
      .catch((error) => {
        setUserLogged(null);
        console.log("catcha app navigation ln 75");
        setLoginError("No se encontro ningun usuario con esta información");
        return error;
      });
  };
  return (
    <UserContext.Provider value={{ data, updateUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
