jasmine.getFixtures().fixturesPath = 'tests/spec/collapsible';

describe( "Collapsible Plugin", function () {
  var collapsible, accordion;

  beforeEach(function() {
    loadFixtures('collapsible.html');
    collapsible = $('.collapsible');
    accordion = $('.accordion');
    collapsible.collapsible();
  });

  describe( "collapsible", function () {

    it("should open first and second items, keeping both open", function () {
      // Collapsible body height should be 0 on start when hidden.
      var firstHeader = collapsible.find('.collapsible-header').first();
      var firstBody = collapsible.find('.collapsible-body').first();
      var secondHeader = collapsible.find('.collapsible-header').eq(1);
      var secondBody = collapsible.find('.collapsible-body').eq(1);
      expect(firstBody).toBeHidden();
      expect(secondBody).toBeHidden();

      // Collapsible body height should be > 0 after being opened.
      firstHeader.click();
      secondHeader.click();
      expect(firstBody).toBeVisible();
      expect(secondBody).toBeVisible();
    });
  });

  describe( "accordion", function () {

    it("should open first and second items, keeping only second open", function (done) {
      // Collapsible body height should be 0 on start when hidden.
      var firstHeader = accordion.find('.collapsible-header').first();
      var firstBody = accordion.find('.collapsible-body').first();
      var secondHeader = accordion.find('.collapsible-header').eq(1);
      var secondBody = accordion.find('.collapsible-body').eq(1);
      expect(firstBody).toBeHidden();
      expect(secondBody).toBeHidden();

      // Collapsible body height should be > 0 after being opened.
      firstHeader.click();

      setTimeout(function() {
        expect(firstBody).toBeVisible();
        secondHeader.click();

        setTimeout(function() {
          expect(firstBody).toBeHidden();
          // expect(secondBody).toBeVisible();
          done();
        }, 400);
      }, 200);

    });
  });
});
