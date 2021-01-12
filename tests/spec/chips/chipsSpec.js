describe("Chips", function () {

  beforeEach(async function() {
    await XloadFixtures(['chips/chipsFixture.html']);
    M.Chips.init(document.querySelector('.chips'));
    M.Chips.init(document.querySelector('.chips-initial'), {
      data: [{ tag: 'Apple' }, { tag: 'Microsoft' }, { tag: 'Google' }],
    });
    M.Chips.init(document.querySelector('.chips-placeholder'), {
      placeholder: 'Enter a tag',
      secondaryPlaceholder: '+Tag',
    });
    M.Chips.init(document.querySelector('.chips-autocomplete'), {
      autocompleteData: {
        'Apple': null,
        'Microsoft': null,
        'Google': null
      }
    });
  });
  afterEach(function(){
    XunloadFixtures();
  });

  describe("chips plugin", function () {
    let chips, input;

    // beforeEach(function() {
    // });

    it("should work with multiple initializations", function () {
      chips = document.querySelector('.chips');
      M.Chips.init(chips);
      M.Chips.init(chips);
      M.Chips.init(chips);
      M.Chips.init(chips);

      input = chips.querySelectorAll('input');

      expect(input.length).toEqual(1, 'Should dynamically generate chips structure.');
    });

    it("should be able to add chip", function (done) {
      chips = document.querySelector('.chips');
      input = chips.querySelector('input');

      input.value = 'one';

      keydown(input, 13);

      setTimeout(function() {
        let numChips = chips.querySelectorAll('.chip').length;
        let oneChip = chips.querySelector('.chip');

        expect(numChips).toEqual(1, 'one chip should have been added');

        for (let i = oneChip.children.length - 1; i >= 0; i--) {
          oneChip.children[i].remove();
        }
        expect(oneChip.innerText).toEqual('one', 'the chip should have value "one"');

        done();
      }, 400);

    });

    it("should be able to delete chip", function (done) {
      chips = document.querySelector('.chips.chips-initial');
      input = chips.querySelector('input');
      let numChips = chips.querySelectorAll('.chip').length;

      expect(numChips).toEqual(3, '3 initial chips should have been added');

      click(chips.querySelector('.chip .close'));

      setTimeout(function() {
        numChips = chips.querySelectorAll('.chip').length;

        expect(numChips).toEqual(2, 'one chip should have been deleted');

        done();
      }, 400);

    });

    it("should have working callbacks", function(done) {
      chips = document.querySelector('.chips');
      let chipAdd = false;
      let chipAdded = null;
      let chipSelect = false;
      let chipSelected = null;
      let chipDelete = false;
      let chipDeleted = null;
      M.Chips.init(chips, {
        data: [{ tag: 'One' }, { tag: 'Two' }, { tag: 'Three' }],
        onChipAdd: function(chipsEl, chipEl) {
          chipAdded = chipEl;
          chipAdd = true;
        },
        onChipSelect: function(chipsEl, chipEl) {
          chipSelected = chipEl;
          chipSelect = true;
        },
        onChipDelete: function(chipsEl, chipEl) {
          chipDeleted = chipEl;
          chipDelete = true;
        }
      });

      input = chips.querySelector('input');
      input.value = 'Four';

      expect(chipAdd).toEqual(false, 'callback not yet fired');
      expect(chipSelect).toEqual(false, 'callback not yet fired');
      expect(chipDelete).toEqual(false, 'callback not yet fired');

      keydown(input, 13);

      setTimeout(function() {
        expect(chipAdd).toEqual(true, 'add callback fired');
        expect(chipAdded.childNodes[0].nodeValue).toEqual('Four', 'add callback provides correct chip element');

        click(chips.querySelectorAll('.chip')[1]);

        setTimeout(function() {
          expect(chipSelect).toEqual(true, 'select callback fired');
          expect(chipSelected.childNodes[0].nodeValue).toEqual('Two', 'select callback provides correct chip element');

          click(chips.querySelectorAll('.close')[2]);

          setTimeout(function() {
            expect(chipDelete).toEqual(true, 'delete callback fired');
          expect(chipDeleted.childNodes[0].nodeValue).toEqual('Three', 'add callback provides correct chip element');

            done();
          }, 100);
        }, 100);
      }, 100);
    });
  });

  // describe("Chips autocomplete", function () {

  // });

});
