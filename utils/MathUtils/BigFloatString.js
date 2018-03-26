var BigFloatString = (function(float){
  function validateInput(number){
    number = number.toString().replace("-", (-1).toString()[0]);
    if(isNaN(parseFloat(number))){
      throw "The number " + number + " is not a valid number string. If the number is presented in scientific notation, it will be necessary to refactor the code to create the BigFloatString earlier and perform transforms.";
    }

    if(number.indexOf(".") == -1)
      number += ".0";

    return number;
  }

  number = validateInput(float);
  var dollars = number.split(".")[0];
  var cents = number.split(".")[1];

  function isLarger(newNumber, oldNumber){
    var newNumberDollars = newNumber.split(".")[0];
    var oldNumberDollars = (oldNumber ? oldNumber.split(".")[0] : dollars);

    if(newNumberDollars.length > oldNumberDollars.length){
      return true;
    }
    else if(oldNumberDollars.length > newNumberDollars.length){
      return false;
    }
    else {
      for(var i=0;i<oldNumberDollars.length;i++){
        if(oldNumberDollars[i] != newNumberDollars[i]){
          return parseInt(oldNumberDollars[i]) < parseInt(newNumberDollars[i]);
        }
      }

      var newNumberCents = newNumber.split(".")[1] || "0";
      var oldNumberCents = (oldNumber ? oldNumber.split(".")[1] || "0" : cents);

      var j;
      for(j=0;j<oldNumberCents.length && j<newNumberCents.length;j++){
        if(oldNumberCents[j] != newNumberCents[j]){
          return parseInt(oldNumberCents[j]) < parseInt(oldNumberDollars[j]);
        }
      }

      return newNumberCents.length > j;
    }
  }

  function doOperation(newDollars, newCents, opReduce){
    var centsRemaining = "";

    if(newCents.length > cents.length){
      centsRemaining = newCents.substring(cents.length);
      newCents = newCents.substring(0, cents.length);
    }
    else if(cents.length > newCents.length){
      centsRemaining = cents.substring(newCents.length);
      cents = cents.substring(0, newCents.length);
    }

    var fromFloat, fromNew;
    var centsArray = cents.split(""),
        fromNewCents = newCents.split(""),
        remaining = 0;

    var newCentsArray = [];
    var remainderIsNegative = false;

    while((fromNew = fromNewCents.pop()) != undefined){
      fromFloat = centsArray.pop();

      if(parseInt(remaining) != 0){
        if(remainderIsNegative)
          remaining = parseInt(remaining) * -1;

        var newFrom = [parseInt(fromFloat), parseInt(remaining)].reduce(MathUtils.reducers.sumReduce);
        fromFloat = newFrom;
      }

      var result = [parseInt(fromFloat), parseInt(fromNew)].reduce(opReduce);
      remainderIsNegative = (result < 0);

      if(remainderIsNegative && opReduce == MathUtils.reducers.subtractReduce){
        remaining = 0;
        while(result < 0){
          result += 10;
          remaining+=1;
        }

        newCentsArray.splice(0,0,result.toString());
      }
      else {
        var resultDigits = Math.abs(result).toString().split("");
        newCentsArray.splice(0,0,resultDigits.pop());
        remaining = resultDigits.join("") || 0;
      }
    }

    cents = newCentsArray.join("") + centsRemaining;

    var dollarsArray = dollars.split(""),
        fromNewDollars = newDollars.split("");

    var newDollarsArray = [];

    while((fromNew = fromNewDollars.pop()) != undefined){
      fromFloat = dollarsArray.pop() || "0";

      if(parseInt(remaining) != 0){
        if(remainderIsNegative)
          remaining = parseInt(remaining) * -1;

        var newFrom = [parseInt(fromFloat), parseInt(remaining)].reduce(MathUtils.reducers.sumReduce);
        fromFloat = newFrom;
      }

      var result = [parseInt(fromFloat), parseInt(fromNew)].reduce(opReduce);
      remainderIsNegative = (result < 0);

      if(remainderIsNegative && opReduce == MathUtils.reducers.subtractReduce){
        remaining = 0;
        while(result < 0){
          result += 10;
          remaining += 1;
        }

        newDollarsArray.splice(0,0,result.toString());
      }
      else {
        var resultDigits = Math.abs(result).toString().split("");
        newDollarsArray.splice(0,0,resultDigits.pop());
        remaining = resultDigits.join("") || 0;
      }
    }

    var remainingDigits;
    if(remaining != 0 && dollarsArray.length > 0){
      var fromFloat = dollarsArray.join("");
      var result = [parseInt(fromFloat), parseInt(remaining)].reduce(opReduce);
      remainderIsNegative = (result < 0);
      remainingDigits = Math.abs(result).toString().split("");
    }
    else if(remaining != 0){
      remainingDigits = remaining.toString().split("");
    }
    else if(dollarsArray.length > 0){
      remainingDigits = dollarsArray;
    }

    if(remainingDigits){
      var digit;

      while((digit = remainingDigits.pop()) != undefined){
        newDollarsArray.splice(0,0,digit);
      }
    }

    dollars = newDollarsArray.join("");
    while(dollars[0] == "0"){
      dollars = dollars.substring(1);
    }
    if(dollars.length == 0)
      dollars = "0";

    if(remainderIsNegative)
      dollars = (-1).toString()[0] + dollars;
  }

  function add(toAdd){
    toAdd = validateInput(toAdd);
    if(parseFloat(toAdd) < 0){
      subtract(toAdd.substring(1));
    }
    else {
      var toAddDollars = toAdd.split(".")[0];
      var toAddCents = toAdd.split(".")[1];

      doOperation(toAddDollars, toAddCents, MathUtils.reducers.sumReduce);
    }
  }

  function subtract(toSubtract){
    toSubtract = validateInput(toSubtract);
    var setNegative = false;

    var signsMatch = ((parseFloat(toSubtract) < 0) == (parseInt(dollars) < 0));
    if(!signsMatch){
      add(toSubtract.substring(1));

      if(parseInt(dollars) < 0)
        dollars = (-1).toString()[0] + dollars;
    }
    else {
      var toSubtractDollars = toSubtract.split(".")[0];
      var toSubtractCents = toSubtract.split(".")[1];

      if(isLarger(toSubtract)){
        var newSubtractDollars = dollars;
        var newSubtractCents = cents;
        dollars = toSubtractDollars;
        cents = toSubtractCents;
        toSubtractDollars = newSubtractDollars;
        toSubtractCents = newSubtractCents;
        setNegative = true;
      }

      doOperation(toSubtractDollars, toSubtractCents, MathUtils.reducers.subtractReduce);
      if(setNegative)
        dollars = (-1).toString()[0] + dollars;
    }
  }

  function multiply(toMultiply){
    toMultiply = validateInput(toMultiply);
    toMultiplyDollars = toMultiply.split(".")[0];
    toMultiplyCents = toMultiply.split(".")[1];

    var floatInt = new MathUtils.BigIntString(dollars + "" + cents); //Added the double quotes to ensure the interpreter creates a string here
    floatInt.multiply(toMultiplyDollars + "" + toMultiplyCents);

    var newValue = floatInt.value();
    var decimals = toMultiplyCents.length + cents.length;
    dollars = newValue.substring(0, newValue.length - decimals);
    cents = newValue.substring(newValue.length - decimals);

    while(cents[cents.length - 1] == "0")
      cents = cents.substring(0, cents.length - 1);

    if(cents.length == 0)
      cents = "0";
  }

  function divide(toDivide){
    toDivide = validateInput(toDivide);

    var dollarArray = dollars.split("");
    var newDollars = [];
    var currentNumerator = "";

    while(dollarArray.length > 0){
      currentNumerator += dollarArray.splice(0,1)[0];

      if(!isLarger(toDivide, currentNumerator)){
        var divisor = new BigFloatString(toDivide);
        var iters = 1;

        while(!isLarger(divisor.value(), currentNumerator)){
          divisor.add(toDivide);
          iters++;
        }

        newDollars.push((iters - 1).toString());
        divisor.subtract(toDivide);

        var numerator = new BigFloatString(currentNumerator);
        numerator.subtract(divisor.value());
        currentNumerator = numerator.value().split(".")[0];
      }
      else {
        newDollars.push("0");
      }
    }

    while(newDollars[0] == "0"){
      newDollars.splice(0,1);
    }
    if(newDollars.length == 0)
      newDollars.push("0");

    dollars = newDollars.join("");

    var centArray = cents.split("");
    var newCents = [];

    while(currentNumerator != "0"){
      var next = "0";
      if(centArray.length > 0)
        next = centArray.splice(0,1)[0];

      currentNumerator += next;
      if(!isLarger(toDivide, currentNumerator)){
        var divisor = new BigFloatString(toDivide);
        var iters = 1;

        while(!isLarger(divisor.value(), currentNumerator)){
          divisor.add(toDivide);
          iters++;
        }

        var number = (iters - 1).toString();
        var index = newCents.length;
        var repeats = false;
        while((index = newCents.lastIndexOf(number, index)) > -1){
          var previousNumerator = currentNumerator;
          for(var i=newCents.length - 1;i>=index;i--){
            previousNumerator = previousNumerator.substring(0, previousNumerator.length - 1) || "0";
            var numeratorFloat = new BigFloatString(previousNumerator);
            var previousDivisor = new BigFloatString(toDivide);
            previousDivisor.multiply(newCents[i]);
            numeratorFloat.add(previousDivisor.value());
            previousNumerator = numeratorFloat.value().split(".")[0];
          }

          if(previousNumerator == currentNumerator){
            repeats = true;
            break;
          }

          index--;
        }

        if(repeats){
          var repeater = "";
          for(var i=index;i<newCents.length;i++){
            repeater += newCents[i];
          }

          newCents.push(repeater + "...");
          currentNumerator = "0.0";
          break;
        }
        else {
          newCents.push(number);
          divisor.subtract(toDivide);
          var numerator = new BigFloatString(currentNumerator);
          numerator.subtract(divisor.value());
          currentNumerator = numerator.value().split(".")[0];
        }
      }
      else {
        newCents.push("0");
      }
    }

    if(newCents.length == 0)
      newCents.push("0");

    cents = newCents.join("");
  }

  return {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
    value: function(){return dollars + "." + cents;}
  }
});

module.exports = BigFloatString;
