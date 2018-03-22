describe("Fab", function () {
  var FAB;

  beforeEach(function() {
    loadFixtures('fab/fabFixture.html');
  });

  describe("Floating Action Button", function () {
    var normalFAB;

    beforeEach(function() {
      normalFAB = $('.fixed-action-btn').first();
      normalFAB.floatingActionButton();
    });

    it("should open correctly", function (done) {
      var ul = normalFAB.find('> ul');
      expect(ul.css('visibility')).toEqual('hidden', 'FAB menu div should be hidden initially');

      setTimeout(function() {
        mouseenter(normalFAB[0]);

        setTimeout(function() {
          expect(ul.css('visibility')).toEqual('visible', 'FAB menu did not appear after mouseenter.');

          done();
        }, 400);
      }, 100);

    });
  });

  describe("FAB to toolbar", function () {
    var toolbarFAB;

    beforeEach(function() {
      toolbarFAB = $('.fixed-action-btn.toolbar');
      toolbarFAB.floatingActionButton({
        toolbarEnabled: true
      });
    });

    it("should open correctly", function (done) {
      var ul = toolbarFAB.find('> ul');
      expect(ul.css('visibility')).toEqual('hidden', 'FAB menu div should be hidden initially');


      setTimeout(function() {
        click(toolbarFAB[0]);

        setTimeout(function() {
          expect(ul.css('visibility')).toEqual('visible', 'FAB menu did not appear after mouseenter.');
          click(document.body);

          setTimeout(function() {
            expect(ul.css('visibility')).toEqual('hidden', 'FAB menu div should be hidden after close');

            done();
          }, 400);
        }, 400);
      }, 100);
    });
  });


});
