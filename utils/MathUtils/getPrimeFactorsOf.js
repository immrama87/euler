function getPrimeFactorsOf(number){
  var primeFactors = [];
  if(MathUtils.isPrime(number)){
    primeFactors.push(number);
    return primeFactors;
  }

  if(number%2==0){
    primeFactors.push(2);
    return primeFactors.concat(getPrimeFactorsOf(number/2));
  }
  else {
    var test = 3;
    while(test <= Math.sqrt(number)){
      if(MathUtils.isPrime(test)){
        if(number%test == 0){
          primeFactors.push(test);
          return primeFactors.concat(getPrimeFactorsOf(number/test));
        }
      }

      test += 2;
    }
  }

  return primeFactors;
};

module.exports = getPrimeFactorsOf;
