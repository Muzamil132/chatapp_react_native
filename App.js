import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";

import Home from "./screens/Home";
import Profile from "./screens/Profile";
import StyledButton from "./screens/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateProvider } from "./context/StateContext";
import { StateContext } from "./context/StateContext";
import Navigation from "./Navigation";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StateProvider>
      <Navigation />
    </StateProvider>
  );
}

const styles = StyleSheet.create({
  buttoncontainer: {
    backgroundColor: "#1f2937",
    padding: 10,
    borderRadius: 10,
  },

  inputbox: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderColor: "#1f2937",
    borderRadius: 4,
    borderWidth: 1,
    height: 50,
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  todotext: {
    fontSize: 15,
    color: "#e11d48",
  },
  todotext1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e11d48",
  },

  todobox: {
    marginTop: 10,
    backgroundColor: "#fff1f2",
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btntext: {
    color: "#10b981",
    fontSize: 15,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#f0fdf4",
    color: "#10b981",
    paddingHorizontal: 20,
    paddingVertical: 15,
    display: "flex",
  },

  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f0fdf4",
    borderBottomWidth: 2,
    borderColor: "#10b981",
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },

  box: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
    alignItems: "flex-start",
    borderRadius: 10,
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
