describe("Input Fields Plugin", function() {
  var inputTypes = [
    {"type": "input[type=text]", "goodValue": "Materialize CSS", "badValue": ""},
    {"type": "input[type=password]", "goodValue": "Materialize CSS", "badValue": ""},
    {"type": "input[type=email]", "goodValue": "contact@materialize.com", "badValue": ""},
    {"type": "input[type=url]", "goodValue": "http://materialize-css.com", "badValue": ""},
    {"type": "input[type=tel]", "goodValue": "0123456789", "badValue": ""},
    {"type": "input[type=number]", "goodValue": 10, "badValue": ""},
    {"type": "input[type=search]", "goodValue": "Materialize CSS", "badValue": ""},
    {"type": "textarea", "goodValue": "Materialize CSS", "badValue": ""}
  ];
  var inputsBrowser = {};

  function testEachInput(index, fnPredicate, fnExpect, done) {
    if (index >= inputTypes.length) {
      done();
      return;
    }
    fnPredicate(inputsBrowser[inputTypes[index].type], function() {
      setTimeout(function() {
        fnExpect(inputsBrowser[inputTypes[index].type], function() {
          testEachInput(index + 1, fnPredicate, fnExpect, done);
        });
      }, 200);
    });
  }

  beforeEach(function() {
    loadFixtures('forms/inputfields/inputfieldsFixture.html');

    inputTypes.forEach(function(type) {
      inputsBrowser[type.type] = {};
      inputsBrowser[type.type].input = $(type.type);
      inputsBrowser[type.type].label = inputsBrowser[type.type].input.siblings("label");
      inputsBrowser[type.type].badValue = type.badValue;
      inputsBrowser[type.type].goodValue = type.goodValue;
    });
  });

  describe("Input and textarea", function() {
    it("should have label not active when input have not focused", function() {
      inputTypes.forEach(function(type) {
        expect(inputsBrowser[type.type].label.hasClass("active")).toBe(false);
      });
    });

    it("should have label active when input have focused", function(done) {
      testEachInput(
        0,
        function(inputBrowser, next) {
          inputBrowser.input.focus();
          next();
        },
        function(inputBrowser, next) {
          expect(inputBrowser.label.hasClass("active")).toBe(true);
          next();
        },
        done
      );
    });

    it("should have label active when input have value", function(done) {
      testEachInput(
        0,
        function(inputBrowser, next) {
          inputBrowser.input.focus();
          inputBrowser.input.val(inputBrowser.goodValue);
          next();
        },
        function(inputBrowser, next) {
          expect(inputBrowser.label.hasClass("active")).toBe(true);
          next();
        },
        done
      );
    });

    it("should have label not active when input have no value", function(done) {
      testEachInput(
        0,
        function(inputBrowser, next) {
          inputBrowser.input.focus();
          inputBrowser.input.blur();
          next();
        },
        function(inputBrowser, next) {
          expect(inputBrowser.label.hasClass("active")).toBe(false);
          next();
        },
        done
      );
    });

    it("should have label not active when input is reset (by user)", function(done) {
      testEachInput(
        0,
        function(inputBrowser, next) {
          inputBrowser.input.focus();
          inputBrowser.input.val(inputBrowser.goodValue);
          setTimeout(function() {
            inputBrowser.input.val("");
            inputBrowser.input.blur();
            setTimeout(function() {
              next();
            }, 100);
          }, 100);
        },
        function(inputBrowser, next) {
          expect(inputBrowser.label.hasClass("active")).toBe(false);
          next();
        },
        done
      );
    });

    it("should have label not active when input is reset (by button)", function(done) {
      testEachInput(
        0,
        function(inputBrowser, next) {
          inputBrowser.input.focus();
          inputBrowser.input.val(inputBrowser.goodValue);
          inputBrowser.input.blur();

          setTimeout(function() {
            $("input[type=reset]").click();
            next();
          }, 200);
        },
        function(inputBrowser, next) {
          expect(inputBrowser.label.hasClass("active")).toBe(false);
          next();
        },
        done
      );
    });
  });

  describe("Input with placeholder", function() {
    beforeEach(function(done){
      Object.keys(inputsBrowser).forEach(function(inputType){
        inputsBrowser[inputType].input.prop("placeholder", inputsBrowser[inputType].goodValue);
      });

      setTimeout(function(){
        Materialize.updateTextFields();
        done();
      }, 400);
    });

    it("Should have label active by default", function() {
      inputTypes.forEach(function(type) {
        expect(inputsBrowser[type.type].label.hasClass("active")).toBe(true);
      });
    });

    it("Should have label active when input has focus and lost it", function(done) {
      testEachInput(
        0,
        function(inputBrowser, next) {
          inputBrowser.input.focus();
          inputBrowser.input.blur();
          next();
        },
        function(inputBrowser, next) {
          expect(inputBrowser.label.hasClass("active")).toBe(true);
          next();
        },
        done
      );
    });

    it("Should have label active when user set value", function(done) {
      testEachInput(
        0,
        function(inputBrowser, next) {
          inputBrowser.input.focus();
          inputBrowser.input.val(inputBrowser.goodValue);
          inputBrowser.input.blur();
          next();
        },
        function(inputBrowser, next) {
          expect(inputBrowser.label.hasClass("active")).toBe(true);
          next();
        },
        done
      );
    });

    it("Should have label active when user set value and remove it", function(done) {
      testEachInput(
        0,
        function(inputBrowser, next) {
          inputBrowser.input.focus();
          inputBrowser.input.val(inputBrowser.goodValue);
          inputBrowser.input.blur();

          setTimeout(function(){
            inputBrowser.input.focus();
            inputBrowser.input.val("");
            inputBrowser.input.blur();
            next();
          }, 200);
        },
        function(inputBrowser, next) {
          expect(inputBrowser.label.hasClass("active")).toBe(true);
          next();
        },
        done
      );
    });
  });

  describe("Input validation", function() {
    beforeEach(function(done) {
      Object.keys(inputsBrowser).forEach(function(inputType){
        inputsBrowser[inputType].input.addClass("validate")
        .prop("required", true);
      });

      setTimeout(function(){
        Materialize.updateTextFields();
        done();
      }, 400);
    });

    it("Should be valid when input lost focus", function(done) {
      testEachInput(
        0,
        function(inputBrowser, next) {
          inputBrowser.input.focus();
          inputBrowser.input.val(inputBrowser.goodValue);

          setTimeout(function() {
            inputBrowser.input.blur();
            next();
          }, 200);
        },
        function(inputBrowser, next) {
          expect(inputBrowser.input.hasClass("invalid")).toBe(false);
          next();
        },
        done
      );
    });

    it("Should be invalid when input lost focus", function(done) {
      testEachInput(
        0,
        function(inputBrowser, next) {
          inputBrowser.input.focus();
          inputBrowser.input.val(inputBrowser.badValue);

          setTimeout(function() {
            inputBrowser.input.blur();
            next();
          }, 200);
        },
        function(inputBrowser, next) {
          expect(inputBrowser.input.hasClass("invalid")).toBe(true);
          next();
        },
        done
      );
    });
  });
});
