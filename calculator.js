let output = "";
let operations = [];
let recall = false;
let zeroing = false;
let answer = "";
let item = "";

function clearing() {
  let p = document.getElementById("output");
  p.innerHTML = "0";
  answer = "";
  output = "";
  operations = [];
  item = "";
  recall = false;
}

function makePrecise() {
  item = String(item.toPrecision(5));
  for(var b = 1; b < item.length; b++) {
    if(item[item.length - b] === "e") {
      break;
    }
  }
  for(let a = item.length - b; item[a - 2] === "0"; a--) {
    item = item.substring(0, a - 2) + item.substring(a - 1);
  }
}

function negation() {
  if(operations[operations.length - 1] !== "x" && operations[operations.length - 1] !== "+" && operations[operations.length - 1] !== "-" && operations[operations.length - 1] !== "/") {
    let p = document.getElementById("output");
    if(Number.isNaN(Number(item)) == false) {
      item = Number(item) * -1;
      let lastChar = output[output.length - 1];
      item = String(item);
      for(let c = output.length; c > 0; c--) {
        if(lastChar === ("+" || "-" || "x" || "/")) {
          break;
        }
         else {
          output = output.slice(0, c - 2);
          lastChar = output[c - 1];
        }
      }
      output = output + item;
      p.innerHTML = output;
    }
  }
}

function digit(num) {
  if(zeroing == true) {
    output = output.slice(0, output.length - 1);
    zeroing = false;
  }
  if(item.length <= 8) {
    let p = document.getElementById("output");
    output = output + String(num);
    item = item + String(num);
    commaDelimit();
    p.innerHTML = output;
  }
  recall = false;
}

function percentage() {
  if(operations[operations.length - 1] !== "x" && operations[operations.length - 1] !== "+" && operations[operations.length - 1] !== "-" && operations[operations.length - 1] !== "/") {
    let p = document.getElementById("output");
    if(Number.isNaN(Number(item)) == false) {
      item = Number(item) * 0.01;
      if(item > 0.000001) {
        item = String(item.toPrecision(5));
        for(let a = item.length; item[a - 2] === "0"; a--) {
          item = item.slice(0, a - 2);
        }
      } else {
        makePrecise();
      }

      output = item;
      p.innerHTML = output;
    }
  }
}

function commaDelimit() {
  for(var r = 0; r < output.length; r++) {
    if(output[r] === ",") {
      output = output.substring(0, r) + output.substring(r + 1);
      r--;
    } else if(output[r] === ".") {
      break;
    }
  }

  for(let s = r - 3; s > 0; s = s -3) {
    output = output.substring(0, s) + "," + output.substring(s);
  }
}

function decimal() {
  if(item.length <= 8 && output.indexOf(".") == -1) {
    let p = document.getElementById("output");
    if(item === "" && output === "") {
      output = output + "0";
      item = item + "0";
    }
    output = output + ".0";
    item = item + ".";
    zeroing = true;
    p.innerHTML = output;
  }
  recall = false;
}

function chooseOperator(operator) {
  if((operations[operations.length - 1] === "+" || operations[operations.length - 1] === "x" || operations[operations.length - 1] === "-" || operations[operations.length - 1] === "/") && item === "") {
    operations.splice(operations.length - 1, 1);
  } else if(recall == true) {
    operations.push(answer);
  } else {
    operations.push(item);
  }

  if(operator.id === "operator-add") {
    operations.push("+");
  } else if (operator.id === "operator-subtract") {
    operations.push("-");
  } else if (operator.id === "operator-multiply") {
    operations.push("x");
  } else if (operator.id === "operator-divide") {
    operations.push("/");
  }
  item = "";
  output = "";
  recall = false;
}

function equals() {
  operations.push(item);
  let p = document.getElementById("output");
  if(operations[operations.length - 1] === "") {
    p.innerHTML = "Error";
  } else {
    for(let z = 0; z <= operations.length; z++) {
      if(operations[z] === "x") {
        operations.splice(z - 1, 0, Number(operations[z - 1]) * Number(operations[z + 1]));
        operations.splice(z, 3);
        z--;
      } else if(operations[z] === "/") {
        operations.splice(z - 1, 0, Number(operations[z - 1]) / Number(operations[z + 1]));
        operations.splice(z, 3);
        z--;
      }
    }
    for(let a = 0; a <= operations.length; a++) {
      if(operations[a] === "+") {
        operations.splice(a - 1, 0, Number(operations[a - 1]) + Number(operations[a + 1]));
        operations.splice(a, 3);
        a--;
      } else if(operations[a] === "-") {
        operations.splice(a - 1, 0, Number(operations[a - 1]) - Number(operations[a + 1]));
        operations.splice(a, 3);
        a--;
      }
    }
    item = operations[0];
    if(Number.isNaN(item) == true || item === Infinity) {
      p.innerHTML = "Error";
    } else {
      answer = item;
      if(answer >= 1000000000) {
        let coefficient = 0;
        for(var degree = 9; coefficient < 1 || coefficient >= 10; degree++) {
          coefficient = answer / 10**degree;
        }
        output = String(coefficient.toFixed(5)) + "e" + String(degree);
        makePrecise();
        output = String(item);
      } else if(answer <= 0.000001) {
        item = Number(item);
        makePrecise();
        output = String(item);
      } else {
        item = Number(item);
        output = String(item.toPrecision(9));
        for(let a = output.length - 1; output[a - 2] === "0"; a--) {
          output = output.slice(0, a - 2);
        }
        commaDelimit();
      }
      p.innerHTML = output;
    }
  }
  operations = [];
  item = "";
  output = "";
  recall = true;
}
