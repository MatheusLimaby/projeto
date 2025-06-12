
import AsyncStorage from "@react-native-async-storage/async-storage";


const KEY = "@PokemonApp:trainers";


async function listar() {
  const jsonValue = await AsyncStorage.getItem(KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}


async function salvar(treinadorData) {
  const treinadores = await listar();

  if (treinadorData.id) {
    const index = treinadores.findIndex((t) => t.id === treinadorData.id);
    if (index > -1) {
      treinadores[index] = treinadorData;
    }
  } else {
    treinadorData.id = new Date().getTime().toString();
    treinadores.push(treinadorData);
  }

  await AsyncStorage.setItem(KEY, JSON.stringify(treinadores));
}

async function buscar(id) {
  const treinadores = await listar();
  return treinadores.find((treinador) => treinador.id === id);
}

async function remover(id) {
  let treinadores = await listar();
  const novaLista = treinadores.filter((treinador) => treinador.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(novaLista));
}

export default {
  listar,
  salvar,
  buscar,
  remover,
};
