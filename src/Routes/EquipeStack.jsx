import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EquipeListScreen from "../Screens/Equipes/EquipeListScreen";
import EquipeFormScreen from "../Screens/Equipes/EquipeFormScreen";

const Stack = createNativeStackNavigator();

export default function EquipeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EquipeList" component={EquipeListScreen} />
      <Stack.Screen name="EquipeForm" component={EquipeFormScreen} />
    </Stack.Navigator>
  );
}
