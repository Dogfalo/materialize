describe("Chips Plugin", function () {

  beforeEach(function() {
    loadFixtures('chips/chipsFixture.html');
    $('.chips').material_chip();
    $('.chips-initial').material_chip({
      data: [{ tag: 'Apple' }, { tag: 'Microsoft' }, { tag: 'Google' }],
    });
    $('.chips-placeholder').material_chip({
      placeholder: 'Enter a tag',
      secondaryPlaceholder: '+Tag',
    });
    $('.chips-autocomplete').material_chip({
      autocompleteData: {
        'Apple': null,
        'Microsoft': null,
        'Google': null
      }
    });
  });

  describe("Chips", function () {
    var $chips, $input;

    // beforeEach(function() {
    // });

    it("should work with multiple initializations", function () {
      $chips = $('.chips').first();
      $chips.material_chip();
      $chips.material_chip();
      $chips.material_chip();
      $chips.material_chip();

      $input = $chips.find('input');

      expect($input.length).toEqual(1, 'Should dynamically generate chips structure.');
    });

    it("should be able to add chip", function (done) {
      $chips = $('.chips').first();
      $input = $chips.find('input');

      $input.val('one');

      var e = $.Event('keydown');
      e.which = 13;
      $input.trigger(e);

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
  });

  // describe("Chips autocomplete", function () {

  // });

});
