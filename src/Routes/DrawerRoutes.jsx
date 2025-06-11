import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; 

import TreinadorStack from "./TreinadorStack";
import PokedexStack from "./PokedexStack";
import ItensStack from "./ItensStack";
import InsigniaStack from "./InsigniaStack";
import EquipeStack from "./EquipeStack";
import HomeScreen from "../Screens/HomeScreen";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Mundo Pokemon">
        <Drawer.Screen
          name="Mundo Pokemon"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="Pokédex"
          component={PokedexStack}
          options={{
            headerStyle: {
              backgroundColor: "red",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },

            drawerIcon: ({ color, size }) => (
              <Ionicons name="list-outline" color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="Itens"
          component={ItensStack}
          options={{
            headerStyle: {
              backgroundColor: "purple",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
 
            drawerIcon: ({ color, size }) => (
              <Ionicons name="briefcase-outline" color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="Treinadores"
          component={TreinadorStack}
          options={{
            headerStyle: {
              backgroundColor: "blue",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
 
            drawerIcon: ({ color, size }) => (
              <Ionicons name="people-outline" color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="Minhas Equipes"
          component={EquipeStack}
          options={{
            headerStyle: {
              backgroundColor: "green",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },

            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="file-tray-full-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Minhas Insígnias"
          component={InsigniaStack}
          options={{
            headerStyle: {
              backgroundColor: "#EC407A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            drawerIcon: ({ color, size }) => (
              <Ionicons name="medal-outline" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
