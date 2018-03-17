var testExecutor = require("../utils/TestExecutor")("6",
  "should return {{expected}} when finding the difference between the sum of the squares and the square of the sum of the numbers from 1 to {{x}}"
);
testExecutor.addUseCase({x:10}, 2640);
testExecutor.addUseCase({x:100}, 25164150);

describe("Problem 6", testExecutor.execute);
