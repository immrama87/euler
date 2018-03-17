var testExecutor = require("../utils/TestExecutor")("15",
  "should return {{expected}} when searching for the number of right/down paths from top-left to bottom-right of a {{side}}x{{side}} lattice grid"
);
testExecutor.addUseCase({side:2}, 6);
testExecutor.addUseCase({side:20}, 137846528820);

describe("Problem 15", testExecutor.execute);
