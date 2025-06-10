import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Card, Avatar, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import api from "../../Services/api";

const formatItemName = (str) => {
  const replaced = str.replace(/-/g, " ");
  return replaced.charAt(0).toUpperCase() + replaced.slice(1);
};

export default function ItemListScreen() {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  // ADICIONADO: Estado para controlar o número de colunas
  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("item?limit=52");
        const itemDetails = await Promise.all(
          response.data.results.map(async (item) => {
            const details = await api.get(item.url);
            return {
              id: details.data.id,
              name: details.data.name,
              displayName: formatItemName(details.data.name),
              image: details.data.sprites.default,
            };
          })
        );
        setItems(itemDetails);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("ItemDetail", { itemName: item.name })
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
              <Avatar.Icon
                size={80}
                icon="help-circle-outline"
                style={styles.avatar}
              />
            )}
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.itemName} numberOfLines={1}>
              {item.displayName}
            </Text>
            <Text style={styles.itemId}>ID: {item.id}</Text>
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
        // CORREÇÃO: Adicionada a prop "key" que muda junto com "numColumns"
        key={numColumns}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
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
  list: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  cardContainer: {
    flex: 1 / 2, // Ocupa 1/2 da largura para a grade de 2 colunas
    padding: 8,
  },
  card: {
    borderRadius: 10,
    elevation: 4,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  imageContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    backgroundColor: "#E0E0E0",
  },
  avatar: {
    backgroundColor: "transparent",
  },
  contentContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  itemId: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },
});
