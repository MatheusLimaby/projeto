import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokedexScreen from "../Screens/Pokedex/PokedexScreen";
import PokemonDetailScreen from "../Screens/Pokedex/PokemonDetailScreen";

const Stack = createNativeStackNavigator();

export default function PokedexStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Pokedex"
        component={PokedexScreen}
        options={{ title: "Pokédex" }}
      />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={{ title: "Detalhes do Pokémon" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
