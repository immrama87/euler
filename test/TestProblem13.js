var testExecutor = require("../utils/TestExecutor")("13",
  "should return {{expected}} when searching for the first 10 digits of the sum of one hundred 50-digit numbers"
);
testExecutor.addUseCase({n:10}, 5537376230);

describe("Problem 13", testExecutor.execute);
