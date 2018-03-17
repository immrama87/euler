var description = "Find the sum of the digits of the number 2^x.";
var inputDefs = {
  x: "Enter the exponent to apply to 2 in the problem: "
};

var solverFunction = function(inputs){
  var x = parseInt(inputs.x);

  var exponentSum = 0;
  var result = new MathUtils.BigIntString("1");

  for(var i=0;i<x;i++){
    result.multiply(2);
  }

  var sum = 0;
  var value = result.value();
  for(var i=0;i<value.length;i++){
    sum += parseInt(value[i]);
  }

  return sum;
}

module.exports = require("../utils/Problem")(description, inputDefs, solverFunction);
