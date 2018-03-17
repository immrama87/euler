var testExecutor = require("../utils/TestExecutor")("1",
  "should return {{expected}} when given {{maximum}} as a maximum and {{x}} and {{y}} as the multiples to search for"
);
testExecutor.addUseCase({
  maximum: 10,
  x: 3,
  y:5
}, 23);

testExecutor.addUseCase({
  maximum: 1000,
  x: 3,
  y: 5
}, 233168);

describe("Problem 1", testExecutor.execute);
