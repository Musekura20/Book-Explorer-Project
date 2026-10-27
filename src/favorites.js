const STORAGE_KEY = "bookExplorerFavorites";

function loadFavorites() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved === null) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

function saveFavorites() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

let favorites = loadFavorites();

export function getFavorites() {
  return favorites;
}

export function isFavorite(id) {
  return favorites.some((book) => book.id === id);
}

export function addFavorite(book) {
  if (isFavorite(book.id)) {
    return;
  }
  favorites.push(book);
  saveFavorites();
}

export function removeFavorite(id) {
  favorites = favorites.filter((book) => book.id !== id);
  saveFavorites();
}