import { getRandomInt } from "../utils/game.js";
import { gameObj } from "../constants/script.constants.js";
import { initialGameElements } from "./load_dom_elements.js";

const {
  container,
  landingPage,
  radioButtons,
  timer,
  won,
  gameBoard,
  moveCounter,
} = initialGameElements;

export function time() {
  gameObj.loop = setInterval(() => {
    gameObj.totalTime++;
    moveCounter.innerText = `Total Moves: ${gameObj.totalFlips}`;
    timer.innerText = `Time Elapsed: ${gameObj.totalTime} Seconds`;
  }, 1000);
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

//* Return x amount of items randomly from the original array.
const pickNumItems = (arr, num) => {
  let newArr = [];
  while (newArr.length < num) {
    let rand = getRandomInt(0, arr.length);
    newArr.push(arr[rand]);
    arr.splice(rand, 1);
  }
  return newArr;
};

export const drawBoard = () => {
  const flags = [
    "argentina",
    "brazil",
    "france",
    "germany",
    "israel",
    "italy",
    "netherlands",
    "portugal",
    "spain",
    "sweden",
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

function openGameWindow() {
  landingPage.classList.toggle("display-none");
  container.classList.toggle("display-none");
  gameObj.gameStarted = true;
}

function pickDifficulty() {
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
}

export function startGame() {
  openGameWindow();
  pickDifficulty();
  time();
  drawBoard();
}

export function resetBoard() {
  won.style.width = "0%";

  gameObj.flippedCards = 0;
  gameObj.totalFlips = 0;
  gameObj.totalTime = 0;
  time();
  gameBoard.innerHTML = "";
  drawBoard();
}
