describe("Dropdown Plugin", function () {
  beforeEach(function() {
    loadFixtures('dropdown/dropdownFixture.html');
    $('.dropdown-button').dropdown();
  });

  describe("Dropdown", function () {
    var normalDropdown;

    beforeEach(function() {
      // browserSelect = $('select.normal');
    });

    it("should open and close programmatically", function (done) {
      var dropdown1 = $('#dropdown1');
      normalDropdown = $('#dropdownActivator');

      expect(dropdown1).toBeHidden('Should be hidden before dropdown is opened.');

      normalDropdown.dropdown('open');

      setTimeout(function() {
        expect(dropdown1).toBeVisible('Should be shown after dropdown is opened.');
        normalDropdown.dropdown('close');

        setTimeout(function() {
          expect(dropdown1).toBeHidden('Should be hidden after dropdown is closed.');
          done();
        }, 400);
      }, 400);
    });

    it("should close dropdown on document click if programmatically opened", function (done) {
      normalDropdown = $('#dropdownActivator');

      expect(dropdown1).toBeHidden('Should be hidden before dropdown is opened.');

      normalDropdown.dropdown('open');

      setTimeout(function() {
        expect(dropdown1).toBeVisible('Should be shown after dropdown is opened.');
        $(document).click();

        setTimeout(function() {
          expect(dropdown1).toBeHidden('Should be hidden after dropdown is closed.');
          done();
        }, 400);
      }, 400);
    });
  });
});
