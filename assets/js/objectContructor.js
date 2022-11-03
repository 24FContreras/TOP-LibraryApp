let idCounter = 1;

const bookLibrary = [
  {
    id: 1,
    name: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
    isCompleted: true,
    cover:
      "https://kbimages1-a.akamaihd.net/afcd8653-3b27-4423-bee9-570fb1441aed/353/569/90/False/pride-and-prejudice-71.jpg",
    status: function () {
      if (this.isCompleted) return "Completed";
      else return "Not read Yet";
    },
    info: function () {
      return `${this.pages} pages || ${this.status()}`;
    },
  },
];

// BOOK CONSTRUCTOR
function book(id, name, author, pages, isCompleted, cover) {
  this.id = id;
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isCompleted = isCompleted;
  this.cover = cover;
}

book.prototype.info = function () {
  return `${this.pages} pages || ${this.status()}`;
};

book.prototype.status = function () {
  if (this.isCompleted) return "Completed";
  else return "Not read Yet";
};

//ADDS BOOK TO THE ARRAY
function addBookToLibrary(id, name, author, pages, isCompleted, cover) {
  const newBook = new book(id, name, author, pages, isCompleted, cover);

  bookLibrary.push(newBook);
}

//RENDER THE CARDS
const booksSection = document.querySelector("#books");
const cardTemplate = document.querySelector("#cardTemplate");

function renderCards() {
  let cardFragment = document.createDocumentFragment();

  booksSection.textContent = "";

  bookLibrary.forEach((book) => {
    let cardTemplateClone = cardTemplate.content.cloneNode(true);

    cardTemplateClone.querySelector("h2").textContent = book.name;
    cardTemplateClone.querySelector(".author").textContent = book.author;
    cardTemplateClone.querySelector(".details").textContent = book.info();
    cardTemplateClone.querySelector("img").src = book.cover;
    cardTemplateClone.querySelector(".delete-book").dataset.bookid = book.id;
    cardTemplateClone.querySelector(".delete-book").onclick = function () {
      deleteBook(book.id);
    };
    cardTemplateClone.querySelector(".update-book").onclick = function () {
      updateBook(book.id);
    };

    cardFragment.appendChild(cardTemplateClone);
  });

  booksSection.appendChild(cardFragment);
}

//SHOW THE MODAL
document.querySelector("#createBook").addEventListener("click", function () {
  document.querySelector(".modal").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");

  //GSAP
  const modalOnTimeline = gsap.timeline({
    defaults: { duration: 0.5, opacity: 1 },
  });

  modalOnTimeline.to(".overlay", {}).to(".modal", {}, "<.1");
});

//CLOSE THE MODAL
function closeModal() {
  gsap.to(".modal", 0.5, {
    opacity: 0,
    onComplete: function () {
      document.querySelector(".modal").classList.add("hidden");
    },
  });

  gsap.to(".overlay", 0.5, {
    opacity: 0,
    onComplete: function () {
      document.querySelector(".overlay").classList.add("hidden");
    },
  });
}

//ADDS NEW BOOK AND REMOVE THE MODAL
const bookName = document.querySelector("#bookName");
const bookAuthor = document.querySelector("#bookAuthor");
const bookPages = document.querySelector("#bookPages");
const bookStatus = document.querySelector("#bookStatus");
const bookCover = document.querySelector("#bookCover");

document.querySelector("#bookForm").addEventListener("submit", function (e) {
  e.preventDefault();
});

document.querySelector("#submitBook").addEventListener("click", function (e) {
  if (
    bookName.value == "" ||
    bookAuthor.value == "" ||
    bookPages.value == "" ||
    bookCover.value == ""
  )
    return;

  function getStatus() {
    if (bookStatus.checked) return true;
    else return false;
  }

  idCounter++;
  addBookToLibrary(
    idCounter,
    bookName.value,
    bookAuthor.value,
    bookPages.value,
    getStatus(),
    bookCover.value
  );

  closeModal();

  renderCards();
});

//DELETE BOOK FROM THE ARRAY
function deleteBook(id) {
  let bookIndex = bookLibrary.findIndex((book) => book.id == id);
  bookLibrary.splice(bookIndex, 1);

  renderCards();
}

//DELETE UPDATE BOOK FROM THE ARRAY
function updateBook(id) {
  let bookIndex = bookLibrary.findIndex((book) => book.id == id);

  if (bookLibrary[bookIndex].isCompleted)
    bookLibrary[bookIndex].isCompleted = false;
  else bookLibrary[bookIndex].isCompleted = true;

  renderCards();
}

document.querySelector("#closeModalBtn").addEventListener("click", closeModal);

window.onload = renderCards();
