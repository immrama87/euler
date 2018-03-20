var fs = require("fs");
var mergeSort = require("../utils/mergeSort");

var description = "Find the total names value of the names listed in the file data/p022_names.txt."
var inputDefs = {};

var solverFunction = function(inputs){
  file = fs.readFileSync(__dirname + "/../data/p022_names.txt", 'utf8');

  var startingPosition = 1;
  var totalScore = 0;
  for(var i=0;i<26;i++){
    var index = 0;
    var names = [];
    while((index = file.indexOf("\"" + String.fromCharCode(65+i), index)) > -1){
      var end = file.indexOf("\",", index);
      if(end == -1)
        end = file.length-1; //-2 to put the index at the point right before the double quote

      var name = file.substring(index+1,end);
      names.push(name);
      index = end+1;
    }

    names = mergeSort(names);

    for(var j=0;j<names.length;j++){
      var nameScore = 0;
      for(var k=0;k<names[j].length;k++){
        nameScore += names[j].charCodeAt(k) - 64;
      }

      nameScore *= j+startingPosition;
      totalScore += nameScore;
    }

    startingPosition += names.length;
  }

  return totalScore;
}

module.exports = require("../utils/Problem")(description, inputDefs, solverFunction);
