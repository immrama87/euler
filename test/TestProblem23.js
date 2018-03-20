var testExecutor = require("../utils/TestExecutor")("23",
  "should return {{expected}} when searching for the sum of all integers that are not the sum of two abundant numbers"
);
testExecutor.addUseCase({}, 4179871);
describe("Problem 23", testExecutor.execute);
