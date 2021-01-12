describe( 'Modal:', function() {
  var trigger1, modal1;

  beforeEach(async function() {
    await XloadFixtures(['modal/modalFixture.html']);
    trigger1 = document.querySelector('.btn[href="#modal1"]');
    triggerIcon1 = document.querySelector('.btn[data-target="modal1"] i');
    trigger2 = document.querySelector('.btn[href="#modal2"]');
    trigger3 = document.querySelector('.btn[href="#modal3"]');
    modal1 = document.querySelector('#modal1');
    modal2 = document.querySelector('#modal2');
    modal3 = document.querySelector('#modal3');
  });
  afterEach(function(){
    XunloadFixtures();
  });

  describe('Modals', function() {
    it('Should open and close correctly', function(done) {
      M.Modal.init(modal1);
      expect(modal1).toBeHidden('Modal should be hidden');

      click(trigger1);

      setTimeout(function() {
        expect(modal1).toBeVisible('Modal should be shown');
        expect(modal1).toHaveClass('open', 'Modal should have class open');

        // Check overlay is attached
        let overlay = M.Modal.getInstance(modal1).$overlay;
        let overlayInDOM = document.contains(overlay[0]);
        expect(overlayInDOM).toEqual(true, 'Overlay should be attached on open');

        click(overlay[0]);
        setTimeout(function() {
          expect(modal1).toNotHaveClass('open', 'Modal should have class open removed');

          let overlayInDOM = document.contains(overlay[0]);
          expect(overlayInDOM).toEqual(false, 'Overlay should be removed on close');

          done();
        }, 500);
      }, 500);
    });

    it('Should open and close correctly with children elements in trigger', function(done) {
     M.Modal.init(modal1);
      expect(modal1).toBeHidden('Modal should be hidden');

      click(triggerIcon1);

      setTimeout(function() {
        expect(modal1).toBeVisible('Modal should be shown');
        expect(modal1).toHaveClass('open',  'Modal should have class open');

        // Check overlay is attached
        let overlay = M.Modal.getInstance(modal1).$overlay;
        let overlayInDOM = document.contains(overlay[0]);
        expect(overlayInDOM).toEqual(true, 'Overlay should be attached on open');

        click(overlay[0]);
        setTimeout(function() {
          expect(modal1).toNotHaveClass('open', 'Modal should have class open removed');

          let overlayInDOM = document.contains(overlay[0]);
          expect(overlayInDOM).toEqual(false, 'Overlay should be removed on close');

          done();
        }, 500);
      }, 500);
    });

    it('Should have a dismissible option', function(done) {
      M.Modal.init(modal1, {
        dismissible: false
      });

      click(trigger1);
      setTimeout(function() {
        expect(modal1).toBeVisible('Modal should be shown');
        let overlay = M.Modal.getInstance(modal1).$overlay;
        let overlayInDOM = document.contains(overlay[0]);
        expect(overlayInDOM).toEqual(true, 'Overlay should be attached on open');

        click(overlay[0]);
        setTimeout(function() {
          expect(modal1).toBeVisible('Modal should be shown');
          let overlayInDOM = document.contains(overlay[0]);
          expect(overlayInDOM).toEqual(true, 'modal should not be dismissable');

          done();
        }, 500);
      }, 500);
    });

    it('Should have callbacks', function(done) {
      let readyTest = false;
      let completeTest = false;
      M.Modal.init(modal1, {
        onOpenStart: function() {
          readyTest = true;
        },
        onCloseStart: function() {
          completeTest = true;
        }
      });

      expect(readyTest).toEqual(false, 'callback not yet fired');
      expect(completeTest).toEqual(false, 'callback not yet fired');

      click(trigger1);
      setTimeout(function() {
        expect(readyTest).toEqual(true, 'callback fired');
        expect(completeTest).toEqual(false, 'callback not yet fired');

        let overlay = M.Modal.getInstance(modal1).$overlay;
        click(overlay[0]);
        setTimeout(function() {
          expect(readyTest).toEqual(true, 'callback fired');
          expect(completeTest).toEqual(true, 'callback fired');

          done();
        }, 500);
      }, 500);
    });
  });

});
