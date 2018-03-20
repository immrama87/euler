var testExecutor = require("../utils/TestExecutor")("21",
  "should return {{expected}} when finding the sum of all amicable numbers below {{x}}"
);
testExecutor.addUseCase({x:10000}, 31626);

describe("Problem 21", testExecutor.execute);
