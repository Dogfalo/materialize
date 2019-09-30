describe("Autocomplete Plugin", function () {
  beforeEach(function(done) {
    jasmine.getFixtures().fixturesPath = 'base/tests/spec/autocomplete/';
    loadFixtures('autocompleteFixture.html');

    setTimeout(function() {
      let allAutocompleteInputs = document.querySelectorAll('input.autocomplete');

      M.Autocomplete.init(allAutocompleteInputs, {
        data: {
          "Apple": null,
          "Microsoft": null,
          "Google": 'http://placehold.it/250x250'
        }
      });
      done();
    }, 400);
  });

  describe("Autocomplete", function () {
    // var browserSelect, normalInput, normalDropdown;

    // beforeEach(function() {
    //   browserSelect = $('select.normal');
    // });

    it("should work with multiple initializations", function (done) {
      let $normal = $('#normal-autocomplete');
      let $parent = $normal.parent();
      setTimeout(function() {
        M.Autocomplete.init($normal[0], {data: {"hi": null}});
        M.Autocomplete.init($normal[0], {data: {"hi": null}});
        M.Autocomplete.init($normal[0], {data: {"hi": null}});
        M.Autocomplete.init($normal[0], {
          data: {
            "Apple": null,
            "Microsoft": null,
            "Google": 'http://placehold.it/250x250'
          }
        });

        let $autocompleteEl = $parent.find('.autocomplete-content');

        expect($autocompleteEl.length).toEqual(1, 'Should dynamically generate autocomplete structure.');
        done();
      }, 400);
    });

    it("should limit results if option is set", function (done) {
      let $limited = $('#limited-autocomplete');
      let data = {};
      for (let i = 100; i >= 0; i--) {
        let randString = 'a' + Math.random().toString(36).substring(2);
        data[randString] = null;
      }

      $limited.autocomplete({
        data: data,
        limit: 20
      });

      $limited.focus();
      $limited.val('a');
      keyup($limited[0], 65);

      setTimeout(function() {
        let $autocompleteEl = $(M.Autocomplete.getInstance($limited[0]).container);
        expect($autocompleteEl.children().length).toEqual(20, 'Results should be at max the set limit');
        done();
      }, 200);

    });

    it("should open correctly from typing", function (done) {
      let $normal = $('#normal-autocomplete');
      let $parent = $normal.parent();
      let $autocompleteEl = $normal.parent().find('.autocomplete-content');

      $normal.focus();
      $normal.val('e');
      keyup($normal[0], 69);

      setTimeout(function() {
        expect($autocompleteEl.children().length).toEqual(2, 'Results should show dropdown on text input');
        done();
      }, 200);
    });

  it("should open correctly from keyboard focus", function (done) {
      let $normal = $('#normal-autocomplete');
      let $parent = $normal.parent();
      let $autocompleteEl = $normal.parent().find('.autocomplete-content');

      $normal.val('e');
      keyup($normal[0], 9);
      focus($normal[0]);

      setTimeout(function() {
        expect($autocompleteEl.children().length).toEqual(2, 'Results should show dropdown on text input');
        done();
      }, 200);
    });
  });

});