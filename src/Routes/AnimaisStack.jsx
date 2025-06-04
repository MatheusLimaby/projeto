import { StyleSheet } from "react-native";
import React from "react";
import ListaAnimais from "../Screens/Animais/ListaAnimais";
import AnimaisDetalhes from "../Screens/Animais/AnimaisDetalhes";
import AnimaisCadastro from "../Screens/Animais/AnimaisCadastro";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function AnimaisStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListaAnimais" component={ListaAnimais} />
      <Stack.Screen name="AnimaisDetalhes" component={AnimaisDetalhes} />
      <Stack.Screen name="AnimaisCadastro" component={AnimaisCadastro} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
