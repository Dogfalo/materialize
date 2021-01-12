describe("Sidenav Plugin", function () {

  beforeEach(async function() {
    await XloadFixtures(['sidenav/sidenavFixture.html']);
  });
  afterEach(function(){
    XunloadFixtures();
  });

  describe("Sidenav", function () {
    var normalActivator, normalSidenav;

    beforeEach(function() {
      normalActivator = document.querySelector('.sidenav-trigger');
      normalSidenav = document.querySelector('.sidenav');
    });

    afterEach(function() {
      if (M.Sidenav._sidenavs.length) {
        M.Sidenav.getInstance(document.querySelector("#slide-out")) .destroy();
      }
    });

    it("should not break from multiple initializations", function() {
      expect(M.Sidenav._sidenavs.length).toEqual(0, 'no sidenavs initialized');

      M.Sidenav.init(document.querySelector("#slide-out"));
      M.Sidenav.init(document.querySelector("#slide-out"));
      M.Sidenav.init(document.querySelector("#slide-out"));

      expect(M.Sidenav._sidenavs.length).toEqual(1, 'only 1 sidenav initialized after multiple calls on the same element');

      let dragTarget = document.querySelectorAll('.drag-target');
      expect(dragTarget.length).toEqual(1, 'Should generate only one dragTarget.');

      let overlay = document.querySelectorAll('.sidenav-overlay');
      expect(overlay.length).toEqual(1, 'Should generate only one overlay.');
    });

    it("should open sidenav from left", function (done) {
      let slideOutSlidenav = M.Sidenav.init(document.querySelector("#slide-out"));
      let sidenavRect = normalSidenav.getBoundingClientRect();
      let overlay = document.querySelectorAll('.sidenav-overlay');
      let dragTarget = document.querySelectorAll('.drag-target');

      expect(dragTarget.length).toEqual(1, 'Should generate only one dragTarget.');
      expect(overlay.length).toEqual(1, 'Should generate only one overlay.');
      expect(sidenavRect.left).toEqual(-sidenavRect.width * 1.05, 'Should be hidden before sidenav is opened.');

      click(normalActivator);

      setTimeout(function() {
        sidenavRect = normalSidenav.getBoundingClientRect();
        expect(sidenavRect.left).toEqual(0, 'Should be shown after sidenav is closed.');

        click(slideOutSlidenav._overlay);

        done();
      }, 500);
    });

    it("should have working callbacks", function (done) {
      let openStart = false;
      let openEnd = false;
      let closeStart = false;
      let closeEnd = false;

      let sidenav = M.Sidenav.init(document.querySelector("#slide-out"), {
        onOpenStart: function() {
          openStart = true;
        },
        onOpenEnd: function() {
          openEnd = true;
        },
        onCloseStart: function() {
          closeStart = true;
        },
        onCloseEnd: function() {
          closeEnd = true;
        }
      });
      let overlay = sidenav._overlay;

      click(normalActivator);

      expect(openStart).toEqual(true, 'Open start should fire immediately after open');
      expect(openEnd).toEqual(false, 'Open end should not fire immediately after open');

      setTimeout(function() {
        expect(openEnd).toEqual(true, 'Open end should fire after open animation');

        click(overlay);

        expect(closeStart).toEqual(true, 'Close start should fire immediately after close');
        expect(closeEnd).toEqual(false, 'Close end should not fire immediately after close');

        setTimeout(function() {
          expect(closeEnd).toEqual(true, 'Close end should fire after close animation');

          done();
        }, 400);
      }, 400);
    });

    it("should destroy correctly", function (done) {
      expect(M.Sidenav._sidenavs.length).toEqual(0, 'no sidenavs initialized');
      let sidenav = M.Sidenav.init(document.querySelector("#slide-out"));
      let overlay = sidenav._overlay;
      let dragTarget = sidenav.dragTarget;
      expect(M.Sidenav._sidenavs.length).toEqual(1, 'one sidenav initialized');
      expect(document.contains(overlay)).toEqual(true, 'overlay should be in DOM');
      expect(document.contains(dragTarget)).toEqual(true, 'dragTarget should be in DOM');
      sidenav.destroy();


      setTimeout(function() {
        expect(M.Sidenav._sidenavs.length).toEqual(0, 'sidenav destroyed');
        expect(document.contains(overlay)).toBeFalse('overlay should be deleted');
        expect(document.contains(dragTarget)).toBeFalse('dragTarget should be deleted');
        done();
      }, 100);
    });
  });
});
