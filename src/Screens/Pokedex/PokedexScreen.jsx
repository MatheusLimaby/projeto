import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, ActivityIndicator } from "react-native";
import api from "../../Services/api";

export default function PokedexScreen({ navigation }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("pokemon?limit=151").then((response) => {
      setPokemons(response.data.results);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Text style={{ fontSize: 24, textAlign: "center", margin: 10 }}>
        Pokédex
      </Text>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() =>
              navigation.navigate("PokemonDetail", { pokemonName: item.name })
            }
          />
        )}
      />
    </View>
  );
}
