jasmine.getFixtures().fixturesPath = 'tests/spec';

beforeEach(function() {

  /**
   * Creates standard click event on DOM element
   */
  window.click = function(elem) {
    var evt = document.createEvent('MouseEvent');
    evt.initMouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });

    elem.dispatchEvent(evt);
  };

  window.mouseenter = function(el) {
    var ev = document.createEvent("MouseEvent");
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

  window.keydown = function(el, keycode) {
    var ev = document.createEvent("Events");
    ev.initEvent("keydown", true, true);

    ev.keyCode = keycode;
    ev.which = keycode;

    el.dispatchEvent(ev);
  }

  window.keyup = function(el, keycode) {
    var ev = document.createEvent("Events");
    ev.initEvent("keyup", true, true);

    ev.keyCode = keycode;
    ev.which = keycode;

    el.dispatchEvent(ev);
  }

  window.focus = function(el) {
    var ev = document.createEvent("Events");
    ev.initEvent("focus", true, true);
    el.dispatchEvent(ev);
  }
});
