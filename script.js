const previousButton = document.querySelector(".bi-chevron-left");

const nextButton = document.querySelector(".bi-chevron-right");

const slidesContainer = document.querySelector(".slides-container");

const body = document.querySelector("body");

let index = 0;

const maxIndex = 2;

previousButton.classList.add("none");
body.style.backgroundColor = "#242830";

const setUi = () => {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
};

const setControls = () => {
    if (index == 0) {
        previousButton.classList.add("none");
        body.style.backgroundColor = "#242830";
    } else {
        previousButton.classList.remove("none");
        if (index == 1) {
            body.style.backgroundColor = "#f5f7f8";
        } else if (index == 2) {
            body.style.backgroundColor = "black";
        }
    }
    if (index == maxIndex) {
        nextButton.classList.add("none");
    } else {
        nextButton.classList.remove("none");
    }
};

previousButton.addEventListener("click", () => {
    if (index > 0) index--;

    setControls();
    setUi();
});

nextButton.addEventListener("click", () => {
    if (index < maxIndex) index++;

    setControls();
    setUi();
});
