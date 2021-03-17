"use strict";

const LOTTERY_TICKET_NUMBERS = 50;
const LOTTERY_TICKET_STARS = 11;
const SELECTION_NUMBERS_LIMIT = 5;
const SELECTION_STARS_LIMIT = 2;

let playButton = document.querySelector(".playButton");
let instructionsButton = document.querySelector(".instructionsButton");
let numbersAndStarsIsLoaded = false;

let numbersDiv = document.querySelector('.numbers');
let numbersSelectedTicket = [];

let starsDiv = document.querySelector('.stars');
let starsSelectedTicket = [];

let goodLuckButton = document.querySelector(".luckyButton");
goodLuckButton.disabled = false;

playButton.addEventListener("click", () => {
  document.querySelector(".play").classList.toggle("toggleButton");

  if (!numbersAndStarsIsLoaded) {
    loadNumbersAndStarsTicket();
  }
});

instructionsButton.addEventListener("click", () => {
  document.querySelector(".instructions").classList.toggle("toggleButton");
});

function loadNumbersAndStarsTicket() {
  for (let numbers = 1; numbers <= LOTTERY_TICKET_NUMBERS; numbers++) {
    numbersDiv.innerHTML += `<label><input type="checkbox" value='${ numbers }' onchange="numbersSelection(this)"><span>${ numbers }</span></label>`;
  }
  for (let stars = 1; stars <= LOTTERY_TICKET_STARS; stars++) {
    starsDiv.innerHTML += `<label><input type="checkbox" value='${ stars }' onchange="starsSelection(this)"><span>${ stars }</span></label>`;
  }

  numbersAndStarsIsLoaded = true;
}

function numbersSelection(thisNumber) {
  if (thisNumber.checked) {
    if (isSelectedAllNumbers(numbersSelectedTicket)) {
      thisNumber.checked = false;
      showWarningMessage("¡Cuidado!", `No puedes elegir más de ${ SELECTION_NUMBERS_LIMIT } números. Para rectificar, haga click en un número ya seleccionado.`)
    }
    else {
      numbersSelectedTicket.push(parseInt(thisNumber.value));
    }
  }
  else {
    let index = numbersSelectedTicket.indexOf(thisNumber.value);
    numbersSelectedTicket.splice(index, 1);
    thisNumber.checked = false;
  }
}

function starsSelection(thisNumber) {
  if (thisNumber.checked) {
    if (isSelectedAllStars(starsSelectedTicket)) {
      thisNumber.checked = false;
      showWarningMessage("¡Cuidado!", `No puedes elegir más de ${ SELECTION_STARS_LIMIT } estrellas. Para rectificar, haga click en una estrella ya seleccionada.`);
    }
    else {
      starsSelectedTicket.push(parseInt(thisNumber.value));
    }
  }
  else {
    let index = starsSelectedTicket.indexOf(thisNumber.value);
    starsSelectedTicket.splice(index, 1);
    thisNumber.checked = false;
  }
}

function showWarningMessage(mytitle, message) {
  Swal.fire({
    title: mytitle,
    text: message,
    icon: "warning"
  });
}

function isSelectedAllNumbers(numbersSelectedTicket) {
  return numbersSelectedTicket.length === SELECTION_NUMBERS_LIMIT;
}

function isSelectedAllStars(starsSelectedTicket) {
  return starsSelectedTicket.length === SELECTION_STARS_LIMIT;
}

goodLuckButton.addEventListener("click", () => {
  if (isSelectedAllNumbers(numbersSelectedTicket) && isSelectedAllStars(starsSelectedTicket)) {
    playEuromillon();
    goodLuckButton.disabled = true;
    document.querySelectorAll(".hitsMessage, .playEuromillon")
      .forEach(element => element.style.display = "block")
  }
  else {
    showWarningMessage("¡Cuidado!", `Tienes que seleccionar obligatoriamente ${ SELECTION_NUMBERS_LIMIT } números y ${ SELECTION_STARS_LIMIT } estrellas.`);
  }
});

function playEuromillon() {
  let myCombinationDiv = document.querySelector(".myCombination");
  let winnerCombinationDiv = document.querySelector(".winnerCombination");
  let getAllSuccessPrizesTableRow = document.querySelectorAll(".prizesTable td:nth-child(2)");

  let myCombination = [];
  let winnerCombination = [];
  let winnersNumbers = [];
  let winnersStars = [];
  let successNumbersQuantity = 0;
  let successStarsQuantity = 0;
  let totalSuccess = "";
  var index = 0;

  getWinnerNumbers(numbersSelectedTicket, winnersNumbers, LOTTERY_TICKET_NUMBERS);
  getWinnerNumbers(starsSelectedTicket, winnersStars, LOTTERY_TICKET_STARS);
  
  function getWinnerNumbers(numbersSelectedArray, winnersArray, maxNumber) {
    do {
      let randomNumber = Math.floor(Math.random() * maxNumber) + 1;
      if (!winnersArray.includes(randomNumber)) {
        winnersArray.push(parseInt(randomNumber));
      }
      else {
        getWinnerNumbers(numbersSelectedArray, winnersArray, maxNumber);
      }
    } while(winnersArray.length < numbersSelectedArray.length); 
  }

  const orderNumbers = (a, b) => a - b;
  numbersSelectedTicket.sort(orderNumbers);
  starsSelectedTicket.sort(orderNumbers);
  winnersNumbers.sort(orderNumbers);
  winnersStars.sort(orderNumbers);

  myCombination = [...numbersSelectedTicket, " + ", ...starsSelectedTicket];
  winnerCombination = [...winnersNumbers, " + ", ...winnersStars];

  winnerCombination.forEach((winnerCombination, i) => {
    winnerCombinationDiv.innerHTML += winnerCombination + " ";
    myCombinationDiv.innerHTML += myCombination[i] + " ";
  });

  successNumbersQuantity = winnersNumbers.filter(number => numbersSelectedTicket.includes(number)).length;
  successStarsQuantity = winnersStars.filter(star => starsSelectedTicket.includes(star)).length;

  showSuccessPrizesTableRow();

  function showSuccessPrizesTableRow() {
    totalSuccess = `${ successNumbersQuantity }+${ successStarsQuantity }`;
    document.querySelector(".hitsMessage").innerHTML = `Has acertado ${ totalSuccess }`;

    for (let i = 0; i < getAllSuccessPrizesTableRow.length; i++) {
      if (getAllSuccessPrizesTableRow[i].dataset.aciertos == totalSuccess) {
        getAllSuccessPrizesTableRow[i].parentElement.classList.add("acierto");
        index = i;
      }
    }
  }

  document.querySelector(".result").style.display = "block";
  document.querySelector(".retry").addEventListener("click", () => resetGame() );

  function resetGame() {
    getAllSuccessPrizesTableRow[index].parentElement.classList.remove("acierto");
    document.querySelectorAll(".result, .hitsMessage, .playEuromillon")
      .forEach(element => element.style.display = "none");

    deselectNumbersAndStars();

    numbersSelectedTicket.length = 0;
    starsSelectedTicket.length = 0;

    myCombination.length = 0;
    winnerCombination.length = 0;
    winnersNumbers.length = 0;
    winnersStars.length = 0;

    successNumbersQuantity = 0;
    successStarsQuantity = 0;
    totalSuccess = "";

    winnerCombinationDiv.innerHTML = "";
    myCombinationDiv.innerHTML = "";

    goodLuckButton.disabled = false;
  }

  function deselectNumbersAndStars() {
    let numbersAndStars = document.querySelectorAll(".stars input, .numbers input");
    numbersAndStars.forEach((currentValue) => currentValue.checked = false);
  }
}