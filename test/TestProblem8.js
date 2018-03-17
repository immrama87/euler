var testExecutor = require("../utils/TestExecutor")("8",
  "should return {{expected}} when searching for the largest product of {{n}} adjacent digits in a 1000-digit number"
);
testExecutor.addUseCase({n:4}, 5832);
testExecutor.addUseCase({n:13}, 23514624000);

describe("Problem 8", testExecutor.execute);
