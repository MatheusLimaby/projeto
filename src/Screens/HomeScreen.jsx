import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Bem-vindo ao Mundo Pokémon!</Text>
      <Button
        title="Ver Pokédex"
        onPress={() => navigation.navigate("Pokemons")}
      />
      <Button
        title="Ver Treinadores"
        onPress={() => navigation.navigate("Treinadores")}
      />
      <Button title="Ver Itens" onPress={() => navigation.navigate("Itens")} />
      <Button
        title="Ver Favoritos"
        onPress={() => navigation.navigate("Favoritos")}
      />
    </View>
  );
}
