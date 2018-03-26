var description = "Find the sum of the diagonals in a spiral generated in a clockwise manner.";
var inputDefs = {
  side: "Enter the side length for the square generated from the spiral: "
};

var solverFunction = function(inputs){
  var side = parseInt(inputs.side);
  var sum = 1;
  var skip = 1;
  var next = 1;

  var size = 1;
  while(skip < side){
    for(var i=0;i<4;i++){
      sum+=next+skip+1;
      next+=skip+1;
    }
    skip+=2;
  }

  return sum;
}

module.exports = require("../utils/Problem")(description, inputDefs, solverFunction);
