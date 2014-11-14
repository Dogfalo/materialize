(function($){
  $(function(){

    var window_width = $(window).width();

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
    
    // Floating-Fixed table of contents
    $('.table-of-contents').each(function() {
      var origin = $(this);
      $(window).scroll(function() {
        var tabs_height = 0;
        if ($('.tabs-wrapper').length) {
          tabs_height = $('.tabs-wrapper').height();
        }
        if (origin.is(":visible")) {
          if(origin.attr('data-origpos') === undefined) {
            origin.attr('data-origpos', origin.position().top - tabs_height);            
          }
          if($(window).scrollTop() >= origin.attr('data-origpos') && !origin.hasClass('fixed')) {
            origin.addClass('fixed');
            origin.css('top', tabs_height);
          }
          if($(window).scrollTop() < origin.attr('data-origpos')) {
            origin.removeClass('fixed');            
          }
        }
      });
    });
    $(window).scroll(function() {
      var origin = $('.tabs-wrapper');
      var origin_row = origin.find('.row');
      if (origin.is(":visible")) {
        if(origin.attr('data-origpos') === undefined) {
          origin.attr('data-origpos', origin.position().top);            
        }
        if($(window).scrollTop() >= origin.attr('data-origpos') && !origin.hasClass('fixed')) {
          origin_row.addClass('fixed');
        }
        if($(window).scrollTop() < origin.attr('data-origpos')) {
          origin_row.removeClass('fixed');            
        }
      }
    });

    // Github Latest Commit
    if ($('.github-commit').length) { // Checks if widget div exists (Index only)
      $.ajax({
        url: "https://api.github.com/repos/dogfalo/materialize/commits/master",
        dataType: "json", 
        success: function (data) {
          var sha = data.sha;
          var date = jQuery.timeago(data.commit.author.date);
          if (window_width < 600) {
            sha = sha.substring(0,7);
          }
          $('.github-commit').find('.date').html(date);
          $('.github-commit').find('.sha').html(sha).attr('href', data.html_url);

          // console.log(returndata, returndata.commit.author.date, returndata.sha);
        }  
      });      
    }



    // PLugin initialization
    $('.tooltipped').tooltip();
    $('.dropdown-button').dropdown();
    if (window_width > 600) {
      $('ul.tabs').tabs();
    }
    else {
      $('ul.tabs').hide();
    }
    $('.tab-demo').show().tabs();
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