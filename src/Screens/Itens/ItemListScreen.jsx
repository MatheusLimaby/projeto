import React, { useState, useEffect } from "react";
import {View,FlatList,StyleSheet,TouchableOpacity,ActivityIndicator,Text,Image,SafeAreaView,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";


const Capitalize = (str) => {
  if (!str) return "";
  return (str.charAt(0).toUpperCase() + str.slice(1)).replace("-", " ");
};

export default function ItemListScreen({navigation,route}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/item?limit=150");
        const listData = response.data.results;
    

        const itemDetailRequests = listData.map((item) => axios.get(item.url));
        const itemDetails = await Promise.all(itemDetailRequests);
    
        const itemData = itemDetails.map((iten) => {
          const item = iten.data;
          return {
            id: item.id,
            name: item.name,
            displayName: Capitalize(item.name),
            image: item.sprites.default, 
          };
        });

        setItems(itemData);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ItemDetail", { itemName: item.name })}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.displayName}</Text>
      <Text>#{item.id}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 5,
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    height: 120,
    justifyContent: "center",
  },
  itemImage: {
    width: 60,
    height: 60,
  },
  itemName: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
});
