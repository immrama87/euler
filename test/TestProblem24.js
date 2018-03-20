var testExecutor = require("../utils/TestExecutor")("24",
  "should return {{expected}} when searching for the {{n}}th permutation of 0123456789"
);
testExecutor.addUseCase({n:725761}, 2013456789);
testExecutor.addUseCase({n:1000000}, 2783915460);

describe("Problem 24", testExecutor.execute);
