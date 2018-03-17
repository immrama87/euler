var description = "Find the sum of the digits of the product of n!.";
var inputDefs = {
  n: "Enter n for the problem description: "
};

var solverFunction = function(inputs){
  var n = parseInt(inputs.n);
  var bigInt = new MathUtils.BigIntString(1);

  while(n > 0){
    bigInt.multiply(n);
    n--;
  }

  var val = bigInt.value();
  var sum = 0;
  for(var i=0;i<val.length;i++){
    sum += parseInt(val[i]);
  }

  return sum;
}

module.exports = require("../utils/Problem")(description, inputDefs, solverFunction);
