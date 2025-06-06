import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TreinadorFormScreen from "../Screens/Treinadores/TreinadorFormScreen";
import TreinadorListScreen from "../Screens/Treinadores/TreinadorListScreen";

const Stack = createNativeStackNavigator();

export default function TreinadorStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="TreinadorList"
        component={TreinadorListScreen}
        options={{ title: "Lista de Treinadores" }}
      />
      <Stack.Screen
        name="TreinadorForm"
        component={TreinadorFormScreen}
        options={{ title: "Formulario de Treinadores" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
