const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";

// Function to update display
function updateDisplay() {
    display.value = currentInput;
}

// Function to calculate safely
function calculate() {
    try {
        currentInput = Function("return " + currentInput)();
        updateDisplay();
    } catch {
        currentInput = "Error";
        updateDisplay();
    }
}

// Prevent double operators
function isOperator(value) {
    return ["+", "-", "*", "/", "%"].includes(value);
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleInput(button.textContent);
    });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || isOperator(e.key) || e.key === ".") {
        handleInput(e.key);
    }
    if (e.key === "Enter") {
        calculate();
    }
    if (e.key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
    if (e.key === "Escape") {
        currentInput = "";
        updateDisplay();
    }
});

function handleInput(value) {

    if (currentInput === "Error") {
        currentInput = "";
    }

    if (value === "C") {
        currentInput = "";
    }

    else if (value === "DEL") {
        currentInput = currentInput.slice(0, -1);
    }

    else if (value === "=") {
        calculate();
        return;
    }

    else {

        // Prevent starting with operator (except minus)
        if (currentInput === "" && isOperator(value) && value !== "-") {
            return;
        }

        // Prevent double operators
        const lastChar = currentInput.slice(-1);
        if (isOperator(lastChar) && isOperator(value)) {
            currentInput = currentInput.slice(0, -1);
        }

        currentInput += value;
    }

    updateDisplay();
}