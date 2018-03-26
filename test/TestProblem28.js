var testExecutor = require("../utils/TestExecutor")("28",
  "should return {{expected}} when searching for the sum of the diagonals in a {{side}}x{{side}} spiral grid"
);
testExecutor.addUseCase({side:5}, 101);
testExecutor.addUseCase({side:1001}, 669171001);

describe("Problem 28", testExecutor.execute);
