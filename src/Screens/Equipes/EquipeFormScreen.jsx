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
import { saveTeam, getTeamById } from "../../Services/Storage";

export default function EquipeFormScreen({ route, navigation }) {
  const { teamId } = route.params;
  const isEditing = !!teamId;

  const [nomeEquipe, setNomeEquipe] = useState("");
  const [formato, setFormato] = useState("");
  const [descricao, setDescricao] = useState("");
  const [pokemons, setPokemons] = useState(Array(6).fill(""));

  useEffect(() => {
    if (isEditing) {
      getTeamById(teamId).then((data) => {
        if (data) {
          setNomeEquipe(data.nomeEquipe);
          setFormato(data.formato);
          setDescricao(data.descricao || "");
          // Preenche o array de pokémons com os existentes, deixando o resto vazio
          const existingPokemons = data.pokemons || [];
          const filledPokemons = [
            ...existingPokemons,
            ...Array(6 - existingPokemons.length).fill(""),
          ];
          setPokemons(filledPokemons);
        }
      });
    }
  }, [teamId]);

  const handlePokemonChange = (text, index) => {
    const newPokemons = [...pokemons];
    newPokemons[index] = text;
    setPokemons(newPokemons);
  };

  const handleSave = async () => {
    if (!nomeEquipe || !formato) {
      Alert.alert("Erro", "Nome da equipe e formato são obrigatórios!");
      return;
    }

    const teamData = {
      id: teamId,
      nomeEquipe,
      formato,
      descricao,
      pokemons: pokemons.filter((p) => p.trim() !== ""), // Filtra campos vazios
    };

    await saveTeam(teamData);
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
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Formato da Batalha (Ex: Solo, Dupla)"
            value={formato}
            onChangeText={setFormato}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Descrição (Opcional)"
            value={descricao}
            onChangeText={setDescricao}
            style={[styles.input, styles.textArea]}
            multiline
            placeholderTextColor="#999"
          />

          <Text style={styles.pokemonSectionTitle}>Pokémon da Equipe</Text>
          {pokemons.map((pokemon, index) => (
            <TextInput
              key={index}
              placeholder={`Pokémon ${index + 1}`}
              value={pokemon}
              onChangeText={(text) => handlePokemonChange(text, index)}
              style={styles.input}
              placeholderTextColor="#999"
            />
          ))}

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar Equipe</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef5f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 30,
    color: "#1a3b5c",
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pokemonSectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a3b5c",
    marginTop: 10,
    marginBottom: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 20,
  },
  saveButton: {
    backgroundColor: "#1a73e8",
    padding: 18,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
