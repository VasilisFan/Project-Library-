const myLibrary = [];

// Constructor for Book objects
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); // Unique ID for each book
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Add a method to toggle read status using the prototype
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Function to add a new book to the library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// Function to remove a book from the library
function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

// Function to toggle read status for a specific book
function toggleBookRead(id) {
  const book = myLibrary.find((book) => book.id === id);
  if (book) {
    book.toggleRead();
    displayBooks();
  }
}

// Function to display all books on the page
function displayBooks() {
  const libraryContainer = document.getElementById("library");
  libraryContainer.innerHTML = ""; // clear existing display

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id; // store the unique id in a data attribute

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? "Read" : "Not read"}</p>
      <button class="toggle-read">Toggle Read</button>
      <button class="remove-book">Remove</button>
    `;

    // Event listeners for buttons
    card
      .querySelector(".toggle-read")
      .addEventListener("click", () => toggleBookRead(book.id));
    card
      .querySelector(".remove-book")
      .addEventListener("click", () => removeBook(book.id));
    libraryContainer.appendChild(card);
  });
}

// Form handling
document.getElementById("new-book-form").addEventListener("submit", (e) => {
  e.preventDefault(); // prevent form from submitting to the server

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value.trim();
  const read = document.getElementById("read").checked;

  if (title && author && pages) {
    addBookToLibrary(title, author, pages, read);
    e.target.reset(); // clear the form
  }
});

// Example starter books
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
