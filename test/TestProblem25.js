var testExecutor = require("../utils/TestExecutor")("25",
  "should return {{expected}} when searching for the index (1-indexed) of the first Fibonacci number with {{n}} digits"
);
testExecutor.addUseCase({n:3}, 12);
testExecutor.addUseCase({n:1000}, 4782);

describe("Problem 25", testExecutor.execute);
