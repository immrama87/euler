var description = "Find the sum of all positive integers that cannot be written as the sum of two abundant numbers";
var inputDefs = {};

var solverFunction = function(inputs){
  var abundants = [];
  var totalSum = 0;

  //Technically ~O(1) (obviously setting the max higher than 28123 will change execution time, but not result so changes are pointless)
  //because we have a mathematically-bound endpoint (which is 20161, but the problem states 28123),
  //but on a non-bound set it would be O(N^Na/2) where Na is the number of abundants below N
  for(var i=1;i<=28123;i++){
    if(isAbundant(i)){
      abundants.push(i);
    }

    var index = 0;
    var isValid = true;
    while(index < abundants.length && abundants[index] <= i/2){
      if(abundants.indexOf(i-abundants[index]) > -1){
        isValid = false;
        break;
      }

      index++;
    }

    if(isValid){
      totalSum += i;
    }
  }

  return totalSum;
}

function isAbundant(number){
  return MathUtils.getFactorsOf(number).reduce(function(a,b){return a+b;}) > number;
}

module.exports = require("../utils/Problem")(description, inputDefs, solverFunction);
