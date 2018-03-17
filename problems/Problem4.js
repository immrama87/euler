var Problem = require("../utils/Problem");
var description = "Find the largest palindromic product of 2 n-length numbers.";
var inputDefs = {
  n: "Enter the length of the numbers to use: "
};

var solverFunction = function(inputs){
  var numberStr = "";
  var smallestStr = "1";
  for(var i=0;i<parseInt(inputs.n);i++){
    numberStr+="9";
    if(i>0)
      smallestStr += "0";
  }

  var largestFactor = parseInt(numberStr);
  var smallestFactor = parseInt(smallestStr);
  var largestPalindrome = 0;

  //Worst case is O(N^2) (where N = (largestFactor-smallestFactor) * (largestFactor-smallestFactor)), but the reality is it will be breaking the inner loop a lot once it starts finding palindromes.
  for(var x=largestFactor;x>=smallestFactor;x--){
    for(var y=largestFactor;y>=smallestFactor;y--){
      var number = x*y;
      if(isPalindrome(number) && number > largestPalindrome)
        largestPalindrome = number;

      //Because a number is never going to get larger by decrementing its products:
      if(number <= largestPalindrome)
        break;
    }

    //Again, no need to decrement if we're already going to be returning lower numbers
    if((x-1)*largestFactor < largestPalindrome)
      break;
  }

  return largestPalindrome;
};

function isPalindrome(number){
  var numberStr = number.toString();
  for(var i=0;i<numberStr.length/2;i++){
    if(numberStr[i] != numberStr[numberStr.length-1-i])
      return false;
  }

  return true;
}

var problem = new Problem(description, inputDefs, solverFunction);
module.exports = problem;
