describe('Collapsible Plugin', function() {
  let collapsible, accordion, popout, expandable, expandablePreselect;

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/tests/spec/collapsible/';
    loadFixtures('collapsibleFixture.html');

    collapsible = $('.collapsible');
    M.Collapsible.init(collapsible);

    expandable = $('.expandable');
    expandablePreselect = $('.expandable-preselected');
    accordion = $('.accordion');
    popout = $('.popout');

    M.Collapsible.init(expandable, { accordion: false });
    M.Collapsible.init(expandablePreselect, { accordion: false });
  });

  describe('collapsible', function() {
    it('should open all items, keeping all open', function(done) {
      // Collapsible body height should be 0 on start when hidden.
      let headers = expandable.find('.collapsible-header');
      let bodies = expandable.find('.collapsible-body');

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

    it('should allow preopened sections', function() {
      let headers = expandablePreselect.find('.collapsible-header');
      let bodies = expandablePreselect.find('.collapsible-body');

      bodies.each(function(i) {
        let header = $(this).prev('.collapsible-header');
        let headerLi = header.parent('li');

        if (i === 1) {
          expect(headerLi).toHaveClass(
            'active',
            'because collapsible header should have active class to be preselected.'
          );
          expect($(this)).toBeVisible(
            'because collapsible bodies should be visible if preselected.'
          );
        } else {
          expect($(this)).toBeHidden('because collapsible bodies should be hidden initially.');
        }
      });
    });

    it('should open and close programmatically with callbacks', function(done) {
      let openCallback = false;
      let closeCallback = false;
      expandable.collapsible({
        accordion: false,
        onOpenStart: function() {
          openCallback = true;
        },
        onCloseStart: function() {
          closeCallback = true;
        }
      });
      let bodies = expandable.find('.collapsible-body');

      expect(openCallback).toEqual(false, 'because open callback not yet fired');
      expect(closeCallback).toEqual(false, 'because close callback not yet fired');

      bodies.each(function(i) {
        expect($(this)).toBeHidden('because collapsible bodies should be hidden initially.');
        expandable.collapsible('open', i);
      });
      expect(openCallback).toEqual(true, 'because open callback fired');

      setTimeout(function() {
        bodies.each(function(i) {
          expect($(this)).toBeVisible(
            'because collapsible bodies should be visible after being opened.'
          );
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

  describe('accordion', function() {
    it('should open first and second items, keeping only second open', function(done) {
      // Collapsible body height should be 0 on start when hidden.
      let firstHeader = accordion.find('.collapsible-header').first();
      let firstBody = accordion.find('.collapsible-body').first();
      let secondHeader = accordion.find('.collapsible-header').eq(1);
      let secondBody = accordion.find('.collapsible-body').eq(1);
      expect(firstBody).toBeHidden('because accordion bodies should be hidden initially.');
      expect(secondBody).toBeHidden('because accordion bodies should be hidden initially.');

      // Collapsible body height should be > 0 after being opened.
      firstHeader.click();

      setTimeout(function() {
        expect(firstBody).toBeVisible('because accordion bodies not visible after being opened.');
        secondHeader.click();

        setTimeout(function() {
          expect(firstBody).toBeHidden(
            'because accordion bodies should be hidden when another item is opened.'
          );
          expect(secondBody).toBeVisible(
            'because accordion bodies not visible after being opened.'
          );
          done();
        }, 400);
      }, 200);
    });
  });

  describe('popout', function() {
    it('should open first and popout', function(done) {
      // Collapsible body height should be 0 on start when hidden.
      let firstLi = popout.find('li').first();
      let firstHeader = popout.find('.collapsible-header').first();
      let firstBody = popout.find('.collapsible-body').first();
      expect(firstBody).toBeHidden('because accordion bodies should be hidden initially.');

      // Expect margin to be > 0 because not popped out.
      popout.find('li').each(function() {
        let marginLeft = parseInt($(this).css('margin-left'));
        let marginRight = parseInt($(this).css('margin-right'));
        expect(marginLeft).toBeGreaterThan(
          0,
          'because closed popout items should have horizontal margins.'
        );
        expect(marginRight).toBeGreaterThan(
          0,
          'because closed popout items should have horizontal margins.'
        );
      });

      // expect margin to be 0 because popped out.
      firstHeader.click();
      setTimeout(function() {
        let firstMarginLeft = parseInt(firstLi.css('margin-left'));
        let firstMarginRight = parseInt(firstLi.css('margin-right'));
        expect(firstMarginLeft).toEqual(
          0,
          'because opened popout items should have no horizontal margins.'
        );
        expect(firstMarginRight).toEqual(
          0,
          'because opened popout items should have no horizontal margins.'
        );
        expect(firstBody).toBeVisible('because accordion bodies not visible after being opened.');

        done();
      }, 400);
    });
  });
});
