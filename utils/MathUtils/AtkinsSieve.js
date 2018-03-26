var AtkinsSieve = (function(max){
  function generate(){
    var results = [2,3];

    //Create a sieve list for all positive integers, initially marked as composite.
    var sieve = [];
    for(var i=0;i<=max;i++){
      sieve.push(false);
    }

    var limit = Math.sqrt(max);

    for(var x=1;x<limit;x++){
      for(var y=1;y<limit;y++){
        var n = (4*x*x) + (y*y);
        if(n <= max && (n%12 == 1 || n%12 == 5))
          sieve[n] = !sieve[n];

        n = (3*x*x) + (y*y);
        if(n <= max && n%12 == 7)
          sieve[n] = !sieve[n];

        n = (3*x*x) - (y*y);
        if(x > y && n <= max && n%12 == 11)
          sieve[n] = !sieve[n];

      }
    }
    for(var r=5;r<limit;r++){
      if(sieve[r]){
        var x = r*r;
        for(var i=x;i<max;i+=x){
          sieve[i] = false;
        }
      }
    }

    for(var i=0;i<sieve.length;i++){
      if(sieve[i]){
        results.push(i);
      }
    }

    return results;
  }

  return {
    generate: generate
  };
});

module.exports = AtkinsSieve;
