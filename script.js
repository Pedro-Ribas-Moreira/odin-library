const inputAuthor = document.querySelector("#inputAuthor");
const inputDate = document.querySelector("#inputDate");
const inputTitle = document.querySelector("#inputTitle");
const inputImg = document.querySelector("#inputImg");
const inputRating = document.querySelector("#inputRating");
const isRead = document.querySelector("#isRead");
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
//Load saved setBooks
let setBooks = [];
window.addEventListener("load", () => {
  const booksData = JSON.parse(window.localStorage.getItem("books"));
  if (booksData !== null) {
    setBooks = [...booksData];

    for (let i = 0; i < setBooks.length; i++) {
      createNewBook(
        setBooks[i].author,
        setBooks[i].title,
        setBooks[i].date,
        setBooks[i].img,
        setBooks[i].rating,
        setBooks[i].isRead,
        setBooks[i].id
      );
    }
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
    const rating =
      inputRating.value === "0" ? "Unknown" : inputRating.value + "/5";

    //new book obj
    const book = {
      id: Date.now(),
      author: inputAuthor.value,
      title: inputTitle.value,
      date: inputDate.value,
      img: inputImg.value,
      rating: rating,
      isRead: isRead.checked,
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
      book.isRead,
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
    isRead.checked = false;
    addBookForm.classList.remove("was-validated");
  }
});

//create new book html element
const createNewBook = (author, title, date, url, rating, isRead, id) => {
  const mainBox = document.querySelector("#main-box");

  const card = document.createElement("div");
  card.classList.add("card", "me-auto");
  card.id = id;
  mainBox.appendChild(card);

  // const cardId = document.createElement("div");
  // cardId.style.display = "none";
  // cardId.id = id;
  // card.appendChild(cardId);

  const cardTop = document.createElement("div");
  cardTop.classList.add("card-img-top", "pt-2");
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
  authorLi.innerHTML = `<div><div class='fw-bold'>Author</div>${author}</div>`;
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
  dateLi.innerHTML = `<div><div class='fw-bold'>Published</div>${date}</div>`;
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

  ratingLi.innerHTML = `<div><div class='fw-bold'>Rating</div>${rating}</div>`;
  cardUl.appendChild(ratingLi);

  const readBtnDiv = document.createElement("div");
  readBtnDiv.classList.add("d-grid", "gap-2");

  if (isRead) {
    readBtnDiv.innerHTML =
      "<button class='btn btn-primary checkBtn active' type='button'>Read</button>";
  } else {
    readBtnDiv.innerHTML =
      "<button class='btn btn-primary checkBtn' type='button'>Mark as read</button>";
  }

  cardBody.appendChild(readBtnDiv);

  const editDiv = document.createElement("div");
  editDiv.classList.add("d-grid", "gap-2", "mt-2");
  editDiv.innerHTML = `<button class='btn btn-danger  deleteBtn ${id}' type='button'><i class='fa-regular fa-trash-can'></i> Delete</button><button class='btn btn-secondary editBtn ${id}' type='button'><i class='fa-regular fa-pen-to-square mr-2'></i> Edit</button></div>`;
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

    const editDiv = document.querySelectorAll(".editBtn");
    const dltBtn = document.querySelectorAll(".deleteBtn");
    editDiv.forEach((e) => (e.style.display = "block"));
    dltBtn.forEach((e) => (e.style.display = "block"));
  }
});

//delete card
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const id = e.target.classList[3];
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
    const id = e.target.classList[3];
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
      setBooks[i].isRead,
      setBooks[i].id
    );
  }
  let myModalEl = document.querySelector("#editModal");
  let modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
  modal.hide(myModalEl);
});
