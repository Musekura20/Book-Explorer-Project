import { addFavorite, removeFavorite, isFavorite } from "./favorites.js";

const sampleBooks = [
  { id: 1, title: "Things Fall Apart", author: "Chinua Achebe" },
  { id: 2, title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie" },
  { id: 3, title: "Born a Crime", author: "Trevor Noah" },
  { id: 4, title: "Americanah", author: "Chimamanda Ngozi Adichie" },
  { id: 5, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 6, title: "Becoming", author: "Michelle Obama" },
  { id: 7, title: "Atomic Habits", author: "James Clear" },
  { id: 8, title: "The Hobbit", author: "J.R.R. Tolkien" },
];

const grid = document.querySelector("#books-grid");

function updateButton(button, id) {
  const saved = isFavorite(id);

  button.textContent = saved ? "Saved to favorites" : "Add to favorites";

  button.classList.toggle("bg-burgundy", !saved);
  button.classList.toggle("text-ivory", !saved);
  button.classList.toggle("bg-rose", saved);
  button.classList.toggle("text-burgundy", saved);
}

function renderBooks() {
  grid.innerHTML = "";

  sampleBooks.forEach((book) => {
    const card = document.createElement("article");
    card.className = "overflow-hidden rounded-xl bg-white shadow";
    card.innerHTML = `
      <div class="h-56 bg-rose"></div>
      <div class="p-4">
        <h3 class="font-bold text-espresso">${book.title}</h3>
        <p class="text-sm text-espresso/70">${book.author}</p>
        <button class="mt-4 w-full rounded-full py-2 text-sm font-semibold hover:opacity-90"></button>
      </div>
    `;

    const button = card.querySelector("button");
    updateButton(button, book.id);

    button.addEventListener("click", () => {
      if (isFavorite(book.id)) {
        removeFavorite(book.id);
      } else {
        addFavorite(book);
      }
      updateButton(button, book.id);
    });

    grid.appendChild(card);
  });
}

renderBooks();