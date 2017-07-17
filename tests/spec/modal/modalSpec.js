describe( 'Modal:', function() {
  var transformMaterialbox;
  var trigger1, modal1, trigger2, modal2, trigger3, modal3;

  beforeEach(function() {
    loadFixtures('modal/modalFixture.html');
    trigger1 = $('.btn[href="#modal1"]');
    trigger2 = $('.btn[href="#modal2"]');
    trigger3 = $('.btn[href="#modal3"]');
    modal1 = $('#modal1');
    modal2 = $('#modal2');
    modal3 = $('#modal3');
  });

  describe('Modals', function() {
    it('Should open and close correctly', function(done) {
      modal1.modal();

      click(trigger1[0]);

      setTimeout(function() {
        // Check overlay is attached
        var overlay = modal1.modal('getInstance').$overlay;
        var overlayInDOM = $.contains(document, overlay[0]);
        expect(overlayInDOM).toEqual(true, 'Overlay should be attached on open');

        click(overlay[0]);
        setTimeout(function() {
          var overlayInDOM = $.contains(document, overlay[0]);
          expect(overlayInDOM).toEqual(false, 'Overlay should be removed on close');

          done();
        }, 500);
      }, 500);
    });
  });

});
