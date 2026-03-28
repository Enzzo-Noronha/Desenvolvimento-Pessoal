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

//SECTION3

function AdicionarMeta() {
  document.getElementById("form3").style.display = "flex";
}

function cancelarMeta() {
  document.getElementById("form3").style.display = "none";
}

function renderizarMetas() {
  const metas = JSON.parse(localStorage.getItem("metas") || "[]");
  const div = document.getElementById("metas");

  div.innerHTML = metas
    .map(
      (m) => `
    <div class="meta-card">
      <span>${m.desc} — ${m.unidade ? m.unidade + " " + m.quantidade : m.quantidade} (${m.tempo})</span>
      <button type="button" onclick="apagarMeta(${m.id})" class="btn-apagar">Apagar</button>
    </div>
  `,
    )
    .join("");
}

function apagarMeta(id) {
  let metas = JSON.parse(localStorage.getItem("metas") || "[]");
  metas = metas.filter((m) => m.id !== id);
  localStorage.setItem("metas", JSON.stringify(metas));
  renderizarMetas();
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarMetas();
});

document
  .getElementById("metaQuantidade")
  .addEventListener("change", function () {
    const inputQuantidade = document.getElementById("quantidadeDigitadaMeta");

    if (this.value === "Nenhum") {
      inputQuantidade.style.display = "none";
    } else {
      inputQuantidade.style.display = "block";
    }
  });

document.getElementById("form3").addEventListener("submit", (e) => {
  e.preventDefault();

  const meta = {
    id: Date.now(),
    desc: document.getElementById("meta").value.trim(),
    quantidade: document.getElementById("metaQuantidade").value,
    unidade: document.getElementById("quantidadeDigitadaMeta").value.trim(),
    tempo: document.getElementById("metaTempo").value,
  };

  if (!meta.desc) return alert("Digite sua meta!");

  const metas = JSON.parse(localStorage.getItem("metas") || "[]");
  metas.push(meta);
  localStorage.setItem("metas", JSON.stringify(metas));

  renderizarMetas();
  document.getElementById("form3").reset();
  document.getElementById("form3").style.display = "none";
  document.getElementById("quantidadeDigitadaMeta").style.display = "none";
});
