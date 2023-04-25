import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "../../utils/routes";
import AccesosScreen from "../views/Access/AccesosScreen";
import ListScreen from "../views/Access/ListScreen";
import HomeScreen from "../views/Access/HomeScreen";
const Stack = createNativeStackNavigator();

export default function AccessStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.access.tab_key}
        component={HomeScreen}
        options={routes.access.options}
      />
      <Stack.Screen
        name={routes.access.register.tab_key}
        component={AccesosScreen}
        options={routes.access.options}
      />
      <Stack.Screen
        name={routes.access.list.tab_key}
        component={ListScreen}
        options={routes.access.options}
      />
    </Stack.Navigator>
  );
}
