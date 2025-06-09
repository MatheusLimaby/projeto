// src/theme.js
import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme, // Herda as configurações do tema padrão claro
  colors: {
    ...DefaultTheme.colors,
    primary: "#E53935", // Vermelho Pokédex
    accent: "#FFCA28", // Amarelo Pikachu
    background: "#F5F5F5", // Um cinza bem claro para o fundo
    surface: "#FFFFFF", // Branco para Cards e superfícies
    text: "#212121", // Um cinza escuro para textos, mais suave que o preto
    placeholder: "#757575",
  },
};
