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

/** @type {HTMLElement} */
const puce1 = document.querySelector(".puce1");

/** @type {HTMLElement} */
const puce2 = document.querySelector(".puce2");

/** @type {HTMLElement} */
const puce3 = document.querySelector(".puce3");

let index = 0;
const maxIndex = 2;

puce1.classList.add("active");

const setUi = () => {
    if (index == 0) {
        puce1.classList.add("active");
        puce2.classList.remove("active");
        puce3.classList.remove("active");
    }

    if (index == 1) {
        puce1.classList.remove("active");
        puce2.classList.add("active");
        puce3.classList.remove("active");
    }

    if (index == 2) {
        puce1.classList.remove("active");
        puce2.classList.remove("active");
        puce3.classList.add("active");
    }

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

const touchData = {
    carouselWidth: slidesContainer.offsetWidth, // Largeur du carrousel

    startTouchX: 0, // Position du doigt sur l’axe horizontal quand il commence à toucher l’écran

    lastDeltaX: 0, // Dernier mouvement connu du doigt sur l’axe horizontal
};

slidesContainer.addEventListener("touchstart", (e) => {
    // Mémoriser la position de départ du doigt sur l’axe horizontal

    touchData.startTouchX = e.touches[0].screenX;

    // Mémoriser la largeur du carrousel

    touchData.carouselWidth = slidesContainer.offsetWidth;

    // Désactiver la transition CSS des diapositives du carrousel

    slidesContainer.style.transition = "none";
});

slidesContainer.addEventListener("touchmove", (e) => {
    const deltaX = e.touches[0].screenX - touchData.startTouchX;

    if ((index === 0 && deltaX > 0) || (index === maxIndex && deltaX < 0))
        return;

    touchData.lastDeltaX = deltaX;

    const basePercentTranslate = index * -100;

    const percentTranslate =
        basePercentTranslate + (100 * deltaX) / touchData.carouselWidth;

    slidesContainer.style.transform = `translate(${percentTranslate}%)`;
});

slidesContainer.addEventListener("touchend", (e) => {
    if (Math.abs(touchData.lastDeltaX / touchData.carouselWidth) > 0.1) {
        if (index !== 0 && touchData.lastDeltaX > 0) index--;

        if (index !== maxIndex && touchData.lastDeltaX < 0) index++;
    }

    // Annuler le style injecté précédement par le JS

    slidesContainer.style.transition = "";

    // Afficher la bonne diapositive en fonction de l’index

    setUi();
});

puce1.addEventListener("click", () => {
    index = 0;
    setUi();
});

puce2.addEventListener("click", () => {
    index = 1;
    setUi();
});

puce3.addEventListener("click", () => {
    index = 2;
    setUi();
});
