describe( "Collapsible Plugin", function () {
  var collapsible, accordion, popout, expandable, expandablePreselect;

  beforeEach(async function() {
    await XloadFixtures(['collapsible/collapsible.html']);
    collapsible = document.querySelectorAll('.collapsible');
    expandable = document.querySelector('.expandable');
    expandablePreselect = document.querySelector('.expandable-preselected');
    accordion = document.querySelector('.accordion');
    popout = document.querySelector('.popout');
    M.Collapsible.init(collapsible);
    M.Collapsible.init(expandable, {accordion: false});
    M.Collapsible.init(expandablePreselect, {accordion: false});
  });
  afterEach(function(){
    XunloadFixtures();
  });

  describe( "collapsible", function () {

    it("should open all items, keeping all open", function (done) {
      // Collapsible body height should be 0 on start when hidden.
      let headers = expandable.querySelectorAll('.collapsible-header');
      let bodies = expandable.querySelectorAll('.collapsible-body');

      for (let i = 0; i < bodies.length; i++) {
        expect(bodies[i]).toBeHidden('because collapsible bodies should be hidden initially.'); //TODO replace with alternative for deprecated jasmine-jquery
      }

      // Collapsible body height should be > 0 after being opened.
      for (let i = 0; i < headers.length; i++) {
        click(headers[i]);
      }

      setTimeout(function() {
        for (let i = 0; i < bodies.length; i++) {
          expect(bodies[i]).toBeVisible('because collapsible bodies not visible after being opened.'); //TODO replace with alternative for deprecated jasmine-jquery
        }
        done();
      }, 400);
    });

    it("should allow preopened sections", function () {
      let bodies = expandablePreselect.querySelectorAll('.collapsible-body');

      for (let i = 0; i < bodies.length; i++) {
        let headerLi = bodies[i].parentNode;

        if (i === 1) {
          expect(headerLi).toHaveClass('active', 'because collapsible header should have active class to be preselected.'); //TODO replace with alternative for deprecated jasmine-jquery
          expect(bodies[i]).toBeVisible('because collapsible bodies should be visible if preselected.'); //TODO replace with alternative for deprecated jasmine-jquery
        } else {
          expect(bodies[i]).toBeHidden('because collapsible bodies should be hidden initially.'); //TODO replace with alternative for deprecated jasmine-jquery
        }
      }
    });

    it("should open and close programmatically with callbacks", function(done) {
      let openCallback = false;
      let closeCallback = false;
      M.Collapsible.init(expandable, {
        accordion: false,
        onOpenStart: function() {
          openCallback = true;
        },
        onCloseStart: function() {
          closeCallback = true;
        }
      });
      let bodies = expandable.querySelectorAll('.collapsible-body');

      expect(openCallback).toEqual(false, 'because open callback not yet fired');
      expect(closeCallback).toEqual(false, 'because close callback not yet fired');

      for (let i = 0; i < bodies.length; i++) {
        expect(bodies[i]).toBeHidden('because collapsible bodies should be hidden initially.'); //TODO replace with alternative for deprecated jasmine-jquery
        let collapsibleInstance = M.Collapsible.getInstance(bodies[i].parentNode.parentNode);
        collapsibleInstance.open(i);
      }
      expect(openCallback).toEqual(true, 'because open callback fired');


      setTimeout(function() {
        for (let i = 0; i < bodies.length; i++) {
          expect(bodies[i]).toBeVisible('because collapsible bodies should be visible after being opened.'); //TODO replace with alternative for deprecated jasmine-jquery
          M.Collapsible.getInstance(bodies[i].parentNode.parentNode).close(i);
        };
        expect(closeCallback).toEqual(true, 'because close callback fired');


        setTimeout(function() {
          for (let i = 0; i < bodies.length; i++) {
            expect(bodies[i]).toBeHidden('because collapsible bodies should be hidden after close.'); //TODO replace with alternative for deprecated jasmine-jquery
          };

          done();
        }, 400);
      }, 400);
    });
  });

  describe( "accordion", function () {

    it("should open first and second items, keeping only second open", function (done) {
      // Collapsible body height should be 0 on start when hidden.
      let firstHeader = accordion.querySelector('.collapsible-header');
      let firstBody = accordion.querySelector('.collapsible-body');
      let secondHeader = accordion.querySelectorAll('.collapsible-header')[1];
      let secondBody = accordion.querySelectorAll('.collapsible-body')[1];
      expect(firstBody).toBeHidden('because accordion bodies should be hidden initially.');
      expect(secondBody).toBeHidden('because accordion bodies should be hidden initially.');

      // Collapsible body height should be > 0 after being opened.
      firstHeader.click();

      setTimeout(function() {
        expect(firstBody).toBeVisible('because accordion bodies not visible after being opened.');
        click(secondHeader);

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
      let listItems = popout.querySelectorAll('li');
      let firstHeader = popout.querySelector('.collapsible-header');
      let firstBody = popout.querySelector('.collapsible-body');
      expect(firstBody).toBeHidden('because accordion bodies should be hidden initially.');

      // Expect margin to be > 0 because not popped out.
      for (let i = 0; i < listItems.length; i++) {
        let listItemStyles = getComputedStyle(listItems[i]);
        let marginLeft = parseInt(listItemStyles.getPropertyValue('margin-left'));
        let marginRight = parseInt(listItemStyles.getPropertyValue('margin-right'));
        expect(marginLeft).toBeGreaterThan(0, 'because closed popout items should have horizontal margins.');
        expect(marginRight).toBeGreaterThan(0, 'because closed popout items should have horizontal margins.');
      };

      // expect margin to be 0 because popped out.
      click(firstHeader);
      setTimeout(function() {
        let firstStyles = getComputedStyle(listItems[0]);
        let firstMarginLeft = parseInt(firstStyles.getPropertyValue('margin-left'));
        let firstMarginRight = parseInt(firstStyles.getPropertyValue('margin-right'));
        expect(firstMarginLeft).toEqual(0, 'because opened popout items should have no horizontal margins.');
        expect(firstMarginRight).toEqual(0, 'because opened popout items should have no horizontal margins.');
        expect(firstBody).toBeVisible('because accordion bodies not visible after being opened.');

        done();
      }, 400);

    });
  });
});
