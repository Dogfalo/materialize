(function ($, anim) {
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
        anim({
          targets: $cardReveal[0],
          translateY: 0,
          duration: 225,
          easing: 'easeInOutQuad',
          complete: function(anim) {
            let el = anim.animatables[0].target;
            $(el).css({ display: 'none'});
            $card.css('overflow', $card.data('initialOverflow'));
          }
        });
      }
      else if ($(e.target).is($('.card .activator')) ||
               $(e.target).is($('.card .activator i')) ) {
        $card.css('overflow', 'hidden');
        $cardReveal.css({ display: 'block'});
        anim({
          targets: $cardReveal[0],
          translateY: '-100%',
          duration: 300,
          easing: 'easeInOutQuad'
        });
      }
    }
  });
}( cash, anime));
