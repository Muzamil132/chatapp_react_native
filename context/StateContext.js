import React, { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        console.log(JSON.parse(value));
        setState({ ...state, user: JSON.parse(value) });
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const addUser = (name) => {
    const userId = Math.random().toString(36).substring(7);
    try {
      AsyncStorage.setItem("user", JSON.stringify({ name, userId }));
      setState({ ...state, user: { name, userId } });
    } catch (e) {
      console.log(e);
    }
  };

  const [state, setState] = React.useState({
    user: null,
  });
  console.log(state.user);
  const Logout = () => {
    AsyncStorage.removeItem("user");
    setState({ ...state, user: null });
  };
  return (
    <StateContext.Provider value={{ state, addUser, Logout }}>
      {children}
    </StateContext.Provider>
  );
};
