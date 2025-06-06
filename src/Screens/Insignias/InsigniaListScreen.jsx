import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getBadges, deleteBadge } from "../../Services/Storage";

export default function InsigniaListScreen({ navigation }) {
  const [badges, setBadges] = useState([]);
  const isFocused = useIsFocused();

  const loadBadges = async () => {
    const data = await getBadges();
    setBadges(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadBadges();
    }
  }, [isFocused]);

  const handleDelete = (id) => {
    Alert.alert("Confirmar", "Tem certeza que quer remover esta insígnia?", [
      { text: "Cancelar" },
      {
        text: "Deletar",
        onPress: async () => {
          await deleteBadge(id);
          loadBadges();
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, textAlign: "center", margin: 10 }}>
        Minhas Insígnias
      </Text>
      <Button
        title="Registrar Nova Insígnia"
        onPress={() => navigation.navigate("InsigniaForm", {})}
      />
      <FlatList
        data={badges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.nomeInsignia}</Text>
            <Text>
              Líder: {item.liderGinasio} em {item.cidadeGinasio}
            </Text>
            <Text>Data: {item.dataConquista}</Text>
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
                  navigation.navigate("InsigniaForm", { badgeId: item.id })
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
            Nenhuma insígnia registrada.
          </Text>
        }
      />
    </View>
  );
}
