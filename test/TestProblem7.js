var testExecutor = require("../utils/TestExecutor")("7",
  "should return {{expected}} when searching for the {{n}}th prime"
);
testExecutor.addUseCase({n:6}, 13);
testExecutor.addUseCase({n:10001}, 104743);

describe("Problem 7", testExecutor.execute);
