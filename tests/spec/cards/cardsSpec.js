describe( "Cards", function () {
  var reveal;

  beforeEach(function() {
    loadFixtures('cards/cardsFixture.html');
  });

  describe("reveal cards", function () {
    var revealCard;

    beforeEach(function() {
      revealCard = $('.card.reveal');
    });

    it("should have a hidden card-reveal", function (done) {
      var revealDiv = revealCard.find('.card-reveal');
      var activator = revealCard.find('.activator');

      expect(revealDiv).toBeHidden('reveal div should be hidden initially');

      setTimeout(function() {
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
      }, 400);

    });
  });

  describe("image cards", function () {
    var imageCard;

    beforeEach(function() {
      imageCard = $('.card.image');
    });

    it("should have an image that fills to full width of card", function () {
      var image = imageCard.find('.card-image > img');

      expect(image.outerWidth()).toEqual(imageCard.outerWidth(), 'image does not fill width of card');
      expect(image.offset().top).toEqual(imageCard.offset().top, 'image was not as in the same y as card.');
    });
  });


  describe("sized cards", function () {
    var small, medium, large;

    beforeEach(function() {
      small = $('.card.small');
      medium = $('.card.medium');
      large = $('.card.large');
    });

    it("should have small card dimensions", function () {
      var cardImage = small.find('.card-image');
      var cardContent = small.find('.card-content');
      var cardAction = small.find('.card-action');

      expect(small.outerHeight()).toEqual(300, 'small card should be 300px high');
      expect(cardImage.outerHeight()).toBeLessThan(181, 'small image should be <= 180px or 60% high');
      expect(cardContent.outerHeight()).toBeLessThan(121, 'small content should be <= 120px or 40% high');
      expect(cardAction.offset().top + cardAction.outerHeight())
        .toEqual(small.offset().top + small.outerHeight(), 'small action should be at bottom of card');
    });

    it("should have medium card dimensions", function () {
      var cardImage = medium.find('.card-image');
      var cardContent = medium.find('.card-content');
      var cardAction = medium.find('.card-action');

      expect(medium.outerHeight()).toEqual(400, 'medium card should be 400px high');
      expect(cardImage.outerHeight()).toBeLessThan(241, 'medium image should be <= 240 or 60% high');
      expect(cardContent.outerHeight()).toBeLessThan(161, 'medium content should be <= 160px or 40% high');
      expect(cardAction.offset().top + cardAction.outerHeight())
        .toEqual(medium.offset().top + medium.outerHeight(), 'medium action should be at bottom of card');
    });

    it("should have large card dimensions", function () {
      var cardImage = large.find('.card-image');
      var cardContent = large.find('.card-content');
      var cardAction = large.find('.card-action');

      expect(large.outerHeight()).toEqual(500, 'large card should be 500px high');
      expect(cardImage.outerHeight()).toBeLessThan(301, 'large image should be <= 300 or 60% high');
      expect(cardContent.outerHeight()).toBeLessThan(201, 'large content should be <= 200 or 40% high');
      expect(cardAction.offset().top + cardAction.outerHeight())
        .toEqual(large.offset().top + large.outerHeight(), 'large action should be at bottom of card');
    });
  });

});
