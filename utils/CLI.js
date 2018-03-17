const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var PromiseChain = require("./PromiseChain");

/**
 * utils/CLI
 * Used to create a command-line interface.
 */
var CLI = (function(){
  var inputs = {};

  function scheduleInputRetrieval(promiseChain, key, question){
    promiseChain.addStep(function(promise){
      rl.question(question, function(answer){
        promise.resolve(key, answer);
      });
    });
  }

  function lPad(str, len, chr){
    str = str.toString();
    while(str.length < len){
      str = chr + str;
    }

    return str;
  }

  function formatTime(runTime){
    var s = Math.floor(runTime / 1000);
    var ms = runTime - (s * 1000);
    var m = Math.floor(s / 60);
    s = s - (m * 60);

    return lPad(m, 2, "0") + ":" + lPad(s, 2, "0") + "." + lPad(ms, 4, "0");
  }

  return {
    write: rl.write,
    writeLine: function(msg){
      rl.write(msg + "\n");
    },
    writeAnswer: function(result){
      rl.write("Answer: " + result.answer + "\n");
      rl.write("Runtime: " + formatTime(result.elapsed) + "\n");
    },
    getInputs: function(inputDefs){
      inputs = {};
      var inputKeys = Object.keys(inputDefs);

      var promiseChain = new PromiseChain();
      for(var i=0;i<inputKeys.length;i++){
        scheduleInputRetrieval(promiseChain, inputKeys[i], inputDefs[inputKeys[i]]);
      }

      return promiseChain.start();
    }
  };
});

module.exports = CLI;
