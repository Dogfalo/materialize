jasmine.getFixtures().fixturesPath = 'tests/spec';

describe( "Cards", function () {
  var reveal;

  beforeEach(function() {
    loadFixtures('cards/cardsFixture.html');
    revealCard = $('.card.reveal');
  });

  describe( "reveal", function () {

    it("should have a hidden card-reveal", function (done) {
      var revealDiv = revealCard.find('.card-reveal');
      var activator = revealCard.find('.activator');

      expect(revealDiv).toExist('reveal div does not exist');
      expect(revealDiv).toBeHidden('reveal div should be hidden initially');
      expect(activator).toExist('activator does not exist');

      activator.click();

      setTimeout(function() {
        expect(revealDiv).toBeVisible('reveal did not appear after activator was clicked.');

        // Check revealDiv covers reveal card.
        expect(revealDiv.outerWidth()).toEqual(revealCard.outerWidth(), 'activator was not as wide as reveal card.');
        expect(revealDiv.outerHeight()).toEqual(revealCard.outerHeight(), 'activator was not as high as reveal card.');
        expect(revealDiv.offset().top).toEqual(revealCard.offset().top, 'activator was not as in the same y as reveal card.');
        expect(revealDiv.offset().left).toEqual(revealCard.offset().left, 'activator was not as in the same x as reveal card.');

        done();
      }, 400);

    });
  });

});
