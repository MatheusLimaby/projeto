// App.js
import React from "react";
import { PaperProvider } from "react-native-paper";
import DrawerRoutes from "./src/Routes/DrawerRoutes";
import { theme } from "./src/theme"; // Importe nosso tema

export default function App() {
  return (
    <PaperProvider theme={theme}>
      {/* O DrawerRoutes já contém o NavigationContainer, 
        então ele deve ser o componente principal aqui.
      */}
      <DrawerRoutes />
    </PaperProvider>
  );
}
