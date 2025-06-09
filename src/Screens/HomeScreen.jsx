import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Avatar, Card } from "react-native-paper";

// Componente para os cartões de menu, agora mais robusto
const MenuCard = ({ title, icon, color, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.cardContainer} activeOpacity={0.8}>
    <Card style={[styles.card, { backgroundColor: color }]}>
      <Card.Content style={styles.cardContent}>
        <Avatar.Icon size={48} icon={icon} style={styles.cardIcon} />
        <Text style={styles.cardLabel}>{title}</Text>
      </Card.Content>
    </Card>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Cabeçalho redesenhado para maior impacto visual */}
      <View style={styles.header}>
        <Avatar.Icon size={80} icon="pokeball" style={styles.pokeballIcon} />
        <Text variant="headlineLarge" style={styles.title}>
          Bem-vindo!
        </Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          Explore o Mundo Pokémon
        </Text>
      </View>

      {/* Container do menu em formato de grid */}
      <View style={styles.menuGrid}>
        <MenuCard
          title="Pokédex"
          icon="format-list-bulleted"
          color="#E53935" // Vermelho
          onPress={() => navigation.navigate("Pokédex", { screen: "Pokedex" })}
        />
        <MenuCard
          title="Favoritos"
          icon="heart"
          color="#8E24AA" // Roxo
          onPress={() =>
            navigation.navigate("Favoritos", { screen: "FavoritsScreen" })
          }
        />

        <MenuCard
          title="Itens"
          icon="bag-personal"
          color="#FBC02D" // Dourado
          onPress={() => navigation.navigate("Itens", { screen: "ItemList" })}
        />
        <MenuCard
          title="Treinadores"
          icon="account-group"
          color="#1E88E5" // Azul
          onPress={() =>
            navigation.navigate("Treinadores", { screen: "TreinadorList" })
          }
        />
        <MenuCard
          title="Minhas Insígnias"
          icon="medal"
          color="#EC407A" // Rosa
          onPress={() =>
            navigation.navigate("Minhas Insígnias", { screen: "InsigniaList" })
          }
        />

        <MenuCard
          title="Minhas Equipes"
          icon="account-multiple" 
          color="#43A047" // Verde
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
    backgroundColor: "",
  },
  header: {
    backgroundColor: '#333', // Fundo escuro para o cabeçalho
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
    color: "#FFFFFF", // Texto branco para contraste
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)", // Branco com leve transparência
    marginTop: 8,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  cardContainer: {
    width: '45%', // Ocupa quase metade da tela, permitindo 2 colunas
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  cardIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fundo do ícone semi-transparente
  },
  cardLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },
});