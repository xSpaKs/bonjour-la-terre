/** @type {HTMLElement} */
const previousButton = document.querySelector(".bi-chevron-left");

/** @type {HTMLElement} */
const nextButton = document.querySelector(".bi-chevron-right");

/** @type {HTMLElement} */
const slidesContainer = document.querySelector(".slides-container");

/** @type {HTMLElement} */
const body = document.querySelector("body");

/** @type {NodeListOf<HTMLElement>} */
const sections = document.querySelectorAll("section");

let index = 0;
const maxIndex = 2;

const setUi = () => {
    if (index === 0) previousButton.style.display = "none";
    else previousButton.style.display = "grid";

    if (index === maxIndex) nextButton.style.display = "none";
    else nextButton.style.display = "grid";

    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    const { backgroundColor } = getComputedStyle(sections[index]);
    body.style.backgroundColor = backgroundColor;
};
setUi();

previousButton.addEventListener("click", () => {
    if (index > 0) index--;
    setUi();
});
nextButton.addEventListener("click", () => {
    if (index < maxIndex) index++;
    setUi();
});
