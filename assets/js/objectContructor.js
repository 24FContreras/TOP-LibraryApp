const bookLibrary = [
  {
    name: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
    isCompleted: true,
    cover: "https://almabooks.com/wp-content/uploads/2016/10/9781847493699.jpg",
    status: "Completed",
    info: function () {
      return `${this.pages} pages || ${this.status}`;
    },
  },
];

function book(name, author, pages, isCompleted, cover) {
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
  if (this.isCompleted === true) return "Completed";
  else return "Not read Yet";
};

function addBookToLibrary(name, author, pages, isCompleted, cover) {
  const newBook = new book(name, author, pages, isCompleted, cover);

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
    defaults: { duration: 0.5, opacity: 0 },
  });

  modalOnTimeline.from(".overlay", {}).from(".modal", {}, "<.1");
});

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

  addBookToLibrary(
    bookName.value,
    bookAuthor.value,
    bookPages.value,
    getStatus(),
    bookCover.value
  );

  document.querySelector(".modal").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");

  renderCards();
});

window.onload = renderCards();
