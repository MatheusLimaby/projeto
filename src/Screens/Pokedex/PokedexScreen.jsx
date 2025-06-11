import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { Card, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";


const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function PokedexScreen() {
  const navigation = useNavigation();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // 1. A chamada à API agora usa 'fetch' diretamente
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const listData = await response.json(); // Converte a resposta para JSON

        // 2. O tratamento de dados com Promise.all foi mantido
        const pokemonDetails = await Promise.all(
          listData.results.map(async (pokemon) => {
            // 3. A busca de detalhes também usa 'fetch'
            const detailResponse = await fetch(pokemon.url);
            const details = await detailResponse.json();

            return {
              id: details.id,
              name: details.name,
              image: details.sprites.other["official-artwork"].front_default,
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

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("PokemonDetail", { pokemonId: item.id })
        }
      >
        <Card style={styles.card}>
          <View style={styles.imageContainer}>
            <Avatar.Image
              source={{ uri: item.image }}
              size={80}
              style={styles.avatar}
            />
          </View>
          <View style={styles.infoContainer}>
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
        numColumns={3}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  list: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  cardContainer: {
    flex: 1 / 3,
    padding: 6,
  },
  card: {
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  avatar: {
    backgroundColor: "transparent",
  },
  infoContainer: {
    padding: 10,
    alignItems: "center",
  },
  pokemonName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  pokemonId: {
    fontSize: 12,
    color: "gray",
  },
});
