var primesCached = [1,2,3];

function isPrime(number, disableCaching){
  if(primesCached.indexOf(number) > -1)
    return true;

  if(number%2==0)
    return false;

  //Because all factors above a number's square root will have already been found
  var sqrt = Math.sqrt(number);
  var test = 3;
  while(test <= sqrt){
    if(number%test == 0)
      return false;

    test+=2;
  }

  if(!disableCaching)
    primesCached.push(number);

  return true;
};

module.exports = isPrime;
