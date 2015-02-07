(function ($) {
  $(document).ready(function() {

    var time = 0;

    $('ul.staggered-list li').velocity(
        { translateX: "-100px"},
        { duration: 0 });

    $('ul.staggered-list li').each(function() {
      $(this).velocity(
        { opacity: "1", translateX: "0"},
        { duration: 800, delay: time, easing: [60, 10] });
      time += 120;
    });

    $('.fade-in.scale').velocity(
        { scaleX: .4, scaleY: .4, translateX: -600},
        { duration: 0});
    $('.fade-in').each(function() {
      $(this).velocity(
        { opacity: "1", scaleX: 1, scaleY: 1, translateX: 0},
        { duration: 800, easing: [60, 10] });
    });

  });
}( jQuery ));