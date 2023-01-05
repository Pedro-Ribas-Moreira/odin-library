checkBtn = document.querySelector(".checkBtn");
checkBtn.addEventListener("click", () => {
  checkBtn.classList.toggle("active");
  if (checkBtn.classList.contains("active")) {
    checkBtn.innerText = "Read";
  } else {
    checkBtn.innerText = "Mark as read";
  }
});
