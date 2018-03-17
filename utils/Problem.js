var PromiseChain = require("./PromiseChain");

var Problem = (function(description, inputDefs, solver){
  var promiseChain = new PromiseChain();

  function runSolver(inputs, promise){
    var startTime = new Date().getTime();
    var answer = solver(inputs);
    var endTime = new Date().getTime();
    promise.resolve("result", {
      answer: answer,
      elapsed: endTime - startTime
    });
  }

  function getInputs(promise){
    cli.getInputs(inputDefs).then(function(inputs){
      runSolver(inputs, promise);
    });
  }

  return {
    solve: function(inputs){
      if(!inputs){
        cli.writeLine(description);
        promiseChain.addStep(getInputs);
      }
      else {
        promiseChain.addStep(function(promise){
          runSolver(inputs, promise);
        });
      }

      return promiseChain.start();
    }
  };
});

module.exports = Problem;
