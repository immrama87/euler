var testExecutor = require("../utils/TestExecutor")("2",
  "should return {{expected}} when searching for even members of the Fibonacci sequence below {{maximum}}"
);
testExecutor.addUseCase({maximum:100}, 44);
testExecutor.addUseCase({maximum:4000000}, 4613732);

describe("Problem 2", testExecutor.execute);
