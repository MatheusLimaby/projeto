import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getTeams, deleteTeam } from "../../Services/Storage";

export default function EquipeListScreen({ navigation }) {
  const [teams, setTeams] = useState([]);
  const isFocused = useIsFocused();

  const loadTeams = async () => {
    const data = await getTeams();
    setTeams(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadTeams();
    }
  }, [isFocused]);

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que quer desfazer esta equipe?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          onPress: async () => {
            await deleteTeam(id);
            loadTeams();
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderTeamItem = ({ item }) => (
    <View style={styles.teamCard}>
      <Text style={styles.teamName}>{item.nomeEquipe}</Text>
      <Text style={styles.teamFormat}>Formato: {item.formato}</Text>
      <View style={styles.pokemonList}>
        <Text style={styles.pokemonTitle}>Pokémon:</Text>
        <Text style={styles.pokemonText}>{item.pokemons.join(", ")}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate("EquipeForm", { teamId: item.id })}
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
      <Text style={styles.title}>Minhas Equipes</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("EquipeForm", {})}
      >
        <Text style={styles.addButtonText}>Criar Nova Equipe</Text>
      </TouchableOpacity>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={renderTeamItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>Nenhuma equipe criada.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef5f9", // Um fundo ligeiramente azulado
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#1a3b5c",
  },
  addButton: {
    backgroundColor: "#28a745", // Um azul vibrante
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  teamCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  teamName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a3b5c",
    marginBottom: 5,
  },
  teamFormat: {
    fontSize: 14,
    color: "#555",
    fontStyle: "italic",
    marginBottom: 15,
  },
  pokemonList: {
    backgroundColor: "#f7f9fa",
    borderRadius: 8,
    padding: 10,
  },
  pokemonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  pokemonText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: "#20c997", // Um verde menta
  },
  deleteButton: {
    backgroundColor: "#e63946", // Um vermelho forte
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
});
