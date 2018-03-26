var testExecutor = require("../utils/TestExecutor")("26",
  "should return {{expected}} when searching for the unit fraction with the longest reciprocal sequence under 1/{{x}}"
);
testExecutor.addUseCase({x:10}, 7);
testExecutor.addUseCase({x:1000}, 983);

describe("Problem 26", testExecutor.execute);
