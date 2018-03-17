var BigIntString = (function(int){
  int = (int || "0").toString();

  function sumReduce(total, next){return total+next;}
  function subtractReduce(total, next){return total-next;}
  function multiplyReduce(total, next){return total*next;}

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
        var newFrom = [parseInt(fromInt), parseInt(remaining)].reduce(sumReduce);
        fromInt = newFrom;
      }

      var result = [parseInt(fromInt), parseInt(fromNew)].reduce(opReduce);
      remainderIsNegative = (result < 0);
      var resultDigits = Math.abs(result).toString().split("");
      newIntArray.splice(0,0,resultDigits.pop());
      remaining = resultDigits.join("");
      if(remainderIsNegative)
        remaining *= -1;
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

  return {
    add: function(toAdd){
      var operation = sumReduce;
      if(parseInt(toAdd) < 0){
        toAdd = Math.abs(parseInt(toAdd)).toString();
        operation = subtractReduce;
      }

      doOperation(toAdd, operation);
    },
    subtract: function(toSubtract){
      var operation = subtractReduce;
      if(parseInt(toSubtract) < 0){
        toSubtract = Math.abs(parseInt(toSubtract)).toString();
        operation = sumReduce;
      }

      doOperation(toSubtract, subtractReduce);
    },
    multiply: function(toMultiply){
      toMultiply = toMultiply.toString();
      var newIsNegative = false;
      if(parseInt(toMultiply) < 0){
        newIsNegative = true;
        toMultiply = Math.abs(parseInt(toMultiply)).toString();
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
    },
    value: function(){return int;}
  };
});

module.exports = BigIntString;
