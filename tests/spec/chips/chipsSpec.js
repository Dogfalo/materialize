describe("Chips", function () {

  beforeEach(function() {
    loadFixtures('chips/chipsFixture.html');
    $('.chips').chips();
    $('.chips-initial').chips({
      data: [{ tag: 'Apple' }, { tag: 'Microsoft' }, { tag: 'Google' }],
    });
    $('.chips-placeholder').chips({
      placeholder: 'Enter a tag',
      secondaryPlaceholder: '+Tag',
    });
    $('.chips-autocomplete').chips({
      autocompleteData: {
        'Apple': null,
        'Microsoft': null,
        'Google': null
      }
    });
  });

  describe("chips plugin", function () {
    var $chips, $input;

    // beforeEach(function() {
    // });

    it("should work with multiple initializations", function () {
      $chips = $('.chips').first();
      $chips.chips();
      $chips.chips();
      $chips.chips();
      $chips.chips();

      $input = $chips.find('input');

      expect($input.length).toEqual(1, 'Should dynamically generate chips structure.');
    });

    it("should be able to add chip", function (done) {
      $chips = $('.chips').first();
      $input = $chips.find('input');

      $input.val('one');

      keydown($input[0], 13);

      setTimeout(function() {
        var numChips = $chips.find('.chip').length;
        var $oneChip = $chips.find('.chip').first();

        expect(numChips).toEqual(1, 'one chip should have been added');

        $oneChip.children().remove()
        expect($oneChip.text()).toEqual('one', 'the chip should have value "one"');

        done();
      }, 400);

    });

    it("should be able to delete chip", function (done) {
      $chips = $('.chips.chips-initial').first();
      $input = $chips.find('input');
      var numChips = $chips.find('.chip').length

      expect(numChips).toEqual(3, '3 initial chips should have been added');

      $chips.find('.chip .close').first().click();

      setTimeout(function() {
        numChips = $chips.find('.chip').length

        expect(numChips).toEqual(2, 'one chip should have been deleted');

        done();
      }, 400);

    });

    it("should have working callbacks", function(done) {
      $chips = $('.chips').first();
      var chipAdd = false;
      var chipAdded = null;
      var chipSelect = false;
      var chipSelected = null;
      var chipDelete = false;
      var chipDeleted = null;
      $chips.chips({
        data: [{ tag: 'One' }, { tag: 'Two' }, { tag: 'Three' }],
        onChipAdd: function(chipsEl, chipEl) {
          chipAdded = chipEl;
          chipAdd = true;
        },
        onChipSelect: function(chipsEl, chipEl) {
          chipSelected = chipEl;
          chipSelect = true;
        },
        onChipDelete: function(chipsEl, chipEl) {
          chipDeleted = chipEl;
          chipDelete = true;
        }
      });

      $input = $chips.find('input');
      $input.val('Four');

      expect(chipAdd).toEqual(false, 'callback not yet fired');
      expect(chipSelect).toEqual(false, 'callback not yet fired');
      expect(chipDelete).toEqual(false, 'callback not yet fired');

      keydown($input[0], 13);

      setTimeout(function() {
        expect(chipAdd).toEqual(true, 'add callback fired');
        expect(chipAdded.childNodes[0].nodeValue).toEqual('Four', 'add callback provides correct chip element');

        click($chips.find('.chip')[1]);

        setTimeout(function() {
          expect(chipSelect).toEqual(true, 'select callback fired');
          expect(chipSelected.childNodes[0].nodeValue).toEqual('Two', 'select callback provides correct chip element');

          click($chips.find('.close')[2]);

          setTimeout(function() {
            expect(chipDelete).toEqual(true, 'delete callback fired');
          expect(chipDeleted.childNodes[0].nodeValue).toEqual('Three', 'add callback provides correct chip element');

            done();
          }, 100);
        }, 100);
      }, 100);
    });
  });

  // describe("Chips autocomplete", function () {

  // });

});
