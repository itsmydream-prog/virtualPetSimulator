let hunger = 50;
let happiness = 50;
let energy = 50;

const hungerBar = document.getElementById("hunger");
const happinessBar = document.getElementById("happiness");
const energyBar = document.getElementById("energy");
const petImage = document.getElementById("pet");
const petTypeSelect = document.getElementById("petType");

const feedSound = new Audio("sounds/feed.mp3");
const playSound = new Audio("sounds/play.mp3");
const sleepSound = new Audio("sounds/sleep.mp3");

function updateBars() {
  hungerBar.value = hunger;
  happinessBar.value = happiness;
  energyBar.value = energy;

  const type = petTypeSelect.value;

  if (hunger > 70) {
    petImage.src = `images/${type}_hungry.jpg`;
  } else if (happiness < 30) {
    petImage.src = `images/${type}_sad.jpg`;
  } else if (energy < 30) {
    petImage.src = `images/${type}_tired.jpg`;
  } else {
    petImage.src = `images/${type}_happy.jpg`;
  }

  savePetState();
}

function feedPet() {
  feedSound.play();
  hunger = Math.max(hunger - 20, 0);
  happiness = Math.min(happiness + 5, 100);
  updateBars();
}

function playWithPet() {
  playSound.play();
  happiness = Math.min(happiness + 20, 100);
  energy = Math.max(energy - 15, 0);
  hunger = Math.min(hunger + 10, 100);
  updateBars();
}

function putToSleep() {
  sleepSound.play();
  energy = Math.min(energy + 30, 100);
  hunger = Math.min(hunger + 10, 100);
  updateBars();
}

function decreaseAttributesOverTime() {
  hunger = Math.min(hunger + 1, 100);
  happiness = Math.max(happiness - 1, 0);
  energy = Math.max(energy - 1, 0);
  updateBars();
}

function changePetType() {
  updateBars();
}

function savePetState() {
  const state = {
    hunger,
    happiness,
    energy,
    type: petTypeSelect.value
  };
  localStorage.setItem("petState", JSON.stringify(state));
}

window.onload = function () {
  const savedState = JSON.parse(localStorage.getItem("petState"));
  if (savedState) {
    hunger = savedState.hunger;
    happiness = savedState.happiness;
    energy = savedState.energy;
    petTypeSelect.value = savedState.type;
  }
  updateBars();
};

setInterval(decreaseAttributesOverTime, 3000);
