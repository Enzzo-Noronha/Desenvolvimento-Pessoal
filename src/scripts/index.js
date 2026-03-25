const sections = document.querySelectorAll(".section");
const buttons = document.querySelectorAll(".btn");

buttons.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    sections.forEach((section) => {
      section.style.display = "none";
    });

    sections[index].style.display = "flex";
  });
});
