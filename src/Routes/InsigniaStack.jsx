import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InsigniaListScreen from "../Screens/Insignias/InsigniaListScreen";
import InsigniaFormScreen from "../Screens/Insignias/InsigniaFormScreen";

const Stack = createNativeStackNavigator();

export default function InsigniaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InsigniaList" component={InsigniaListScreen} />
      <Stack.Screen name="InsigniaForm" component={InsigniaFormScreen} />
    </Stack.Navigator>
  );
}
