var Problem = require("../utils/Problem");
var description = "Find the nth prime";
var inputDefs = {
  n: "Enter the prime to find: "
};

var solverFunction = function(inputs){
  var n = parseInt(inputs.n);
  var primes = 1;
  var prime = 2;
  var test = 3;

  while(primes < n){
    if(MathUtils.isPrime(test)){
      primes++;
      prime = test;
    }
    test+=2;
  }

  return prime;
}

var problem = new Problem(description, inputDefs, solverFunction);
module.exports = problem;
