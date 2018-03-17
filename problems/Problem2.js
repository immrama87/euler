var Problem = require("../utils/Problem");

var description = "Value of even-number Fibonacci numbers below a maximum.";
var inputDefs = {
  maximum: "Enter the upper bounds for the problem: "
};
var solverFunction = function(inputs){
  //Because 2 is the first even in the sequence and 8 is the second.
  var sum = 2;
  var evens = [2,8];

  var max = parseInt(inputs.maximum);
  //Because evens in the Fibonacci sequence follow the pattern:
  //x = 4*Fe(x^-1)+Fe(x^-2)
  while(evens[1] < max){
    sum += evens[1];
    var newEven = 4 * evens[1] + evens[0];
    evens[0] = evens[1];
    evens[1] = newEven;
  }

  return sum;
};

var problem = new Problem(description, inputDefs, solverFunction);
module.exports = problem;
