import AsyncStorage from "@react-native-async-storage/async-storage";

// --- CHAVES DE ARMAZENAMENTO ---
const TRAINERS_KEY = "@PokemonApp:trainers";
const FAVORITES_KEY = "@PokemonApp:favorites";
const TEAMS_KEY = "@PokemonApp:teams";
const BADGES_KEY = "@PokemonApp:badges";

// --- FUNÇÕES GENÉRICAS DE CRUD ---
const getItems = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error(`Error reading ${key}`, e);
    return [];
  }
};

const saveItem = async (key, itemData) => {
  try {
    let items = await getItems(key);
    const existingIndex = items.findIndex((i) => i.id === itemData.id);

    if (existingIndex > -1) {
      items[existingIndex] = itemData; // Atualiza
    } else {
      itemData.id = new Date().getTime().toString(); // Cria novo
      items.push(itemData);
    }

    const jsonValue = JSON.stringify(items);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Error saving to ${key}`, e);
  }
};

const deleteItem = async (key, id) => {
  try {
    let items = await getItems(key);
    const updatedItems = items.filter((i) => i.id !== id);
    const jsonValue = JSON.stringify(updatedItems);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Error deleting from ${key}`, e);
  }
};

const getItemById = async (key, id) => {
  try {
    let items = await getItems(key);
    return items.find((i) => i.id === id);
  } catch (e) {
    console.error(`Error fetching from ${key} by id`, e);
  }
};

// --- EXPORTAÇÕES ESPECÍFICAS ---

// Treinadores
export const getTrainers = () => getItems(TRAINERS_KEY);
export const saveTrainer = (trainerData) => saveItem(TRAINERS_KEY, trainerData);
export const deleteTrainer = (id) => deleteItem(TRAINERS_KEY, id);
export const getTrainerById = (id) => getItemById(TRAINERS_KEY, id);

// Equipes
export const getTeams = () => getItems(TEAMS_KEY);
export const saveTeam = (teamData) => saveItem(TEAMS_KEY, teamData);
export const deleteTeam = (id) => deleteItem(TEAMS_KEY, id);
export const getTeamById = (id) => getItemById(TEAMS_KEY, id);

// Insígnias
export const getBadges = () => getItems(BADGES_KEY);
export const saveBadge = (badgeData) => saveItem(BADGES_KEY, badgeData);
export const deleteBadge = (id) => deleteItem(BADGES_KEY, id);
export const getBadgeById = (id) => getItemById(BADGES_KEY, id);

// Favoritos (lógica um pouco diferente, então mantemos separado)
export const getFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error reading favorites", e);
    return [];
  }
};

export const toggleFavorite = async (pokemon) => {
  try {
    let favorites = await getFavorites();
    const existingIndex = favorites.findIndex((p) => p.id === pokemon.id);

    if (existingIndex > -1) {
      favorites.splice(existingIndex, 1);
    } else {
      favorites.push(pokemon);
    }

    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem(FAVORITES_KEY, jsonValue);
  } catch (e) {
    console.error("Error toggling favorite", e);
  }
};
