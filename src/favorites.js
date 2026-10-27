let favorites = [
  { id: 1, title: "Things Fall Apart", author: "Chinua Achebe" },
  { id: 2, title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie" },
  { id: 3, title: "Born a Crime", author: "Trevor Noah" },
];

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
}

export function removeFavorite(id) {
  favorites = favorites.filter((book) => book.id !== id);
}