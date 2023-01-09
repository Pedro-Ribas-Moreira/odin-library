const inputAuthor = document.querySelector("#inputAuthor");
const inputDate = document.querySelector("#inputDate");
const inputTitle = document.querySelector("#inputTitle");
const inputImg = document.querySelector("#inputImg");
const inputRating = document.querySelector("#inputRating");
const isRead = document.querySelector("#isRead");
const addBookForm = document.querySelector(".add_book_form");

//Load saved setBooks

let setBooks = [];
window.addEventListener("load", () => {
  const booksData = JSON.parse(window.localStorage.getItem("books"));
  if (booksData !== null) {
    setBooks = [...booksData];
    console.log(setBooks);
    // setBooks.map((e) => console.log(e));
    // // booksData.map((book) => {
    // //   createNewBook(
    // //     book.author,
    // //     book.title,
    // //     book.date,
    // //     book.img,
    // //     book.rating,
    // //     book.isRead,
    // //     book.id
    // //   );
    // // });
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
    console.log(setBooks);
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
    var myModalEl = document.querySelector("#exampleModalCenter");
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
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
  mainBox.appendChild(card);

  const cardId = document.createElement("div");
  cardId.style.display = "none";
  cardId.id = id;

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
};
