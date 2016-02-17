describe( "Collapsible Plugin", function () {
  var collapsible, accordion;

  beforeEach(function() {
    loadFixtures('collapsible/collapsible.html');
    collapsible = $('.collapsible');
    accordion = $('.accordion');
    popout = $('.popout');
    collapsible.collapsible();
  });

  describe( "collapsible", function () {

    it("should open all items, keeping all open", function () {
      // Collapsible body height should be 0 on start when hidden.
      var headers = collapsible.find('.collapsible-header');
      var bodies = collapsible.find('.collapsible-body');

      bodies.each(function() {
        expect($(this)).toBeHidden('because collapsible bodies should be hidden initially.');
      });

      // Collapsible body height should be > 0 after being opened.
      headers.each(function() {
        $(this).click();
      });
      bodies.each(function() {
        expect($(this)).toBeVisible('because collapsible bodies not visible after being opened.');
      });
    });
  });

  describe( "accordion", function () {

    it("should open first and second items, keeping only second open", function (done) {
      // Collapsible body height should be 0 on start when hidden.
      var firstHeader = accordion.find('.collapsible-header').first();
      var firstBody = accordion.find('.collapsible-body').first();
      var secondHeader = accordion.find('.collapsible-header').eq(1);
      var secondBody = accordion.find('.collapsible-body').eq(1);
      expect(firstBody).toBeHidden('because accordion bodies should be hidden initially.');
      expect(secondBody).toBeHidden('because accordion bodies should be hidden initially.');

      // Collapsible body height should be > 0 after being opened.
      firstHeader.click();

      setTimeout(function() {
        expect(firstBody).toBeVisible('because accordion bodies not visible after being opened.');
        secondHeader.click();

        setTimeout(function() {
          expect(firstBody).toBeHidden('because accordion bodies should be hidden when another item is opened.');
          expect(secondBody).toBeVisible('because accordion bodies not visible after being opened.');
          done();
        }, 400);
      }, 200);

    });
  });

  describe( "popout", function () {

    it("should open first and popout", function (done) {
      // Collapsible body height should be 0 on start when hidden.
      var firstLi = popout.find('li').first();
      var firstHeader = popout.find('.collapsible-header').first();
      var firstBody = popout.find('.collapsible-body').first();
      expect(firstBody).toBeHidden('because accordion bodies should be hidden initially.');

      // Expect margin to be > 0 because not popped out.
      popout.find('li').each(function () {
        var marginLeft = parseInt($(this).css('margin-left'));
        var marginRight = parseInt($(this).css('margin-right'));
        expect(marginLeft).toBeGreaterThan(0, 'because closed popout items should have horizontal margins.');
        expect(marginRight).toBeGreaterThan(0, 'because closed popout items should have horizontal margins.');
      });

      // expect margin to be 0 because popped out.
      firstHeader.click();
      setTimeout(function() {
        var firstMarginLeft = parseInt(firstLi.css('margin-left'));
        var firstMarginRight = parseInt(firstLi.css('margin-right'));
        expect(firstMarginLeft).toEqual(0, 'because opened popout items should have no horizontal margins.');
        expect(firstMarginRight).toEqual(0, 'because opened popout items should have no horizontal margins.');
        expect(firstBody).toBeVisible('because accordion bodies not visible after being opened.');

        done();
      }, 400);

    });
  });
});
