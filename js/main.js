const LOTTERY_TICKET_NUMBERS = 50;
const LOTTERY_TICKET_STARS = 11;
const SELECTION_NUMBERS_LIMIT = 5;
const SELECTION_STARS_LIMIT = 2;

let playButton = document.querySelector(".jugarButton");
playButton.addEventListener("click", () => {
  document.querySelector(".jugar").classList.toggle("toggleButton");
  loadNumbersAndStarsTicket();
});

let instructionsButton = document.querySelector(".instruccionesButton");
instructionsButton.addEventListener("click", () => {
  document.querySelector(".instrucciones").classList.toggle("toggleButton");
});

function loadNumbersAndStarsTicket() {
  for (let n = 1; n <= LOTTERY_TICKET_NUMBERS; n++) {
    numbersDiv.innerHTML += `<label><input type="checkbox" value='${n}' onchange="numbersSelection(this)"><span>${n}</span></label>`;
  }

  for (let stars = 1; stars <= LOTTERY_TICKET_STARS; stars++) {
    starsDiv.innerHTML += `<label><input type="checkbox" value='${stars}' onchange="starsSelection(this)"><span>${stars}</span></label>`;
  }
}

let numbersDiv = document.querySelector('.numeros');
let numbersSelectedTicket = [];
let number = 0;
let isNumberFilled = false;

let starsSelectedTicket = [];
let starsDiv = document.querySelector('.estrellas');
let starsNumbers = 0;
let isStarsFilled = false;

let elementsSelectedTicketArray = [];
let element = 0;

let goodLuckButton = document.querySelector(".botonSuerte");
goodLuckButton.disabled = false;

function showWarningMessage(mytitle, message) {
  Swal.fire({
    title: mytitle,
    text: message,
    icon: "warning"
  });
}

function numbersSelection(thisNumber) {
  if (thisNumber.checked) {
    if (number === SELECTION_NUMBERS_LIMIT) {
      thisNumber.checked = false;
      number = SELECTION_NUMBERS_LIMIT;
      showWarningMessage("¡Cuidado!", `No puedes elegir más de ${SELECTION_NUMBERS_LIMIT} números. Para rectificar, haga click en un número ya seleccionado.`)
    }
    else {
      numbersSelectedTicket.push(parseInt(thisNumber.value));
      number++;
    }
  }
  else {
    let index = numbersSelectedTicket.indexOf(thisNumber.value);
    numbersSelectedTicket.splice(index, 1);
    thisNumber.checked = false;
    number--;
  }
}

function starsSelection(thisNumber) {
  if (thisNumber.checked) {
    if (starsNumbers === SELECTION_STARS_LIMIT) {
      thisNumber.checked = false;
      starsNumbers = SELECTION_STARS_LIMIT;
      showWarningMessage("¡Cuidado!", `No puedes elegir más de ${SELECTION_STARS_LIMIT} estrellas. Para rectificar, haga click en una estrella ya seleccionada.`);
    }
    else {
      starsSelectedTicket.push(parseInt(thisNumber.value));
      starsNumbers++;
    }
  }
  else {
    let index = starsSelectedTicket.indexOf(thisNumber.value);
    starsSelectedTicket.splice(index, 1);
    thisNumber.checked = false;
    starsNumbers--;
  }
}

const orderNumbers = (a, b) => a - b;

goodLuckButton.addEventListener("click", () => {
  if (number === SELECTION_NUMBERS_LIMIT) {
    isNumberFilled = true;
  }
  if (starsNumbers === SELECTION_STARS_LIMIT) {
    isStarsFilled = true;
  }

  if (isNumberFilled && isStarsFilled) {
    playEuromillon();
    goodLuckButton.disabled = true;
    document.querySelectorAll(".mensajeAciertos, .jugarEuromillon")
      .forEach(element => element.style.display = "block")
  }
  else {
    showWarningMessage("¡Cuidado!", `Tienes que seleccionar obligatoriamente ${SELECTION_NUMBERS_LIMIT} números y ${SELECTION_STARS_LIMIT} estrellas.`);
  }
});

function playEuromillon() {
  let myCombinationDiv = document.querySelector(".miCombinacion");
  let combinationWinnerDiv = document.querySelector(".combinacionGanadora");

  let getAllSuccessPrizesTableRow = document.querySelectorAll(".tablaPremios td:nth-child(2)");

  let myCombination = [];
  let winnerCombination = [];
  let winnersNumbers = [];
  let winnersStars = [];
  let successNumbersQuantity = 0;
  let successStarsQuantity = 0;
  let totalSuccess = "";
  let index = 0;

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

  numbersSelectedTicket.sort(orderNumbers);
  starsSelectedTicket.sort(orderNumbers);
  winnersNumbers.sort(orderNumbers);
  winnersStars.sort(orderNumbers);

  myCombination = [...numbersSelectedTicket, ...starsSelectedTicket];
  winnerCombination = [...winnersNumbers, ...winnersStars];

  myCombination.splice(5, 0, " + ");
  winnerCombination.splice(5, 0, " + ");

  winnerCombination.forEach((winnerCombination, i) => {
    combinationWinnerDiv.innerHTML += winnerCombination + " ";
    myCombinationDiv.innerHTML += myCombination[i] + " ";
  });

  successNumbersQuantity = winnersNumbers.filter(x => numbersSelectedTicket.includes(x)).length;
  successStarsQuantity = winnersStars.filter(x => starsSelectedTicket.includes(x)).length;

  showSuccessPrizesTableRow();

  function showSuccessPrizesTableRow() {
    totalSuccess = `${successNumbersQuantity}+${successStarsQuantity}`;
    document.querySelector(".mensajeAciertos").innerHTML = `Has acertado ${totalSuccess}`;

    for (let i = 0; i < getAllSuccessPrizesTableRow.length; i++) {
      if (getAllSuccessPrizesTableRow[i].dataset.aciertos == totalSuccess) {
        getAllSuccessPrizesTableRow[i].parentElement.classList.add("acierto");
        index = i;
      }
    }
  }

  document.querySelector(".resultado").style.display = "block";
  
  document.querySelector(".reintentar").addEventListener("click", () => resetGame() );

  function deselectNumbersAndStars() {
    let numbersAndStars = document.querySelectorAll(".estrellas input, .numeros input");

    numbersAndStars.forEach((currentValue) => currentValue.checked = false);
  }

  function resetGame() {
    getAllSuccessPrizesTableRow[index].parentElement.classList.remove("acierto");
    document.querySelectorAll(".resultado, .mensajeAciertos, .jugarEuromillon")
      .forEach(element => element.style.display = "none");

    deselectNumbersAndStars();

    numbersSelectedTicket.length = 0;
    number = 0;
    isNumberFilled = false;

    starsSelectedTicket.length = 0;
    starsNumbers = 0;
    isStarsFilled = false;

    myCombination.length = 0;
    winnerCombination.length = 0;
    winnersNumbers.length = 0;
    winnersStars.length = 0;
    getAllSuccessPrizesTableRow.length = 0;

    randomNumber = 0;
    successNumbersQuantity = 0;
    successStarsQuantity = 0;
    totalSuccess = "";

    combinationWinnerDiv.innerHTML = "";
    myCombinationDiv.innerHTML = "";

    goodLuckButton.disabled = false;
  }
}
