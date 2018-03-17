var PromiseChain = (function(){
  var pc;
  var chain = [];
  var promiseArgs = [];

  function runChainStep(index, parentPromise){
    if(chain.length > index){
      var promise = new Thenable();
      promise.then(function(){
        promiseArgs.push(arguments);
        runChainStep(index+1, parentPromise);
      });
      chain[index](promise);
    }
    else {
      var results = {};
      for(var i=0;i<promiseArgs.length;i++){
        if(promiseArgs[i].length == 2){
          results[promiseArgs[i][0]] = promiseArgs[i][1];
        }
      }
      parentPromise.resolve(results);
    }
  }

  pc = {
    addStep: function(fnc){
      if(typeof fnc == "function")
        chain.push(fnc);

      return pc;
    },
    start: function(){
      var promise = new Thenable();
      runChainStep(0, promise);
      return promise;
    }
  };

  return pc;
});

var Thenable = (function(){
  var th;
  var next = [];
  var args;
  var complete = false;

  th = {
    then: function(fnc){
      if(typeof fnc == "function"){
        if(complete){
          fnc.apply(null, args);
        }

        next.push(fnc);
      }

      return th;
    },
    resolve: function(){
      for(var i=0;i<next.length;i++){
        next[i].apply(null, arguments);
      }
      args = arguments;
      complete = true;
    }
  };

  return th;
});

module.exports = PromiseChain;
