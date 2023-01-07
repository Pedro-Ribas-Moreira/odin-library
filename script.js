// $("#exampleModalCenter").on("shown.bs.modal", function () {
//   $("#myInput").trigger("focus");
// });

checkBtn = document.querySelector(".checkBtn");
checkBtn.addEventListener("click", () => {
  checkBtn.classList.toggle("active");
  if (checkBtn.classList.contains("active")) {
    checkBtn.innerText = "Read";
  } else {
    checkBtn.innerText = "Mark as read";
  }
});

const inputAuthor = document.querySelector("#inputAuthor");
const inputDate = document.querySelector("#inputDate");
const inputTitle = document.querySelector("#inputTitle");
const inputImg = document.querySelector("#inputImg");
const inputRating = document.querySelector("#inputRating");
const isRead = document.querySelector("#isRead");

document.querySelector("#addBookBtn").addEventListener("click", () => {
  console.log(isRead.value);

  console.log(`inputAuthor: ${inputAuthor.value}; 
  inputImg: ${inputImg.value}; 
  inputTitle: ${inputTitle.value}; 
  inputDate: ${inputDate.value}; 
  inputRating: ${inputRating.value}; 
  isRead: ${isRead.value};
  `);
});
