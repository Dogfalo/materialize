describe("Select Plugin", function () {
  
  beforeEach(async function() {
    await XloadFixtures(['select/selectFixture.html']);
    M.FormSelect.init(document.querySelectorAll('select'));
  });
  afterEach(function(){
    XunloadFixtures();
  });

  describe("Select", function () {
    let browserSelect, normalInput, normalDropdown, selectInstance;

    beforeEach(function() {
      M.FormSelect.init(document.querySelectorAll('select'));
      browserSelect = document.querySelector('select.normal');
      selectInstance = M.FormSelect.getInstance(browserSelect);
    });

    it("should open dropdown and select option", function (done) {
      normalInput = selectInstance.wrapper.querySelector('input.select-dropdown');
      normalDropdown = selectInstance.wrapper.querySelector('ul.select-dropdown');

      expect(normalInput).toExist('Should dynamically generate select dropdown structure.');
      expect(normalDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(normalInput).toBeVisible('Should be visible before dropdown is opened.');
      expect(normalDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      click(normalInput);

      setTimeout(function() {
        expect(normalDropdown).toBeVisible('Should be visible after opening.');
        let firstOption = normalDropdown.querySelector('li:not(.disabled)');
        click(firstOption);
        blur(normalInput);

        setTimeout(function() {
          expect(normalDropdown).toBeHidden('Should be hidden after choosing item.');
          expect(normalInput.value).toEqual(firstOption.innerText, 'Value should equal chosen option.');
          done();
        }, 400);
      }, 400);
    });

    it("should have pre-selected value", function () {
      normalInput = selectInstance.wrapper.querySelector('input.select-dropdown');
      normalDropdown = selectInstance.wrapper.querySelector('ul.select-dropdown');

      let firstOption = browserSelect.querySelector('option[selected]');
      expect(normalInput.value).toEqual(firstOption.innerText, 'Value should be equal to preselected option.');
    });

    it("should not initialize if browser default", function () {
      browserDefault = document.querySelector('select.browser-default');
      expect(browserDefault.parentNode.classList.contains('select-wrapper')).toBeFalse('Wrapper should not be made');
    });

    it("should getSelectedValues correctly", function(done) {
      normalInput = selectInstance.wrapper.querySelector('input.select-dropdown');
      normalDropdown = selectInstance.wrapper.querySelector('ul.select-dropdown');

      expect(M.FormSelect.getInstance(browserSelect).getSelectedValues()).toEqual([browserSelect.value], 'Should equal initial selected value');

      click(normalInput);

      setTimeout(function() {
        let firstOption = normalDropdown.querySelector('li:not(.disabled)');
        click(firstOption);
        blur(normalInput);

        setTimeout(function() {
          expect(M.FormSelect.getInstance(browserSelect).getSelectedValues()).toEqual([browserSelect.value], 'Should equal value of first option');

          done();
        }, 400);
      }, 400);
    });
  });

  describe("Multiple Select", function () {
    let browserSelect, multipleInput, multipleDropdown, selectInstance;

    beforeEach(function() {
      browserSelect = document.querySelector('select.multiple');
      selectInstance = M.FormSelect.getInstance(browserSelect);
    });

    it("should open dropdown and select multiple options", function(done) {
      multipleInput = selectInstance.wrapper.querySelector('input.select-dropdown');
      multipleDropdown = selectInstance.wrapper.querySelector('ul.select-dropdown');

      expect(multipleInput).toExist('Should dynamically generate select dropdown structure.');
      expect(multipleDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(multipleInput).toBeVisible('Should be visible before dropdown is opened.');
      expect(multipleDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      click(multipleInput);

      setTimeout(function() {
        expect(multipleDropdown).toBeVisible('Should be visible after opening.');
        let firstOption = multipleDropdown.querySelector('li:not(.disabled)');
        click(firstOption);
        click(document.body);

        setTimeout(function() {
          firstOption = multipleDropdown.querySelector('li:not(.disabled)');
          let secondOption = multipleDropdown.querySelectorAll('li:not(.disabled)')[1];
          let thirdOption = multipleDropdown.querySelectorAll('li:not(.disabled)')[2];
          let selectedVals =
            Array.prototype.slice.call(browserSelect.querySelectorAll('option:checked'), 0).map(function(v) { 
            return v.value; 
          });
          expect(multipleDropdown).toBeHidden('Should be hidden after choosing item.');
          expect(selectedVals).toEqual(['1', '2', '3'], 'Actual select should have correct selected values.');
          expect(multipleInput.value).toEqual(firstOption.innerText + ', ' + secondOption.innerText + ', ' + thirdOption.innerText, 'Value should equal chosen multiple options.');
          done();
        }, 400);
      }, 400);
    });

    it("should open dropdown and deselect multiple options", function(done) {
      multipleInput = selectInstance.wrapper.querySelector('input.select-dropdown');
      multipleDropdown = selectInstance.wrapper.querySelector('ul.select-dropdown');

      expect(multipleInput).toExist('Should dynamically generate select dropdown structure.');
      expect(multipleDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(multipleInput).toBeVisible('Should be hidden before dropdown is opened.');
      expect(multipleDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      click(multipleInput);

      setTimeout(function() {
        expect(multipleDropdown).toBeVisible('Should be visible after opening.');
        let disabledOption = multipleDropdown.querySelector('li.disabled');
        let secondOption = multipleDropdown.querySelectorAll('li:not(.disabled)')[1];
        let thirdOption = multipleDropdown.querySelectorAll('li:not(.disabled)')[2];

        click(secondOption);
        click(thirdOption);
        click(document.body);


        setTimeout(function() {
          expect(multipleDropdown).toBeHidden('Should be hidden after choosing item.');
          expect(browserSelect.value).toEqual('', 'Actual select element should be empty because none chosen.');
          expect(multipleInput.value).toEqual(disabledOption.innerText, 'Value should equal default because none chosen.');
          done();
        }, 400);
      }, 400);
    });

    it("should have multiple pre-selected values", function () {
      multipleInput = selectInstance.wrapper.querySelector('input.select-dropdown');
      multipleDropdown = selectInstance.wrapper.querySelector('ul.select-dropdown');

      let secondOption = browserSelect.querySelector('option[selected]');
      let thirdOption = browserSelect.querySelectorAll('option[selected]')[1];
      expect(multipleInput.value).toEqual(secondOption.innerText + ', ' + thirdOption.innerText, 'Value should be equal to preselected option.');
    });
  });

  describe("Optgroup Select", function () {
    let browserSelect, optInput, optDropdown, optionInOptgroup, optionAfterOptGroup, selectInstance;

    beforeEach(function() {
      browserSelect = document.querySelector('select.optgroup');
      selectInstance = M.FormSelect.getInstance(browserSelect);
    });

    it("should open dropdown and select options", function(done) {
      optInput = selectInstance.wrapper.querySelector('input.select-dropdown');
      optDropdown = selectInstance.wrapper.querySelector('ul.select-dropdown');

      let optgroups = optDropdown.querySelectorAll('li.optgroup');
      let browerSelectOptgroups = browserSelect.querySelectorAll('optgroup');
      for (let i = 0; i < browerSelectOptgroups.length; i++) {
        expect(browerSelectOptgroups[i].label).toEqual(optgroups[i].innerText, 'should generate optgroup structure.');
      }

      expect(optInput).toExist('Should dynamically generate select dropdown structure.');
      expect(optDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(optInput).toBeVisible('Should be hidden before dropdown is opened.');
      expect(optDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      click(optInput);

      setTimeout(function() {
        expect(optDropdown).toBeVisible('Should be visible after opening.');
        let secondOption = optDropdown.querySelectorAll('li:not(.disabled):not(.optgroup)')[1];
        click(secondOption);
        blur(optInput);

        setTimeout(function() {
          expect(optDropdown).toBeHidden('Should be hidden after choosing item.');
          expect(optInput.value).toEqual(secondOption.innerText, 'Value should be equal to selected option.');
          done();
        }, 400);
      }, 400);
    });

    it("should have options inside optgroup indented", function() {
      optionInOptgroup = selectInstance.wrapper.querySelector('li.optgroup + li');
      optionAfterOptGroup = selectInstance.wrapper.querySelector('ul li:last-child');

      expect(optionInOptgroup).toHaveClass('optgroup-option', 'Should have optgroup-option class');
      expect(optionAfterOptGroup).toNotHaveClass('optgroup-option', 'Should not have optgroup-option class');
    });

    it("should not do anything when optgroup li clicked", function(done) {
      optInput = selectInstance.wrapper.querySelector('input.select-dropdown');
      optDropdown = selectInstance.wrapper.querySelector('ul.select-dropdown');
      let originalVal = optInput.value;


      let optgroups = optDropdown.querySelectorAll('li.optgroup');
      let browerSelectOptgroups = browserSelect.querySelectorAll('optgroup');
      for (let i = 0; i < browerSelectOptgroups.length; i++) {
        expect(browerSelectOptgroups[i].label).toEqual(optgroups[i].innerText, 'should generate optgroup structure.');
      }

      expect(optInput).toExist('Should dynamically generate select dropdown structure.');
      expect(optDropdown).toExist('Should dynamically generate select dropdown structure.');
      expect(optInput).toBeVisible('Should be hidden before dropdown is opened.');
      expect(optDropdown).toBeHidden('Should be hidden before dropdown is opened.');

      click(optInput);

      setTimeout(function() {
        expect(optDropdown).toBeVisible('Should be visible after opening.');
        let optgroup = optDropdown.querySelector('li.optgroup');
        click(optgroup);
        blur(optInput);

        setTimeout(function() {
          expect(optDropdown).toBeVisible('Should not be hidden after choosing invalid item.');
          expect(optInput.value).toEqual(originalVal, 'Value should be equal to original option.');
          done();
        }, 400);
      }, 400);
    });

  });
});
