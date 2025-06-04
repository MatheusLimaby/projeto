import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaProdutos from "../Screens/Produtos/ListaProdutos";
import ProdutoDetalhes from "../Screens/Produtos/ProdutoDetalhes";
import ProdutoCadastro from "../Screens/Produtos/ProdutoCadastro";

const Stack = createNativeStackNavigator();

export default function ProdutosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListaProdutos" component={ListaProdutos} />
      <Stack.Screen name="ProdutoDetalhes" component={ProdutoDetalhes} />
      <Stack.Screen name="ProdutoCadastro" component={ProdutoCadastro} />
    </Stack.Navigator>
  );
}
