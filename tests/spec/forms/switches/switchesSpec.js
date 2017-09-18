describe("Switch Plugins", function() {
  // Maybe there is better idea to get/store de default value
  // These value are extracted from the files : sass/components/forms/_switches.scss and sass/components/_variables.scss
  var colorOff = {
    ".lever": {
      "background-color": "rgba(0, 0, 0, 0.380392)"
    },
    ".lever::after": {
      "background-color": "rgb(241, 241, 241)"
    }
  };
  var colorOn = {
    ".lever": {
      "background-color": "rgb(132, 199, 193)"
    },
    ".lever::after": {
      "background-color": "rgb(38, 166, 154)"
    }
  };
  var colorDisabled = {
    ".lever": {
      "background-color": "rgba(0, 0, 0, 0.117647)"
    },
    ".lever::after": {
      "background-color": "rgb(148, 148, 148)"
    }
  };

  function testState($switch, state) {
    Object.keys(state).forEach(function(selector) {
      var $selector;
      var contentSelector;

      if (selector.search(":") === -1)
        $selector = $switch.find(selector)
      else {
        var selectorSplitted = selector.split("::");

        $selector = $switch.find(selectorSplitted[0]);
        contentSelector = "::" + selectorSplitted[1];
      }

      Object.keys(state[selector]).forEach(function(cssStyle) {
        if ("undefined" === typeof contentSelector)
          expect($selector.css(cssStyle)).toBe(state[selector][cssStyle]);
        else {
          expect(window.getComputedStyle($selector[0], contentSelector)[cssStyle])
            .toBe(state[selector][cssStyle]);
        }
      });
    });
  }

  beforeEach(function() {
    loadFixtures("forms/switches/switchesFixture.html");
  });

  it("Should be off by default", function() {
    testState($(".switch"), colorOff);
  });

  it("Should be on when user clicked on it", function(done) {
    var $switch = $(".switch");

    $switch.find("label").click();
    setTimeout(function() {
      testState($switch, colorOn);
      done();
    }, 400);
  });

  it("Should be on if checked is true", function(done) {
    var $switch = $(".switch");

    $switch.find("input[type=checkbox]").prop("checked", true);
    setTimeout(function() {
      testState($switch, colorOn);
      done();
    }, 400);
  });

  it("Shouldn't change on user interaction if disabled is true", function(done) {
    var $switch = $(".switch");

    $switch.find("input[type=checkbox]").prop("disabled", true);
    testState($switch, colorDisabled);
    $switch.find("label").click();
    setTimeout(function() {
      testState($switch, colorDisabled);
      done();
    }, 400);
  });
});
