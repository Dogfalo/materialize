describe( "Collapsible Plugin", function () {
  var collapsible, accordion, popout, expandable, expandablePreselect;

  beforeEach(function() {
    loadFixtures('collapsible/collapsible.html');
    collapsible = $('.collapsible');
    expandable = $('.expandable');
    expandablePreselect = $('.expandable-preselected');
    accordion = $('.accordion');
    popout = $('.popout');
    collapsible.collapsible();
    expandable.collapsible({accordion: false});
    expandablePreselect.collapsible({accordion: false});
  });

  describe( "collapsible", function () {

    it("should open all items, keeping all open", function (done) {
      // Collapsible body height should be 0 on start when hidden.
      var headers = expandable.find('.collapsible-header');
      var bodies = expandable.find('.collapsible-body');

      bodies.each(function() {
        expect($(this)).toBeHidden('because collapsible bodies should be hidden initially.');
      });

      // Collapsible body height should be > 0 after being opened.
      headers.each(function() {
        $(this).click();
      });

      setTimeout(function() {
        bodies.each(function() {
          expect($(this)).toBeVisible('because collapsible bodies not visible after being opened.');
        });
        done();
      }, 400);
    });

    it("should allow preopened sections", function () {
      var headers = expandablePreselect.find('.collapsible-header');
      var bodies = expandablePreselect.find('.collapsible-body');

      bodies.each(function(i) {
        var header = $(this).prev('.collapsible-header');
        var headerLi = header.parent('li');

        if (i === 1) {
          expect(headerLi).toHaveClass('active', 'because collapsible header should have active class to be preselected.');
          expect($(this)).toBeVisible('because collapsible bodies should be visible if preselected.');
        } else {
          expect($(this)).toBeHidden('because collapsible bodies should be hidden initially.');
        }
      });
    });

    it("should open and close programmatically with callbacks", function(done) {
      var openCallback = false;
      var closeCallback = false;
      expandable.collapsible({
        accordion: false,
        onOpenStart: function() {
          openCallback = true;
        },
        onCloseStart: function() {
          closeCallback = true;
        }
      });
      var bodies = expandable.find('.collapsible-body');

      expect(openCallback).toEqual(false, 'because open callback not yet fired');
      expect(closeCallback).toEqual(false, 'because close callback not yet fired');

      bodies.each(function(i) {
        expect($(this)).toBeHidden('because collapsible bodies should be hidden initially.');
        expandable.collapsible('open', i);
      });
      expect(openCallback).toEqual(true, 'because open callback fired');


      setTimeout(function() {
        bodies.each(function(i) {
          expect($(this)).toBeVisible('because collapsible bodies should be visible after being opened.');
          expandable.collapsible('close', i);
        });
        expect(closeCallback).toEqual(true, 'because close callback fired');


        setTimeout(function() {
          bodies.each(function(i) {
            expect($(this)).toBeHidden('because collapsible bodies should be hidden after close.');
          });

          done();
        }, 400);
      }, 400);
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
