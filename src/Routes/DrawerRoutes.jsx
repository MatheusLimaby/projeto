import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../Screens/HomeScreen";
import AnimaisStack from "./AnimaisStack";
import ProdutosStack from "./ProdutosStack";
import ServicosStack from "./ServicosStack";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "PetShop",
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#f4511e" },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="AnimaisStack"
        component={AnimaisStack}
        options={{
          title: "Animais",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="paw" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="ProdutosStack"
        component={ProdutosStack}
        options={{
          title: "Produtos",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cube" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="ServicosStack"
        component={ServicosStack}
        options={{
          title: "Serviços",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="construct" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
