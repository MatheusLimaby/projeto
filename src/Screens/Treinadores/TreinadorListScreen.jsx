import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getTrainers, deleteTrainer } from "../../Services/Storage";

export default function TreinadorListScreen({ navigation }) {
  const [trainers, setTrainers] = useState([]);
  const isFocused = useIsFocused(); // Hook para saber se a tela está em foco

  const loadTrainers = async () => {
    const data = await getTrainers();
    setTrainers(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadTrainers();
    }
  }, [isFocused]);

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar",
      "Você tem certeza que quer deletar este treinador?",
      [
        { text: "Cancelar" },
        {
          text: "Deletar",
          onPress: async () => {
            await deleteTrainer(id);
            loadTrainers();
          },
        },
      ]
    );
  };

  return (
    <View>
      <Text style={{ fontSize: 24, textAlign: "center", margin: 10 }}>
        Lista de Treinadores
      </Text>
      <Button
        title="Adicionar Novo Treinador"
        onPress={() => navigation.navigate("TreinadorForm", {})} // Navega sem ID para criar
      />
      <FlatList
        data={trainers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}
          >
            <Text>Nome: {item.nome}</Text>
            <Text>Idade: {item.idade}</Text>
            <Button
              title="Editar"
              onPress={() =>
                navigation.navigate("TreinadorForm", { trainerId: item.id })
              }
            />
            <Button
              title="Excluir"
              color="red"
              onPress={() => handleDelete(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}
