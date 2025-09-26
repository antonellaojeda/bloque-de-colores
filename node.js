let nivel = 1;
let records = JSON.parse(localStorage.getItem("records")) || [];
function getRandomHue() {
  let hue;
  do {
    hue = Math.floor(Math.random() * 360);
  } while (hue >= 160 && hue <= 190);
  return hue;
}
function actualizarRecords(nivelAlcanzado) {
  records.push(nivelAlcanzado);
  records.sort((a, b) => b - a);
  records = records.slice(0, 3);
  localStorage.setItem("records", JSON.stringify(records));
}
function mostrarRecords() {
  const lista = document.getElementById("lista-records");
  lista.innerHTML = "";
  if (records.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Sin récords aún";
    lista.appendChild(li);
  } else {
    records.forEach((r, i) => {
      const li = document.createElement("li");
      li.textContent = `${i + 1} = Nivel ${r}`; 
      lista.appendChild(li);
    });
  }
}
document.getElementById("btn-records").addEventListener("click", () => {
  const divRecords = document.getElementById("records");
  if (divRecords.style.display === "none") {
    mostrarRecords();
    divRecords.style.display = "block";
    document.getElementById("btn-records").textContent = "Ocultar récords";
  } else {
    divRecords.style.display = "none";
    document.getElementById("btn-records").textContent = "Ver récords";
  }
});
function startGame() {
  const game = document.getElementById("game");
  game.innerHTML = "";
  const size = 2 + Math.floor(nivel / 2);
  game.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  const squareSize = Math.max(80 - nivel * 3, 30);
  const baseColor = getRandomHue();
  const color = `hsl(${baseColor}, 70%, 50%)`;
  let diff = Math.max(20 - nivel, 5);
  const diffColor = `hsl(${baseColor}, 70%, ${50 + diff}%)`;
  const total = size * size;
  const diffIndex = Math.floor(Math.random() * total);
  for (let i = 0; i < total; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";
    square.style.background = i === diffIndex ? diffColor : color;
    if (i === diffIndex) {
      square.dataset.correct = "true";
      square.addEventListener("click", () => {
        nivel++;
        document.getElementById("nivel").textContent = "Nivel: " + nivel;
        startGame();
      });
    } else {
      square.addEventListener("click", () => {
        const correcto = document.querySelector('[data-correct="true"]');
        correcto.classList.add("correct");

        setTimeout(() => {
          actualizarRecords(nivel);
          nivel = 1;
          document.getElementById("nivel").textContent = "Nivel: " + nivel;
          startGame();
        }, 1000);
      });
    }
    game.appendChild(square);
  }
}
startGame();

