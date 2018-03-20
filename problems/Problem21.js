var description = "Find the sum of all amicable numbers below a maximum, x.";
var inputDefs = {
  x: "Enter the maximum number: "
};
var solverFunction = function(inputs){
  var max = parseInt(inputs.x);
  var amicables = [];

  for(var i=1;i<max;i++){
    if(amicables.indexOf(i) > -1)
      continue;

    var amicable;
    if((amicable = getAmicable(i)) != undefined){
      amicables.push(i);
      amicables.push(amicable);
    }
  }

  return amicables.reduce(function(a,b){return a+b;});
}

function getAmicable(number){
  var factors = MathUtils.getFactorsOf(number);
  var factorSum = factors.reduce(function(a,b){return a+b;});
  if(factorSum == number)
    return undefined;

  var factorSumFactors = MathUtils.getFactorsOf(factorSum);
  var factorSumFactorSum = factorSumFactors.reduce(function(a,b){return a+b;});

  if(factorSumFactorSum == number){
    return factorSum;
  }
}

module.exports = require("../utils/Problem")(description, inputDefs, solverFunction);
