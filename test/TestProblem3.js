var testExecutor = require("../utils/TestExecutor")("3",
  "should return {{expected}} when searching for the largest prime factor of {{number}}"
);
testExecutor.addUseCase({number: 13195}, 29);
testExecutor.addUseCase({number: 600851475143}, 6857);

describe("Problem 3", testExecutor.execute);
