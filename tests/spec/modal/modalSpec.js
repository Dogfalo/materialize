describe( 'Modal:', function() {
  var transformMaterialbox;
  var trigger1, modal1, trigger2, modal2, trigger3, modal3;

  beforeEach(function() {
    loadFixtures('modal/modalFixture.html');
    trigger1 = $('.btn[href="#modal1"]');
    triggerIcon1 = $('.btn[data-target="modal1"] i');
    trigger2 = $('.btn[href="#modal2"]');
    trigger3 = $('.btn[href="#modal3"]');
    modal1 = $('#modal1');
    modal2 = $('#modal2');
    modal3 = $('#modal3');
  });

  describe('Modals', function() {
    it('Should open and close correctly', function(done) {
      modal1.modal();
      expect(modal1).toBeHidden('Modal should be hidden');

      click(trigger1[0]);

      setTimeout(function() {
        expect(modal1).toBeVisible('Modal should be shown');
        expect(modal1.hasClass('open')).toEqual(true, 'Modal should have class open');

        // Check overlay is attached
        var overlay = modal1.modal('getInstance').$overlay;
        var overlayInDOM = $.contains(document, overlay[0]);
        expect(overlayInDOM).toEqual(true, 'Overlay should be attached on open');

        click(overlay[0]);
        setTimeout(function() {
          expect(modal1.hasClass('open')).toEqual(false, 'Modal should have class open removed');

          var overlayInDOM = $.contains(document, overlay[0]);
          expect(overlayInDOM).toEqual(false, 'Overlay should be removed on close');

          done();
        }, 500);
      }, 500);
    });

    it('Should open and close correctly with children elements in trigger', function(done) {
      modal1.modal();
      expect(modal1).toBeHidden('Modal should be hidden');

      click(triggerIcon1[0]);

      setTimeout(function() {
        expect(modal1).toBeVisible('Modal should be shown');
        expect(modal1.hasClass('open')).toEqual(true, 'Modal should have class open');

        // Check overlay is attached
        var overlay = modal1.modal('getInstance').$overlay;
        var overlayInDOM = $.contains(document, overlay[0]);
        expect(overlayInDOM).toEqual(true, 'Overlay should be attached on open');

        click(overlay[0]);
        setTimeout(function() {
          expect(modal1.hasClass('open')).toEqual(false, 'Modal should have class open removed');

          var overlayInDOM = $.contains(document, overlay[0]);
          expect(overlayInDOM).toEqual(false, 'Overlay should be removed on close');

          done();
        }, 500);
      }, 500);
    });

    it('Should have a dismissible option', function(done) {
      modal1.modal({
        dismissible: false
      });

      click(trigger1[0]);
      setTimeout(function() {
        expect(modal1).toBeVisible('Modal should be shown');
        var overlay = modal1.modal('getInstance').$overlay;
        var overlayInDOM = $.contains(document, overlay[0]);
        expect(overlayInDOM).toEqual(true, 'Overlay should be attached on open');

        click(overlay[0]);
        setTimeout(function() {
          expect(modal1).toBeVisible('Modal should be shown');
          var overlayInDOM = $.contains(document, overlay[0]);
          expect(overlayInDOM).toEqual(true, 'modal should not be dismissable');

          done();
        }, 500);
      }, 500);
    });

    it('Should have callbacks', function(done) {
      var readyTest = false;
      var completeTest = false;
      modal1.modal({
        ready: function() {
          readyTest = true;
        },
        complete: function() {
          completeTest = true;
        }
      });

      expect(readyTest).toEqual(false, 'callback not yet fired');
      expect(completeTest).toEqual(false, 'callback not yet fired');

      click(trigger1[0]);
      setTimeout(function() {
        expect(readyTest).toEqual(true, 'callback fired');
        expect(completeTest).toEqual(false, 'callback not yet fired');

        var overlay = modal1.modal('getInstance').$overlay;
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
