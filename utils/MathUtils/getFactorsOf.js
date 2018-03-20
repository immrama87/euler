function getFactorsOf(number){
  var factors = [1];
  if(MathUtils.isPrime(number)){
    return factors;
  }

  if(number%2==0){
    factors.push(2);
    if(number != 4)
      factors.push(number/2);
  }

  var test = 3;
  while(test <= Math.sqrt(number)){
    if(number%test==0){
      factors.push(test);
      if(number/test != test) //This is basically a check to make sure that the square root is only returned once for perfect squares
        factors.push(number/test);
    }

    test++;
  }

  return factors;
}

module.exports = getFactorsOf;
