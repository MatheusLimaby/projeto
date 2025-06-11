import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
// 1. Import corrigido para usar o novo serviço local
import EquipeService from "./EquipeService";

export default function EquipeFormScreen({ route, navigation }) {
  const { teamId } = route.params || {};
  const isEditing = !!teamId;

  const [nomeEquipe, setNomeEquipe] = useState("");
  const [formato, setFormato] = useState("");
  const [pokemons, setPokemons] = useState("");

  useEffect(() => {
    if (isEditing) {
      // 2. Chamada da função corrigida para .buscar()
      EquipeService.buscar(teamId).then((data) => {
        if (data) {
          setNomeEquipe(data.nomeEquipe);
          setFormato(data.formato);
          if (data.pokemons && data.pokemons.length > 0) {
            setPokemons(data.pokemons.join(", "));
          }
        }
      });
    }
  }, [teamId]);

  const handleSave = async () => {
    if (!nomeEquipe) {
      Alert.alert("Erro", "O nome da equipe é obrigatório!");
      return;
    }

    const pokemonsArray = pokemons
      ? pokemons.split(",").map((p) => p.trim())
      : [];

    const teamData = {
      id: teamId,
      nomeEquipe,
      formato,
      pokemons: pokemonsArray,
    };

    // 3. Chamada da função corrigida para .salvar()
    await EquipeService.salvar(teamData);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          {isEditing ? "Editar Equipe" : "Nova Equipe"}
        </Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Nome da Equipe"
            value={nomeEquipe}
            onChangeText={setNomeEquipe}
            style={styles.input}
          />
          <TextInput
            placeholder="Formato (Ex: Solo, Dupla)"
            value={formato}
            onChangeText={setFormato}
            style={styles.input}
          />
          <TextInput
            placeholder="Pokémon, separados por vírgula"
            value={pokemons}
            onChangeText={setPokemons}
            style={styles.input}
            multiline
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
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
  form: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
