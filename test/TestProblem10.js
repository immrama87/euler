var testExecutor = require("../utils/TestExecutor")("10",
  "should return {{expected}} when finding the sum of all primes below {{x}}"
);
testExecutor.addUseCase({x:10}, 17);
testExecutor.addUseCase({x:2000000}, 142913828922);

describe("Problem 10", testExecutor.execute);
