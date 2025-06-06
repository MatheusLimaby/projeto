import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import DrawerRoutes from "./src/Routes/DrawerRoutes";

export default function App() {
  return (
    <PaperProvider>

        <DrawerRoutes />
 
    </PaperProvider>
  );
}
