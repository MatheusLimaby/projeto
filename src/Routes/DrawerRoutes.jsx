import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import TreinadorStack from "./TreinadorStack";
import PokedexStack from "./PokedexStack";
import ItensStack from "./ItensStack";
import InsigniaStack from "./InsigniaStack"; // Importar
import EquipeStack from "./EquipeStack"; // Importar

import HomeScreen from "../Screens/HomeScreen";
import FavoritosScreen from "../Screens/FavoritosScreen";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Pokédex" component={PokedexStack} />
        <Drawer.Screen name="Treinadores" component={TreinadorStack} />
        <Drawer.Screen name="Minhas Equipes" component={EquipeStack} />
        <Drawer.Screen name="Minhas Insígnias" component={InsigniaStack} />
        <Drawer.Screen name="Itens" component={ItensStack} />
        <Drawer.Screen name="Favoritos" component={FavoritosScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
