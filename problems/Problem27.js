var description = "Find the product of the coeffiecients, a and b, in the formula n^2 + an + b, where |a| lt x and |b| lte x, that produce the most primes for consecutive values of n starting at n=0";
var inputDefs = {
  x: "Enter the maximum value for |b|: "
};

var solverFunction = (function(inputs){
  var x = parseInt(inputs.x);
  var sieve = new MathUtils.AtkinsSieve(f(x,x,1000)); //n=1000,a=x,b=x - precalculating primes for coefficients capable of generating 1000 consecutive primes
  var primes = sieve.generate();
  var maxPrimes = 0;
  var product = 0;

  //Primes can't be negative and b must be prime (see below) so the |b| in the formula is intentionally misleading
  for(var b=1;b<=x;b++){
    if(primes.indexOf(b) == -1) //Because if n=0, then x^2 + a*x + b = 0 + 0 + b = b, so b must be prime
      continue;

    for(var a=x*-1;a<=x;a++){
      var n = 0;
      while(primes.indexOf(f(a,b,n)) > -1){
        n++;
      }

      if(n > maxPrimes){
        maxPrimes = n;
        product = a*b;
      }
    }
  }

  return product;
});

function f(a,b,n){
  return Math.abs(Math.pow(n,2) + (a*n) + b);
}

module.exports = require("../utils/Problem")(description, inputDefs, solverFunction);
