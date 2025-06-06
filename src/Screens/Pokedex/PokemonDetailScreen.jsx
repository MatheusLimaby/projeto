import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import api from "../../Services/api";
import { toggleFavorite, getFavorites } from "../../Services/Storage";

export default function PokemonDetailScreen({ route }) {
  const { pokemonName } = route.params;
  const [pokemon, setPokemon] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Busca detalhes do Pokémon
    api.get(`pokemon/${pokemonName}`).then((response) => {
      setPokemon(response.data);
    });

    // Verifica se já é favorito
    getFavorites().then((favorites) => {
      const isFav = favorites.some((p) => p.name === pokemonName);
      setIsFavorite(isFav);
    });
  }, [pokemonName]);

  const handleToggleFavorite = () => {
    if (!pokemon) return;
    const pokemonData = { id: pokemon.id, name: pokemon.name };
    toggleFavorite(pokemonData).then(() => {
      setIsFavorite(!isFavorite);
      Alert.alert(
        "Favoritos",
        isFavorite
          ? `${pokemon.name} removido dos favoritos!`
          : `${pokemon.name} adicionado aos favoritos!`
      );
    });
  };

  if (!pokemon) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        {pokemon.name.toUpperCase()}
      </Text>
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={{ width: 200, height: 200 }}
      />
      <Text>ID: {pokemon.id}</Text>
      <Text>Altura: {pokemon.height / 10} m</Text>
      <Text>Peso: {pokemon.weight / 10} kg</Text>
      <Text>Tipos: {pokemon.types.map((t) => t.type.name).join(", ")}</Text>
      <Button
        title={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
        onPress={handleToggleFavorite}
      />
    </View>
  );
}
