var Problem = require("../utils/Problem");
var description = "Find the sum of all primes below a certain number, x.";
var inputDefs = {
  x: "Enter the value for x in the problem description: "
};

var solverFunction = function(inputs){
  var x = parseInt(inputs.x);

  var sieve = new MathUtils.AtkinsSieve(x);
  var primes = sieve.generate();

  return primes.reduce(function(a,b){return a+b;});
}

var problem = new Problem(description, inputDefs, solverFunction);
module.exports = problem;
