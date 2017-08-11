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
      $("#slide-out").sideNav();
      $("#slide-out").sideNav();
      $("#slide-out").sideNav();

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
  });
});
