(function ($) {
  $(document).ready(function() {

    var time = 0;

    // Horizontal staggered list
    showStaggeredList = function(selector) {
      $(selector).find('li').velocity(
          { translateX: "-100px"},
          { duration: 0 });

      $(selector).find('li').each(function() {
        $(this).velocity(
          { opacity: "1", translateX: "0"},
          { duration: 800, delay: time, easing: [60, 10] });
        time += 120;
      });
    }

    // Hardcoded .staggered-list scrollFire
    var staggeredListOptions = [];
    $('ul.staggered-list').each(function (i) {

      console.log(i);
      var label = 'scrollFire-' + i;
      $(this).addClass(label);
      staggeredListOptions.push(
        {selector: 'ul.staggered-list.' + label,
         offset: 200,
         callback: 'showStaggeredList("ul.staggered-list.' + label + '")'});
    });
    console.log(staggeredListOptions);
    scrollFire(staggeredListOptions);




    // time = 0
    // // Vertical Staggered list
    // $('ul.staggered-list.vertical li').velocity(
    //     { translateY: "100px"},
    //     { duration: 0 });

    // $('ul.staggered-list.vertical li').each(function() {
    //   $(this).velocity(
    //     { opacity: "1", translateY: "0"},
    //     { duration: 800, delay: time, easing: [60, 25] });
    //   time += 120;
    // });

    // // Fade in and Scale
    // $('.fade-in.scale').velocity(
    //     { scaleX: .4, scaleY: .4, translateX: -600},
    //     { duration: 0});
    // $('.fade-in').each(function() {
    //   $(this).velocity(
    //     { opacity: "1", scaleX: 1, scaleY: 1, translateX: 0},
    //     { duration: 800, easing: [60, 10] });
    // });


    // Image transition function
    fadeInImage =  function(selector){
      var element = $(selector);
      element.css({opacity: 0});
      $(element).velocity({opacity: 1}, {
          duration: 650,
          queue: false,
          easing: 'easeOutSine'
        });
      $(element).animate({opacity: 1}, {
            duration: 1300,
            queue: false,
            easing: 'swing',
            step: function(now, fx) {
                fx.start = 100;
                var grayscale_setting = now/100;
                var brightness_setting = 150 - (100 - now)/1.75;

                if (brightness_setting < 100)
                  brightness_setting = 100;
                console.log(grayscale_setting)
                if (now >= 0) {
                  $(this).css({
                      "-webkit-filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)",
                      "filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)"
                  });
                }
            }
        });
    };

  });
}( jQuery ));