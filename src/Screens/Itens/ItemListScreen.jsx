import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// 1. A função para formatar o nome foi adicionada de volta.
const formatItemName = (str) => {
  if (!str) return "";
  // Troca traços por espaços e capitaliza a primeira letra.
  const replaced = str.replace(/-/g, " ");
  return replaced.charAt(0).toUpperCase() + replaced.slice(1);
};

export default function ItemListScreen() {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/item?limit=100"
        );
        const listData = await response.json();

        const itemData = listData.results.map((item, index) => {
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`;
          return {
            id: index + 1,
            name: item.name,
            // 2. Criamos um 'displayName' usando a função de formatação.
            displayName: formatItemName(item.name),
            image: imageUrl,
          };
        });

        setItems(itemData);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ItemDetail", { itemName: item.name })}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      {/* 3. Agora usamos o 'displayName' formatado para exibição. */}
      <Text style={styles.itemName} numberOfLines={2}>
        {item.displayName}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

// Estilos básicos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 5,
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    height: 120,
    justifyContent: "center",
  },
  itemImage: {
    width: 60,
    height: 60,
  },
  itemName: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
});
