var description = "Find the nth lexicographic permutation of the numbers 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9.";
var inputDefs = {
  n: "Enter the permutation to find: "
};

var solverFunction = function(inputs){
  var ps = [1];
  var n = parseInt(inputs.n) - 1; //-1 because the original order is also the first permutation

  var index = 1;
  while(ps[index-1] < n){
    ps[index] = (index+1) * ps[index-1];
    index++;
  }

  var originalOrder = [0,1,2,3,4,5,6,7,8,9];
  var newOrder = [];
  for(var i=ps.length-1;i>=0;i--){
    var iters = Math.floor(n/ps[i-1]);
    newOrder.push(originalOrder.splice(iters,1));
    n -= iters * ps[i-1];
  }

  return newOrder.join("");
}

module.exports = require("../utils/Problem")(description, inputDefs, solverFunction);
