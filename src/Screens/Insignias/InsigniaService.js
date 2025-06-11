// src/Services/InsigniaService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@PokemonApp:badges";

async function listar() {
  const jsonValue = await AsyncStorage.getItem(KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvar(novaInsignia) {
  const insignias = await listar();

  if (novaInsignia.id) {
    const index = insignias.findIndex((i) => i.id === novaInsignia.id);
    if (index > -1) {
      insignias[index] = novaInsignia;
    }
  } else {
    novaInsignia.id = new Date().getTime().toString();
    insignias.push(novaInsignia);
  }

  await AsyncStorage.setItem(KEY, JSON.stringify(insignias));
}

async function buscar(id) {
  const insignias = await listar();
  return insignias.find((insignia) => insignia.id === id);
}

async function remover(id) {
  const insignias = await listar();
  const novaLista = insignias.filter((insignia) => insignia.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(novaLista));
}

export default {
  listar,
  salvar,
  buscar,
  remover,
};
