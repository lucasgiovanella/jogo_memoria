const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".span-player");
const timer = document.querySelector(".timer");

const matrizes = [
  "matriz_coluna",
  "matriz_identidade",
  "matriz_linha",
  "matriz_nula",
  "matriz_quadrada",
  "matriz_oposta_1",
  "matriz_oposta_2",
];

let firstCard = "";
let secondCard = "";

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length === 12) {
    clearInterval(this.loop);
    alert(
      `Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`
    );
  }
};

const checkCards = () => {
  const firstCardMatriz = firstCard.getAttribute("data-matriz");
  const secondCardMatriz = secondCard.getAttribute("data-matriz");

  if (
    firstCardMatriz === secondCardMatriz ||
    (firstCardMatriz.includes("matriz_oposta") &&
      secondCardMatriz.includes("matriz_oposta"))
  ) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 1000);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (matriz) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../images/${matriz}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-matriz", matriz);

  return card;
};

const loadGame = () => {
  const duplicateMatrizes = [...matrizes, ...matrizes.slice(0, 5)];
  const shuffledMatrizes = duplicateMatrizes.sort(() => Math.random() - 0.5);

  shuffledMatrizes.forEach((matriz) => {
    const card = createCard(matriz);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  const username = localStorage.getItem("username");
  if (username) {
    spanPlayer.innerHTML = username;
    startTimer();
    loadGame();
  } else {
    location.href = "../index.html";
  }
};