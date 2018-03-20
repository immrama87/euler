var testExecutor = require("../utils/TestExecutor")("22",
  "should return {{expected}} when summing the names scores in the file /data/p022_names.txt"
);
testExecutor.addUseCase({}, 871198282);
describe("Problem 22", testExecutor.execute);
