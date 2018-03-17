global.cli = require("./utils/CLI")();
global.MathUtils = require("./utils/MathUtils");

var fs = require('fs');
var files = fs.readdirSync(__dirname + "/problems");

cli.getInputs({problem: "Please enter a problem to solve (1-" + files.length + "): "})
  .then(function(answer){
    var problem = require("./problems/Problem" + answer.problem);
    problem.solve().then(function(results){
      cli.writeAnswer(results.result);
      process.exit(0);
    });
  });
