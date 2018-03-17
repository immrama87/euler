var Problem = require("../utils/Problem");
var description = "Find the sum of all primes below a certain number, x.";
var inputDefs = {
  x: "Enter the value for x in the problem description: "
};

var solverFunction = function(inputs){
  var x = parseInt(inputs.x);

  var sum = 2;
  var test = 3;

  while(test<x){
    if(MathUtils.isPrimeSequential(test)){
      sum += test;
    }

    test += 2;
  }

  return sum;
}

var problem = new Problem(description, inputDefs, solverFunction);
module.exports = problem;
