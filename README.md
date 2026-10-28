# Book Explorer

Book Explorer is a responsive web app for finding books and saving your favorites. Books come from the Open Library API, and your favorites are saved in the browser, so they are still there after you refresh the page.

Built as the capstone project for **Responsive & Interactive Web App Development** (HTML, Tailwind CSS, JavaScript, async API calls, ES6 modules, GitHub workflow).

**Live limk:** [https://book-explorer-project.inezaespe03.workers.dev/]
**Repository:** [https://github.com/Musekura20/Book-Explorer-Project]

---

## Features

- Browse real books fetched from the Open Library API
- Search books by title
- Loading spinner while books are being fetched
- "No results found" message when a search has no matches
- Error message when the request fails (for example, no internet)
- Add a book to favorites, and see the button change to "Saved to favorites"
- Remove a book from favorites on the Favorites page (or from the Home page)
- Favorites are saved in `localStorage`, so they stay after a refresh and between pages
- Fully responsive: phone, tablet, laptop and desktop
- Three pages: Home, Favorites, About

---

## Pages

| Page      | File             | What it does                                             |
| --------- | ---------------- | -------------------------------------------------------- |
| Home      | `index.html`     | Hero section, search bar, grid of books from the API     |
| Favorites | `favorites.html` | Shows the saved books, with a Remove button on each card |
| About     | `about.html`     | Short description of the app and the tools used          |

---

## Tech Stack

| Tool                     | Use                                                                      |
| ------------------------ | ------------------------------------------------------------------------ |
| HTML5                    | Page structure (`header`, `nav`, `main`, `section`, `article`, `footer`) |
| Tailwind CSS v4          | Styling and responsive design                                            |
| JavaScript (ES6 modules) | Interactivity, API calls, favorites logic                                |
| Vite                     | Dev server and build tool                                                |
| Open Library API         | Source of book data and covers                                           |
| localStorage             | Saving favorites in the browser                                          |
| Git and GitHub           | Version control and collaboration                                        |

---

## Project Structure

```
book-explorer/
├── public/                 Static files (hero image)
├── src/
│   ├── main.js             Loads the CSS on every page
│   ├── style.css           Tailwind import, custom colors, hover setting
│   ├── fetchBooks.js       Module: gets books from the Open Library API
│   ├── favorites.js        Module: add, remove and read favorites (localStorage)
│   ├── home-page.js        Home page: search, loading states, book cards
│   └── favorites-page.js   Favorites page: shows and removes saved books
├── index.html              Home page
├── favorites.html          Favorites page
├── about.html              About page
├── vite.config.js          Vite settings with the Tailwind plugin
├── package.json            Project info and scripts
└── .gitignore              Files Git must ignore (node_modules, dist, .env)
```

---

## How It Works

### 1. `fetchBooks.js` (API module)

- `fetchBooks(query, limit, field)` is an `async` function that uses `fetch` and `await`.
- It calls `https://openlibrary.org/search.json` with the search word, a limit, and only the fields we need.
- It checks `response.ok` and throws an error if the request failed.
- It reshapes each result into a simple book object:

```js
{
  (id, title, author, coverUrl, year);
}
```

### 2. `favorites.js` (favorites module)

Exports four functions:

| Function             | Job                                            |
| -------------------- | ---------------------------------------------- |
| `getFavorites()`     | Returns the list of saved books                |
| `isFavorite(id)`     | Returns `true` if the book is saved            |
| `addFavorite(book)`  | Adds a book (no duplicates) and saves the list |
| `removeFavorite(id)` | Removes a book and saves the list              |

The list is stored in `localStorage` under the key `bookExplorerFavorites`. It is converted with `JSON.stringify` before saving and `JSON.parse` after reading. A `try/catch` protects the app if the saved data is damaged.

### 3. `home-page.js`

- Reads the search form and listens for the `submit` event (Search button or Enter key).
- `event.preventDefault()` stops the page from reloading.
- Shows one of three states: **loading spinner**, **book cards** or **message** (no results or error).
- `createCard(book)` builds one card with the cover, title, author and favorite button.
- `updateButton` changes the button text and colors depending on whether the book is saved.

### 4. `favorites-page.js`

- Gets the saved books from `favorites.js`.
- Draws one card per book, with a Remove button.
- After a removal, it draws the list again.
- Shows "You have no favorite books yet." when the list is empty.

### Data flow

```
Open Library API --> fetchBooks.js --> home-page.js --> book cards
                                              |
                                       Add / Remove click
                                              |
                                        favorites.js <--> localStorage
                                              |
                                      favorites-page.js --> favorites cards
```

Each page is a separate program. They share data through `localStorage`, not through memory.

---

## Responsive Design

The app is built **mobile-first**: classes without a prefix are for phones, and prefixes add changes for bigger screens.

| Prefix | Starts at | Example in this app                   |
| ------ | --------- | ------------------------------------- |
| (none) | 0 px      | 1 column of books, stacked navbar     |
| `sm:`  | 640 px    | 2 columns of books, navbar in one row |
| `md:`  | 768 px    | Hero text and image side by side      |
| `lg:`  | 1024 px   | 3 columns of books                    |
| `xl:`  | 1280 px   | 4 columns of books                    |

---

## Color Palette

Defined once in `src/style.css` with Tailwind's `@theme`:

| Name     | Code      | Use                                   |
| -------- | --------- | ------------------------------------- |
| Burgundy | `#702D3A` | Navbar, main buttons, accents         |
| Ivory    | `#FFF9F0` | Page background, light text           |
| Rose     | `#D8B9A5` | Soft areas, hover, image placeholders |
| Espresso | `#382B29` | Text, footer                          |

Example classes: `bg-burgundy`, `text-ivory`, `border-rose`, `text-espresso/70`.

---

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/) (version 20 or newer)
- npm (comes with Node.js)

### Install and run

```bash
# 1. Clone the project
git clone [your repository link]
cd book-explorer

# 2. Install the packages
npm install

# 3. Start the dev server
npm run dev
```

Open the address shown in the terminal (usually `http://localhost:5173`).

> Favorites are saved per address. `localhost:5173` and `localhost:5174` have separate storage.

---

## Learning Outcomes Covered

| Lab       | What was built                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------ |
| **Lab 1** | Responsive layout with Tailwind: navbar, hero, footer, responsive book grid, mobile-first design       |
| **Lab 2** | Favorites page, `favorites.js` module, click events, `localStorage` persistence                        |
| **Lab 3** | `fetchBooks.js` module with `async/await`, books from the API, search, loading and "no results" states |
| **Lab 4** | GitHub workflow: task tracking, feature branches, issues                                               |

---

## Git and GitHub Workflow

- Tasks (UI, API, Favorites) tracked in **GitHub Projects**
- Feature branches such as `feature/search` and `feature/favorites`
- Bugs and improvements tracked in **Issues**
- Small commits with clear messages (for example, `Add search bar to search books by title`)

---

## Known Limitations and Ideas

- Search is by title only, and shows the first 12 results.
- Pages share the same navbar and footer code (copied in each HTML file).
- The card code is similar on the Home and Favorites pages. A shared card module would remove the repetition.
- Possible next steps: pagination, a book details page, sorting favorites, dark mode.

---

## Author

Ineza Musekura Esperance
