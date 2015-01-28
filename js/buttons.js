(function ($) {
  $(document).ready(function() {

    // jQuery reverse
    jQuery.fn.reverse = [].reverse;

    $('.fixed-action-btn').each(function (i) {
      var $this = $(this);
      $this.find('ul a.btn-floating').velocity(
        { scaleY: ".4", scaleX: ".4", translateY: "40px"},
        { duration: 0 });


      var timer;
      $this.hover(
        function() {
          var time = 0;
          $this.find('ul a.btn-floating').reverse().each(function () {
            $(this).velocity(
              { opacity: "1", scaleX: "1", scaleY: "1", translateY: "0"},
              { duration: 100, delay: time });
            time += 40;
          });
        }, function() {
          var time = 0;
          $this.find('ul a.btn-floating').velocity("stop", true);
          $this.find('ul a.btn-floating').velocity(
            { opacity: "0", scaleX: ".4", scaleY: ".4", translateY: "40px"},
            { duration: 100 });
        }
      );
    });

  });
}( jQuery ));
