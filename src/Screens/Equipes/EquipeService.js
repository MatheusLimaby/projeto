// src/Services/EquipeService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@PokemonApp:teams";

async function listar() {
  const jsonValue = await AsyncStorage.getItem(KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvar(novaEquipe) {
  const equipes = await listar();

  if (novaEquipe.id) {
    const index = equipes.findIndex((e) => e.id === novaEquipe.id);
    if (index > -1) {
      equipes[index] = novaEquipe;
    }
  } else {
    novaEquipe.id = new Date().getTime().toString();
    equipes.push(novaEquipe);
  }

  await AsyncStorage.setItem(KEY, JSON.stringify(equipes));
}

async function buscar(id) {
  const equipes = await listar();
  return equipes.find((equipe) => equipe.id === id);
}

async function remover(id) {
  const equipes = await listar();
  const novaLista = equipes.filter((equipe) => equipe.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(novaLista));
}

export default {
  listar,
  salvar,
  buscar,
  remover,
};
