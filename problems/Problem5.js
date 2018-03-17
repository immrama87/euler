var Problem = require("../utils/Problem");
var description = "Find the smallest number divisible by all numbers from 1-x without remainder.";
var inputDefs = {
  x: "Enter the upper bounds for the problem: "
};

var solverFunction = function(inputs){
  var x = parseInt(inputs.x);
  var primeFactors = {};

  for(var i=1;i<x+1;i++){
    var factors = MathUtils.getPrimeFactorsOf(i);
    var formattedFactors = formatFactors(factors);

    for(var key in formattedFactors){
      if(primeFactors.hasOwnProperty(key)){
        if(formattedFactors[key] > primeFactors[key])
          primeFactors[key] = formattedFactors[key];
      }
      else {
        primeFactors[key] = formattedFactors[key];
      }
    }
  }

  var product = 1;
  for(var factor in primeFactors){
    for(var i=0;i<primeFactors[factor];i++){
      product *= factor;
    }
  }

  return product;
}

function formatFactors(factors){
  var formatted = {};
  for(var i=0;i<factors.length;i++){
    if(!formatted.hasOwnProperty(factors[i])){
      formatted[factors[i]] = 1;
    }
    else {
      formatted[factors[i]] = formatted[factors[i]] + 1;
    }
  }

  return formatted;
}

var problem = new Problem(description, inputDefs, solverFunction);
module.exports = problem;
