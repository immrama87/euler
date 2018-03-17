var Problem = require("../utils/Problem");
var description = "Find the product of a Pythagorean triplet, such that a < b < c and a + b + c = x";
var inputDefs = {
  x: "Enter the value for x in the problem above: "
};

var solverFunction = function(inputs){
  var x = parseInt(inputs.x);

  /*
   * Because we can know that:
   * a + b + c = x
   * and
   * a^2 + b^2 = c^2
   * we can surmise that the less-complicated algorithm would be:
   * a + b + sqrt(a^2 + b^2) = x
   *
   * Doing this will reduce the time to calculate an answer from O(n^3) to O(n^2)
   */

  //Because a<b<c, we can set our upper bounds for a to 1/3 of x and b to 2/3 of x
  var firstThird = x/3;
  var secondThird = x*(2/3);

  for(var a=1;a<firstThird;a++){
    for(var b=a+1;b<secondThird;b++){
      if(a + b + Math.sqrt(a*a + b*b) == x){
        c = x - (a + b);
        return a*b*c;
      }
    }
  }
}

var problem = new Problem(description, inputDefs, solverFunction);
module.exports = problem;
