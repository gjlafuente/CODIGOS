// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Manejo de IndexedDB
const dbPromise = new Promise((resolve, reject) => {
  const request = indexedDB.open('books-db', 1);
  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore('books', { keyPath: 'id', autoIncrement: true });
  };
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});

function addBook(book) {
  return dbPromise.then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('books', 'readwrite');
      const store = tx.objectStore('books');
      const req = store.add(book);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });
}

function getBooks() {
  return dbPromise.then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction('books', 'readonly');
      const store = tx.objectStore('books');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  });
}

function renderBooks() {
  getBooks().then((books) => {
    const list = document.getElementById('book-list');
    list.innerHTML = '';
    books.forEach((b) => {
      const li = document.createElement('li');
      li.textContent = `${b.title} - ${b.author}`;
      list.appendChild(li);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('book-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    if (title && author) {
      addBook({ title, author }).then(renderBooks);
      form.reset();
    }
  });
  renderBooks();
});
