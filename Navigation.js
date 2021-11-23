import React from "react";
import { View, Button } from "react-native";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { StateContext } from "./context/StateContext";
const Navigation = () => {
  const { state, Logout } = React.useContext(StateContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Welcome",
            headerStyle: { backgroundColor: "#1f2937" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
            headerRight: () => (
              <Button
                onPress={() => Logout()}
                title="Log out"
                color="#1f2937"
              />
            ),
          }}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={({ route }) => ({
            title: route.params.name.name,
            headerStyle: { backgroundColor: "#1f2937" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
