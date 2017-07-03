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
        var secondOption = multipleDropdown.find('li:not(.disabled)').eq(1);
        var thirdOption = multipleDropdown.find('li:not(.disabled)').eq(2);
        firstOption.click();
        $('body').click();

        setTimeout(function() {
          expect(multipleDropdown).toBeHidden('Should be hidden after choosing item.');
          expect(browserSelect.val()).toEqual(['1', '2', '3'], 'Actual select should have correct selected values.');
          expect(multipleInput.val()).toEqual(secondOption[0].innerText + ', ' + thirdOption[0].innerText + ', ' + firstOption[0].innerText, 'Value should equal chosen multiple options.');
          done();
        }, 400);
      }, 400);
    });

    it("should open dropdown and deselect multiple options", function(done) {
      multipleInput = browserSelect.parent().find('input.select-dropdown');
      multipleDropdown = browserSelect.parent().find('ul.select-dropdown');

      expect(multipleInput).toExist('Should dynamically generate select dropdown structure.');
      expect(multipleDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(multipleInput).toBeVisible('Should be hidden before dropdown is opened.');
      expect(multipleDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      multipleInput.click();

      setTimeout(function() {
        expect(multipleDropdown).toBeVisible('Should be visible after opening.');
        var disabledOption = multipleDropdown.find('li.disabled');
        var secondOption = multipleDropdown.find('li:not(.disabled)').eq(1);
        var thirdOption = multipleDropdown.find('li:not(.disabled)').eq(2);
        secondOption.click();
        thirdOption.click();
        $('body').click();

        setTimeout(function() {
          expect(multipleDropdown).toBeHidden('Should be hidden after choosing item.');
          expect(browserSelect.val()).toEqual([], 'Actual select element should be empty because none chosen.');
          expect(multipleInput.val()).toEqual(disabledOption[0].innerText, 'Value should equal default because none chosen.');
          done();
        }, 400);
      }, 400);
    });

    it("should have multiple pre-selected values", function () {
      multipleInput = browserSelect.parent().find('input.select-dropdown');
      multipleDropdown = browserSelect.parent().find('ul.select-dropdown');

      var secondOption = browserSelect.find('option[selected]').eq(0);
      var thirdOption = browserSelect.find('option[selected]').eq(1);
      expect(multipleInput.val()).toEqual(secondOption.text() + ', ' + thirdOption.text(), 'Value should be equal to preselected option.');
    });
  });

  describe("Optgroup Select", function () {
    var browserSelect, optInput, optDropdown, optionInOptgroup, optionAfterOptGroup;

    beforeEach(function() {
      browserSelect = $('select.optgroup');
    });

    it("should open dropdown and select options", function(done) {
      optInput = browserSelect.parent().find('input.select-dropdown');
      optDropdown = browserSelect.parent().find('ul.select-dropdown');

      var optgroups = optDropdown.find('li.optgroup');
      browserSelect.find('optgroup').each(function(i) {
        expect($(this).attr('label')).toEqual(optgroups.eq(i)[0].innerText, 'should generate optgroup structure.');
      });

      expect(optInput).toExist('Should dynamically generate select dropdown structure.');
      expect(optDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(optInput).toBeVisible('Should be hidden before dropdown is opened.');
      expect(optDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      optInput.click();

      setTimeout(function() {
        expect(optDropdown).toBeVisible('Should be visible after opening.');
        var secondOption = optDropdown.find('li:not(.disabled):not(.optgroup)').eq(1);
        secondOption.click();
        optInput.blur();

        setTimeout(function() {
          expect(optDropdown).toBeHidden('Should be hidden after choosing item.');
          expect(optInput.val()).toEqual(secondOption[0].innerText, 'Value should be equal to selected option.');
          done();
        }, 400);
      }, 400);
    });

    it("should have options inside optgroup indented", function() {
      optionInOptgroup = browserSelect.parent().find('li.optgroup + li');
      optionAfterOptGroup = browserSelect.parent().find('ul li:last-child');

      expect(optionInOptgroup).toHaveClass('optgroup-option', 'Should have optgroup-option class');
      expect(optionAfterOptGroup).not.toHaveClass('optgroup-option', 'Should not have optgroup-option class');
    });

    it("should not do anything when optgroup li clicked", function(done) {
      optInput = browserSelect.parent().find('input.select-dropdown');
      optDropdown = browserSelect.parent().find('ul.select-dropdown');
      var originalVal = optInput.val();

      var optgroups = optDropdown.find('li.optgroup');
      browserSelect.find('optgroup').each(function(i) {
        expect($(this).attr('label')).toEqual(optgroups.eq(i)[0].innerText, 'should generate optgroup structure.');
      });

      expect(optInput).toExist('Should dynamically generate select dropdown structure.');
      expect(optDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(optInput).toBeVisible('Should be hidden before dropdown is opened.');
      expect(optDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      optInput.click();

      setTimeout(function() {
        expect(optDropdown).toBeVisible('Should be visible after opening.');
        var optgroup = optDropdown.find('li.optgroup').first();
        optgroup.click();
        optInput.blur();

        setTimeout(function() {
          expect(optDropdown).toBeHidden('Should be hidden after choosing invalid item.');
          expect(optInput.val()).toEqual(originalVal, 'Value should be equal to original option.');
          done();
        }, 400);
      }, 400);
    });

  });
});
