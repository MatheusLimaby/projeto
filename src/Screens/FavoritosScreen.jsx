import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getFavorites } from "../Services/Storage";

export default function FavoritosScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getFavorites().then(setFavorites);
    }
  }, [isFocused]);

  return (
    <View>
      <Text style={{ fontSize: 24, textAlign: "center", margin: 10 }}>
        Pokémon Favoritos
      </Text>
      {favorites.length === 0 ? (
        <Text style={{ textAlign: "center" }}>
          Você ainda não tem Pokémon favoritos.
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Button
              title={item.name}
              onPress={() =>
                navigation.navigate("Pokemons", {
                  screen: "PokemonDetail",
                  params: { pokemonName: item.name },
                })
              }
            />
          )}
        />
      )}
    </View>
  );
}
