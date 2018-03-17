var description = "Find the longest Collatz chain for a number under x.";
var inputDefs = {
  x: "Enter the upper bounds for the problem: "
};

var stepsCache = {};

var solverFunction = function(inputs){
  var x = parseInt(inputs.x);
  var longestChain = 0;
  var longestNumber;

  for(var i=1;i<x;i++){
    var steps = processNumber(i, 0);
    if(steps > longestChain){
      longestChain = steps;
      longestNumber = i;
    }

    stepsCache[i] = steps;
  }

  return longestNumber;
}

function processNumber(number, steps){
  if(number==1)
    return steps+1;

  if(stepsCache.hasOwnProperty(number)){
    return steps + stepsCache[number];
  }

  steps = steps+1;

  var next;
  if(number%2==0){
    next = number/2;
  }
  else {
    next = number*3 + 1;
  }

  return processNumber(next, steps);
}

module.exports = require("../utils/Problem")(description, inputDefs, solverFunction);
