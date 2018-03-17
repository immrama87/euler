var testExecutor = require("../utils/TestExecutor")("16",
  "should return {{expected}} when finding the sum of the digits of 2^{{x}}"
);
testExecutor.addUseCase({x:15}, 26);
testExecutor.addUseCase({x:1000}, 1366);

describe("Problem 16", testExecutor.execute);
