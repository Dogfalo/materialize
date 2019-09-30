describe("Sidenav Plugin", function () {
  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/tests/spec/sidenav/';
    loadFixtures('sidenavFixture.html');
  });

  describe("Sidenav", function () {
    let normalActivator, normalSidenav;

    beforeEach(function() {
      normalActivator = $('.sidenav-trigger');
      normalSidenav = $('.sidenav');
    });

    afterEach(function() {
      if (M.Sidenav._sidenavs.length) {
        $("#slide-out").sidenav('destroy');
      }
    });

    it("should not break from multiple initializations", function() {
      expect(M.Sidenav._sidenavs.length).toEqual(0, 'no sidenavs initialized');

      $("#slide-out").sidenav();
      $("#slide-out").sidenav();
      $("#slide-out").sidenav();

      expect(M.Sidenav._sidenavs.length).toEqual(1, 'only 1 sidenav initialized after multiple calls on the same element');

      let dragTarget = $($('#slide-out')[0].M_Sidenav.dragTarget);
      expect(dragTarget.length).toEqual(1, 'Should generate only one dragTarget.');

      let overlay = $($('#slide-out')[0].M_Sidenav._overlay);
      expect(overlay.length).toEqual(1, 'Should generate only one overlay.');
    });

    it("should open sidenav from left", function (done) {
      $("#slide-out").sidenav();
      let sidenavRect = normalSidenav[0].getBoundingClientRect();
      let overlay = $($('#slide-out')[0].M_Sidenav._overlay);
      let dragTarget = $($('#slide-out')[0].M_Sidenav.dragTarget);

      expect(dragTarget.length).toEqual(1, 'Should generate only one dragTarget.');
      expect(overlay.length).toEqual(1, 'Should generate only one overlay.');
      expect(sidenavRect.left).toEqual(-sidenavRect.width * 1.05, 'Should be hidden before sidenav is opened.');

      click(normalActivator[0]);

      setTimeout(function() {
        sidenavRect = normalSidenav[0].getBoundingClientRect();
        expect(sidenavRect.left).toEqual(0, 'Should be shown after sidenav is closed.');

        click(overlay[0]);

        done();
      }, 500);
    });

    it("should have working callbacks", function (done) {
      let openStart = false;
      let openEnd = false;
      let closeStart = false;
      let closeEnd = false;

      $("#slide-out").sidenav({
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
      let overlay = $($('#slide-out')[0].M_Sidenav._overlay);

      click(normalActivator[0]);

      expect(openStart).toEqual(true, 'Open start should fire immediately after open');
      expect(openEnd).toEqual(false, 'Open end should not fire immediately after open');

      setTimeout(function() {
        expect(openEnd).toEqual(true, 'Open end should fire after open animation');

        click(overlay[0]);

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
      $("#slide-out").sidenav();
      let overlay = $($('#slide-out')[0].M_Sidenav._overlay);
      let dragTarget = $($('#slide-out')[0].M_Sidenav.dragTarget);
      expect(M.Sidenav._sidenavs.length).toEqual(1, 'one sidenav initialized');
      expect($.contains(document, overlay[0])).toEqual(true, 'overlay should be in DOM');
      expect($.contains(document, dragTarget[0])).toEqual(true, 'dragTarget should be in DOM');
      $("#slide-out").sidenav('destroy');


      setTimeout(function() {
        expect(M.Sidenav._sidenavs.length).toEqual(0, 'sidenav destroyed');
        expect($.contains(document, overlay[0])).toEqual(false, 'overlay should be deleted');
        expect($.contains(document, dragTarget[0])).toEqual(false, 'dragTarget should be deleted');
        done();
      }, 100);
    });
  });
});
