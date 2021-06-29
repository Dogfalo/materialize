describe('Datepicker Plugin', function() {
  beforeEach(async function() {
    await XloadFixtures(['datepicker/datepickerFixture.html']);
    M.Datepicker.init(document.querySelectorAll('.datepicker'));
  });
  afterEach(function() {
    XunloadFixtures();
  });

  describe('Datepicker', function() {
    var normalDropdown;

    beforeEach(function() {
      // browserSelect = $('select.normal');
    });

    it('should open and close programmatically', function(done) {
      let input = document.querySelector('#datepickerInput');
      let modal = document.querySelector('.datepicker-modal');

      expect(modal).toBeHidden('Should be hidden before datepicker input is focused.');

      M.Datepicker.getInstance(input).open();

      setTimeout(function() {
        expect(modal).toHaveClass(
          'open',
          'Datepicker modal should be shown after datepicker input is focused.'
        );
        M.Datepicker.getInstance(input).close();

        setTimeout(function() {
          expect(modal).toNotHaveClass(
            'open',
            'Datepicker modal should be hidden after datepicker input is focused.'
          );
          done();
        }, 400);
      }, 400);
    });
  });
});
