var Problem = require("../utils/Problem");
var description = "Sum of the multiples of two numbers below a maximum.";
var inputDefs = {
  maximum: "Enter the upper bounds for the problem: ",
  x: "Enter the first number to find the multiple sum of: ",
  y: "Enter the second number to find the multiple sum of: "
};

var solverFunction = function(inputs){
  var max = parseInt(inputs.maximum) - 1;
  var x = parseInt(inputs.x);
  var y = parseInt(inputs.y);

  var total_X = Math.floor(max/x);
  var sum_X = 0;
  for(var i=0;i<total_X;i++){
    sum_X += x * (total_X - i);
  }

  var total_Y = Math.floor(max/y);
  var sum_Y = 0;
  for(var j=0;j<total_Y;j++){
    sum_Y += y * (total_Y - j);
  }

  var total_XY = Math.floor(max/(x*y));
  var sum_XY = 0;
  for(var k=0;k<total_XY;k++){
    sum_XY += (x*y) * (total_XY - k);
  }

  return sum_X + sum_Y - sum_XY;
};

var problem1 = new Problem(description, inputDefs, solverFunction);
module.exports = problem1;
