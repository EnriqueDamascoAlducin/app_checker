import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { routes } from "../utils/routes";
import { useState, useEffect } from "react";

import LoginScreen from "../screens/views/Account/LoginScreen";
import ProfilePage from "../screens/views/Account/GuestScreen";
import LoaderScreen from "../screens/views/Home/LoaderScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AccessStack from "../screens/stacks/AccessStack";
import AccountStack from "../screens/stacks/AccountStack";


const Tab = createBottomTabNavigator();

export function AppNavigation() {
  const [userLogged, setUserLogged] = useState(null);

  const [isGuest, setIsGuest] = useState(false);

  const url = routes.domain.url + "api/token";
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const login = async (userAccount, passwordAccount) => {
    let data = {
      email: userAccount,
      password: passwordAccount,
    };

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
        return data;
      })
      .catch((error) => {
        return error;
      });
    if (typeof response === "object" && response.success) {
      setUserLogged(response);
      setIsGuest(response.is_guest);
      try {
        await storeData(response);
        return true;
      } catch (Exception) {
        setUserLogged(null);
        return false;
      }
    } else {
      await setUserLogged(null);
      console.log("catcha app navigation ln 62");
      return false;
    }
  };

  const checkAndRemoveItem = async () => {
    try {
      const itemValue = await AsyncStorage.getItem("user");
      if (itemValue !== null) {
        // El item existe, se puede eliminar
        await AsyncStorage.removeItem("user");
        setUserLogged(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkAndRemoveItem();
  }, []);
  if (isGuest) return <ProfilePage />;
  else return userLogged ? <LoggedUser /> : <LoginScreen login={login} />;
}

function LoggedUser() {
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
        <Tab.Screen
          name={routes.account.stack_key}
          component={AccountStack}
          options={routes.account.profile.options}
        />
        {/*<Tab.Screen name={routes.home.stack_key} component={HomeStack} options={routes.home.options} /> */}
        <Tab.Screen
          name={routes.access.stack_key}
          component={AccessStack}
          options={routes.access.options}
        />
      </Tab.Navigator>
    </>
  );
}

function GuestScreen() {}

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
