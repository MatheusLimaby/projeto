import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import { saveTeam, getTeamById } from "../../Services/Storage";

export default function EquipeFormScreen({ route, navigation }) {
  const { teamId } = route.params;
  const isEditing = !!teamId;

  const [nomeEquipe, setNomeEquipe] = useState("");
  const [formato, setFormato] = useState("");
  const [descricao, setDescricao] = useState("");
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [pokemon3, setPokemon3] = useState("");
  const [pokemon4, setPokemon4] = useState("");
  const [pokemon5, setPokemon5] = useState("");
  const [pokemon6, setPokemon6] = useState("");

  useEffect(() => {
    if (isEditing) {
      getTeamById(teamId).then((data) => {
        if (data) {
          setNomeEquipe(data.nomeEquipe);
          setFormato(data.formato);
          setDescricao(data.descricao);
          const [p1, p2, p3, p4, p5, p6] = data.pokemons;
          setPokemon1(p1 || "");
          setPokemon2(p2 || "");
          setPokemon3(p3 || "");
          setPokemon4(p4 || "");
          setPokemon5(p5 || "");
          setPokemon6(p6 || "");
        }
      });
    }
  }, [teamId]);

  const handleSave = async () => {
    if (!nomeEquipe || !formato) {
      Alert.alert("Erro", "Nome da equipe e formato são obrigatórios!");
      return;
    }

    const pokemons = [
      pokemon1,
      pokemon2,
      pokemon3,
      pokemon4,
      pokemon5,
      pokemon6,
    ].filter((p) => p); // Filtra campos vazios

    const teamData = {
      id: teamId,
      nomeEquipe,
      formato,
      descricao,
      pokemons,
    };

    await saveTeam(teamData);
    navigation.goBack();
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, textAlign: "center", margin: 10 }}>
        {isEditing ? "Editar Equipe" : "Nova Equipe"}
      </Text>

      <TextInput
        placeholder="Nome da Equipe"
        value={nomeEquipe}
        onChangeText={setNomeEquipe}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Formato da Batalha (Ex: Solo, Dupla)"
        value={formato}
        onChangeText={setFormato}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Descrição (Opcional)"
        value={descricao}
        onChangeText={setDescricao}
        style={{ borderWidth: 1, padding: 8, marginBottom: 20 }}
      />

      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Pokémon da Equipe
      </Text>
      <TextInput
        placeholder="Pokémon 1"
        value={pokemon1}
        onChangeText={setPokemon1}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Pokémon 2"
        value={pokemon2}
        onChangeText={setPokemon2}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Pokémon 3"
        value={pokemon3}
        onChangeText={setPokemon3}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Pokémon 4"
        value={pokemon4}
        onChangeText={setPokemon4}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Pokémon 5"
        value={pokemon5}
        onChangeText={setPokemon5}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Pokémon 6"
        value={pokemon6}
        onChangeText={setPokemon6}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <Button title="Salvar Equipe" onPress={handleSave} />
    </ScrollView>
  );
}
