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
});
