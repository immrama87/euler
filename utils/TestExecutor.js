var assert = require('assert');
global.MathUtils = global.MathUtils || require('./MathUtils');

var TestExecutor = (function(problemNumber, description){
  var problem = require("../problems/Problem" + problemNumber);
  var useCases = [];

  return {
    addUseCase: function(inputs, expected){
      var useCaseDescription = description;
      var expectedRE = new RegExp("{{expected}}", 'g');
      useCaseDescription = useCaseDescription.replace(expectedRE, expected);


      for(var key in inputs){
        var keyRE = new RegExp("{{" + key + "}}", 'g');
        useCaseDescription = useCaseDescription.replace(keyRE, inputs[key]);
      }

      useCases.push(function(){
        return it(useCaseDescription, function(){
          this.timeout(60000);
          problem.solve(inputs).then(function(results){
            assert.equal(results.result.answer, expected);
          });
        });
      });
    },
    execute: function(){
      for(var i=0;i<useCases.length;i++){
        useCases[i]();
      }
    }
  };
});

module.exports = TestExecutor;
