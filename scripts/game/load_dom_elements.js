const landingPage = document.getElementById("landing-page");
const container = document.querySelector(".game-container");
const timer = document.querySelector(".timer");
const radioButtons = document.querySelectorAll('input[name="difficulty"]');
const won = document.getElementById("overlay");
const timerEnd = document.querySelector(".timer-end");
const moveCounterEnd = document.querySelector(".moves-end");
const moveCounter = document.querySelector(".moves");
const gameBoard = document.querySelector(".game-board");

export const settingsElements = {
  timer,
  moveCounter,
  container,
};

export const boardElements = {
  moveCounterEnd,
  timerEnd,
  won,
};

export const initialGameElements = {
  landingPage,
  container,
  timer,
  radioButtons,
  won,
  gameBoard,
  moveCounter,
};
