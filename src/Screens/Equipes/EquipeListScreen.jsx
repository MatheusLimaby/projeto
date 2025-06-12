import React, { useState, useEffect } from "react";
import {View,Text,FlatList,Alert,StyleSheet,SafeAreaView,TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import EquipeService from "./EquipeService";

export default function EquipeListScreen({ navigation }) {
  const [teams, setTeams] = useState([]);
  const isFocused = useIsFocused();

  const loadTeams = async () => {
 
    const data = await EquipeService.listar();
    setTeams(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadTeams();
    }
  }, [isFocused]);

  const Deletar = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que quer desfazer esta equipe?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          onPress: async () => {

            await EquipeService.remover(id);
            loadTeams();
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderTeamItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.nomeEquipe}</Text>
      <Text style={styles.cardSubtitle}>Formato: {item.formato}</Text>
      <Text style={styles.cardContent}>Membros: {item.membros}</Text>
      <Text style={styles.cardContent}>Ginásio: {item.ginasio}</Text>
      <Text style={styles.cardContent}>
        Pokémon:{" "}
        {item.pokemons && item.pokemons.length > 0
          ? item.pokemons.join(", ")
          : "Nenhum"}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate("EquipeForm", { teamId: item.id })}
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
      <Text style={styles.title}>Minhas Equipes</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("EquipeForm", {})}
      >
        <Text style={styles.buttonText}>Criar Nova Equipe</Text>
      </TouchableOpacity>
      <FlatList
        data={teams}
        renderItem={renderTeamItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma equipe criada.</Text>
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
    backgroundColor: "green",
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
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 14,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 15,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
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
