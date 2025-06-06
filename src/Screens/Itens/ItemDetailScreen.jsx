import React, { useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import api from "../../Services/api";

export default function ItemDetailScreen({ route }) {
  const { itemName } = route.params;
  const [item, setItem] = useState(null);

  useEffect(() => {
    api.get(`item/${itemName}`).then((response) => {
      setItem(response.data);
    });
  }, [itemName]);

  if (!item) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        {item.name.toUpperCase()}
      </Text>
      <Image
        source={{ uri: item.sprites.default }}
        style={{ width: 100, height: 100 }}
      />
      <Text>Custo: {item.cost}</Text>
      <Text>Categoria: {item.category.name}</Text>
      {/* Pega a descrição em inglês, pois é a mais comum na API */}
      <Text>
        Descrição:{" "}
        {item.flavor_text_entries.find((e) => e.language.name === "en")?.text}
      </Text>
    </View>
  );
}
