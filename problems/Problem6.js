var Problem = require("../utils/Problem");
var description = "Find the difference between the sum of the squares and the square of the sums of all natural numbers between 1 and x.";
var inputDefs = {
  x: "Enter the upper bounds for the problem: "
};

var solverFunction = function(inputs){
  var max = parseInt(inputs.x) +1;
  var squares = 0;
  var sums = 0;
  for(var i=1;i<max;i++){
    squares += i*i;
    sums += i;
  }

  sums*=sums;
  return sums-squares;
}

var problem = new Problem(description, inputDefs, solverFunction);
module.exports = problem;
