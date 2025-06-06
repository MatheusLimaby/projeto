import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import MaskInput from "react-native-mask-input";
import { saveBadge, getBadgeById } from "../../Services/Storage";

export default function InsigniaFormScreen({ route, navigation }) {
  const { badgeId } = route.params;
  const isEditing = !!badgeId;

  const [nomeInsignia, setNomeInsignia] = useState("");
  const [liderGinasio, setLiderGinasio] = useState("");
  const [cidadeGinasio, setCidadeGinasio] = useState("");
  const [dataConquista, setDataConquista] = useState("");
  const [pokemonVitoria, setPokemonVitoria] = useState("");

  useEffect(() => {
    if (isEditing) {
      getBadgeById(badgeId).then((data) => {
        if (data) {
          setNomeInsignia(data.nomeInsignia);
          setLiderGinasio(data.liderGinasio);
          setCidadeGinasio(data.cidadeGinasio);
          setDataConquista(data.dataConquista);
          setPokemonVitoria(data.pokemonVitoria);
        }
      });
    }
  }, [badgeId]);

  const handleSave = async () => {
    if (!nomeInsignia || !liderGinasio || !cidadeGinasio || !dataConquista) {
      Alert.alert(
        "Erro",
        "Os campos Nome, Líder, Cidade e Data são obrigatórios!"
      );
      return;
    }

    const badgeData = {
      id: badgeId,
      nomeInsignia,
      liderGinasio,
      cidadeGinasio,
      dataConquista,
      pokemonVitoria,
    };

    await saveBadge(badgeData);
    navigation.goBack();
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, textAlign: "center", margin: 10 }}>
        {isEditing ? "Editar Insígnia" : "Nova Insígnia"}
      </Text>

      <TextInput
        placeholder="Nome da Insígnia"
        value={nomeInsignia}
        onChangeText={setNomeInsignia}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Líder do Ginásio"
        value={liderGinasio}
        onChangeText={setLiderGinasio}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Cidade do Ginásio"
        value={cidadeGinasio}
        onChangeText={setCidadeGinasio}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      {/* CAMPO COM MÁSCARA */}
      <MaskInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
        value={dataConquista}
        onChangeText={setDataConquista}
        mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
        placeholder="DD/MM/AAAA"
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Pokémon da Vitória (Opcional)"
        value={pokemonVitoria}
        onChangeText={setPokemonVitoria}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <Button title="Salvar" onPress={handleSave} />
    </ScrollView>
  );
}
