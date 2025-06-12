import React from "react";
import { PaperProvider } from "react-native-paper";
import DrawerRoutes from "./src/Routes/DrawerRoutes";


export default function App() {
  return (
    
    <PaperProvider>
      <DrawerRoutes />
    </PaperProvider>
  );
}
