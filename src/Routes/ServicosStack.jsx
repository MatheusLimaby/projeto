import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaServicos from "../Screens/Servicos/ListaServicos";
import ServicoDetalhes from "../Screens/Servicos/ServicoDetalhes";
import ServicoCadastro from "../Screens/Servicos/ServicoCadastro";

const Stack = createNativeStackNavigator();

export default function ServicosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListaServicos" component={ListaServicos} />
      <Stack.Screen name="ServicoDetalhes" component={ServicoDetalhes} />
      <Stack.Screen name="ServicoCadastro" component={ServicoCadastro} />
    </Stack.Navigator>
  );
}
