(function ($) {
  $(document).ready(function() {

    $(document).on('click.chip', '.chip .material-icons', function (e) {
      if (e.currentTarget.innerHTML === 'close') {
        $(this).parent().remove();
      }
    });

  });
}( jQuery ));
