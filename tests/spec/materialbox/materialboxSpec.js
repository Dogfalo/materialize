describe( 'Materialbox:', function() {
  let transformMaterialbox;

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/tests/spec/materialbox/';
    loadFixtures('materialboxFixture.html');
  });

  describe('Materialbox opens correctly with transformed ancestor', function() {
    it('Opens a correctly placed overlay when clicked', function(done) {
      transformMaterialbox = $('#transformTest');
      $('.materialboxed').materialbox();

      // Mouse click
      transformMaterialbox.find('.materialboxed').trigger('click');
      setTimeout(function() {
        // Check overlay is attached
        let overlay = transformMaterialbox.find('#materialbox-overlay');
        let overlayRect = overlay[0].getBoundingClientRect();
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        expect(overlay).toExist('because it is generated on init');
        expect(overlay).toBeVisible('because materialbox was clicked');
        expect(overlayRect.top).toEqual(0);
        expect(overlayRect.left).toEqual(0);
        expect(overlayRect.width).toEqual(windowWidth);
        expect(overlayRect.height).toEqual(windowHeight);

        done();
      }, 1000);
    });
  });

});
