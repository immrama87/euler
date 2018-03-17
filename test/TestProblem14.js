var testExecutor = require("../utils/TestExecutor")("14",
  "should return {{expected}} when searching for starting number of the largest Collatz chain under {{x}}"
);
testExecutor.addUseCase({x:10}, 9);
testExecutor.addUseCase({x:1000000}, 837799);

describe("Problem 14", testExecutor.execute);
