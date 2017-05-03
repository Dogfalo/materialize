describe( 'Tooltip:', function() {
  var tooltippedBtn, tooltip;

  beforeEach(function() {
    loadFixtures('tooltip/tooltipFixture.html');
    $('.tooltipped').tooltip();
  });

  describe('Tooltip opens and closes properly', function() {


    it('Opens a tooltip on mouse enter', function(done) {
      tooltippedBtn = $('#test');
      tooltip = $('#' + tooltippedBtn.attr('data-tooltip-id'));

      // Mouse enter
      tooltippedBtn.trigger('mouseenter');
      setTimeout(function() {
        expect(tooltip).toBeVisible('because mouse entered tooltipped btn');
        expect(tooltip.children('span').text()).toBe('I am tooltip',
            'because that is the defined text in the html attribute');

        // Mouse leave
        tooltippedBtn.trigger('mouseleave');
        setTimeout(function() {
          expect(tooltip).toBeVisible('because mouse left tooltipped btn');
          done();
        }, 300);
      }, 200);
    });


    it('Positions tooltips smartly on the bottom within the screen bounds', function(done) {
      tooltippedBtn = $('#test1');
      tooltip = $('#' + tooltippedBtn.attr('data-tooltip-id'));
      // Mouse enter
      tooltippedBtn.trigger('mouseenter');
      setTimeout(function() {
        var offset = tooltip.offset();
        // Check window bounds
        expect(offset.top >= 0).toBeTruthy();
        expect(offset.top < 0).toBeFalsy();
        expect(offset.top + tooltip.height() <=
            window.innerHeight).toBeTruthy();
        expect(offset.left >= 0).toBeTruthy();
        expect(offset.left < 0).toBeFalsy();
        expect(offset.left + tooltip.width() <= window.innerWidth).toBeTruthy();

        // check if tooltip is under btn
        expect(offset.top > tooltippedBtn.offset().top + tooltippedBtn.height())
            .toBeTruthy();
        expect(offset.top < tooltippedBtn.offset().top + tooltippedBtn.height())
            .toBeFalsy();
        done();
      }, 300);
    });


    it('Removes tooltip event handlers and tooltip dom object', function() {
      tooltippedBtn = $('#test1');
      tooltippedBtn.tooltip('remove');

      // Check that event handlers are removed
      var enterHandler = $._data(tooltippedBtn[0], 'events');
      expect(!!enterHandler).toBeFalsy('because all events should be removed');

      // Check DOM element is removed
      tooltip = $('#' + tooltippedBtn.attr('data-tooltip-id'));
      expect(tooltip.length).toBe(0);
    });


    it('Changes position attribute dynamically and positions tooltips on the right correctly',
        function(done) {
      tooltippedBtn = $('#test');
      tooltippedBtn.attr('data-position', 'right');
      tooltip = $('#' + tooltippedBtn.attr('data-tooltip-id'));
      // Mouse enter
      tooltippedBtn.trigger('mouseenter');
      setTimeout(function() {
        var offset = tooltip.offset();
        expect(offset.left > tooltippedBtn.offset().left + tooltippedBtn.width())
            .toBeTruthy();
        done();
      }, 300);
    });


    it('Accepts delay option from javascript initialization', function(done) {
      tooltippedBtn = $('#test');
      tooltippedBtn.removeAttr('data-delay');
      tooltippedBtn.tooltip({delay: 200});
      tooltip = $('#' + tooltippedBtn.attr('data-tooltip-id'));
      tooltippedBtn.trigger('mouseenter');
      setTimeout(function() {
        expect(tooltip.css('visibility')).toBe('hidden', 'because the delay is 200 seconds');
      }, 150);

      setTimeout(function() {
        expect(tooltip).toBeVisible('because 200 seconds has passed');
        done();
      }, 250);

    });
  });

});
