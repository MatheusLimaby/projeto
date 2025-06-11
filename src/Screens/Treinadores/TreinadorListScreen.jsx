import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
// 1. Import corrigido para usar o novo serviço local
import TreinadorService from "./TreinadorService";

// Imagem de fallback caso o treinador não tenha foto
const PlaceholderImage = require("../../../assets/icon.png");

export default function TreinadorListScreen({ navigation }) {
  const [trainers, setTrainers] = useState([]);
  const isFocused = useIsFocused();

  const loadTrainers = async () => {
    // 2. Chamada da função corrigida para .listar()
    const data = await TreinadorService.listar();
    setTrainers(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadTrainers();
    }
  }, [isFocused]);

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que quer deletar este treinador?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          onPress: async () => {
            // 3. Chamada da função corrigida para .remover()
            await TreinadorService.remover(id);
            loadTrainers();
          },
          style: "destructive",
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
        <Text>Pokémon Inicial: {item.pokemonInicial}</Text>
        {/* Campo de insígnias removido para consistência com o formulário */}
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
          onPress={() => handleDelete(item.id)}
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
        keyExtractor={(item) => item.id}
        renderItem={renderTrainerItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum treinador criado.</Text>
        }
      />
    </SafeAreaView>
  );
}

// Estilos simplificados mantidos
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
