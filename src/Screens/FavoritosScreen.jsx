import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  Card,
  Avatar,
  Text,
  Icon,
  Appbar,
  Chip,
} from "react-native-paper";
import { getFavorites } from "../Services/Storage";
import api from "../Services/api";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Helper para obter a cor do tipo do Pokémon
const getTypeColor = (type) => {
    const colors = {
      fire: '#FD7D24', grass: '#9BCC50', water: '#4592C4', bug: '#729F3F',
      normal: '#A4ACAF', poison: '#B97FC9', electric: '#EED535', ground: '#AB9842',
      fairy: '#FDB9E9', fighting: '#D56723', psychic: '#F366B9', rock: '#A38C21',
      ghost: '#7B62A3', ice: '#51C4E7', dragon: '#F16E57', steel: '#9EB7B8', dark: '#707070', flying: '#A890F0'
    };
    return colors[type] || '#A9A9A9';
};

export default function FavoritosScreen({ navigation }) {
  const [favoriteDetails, setFavoriteDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const fetchFavoriteDetails = async () => {
        setLoading(true);
        try {
          const favoritePokemons = await getFavorites();
          if (favoritePokemons.length === 0) {
            setFavoriteDetails([]);
            return;
          }
          const detailsPromises = favoritePokemons.map((p) =>
            api.get(`pokemon/${p.id}`)
          );
          const responses = await Promise.all(detailsPromises);
          const fullDetails = responses.map((res) => res.data);
          setFavoriteDetails(fullDetails);
        } catch (error) {
          console.error("Erro ao buscar detalhes dos favoritos:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchFavoriteDetails();
    }
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Pokédex", {
          screen: "PokemonDetail",
          params: { pokemonId: item.id },
        })
      }
    >
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          {/* Container da Imagem com cor de fundo do tipo */}
          <View style={[styles.imageContainer, {backgroundColor: getTypeColor(item.types[0].type.name)}]}>
            <Avatar.Image
              source={{ uri: item.sprites.other["official-artwork"].front_default }}
              size={70}
              style={styles.avatar}
            />
          </View>
          {/* Container das informações */}
          <View style={styles.infoContainer}>
            <Text style={styles.pokemonName}>{capitalize(item.name)}</Text>
            <Text style={styles.pokemonId}>#{String(item.id).padStart(4, "0")}</Text>
            {/* Container dos tipos */}
            <View style={styles.typesContainer}>
                {item.types.map(({type}) => (
                    <Chip key={type.name} style={[styles.chip, {backgroundColor: getTypeColor(type.name)}]}>
                        <Text style={styles.chipText}>{capitalize(type.name)}</Text>
                    </Chip>
                ))}
            </View>
          </View>
          <Icon source="chevron-right" size={30} color="#BDBDBD" />
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" color="#EC407A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>


      {favoriteDetails.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon source="heart-off-outline" size={80} color="#E0E0E0" />
          <Text variant="headlineSmall" style={styles.emptyText}>
            Nenhum Favorito
          </Text>
          <Text variant="bodyLarge" style={styles.emptySubtext}>
            Adicione Pokémon aos seus favoritos para vê-los aqui.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteDetails}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1}, // Fundo rosa bem claro
  loadingContainer: { flex: 1, justifyContent: 'center', backgroundColor: "#FCE4EC"},
  appbar: { backgroundColor: '#EC407A' }, // Cor tema da seção
  appbarTitle: { color: '#fff', fontWeight: 'bold' },
  list: { padding: 10 },
  card: { 
    marginVertical: 8, 
    marginHorizontal: 8,
    borderRadius: 16,
    elevation: 3,
  },
  cardContent: { 
    flexDirection: "row", 
    alignItems: "center",
    padding: 12,
  },
  imageContainer: {
    borderRadius: 50,
    padding: 5,
    marginRight: 16,
  },
  avatar: { 
    backgroundColor: "transparent",
  },
  infoContainer: {
    flex: 1,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pokemonId: { 
    color: "gray",
    marginBottom: 8,
  },
  typesContainer: {
    flexDirection: 'row',
  },
  chip: {
    marginRight: 5,
    height: 28,
    alignItems: 'center',
  },
  chipText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    marginTop: 20,
    color: "#AD1457", // Cor escura do tema
    fontWeight: 'bold',
  },
  emptySubtext: {
    marginTop: 8,
    color: "#D81B60",
    textAlign: "center",
  },
});