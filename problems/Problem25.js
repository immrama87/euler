var description = "Find the first Fibonacci number to contain n digits.";
var inputDefs = {
  n: "Enter the number of digits to find: "
};

var solverFunction = function(inputs){
  var n = parseInt(inputs.n);
  var int = new MathUtils.BigIntString("1");

  var next = 1;
  var index = 1;
  while(int.value().length < n){
    var fp = int.value();
    int.add(next);
    next = fp;
    index++;
  }

  return index+1;
}

module.exports = require("../utils/Problem")(description, inputDefs, solverFunction);
