import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { saveTrainer, getTrainerById } from "../../Services/Storage";

// Requisito: 5 campos para o CRUD
export default function TreinadorFormScreen({ route, navigation }) {
  const { trainerId } = route.params;
  const isEditing = !!trainerId;

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cidadeNatal, setCidadeNatal] = useState("");
  const [pokemonInicial, setPokemonInicial] = useState("");
  const [numInsignias, setNumInsignias] = useState("");

  useEffect(() => {
    if (isEditing) {
      getTrainerById(trainerId).then((data) => {
        if (data) {
          setNome(data.nome);
          setIdade(data.idade.toString());
          setCidadeNatal(data.cidadeNatal);
          setPokemonInicial(data.pokemonInicial);
          setNumInsignias(data.numInsignias.toString());
        }
      });
    }
  }, [trainerId]);

  const handleSave = async () => {
    // Validação simples
    if (!nome || !idade || !cidadeNatal || !pokemonInicial || !numInsignias) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    const trainerData = {
      id: trainerId, // Será null se for criação
      nome,
      idade: parseInt(idade, 10),
      cidadeNatal,
      pokemonInicial,
      numInsignias: parseInt(numInsignias, 10),
    };

    await saveTrainer(trainerData);
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, textAlign: "center", margin: 10 }}>
        {isEditing ? "Editar Treinador" : "Novo Treinador"}
      </Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Cidade Natal"
        value={cidadeNatal}
        onChangeText={setCidadeNatal}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Pokémon Inicial"
        value={pokemonInicial}
        onChangeText={setPokemonInicial}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Nº de Insígnias"
        value={numInsignias}
        onChangeText={setNumInsignias}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}
