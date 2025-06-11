// App.js
import React from "react";
import { PaperProvider } from "react-native-paper";
import DrawerRoutes from "./src/Routes/DrawerRoutes";
// 1. A importação do theme foi removida daqui.

export default function App() {
  return (
    // 2. O PaperProvider agora usa o tema padrão, sem a prop 'theme'.
    <PaperProvider>
      <DrawerRoutes />
    </PaperProvider>
  );
}
