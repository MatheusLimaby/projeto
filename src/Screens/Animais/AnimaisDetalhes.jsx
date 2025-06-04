import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

export default function ProdutoDetalhes({ route }) {
  const { produto } = route.params;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={produto.nome} subtitle={produto.categoria} />
        <Card.Content>
          <Text style={styles.label}>Preço:</Text>
          <Text style={styles.value}>R$ {produto.preco}</Text>

          <Text style={styles.label}>Quantidade:</Text>
          <Text style={styles.value}>{produto.quantidade}</Text>

          <Text style={styles.label}>Descrição:</Text>
          <Text style={styles.value}>{produto.descricao}</Text>

          <Text style={styles.label}>Fornecedor:</Text>
          <Text style={styles.value}>{produto.fornecedor}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    padding: 8,
  },
  label: {
    fontWeight: "bold",
    marginTop: 8,
  },
  value: {
    marginBottom: 4,
  },
});
