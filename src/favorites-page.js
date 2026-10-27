
import { getFavorites, removeFavorite } from "./favorites.js";

const grid = document.querySelector("#favorites-list");
const emptyMessage = document.querySelector("#empty-message");

function createCard(book) {
  const card = document.createElement("article");
  card.className = "overflow-hidden rounded-xl bg-white shadow";

  if (book.coverUrl) {
    const cover = document.createElement("img");
    cover.src = book.coverUrl;
    cover.alt = `Cover of ${book.title}`;
    cover.className = "h-56 w-full object-cover";
    card.appendChild(cover);
  } else {
    const noCover = document.createElement("div");
    noCover.className =
      "flex h-56 items-center justify-center bg-rose text-espresso/70";
    noCover.textContent = "No cover";
    card.appendChild(noCover);
  }

  const content = document.createElement("div");
  content.className = "p-4";

  const title = document.createElement("h3");
  title.className = "font-bold text-espresso";
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "text-sm text-espresso/70";
  author.textContent = book.author;

  const button = document.createElement("button");
  button.textContent = "Remove from favorites";
  button.className =
    "mt-4 w-full rounded-full bg-burgundy py-2 text-sm font-semibold text-ivory hover:bg-burgundy/90";

  button.addEventListener("click", () => {
    removeFavorite(book.id);
    renderFavorites();
  });

  content.append(title, author, button);
  card.appendChild(content);

  return card;
}

function renderFavorites() {
  const favorites = getFavorites();

  grid.innerHTML = "";

  if (favorites.length === 0) {
    emptyMessage.classList.remove("hidden");
    return;
  }

  emptyMessage.classList.add("hidden");

  favorites.forEach((book) => {
    grid.appendChild(createCard(book));
  });
}

renderFavorites();
