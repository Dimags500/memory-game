function loadScripts() {
  const game = document.createElement("script");
  game.src = "./scripts/game/index.js";
  game.type = "module";
  document.body.appendChild(game);
}

window.onload = loadScripts;
//* Theme button - changes the theme from light mode to dark mode and back.

//* Landing page button - starts the game (drawing the cards board according to the desired difficulty) and sets the timer and move counter.

//* Sets the interval for the move counter and timer to update every second.

//* Returns random int from min to max-1.

//* Returns new array with the same values as the original array but in a random order.

//* Draws the game board and creates the div elements of the cards.

//* Event listener for each card in the board.

//* Won game button, starts a new game with a clean timer and move counter and a newly generated game board.
