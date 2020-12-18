import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import List from "./components/List";
import Details from "./components/Details";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#B40000" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "React Native Final",
            headerTitleStyle: {
              fontSize: 26,
              fontWeight: "300",
            },
          }}
        />
        <Stack.Screen
          name="List"
          component={List}
          options={{
            title: "Restaurants Nearby",
            headerTitleStyle: {
              fontSize: 26,
              fontWeight: "300",
            },
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: "Restaurant Info.",
            headerTitleStyle: {
              fontSize: 26,
              fontWeight: "300",
            },
          }}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
