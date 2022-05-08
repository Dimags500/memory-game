const landingBtn = document.querySelector("button");
const landingPage = document.getElementById("landing-page");
const container = document.querySelector(".game-container");
const gameBoard = document.querySelector(".game-board");
const radioButtons = document.querySelectorAll('input[name="difficulty"]');

const gameObj = {
  gameStarted: false,
  difficulty: 6,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: null,
};

landingBtn.addEventListener("click", () => {
  landingPage.classList.toggle("display-none");
  container.classList.toggle("display-none");
  gameObj.gameStarted = true;
  for (let i = 0; i < 3; i++) {
    if (radioButtons[i].checked) {
      if (i === 1) {
        gameBoard.classList.add("game-board__medium");
        gameObj.difficulty = 9;
      }
      if (i === 2) {
        gameBoard.classList.add("game-board__hard");
        gameObj.difficulty = 12;
      }
      break;
    }
  }

  drawBoard();
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const randomizeArray = (arr) => {
  let newArr = [];
  while (arr.length > 0) {
    let rand = getRandomInt(0, arr.length);
    newArr.push(arr[rand]);
    arr.splice(rand, 1);
  }
  return newArr;
};

const pickNumItems = (arr, num) => {
  let newArr = [];
  while (newArr.length < num) {
    let rand = getRandomInt(0, arr.length);
    newArr.push(arr[rand]);
    arr.splice(rand, 1);
  }
  return newArr;
};

const drawBoard = () => {
  const flags = [
    "argentina",
    "belgium",
    "brazil",
    "france",
    "germany",
    "israel",
    "italy",
    "netherlands",
    "portugal",
    "spain",
    "uk",
    "usa",
  ];
  const pickColorsPerDiff = pickNumItems(flags, gameObj.difficulty);
  const items = randomizeArray([...pickColorsPerDiff, ...pickColorsPerDiff]);
  for (let i = 0; i < items.length; i++) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back", items[i]);
    cardElement.appendChild(cardFront);
    cardElement.appendChild(cardBack);
    gameBoard.appendChild(cardElement);
  }
};
