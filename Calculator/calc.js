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
let i = 0;
const calc = function (iCalc) {
  switch (allArr.calculationArr[iCalc]) {
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
    case "=":
      calc(i - 1);
      iCalc++;
      /*
      // for smooth operations after '='
      if (allArr.calculationArr[i] == "=") {
        document.getElementById("entry").placeholder = "Enter New Operator";
        
        // allArr.calculationArr[i - 1] += `(${allArr.calculationArr[i]})`;
      }

      //1. do no get new number
      //2. get new operator
      //3. Calculate according to changed operator
      //4. change output after getting new operator
      //5. reset placeholder

      // create function of output
      // create function of error check
      // create function of whatever other 

      */
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
    // Upper limit for number of calcs
    if (i < maxEntries) {
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
      // convert input into float and check if input is correct
      inputValue = parseFloat(inputValue);
      if (isNaN(inputValue) || inputValue >= MaxNumber) {
        console.log("nan");
        document.getElementById("entry").value = "";
        return;
      }

      allArr.calculationArr[i] = allArr.operatorArr[operatorI];
      allArr.entriesArr.push(inputValue);
      console.log(inputValue);
      document.getElementById("entry").value = "";

      // -------------Calculation-----------
      if (i === 0) {
        allArr.resultArr.push(allArr.entriesArr[i]);
      }

      if (i == maxEntries - 1) {
        allArr.calculationArr[i] = "=";
      }

      if (i > 0) {
        calc(i);
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

      i++;
    } else {
      console.log("maxed entries");
    }
  });

  // listen for keyboard event
  document.addEventListener("keyup", (event) => {
    const keyName = event.key;
    if (keyName == allArr.operatorArr[operatorI]) {
      para.click();
    }
  });
}

console.log(allArr.resultArr);
console.log(allArr.entriesArr);

// debug
// comment
// --- link html
// move instruction text to html
// connect text to html

// make a option to go to previous loop
// -(?) i +1 / input disable until new operator
