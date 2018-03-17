var testExecutor = require("../utils/TestExecutor")("5",
  "should return {{expected}} when finding the smallest number evenly divisible by all numbers from 1 to {{x}}"
);
testExecutor.addUseCase({x:10}, 2520);
testExecutor.addUseCase({x:20}, 232792560);

describe("Problem 5", testExecutor.execute);
