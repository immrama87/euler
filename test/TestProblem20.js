var testExecutor = require("../utils/TestExecutor")("20",
  "should return {{expected}} when finding the sum of the digits of {{n}}!"
);

testExecutor.addUseCase({n:10}, 27);
testExecutor.addUseCase({n:100}, 648);

describe("Problem 20", testExecutor.execute);
