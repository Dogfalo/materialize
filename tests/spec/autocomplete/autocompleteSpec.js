describe("Autocomplete Plugin", function () {
  beforeEach(function() {
    loadFixtures('autocomplete/autocompleteFixture.html');
    $('input.autocomplete').autocomplete({
      data: {
        "Apple": null,
        "Microsoft": null,
        "Google": 'http://placehold.it/250x250'
      }
    });
  });

  describe("Autocomplete", function () {
    // var browserSelect, normalInput, normalDropdown;

    // beforeEach(function() {
    //   browserSelect = $('select.normal');
    // });

    it("should work with multiple initializations", function () {
      var $normal = $('#normal-autocomplete');
      var $parent = $normal.parent();
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
      var autocompleteEvents = $._data($normal[0], 'events');

      expect($autocompleteEl.length).toEqual(1, 'Should dynamically generate autocomplete structure.');
      expect(autocompleteEvents.keyup.length).toEqual(1, 'Should only bind 1 keyup handler on input');
      // setTimeout(function() {
      //   done();
      // }, 400);
    });

    it("should limit results if option is set", function (done) {
      var $limited = $('#limited-autocomplete');
      var $autocompleteEl = $limited.parent().find('.autocomplete-content');
      var data = {};
      for (var i = 1000; i >= 0; i--) {
        var randString = 'a' + Math.random().toString(36).substring(20);
        data[randString] = null;
      }

      $limited.autocomplete({
        data: data,
        limit: 20
      });

      $limited.focus();
      $limited.val('a');
      $limited.trigger('keyup');

      setTimeout(function() {
        expect($autocompleteEl.children().length).toEqual(20, 'Results should be at max the set limit');
        done();
      }, 100);

    });
  });

});
