describe("Autocomplete Plugin", function () {
  beforeEach(function(done) {
    loadFixtures('autocomplete/autocompleteFixture.html');
    setTimeout(function() {
      $('input.autocomplete').autocomplete({
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
      var $normal = $('#normal-autocomplete');
      var $parent = $normal.parent();
      setTimeout(function() {
        $normal.autocomplete({ data: {"hi": null} });
        $normal.autocomplete({ data: {"hi": null} });
        $normal.autocomplete({ data: {"hi": null} });
        $normal.autocomplete({
          data: {
            "Apple": null,
            "Microsoft": null,
            "Google": 'http://placehold.it/250x250'
          }
        });

        var $autocompleteEl = $parent.find('.autocomplete-content');

        expect($autocompleteEl.length).toEqual(1, 'Should dynamically generate autocomplete structure.');
        done();
      }, 400);
    });

    it("should limit results if option is set", function (done) {
      var $limited = $('#limited-autocomplete');
      var data = {};
      for (var i = 100; i >= 0; i--) {
        var randString = 'a' + Math.random().toString(36).substring(2);
        data[randString] = null;
      }

      $limited.autocomplete({
        data: data,
        limit: 20
      });

      $limited.focus();
      $limited.val('a');
      keyup($limited[0], 65);

      var $autocompleteEl = $limited.parent().find('.autocomplete-content');
      setTimeout(function() {
        expect($autocompleteEl.children().length).toEqual(20, 'Results should be at max the set limit');
        done();
      }, 200);

    });

    it("should open correctly from typing", function (done) {
      var $normal = $('#normal-autocomplete');
      var $parent = $normal.parent();
      var $autocompleteEl = $normal.parent().find('.autocomplete-content');

      $normal.focus();
      $normal.val('e');
      keyup($normal[0], 69);

      setTimeout(function() {
        expect($autocompleteEl.children().length).toEqual(2, 'Results should show dropdown on text input');
        done();
      }, 200);
    });

  it("should open correctly from keyboard focus", function (done) {
      var $normal = $('#normal-autocomplete');
      var $parent = $normal.parent();
      var $autocompleteEl = $normal.parent().find('.autocomplete-content');

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