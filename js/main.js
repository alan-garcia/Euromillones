/*! Alan García Navarro */

const LOTTERY_TICKET_NUMBERS = 50;
const LOTTERY_TICKET_STARS = 11;
const SELECTION_NUMBERS_LIMIT = 5;
const SELECTION_STARS_LIMIT = 2;

let playButton = document.querySelector(".jugarButton");
playButton.addEventListener("click", function () {
  document.querySelector(".jugar").classList.toggle("toggleButton");
});

let instructionsButton = document.querySelector(".instruccionesButton");
instructionsButton.addEventListener("click", function () {
  document.querySelector(".instrucciones").classList.toggle("toggleButton");
});

let numbersDiv = document.querySelector('.numeros');
let numbersCheckboxesCheckedArray = [];
let number = 0;
let isNumberFilled = false;

let starsCheckboxesCheckedArray = [];
let starsDiv = document.querySelector('.estrellas');
let starsNumbers = 0;
let isStarsFilled = false;

// Inserta 50 checkboxes con los números
for (let n = 1; n <= LOTTERY_TICKET_NUMBERS; n++) {
  numbersDiv.innerHTML += `<label><input type="checkbox" value='${n}' onchange="numbersSelection(this)"><span>${n}</span></label>`;
}

// Inserta 11 checkboxes con las estrellas
for (let stars = 1; stars <= LOTTERY_TICKET_STARS; stars++) {
  starsDiv.innerHTML += `<label><input type="checkbox" value='${stars}' onchange="starsSelection(this)"><span>${stars}</span></label>`;
}

function showSweetAlertWarningMessage(message) {
  Swal.fire({
    title: "¡Cuidado!",
    text: message,
    icon: "warning"
  });
}

// Función para limitar la selección a 5 números, ni 1 más ni 1 menos
function numbersSelection(thisNumber) {
  if (thisNumber.checked) {
    if (number === SELECTION_NUMBERS_LIMIT) {
      thisNumber.checked = false;
      number = SELECTION_NUMBERS_LIMIT;
      showSweetAlertWarningMessage(`No puedes elegir más de ${SELECTION_NUMBERS_LIMIT} números. Para rectificar, haga click en un número ya seleccionado.`)
    }

    else {
      numbersCheckboxesCheckedArray.push(thisNumber.value);
      number++;
    }
  }
  else {
    let index = numbersCheckboxesCheckedArray.indexOf(thisNumber.value);

    numbersCheckboxesCheckedArray.splice(index, 1);

    thisNumber.checked = false;
    number--;
  }
}

function starsSelection(thisNumber) {
  if (thisNumber.checked) {
    if (starsNumbers === SELECTION_STARS_LIMIT) {
      thisNumber.checked = false;
      starsNumbers = SELECTION_STARS_LIMIT;
      showSweetAlertWarningMessage(`No puedes elegir más de ${SELECTION_STARS_LIMIT} estrellas. Para rectificar, haga click en una estrella ya seleccionada.`);
    }
    else {
      starsCheckboxesCheckedArray.push(thisNumber.value);
      starsNumbers++;
    }
  }
  else {
    let index = starsCheckboxesCheckedArray.indexOf(thisNumber.value);
    starsCheckboxesCheckedArray.splice(index, 1);
    thisNumber.checked = false;
    starsNumbers--;
  }
}

// Ordena los números de menor a mayor
function orderNumbers(a, b) {
  return a - b;
}

let luckyButton = document.querySelector(".botonSuerte");
luckyButton.disabled = false;

// Cuando se pulse en el botón "¡SUERTE!"
luckyButton.addEventListener("click", function () {
  if (number === SELECTION_NUMBERS_LIMIT) {
    numbersCheckboxesCheckedArray.sort(orderNumbers);
    isNumberFilled = true;
  }

  if (starsNumbers === SELECTION_STARS_LIMIT) {
    starsCheckboxesCheckedArray.sort(orderNumbers);
    isStarsFilled = true;
  }

  // Comprobamos que se han rellenado los 5 números y las 2 estrellas para comenzar a jugar
  if (isNumberFilled && isStarsFilled) {
    playEuromillon();
    luckyButton.disabled = true;
    document.querySelector(".mensajeAciertos").style.display = "block";
    document.querySelector(".jugarEuromillon").style.display = "block";
  }
  else {
    showSweetAlertWarningMessage(`Tienes que seleccionar obligatoriamente ${SELECTION_NUMBERS_LIMIT} números y ${SELECTION_STARS_LIMIT} estrellas.`);
  }
});

function playEuromillon() {
  let myCombinationDiv = document.querySelector(".miCombinacion");
  let combinationWinnerDiv = document.querySelector(".combinacionGanadora");

  // Accede a la segunda celda de todas las filas de la tabla
  let allPrizesTable = document.querySelectorAll(".tablaPremios td:nth-child(2)");

  let myCombinationArray = [];
  let combinationWinnerArray = [];
  let winnersNumbersArray = [];
  let winnersStarsArray = [];
  let randomNumber = 0;
  let successNumbersQuantity = 0;
  let successStarsQuantity = 0;
  let totalSuccess = "";
  let index = 0;

  numbersCheckboxesCheckedArray.forEach(function () {
    // Genera números aleatorios entre 1 y 50 y los metemos en el array
    randomNumber = Math.floor(Math.random() * 50) + 1;
    winnersNumbersArray.push(parseInt(randomNumber));
  });

  starsCheckboxesCheckedArray.forEach(function () {
    // Genera estrellas aleatorias entre 1 y 11 y los metemos en el array
    randomNumber = Math.floor(Math.random() * 11) + 1;
    winnersStarsArray.push(parseInt(randomNumber));
  });

  // Ordenamos de menor a mayor los números y las estrellas aleatorias ganadoras
  winnersNumbersArray.sort(orderNumbers);
  winnersStarsArray.sort(orderNumbers);

  // Combinamos los números y las estrellas en un mismo array
  myCombinationArray = numbersCheckboxesCheckedArray.concat(starsCheckboxesCheckedArray);
  combinationWinnerArray = winnersNumbersArray.concat(winnersStarsArray);

  // Genera un nuevo número aleatorio en caso de duplicidad de números en el array
  regenerateNumbersRandom();

  // Después del 5º número, añade el caracter "+" para saber que los 2 últimos números son estrellas
  myCombinationArray.splice(5, 0, " + ");
  combinationWinnerArray.splice(5, 0, " + ");

  // Muestra tanto tus números como los generados aleatoriamente
  combinationWinnerArray.forEach(function (winnerCombination, i) {
    combinationWinnerDiv.innerHTML += winnerCombination + " ";
    myCombinationDiv.innerHTML += myCombinationArray[i] + " ";
  });

  // Averigua el número de aciertos de los números
  winnersNumbersArray.forEach(function (winnersNumbers, i) {
    numbersCheckboxesCheckedArray.forEach(function (numbersSelected, j) {
      if (winnersNumbers == numbersSelected) {
        successNumbersQuantity++;
      }
    });
  });

  // Averigua el número de estrellas acertadas
  winnersStarsArray.forEach(function (winnersStars, i) {
    starsCheckboxesCheckedArray.forEach(function (starsSelected, j) {
      if (winnersStars == starsSelected) {
        successStarsQuantity++;
      }
    });
  });

  // Muestra el número de aciertos
  totalSuccess = `${successNumbersQuantity}+${successStarsQuantity}`;
  document.querySelector(".mensajeAciertos").innerHTML = `Has acertado ${totalSuccess}`;

  for (let i = 0; i < allPrizesTable.length; i++) {
    // Si el valor del atributo "data-aciertos" es igual a los aciertos...
    if (allPrizesTable[i].dataset.aciertos == totalSuccess) {
      // A esa fila se le añade la clase ".acierto" y se iluminará de verde
      allPrizesTable[i].parentElement.classList.add("acierto");
      index = i;
    }
  }

  // Cuando se pulse en el botón reintentar, todos los valores se reinician
  document.querySelector(".reintentar").addEventListener("click", function () {
    allPrizesTable[index].parentElement.classList.remove("acierto");
    reset();
  });

  function reset() {
    deselectNumbersAndStars();

    numbersCheckboxesCheckedArray.length = 0;
    number = 0;
    isNumberFilled = false;

    starsCheckboxesCheckedArray.length = 0;
    starsNumbers = 0;
    isStarsFilled = false;

    myCombinationArray.length = 0;
    combinationWinnerArray.length = 0;
    winnersNumbersArray.length = 0;
    winnersStarsArray.length = 0;
    allPrizesTable.length = 0;

    randomNumber = 0;
    successNumbersQuantity = 0;
    successStarsQuantity = 0;
    totalSuccess = "";

    combinationWinnerDiv.innerHTML = "";
    myCombinationDiv.innerHTML = "";

    luckyButton.disabled = false;
    document.querySelector(".mensajeAciertos").style.display = "none";
    document.querySelector(".jugarEuromillon").style.display = "none";
  }

  // Genera un nuevo número aleatorio en caso de duplicidad de números en el array
  function regenerateNumbersRandom() {
    for (let i = 0; i < winnersNumbersArray.length; i++) {
      if (winnersNumbersArray[i] == winnersNumbersArray[i + 1]) {
        numerosAleatoriosGanador = Math.floor(Math.random() * LOTTERY_TICKET_NUMBERS) + 1;
        winnersNumbersArray.splice(i, 1, numerosAleatoriosGanador);
      }
    }

    for (let j = 0; j < winnersStarsArray.length; j++) {
      if (winnersStarsArray[j] == winnersStarsArray[j + 1]) {
        estrellasAleatoriasGanador = Math.floor(Math.random() * LOTTERY_TICKET_STARS) + 1;
        winnersStarsArray.splice(j, 1, estrellasAleatoriasGanador);
      }
    }
  }

  function deselectNumbersAndStars() {
    $(".estrellas input, .numeros input").each(function () {
      this.checked = false;
    });
  }
}
