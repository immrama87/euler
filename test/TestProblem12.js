var testExecutor = require("../utils/TestExecutor")("12",
  "should return {{expected}} when searching for the first triangular number with more than {{n}} divisors"
);
testExecutor.addUseCase({n:5}, 28);
testExecutor.addUseCase({n:500}, 76576500);

describe("Problem 12", testExecutor.execute);
