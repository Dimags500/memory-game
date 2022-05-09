import { gameObj } from "../constants/script.constants.js";
import { boardElements } from "./load_dom_elements.js";

const { moveCounterEnd, timerEnd, won } = boardElements;

//* Flips the card and check for a match between last 2 flipped cards. If there are no more cards to be flipped, ends the game.
const flipCard = (card) => {
  gameObj.flippedCards++;
  if (gameObj.flippedCards <= 2) {
    gameObj.totalFlips++;
    card.classList.add("flipped");
  }

  if (gameObj.flippedCards === 2) {
    const flippedCards = document.querySelectorAll(".flipped:not(.matched)");
    const firstCardClass = flippedCards[0].childNodes[1].classList[1];
    const secondCardClass = flippedCards[1].childNodes[1].classList[1];
    if (firstCardClass === secondCardClass) {
      flippedCards[0].classList.add("matched");
      flippedCards[1].classList.add("matched");
    }

    // please change it to data-country attribute
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

export function handleCardEvent(e) {
  const eventTarget = e.target;
  const eventParent = eventTarget.parentElement;
  if (
    eventTarget.className.includes("card") &&
    !eventParent.className.includes("flipped")
  ) {
    flipCard(eventParent);
  }
}
