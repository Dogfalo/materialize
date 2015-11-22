jasmine.getFixtures().fixturesPath = 'tests/spec';

describe("Select Plugin", function () {
  beforeEach(function() {
    loadFixtures('select/selectFixture.html');
    $('select').not('.disabled').material_select();
  });

  describe("Select", function () {
    var browserSelect, normalInput, normalDropdown;

    beforeEach(function() {
      browserSelect = $('select.normal');
    });

    it("should open dropdown and select option", function (done) {
      normalInput = browserSelect.parent().find('input.select-dropdown');
      normalDropdown = browserSelect.parent().find('ul.select-dropdown');

      expect(normalInput).toExist('Should dynamically generate select dropdown structure.');
      expect(normalDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(normalInput).toBeVisible('Should be hidden before dropdown is opened.');
      expect(normalDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      normalInput.click();

      setTimeout(function() {
        expect(normalDropdown).toBeVisible('Should be visible after opening.');
        var firstOption = normalDropdown.find('li:not(.disabled)').first();
        firstOption.click();
        normalInput.blur();

        setTimeout(function() {
          expect(normalDropdown).toBeHidden('Should be hidden after choosing item.');
          expect(normalInput.val()).toEqual(firstOption[0].innerText, 'Value should equal chosen option.');
          done();
        }, 400);
      }, 400);
    });

    it("should have pre-selected value", function () {
      normalInput = browserSelect.parent().find('input.select-dropdown');
      normalDropdown = browserSelect.parent().find('ul.select-dropdown');

      var firstOption = browserSelect.find('option[selected]');
      expect(normalInput.val()).toEqual(firstOption.text(), 'Value should be equal to preselected option.');
    });
  });

  describe("Multiple Select", function () {
    var browserSelect, multipleInput, multipleDropdown;

    beforeEach(function() {
      browserSelect = $('select.multiple');
    });

    it("should open dropdown and select multiple options", function(done) {
      multipleInput = browserSelect.parent().find('input.select-dropdown');
      multipleDropdown = browserSelect.parent().find('ul.select-dropdown');

      expect(multipleInput).toExist('Should dynamically generate select dropdown structure.');
      expect(multipleDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(multipleInput).toBeVisible('Should be hidden before dropdown is opened.');
      expect(multipleDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      multipleInput.click();

      setTimeout(function() {
        expect(multipleDropdown).toBeVisible('Should be visible after opening.');
        var firstOption = multipleDropdown.find('li:not(.disabled)').first();
        var thirdOption = multipleDropdown.find('li:not(.disabled)').eq(2);
        firstOption.click();
        thirdOption.click();
        $('body').click();

        setTimeout(function() {
          expect(multipleDropdown).toBeHidden('Should be hidden after choosing item.');
          expect(multipleInput.val()).toEqual(firstOption[0].innerText + ', ' + thirdOption[0].innerText, 'Value should equal chosen multiple options.');
          done();
        }, 400);
      }, 400);
    });

  });
});
