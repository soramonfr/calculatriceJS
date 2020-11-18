let equation = document.getElementById("equation"),
    result = document.getElementById("result"),
    num = document.querySelectorAll(".num"),
    firstNumber = "",
    secondNumber = null,
    span = document.createElement("span"),
    cancel = document.getElementById('cancel'),
    equal = document.getElementById('equal'),
    opDisplay = "",
    multiply = (a, b) => a * b,
    addition = (a, b) => a + b,
    subtraction = (a, b) => b - a,
    division = (a, b) => b / a;


num.forEach(num => {
    num.addEventListener("click", function () {
        firstNumber += num.textContent;
        opDisplay += num.textContent;
        result.appendChild(span).textContent = firstNumber;
        equation.textContent = opDisplay;
        console.log(firstNumber);
    })
});

let previousOp = null;
//Calculs 
let ops = document.getElementsByClassName("op");
for (let op of ops) {
    op.onclick = function () {
        if ((this.textContent === '-' || this.textContent === '+') && secondNumber === null) {
            secondNumber = 0;
        } else if ((this.textContent === '×' || this.textContent === '÷') && secondNumber === null) {
            secondNumber = 1;
        }
        if (previousOp !== null) {
            secondNumber = previousOp(parseFloat(firstNumber), parseFloat(secondNumber));
        } else {
            secondNumber = firstNumber;
        }
        firstNumber = "";
        opDisplay += " " + this.textContent + " ";
        equation.textContent = opDisplay;
        switch (this.textContent) {
            case "+":
                previousOp = addition;
                break;
            case "-":
                previousOp = subtraction;
                break;
            case "×":
                previousOp = multiply;
                break;
            case "÷":
                previousOp = division;
                break;
            default:
                break;
        }

    };
}

equal.onclick = function () {
    if (previousOp !== null) {
        secondNumber = previousOp(parseFloat(firstNumber), parseFloat(secondNumber));
    }
    result.appendChild(span).textContent = secondNumber;
}

cancel.onclick = function () {
    firstNumber = "";
    secondNumber = null;
    result.appendChild(span).textContent = 0;
    opDisplay = "";
    equation.textContent = opDisplay;
}