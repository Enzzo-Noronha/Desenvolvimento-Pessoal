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

const horaAgora = new Date().getHours();

let saudacao;

if (horaAgora >= 5 && horaAgora < 12) {
  saudacao = "Bom dia, Enzzo";
} else if (horaAgora >= 12 && horaAgora < 18) {
  saudacao = "Boa tarde, Enzzo";
} else {
  saudacao = "Boa noite, Enzzo";
}

document.getElementById("saudacao").innerHTML = saudacao;
