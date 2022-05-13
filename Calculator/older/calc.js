"use script";

const allArr = {
  outputDomArr: [".entry", ".calculation", ".result"],
  entriesArr: [],
  calculationArr: [],
  resultArr: [],
  operatorArr: ["+", "-", "*", "/", "="],
};

const maxEntries = 10;
const MaxNumber = 1000000;

let input;
let operator;
let previousText;
let i;

const promptInputText = `Enter The Number To Calculate :\nEnter (done / ok / "") when finished\n`;
const promptOperatorText = `Choose Between \(${allArr.operatorArr}\)`;

const calc = function () {
  switch (operator) {
    case "+":
      allArr.resultArr.push(allArr.resultArr[i - 1] + allArr.entriesArr[i]);
      break;
    case "-":
      allArr.resultArr.push(allArr.resultArr[i - 1] - allArr.entriesArr[i]);
      break;
    case "*":
      allArr.resultArr.push(allArr.resultArr[i - 1] * allArr.entriesArr[i]);
      break;
    case "/":
      allArr.resultArr.push(allArr.resultArr[i - 1] / allArr.entriesArr[i]);
      break;
  }
};

//-------Event listeners , buttons and getting input ----
for (let operatorI = 0; operatorI < allArr.operatorArr.length; operatorI++) {
  //insert operator buttons on html
  const para = document.createElement("button");
  const node = document.createTextNode(allArr.operatorArr[operatorI]);
  para.appendChild(node);
  const element = document.getElementById("operators");
  element.appendChild(para);

  // listen for click events and submit input
  para.addEventListener("click", function () {
    let inputValue = document.getElementById("entry").value;

    // to get negetive numbers etc
    if (
      inputValue.length == 1 &&
      (inputValue[0] == "+" || inputValue[0] == "-")
    ) {
      return;
    }

    // to submit while focusing on input without clicking
    if (inputValue[inputValue.length - 1] == allArr.operatorArr[operatorI]) {
      inputValue = inputValue.slice(0, -1);
    }

    console.log(inputValue);
    document.getElementById("entry").value = "";
    // operator = allArr.operatorArr[operatorI];
  });

  // listen for keydown event
  document.addEventListener("keyup", (event) => {
    const keyName = event.key;
    if (keyName == allArr.operatorArr[operatorI]) {
      para.click();
    }
  });
}

// --------output---------
for (iOutput = 0; iOutput < allArr.outputDomArr.length; iOutput++) {
  // choose array to get data from
  let tempOutput;

  switch (iOutput) {
    case 0:
      tempOutput = allArr.entriesArr;
      break;

    case 1:
      tempOutput = allArr.calculationArr;
      break;

    case 2:
      tempOutput = allArr.resultArr;
      break;
  }

  // create lists and connect data to html
  const outputList = document.querySelector(allArr.outputDomArr[iOutput]);
  const outputPara = document.createElement("li");
  const outputNode = document.createTextNode(tempOutput[i]);
  outputPara.appendChild(outputNode);
  const paraFirstChild = outputList.firstChild;
  outputList.insertBefore(outputPara, paraFirstChild);
}

// -------input and output control for Entries ----
for (i = 0; i < maxEntries; i++) {
  //needed to use via prompt----
  if (i === 0) {
    input = prompt(
      `${promptInputText}Number of Entries: \(${i + 1}/${maxEntries}\)`,
      "0"
    );
  } else {
    input = prompt(
      `${promptInputText}Number of Entries: \(${
        i + 1
      }/${maxEntries}\)\n\nPrevious Entries: ${previousText}`,
      "0"
    );
  }

  if (input == "" || input == "done" || input == "ok" || input == null) {
    break;
  }

  input = parseFloat(input);

  if (isNaN(input) || input >= MaxNumber) {
    alert(`Only Numbers less then  ${MaxNumber} are allowed`);
    i--;
    continue;
  }
  allArr.entriesArr.push(input);

  //-------------Input Control For Operator-----------

  operator = prompt(`${promptOperatorText}`, "+");

  for (let count = 0; operator != allArr.operatorArr[count]; count++) {
    if (count >= allArr.operatorArr.length) {
      operator = prompt(`Wrong Input!!\n${promptOperatorText}`, "+");
      count = -1;
    }
  }

  // -------------Calculation-----------
  if (i > 0) {
    calc();
  }
  //-------------Output-------
  if (i === 0) {
    previousText = `\n${i + 1}:  ${input}`;
    allArr.resultArr.push(input);
  } else {
    const temp = `\n${i + 1}:  ${input}`;
    previousText = `${temp}${previousText}`;
  }
}
console.log(allArr.resultArr);
console.log(allArr.entriesArr);
alert(previousText);

// make a new text that records all the calc
// debug lop for 10 entries and 9 results and calc
// input control
// --- link html
// = operator
// move instruction text to html
// connect text to html

// make a option to go to previous loop
