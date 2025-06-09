import React, { useState, useEffect } from "react";
// 1. ADICIONADO: Importar 'Image' do react-native
import { View, StyleSheet, ScrollView, Image } from "react-native";
import {
  ActivityIndicator,
  Text,
  Button,
  Card,
  Divider,
  Chip,
  FAB,
} from "react-native-paper";
import { toggleFavorite, getFavorites } from "../../Services/Storage";
import api from "../../Services/api";

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

// Cores para os tipos e o tema
const getTypeColor = (type) => {
  const colors = {
    fire: "#FD7D24",
    grass: "#9BCC50",
    water: "#4592C4",
    bug: "#729F3F",
    normal: "#A4ACAF",
    poison: "#B97FC9",
    electric: "#EED535",
    ground: "#AB9842",
    fairy: "#FDB9E9",
    fighting: "#D56723",
    psychic: "#F366B9",
    rock: "#A38C21",
    ghost: "#7B62A3",
    ice: "#51C4E7",
    dragon: "#F16E57",
    steel: "#9EB7B8",
    dark: "#707070",
    flying: "#A890F0",
  };
  return colors[type] || "#A9A9A9";
};

export default function PokemonDetailScreen({ route, navigation }) {
  const { pokemonId } = route.params;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`pokemon/${pokemonId}`);
        const favorites = await getFavorites();
        setPokemon(response.data);
        setIsFavorite(favorites.some((p) => p.id === pokemonId));
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [pokemonId]);

  const handleToggleFavorite = async () => {
    if (!pokemon) return;
    const pokemonData = { id: pokemon.id, name: pokemon.name };
    await toggleFavorite(pokemonData);
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} animating={true} size="large" />
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Pokémon não encontrado.</Text>
        <Button onPress={() => navigation.goBack()}>Voltar</Button>
      </View>
    );
  }

  const primaryType = pokemon.types[0].type.name;
  const themeColor = getTypeColor(primaryType);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <FAB
            style={[styles.fab, { backgroundColor: themeColor }]}
            small
            icon={isFavorite ? "heart" : "heart-outline"}
            color="#fff"
            onPress={handleToggleFavorite}
          />

          {/* Imagem do Pokémon */}
          <Card.Content style={styles.headerContent}>
            {/* 3. MUDANÇA: Substituído Avatar.Image por Image */}
            <Image
              source={{
                uri: pokemon.sprites.other["official-artwork"].front_default,
              }}
              style={styles.pokemonImage}
            />
          </Card.Content>

          {/* Tipos */}
          <Card.Content style={styles.typesContainer}>
            {pokemon.types.map(({ type }) => (
              <Chip
                key={type.name}
                style={[
                  styles.chip,
                  { backgroundColor: getTypeColor(type.name) },
                ]}
                textStyle={styles.chipText}
              >
                {capitalize(type.name)}
              </Chip>
            ))}
          </Card.Content>

          <Divider style={styles.divider} />

          {/* Todas as Informações */}
          <Card.Content style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Altura:</Text>
              <Text style={styles.value}>{pokemon.height / 10} m</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Peso:</Text>
              <Text style={styles.value}>{pokemon.weight / 10} kg</Text>
            </View>

            <Divider style={styles.innerDivider} />

            {pokemon.stats.map((stat, index) => (
              <View key={index} style={styles.infoRow}>
                <Text style={styles.label}>
                  {capitalize(stat.stat.name.replace("-", " "))}
                </Text>
                <Text style={styles.value}>{stat.base_stat}</Text>
              </View>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F7F7" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { textAlign: "center", marginTop: 20, fontSize: 18 },
  card: {
    margin: 16,
    borderRadius: 12,
    elevation: 4,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    top: 0,
    zIndex: 1,
  },
  headerContent: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  // 4. MUDANÇA: Estilo para a imagem retangular
  pokemonImage: {
    width: 200,
    height: 200,
    borderRadius: 8, // Cantos levemente arredondados
    backgroundColor: "transparent",
  },
  typesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  chip: {
    marginHorizontal: 5,
  },
  chipText: {
    color: "#fff",
    fontWeight: "bold",
  },
  divider: {
    marginHorizontal: 16,
  },
  innerDivider: {
    marginVertical: 12,
    backgroundColor: "#f2f2f2",
  },
  infoSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: {
    fontSize: 15,
    color: "#666",
    textTransform: "capitalize",
  },
  value: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
});
