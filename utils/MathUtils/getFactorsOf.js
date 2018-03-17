function getFactorsOf(number){
  var factors = [1];
  if(MathUtils.isPrime(number)){
    factors.push(number);
    return factors;
  }

  if(number%2==0){
    factors.push(2);
    factors.push(number/2);
  }

  var test = 3;
  while(test <= Math.sqrt(number)){
    if(number%test==0){
      factors.push(test);
      factors.push(number/test);
    }

    test++;
  }

  return factors;
}

module.exports = getFactorsOf;
