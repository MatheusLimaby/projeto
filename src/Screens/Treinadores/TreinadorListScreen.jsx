import React, { useState, useEffect } from "react";
import {View,Text,FlatList,Alert,StyleSheet,SafeAreaView,TouchableOpacity,Image,} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import TreinadorService from "./TreinadorService";


const PlaceholderImage = require("../../../assets/pokedex-bg.png");

export default function TreinadorListScreen({ navigation, route }) {
  const [trainers, setTrainers] = useState([]);
  const isFocused = useIsFocused();

  const loadTrainers = async () => {
    const data = await TreinadorService.listar();
    setTrainers(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadTrainers();
    }
  }, [isFocused]);

  const Deletar = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que quer deletar este treinador?",
      [
        { text: "Cancelar"},
        {
          text: "Deletar",
          onPress: async () => {

            await TreinadorService.remover(id);
            loadTrainers();
          },
     
        },
      ]
    );
  };

  const renderTrainerItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={item.imagem ? { uri: item.imagem } : PlaceholderImage}
        style={styles.avatar}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <Text>Idade: {item.idade}</Text>
        <Text>Cidade: {item.cidadeNatal}</Text>
        <Text>
          Pokémon Inicial:{" "}
          {item.pokemonInicial }
        </Text>
        <Text>
          Itens:{" "}
          {item.itens && Array.isArray(item.itens) && item.itens.length > 0? item.itens.join(", ") : "Nenhum"}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() =>
            navigation.navigate("TreinadorForm", { trainerId: item.id })
          }
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => Deletar(item.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Treinadores</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("TreinadorForm", {})}
      >
        <Text style={styles.buttonText}>Adicionar Novo Treinador</Text>
      </TouchableOpacity>
      <FlatList
        data={trainers}
        renderItem={renderTrainerItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum treinador criado.</Text>
        }
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
  addButton: {
    backgroundColor: "royalblue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  cardContent: {
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: "orange",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});
