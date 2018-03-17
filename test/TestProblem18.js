var testExecutor = require("../utils/TestExecutor")("18",
  "should return {{expected}} when finding the highest value route through a triangle of integers"
);
testExecutor.addUseCase({}, 1074);
describe("Problem 18", testExecutor.execute);
