var assert = require('assert');
var MathUtils = require("../utils/MathUtils");

describe("MathUtils", function(){
  describe("BigIntString", function(){
    it("should throw an error when initialized with a bad number (even scientific notation)", function(){
      try{
        var int = new MathUtils.BigIntString("1.0231421241e17");
      }
      catch(err){
        assert.ok(err == "The number 1.0231421241e17 is not a valid number string. If the number is presented in scientific notation, it will be necessary to refactor the code to create the BigIntString earlier and perform transforms.");
      }
    });

    describe("#add", function(){
      it("should return 1024679135802467913580246791358024679135802467913580246791 when adding 456789012345678901234567890123456789012345678901234567890 and 567890123456789012345678901234567890123456789012345678901", function(){
        var int = new MathUtils.BigIntString("456789012345678901234567890123456789012345678901234567890");
        int.add("567890123456789012345678901234567890123456789012345678901");

        assert.equal(int.value(), "1024679135802467913580246791358024679135802467913580246791");
      });

      it("should return -111101111111110111111111011111111101111111110111111111011 when adding 456789012345678901234567890123456789012345678901234567890 and -567890123456789012345678901234567890123456789012345678901", function(){
        var int = new MathUtils.BigIntString("456789012345678901234567890123456789012345678901234567890");
        int.add("-567890123456789012345678901234567890123456789012345678901");

        assert.equal(int.value(), "-111101111111110111111111011111111101111111110111111111011");
      });
    });

    describe("#subtract", function(){
      it("should return -111101111111110111111111011111111101111111110111111111011 when subtracting 567890123456789012345678901234567890123456789012345678901 from 456789012345678901234567890123456789012345678901234567890", function(){
        var subInt = new MathUtils.BigIntString("456789012345678901234567890123456789012345678901234567890");
        subInt.subtract("567890123456789012345678901234567890123456789012345678901");

        assert.equal(subInt.value(), "-111101111111110111111111011111111101111111110111111111011");
      });
      it("should return 1024679135802467913580246791358024679135802467913580246791 when subtracting -567890123456789012345678901234567890123456789012345678901 from 456789012345678901234567890123456789012345678901234567890", function(){
        var subInt = new MathUtils.BigIntString("456789012345678901234567890123456789012345678901234567890");
        subInt.subtract("-567890123456789012345678901234567890123456789012345678901");

        assert.equal(subInt.value(), "1024679135802467913580246791358024679135802467913580246791");
      });
    });

    describe("#multiply", function(){
      it("should return 259405912220987591222098759122209875912220987591222098759052100 when multiplying 456789012345678901234567890123456789012345678901234567890 by 567890", function(){
        var int = new MathUtils.BigIntString("456789012345678901234567890123456789012345678901234567890");
        int.multiply("567890");

        assert.equal(int.value(), "259405912220987591222098759122209875912220987591222098759052100");
      });
      it("should return -259405912220987591222098759122209875912220987591222098759052100 when multiplying 456789012345678901234567890123456789012345678901234567890 by -567890", function(){
        var int = new MathUtils.BigIntString("456789012345678901234567890123456789012345678901234567890");
        int.multiply("-567890");

        assert.equal(int.value(), "-259405912220987591222098759122209875912220987591222098759052100");
      });
      it("should return 259405912220987591222098759122209875912220987591222098759052100 when multiplying -456789012345678901234567890123456789012345678901234567890 by -567890", function(){
        var int = new MathUtils.BigIntString("-456789012345678901234567890123456789012345678901234567890");
        int.multiply("-567890");

        assert.equal(int.value(), "259405912220987591222098759122209875912220987591222098759052100");
      });
    });

  });

  describe("#getFactorsOf", function(){
    it("should return 1, 2, 4, 8 (only once), 16 and 32 when factoring 64 and nothing more", function(){
      var factors = MathUtils.getFactorsOf(64);

      assert.equal(factors.length, 6);
      assert.equal(factors.indexOf(1), 0);
      assert.equal(factors.indexOf(2), 1);
      assert.equal(factors.indexOf(32), 2);
      assert.equal(factors.indexOf(4), 3);
      assert.equal(factors.indexOf(16), 4);
      assert.equal(factors.indexOf(8), 5);
    });
    it("should return 1 when factoring 7 and nothing more", function(){
      var factors = MathUtils.getFactorsOf(7);

      assert.equal(factors.length, 1);
      assert.equal(factors.indexOf(1), 0);
    });
  });

  describe("#getPrimeFactorsOf", function(){
    it("should return 1 and 2 when factoring 64", function(){
      var factors = MathUtils.getPrimeFactorsOf(64, true);

      assert.equal(factors.length, 2);
      assert.equal(factors.indexOf(1), 0);
      assert.equal(factors.indexOf(2), 1);
    });

    it("should return 2, 6 times, when getting the prime fingerprint of 64", function(){
      var fingerprint = MathUtils.getPrimeFactorsOf(64);

      assert.equal(fingerprint.length, 6);
      assert.equal(fingerprint.indexOf(2), 0);
      assert.equal(fingerprint.lastIndexOf(2), 5);
    });
  });

  describe("#isPrime", function(){
    it("should return true when determining if 523 is prime", function(){
      assert.ok(MathUtils.isPrime(523));
    });

    it("should return false when determining if 525 is prime", function(){
      assert.ok(!MathUtils.isPrime(525));
    });
  });

  describe("#isPrimeSequential", function(){
    it("should return the list of primes below 250,000 slightly faster than #isPrime", function(){
      this.timeout(10000);
      var primes = [];
      var startTime = new Date().getTime();
      for(var i=1;i<=250000;i++){
        if(MathUtils.isPrime(i)){
          primes.push(i);
        }
      }
      var endTime = new Date().getTime();
      var isPrimeRunTime = endTime - startTime;

      var primesSequential = [];
      var startSequential = new Date().getTime();
      for(var i=1;i<=250000;i++){
        if(MathUtils.isPrimeSequential(i)){
          primesSequential.push(i);
        }
      }
      var endSequential = new Date().getTime();
      var isPrimeSequentialRunTime = endSequential - startSequential;
      var difference = isPrimeSequentialRunTime - isPrimeRunTime;

      assert.equal(primes.length, primesSequential.length);
      assert.ok(difference < 0, "#isPrime was faster by " + difference + "ms");
    });
  });
});
