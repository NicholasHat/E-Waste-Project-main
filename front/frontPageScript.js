/*creates listeners for when carousel buttons are pressed*/
const productContainers = [...document.querySelectorAll('.effects-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})

/*creates rotating phrases animation*/
const phrases = ["pollute our water", "kill our animals", "contaminate the land", "poison the air", "damage our health"];
let phraseIndex = 0;
let charIndex = 0;
const description = document.getElementById("description");
function typePhrase() {
    if (charIndex < phrases[phraseIndex].length) {
        description.textContent += phrases[phraseIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typePhrase, 100);
    } else {
        setTimeout(deletePhrase, 2000);
    }
}
function deletePhrase() {
    if (charIndex > 0) {
        description.textContent = description.textContent.slice(0, -1);
        charIndex--;
        setTimeout(deletePhrase, 100);
    } else {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typePhrase, 500);
    }
}
typePhrase();