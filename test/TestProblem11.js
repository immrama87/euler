var testExecutor = require("../utils/TestExecutor")("11",
  "should return {{expected}} when searching for the largest product of four adjacent (up, down, left, right, diagonal) numbers in a grid"
);
testExecutor.addUseCase({}, 70600674);

describe("Problem 11", testExecutor.execute);
