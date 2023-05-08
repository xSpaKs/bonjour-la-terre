import { getWeather } from "./db.js";

/** @type {HTMLElement} */
const previousButton = document.querySelector(".main-left");

/** @type {HTMLElement} */
const nextButton = document.querySelector(".main-right");

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

/** @type {HTMLElement} */
const weather = document.querySelector(".weather");

/** @type {HTMLElement} */
const temperature = document.querySelector(".temperature");

/** @type {HTMLElement} */
const loading = document.querySelector(".loading");

/** @type {HTMLElement} */
const icon = document.querySelector(".icon");

/** @type {HTMLElement} */
const marck = document.querySelector(".marck");

/** @type {HTMLElement} */
const brest = document.querySelector(".brest");

/** @type {HTMLElement} */
const machu_picchu = document.querySelector(".machu_picchu");

/** @type {HTMLElement} */
const paros = document.querySelector(".paros");

/** @type {HTMLElement} */
const antarctique = document.querySelector(".antarctique");

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

const setInfo = async (lat, lon) => {
    weather.innerHTML = "";
    temperature.innerHTML = "";
    loading.classList.add("active");
    icon.src = "./weather-icons/loader.svg";
    icon.alt = "";

    setTimeout(2000);
    const city = await getWeather(lat, lon);

    weather.innerHTML = city["weather"][0].description;
    weather.innerHTML =
        weather.innerHTML.charAt(0).toUpperCase() + weather.innerHTML.slice(1);
    temperature.innerHTML = `${Math.round(city["main"].temp)} °C`;
    loading.classList.remove("active");
    icon.src = `./weather-icons/${city["weather"][0].icon}.svg`;
    icon.alt = `Icon of ${city.name}'s weather`;
};

setInfo(50.95, 1.95);

marck.addEventListener("click", () => {
    marck.classList.add("active");
    brest.classList.remove("active");
    machu_picchu.classList.remove("active");
    paros.classList.remove("active");
    antarctique.classList.remove("active");

    setInfo(50.95, 1.95);
});

brest.addEventListener("click", () => {
    marck.classList.remove("active");
    brest.classList.add("active");
    machu_picchu.classList.remove("active");
    paros.classList.remove("active");
    antarctique.classList.remove("active");

    setInfo(48.390394, -4.486076);
});

machu_picchu.addEventListener("click", () => {
    marck.classList.remove("active");
    brest.classList.remove("active");
    machu_picchu.classList.add("active");
    paros.classList.remove("active");
    antarctique.classList.remove("active");

    setInfo(-13.163068, -72.545128);
});

paros.addEventListener("click", () => {
    marck.classList.remove("active");
    brest.classList.remove("active");
    machu_picchu.classList.remove("active");
    paros.classList.add("active");
    antarctique.classList.remove("active");

    setInfo(37.085644, 25.148832);
});

antarctique.addEventListener("click", () => {
    marck.classList.remove("active");
    brest.classList.remove("active");
    machu_picchu.classList.remove("active");
    paros.classList.remove("active");
    antarctique.classList.add("active");

    setInfo(-77.85, 166.66667);
});
