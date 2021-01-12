describe("Dropdown Plugin", function () {

  beforeEach(async function () {      
    await XloadFixtures(['dropdown/dropdownFixture.html']);
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
  });
  afterEach(function(){
    XunloadFixtures();
  });

  describe("Dropdown", function () {

    var normalDropdown;

    beforeEach(function() {
      // browserSelect = $('select.normal');
    });

    it("should open and close programmatically", function (done) {
      let dropdown1 = document.querySelector('#dropdown1');
      normalDropdown = document.querySelector('#dropdownActivator');

      expect(dropdown1).toBeHidden('Should be hidden before dropdown is opened.');

      M.Dropdown.getInstance(normalDropdown).open();

      setTimeout(function() {
        expect(dropdown1).toBeVisible('Should be shown after dropdown is opened.');
        M.Dropdown.getInstance(normalDropdown).close();

        setTimeout(function() {
          expect(dropdown1).toBeHidden('Should be hidden after dropdown is closed.');
          done();
        }, 400);
      }, 400);
    });

    it("should close dropdown on document click if programmatically opened", function (done) {
      let dropdown1 = document.querySelector('#dropdown1');
      normalDropdown = document.querySelector('#dropdownActivator');

      expect(dropdown1).toBeHidden('Should be hidden before dropdown is opened.');

      M.Dropdown.getInstance(normalDropdown).open();

      setTimeout(function() {
        expect(dropdown1).toBeVisible('Should be shown after dropdown is opened.');
        click(document.body);

        setTimeout(function() {
          expect(dropdown1).toBeHidden('Should be hidden after dropdown is closed.');
          done();
        }, 400);
      }, 400);
    });

    it("should bubble events correctly", function (done) {
      let dropdown2 = document.querySelector('#dropdown2');
      normalDropdown = document.querySelector('#dropdownBubble');

      expect(dropdown2).toBeHidden('Should be hidden before dropdown is opened.');

      click(normalDropdown.querySelector('i'));

      setTimeout(function() {
        expect(dropdown2).toBeVisible('Should be shown after dropdown is opened.');
        click(document.body);

        setTimeout(function() {
          expect(dropdown2).toBeHidden('Should be hidden after dropdown is closed.');
          done();
        }, 400);
      }, 400);
    });

    it("hovered should destroy itself", function (done) {
      let dropdownTrigger = document.querySelector('#dropdownDestroyTrigger');
      M.Dropdown.getInstance(dropdownTrigger).destroy();
      M.Dropdown.init(dropdownTrigger, { hover: true });

      expect(function() {
        M.Dropdown.getInstance(dropdownTrigger).destroy();
      }).not.toThrow();

      setTimeout(function() {
        done();
      }, 400);
  });
  });
});
