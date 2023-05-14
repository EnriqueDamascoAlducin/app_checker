import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { routes } from "../utils/routes";
import { useState, useEffect } from "react";

import LoginScreen from "../screens/views/Account/LoginScreen";
import ProfilePage from "../screens/views/Account/GuestScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AccessStack from "../screens/stacks/AccessStack";

import { modelName, modelId, deviceName, osName } from "expo-device";
import AccountScreen from "../screens/views/Account/AccountScreen";
import InternetValidationScreen from "../screens/views/Home/InternetValidationScreen";
import { useNetInfo } from "@react-native-community/netinfo";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  const [userLogged, setUserLogged] = useState(null);
  const [loginError, setLoginError] = useState("");

  const url = routes.domain.url + "api/token";
  const netInfo = useNetInfo();
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log("Error catc ln 28");
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

  const logout = async () => {
    checkAndRemoveItem();
  };
  const checkAndRemoveItem = async () => {
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

  useEffect(() => {
    checkAndRemoveItem();
  }, []);
  /*if (!netInfo.isConnected) return <InternetValidationScreen />;*/
  if (userLogged && userLogged.is_guest) return <ProfilePage logout={logout} />;
  else
    return userLogged && loginError === "" ? (
      <LoggedUser user={userLogged} logout={logout} />
    ) : (
      <LoginScreen login={login} loginError={loginError} />
    );
}

function LoggedUser({ user, logout }) {
  function backgroundColorActive(route) {
    if (route.name == routes.home.tab_key) {
      return "#322cea";
    } else if (
      route.name == routes.account.profile.tab_key ||
      route.name == routes.account.login.tab_key
    ) {
      return "#3ec172";
    } else {
      return "#ff9d00";
    }
  }
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: backgroundColorActive(route),
          tabBarInactiveTintColor: "#646464",
          tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
          headerShown: false,
        })}
      >
        {user.permissions && user.permissions.showTabAccount ? (
          <Tab.Screen
            name={routes.account.stack_key}
            component={AccountScreen}
            options={routes.account.profile.options}
          />
        ) : null}
        {user.permissions && user.permissions.showAccesstTab ? (
          <Tab.Screen
            name={routes.access.stack_key}
            component={AccessStack}
            options={routes.access.options}
          />
        ) : null}
      </Tab.Navigator>
    </>
  );
}

function screenOptions(router, color, size) {
  var iconName;
  if (router.name == routes.home.tab_key) {
    iconName = "home-outline";
  } else if (
    router.name == routes.account.profile.tab_key ||
    router.name == routes.account.login.tab_key
  ) {
    iconName = "account-cog-outline";
  } else {
    iconName = "account-multiple-outline";
  }
  return (
    <Icon type="material-community" name={iconName} color={color} size={size} />
  );
}
