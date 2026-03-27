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

//SECTION 4

const form4 = document.getElementById("form4");

// Carrega anotações ao abrir o app
carregarAnotacoes();

form4.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.getElementById("anotacao");
  const texto = input.value.trim();

  if (!texto) return;

  salvarAnotacao(texto);
  form4.reset();
});

function salvarAnotacao(texto) {
  const anotacoes = JSON.parse(localStorage.getItem("anotacoes") || "[]");
  anotacoes.push({ id: Date.now(), texto });
  localStorage.setItem("anotacoes", JSON.stringify(anotacoes));
  renderizarAnotacao({ id: Date.now(), texto });
}

function carregarAnotacoes() {
  const anotacoes = JSON.parse(localStorage.getItem("anotacoes") || "[]");
  anotacoes.forEach((anotacao) => renderizarAnotacao(anotacao));
}

function renderizarAnotacao(anotacao) {
  const container = document.getElementById("anotacoes");

  const item = document.createElement("div");
  item.classList.add("anotacao-item");
  item.dataset.id = anotacao.id;

  const texto = document.createElement("p");
  texto.textContent = anotacao.texto;

  const btnApagar = document.createElement("button");
  btnApagar.textContent = "Apagar";
  btnApagar.classList.add("btn-apagar");
  btnApagar.addEventListener("click", () => apagarAnotacao(anotacao.id, item));

  item.appendChild(texto);
  item.appendChild(btnApagar);
  container.appendChild(item);
}

function apagarAnotacao(id, item) {
  let anotacoes = JSON.parse(localStorage.getItem("anotacoes") || "[]");
  anotacoes = anotacoes.filter((a) => a.id !== id);
  localStorage.setItem("anotacoes", JSON.stringify(anotacoes));
  item.remove();
}
