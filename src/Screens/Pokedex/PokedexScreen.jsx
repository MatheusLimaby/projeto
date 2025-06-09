import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Card,
  Avatar,
  Text,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import api from "../../Services/api";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Cores associadas a cada tipo de Pokémon
const getTypeColor = (type) => {
  const colors = {
    fire: "#FFA07A",
    grass: "#90EE90",
    water: "#87CEFA",
    bug: "#94BC4A",
    normal: "#D8BFD8",
    poison: "#DDA0DD",
    electric: "#FFD700",
    ground: "#E0C068",
    fairy: "#FFB6C1",
    fighting: "#FF6347",
    psychic: "#FFC0CB",
    rock: "#B0A494",
    ghost: "#7B62A3",
    ice: "#ADD8E6",
    dragon: "#7038F8",
    steel: "#B8B8D0",
    dark: "#705848",
    flying: "#A890F0",
  };
  return colors[type] || "#A9A9A9";
};

export default function PokedexScreen() {
  const navigation = useNavigation();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await api.get("pokemon?limit=151");
        const pokemonDetails = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await api.get(pokemon.url);
            return {
              id: details.data.id,
              name: details.data.name,
              image:
                details.data.sprites.other["official-artwork"].front_default,
              type: details.data.types[0].type.name,
            };
          })
        );
        setPokemons(pokemonDetails);
      } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  // Card de Pokémon com novo estilo retangular
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("PokemonDetail", { pokemonId: item.id })
        }
      >
        <Card style={styles.card}>
          {/* Seção superior do card com a cor do tipo */}
          <View
            style={[
              styles.imageContainer,
              { backgroundColor: getTypeColor(item.type) },
            ]}
          >
            <Avatar.Image
              source={{ uri: item.image }}
              size={60}
              style={styles.avatar}
            />
          </View>
          {/* Seção inferior do card com o nome e ID */}
          <View style={styles.contentContainer}>
            <Text style={styles.pokemonName} numberOfLines={1}>
              {capitalize(item.name)}
            </Text>
            <Text style={styles.pokemonId}>
              #{String(item.id).padStart(3, "0")}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" color="#E63F34" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <FlatList
        data={pokemons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  appbar: {
    backgroundColor: "#E63F34",
  },
  appbarTitle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    paddingHorizontal: 4,
    paddingTop: 8,
  },
  cardContainer: {
    flex: 1 / 4, // Ocupa 1/4 da largura para a grade de 4 colunas
    padding: 4,
  },
  card: {
    borderRadius: 10, // Cantos arredondados
    elevation: 4,
    overflow: "hidden", // Garante que o conteúdo interno respeite os cantos arredondados
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  imageContainer: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 80, // Altura fixa para a área da imagem
  },
  avatar: {
    backgroundColor: "transparent",
  },
  contentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: "center",
  },
  pokemonName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  pokemonId: {
    fontSize: 10,
    color: "gray",
    marginTop: 2,
  },
});
