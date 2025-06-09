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
import { getBadges, deleteBadge } from "../../Services/Storage";

export default function InsigniaListScreen({ navigation }) {
  const [badges, setBadges] = useState([]);
  const isFocused = useIsFocused();

  const loadBadges = async () => {
    const data = await getBadges();
    setBadges(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadBadges();
    }
  }, [isFocused]);

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que quer remover esta insígnia?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          onPress: async () => {
            await deleteBadge(id);
            loadBadges();
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderBadgeItem = ({ item }) => (
    <View style={styles.badgeCard}>
      <Text style={styles.badgeName}>{item.nomeInsignia}</Text>
      <Text style={styles.gymInfo}>
        Líder: {item.liderGinasio} em {item.cidadeGinasio}
      </Text>
      <Text style={styles.dateInfo}>Conquistada em: {item.dataConquista}</Text>
      {item.pokemonVitoria && (
        <Text style={styles.victoryPokemon}>
          Pokémon da Vitória: {item.pokemonVitoria}
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() =>
            navigation.navigate("InsigniaForm", { badgeId: item.id })
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
      <Text style={styles.title}>Minhas Insígnias</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("InsigniaForm", {})}
      >
        <Text style={styles.addButtonText}>Registrar Nova Insígnia</Text>
      </TouchableOpacity>
      <FlatList
        data={badges}
        keyExtractor={(item) => item.id}
        renderItem={renderBadgeItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>Nenhuma insígnia registrada.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f2f7", // Um fundo com tom de lavanda claro
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#4a0e67", // Roxo escuro
  },
  addButton: {
    backgroundColor: "#8a2be2", // Um roxo médio (BlueViolet)
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
  badgeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#ffd700", // Dourado para destacar
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  badgeName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4a0e67",
    marginBottom: 8,
  },
  gymInfo: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  dateInfo: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  victoryPokemon: {
    fontSize: 14,
    color: "#555",
    fontStyle: "italic",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: "#9370db", // Roxo mais claro (MediumPurple)
  },
  deleteButton: {
    backgroundColor: "#c71585", // Rosa forte (MediumVioletRed)
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
