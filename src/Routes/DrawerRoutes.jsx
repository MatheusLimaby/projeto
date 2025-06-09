import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import TreinadorStack from "./TreinadorStack";
import PokedexStack from "./PokedexStack";
import ItensStack from "./ItensStack";
import InsigniaStack from "./InsigniaStack";
import EquipeStack from "./EquipeStack";

import HomeScreen from "../Screens/HomeScreen";
import FavoritosScreen from "../Screens/FavoritosScreen";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <NavigationContainer>
      {/* Removemos a prop screenOptions daqui */}
      <Drawer.Navigator initialRouteName="Mundo Pokemon">
        <Drawer.Screen name="Mundo Pokemon" component={HomeScreen} />

        {/* Adicionamos a prop 'options' apenas nesta tela */}
        <Drawer.Screen
          name="Pokédex"
          component={PokedexStack}
          options={{
            headerStyle: {
              backgroundColor: "red", // Define a cor de fundo do header para vermelho
            },
            headerTintColor: "#fff", // Define a cor do título e do ícone do menu para branco
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Drawer.Screen
          name="Itens"
          component={ItensStack}
          options={{
            headerStyle: {
              backgroundColor: "purple", // Define a cor de fundo do header para vermelho
            },
            headerTintColor: "#fff", // Define a cor do título e do ícone do menu para branco
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Drawer.Screen
          name="Treinadores"
          component={TreinadorStack}
          options={{
            headerStyle: {
              backgroundColor: "blue", // Define a cor de fundo do header para vermelho
            },
            headerTintColor: "#fff", // Define a cor do título e do ícone do menu para branco
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Drawer.Screen
          name="Minhas Equipes"
          component={EquipeStack}
          options={{
            headerStyle: {
              backgroundColor: "green", // Define a cor de fundo do header para vermelho
            },
            headerTintColor: "#fff", // Define a cor do título e do ícone do menu para branco
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Drawer.Screen
          name="Minhas Insígnias"
          component={InsigniaStack}
          options={{
            headerStyle: {
              backgroundColor: "#EC407A", // Define a cor de fundo do header para vermelho
            },
            headerTintColor: "#fff", // Define a cor do título e do ícone do menu para branco
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Drawer.Screen
          name="Favoritos"
          component={FavoritosScreen}
          options={{
            headerStyle: {
              backgroundColor: "purple", // Define a cor de fundo do header para vermelho
            },
            headerTintColor: "#fff", // Define a cor do título e do ícone do menu para branco
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
