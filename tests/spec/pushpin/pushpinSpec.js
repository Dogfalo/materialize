describe('Pushpin Plugin', function() {
  var top, bottom;

  beforeEach(function() {
    top = 100;
    bottom = 300;

    Materialize.callbackPinnedFunc = function() {
      return 'Callback for pinned';
    };
    Materialize.callbackPinTopFunc = function() {
      return 'Callback for pin-top';
    };
    Materialize.callbackPinBottomFunc = function() {
      return 'Callback for pin-bottom';
    };

    loadFixtures('pushpin/pushpinFixture.html');
    spyOn(Materialize, 'callbackPinnedFunc').and.callThrough();
    spyOn(Materialize, 'callbackPinTopFunc').and.callThrough();
    spyOn(Materialize, 'callbackPinBottomFunc').and.callThrough();

    $('#pushpin-element').pushpin({
      top: top,
      bottom: bottom,
      onPinned: Materialize.callbackPinnedFunc,
      onPinTop: Materialize.callbackPinTopFunc,
      onPinBottom: Materialize.callbackPinBottomFunc
    });
  });

  describe('Pushpin', function() {

    it('should fire callback function when enters the "pinned" state', function(done) {
      // Scroll to below the top breakpoint
      window.scrollTo(0, top + 50);

      // The callback function should be fired that it is pinned
      setTimeout(function() {
        expect(Materialize.callbackPinnedFunc.calls.count()).toBe(1);
        expect(Materialize.callbackPinTopFunc.calls.count()).toBe(1);
        expect(Materialize.callbackPinBottomFunc.calls.count()).toBe(0);
        done();
      }, 400);
    });

    it('should fire callback function when enters the "pin-top" state', function(done) {
      // Scroll to above the top breakpoint
      window.scrollTo(0, top - 50);

      // The callback function should be fired that we are above
      setTimeout(function() {
        expect(Materialize.callbackPinnedFunc.calls.count()).toBe(1);
        expect(Materialize.callbackPinTopFunc.calls.count()).toBe(1);
        expect(Materialize.callbackPinBottomFunc.calls.count()).toBe(0);
        done();
      }, 400);
    });

    it('should fire callback function when enters the "pin-bottom" state', function(done) {
      // Scroll to below the bottom breakpoint
      window.scrollTo(0, bottom + 50);

      // The callback function should be fired that we are below
      setTimeout(function() {
        expect(Materialize.callbackPinnedFunc.calls.count()).toBe(0);
        expect(Materialize.callbackPinTopFunc.calls.count()).toBe(1);
        expect(Materialize.callbackPinBottomFunc.calls.count()).toBe(1);
        done();
      }, 400);
    });

  });
});
