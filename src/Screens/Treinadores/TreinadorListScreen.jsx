import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image, // Importar Image
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getTrainers, deleteTrainer } from "../../Services/Storage";

// Importe uma imagem padrão para ser usada caso o treinador não tenha foto
import PlaceholderImage from "../../../assets/icon.png";

export default function TreinadorListScreen({ navigation }) {
  const [trainers, setTrainers] = useState([]);
  const isFocused = useIsFocused();

  const loadTrainers = async () => {
    const data = await getTrainers();
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
            await deleteTrainer(id);
            loadTrainers();
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderTrainerItem = ({ item }) => (
    <View style={styles.trainerItem}>
      {/* 1. Imagem (avatar) adicionada ao card */}
      <Image
        source={item.imagem ? { uri: item.imagem } : PlaceholderImage}
        style={styles.avatar}
      />
      <View style={styles.trainerInfo}>
        <Text style={styles.trainerName}>{item.nome}</Text>
        <Text style={styles.trainerDetails}>Idade: {item.idade}</Text>
        <Text style={styles.trainerDetails}>
          Cidade Natal: {item.cidadeNatal}
        </Text>
        <Text style={styles.trainerDetails}>
          Pokémon Inicial: {item.pokemonInicial}
        </Text>
        <Text style={styles.trainerDetails}>
          Nº de Insígnias: {item.numInsignias}
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
        <Text style={styles.addButtonText}>Adicionar Novo Treinador</Text>
      </TouchableOpacity>
      <FlatList
        data={trainers}
        keyExtractor={(item) => item.id}
        renderItem={renderTrainerItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#1a73e8",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  list: {
    paddingBottom: 20,
  },
  trainerItem: {
    backgroundColor: "#fff",
    padding: 15, // Ajustado para melhor encaixe
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row", // Para alinhar imagem e texto
    alignItems: "center", // Para alinhar imagem e texto
  },
  // 2. Estilo para o avatar
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#eee",
  },
  trainerInfo: {
    flex: 1, // Faz com que as informações ocupem o espaço disponível
  },
  trainerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  trainerDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  buttonContainer: {
    // Mantém os botões à direita
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 5, // Adicionado espaço entre os botões
  },
  editButton: {
    backgroundColor: "#007bff",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
