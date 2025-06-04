import React, { useEffect, useState } from "react";
import { View, FlatList, Alert, StyleSheet } from "react-native";
import { List, IconButton, Text, FAB } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    carregarProdutos();
  }, [isFocused]);

  const carregarProdutos = async () => {
    try {
      const dados = await AsyncStorage.getItem("produtos");
      const lista = dados ? JSON.parse(dados) : [];
      setProdutos(lista);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os produtos.");
    }
  };

  const excluirProduto = (id) => {
    Alert.alert(
      "Excluir Produto",
      "Tem certeza que deseja excluir este produto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const novosProdutos = produtos.filter((p) => p.id !== id);
              await AsyncStorage.setItem(
                "produtos",
                JSON.stringify(novosProdutos)
              );
              setProdutos(novosProdutos);
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir o produto.");
            }
          },
        },
      ]
    );
  };

  const editarProduto = (produto) => {
    navigation.navigate("ProdutoCadastro", { produto });
  };

  return (
    <View style={{ flex: 1 }}>
      {produtos.length === 0 ? (
        <View style={styles.vazio}>
          <Text>Nenhum produto cadastrado.</Text>
        </View>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <List.Item
              title={item.nome}
              description={`R$ ${item.preco.toFixed(2)} - ${item.categoria}`}
              right={() => (
                <>
                  <IconButton
                    icon="pencil"
                    onPress={() => editarProduto(item)}
                  />
                  <IconButton
                    icon="delete"
                    onPress={() => excluirProduto(item.id)}
                  />
                </>
              )}
            />
          )}
        />
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("ProdutoCadastro")}
        label="Novo Produto"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  vazio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    bottom:60
  },
});
