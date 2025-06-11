import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ItemListScreen from "../Screens/Itens/ItemListScreen";
import ItemDetailScreen from "../Screens/Itens/ItemDetailScreen";

const Stack = createNativeStackNavigator();
export default function ItensStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ItensList"
        component={ItemListScreen}
        options={{ title: "Lista de Itens" }}
      />
      <Stack.Screen
        name="ItemDetail"
        component={ItemDetailScreen}
        options={{ title: "Detalhes do Item" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
