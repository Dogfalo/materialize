describe("SideNav Plugin", function () {
  beforeEach(function() {
    loadFixtures('sideNav/sideNavFixture.html');
    $(".button-collapse").sideNav();
  });

  describe("SideNav", function () {
    var normalActivator, normalSideNav;

    beforeEach(function() {
      normalActivator = $('.button-collapse');
      normalSideNav = $('.side-nav');
    });

    it("should not break from multiple initializations", function() {
      $(".button-collapse").sideNav();
      $(".button-collapse").sideNav();
      $(".button-collapse").sideNav();

      var dragTarget = $('.drag-target[data-sidenav="' + normalActivator.attr('data-activates') + '"]');
      var dragTargetEvents = $._data(dragTarget[0], 'events');
      expect(dragTarget.length).toEqual(1, 'Should generate only one dragTarget.');
      expect(dragTargetEvents.click.length).toEqual(1, 'Should only bind 1 click handler on activator');
      expect(dragTargetEvents.pan.length).toEqual(1, 'Should only bind 1 pan handler on activator');
      expect(dragTargetEvents.panend.length).toEqual(1, 'Should only bind 1 panend handler on activator');

      var normalActivatorEvents = $._data(normalActivator[0], 'events');
      expect(normalActivatorEvents.click.length).toEqual(1, 'Should only bind 1 click handler on activator');
    });

    it("should open sideNav from left", function (done) {
      var sideNavRect = normalSideNav[0].getBoundingClientRect();
      var overlay = $('[id="sidenav-overlay"]');
      var dragTarget = $('.drag-target[data-sidenav="' + normalActivator.attr('data-activates') + '"]');

      expect(dragTarget.length).toEqual(1, 'Should generate only one dragTarget.');
      expect(overlay.length).toEqual(0, 'Overlay should not be generated before sideNav is opened.');
      expect(sideNavRect.left).toEqual(-sideNavRect.width, 'Should be hidden before sideNav is opened.');

      normalActivator.click();

      setTimeout(function() {
        sideNavRect = normalSideNav[0].getBoundingClientRect();
        overlay = $('[id="sidenav-overlay"]');
        expect(overlay.length).toEqual(1, 'Should generate only one overlay.');
        expect(sideNavRect.left).toEqual(0, 'Should be shown after sideNav is closed.');

        overlay.click();

        setTimeout(function() {
          overlay = $('[id="sidenav-overlay"]');
          expect(overlay.length).toEqual(0, 'Overlay should be removed after sideNav is closed.');

          done();
        }, 500);
      }, 500);
    });
  });
});
