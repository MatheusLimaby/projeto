import React, { useState, useEffect } from "react";
import {View,Text,FlatList,Alert,StyleSheet,SafeAreaView,TouchableOpacity,} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import InsigniaService from "./InsigniaService";

export default function InsigniaListScreen({ navigation }) {
  const [badges, setBadges] = useState([]);
  const isFocused = useIsFocused();

  const loadBadges = async () => {
  
    const data = await InsigniaService.listar();
    setBadges(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadBadges();
    }
  }, [isFocused]);

  const Deletar = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que quer remover esta insígnia?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          onPress: async () => {
    
            await InsigniaService.remover(id);
            loadBadges();
          },
        },
      ]
    );
  };

  const renderBadgeItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.nomeInsignia}</Text>
      <Text style={styles.cardSubtitle}>
        Líder: {item.liderGinasio} em {item.cidadeGinasio}
      </Text>
      <Text>Conquistada em: {item.dataConquista}</Text>
      {item.pokemonVitoria ? (
        <Text>Pokémon da Vitória: {item.pokemonVitoria}</Text>
      ) : null}
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
          onPress={() => Deletar(item.id)}
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
        <Text style={styles.buttonText}>Registrar Nova Insígnia</Text>
      </TouchableOpacity>
      <FlatList
        data={badges}
        keyExtractor={(item) => item.id}
        renderItem={renderBadgeItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma insígnia registrada.</Text>
        }
      />
    </SafeAreaView>
  );
}

// Estilos bastante simplificados
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
    backgroundColor: "purple",
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
