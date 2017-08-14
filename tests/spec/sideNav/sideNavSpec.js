describe("SideNav Plugin", function () {
  beforeEach(function() {
    loadFixtures('sideNav/sideNavFixture.html');
  });

  describe("SideNav", function () {
    var normalActivator, normalSideNav;

    beforeEach(function() {
      normalActivator = $('.button-collapse');
      normalSideNav = $('.side-nav');
    });

    afterEach(function() {
      if (Materialize.SideNav._sideNavs.length) {
        $("#slide-out").sideNav('destroy');
      }
    });

    it("should not break from multiple initializations", function() {
      expect(Materialize.SideNav._sideNavs.length).toEqual(0, 'no sidenavs initialized');

      $("#slide-out").sideNav();
      $("#slide-out").sideNav();
      $("#slide-out").sideNav();

      expect(Materialize.SideNav._sideNavs.length).toEqual(1, 'only 1 sidenav initialized after multiple calls on the same element');

      var dragTarget = $($('#slide-out')[0].M_SideNav.dragTarget);
      expect(dragTarget.length).toEqual(1, 'Should generate only one dragTarget.');

      var overlay = $($('#slide-out')[0].M_SideNav._overlay);
      expect(overlay.length).toEqual(1, 'Should generate only one overlay.');
    });

    it("should open sideNav from left", function (done) {
      $("#slide-out").sideNav();
      var sideNavRect = normalSideNav[0].getBoundingClientRect();
      var overlay = $($('#slide-out')[0].M_SideNav._overlay);
      var dragTarget = $($('#slide-out')[0].M_SideNav.dragTarget);

      expect(dragTarget.length).toEqual(1, 'Should generate only one dragTarget.');
      expect(overlay.length).toEqual(1, 'Should generate only one overlay.');
      expect(sideNavRect.left).toEqual(-sideNavRect.width * 1.05, 'Should be hidden before sideNav is opened.');

      click(normalActivator[0]);

      setTimeout(function() {
        sideNavRect = normalSideNav[0].getBoundingClientRect();
        expect(sideNavRect.left).toEqual(0, 'Should be shown after sideNav is closed.');

        click(overlay[0]);

        done();
      }, 500);
    });

    it("should have working callbacks", function (done) {
      var openStart = false;
      var openEnd = false;
      var closeStart = false;
      var closeEnd = false;

      $("#slide-out").sideNav({
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
      var overlay = $($('#slide-out')[0].M_SideNav._overlay);

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
      expect(Materialize.SideNav._sideNavs.length).toEqual(0, 'no sidenavs initialized');
      $("#slide-out").sideNav();
      var overlay = $($('#slide-out')[0].M_SideNav._overlay);
      var dragTarget = $($('#slide-out')[0].M_SideNav.dragTarget);
      expect(Materialize.SideNav._sideNavs.length).toEqual(1, 'one sidenav initialized');
      expect($.contains(document, overlay[0])).toEqual(true, 'overlay should be in DOM');
      expect($.contains(document, dragTarget[0])).toEqual(true, 'dragTarget should be in DOM');
      $("#slide-out").sideNav('destroy');


      setTimeout(function() {
        expect(Materialize.SideNav._sideNavs.length).toEqual(0, 'sidenav destroyed');
        expect($.contains(document, overlay[0])).toEqual(false, 'overlay should be deleted');
        expect($.contains(document, dragTarget[0])).toEqual(false, 'dragTarget should be deleted');
        done();
      }, 100);
    });
  });
});
