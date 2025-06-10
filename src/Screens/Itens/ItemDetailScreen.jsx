import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Card,
  Text,
  Avatar,
  Divider,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import api from "../../Services/api";

const capitalize = (str) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function ItemDetailScreen({ route }) {
  const navigation = useNavigation();
  const { itemName } = route.params;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`item/${itemName}`);
        setItem(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhe do item:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemName]);

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} animating={true} size="large" />
    );
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Item não encontrado.</Text>
      </View>
    );
  }

  // Encontra o texto de descrição em inglês e limpa quebras de linha
  const description =
    item.flavor_text_entries
      .find((e) => e.language.name === "en")
      ?.text.replace(/[\n\f\r]/g, " ") ?? "Descrição não disponível.";

  const displayName = capitalize(item.name);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content style={styles.header}>
            <Avatar.Image
              size={100}
              source={{ uri: item.sprites.default }}
              style={styles.avatar}
            />
            <Text variant="headlineSmall" style={styles.title}>
              {displayName}
            </Text>
          </Card.Content>

          <Divider style={styles.divider} />

          <Card.Content>
            <Text style={styles.description}>{description}</Text>
          </Card.Content>

          <Divider style={styles.divider} />

          <Card.Content style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Categoria:</Text>
              <Text style={styles.value}>{capitalize(item.category.name)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Custo:</Text>
              <Text style={styles.value}>
                {item.cost === 0 ? "Não está à venda" : `${item.cost} moedas`}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 15,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
  },
  avatar: {
    marginBottom: 15,
    backgroundColor: "#E0E0E0",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    padding: 10,
  },
  divider: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  infoSection: {
    paddingVertical: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
});
