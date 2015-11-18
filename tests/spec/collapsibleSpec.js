jasmine.getFixtures().fixturesPath = 'tests/fixtures';

describe( "Collapsible Plugin", function () {
  var elem;

  beforeEach(function() {
    loadFixtures('collapsible.html');
    elem = $('.collapsible');
    elem.collapsible();
  });

  describe( "collapsible header", function () {
    it("opens", function () {
      var firstHeader = elem.find('.collapsible-header').first();
      var firstBody = elem.find('.collapsible-body').first();
      firstHeader.click();
      var firstBodyHeight = firstBody.css('height');

      expect(firstBodyHeight).toBeGreaterThan(0);

    });
  });
});