let equation = document.getElementById("equation"),
    result = document.getElementById("result"),
    num = document.querySelectorAll(".num"),
    inputNum = "",
    subTotal = 0,
    span = document.createElement("span"),
    cancel = document.getElementById('cancel'),
    equal = document.getElementById('equal'),
    opDisplay = "",
    equalBtnPreviouslyClicked = true,
    multiply = (a, b) => a * b,
    addition = (a, b) => a + b,
    subtraction = (a, b) => a - b,
    division = (a, b) => a / b;


num.forEach(num => {
    num.addEventListener("click", function () {
        inputNum += num.textContent;
        opDisplay += num.textContent;
        //result.appendChild(span).textContent = inputNum;
        equation.textContent = opDisplay;
        console.log(inputNum);
    })
});

let previousOp = null;
//Calculs 
let ops = document.getElementsByClassName("op");
for (let op of ops) {
    op.onclick = function () {

        // Initialisation du sous total pour la première fois où on cliquerai sur un bouton d'opération
        if (previousOp === null) {
            subTotal = parseFloat(inputNum);
        }

        // Vérification si le bouton = a été cliqué avant
        // Si oui, on ne lance aucun calcul
        // Si non, cela signifie qu'on a démandé une opération du type "1 + 1 + 1" et dans ce cas, on lance le calcul intermédiaire pour le "1 + 1"
        if (!equalBtnPreviouslyClicked) {
            subTotal = previousOp(parseFloat(subTotal), parseFloat(inputNum) );
            result.appendChild(span).textContent = subTotal;
        }
        // On positionne la vérification du bouton egal à false pour pouvoir rentrer dans le cas de test ci-dessus
        equalBtnPreviouslyClicked = false;

        // Reinitialisation de la variable de saisie de nombre
        inputNum = "";
        
        // Affichage de l'opération
        opDisplay += " " + this.textContent + " ";
        equation.textContent = opDisplay;

        // Sauvegarde de l'opération demandée
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
    console.log(inputNum);
    if (Number.isNaN(parseFloat(subTotal)) || Number.isNaN(parseFloat(inputNum))) {
        return;
    }

    if (previousOp !== null) {
        subTotal = previousOp(parseFloat(subTotal), parseFloat(inputNum));
    }

    inputNum = "";
    result.appendChild(span).textContent = subTotal;
    equalBtnPreviouslyClicked = true;
}

cancel.onclick = function () {
    inputNum = "";
    opDisplay = "";
    subTotal = null;
    result.appendChild(span).textContent = 0;
    equation.innerHTML = "&nbsp;";
    previousOp = null;
}