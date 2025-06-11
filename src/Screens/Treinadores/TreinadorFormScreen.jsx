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
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
// 1. Import corrigido para usar o novo serviço local
import TreinadorService from "./TreinadorService";

const PlaceholderImage = require("../../../assets/icon.png");

export default function TreinadorFormScreen({ route, navigation }) {
  const { trainerId } = route.params || {};
  const isEditing = !!trainerId;

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cidadeNatal, setCidadeNatal] = useState("");
  const [pokemonInicial, setPokemonInicial] = useState("");
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    if (isEditing) {
      // 2. Chamada da função corrigida para .buscar()
      TreinadorService.buscar(trainerId).then((data) => {
        if (data) {
          setNome(data.nome);
          setIdade(data.idade.toString());
          setCidadeNatal(data.cidadeNatal);
          setPokemonInicial(data.pokemonInicial);
          setImagem(data.imagem);
        }
      });
    }
  }, [trainerId]);

  const escolherImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!nome || !idade) {
      Alert.alert("Erro", "Nome e idade são obrigatórios!");
      return;
    }

    const trainerData = {
      id: trainerId,
      nome,
      idade: parseInt(idade, 10),
      cidadeNatal,
      pokemonInicial,
      imagem,
    };

    // 3. Chamada da função corrigida para .salvar()
    await TreinadorService.salvar(trainerData);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          {isEditing ? "Editar Treinador" : "Novo Treinador"}
        </Text>

        <View style={styles.form}>
          <TouchableOpacity onPress={escolherImagem} style={styles.imagePicker}>
            <Image
              source={imagem ? { uri: imagem } : PlaceholderImage}
              style={styles.avatar}
            />
            <Text style={styles.imagePickerText}>Escolher Foto</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Nome do Treinador"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
          />
          <TextInput
            placeholder="Idade"
            value={idade}
            onChangeText={setIdade}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Cidade Natal"
            value={cidadeNatal}
            onChangeText={setCidadeNatal}
            style={styles.input}
          />
          <TextInput
            placeholder="Pokémon Inicial"
            value={pokemonInicial}
            onChangeText={setPokemonInicial}
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

// Estilos simplificados mantidos
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
  imagePicker: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  imagePickerText: {
    color: "blue",
    marginTop: 5,
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
    backgroundColor: "royalblue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
