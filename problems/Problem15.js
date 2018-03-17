var description = "Find the number of possible moves from top-left to bottom-right in a square grid of x side length, restricted to right and down moves.";
var inputDefs = {
  side: "Enter the size of a side in the grid: "
};

var solverFunction = function(inputs){
  var side = parseInt(inputs.side)+1;

  var top = 0;
  var rowAbove = [];
  var diagonal = 0;
  //Because the paths to any node in the grid in the sum of the paths to the nodes above and to the left
  // we only need to work towards the diagonals (as they will be the largest paths in a square grid)
  for(var i=1;i<side;i++){
    //Prepopulate the row with 1 move to the left-most node because you can only move down to get to a node in the left-most
    // column.
    var row = [1];
    for(var j=1;j<i;j++){
      var left, above;

      left = row[j-1];

      //If the current row is the second, the number of paths to the node above is always 1 since you can only move right
      // to get to a node on the top row.
      if(i == 1){
        above = 1;
      }
      else {
        above = rowAbove[j];
      }

      row.push(left + above);
    }
    //Get the diagonal (always twice the right-most node before the diagonal in a square grid).
    diagonal = row[row.length - 1] * 2;
    //Push the diagonal and cache it in the rowAbove object;
    row.push(diagonal);
    rowAbove = row;
  }

  return diagonal;
}

module.exports = require("../utils/Problem")(description, inputDefs, solverFunction);
