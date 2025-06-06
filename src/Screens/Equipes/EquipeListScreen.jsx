import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getTeams, deleteTeam } from "../../Services/Storage";

export default function EquipeListScreen({ navigation }) {
  const [teams, setTeams] = useState([]);
  const isFocused = useIsFocused();

  const loadTeams = async () => {
    const data = await getTeams();
    setTeams(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadTeams();
    }
  }, [isFocused]);

  const handleDelete = (id) => {
    Alert.alert("Confirmar", "Tem certeza que quer desfazer esta equipe?", [
      { text: "Cancelar" },
      {
        text: "Deletar",
        onPress: async () => {
          await deleteTeam(id);
          loadTeams();
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, textAlign: "center", margin: 10 }}>
        Minhas Equipes
      </Text>
      <Button
        title="Criar Nova Equipe"
        onPress={() => navigation.navigate("EquipeForm", {})}
      />
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {item.nomeEquipe}
            </Text>
            <Text>Formato: {item.formato}</Text>
            <Text>Pokémon: {item.pokemons.join(", ")}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 5,
              }}
            >
              <Button
                title="Editar"
                onPress={() =>
                  navigation.navigate("EquipeForm", { teamId: item.id })
                }
              />
              <Button
                title="Excluir"
                color="red"
                onPress={() => handleDelete(item.id)}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhuma equipe criada.
          </Text>
        }
      />
    </View>
  );
}
