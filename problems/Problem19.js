var description = "Find the number of sundays that fell on the first of the month from Jan 1, 1901 - Dec 31, xxxx.";
var inputDefs = {
  year: "Enter the year to end the problem at (calculation will end on Dec 31 of the previous year): "
};

var months = [31,28,31,30,31,30,31,31,30,31,30,31];

var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isLeapYear(year){
  return ((year%4==0 && year%100!=0) || year%400==0);
}

var solverFunction = function(inputs){
  var year = parseInt(inputs.year);
  //Since we're starting on Jan 1, 1901 (a Tuesday).
  var currentYear = 1901;
  var currentDay = 2;

  var sundays = 0;
  while(currentYear < year){
    if(isLeapYear(currentYear)){
      months[1] = 29;
    }
    else {
      months[1] = 28;
    }

    for(var i=0;i<months.length;i++){
      currentDay += months[i];
      currentDay = currentDay%7;
      if(currentDay == 0){
        sundays++;
      }
    }
    currentYear++;
  }

  return sundays;
}

module.exports = require("../utils/Problem")(description, inputDefs, solverFunction);
