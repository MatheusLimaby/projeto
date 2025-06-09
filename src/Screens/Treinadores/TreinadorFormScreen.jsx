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
  Image, // 1. Importar Image
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // 2. Importar ImagePicker
import { saveTrainer, getTrainerById } from "../../Services/Storage";

export default function TreinadorFormScreen({ route, navigation }) {
  const { trainerId } = route.params;
  const isEditing = !!trainerId;

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cidadeNatal, setCidadeNatal] = useState("");
  const [pokemonInicial, setPokemonInicial] = useState("");
  const [numInsignias, setNumInsignias] = useState("");
  const [imagem, setImagem] = useState(null); // 3. State para a imagem

  useEffect(() => {
    if (isEditing) {
      getTrainerById(trainerId).then((data) => {
        if (data) {
          setNome(data.nome);
          setIdade(data.idade.toString());
          setCidadeNatal(data.cidadeNatal);
          setPokemonInicial(data.pokemonInicial);
          setNumInsignias(data.numInsignias.toString());
          setImagem(data.imagem); // Carrega a imagem existente
        }
      });
    }
  }, [trainerId]);

  // 4. Função para escolher imagem
  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "É preciso permitir o acesso à galeria."
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!nome || !idade || !cidadeNatal || !pokemonInicial || !numInsignias) {
      Alert.alert("Erro de Validação", "Todos os campos são obrigatórios!");
      return;
    }

    const trainerData = {
      id: trainerId,
      nome,
      idade: parseInt(idade, 10),
      cidadeNatal,
      pokemonInicial,
      numInsignias: parseInt(numInsignias, 10),
      imagem: imagem, // Salva a URI da imagem
    };

    await saveTrainer(trainerData);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          {isEditing ? "Editar Treinador" : "Novo Treinador"}
        </Text>

        {/* 5. UI para a imagem, integrada ao estilo */}
        <View style={styles.imagePickerContainer}>
          <TouchableOpacity onPress={escolherImagem}>
            {imagem ? (
              <Image source={{ uri: imagem }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarPlaceholderText}>?</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={escolherImagem}
          >
            <Text style={styles.imagePickerButtonText}>Escolher Foto</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="Nome do Treinador"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Idade"
            value={idade}
            onChangeText={setIdade}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Cidade Natal"
            value={cidadeNatal}
            onChangeText={setCidadeNatal}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Pokémon Inicial"
            value={pokemonInicial}
            onChangeText={setPokemonInicial}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Nº de Insígnias"
            value={numInsignias}
            onChangeText={setNumInsignias}
            keyboardType="numeric"
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
    backgroundColor: "#f0f4f7",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 30,
    color: "#333",
  },
  // 6. Estilos adicionados para a funcionalidade de imagem
  imagePickerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#007bff",
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ccc",
  },
  avatarPlaceholderText: {
    fontSize: 40,
    color: "#999",
  },
  imagePickerButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  imagePickerButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  // Fim dos estilos adicionados
  form: {
    paddingHorizontal: 20,
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
    backgroundColor: "#007bff",
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
