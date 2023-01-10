const inputAuthor = document.querySelector("#inputAuthor");
const inputDate = document.querySelector("#inputDate");
const inputTitle = document.querySelector("#inputTitle");
const inputImg = document.querySelector("#inputImg");
const inputRating = document.querySelector("#inputRating");
const addBookForm = document.querySelector(".add_book_form");
const editInputAuthor = document.querySelector("#editInputAuthor");
const editInputDate = document.querySelector("#editInputDate");
const editInputTitle = document.querySelector("#editInputTitle");
const editInputImg = document.querySelector("#editInputImg");
const editInputRating = document.querySelector("#editInputRating");

window.localStorage.setItem(
  "adm",
  JSON.stringify({
    email: "adm@email.com",
    password: "1234567",
  })
);

// INITIAL BOOK DATASET FOR EXAMPLE

let preset = [
  {
    author: "J.R.R. Tolkien",
    title: "The Lord of The Rings",
    date: "1954",
    img: "https://m.media-amazon.com/images/I/71jLBXtWJWL.jpg",
    rating: "5",
    id: Date.now() + 1,
  },
  {
    author: "Ernest Cline",
    title: "Ready Player One",
    date: "20122",
    img: "https://books.google.ie/books/content?id=8qs1-ypf7e0C&pg=PT5&img=1&zoom=3&hl=en&sig=ACfU3U0EbjawvIbIZdyGDjNqtCv_yCxcgA&w=1280",
    rating: "3",
    id: Date.now() + 2,
  },
  {
    author: "Douglas Adams",
    title: "The Hitchhiker's Guide to the Galaxy",
    date: "1978",
    img: "https://omimages.s3.eu-west-1.amazonaws.com/covers/9781529034523.jpg",
    rating: "4",
    id: Date.now(),
  },
  {
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    date: "1925",
    img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ87761SZPN4obDMsUEO3dTzhN3ksXJn9owJm0pXDXnt6Q83E6A",
    rating: "2",
    id: Date.now(),
  },
];
setBooks = [];
// CHECK IF USER IS LOGGED
let isLogged;
//Load saved setBooks
window.addEventListener("load", () => {
  isLogged = sessionStorage.getItem("isLogged");
  if (isLogged == null || isLogged == "0") {
    sessionStorage.setItem("isLogged", "0");
    loggoutDivs();
  } else if (isLogged == "1") {
    loginDivs();
  }

  const booksData = JSON.parse(window.localStorage.getItem("books"));
  if (booksData !== null) {
    setBooks = [...booksData];
    console.log(setBooks);
  } else if (setBooks.length == 0) {
    setBooks = [...preset];
    console.log(setBooks);
  }
  for (let i = 0; i < setBooks.length; i++) {
    createNewBook(
      setBooks[i].author,
      setBooks[i].title,
      setBooks[i].date,
      setBooks[i].img,
      setBooks[i].rating,
      setBooks[i].id
    );
  }
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("checkBtn")) {
    const checkBtn = e.target;
    checkBtn.classList.toggle("active");
    if (checkBtn.classList.contains("active")) {
      checkBtn.innerText = "Read";
    } else {
      checkBtn.innerText = "Mark as read";
    }
  }
});

// CREATE new book
document.querySelector("#addBookBtn").addEventListener("click", (e) => {
  addBookForm.classList.add("was-validated");
  e.preventDefault();
  if (
    inputAuthor.value === "" ||
    inputDate.value === "" ||
    inputTitle.value === ""
  ) {
  } else {
    const rating = inputRating.value;
    // inputRating.value === "0" ? "Unknown" : inputRating.value + "/5";

    //new book obj
    const book = {
      id: Date.now(),
      author: inputAuthor.value,
      title: inputTitle.value,
      date: inputDate.value,
      img: inputImg.value,
      rating: rating,
    };
    setBooks.push(book);
    //saving new book to local storage
    localStorage.setItem("books", JSON.stringify(setBooks));
    // add new book element
    createNewBook(
      book.author,
      book.title,
      book.date,
      book.img,
      book.rating,
      book.id
    );
    //close modal
    let myModalEl = document.querySelector("#exampleModalCenter");
    let modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    modal.hide();

    //reset inputs
    inputAuthor.value = "";
    inputTitle.value = "";
    inputDate.value = "";
    inputImg.value = "";
    rating.value = 0;
    addBookForm.classList.remove("was-validated");
  }
});

//create new book html element
const createNewBook = (author, title, date, url, rating, id) => {
  const mainBox = document.querySelector("#main-box");

  const backgroundDiv = document.createElement("div");
  // backgroundDiv.innerHTML =

  const card = document.createElement("div");
  card.classList.add("card", "me-4", "p-0", "bookCard");
  card.id = id;
  mainBox.appendChild(card);

  // const cardId = document.createElement("div");
  // cardId.style.display = "none";
  // cardId.id = id;
  // card.appendChild(cardId);

  const cardTop = document.createElement("div");
  cardTop.classList.add("card-div-top");
  cardTop.style.overflow = "hidden";

  card.appendChild(cardTop);

  const cardTopImg = document.createElement("img");
  cardTopImg.classList.add("card-img-top");
  cardTopImg.src = url;

  cardTop.appendChild(cardTopImg);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  card.appendChild(cardBody);

  const cartTitle = document.createElement("h5");
  cartTitle.classList.add("card-title", "fw-bold", "text-capitalize");
  cartTitle.innerHTML = title;
  cardBody.appendChild(cartTitle);

  const cardUl = document.createElement("ul");
  cardUl.classList.add("list-group", "list-group-flush");
  cardBody.appendChild(cardUl);

  const authorLi = document.createElement("li");
  authorLi.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-start",
    "p-0",
    "pt-2",
    "pb-2"
  );
  authorLi.innerHTML = `<div>${author}</div>`;
  cardUl.appendChild(authorLi);

  const dateLi = document.createElement("li");
  dateLi.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-start",
    "p-0",
    "pt-2",
    "pb-2"
  );
  dateLi.innerHTML = `<div>${date}</div>`;
  cardUl.appendChild(dateLi);

  const ratingLi = document.createElement("li");
  ratingLi.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-start",
    "p-0",
    "pt-2",
    "pb-2"
  );
  let stars = "";
  for (let i = 0; i < 5; i++) {
    if (i < rating && rating != 0) {
      stars = stars + "<i class='fa-solid fa-star'></i>";
    } else {
      stars = stars + "<i class='fa-regular fa-star'></i>";
    }
  }
  ratingLi.innerHTML = `<div>${stars}</div>`;
  cardUl.appendChild(ratingLi);

  const editDiv = document.createElement("div");
  editDiv.classList.add("d-grid", "gap-2", "mt-2");
  if (isLogged == null || isLogged == "0") {
    editDiv.innerHTML = `<button class='btn btn-sm btn-outline-danger  deleteBtn ${id} hiddenBtns' type='button'><i class='fa-regular fa-trash-can'></i> Delete</button><button class='btn btn-sm btn-outline-secondary editBtn hiddenBtns ${id}' type='button'><i class='fa-regular fa-pen-to-square mr-2'></i> Edit</button></div>`;
  } else if (isLogged == "1") {
    editDiv.innerHTML = `<button class='btn btn-sm btn-outline-danger  deleteBtn ${id}' type='button'><i class='fa-regular fa-trash-can'></i> Delete</button><button class='btn btn-sm btn-outline-secondary editBtn ${id}' type='button'><i class='fa-regular fa-pen-to-square mr-2'></i> Edit</button></div>`;
  }
  cardBody.appendChild(editDiv);
};

document.querySelector("#signInBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const emailInput = document.querySelector("#emailInput").value;
  const passwordInput = document.querySelector("#passwordInput").value;
  document.querySelector(".form-signin").classList.add("was-validated");

  const user = JSON.parse(window.localStorage.getItem("adm"));

  if (user.email === emailInput && user.password === passwordInput) {
    let myModalEl = document.querySelector("#loginModal");
    let modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    modal.hide();
    sessionStorage.setItem("isLogged", "1");
    loginDivs();
  }
});

document.querySelector("#logoutBtn").addEventListener("click", (e) => {
  window.sessionStorage.setItem("isLogged", "0");
  loggoutDivs();
});

//delete card
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    console.log(e.target.classList);
    const id = e.target.classList[4];
    let card = document.getElementById(id);
    for (let i = 0; i < setBooks.length; i++) {
      if (setBooks[i].id == id) {
        setBooks.splice(i, 1);
      }
    }
    localStorage.setItem("books", JSON.stringify(setBooks));
    card.remove();
  }
  if (e.target.classList.contains("editBtn")) {
    const id = e.target.classList[4];
    let editBookId = document.querySelector("#editBookId");
    editBookId.innerText = "";
    // let card = document.getElementById(id);
    for (let i = 0; i < setBooks.length; i++) {
      if (setBooks[i].id == id) {
        editInputAuthor.value = setBooks[i].author;
        editInputDate.value = setBooks[i].date;
        editInputImg.value = setBooks[i].img;
        editInputTitle.value = setBooks[i].title;
        editBookId.innerText = setBooks[i].id;
      }
    }

    let myModalEl = document.querySelector("#editModal");
    let modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    modal.show(myModalEl);
  }
});

const submitEditBook = document.querySelector("#submitEditBook");
submitEditBook.addEventListener("click", (e) => {
  e.preventDefault();
  const editBookId = document.querySelector("#editBookId");

  for (let i = 0; i < setBooks.length; i++) {
    if (setBooks[i].id == editBookId.innerText) {
      setBooks[i].author = editInputAuthor.value;
      setBooks[i].date = editInputDate.value;
      setBooks[i].title = editInputTitle.value;
      setBooks[i].img = editInputImg.value;
      setBooks[i].rating = editInputRating.value;
    }
  }
  localStorage.setItem("books", JSON.stringify(setBooks));

  const main = document.querySelector("#main-box");
  main.innerHTML = "";
  for (let i = 0; i < setBooks.length; i++) {
    createNewBook(
      setBooks[i].author,
      setBooks[i].title,
      setBooks[i].date,
      setBooks[i].img,
      setBooks[i].rating,
      setBooks[i].id
    );
  }
  let myModalEl = document.querySelector("#editModal");
  let modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
  modal.hide(myModalEl);
});

//help functions

const loginDivs = () => {
  document.querySelector("#loginBtn").style.display = "none";
  document.querySelector("#logoutBtn").style.display = "block";
  document.querySelector("#userProfile").style.display = "block";
  const editDiv = document.querySelectorAll(".editBtn");
  const dltBtn = document.querySelectorAll(".deleteBtn");
  editDiv.forEach((e) => e.classList.remove("hiddenBtns"));
  dltBtn.forEach((e) => e.classList.remove("hiddenBtns"));
};
const loggoutDivs = () => {
  document.querySelector("#loginBtn").style.display = "block";
  document.querySelector("#logoutBtn").style.display = "none";
  document.querySelector("#userProfile").style.display = "none";
  const editDiv = document.querySelectorAll(".editBtn");
  const dltBtn = document.querySelectorAll(".deleteBtn");
  editDiv.forEach((e) => e.classList.add("hiddenBtns"));
  dltBtn.forEach((e) => e.classList.add("hiddenBtns"));
};
// SEARCH FUNCTION

const searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("keyup", () => {
  let searchKey = searchBar.value.toUpperCase();
  for (let i = 0; i < setBooks.length; i++) {
    if (setBooks[i].title.toUpperCase().indexOf(searchKey) == -1) {
      let cardId = document.getElementById(setBooks[i].id);
      cardId.style.display = "none";
    } else {
      let cardId = document.getElementById(setBooks[i].id);
      cardId.style.display = "block";
    }
    console.log(setBooks[i].title.toUpperCase().indexOf(searchKey));
  }
});
