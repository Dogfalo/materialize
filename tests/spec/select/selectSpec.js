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

    it("should open select dropdown", function (done) {
      normalInput = browserSelect.parent().find('input.select-dropdown');
      normalDropdown = browserSelect.parent().find('ul.select-dropdown');

      expect(normalInput).toExist('Should dynamically generate select dropdown structure.');
      expect(normalDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(normalInput).toBeVisible('Should be hidden before dropdown is opened.');
      expect(normalDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      normalInput.click();

      setTimeout(function() {
        expect(normalDropdown).toBeVisible('Should be visible after opening.');
        done();
      }, 400);
    });
  });
});
