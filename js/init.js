(function($){
  $(function(){

    // convert rgb to hex value string
    function rgb2hex(rgb) {
      if (/^#[0-9A-F]{6}$/i.test(rgb)) { return rgb; }

      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      function hex(x) {
          return ("0" + parseInt(x).toString(16)).slice(-2);
      }
      return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    $('.dynamic-color .col').each(function () {
      $(this).children().each(function () {
        var color = $(this).css('background-color');
        var classes = $(this).attr('class');
        $(this).html(rgb2hex(color) + " " + classes);
        if (classes.indexOf("darken") >= 0) {
          $(this).css('color', 'rgba(255,255,255,.9');
        }
      });
    });

    // Print out entypo name  
    $('.icon-container').each(function(){
      $(this).children('i').each(function() {
      var wrapper = $('<div></div>').addClass('icon-holder');
      var icon = $(this);
      $(this).wrap(wrapper);
      $('<p></p>').text($(this).attr('class')).insertAfter(icon);
    })
    });
    
    // Floating-Fixed table of contents
    $('.table-of-contents').each(function() {
      var origin = $(this);
      $(window).scroll(function(e) {
        if (origin.is(":visible")) {
          if(origin.attr('data-origpos') == undefined)
            origin.attr('data-origpos', origin.position().top);
          if($(window).scrollTop() >= origin.attr('data-origpos') && !origin.hasClass('fixed')) {
            origin.addClass('fixed');
          }
          if($(window).scrollTop() < origin.attr('data-origpos'))
            origin.removeClass('fixed');
        }
      });
    });

    // PLugin initialization
    $('.tooltipped').tooltip();
    $('.dropdown-button').dropdown();
    $('ul.tabs').tabs();
    $('.parallax').parallax();
    $('.modal-trigger').leanModal();
    $('.tooltipped').tooltip();
    $('.collapsible-accordion').collapsible();
    $('.collapsible-expandable').collapsible({"accordion": false});
    $('.materialboxed').materialbox();
    $('.scrollspy').scrollSpy();
    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space