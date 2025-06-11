// src/Screens/Treinadores/TreinadorService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

// A chave para armazenar os dados dos treinadores
const KEY = "@PokemonApp:trainers";

/**
 * Retorna todos os treinadores salvos.
 */
async function listar() {
  const jsonValue = await AsyncStorage.getItem(KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

/**
 * Salva um novo treinador ou atualiza um existente.
 * @param {object} treinadorData - Os dados do treinador para salvar.
 */
async function salvar(treinadorData) {
  const treinadores = await listar();

  // *** AQUI ESTÁ A CORREÇÃO ***
  // Verifica se o treinador já tem um ID.
  if (treinadorData.id) {
    // Se tem ID, é uma EDIÇÃO.
    const index = treinadores.findIndex((t) => t.id === treinadorData.id);
    if (index > -1) {
      // Encontra o treinador na lista e substitui seus dados.
      treinadores[index] = treinadorData;
    }
  } else {
    // Se não tem ID, é uma CRIAÇÃO.
    // Gera um novo ID e adiciona o treinador à lista.
    treinadorData.id = new Date().getTime().toString();
    treinadores.push(treinadorData);
  }

  // Salva a lista atualizada no AsyncStorage.
  await AsyncStorage.setItem(KEY, JSON.stringify(treinadores));
}

/**
 * Busca um treinador específico pelo seu ID.
 */
async function buscar(id) {
  const treinadores = await listar();
  return treinadores.find((treinador) => treinador.id === id);
}

/**
 * Remove um treinador da lista pelo seu ID.
 */
async function remover(id) {
  let treinadores = await listar();
  const novaLista = treinadores.filter((treinador) => treinador.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(novaLista));
}

// Exporta as funções para serem usadas nas telas
export default {
  listar,
  salvar,
  buscar,
  remover,
};
