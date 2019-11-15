describe("Select Plugin", function () {
  beforeEach(function() {
    loadFixtures('select/selectFixture.html');
    $('select').formSelect();
  });

  describe("Select", function () {
    var browserSelect, normalInput, normalDropdown, selectInstance;

    beforeEach(function() {
      browserSelect = $('select.normal');
      selectInstance = M.FormSelect.getInstance(browserSelect[0]);
    });

    it("should open dropdown and select option", function (done) {
      normalInput = $(selectInstance.wrapper).find('input.select-dropdown');
      normalDropdown = $(selectInstance.wrapper).find('ul.select-dropdown');

      expect(normalInput).toExist('Should dynamically generate select dropdown structure.');
      expect(normalDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(normalInput).toBeVisible('Should be visible before dropdown is opened.');
      expect(normalDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      click(normalInput[0]);

      setTimeout(function() {
        expect(normalDropdown).toBeVisible('Should be visible after opening.');
        var firstOption = normalDropdown.find('li:not(.disabled)').first();
        click(firstOption[0]);
        normalInput.blur();

        setTimeout(function() {
          expect(normalDropdown).toBeHidden('Should be hidden after choosing item.');
          expect(normalInput.val()).toEqual(firstOption.text(), 'Value should equal chosen option.');
          done();
        }, 400);
      }, 400);
    });

    it("should have pre-selected value", function () {
      normalInput = $(selectInstance.wrapper).find('input.select-dropdown');
      normalDropdown = $(selectInstance.wrapper).find('ul.select-dropdown');

      var firstOption = browserSelect.find('option[selected]');
      expect(normalInput.val()).toEqual(firstOption.text(), 'Value should be equal to preselected option.');
    });

    it("should not initialize if browser default", function () {
      browserDefault = $('select.browser-default');
      expect(browserDefault.parent().hasClass('select-wrapper')).toEqual(false, 'Wrapper should not be made');
    });

    it("should getSelectedValues correctly", function(done) {
      normalInput = $(selectInstance.wrapper).find('input.select-dropdown');
      normalDropdown = $(selectInstance.wrapper).find('ul.select-dropdown');

      expect(browserSelect[0].M_FormSelect.getSelectedValues()).toEqual([browserSelect[0].value], 'Should equal initial selected value');

      click(normalInput[0]);

      setTimeout(function() {
        var firstOption = normalDropdown.find('li:not(.disabled)').first();
        click(firstOption[0]);
        normalInput.blur();

        setTimeout(function() {
          expect(browserSelect[0].M_FormSelect.getSelectedValues()).toEqual([browserSelect[0].value], 'Should equal value of first option');

          done();
        }, 400);
      }, 400);
    });
  });

  describe("Multiple Select", function () {
    var browserSelect, multipleInput, multipleDropdown, selectInstance;

    beforeEach(function() {
      browserSelect = $('select.multiple');
      selectInstance = M.FormSelect.getInstance(browserSelect[0]);
    });

    it("should open dropdown and select multiple options", function(done) {
      multipleInput = $(selectInstance.wrapper).find('input.select-dropdown');
      multipleDropdown = $(selectInstance.wrapper).find('ul.select-dropdown');

      expect(multipleInput).toExist('Should dynamically generate select dropdown structure.');
      expect(multipleDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(multipleInput).toBeVisible('Should be visible before dropdown is opened.');
      expect(multipleDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      click(multipleInput[0]);

      setTimeout(function() {
        expect(multipleDropdown).toBeVisible('Should be visible after opening.');
        var firstOption = multipleDropdown.find('li:not(.disabled)').first();
        var secondOption = multipleDropdown.find('li:not(.disabled)').eq(1);
        var thirdOption = multipleDropdown.find('li:not(.disabled)').eq(2);
        click(firstOption[0]);
        click(document.body);

        setTimeout(function() {
          expect(multipleDropdown).toBeHidden('Should be hidden after choosing item.');
          expect(browserSelect.val()).toEqual(['1', '2', '3'], 'Actual select should have correct selected values.');
          expect(multipleInput.val()).toEqual(firstOption.text() + ', ' + secondOption.text() + ', ' + thirdOption.text(), 'Value should equal chosen multiple options.');
          done();
        }, 400);
      }, 400);
    });

    it("should open dropdown and deselect multiple options", function(done) {
      multipleInput = $(selectInstance.wrapper).find('input.select-dropdown');
      multipleDropdown = $(selectInstance.wrapper).find('ul.select-dropdown');

      expect(multipleInput).toExist('Should dynamically generate select dropdown structure.');
      expect(multipleDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(multipleInput).toBeVisible('Should be hidden before dropdown is opened.');
      expect(multipleDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      click(multipleInput[0]);

      setTimeout(function() {
        expect(multipleDropdown).toBeVisible('Should be visible after opening.');
        var disabledOption = multipleDropdown.find('li.disabled');
        var secondOption = multipleDropdown.find('li:not(.disabled)').eq(1);
        var thirdOption = multipleDropdown.find('li:not(.disabled)').eq(2);

        click(secondOption[0]);
        click(thirdOption[0]);
        click(document.body);


        setTimeout(function() {
          expect(multipleDropdown).toBeHidden('Should be hidden after choosing item.');
          expect(browserSelect.val()).toEqual([], 'Actual select element should be empty because none chosen.');
          expect(multipleInput.val()).toEqual(disabledOption.text(), 'Value should equal default because none chosen.');
          done();
        }, 400);
      }, 400);
    });

    it("should have multiple pre-selected values", function () {
      multipleInput = $(selectInstance.wrapper).find('input.select-dropdown');
      multipleDropdown = $(selectInstance.wrapper).find('ul.select-dropdown');

      var secondOption = browserSelect.find('option[selected]').eq(0);
      var thirdOption = browserSelect.find('option[selected]').eq(1);
      expect(multipleInput.val()).toEqual(secondOption.text() + ', ' + thirdOption.text(), 'Value should be equal to preselected option.');
    });
  });

  describe("Filtered Select", function () {
    var browserSelect, filteredInput, filteredDropdown, selectInstance;

    beforeEach(function() {
      browserSelect = $('select.filtered');
      selectInstance = M.FormSelect.getInstance(browserSelect[0]);
    });

    it("should open dropdown and filter option list visually", function(done) {
      filteredInput = $(selectInstance.wrapper).find('input.select-dropdown');
      filteredDropdown = $(selectInstance.wrapper).find('ul.filtered-select-dropdown');
      filter = $(selectInstance.wrapper).find('ul.filtered-select-dropdown li.filter input');

      expect(filteredInput).toExist('Should dynamically generate select dropdown structure.');
      expect(filteredDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(filter).toExist('Should dynamically generate input element for filtering options.');
      expect(filteredInput).toBeVisible('Should be visible before dropdown is opened.');
      expect(filteredDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      click(filteredInput[0]);

      setTimeout(function() {
        expect(filteredDropdown).toBeVisible('Should be visible after opening.');

        var firstOption = filteredDropdown.find('li:not(.disabled)').first();
        var secondOption = filteredDropdown.find('li:not(.disabled)').eq(1);
        var thirdOption = filteredDropdown.find('li:not(.disabled)').eq(2);

        expect(firstOption.hasClass('hide')).toEqual(false, 'Option 1 should be visible by default.');
        expect(secondOption.hasClass('hide')).toEqual(false, 'Option 2 should be visible by default.');
        expect(thirdOption.hasClass('hide')).toEqual(false, 'Option 3 should be visible by default.');
        expect(filter.val()).toEqual('', 'Filter value should be empty after dropdown is opened.');

        filter.val('2');
        keyup(filter[0], 50);

        setTimeout(function() {
          expect(firstOption.hasClass('hide')).toEqual(true, 'Non-matching option should be hidden.');
          expect(secondOption.hasClass('hide')).toEqual(false, 'Matching option should be visible.');
          expect(thirdOption.hasClass('hide')).toEqual(true, 'Non-matching option should be hidden.');
          done();
        }, 400);
      }, 400);
    });
  });

  describe("Optgroup Select", function () {
    var browserSelect, optInput, optDropdown, optionInOptgroup, optionAfterOptGroup, selectInstance;

    beforeEach(function() {
      browserSelect = $('select.optgroup');
      selectInstance = M.FormSelect.getInstance(browserSelect[0]);
    });

    it("should open dropdown and select options", function(done) {
      optInput = $(selectInstance.wrapper).find('input.select-dropdown');
      optDropdown = $(selectInstance.wrapper).find('ul.select-dropdown');

      var optgroups = optDropdown.find('li.optgroup');
      browserSelect.find('optgroup').each(function(i) {
        expect($(this).attr('label')).toEqual(optgroups.eq(i).text(), 'should generate optgroup structure.');
      });

      expect(optInput).toExist('Should dynamically generate select dropdown structure.');
      expect(optDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(optInput).toBeVisible('Should be hidden before dropdown is opened.');
      expect(optDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      click(optInput[0]);

      setTimeout(function() {
        expect(optDropdown).toBeVisible('Should be visible after opening.');
        var secondOption = optDropdown.find('li:not(.disabled):not(.optgroup)').eq(1);
        click(secondOption[0]);
        optInput.blur();

        setTimeout(function() {
          expect(optDropdown).toBeHidden('Should be hidden after choosing item.');
          expect(optInput.val()).toEqual(secondOption.text(), 'Value should be equal to selected option.');
          done();
        }, 400);
      }, 400);
    });

    it("should have options inside optgroup indented", function() {
      optionInOptgroup = $(selectInstance.wrapper).find('li.optgroup + li');
      optionAfterOptGroup = $(selectInstance.wrapper).find('ul li:last-child');

      expect(optionInOptgroup).toHaveClass('optgroup-option', 'Should have optgroup-option class');
      expect(optionAfterOptGroup).not.toHaveClass('optgroup-option', 'Should not have optgroup-option class');
    });

    it("should not do anything when optgroup li clicked", function(done) {
      optInput = $(selectInstance.wrapper).find('input.select-dropdown');
      optDropdown = $(selectInstance.wrapper).find('ul.select-dropdown');
      var originalVal = optInput.val();

      var optgroups = optDropdown.find('li.optgroup');
      browserSelect.find('optgroup').each(function(i) {
        expect($(this).attr('label')).toEqual(optgroups.eq(i).text(), 'should generate optgroup structure.');
      });

      expect(optInput).toExist('Should dynamically generate select dropdown structure.');
      expect(optDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(optInput).toBeVisible('Should be hidden before dropdown is opened.');
      expect(optDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      click(optInput[0]);

      setTimeout(function() {
        expect(optDropdown).toBeVisible('Should be visible after opening.');
        var optgroup = optDropdown.find('li.optgroup').first();
        click(optgroup[0]);
        optInput.blur();

        setTimeout(function() {
          expect(optDropdown).toBeVisible('Should not be hidden after choosing invalid item.');
          expect(optInput.val()).toEqual(originalVal, 'Value should be equal to original option.');
          done();
        }, 400);
      }, 400);
    });

  });
});
