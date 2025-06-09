import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
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
          setPokemonVitoria(data.pokemonVitoria || "");
        }
      });
    }
  }, [badgeId]);

  const handleSave = async () => {
    if (!nomeInsignia || !liderGinasio || !cidadeGinasio || !dataConquista) {
      Alert.alert(
        "Erro de Validação",
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          {isEditing ? "Editar Insígnia" : "Nova Insígnia"}
        </Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Nome da Insígnia (Ex: Insígnia da Rocha)"
            value={nomeInsignia}
            onChangeText={setNomeInsignia}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Líder do Ginásio"
            value={liderGinasio}
            onChangeText={setLiderGinasio}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Cidade do Ginásio"
            value={cidadeGinasio}
            onChangeText={setCidadeGinasio}
            style={styles.input}
            placeholderTextColor="#999"
          />

          <MaskInput
            style={styles.input}
            value={dataConquista}
            onChangeText={setDataConquista}
            mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
            placeholder="DD/MM/AAAA"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />

          <TextInput
            placeholder="Pokémon da Vitória (Opcional)"
            value={pokemonVitoria}
            onChangeText={setPokemonVitoria}
            style={styles.input}
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f2f7",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 30,
    color: "#4a0e67",
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#8a2be2",
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
