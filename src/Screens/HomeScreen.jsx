import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Avatar, Card } from "react-native-paper";

const MenuCard = ({ title, icon, color, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.cardContainer}
    activeOpacity={0.8}
  >
    <Card style={[styles.card, { backgroundColor: color }]}>
      <Card.Content style={styles.cardContent}>
        <Avatar.Icon size={50} icon={icon} style={styles.cardIcon} />
        <Text style={styles.cardLabel}>{title}</Text>
      </Card.Content>
    </Card>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Icon size={80} icon="pokeball" style={styles.pokeballIcon} />
        <Text variant="headlineLarge" style={styles.title}>
          Bem-vindo!
        </Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          Explore o Mundo Pokémon
        </Text>
      </View>

      <View style={styles.menuGrid}>
        <MenuCard
          title="Pokédex"
          icon="format-list-bulleted"
          color="#E53935"
          onPress={() => navigation.navigate("Pokédex", { screen: "Pokedex" })}
        />

        <MenuCard
          title="Itens"
          icon="bag-personal"
          color="purple"
          onPress={() => navigation.navigate("Itens", { screen: "ItemList" })}
        />
        <MenuCard
          title="Treinadores"
          icon="account-multiple"
          color="#1E88E5"
          onPress={() =>
            navigation.navigate("Treinadores", { screen: "TreinadorList" })
          }
        />
        <MenuCard
          title="Minhas Insígnias"
          icon="medal"
          color="#EC407A"
          onPress={() =>
            navigation.navigate("Minhas Insígnias", { screen: "InsigniaList" })
          }
        />

        <MenuCard
          title="Minhas Equipes"
          icon="account-group"
          color="#43A047"
          onPress={() =>
            navigation.navigate("Minhas Equipes", { screen: "EquipeList" })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d2d2d2",
  },
  header: {
    backgroundColor: "#333", 
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  pokeballIcon: {
    backgroundColor: "#E53935",
    marginBottom: 16,
  },
  title: {
    fontWeight: "bold",
    color: "#FFFFFF", 
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)", 
    marginTop: 8,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  cardContainer: {
    width: "45%", 
    marginBottom: 20,
  },
  card: {
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  cardIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", 
  },
  cardLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    textAlign: "center",
  },
});
