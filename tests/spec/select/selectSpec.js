jasmine.getFixtures().fixturesPath = 'tests/spec';

describe("Select Plugin", function () {
  beforeEach(function() {
    loadFixtures('select/selectFixture.html');
  });

  describe("Select", function () {
    var browserSelect, normalInput, normalDropdown;

    beforeEach(function() {
      browserSelect = $('select.normal');
      $('select').not('.disabled').material_select();
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
      console.log(normalInput.val(), firstOption.text());
      expect(normalInput.val()).toEqual(firstOption.text(), 'Value should be equal to preselected option.');
    });
  });
});
