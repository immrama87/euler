var testExecutor = require("../utils/TestExecutor")("4",
  "should return {{expected}} when searching for the largest palindromic product of two {{n}}-digit numbers"
);
testExecutor.addUseCase({n:2}, 9009);
testExecutor.addUseCase({n:3}, 906609);

describe("Problem 4", testExecutor.execute);
