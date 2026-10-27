import { getFavorites, removeFavorite } from "./favorites.js";

const list = document.querySelector("#favorites-list");
const emptyMessage = document.querySelector("#empty-message");

function renderFavorites() {
  const favoriteBooks = getFavorites();

  list.innerHTML = "";

  if (favoriteBooks.length === 0) {
    emptyMessage.classList.remove("hidden");
    return;
  }

  emptyMessage.classList.add("hidden");

  favoriteBooks.forEach((book) => {
    const card = document.createElement("article");
    card.className = "overflow-hidden rounded-xl bg-white shadow";
    card.innerHTML = `
      <div class="h-56 bg-rose"></div>
      <div class="p-4">
        <h3 class="font-bold text-espresso">${book.title}</h3>
        <p class="text-sm text-espresso/70">${book.author}</p>
        <button class="mt-4 w-full rounded-full border-2 border-burgundy py-2 text-sm font-semibold text-burgundy hover:bg-rose">
          Remove
        </button>
      </div>
    `;

    const removeButton = card.querySelector("button");
    removeButton.addEventListener("click", () => {
      removeFavorite(book.id);
      renderFavorites();
    });

    list.appendChild(card);
  });
}

renderFavorites();