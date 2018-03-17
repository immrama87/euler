var description = "Find the number of letters in the names of the numbers 1-x (excluding hyphens and spaces).";
var inputDefs = {
  x: "Enter the upper bounds for the problem: "
};

var numberNames = {
  1: 3,//"one",
  2: 3,//"two",
  3: 5,//"three",
  4: 4,//"four",
  5: 4,//"five",
  6: 3,//"six",
  7: 5,//"seven",
  8: 5,//"eight",
  9: 4,//"nine",
  10: 3,//"ten",
  11: 6,//"eleven",
  12: 6,//"twelve",
  13: 8,//"thirteen",
  14: 8,//"fourteen",
  15: 7,//"fifteen",
  16: 7,//"sixteen",
  17: 9,//"seventeen",
  18: 8,//"eighteen",
  19: 8,//"nineteen",
  20: 6,//"twenty",
  30: 6,//"thirty",
  40: 5,//"forty",
  50: 5,//"fifty",
  60: 5,//"sixty",
  70: 7,//"seventy",
  80: 6,//"eighty",
  90: 6,//"ninety",
  100: 7,//"hundred",
  1000: 8,//"thousand"
};

var solverFunction = function(inputs){
  var x = parseInt(inputs.x);
  var count = 0;
  var number = 1;

  var subTen = getSubTen(x),
      teens = getTeens(x);
      tens = getTens(x, subTen),
      hundreds = getHundreds(x, subTen, teens, tens),
      thousands = getThousands(x, subTen, teens, tens, hundreds);

  return subTen+teens+tens+hundreds+thousands;
}

//Sub ten are counted separately from teens because they're reusable in all of the tens counts.
function getSubTen(max){
  var count = 0;
  for(var i=1;i<10;i++){
    if(i > max)
      break;

    count += numberNames[i];
  }

  return count;
}

function getTeens(max){
  var count = 0;
  for(var i=10;i<20;i++){
    if(i > max)
      break;

    count += numberNames[i];
  }

  return count;
}

function getTens(max, subTen){
  var count = 0;
  for(var i=2;i<10;i++){
    if(i*10 > max)
      break;

    if((((i+1)*10) - 1) > max){
      var stop = max - (i * 10);
      count += numberNames[i*10] * (stop + 1);

      for(var j=1;j<stop;j++){
        count += numberNames[j];
      }
    }
    else {
      count += subTen;
      count += numberNames[i*10] * 10;
    }
  }

  return count;
}

function getHundreds(max, subTen, teens, tens){
  var count = 0;
  for(var i=1;i<10;i++){
    if(i*100 > max)
      break;

    if((((i+1) * 100) - 1) > max){
      var stop = max - (i * 100);
      count += (numberNames[i] + numberNames[100]) * (stop + 1);
      if(stop >= 20){
        count += subTen;
        count += teens;
        count += getTens(stop, subTen);
      }
      else if(stop >= 10){
        count += subTen;
        count += getTeens(stop);
      }
      else {
        count += getSubTen(stop);
      }
    }
    else {
      count += subTen;
      count += teens;
      count += tens;
      count += (numberNames[i] + numberNames[100]) * 100;
      //This is for all numbers beside i00, which require 'and'
      count += 3*99;
    }
  }

  return count;
}

function getThousands(max, subTen, teens, tens, hundreds){
  var count = 0;
  for(var i=1;i<10;i++){
    if(i*1000 > max)
      break;

    if((((i+1) * 1000) - 1) > max){
      var stop = max - (i * 1000);
      count += (numberNames[i] + numberNames[1000]) * (stop + 1);

      if(stop >= 100){
        count += getHundreds(stop, subTen, teens, tens);
      }
      else if(stop >= 20){
        count += subTen;
        count += teens;
        count += getTens(stop, subTen);
      }
      else if(stop >= 10){
        count += subTen;
        count += getTeens(stop);
      }
      else {
        count += getSubTen(stop);
      }
    }
  }

  return count;
}

module.exports = require("../utils/Problem")(description, inputDefs, solverFunction);
