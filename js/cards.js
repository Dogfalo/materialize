(function ($) {
  $(document).ready(function() {

    $(document).on('click.card', '.card', function (e) {
      if ($(this).find('.card-reveal').length) {
        console.log("card reveal");
        if ($(e.target).is($('.card-reveal span.card-title')) || $(e.target).is($('.card-reveal span.card-title i'))) {
          $(this).find('.card-reveal').velocity({translateY: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});        
        }
        else {
          $(this).find('.card-reveal').velocity({translateY: '-100%'}, {duration: 300, queue: false, easing: 'easeOutQuad'});        
        }
      }


    });  

  });
}( jQuery ));