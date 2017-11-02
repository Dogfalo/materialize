(function ($, Vel) {
  $(document).on('click', '.card', function (e) {
    if ($(this).children('.card-reveal').length) {
      var $card = $(e.target).closest('.card');
      if ($card.data('initialOverflow') === undefined) {
        $card.data(
          'initialOverflow',
          $card.css('overflow') === undefined ? '' : $card.css('overflow')
        );
      }
      let $cardReveal = $(this).find('.card-reveal');
      if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
        // Make Reveal animate down and display none
        Vel(
          $cardReveal,
          {translateY: 0},
          {
            duration: 225,
            queue: false,
            easing: 'easeInOutQuad',
            complete: function() {
              $(this).css({ display: 'none'});
              $card.css('overflow', $card.data('initialOverflow'));
            }
          }
        );
      }
      else if ($(e.target).is($('.card .activator')) ||
               $(e.target).is($('.card .activator i')) ) {
        $card.css('overflow', 'hidden');
        $cardReveal.css({ display: 'block'});
        Vel($cardReveal, 'stop');
        Vel(
          $cardReveal,
          {translateY: '-100%'},
          {duration: 300, queue: false, easing: 'easeInOutQuad'}
        );
      }
    }
  });
}( cash, M.Vel));
