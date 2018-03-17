var testExecutor = require("../utils/TestExecutor")("9",
  "should return {{expected}} when searching for the product of a*b*c in the Pythagorean triplet that satisfies a+b+c={{x}}"
);
testExecutor.addUseCase({x:12}, 60);
testExecutor.addUseCase({x:1000}, 31875000);

describe("Problem 9", testExecutor.execute);
