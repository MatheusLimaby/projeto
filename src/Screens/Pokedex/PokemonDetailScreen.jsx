import React, { useState, useEffect } from "react";
import {View,StyleSheet,ScrollView,Image,Text,ActivityIndicator,Button,} from "react-native";
import axios from "axios"; 

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

export default function PokemonDetailScreen({ route, navigation }) {
  const { pokemonId } = route.params;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
    
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
  
        setPokemon(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [pokemonId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Pokémon não encontrado.</Text>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: pokemon.sprites.other["official-artwork"].front_default,
          }}
          style={styles.pokemonImage}
        />
        <Text style={styles.pokemonName}>{capitalize(pokemon.name)}</Text>

        <View style={styles.typesContainer}>
          {pokemon.types.map(({ type }) => (
            <View key={type.name} style={styles.chip}>
              <Text style={styles.chipText}>{capitalize(type.name)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informações Básicas</Text>
          <Text>Altura: {pokemon.height / 10} m</Text>
          <Text>Peso: {pokemon.weight / 10} kg</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          {pokemon.stats.map((stat) => (
            <Text>
              {capitalize(stat.stat.name)}: {stat.base_stat}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    margin: 20,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 15,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  pokemonName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  typesContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  chip: {
    backgroundColor: "#666",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  chipText: {
    color: "#fff",
  },
  infoSection: {
    width: "100%",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
