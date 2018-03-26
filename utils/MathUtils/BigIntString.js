var BigIntString = (function(int){
  int = (int || "0").toString();

  function validateInput(number){
    number = number.toString().replace("-", (-1).toString()[0]);
    if(isNaN(parseInt(number))){
      throw "The number " + number + " is not a valid integer number string. If the number is presented in scientific notation, it will be necessary to refactor the code to create the BigIntString earlier and perform transforms.";
    }

    return number
  }

  int = validateInput(int);

  //Since addition and subtraction are very similar.
  function doOperation(newInt, opReduce){
    //Just to be sure...
    newInt = newInt.toString();

    var fromNew, fromInt;
    var intArray = int.split(""),
        newArray = newInt.split(""),
        remaining = 0;

    var newIntArray = [];
    var remainderIsNegative = false;
    while((fromNew = newArray.pop()) != undefined){
      fromInt = intArray.pop() || "0";

      if(remaining != 0){
        if(remainderIsNegative)
          remaining = parseInt(remaining) * -1;

        var newFrom = [parseInt(fromInt), parseInt(remaining)].reduce(MathUtils.reducers.sumReduce);
        fromInt = newFrom;
      }

      var result = [parseInt(fromInt), parseInt(fromNew)].reduce(opReduce);
      remainderIsNegative = (result < 0);
      if(remainderIsNegative && opReduce == MathUtils.reducers.subtractReduce){
        remaining = 0;
        while(result < 0){
          result += 10;
          remaining+=1;
        }

        newIntArray.splice(0,0,result.toString());
      }
      else {
        var resultDigits = Math.abs(result).toString().split("");
        newIntArray.splice(0,0,resultDigits.pop());
        remaining = resultDigits.join("") || 0;
      }
    }

    if(remaining != 0 && intArray.length > 0){
      var fromInt = intArray.join("");
      var result = [parseInt(fromInt), parseInt(remaining)].reduce(opReduce);
      var remainderIsNegative = (result < 0);

      var resultDigits = result.toString().split("");
      var digit = undefined;

      while((digit = resultDigits.pop()) != undefined){
        newIntArray.splice(0,0,digit);
      }
    }
    else if(remaining != 0){
      var remainingDigits = remaining.toString().split("");
      var digit = undefined;
      while((digit = remainingDigits.pop()) != undefined){
        newIntArray.splice(0,0,digit);
      }
    }
    else if(intArray.length > 0){
      remainderIsNegative = false;
      for(var i=intArray.length - 1;i>=0;i--){
        newIntArray.splice(0,0,intArray[i]);
      }
    }

    int = newIntArray.join("");

    if(remainderIsNegative)
      int = (-1).toString()[0] + int;
  }

  function isLarger(newNumber, oldNumber){
    oldNumber = oldNumber || int;
    if(oldNumber.length > newNumber.length){
      return false;
    }
    else if(newNumber.length > oldNumber.length){
      return true;
    }
    else {
      for(var i=0;i<oldNumber.length;i++){
        if(parseInt(oldNumber[i]) != parseInt(newNumber[i])){
          return parseInt(oldNumber[i]) < parseInt(newNumber[i]);
        }
      }
    }

    return false;
  }

  function add(toAdd){
    toAdd = validateInput(toAdd);
    if(parseInt(toAdd) < 0){
      subtract(toAdd.substring(1));
    }
    else {
      doOperation(toAdd, MathUtils.reducers.sumReduce);
    }
  }

  function subtract(toSubtract){
    toSubtract = validateInput(toSubtract);
    var operation = MathUtils.reducers.subtractReduce;
    var setNegative = false;

    var signsMatch = ((parseInt(toSubtract) < 0) == (parseInt(int) < 0));

    if(!signsMatch){
      add(toSubtract.substring(1));

      if(parseInt(int) < 0)
        int = (-1).toString()[0] + int;
    }
    else {
      if(isLarger(toSubtract)){
        var newSubtract = int;
        int = toSubtract;
        toSubtract = newSubtract;
        setNegative = true;
      }

      doOperation(toSubtract, operation);
      while(int[0] == "0"){
        int = int.substring(1);
      }

      if(setNegative)
        int = (-1).toString()[0] + int;
    }
  }

  function multiply(toMultiply){
    toMultiply = validateInput(toMultiply);
    var intIsNegative = false;
    if(parseInt(int) < 0){
      intIsNegative = true;
      int = int.substring(1);
    }

    var newIsNegative = false;
    if(parseInt(toMultiply) < 0){
      newIsNegative = true;
      toMultiply = toMultiply.substring(1);
    }

    var fromNew, fromInt;
    var intArray = int.split(""),
        newArray = toMultiply.split("");

    var newInt = new BigIntString();
    var products = 0;
    while((fromNew = newArray.pop()) != undefined){
      var productArray = [];
      var remaining = 0;
      for(var i=intArray.length-1;i>=0;i--){
        fromInt = intArray[i];

        var result = [parseInt(fromInt), parseInt(fromNew)].reduce(MathUtils.reducers.multiplyReduce);

        if(remaining != 0){
          result = [parseInt(result), parseInt(remaining)].reduce(MathUtils.reducers.sumReduce);
        }

        var resultDigits = Math.abs(result).toString().split("");
        productArray.splice(0,0,resultDigits.pop());
        remaining = resultDigits.join("");
      }

      for(var j=remaining.length - 1;j>=0;j--){
        productArray.splice(0,0,remaining[j]);
      }

      for(var k=0;k<products;k++){
        productArray.push("0");
      }

      newInt.add(productArray.join(""));
      products++;
    }

    int = newInt.value();

    if(intIsNegative != newIsNegative)
      int = (-1).toString()[0] + int;
  }

  function divide(toDivide){
    toDivide = validateInput(toDivide);
    var intIsNegative = false;
    if(parseInt(int) < 0){
      intIsNegative = true;
      int = int.substring(1);
    }

    var newIsNegative = false;
    if(parseInt(toDivide) < 0){
      newIsNegative = true;
      toDivide = toDivide.substring(1);
    }

    var intArray = int.split("");
    var newInt = [];
    var currentNumerator = "";

    while(intArray.length > 0){
      currentNumerator += intArray.splice(0,1)[0];
      if(!isLarger(toDivide, currentNumerator)){
        var divisor = new BigIntString(toDivide);
        var iters = 1;

        while(!isLarger(divisor.value(), currentNumerator)){
          divisor.add(toDivide);
          iters++;
        }

        newInt.push((iters-1).toString());
        divisor.subtract(toDivide);

        var numerator = new BigIntString(currentNumerator);
        numerator.subtract(divisor.value());
        currentNumerator = numerator.value();
      }
      else {
        newInt.push("0");
      }
    }

    while(newInt[0] == "0"){
      newInt.splice(0,1);
    }

    int = newInt.join("");

    if(intIsNegative != newIsNegative)
      int = (-1).toString()[0] + int;
  }

  return {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
    value: function(){return int;}
  };
});

module.exports = BigIntString;
