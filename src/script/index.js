// ===================== HORA ===================

function atualizarHora() {
  const agora = new Date();
  const hr = String(agora.getHours()).padStart(2, "0");
  const min = String(agora.getMinutes()).padStart(2, "0");

  document.getElementById("horaHeader").textContent = `${hr}:${min}`;
}

atualizarHora();
setInterval(atualizarHora, 1000);

//===================== SECTIONS & MENU INFERIOR =======================

const sections = ["section1", "section2", "section3", "section4"];
const buttons = ["btn1", "btn2", "btn3", "btn4"];

function showSection(activeIndex) {
  sections.forEach((id, i) => {
    document.getElementById(id).style.display =
      i === activeIndex ? "flex" : "none";
  });
}

buttons.forEach((btnId, index) => {
  document.getElementById(btnId).addEventListener("click", () => {
    showSection(index);
  });
});

//===================== HOME =======================

const buttons2 = ["btnTarefas", "btnMetas"];
const sections2 = ["sectionTarefas", "sectionMetas"];

function showSection2(activeIndex2) {
  sections2.forEach((id2, i2) => {
    document.getElementById(id2).style.display =
      i2 === activeIndex2 ? "flex" : "none";
  });

  buttons2.forEach((btnId2, i2) => {
    document.getElementById(btnId2).style.background =
      i2 === activeIndex2 ? "#7c3aed" : "transparent";
    document.getElementById(btnId2).style.color =
      i2 === activeIndex2 ? "white" : "white";
  });
}

buttons2.forEach((btnId2, index2) => {
  document.getElementById(btnId2).addEventListener("click", () => {
    showSection2(index2);
  });
});

showSection2(0);

//===================== HOME - TAREFAS =======================

const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    datasets: [
      {
        label: "Tarefas Concluídas",
        data: [0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
