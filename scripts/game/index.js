const playButton = document.querySelector("button");

const gameBoard = document.querySelector(".game-board");

const wonContent = document.getElementById("won-page");
const wonBtn = document.querySelector(".won-page__btn");

const themeButton = document.getElementById("theme");

import { startGame, resetBoard } from "./initial_game.js";
import { changeTheme } from "./settings.js";
import { handleCardEvent } from "./board.js";

playButton.addEventListener("click", startGame);
themeButton.addEventListener("click", changeTheme);
gameBoard.addEventListener("click", handleCardEvent);
wonBtn.addEventListener("click", resetBoard);
