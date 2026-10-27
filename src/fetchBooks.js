const BASE_URL = "https://openlibrary.org/search.json";

export async function fetchBooks(query = "fiction", limit = 12) {
  const url = `${BASE_URL}?title=${encodeURIComponent(query)}&limit=${limit}&fields=key,title,author_name,cover_i,first_publish_year`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  return data.docs.map((doc) => ({
    id: doc.key,
    title: doc.title,
    author: doc.author_name ? doc.author_name.slice(0, 2).join(", ") : "Unknown author",
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : null,
    year: doc.first_publish_year ?? "",
  }));
}