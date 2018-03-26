var description = "Find the largest reciprocal cycle in the decimal representation of a unit fraction from 2 - x.";
var inputDefs = {
  x: "Enter the largest unit to find the decimal representation for: "
};

var solverFunction = function(inputs){
  var x = parseInt(inputs.x);
  var sequenceLength = 0;
  var sequenceUnit = 0;

  for(var i=x;i>=2;i--){
    if(sequenceLength > i)
      break;

    var remainders = {};
    var value = 1;
    var pos = 0;

    while(remainders[value] == undefined && value != 0){
      remainders[value] = pos;
      value *= 10;
      value %= i;
      pos++;
    }

    if(pos - remainders[value] > sequenceLength){
      sequenceLength = pos - remainders[value];
      sequenceUnit = i;
    }
  }

  return sequenceUnit;
}

module.exports = require("../utils/Problem")(description, inputDefs, solverFunction);
