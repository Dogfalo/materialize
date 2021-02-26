describe( "Cards", function () {
  beforeEach(async function() {
    await XloadFixtures(['cards/cardsFixture.html']);
  });

  afterEach(function(){
    XunloadFixtures();
  });

  describe("reveal cards", function () {
    let revealCard;

    beforeEach(function() {
      revealCard = document.querySelector('.card.reveal');
    });

    it("should have a hidden card-reveal", function (done) {
      let revealDiv = revealCard.querySelector('.card-reveal');
      let activator = revealCard.querySelector('.activator');

      expect(revealDiv).toBeHidden('reveal div should be hidden initially');

      setTimeout(function() {
        click(activator);

        setTimeout(function() {
          expect(revealDiv).toBeVisible('reveal did not appear after activator was clicked.');

          // Check revealDiv covers reveal card.
          let revealDivPositions = revealDiv.getBoundingClientRect();
          let revealCardPositions = revealCard.getBoundingClientRect();
          expect(revealDivPositions.width).toEqual(revealCardPositions.width, 'activator was not as wide as reveal card.');
          expect(revealDivPositions.height).toEqual(revealCardPositions.height, 'activator was not as high as reveal card.');
          expect(revealDivPositions.top).toEqual(revealCardPositions.top, 'activator was not as in the same y as reveal card.');
          expect(revealDivPositions.left).toEqual(revealCardPositions.left, 'activator was not as in the same x as reveal card.');

          done();
        }, 400);
      }, 400);

    });
  });

  describe("image cards", function () {
    let imageCard;

    beforeEach(function() {
      imageCard = document.querySelector('.card.image');
    });

    it("should have an image that fills to full width of card", function () {
      let image = imageCard.querySelector('.card-image > img');
      let imagePositions = image.getBoundingClientRect();
      let imageCardPositions = imageCard.getBoundingClientRect();

      expect(imagePositions.width).toEqual(imageCardPositions.width, 'image does not fill width of card');
      expect(imagePositions.top).toEqual(imageCardPositions.top, 'image was not as in the same y as card.');
    });
  });


  describe("sized cards", function () {
    let small, medium, large;

    beforeEach(function() {
      small = document.querySelector('.card.small');
      medium = document.querySelector('.card.medium');
      large = document.querySelector('.card.large');
    });

    it("should have small card dimensions", function () {
      let cardImage = small.querySelector('.card-image');
      let cardContent = small.querySelector('.card-content');
      let cardAction = small.querySelector('.card-action');
      let smallRect = small.getBoundingClientRect();
      let cardImageRect = cardImage.getBoundingClientRect();
      let cardContentRect = cardContent.getBoundingClientRect();
      let cardActionRect = cardAction.getBoundingClientRect();

      expect(smallRect.height).toEqual(300, 'small card should be 300px high');
      expect(cardImageRect.height).toBeLessThan(181, 'small image should be <= 180px or 60% high');
      expect(cardContentRect.height).toBeLessThan(121, 'small content should be <= 120px or 40% high');
      expect(cardActionRect.top + cardActionRect.height)
        .toEqual(smallRect.top + smallRect.height, 'small action should be at bottom of card');
    });

    it("should have medium card dimensions", function () {
      let cardImage = medium.querySelector('.card-image');
      let cardContent = medium.querySelector('.card-content');
      let cardAction = medium.querySelector('.card-action');
      let mediumRect = medium.getBoundingClientRect();
      let cardImageRect = cardImage.getBoundingClientRect();
      let cardContentRect = cardContent.getBoundingClientRect();
      let cardActionRect = cardAction.getBoundingClientRect();

      expect(mediumRect.height).toEqual(400, 'medium card should be 400px high');
      expect(cardImageRect.height).toBeLessThan(241, 'medium image should be <= 240 or 60% high');
      expect(cardContentRect.height).toBeLessThan(161, 'medium content should be <= 160px or 40% high');
      expect(cardActionRect.top + cardActionRect.height)
        .toEqual(mediumRect.top + mediumRect.height, 'medium action should be at bottom of card');
    });

    it("should have large card dimensions", function () {
      let cardImage = large.querySelector('.card-image');
      let cardContent = large.querySelector('.card-content');
      let cardAction = large.querySelector('.card-action');
      let largeRect = large.getBoundingClientRect();
      let cardImageRect = cardImage.getBoundingClientRect();
      let cardContentRect = cardContent.getBoundingClientRect();
      let cardActionRect = cardAction.getBoundingClientRect();

      expect(largeRect.height).toEqual(500, 'large card should be 500px high');
      expect(cardImageRect.height).toBeLessThan(301, 'large image should be <= 300 or 60% high');
      expect(cardContentRect.height).toBeLessThan(201, 'large content should be <= 200 or 40% high');
      expect(cardActionRect.top + cardActionRect.height)
        .toEqual(largeRect.top + largeRect.height, 'large action should be at bottom of card');
    });
  });

});
