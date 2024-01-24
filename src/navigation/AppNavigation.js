import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { routes } from "../utils/routes";
import { useState, useEffect, useContext } from "react";

import LoginScreen from "../screens/views/Account/LoginScreen";
import ProfilePage from "../screens/views/Account/GuestScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AccessStack from "../screens/stacks/AccessStack";

import { modelName, modelId, deviceName, osName } from "expo-device";
import AccountScreen from "../screens/views/Account/AccountScreen";
import InternetValidationScreen from "../screens/views/Home/InternetValidationScreen";
import { useNetInfo } from "@react-native-community/netinfo";

import { UserContext } from "../Context/UserContext";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  const [userLogged, setUserLogged] = useState(null);
  const [loginError, setLoginError] = useState("");
  const { user, updateUser, login, logout } = useContext(UserContext);
  const url = routes.domain.url + "api/token";
  const netInfo = useNetInfo();

 

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
