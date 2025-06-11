import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, Image, ActivityIndicator, SafeAreaView, Button } from "react-native";
// O import do api.js foi removido

const capitalize = (str) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function ItemDetailScreen({ route, navigation }) {
  const { itemName } = route.params;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        // 1. A chamada à API agora usa 'fetch' diretamente
        const response = await fetch(`https://pokeapi.co/api/v2/item/${itemName}`);
        const data = await response.json();
        setItem(data);
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Item não encontrado.</Text>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  const description =
    item.flavor_text_entries
      .find((e) => e.language.name === "en")
      ?.text.replace(/[\n\f\r]/g, " ") ?? "Descrição não disponível.";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: item.sprites.default }}
          style={styles.itemImage}
        />
        <Text style={styles.title}>{capitalize(item.name)}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Categoria:</Text>
          <Text style={styles.infoValue}>{capitalize(item.category.name)}</Text>
        </View>
        <View style={styles.infoBox}>
           <Text style={styles.infoLabel}>Custo:</Text>
           <Text style={styles.infoValue}>
             {item.cost === 0 ? "Não está à venda" : `${item.cost} moedas`}
           </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos bastante simplificados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    margin: 20,
    fontSize: 16,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: '#333'
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 16,
    color: '#555',
  },
});
