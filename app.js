const { exit } = require("process");
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);
var stack = [];
let defaultPrompt = ">>> Enter Calculation (RPN Format):" ;

rl.setPrompt(defaultPrompt);

rl.on("line", (input) => {
  if (input === 'q') {
    exit();
  }
  if (input === 'c') {
    stack = [];
    console.log('*** Calculations Cleared ***')
    promptUser();
  } else {
    const validInput = validateInput(input);
    if (validInput) {
      reversePolish(input.trim())
    } else {
      promptUser();
    }
  }

});

const validateInput = (input) => {
  if (isNaN(input) && input.length == 1 && stack.length < 2) {
    console.log("*** ERROR Not a valid Character ***");
    return false
  }
  if (!input || input == '') {
    console.log("*** ERROR Must provied a valid input ***");
    return false
  }

  else {
    return true
  }
}

const calculate = (expression, callback) => {
    expression.forEach((x) => {
        if (!isNaN(x) && isFinite(x)) {
          stack.push(x);
        } else {
          let a = stack.pop();
          let b = stack.pop();
          switch (x) {
              case "+":
                stack.push(parseInt(a) + parseInt(b));
                break;
            case "-":
                stack.push(parseInt(b) - parseInt(a));
                break;
            case "*":
                stack.push(parseInt(a) * parseInt(b));
                break;
            case "/":
                stack.push(parseInt(b) / parseInt(a));
                break;
            case "^":
                stack.push(Math.pow(parseInt(b), parseInt(a)));
                break;
            default: 
              console.log('*** ERROR invalid operator provided, Calculation Cleared ***')
              stack = []
          }
        }
      });
      displayResult(stack)
  callback();
};

const displayResult = (result) => {
    console.log("Result: ", result.length > 1 ?  result : parseInt(result[0])) 
}

const promptUser = (prompt) => {
  if (prompt) {
    rl.setPrompt(prompt);
  } else {
    rl.setPrompt(defaultPrompt);
  }
  rl.prompt();
};

const reversePolish = (input) => {
    var expression = input.split(" ");
    calculate(expression, promptUser);
};
console.log(">>> REVERSE POLISH CALCULATOR")
console.log(">>> Enter 'c' to reset");
promptUser();
