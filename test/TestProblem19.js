var testExecutor = require("../utils/TestExecutor")("19",
  "Should return {{expected}} when finding the number of Sundays that fell on the first of the month from Jan. 1, 1901 to Jan. 1 {{year}} (up to Dec. 31 of the previous year)"
);
testExecutor.addUseCase({year:1905}, 8);
testExecutor.addUseCase({year:2001}, 171);

describe("Problem 19", testExecutor.execute);
