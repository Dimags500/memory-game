const landingPage = document.getElementById("landing-page");
const landingBtn = document.querySelector("button");
const container = document.querySelector(".game-container");
const moveCounter = document.querySelector(".moves");
const timer = document.querySelector(".timer");
const gameBoard = document.querySelector(".game-board");
const won = document.getElementById("overlay");
const wonContent = document.getElementById("won-page");
const wonBtn = document.querySelector(".won-page__btn");
const moveCounterEnd = document.querySelector(".moves-end");
const timerEnd = document.querySelector(".timer-end");
const themeButton = document.getElementById("theme");
const radioButtons = document.querySelectorAll('input[name="difficulty"]');

const gameObj = {
  gameStarted: false,
  difficulty: 6,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: null,
};

//* Landing page button - starts the game (drawing the cards board according to the desired difficulty) and sets the timer and move counter.
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

  time();
  drawBoard();
});

//* Sets the interval for the move counter and timer to update every second.
function time() {
  gameObj.loop = setInterval(() => {
    gameObj.totalTime++;
    moveCounter.innerText = `Total Moves: ${gameObj.totalFlips}`;
    timer.innerText = `Time Elapsed: ${gameObj.totalTime} Seconds`;
  }, 1000);
}

//* Theme button - changes the theme from light mode to dark mode and back.
themeButton.addEventListener("click", (e) => {
  const cardFront = document.querySelectorAll(".card-front");
  if (e.target.textContent === "Dark Mode") {
    for (let i = 0; i < cardFront.length; i++) {
      cardFront[i].classList.add("card-front__dark");
    }
    container.classList.add("game-container__dark");
    moveCounter.style.color = "white";
    timer.style.color = "white";
    e.target.textContent = "Light Mode";
  } else {
    for (let i = 0; i < cardFront.length; i++) {
      cardFront[i].classList.remove("card-front__dark");
    }
    container.classList.remove("game-container__dark");
    moveCounter.style.color = "black";
    timer.style.color = "black";
    e.target.textContent = "Dark Mode";
  }
});

//* Returns random int from min to max-1.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

//* Returns new array with the same values as the original array but in a random order.
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

//* Draws the game board and creates the div elements of the cards.
const drawBoard = () => {
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

//* Event listener for each card in the board.
gameBoard.addEventListener("click", (e) => {
  const eventTarget = e.target;
  const eventParent = eventTarget.parentElement;
  if (
    eventTarget.className.includes("card") &&
    !eventParent.className.includes("flipped")
  ) {
    flipCard(eventParent);
  }
});

//* Flips the card and check for a match between last 2 flipped cards. If there are no more cards to be flipped, ends the game.
const flipCard = (card) => {
  gameObj.flippedCards++;
  if (gameObj.flippedCards <= 2) {
    gameObj.totalFlips++;
    card.classList.add("flipped");
  }

  if (gameObj.flippedCards === 2) {
    const flippedCards = document.querySelectorAll(".flipped:not(.matched)");
    if (
      flippedCards[0].childNodes[1].classList[1] ===
      flippedCards[1].childNodes[1].classList[1]
    ) {
      flippedCards[0].classList.add("matched");
      flippedCards[1].classList.add("matched");
    }
    setTimeout(() => {
      flipBackCards();
    }, 1000);

    if (!document.querySelectorAll(".card:not(.flipped)").length) {
      won.style.width = "100%";
      clearInterval(gameObj.loop);
      moveCounterEnd.innerText = `Total Moves: ${gameObj.totalFlips}`;
      timerEnd.innerText = `Time Elapsed: ${gameObj.totalTime} Seconds`;
    }
  }
};

//* Flip back cards that weren't a match.
const flipBackCards = () => {
  document.querySelectorAll(".card:not(.matched)").forEach((card) => {
    card.classList.remove("flipped");
  });
  gameObj.flippedCards = 0;
};

//* Won game button, starts a new game with a clean timer and move counter and a newly generated game board.
wonBtn.addEventListener("click", () => {
  won.style.width = "0%";

  gameObj.flippedCards = 0;
  gameObj.totalFlips = 0;
  gameObj.totalTime = 0;
  time();
  gameBoard.innerHTML = "";
  drawBoard();
});
