import React, { useState, useEffect } from "react";
import {View,FlatList,StyleSheet,TouchableOpacity,Text,ActivityIndicator,SafeAreaView,
} from "react-native";
import { Card, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";  

const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function PokedexScreen({navigation,route}) {
 
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError(null);

        const listResponse = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );

        const pokemonDetails = await Promise.all(
          listResponse.data.results.map(async (pokemon) => {
            const detailResponse = await axios.get(pokemon.url);
            const details = detailResponse.data;

            return {
              id: details.id,
              name: details.name,
              image: details.sprites.other["official-artwork"].front_default,
            };
          })
        );

        setPokemons(pokemonDetails);
      } catch (erro) {
        console.error("Erro ao procurar Pokémon:", erro);
        setError("Falha ao carregar os Pokémon.");
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
            {item.image ? (
              <Avatar.Image
                source={{ uri: item.image }}
                size={80}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarPlaceholderText}>?</Text>
              </View>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.pokemonName}>
              {capitalize(item.name)}
            </Text>
            <Text style={styles.pokemonId}>
              #{String(item.id)}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.feedbackContainer}>
        <ActivityIndicator animating={true} size="large" color="#E63F34" />
        <Text style={styles.feedbackText}>A carregar Pokédex...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.feedbackContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pokemons}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  feedbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  feedbackText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    fontSize: 16,
    color: "#E63F34",
    textAlign: "center",
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
    backgroundColor: "#1F2937",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  avatar: {
    backgroundColor: "transparent",
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarPlaceholderText: {
    fontSize: 30,
    color: "#ccc",
  },
  infoContainer: {
    padding: 10,
    alignItems: "center",
  },
  pokemonName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  pokemonId: {
    fontSize: 12,
    color: "white",
    marginTop: 2,
  },
});
