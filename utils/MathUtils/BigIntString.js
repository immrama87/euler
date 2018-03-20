var BigIntString = (function(int){
  int = (int || "0").toString();

  function sumReduce(total, next){return total+next;}
  function subtractReduce(total, next){return total-next;}
  function multiplyReduce(total, next){return total*next;}

  function validateInput(number){
    number = number.toString().replace("-", (-1).toString()[0]);
    if(isNaN(parseInt(number))){
      throw "The number " + number + " is not a valid number string. If the number is presented in scientific notation, it will be necessary to refactor the code to create the BigIntString earlier and perform transforms.";
    }

    return number
  }

  int = validateInput(int);

  //Since addition and subtraction are very similar.
  function doOperation(newInt, opReduce){
    //Just to be sure...
    newInt = newInt.toString();

    var fromNew, fromInt, fromRemaining;
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

        var newFrom = [parseInt(fromInt), parseInt(remaining)].reduce(sumReduce);
        fromInt = newFrom;
      }

      var result = [parseInt(fromInt), parseInt(fromNew)].reduce(opReduce);
      remainderIsNegative = (result < 0);
      if(remainderIsNegative && opReduce == subtractReduce){
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
        remaining = resultDigits.join("");
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

      intArray = [];
    }
    else if(remaining != 0){
      var remainingDigits = remaining.toString().split("");
      var digit = undefined;
      while((digit = remainingDigits.pop()) != undefined){
        newIntArray.splice(0,0,digit);
      }
    }

    if(intArray.length > 0){
      remainderIsNegative = false;
      for(var i=intArray.length - 1;i>=0;i--){
        newIntArray.splice(0,0,intArray[i]);
      }
    }

    int = newIntArray.join("");

    if(remainderIsNegative)
      int = (-1).toString()[0] + int;
  }

  function isLarger(newNumber){
    if(int.length > newNumber.length){
      return false;
    }
    else if(newNumber.length > int.length){
      return true;
    }
    else {
      for(var i=0;i<int.length;i++){
        if(parseInt(int[i]) != parseInt(newNumber[i])){
          return parseInt(int[i]) < parseInt(newNumber[i]);
        }
      }
    }
  }

  function add(toAdd){
    toAdd = validateInput(toAdd);
    if(parseInt(toAdd) < 0){
      subtract(toAdd.substring(1));
    }
    else {
      doOperation(toAdd, sumReduce);
    }
  }

  function subtract(toSubtract){
    toSubtract = validateInput(toSubtract);
    var operation = subtractReduce;
    var setNegative = false;

    if(parseInt(toSubtract) < 0){
      add(toSubtract.substring(1));
    }
    else {
      if(isLarger(toSubtract)){
        var newSubtract = int;
        int = toSubtract;
        toSubtract = newSubtract;
        setNegative = true;
      }

      doOperation(toSubtract, operation);
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

    var fromNew, fromInt, fromRemaining;
    var intArray = int.split(""),
        newArray = toMultiply.split("");

    var newInt = new BigIntString();
    var products = 0;
    while((fromNew = newArray.pop()) != undefined){
      var productArray = [];
      var remaining = 0;
      for(var i=intArray.length-1;i>=0;i--){
        fromInt = intArray[i];

        var result = [parseInt(fromInt), parseInt(fromNew)].reduce(multiplyReduce);

        if(remaining != 0){
          result = [parseInt(result), parseInt(remaining)].reduce(sumReduce);
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


  return {
    add: add,
    subtract: subtract,
    multiply: multiply,
    value: function(){return int;}
  };
});

module.exports = BigIntString;
