import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, ActivityIndicator } from "react-native";
import api from "../../Services/api";

export default function ItemListScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("item?limit=50").then((response) => {
      setItems(response.data.results);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Text style={{ fontSize: 24, textAlign: "center", margin: 10 }}>
        Lista de Itens
      </Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() =>
              navigation.navigate("ItemDetail", { itemName: item.name })
            }
          />
        )}
      />
    </View>
  );
}
