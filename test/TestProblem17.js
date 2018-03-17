var testExecutor = require("../utils/TestExecutor")("17",
  "should return {{expected}} when searching for the number of letters (discounting spaces and hyphens) from 1 to {{x}}"
);
testExecutor.addUseCase({x:5}, 19);
testExecutor.addUseCase({x:1000}, 21124);

describe("Problem 17", testExecutor.execute);
