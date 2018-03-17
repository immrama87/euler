var primesCached = [1,2,3];

/**
 * Slightly faster version of isPrime that only uses the cached primes to check for a prime match.
 * Can only be used when searching for primes sequentially and cannot be used for finding primes over a digit where the
 * number of smaller primes is too great.
 *
 * Cost savings are limited, but for finding all primes below 2,000,000 execution is ~1s shorter.
 */
function isPrimeSequential(number){
  if(primesCached.indexOf(number) > -1)
    return true;

  if(number%2==0)
    return false;

  var sqrt = Math.sqrt(number);
  var index = 2;
  var test;
  while((test = primesCached[index]) <= sqrt){
    if(number%test == 0)
      return false;

    index++;
  }

  primesCached.push(number);
  return true;
}

module.exports = isPrimeSequential;
