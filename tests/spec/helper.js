const fixturesCache = {};
const containerId = 'xjasmine-fixtures';
const fixturesPath = 'http://localhost:9001/tests/spec';

async function XloadFixtures(fixtureUrls) {
  // console.log(JSON.stringify(fixturesCache))
  //should save and restore the body element, not just the container
  let oldcontainer = document.getElementById(containerId);
  // console.log("body before clear", document.body.innerHTML);
  if (oldcontainer) {
    oldcontainer.parentNode.removeChild(oldcontainer);
    oldcontainer = null;
  }
  // console.log("body after clear", document.body.innerHTML);
  const htmlChunks = [];
  for (let i = 0; i < fixtureUrls.length; i++) {
    const url = fixturesPath + "/" + fixtureUrls[i];
    if (fixturesCache[url] === undefined) {
      const response = await fetch(url);
      fixturesCache[url] = await response.text();
    }
    htmlChunks.push(fixturesCache[url]);
  }
  const container = document.createElement('div');
  container.id = containerId;
  container.innerHTML = htmlChunks.join('');

  // console.log("body before append", document.body.innerHTML);
  document.body.appendChild(container);
  // console.log("body after append", document.body.innerHTML);
}

function XunloadFixtures() {
  let oldcontainer = document.getElementById(containerId);
  // console.log("body before clear", document.body.innerHTML);
  if (oldcontainer) {
    oldcontainer.parentNode.removeChild(oldcontainer);
    oldcontainer = null;
  }

  //the container leaks. Lots of code moves elements around to different parent containers. These must be cleaned up.
  let c = document.body.children;
  let scriptCount = 0;
  for (let i = 0; i < c.length; i++) {
    const elt = c[i];
    if (elt.tagName === "SCRIPT" || elt.classList[0] === "jasmine_html-reporter") {
      scriptCount++;
    }
  }
  while (c.length > scriptCount) {
    for (let i = 0; i < c.length; i++) {
      const elt = c[i];
      if (elt.tagName !== "SCRIPT" && elt.classList[0] !== "jasmine_html-reporter") {
        document.body.removeChild(elt);
      }
    }
    c = document.body.children;
  }
}


beforeEach(function () {
  let matchers = {
    toExist: function(util, customEqualityTesters) {
      return {
        compare: function(actual) {
          let result = {};
          result.pass = util.equals(!!actual, true, customEqualityTesters);

          return result;
        }
      };
    },
    toBeHidden: function(util, customEqualityTesters) {
      return {
        compare: function(actual) {
          const style = getComputedStyle(actual);
          let result = {};
          result.pass = util.equals(
            style.getPropertyValue('display'),
            'none',
            customEqualityTesters
          );

          return result;
        }
      };
    },
    toBeVisible: function(util, customEqualityTesters) {
      return {
        compare: function(actual) {
          const style = getComputedStyle(actual);
          let result = {};
          result.pass = !util.equals(
            style.getPropertyValue('display'),
            'none',
            customEqualityTesters
          );

          if (result.pass) {
            result.pass = util.equals(
              style.getPropertyValue('visibility'),
              'visible',
              customEqualityTesters
            );
          }

          return result;
        }
      };
    },
    toHaveClass: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected) {
          let result = {};
          result.pass = util.equals(
            actual.classList.contains(expected),
            true,
            customEqualityTesters
          );

          return result;
        }
      };
    },
    toNotHaveClass: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected) {
          let result = {};
          result.pass = util.equals(
            actual.classList.contains(expected),
            false,
            customEqualityTesters
          );

          return result;
        }
      };
    }
  };

  jasmine.addMatchers(matchers);

  /**
   * Creates standard click event on DOM element
   */
  window.click = function (elem) {
    let evt = document.createEvent('MouseEvent');
    evt.initMouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });

    elem.dispatchEvent(evt);
  };

  window.mouseenter = function (el) {
    let ev = document.createEvent("MouseEvent");
    ev.initMouseEvent(
      "mouseenter",
      true /* bubble */, true /* cancelable */,
      window, null,
      0, 0, 0, 0, /* coordinates */
      false, false, false, false, /* modifier keys */
      0 /*left*/, null
    );
    el.dispatchEvent(ev);
  };

  window.mouseleave = function (el) {
    let ev = document.createEvent("MouseEvent");
    ev.initMouseEvent(
      "mouseleave",
      true /* bubble */, true /* cancelable */,
      window, null,
      0, 0, 0, 0, /* coordinates */
      false, false, false, false, /* modifier keys */
      0 /*left*/, null
    );
    el.dispatchEvent(ev);
  };

  window.keydown = function (el, keycode) {
    let ev = document.createEvent("Events");
    ev.initEvent("keydown", true, true);

    ev.keyCode = keycode;
    ev.which = keycode;

    el.dispatchEvent(ev);
  }

  window.keyup = function (el, keycode) {
    let ev = document.createEvent("Events");
    ev.initEvent("keyup", true, true);

    ev.keyCode = keycode;
    ev.which = keycode;

    el.dispatchEvent(ev);
  }

  window.focus = function (el) {
    let ev = document.createEvent("Events");
    ev.initEvent("focus", true, true);
    el.dispatchEvent(ev);
  }

  window.blur = function (el) {
    let ev = document.createEvent("Events");
    ev.initEvent("blur", true, true);
    el.dispatchEvent(ev);
  }
});
