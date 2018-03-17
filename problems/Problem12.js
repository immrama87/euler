var description = "Find the first triangular number with n divisors.";
var inputDefs = {
  n: "Enter the number of divisors to find: "
};

var solverFunction = function(inputs){
  var n = parseInt(inputs.n) + 1;
  var divisors = 0;
  var number = 0;
  var next = 1;

  while(divisors < n){
    number += next;
    next++;

    //Adding 1 because getFactorsOf explicitly removes the 1.
    divisors = 1 + MathUtils.getFactorsOf(number).length;
  }

  return number;
}

module.exports = require("../utils/Problem")(description, inputDefs, solverFunction);
