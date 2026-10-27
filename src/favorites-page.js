const favoriteBooks = [
  { id: 1, title: "Things Fall Apart", author: "Chinua Achebe" },
  { id: 2, title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie" },
  { id: 3, title: "Born a Crime", author: "Trevor Noah" },
];

const list = document.querySelector("#favorites-list");
const emptyMessage = document.querySelector("#empty-message");

function renderFavorites() {
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
    list.appendChild(card);
  });
}

renderFavorites();