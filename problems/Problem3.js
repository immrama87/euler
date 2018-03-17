var Problem = require("../utils/Problem");
var description = "Find the largest prime factor of a given number.";
var inputs = {
  number: "Enter the number to factorize: "
};

var solverFunction = function(inputs){
  var primes = MathUtils.getPrimeFactorsOf(parseInt(inputs.number));
  return primes.reduce(function(a,b){
    return Math.max(a,b);
  });
}

var problem = new Problem(description, inputs, solverFunction);

module.exports = problem;
