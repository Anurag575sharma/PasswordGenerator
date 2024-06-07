// Handle Slider Control and Display Password Length
let lengthDisplay = document.querySelector("[lengthDisplay");

let slider = document.querySelector("input[type=range]");

// Handle color of strength
let indicator = document.querySelector(".indicator");
let image = document.querySelector(".image");

// handle checkBoxes
let checkBoxes = document.querySelectorAll("input[type=checkbox]");

//Handle generate btn
let generateBtn = document.querySelector("#generateBtn");

//handle categories of text
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");

// Copy Message
let copyMessage = document.querySelector("[copyMessage]");
let copyBtn = document.querySelector(".copyBtn");
let passwordDisplay = document.querySelector("input[passwordDisplay]");

//Handling functionality

let password = "";
let passwordLength = 10;
let countChecked = 1;

//Hnadle slider
handleSlider(); // initially set to 10
function handleSlider() {
  slider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}

// set acc to slider value

slider.addEventListener("input", (event) => {
  passwordLength = event.target.value;
  handleSlider();
});

//setting Indicator
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = "0px 0px 15px rgba(255, 165, 0, 0.7)";
}

// Default Indicator
setIndicator("#ccc");

//generate Random Integer

function generateRndInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomInt() {
  return generateRndInt(0, 9);
}
function generateRandomLowercase() {
  return String.fromCharCode(generateRndInt(97, 123));
}
function generateRandomUppercase() {
  return String.fromCharCode(generateRndInt(65, 91)); // 65-90 , 91 passes as exclusive
}

const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
function generateRandomSymbol() {
  let rndIndex = generateRndInt(0, symbol.length);
  return symbol[rndIndex];
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSymbol = false;

  if (uppercase.checked) hasUpper = true;
  if (lowercase.checked) hasLower = true;
  if (numbers.checked) hasNumber = true;
  if (symbols.checked) hasSymbol = true;

  if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNumber || hasSymbol) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

//Copy contentt handler

async function copyContent() {
  copyMessage.style.color = "white";

  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    image.style.display = "none";
    copyMessage.innerText = "Copied!";
    // passwordDisplay.value = "";
  } catch (e) {
    copyMessage.innerText = "Failed to copy ";
  }

  //   copyMessage.classList.add("active");
  setTimeout(() => {
    image.style.display = "block";
    copyMessage.innerText = "";
  }, 2000);
}

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});

// generateBtn.addEventListener("click", () => {
//   passwordDisplay.value = "Hari";
// });

//Handle checkboxes
function handlecheckBox() {
  let countChecked = 0;
  checkBoxes.forEach((checkBox) => {
    if (checkBox.checked) countChecked++;
  });

  if (passwordLength < countChecked) {
    passwordLength = countChecked;
    handleSlider();
  }
}
checkBoxes.forEach((checkBoxe) => {
  checkBoxe.addEventListener("change", handlecheckBox);
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

generateBtn.addEventListener("click", () => {
  // By Default UpperCase Checked
  uppercase.checked = true;
  if (countChecked <= 0) return;

  if (passwordLength < countChecked) {
    passwordLength = countChecked;
    handleSlider();
  }

  //old password removed
  password = "";
  let funcArr = [];
  if (uppercase.checked) {
    funcArr.push(generateRandomUppercase);
  }
  if (lowercase.checked) {
    funcArr.push(generateRandomLowercase);
  }
  if (numbers.checked) {
    funcArr.push(generateRandomInt);
  }
  if (symbols.checked) {
    funcArr.push(generateRandomSymbol);
  }
  //compulsory add'n of checked types
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randInd = generateRndInt(0, funcArr.length);
    password += funcArr[randInd]();
  }
  password = shuffle(Array.from(password));
  passwordDisplay.value = password;
  calcStrength();
});
