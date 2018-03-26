var testExecutor = require("../utils/TestExecutor")("27",
  "should return {{expected}} when finding the product of the coeffecients, a and b, with the longest sequence of consecutive primes for the formula n^2 + a*n + b, where |a| <= {{x}} and |b| <= {{x}}"
);

testExecutor.addUseCase({x:41}, -41);
testExecutor.addUseCase({x:1000}, -59231);

describe("Problem 27", testExecutor.execute);
