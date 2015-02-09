(function($) {
  $(document).ready(function() {

    // Input: Array of JSON objects {element, offset, callback}

    function scrollFire(options) {
      $.each( options, function( i, value ){
        console.log(value.element, value.offset, value.callback);

      });
    }


  });
})(jQuery);