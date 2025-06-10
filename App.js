// App.js
import React from "react";
import { PaperProvider } from "react-native-paper";
import DrawerRoutes from "./src/Routes/DrawerRoutes";
import { theme } from "./src/theme"; // Importe nosso tema

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <DrawerRoutes />
    </PaperProvider>
  );
}
