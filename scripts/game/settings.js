import { settingsElements } from "./load_dom_elements.js";

const { container, moveCounter, timer } = settingsElements;

export function changeTheme(e) {
  const cardFront = document.querySelectorAll(".card-front");
  if (e.target.textContent === "Dark Mode") {
    for (let i = 0; i < cardFront.length; i++) {
      cardFront[i].classList.add("card-front__dark");
    }
    container.classList.add("game-container__dark");
    // change it from classes to data-mode attribute
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
}
