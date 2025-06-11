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
// 1. Import corrigido para usar o novo serviço local
import InsigniaService from "./InsigniaService";

export default function InsigniaFormScreen({ route, navigation }) {
  const { badgeId } = route.params || {};
  const isEditing = !!badgeId;

  const [nomeInsignia, setNomeInsignia] = useState("");
  const [liderGinasio, setLiderGinasio] = useState("");
  const [cidadeGinasio, setCidadeGinasio] = useState("");
  const [dataConquista, setDataConquista] = useState("");
  const [pokemonVitoria, setPokemonVitoria] = useState("");

  useEffect(() => {
    if (isEditing) {
      // 2. Chamada da função corrigida para .buscar()
      InsigniaService.buscar(badgeId).then((data) => {
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
    if (!nomeInsignia || !dataConquista) {
      Alert.alert(
        "Erro",
        "Nome da insígnia e data da conquista são obrigatórios!"
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

    // 3. Chamada da função corrigida para .salvar()
    await InsigniaService.salvar(badgeData);
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
            placeholder="Nome da Insígnia"
            value={nomeInsignia}
            onChangeText={setNomeInsignia}
            style={styles.input}
          />
          <MaskInput
            style={styles.input}
            value={dataConquista}
            onChangeText={setDataConquista}
            mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
            placeholder="Data da Conquista (DD/MM/AAAA)"
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Líder do Ginásio"
            value={liderGinasio}
            onChangeText={setLiderGinasio}
            style={styles.input}
          />
          <TextInput
            placeholder="Cidade do Ginásio"
            value={cidadeGinasio}
            onChangeText={setCidadeGinasio}
            style={styles.input}
          />
          <TextInput
            placeholder="Pokémon da Vitória (Opcional)"
            value={pokemonVitoria}
            onChangeText={setPokemonVitoria}
            style={styles.input}
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
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
