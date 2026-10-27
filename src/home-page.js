import { addFavorite, removeFavorite, isFavorite } from "./favorites.js";
import { fetchBooks } from "./fetchBooks.js";

const grid = document.querySelector("#books-grid");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

function updateButton(button, id) {
  if (isFavorite(id)) {
    button.textContent = "Saved to favorites";
    button.className =
      "mt-4 w-full rounded-full bg-rose py-2 text-sm font-semibold text-espresso";
  } else {
    button.textContent = "Add to favorites";
    button.className =
      "mt-4 w-full rounded-full bg-burgundy py-2 text-sm font-semibold text-ivory hover:bg-burgundy/90";
  }
}


function createCard(book) {
  const card = document.createElement("article");
  card.className = "overflow-hidden rounded-xl bg-white shadow";

  const cover = book.coverUrl
    ? `<img src="${book.coverUrl}" alt="Cover of ${book.title}" class="h-56 w-full object-cover" />`
    : `<div class="flex h-56 items-center justify-center bg-rose text-espresso/70">No cover</div>`;

  card.innerHTML = `
    ${cover}
    <div class="p-4">
      <h3 class="font-bold text-espresso">${book.title}</h3>
      <p class="text-sm text-espresso/70">${book.author}</p>
      <button class="mt-4 w-full rounded-full bg-burgundy py-2 text-sm font-semibold text-ivory hover:bg-burgundy/90"></button>
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

  return card;
}


async function loadBooks(query = "fiction") {
  grid.innerHTML = `
    <p class="col-span-full text-center">Loading books...</p>
  `;

  try {
    const books = await fetchBooks(query);

    grid.innerHTML = "";

    if (books.length === 0) {
      grid.innerHTML = `
        <p class="col-span-full text-center">
          No books found. Try another title.
        </p>
      `;
      return;
    }

    books.forEach((book) => {
      grid.appendChild(createCard(book));
    });
  } catch (error) {
    console.error(error);

    grid.innerHTML = `
      <p class="col-span-full text-center">
        Could not load books. Please try again.
      </p>
    `;
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query === "") {
    grid.innerHTML = `
      <p class="col-span-full text-center">
        Please enter a book title to search.
      </p>
    `;
    return;
  }

  loadBooks(query);
});

loadBooks();
