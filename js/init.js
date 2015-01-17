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
        var color = $(this).css('background-color'),
            classes = $(this).attr('class');
        $(this).html(rgb2hex(color) + " " + classes);
        if (classes.indexOf("darken") >= 0) {
          $(this).css('color', 'rgba(255,255,255,.9');
        }
      });
    });


    // Floating-Fixed table of contents
    if ($('.table-of-contents').length) {
      var toc_offset = $('.table-of-contents').first().offset().top;
      $('.table-of-contents').each(function() {
        var origin = $(this);
        origin.pushpin({ top: toc_offset,
          bottom: $(document).height() - window.innerHeight });
      });
    }




    // BuySellAds Detection
    var $bsa = $(".buysellads"),
        $timesToCheck = 3;
    function checkForChanges()
    {
        if ($bsa.find('#carbonads').height() > 0)
        {
              $('.table-of-contents').css('marginTop', 285);
              // Floating-Fixed table of contents
              $('.table-of-contents').each(function() {
                var origin = $(this),
                    tabs_height = 0;
                if ($('.tabs-wrapper').length) {
                  tabs_height = $('.tabs-wrapper').height();
                }
                $(window).scroll(function() {

                  if (origin.is(":visible")) {
                    origin.attr('data-origpos', origin.position().top - tabs_height + 285);
                    origin.attr('data-origmargin', 285);
                  }
                });
              });
        }
        else {
          $timesToCheck -= 1;
          if ($timesToCheck >= 0) {
            setTimeout(checkForChanges, 500);
          }
        }

    }
    checkForChanges();



    // Tabs Fixed
    if ($('.tabs-wrapper').length) {
      $('.tabs-wrapper .row').pushpin({ top: $('.tabs-wrapper').offset().top });
    }

    // Github Latest Commit
    if ($('.github-commit').length) { // Checks if widget div exists (Index only)
      $.ajax({
        url: "https://api.github.com/repos/dogfalo/materialize/commits/master",
        dataType: "json",
        success: function (data) {
          var sha = data.sha,
              date = jQuery.timeago(data.commit.author.date);
          if (window_width < 1120) {
            sha = sha.substring(0,7);
          }
          $('.github-commit').find('.date').html(date);
          $('.github-commit').find('.sha').html(sha).attr('href', data.html_url);

          // console.log(returndata, returndata.commit.author.date, returndata.sha);
        }
      });
    }

    // Toggle Flow Text
    var toggleFlowTextButton = $('#flow-toggle')
    toggleFlowTextButton.click( function(){
      $('#flow-text-demo').children('p').each(function(){
          $(this).toggleClass('flow-text');
        })
    });

//    Toggle Containers on page
    var toggleContainersButton = $('#container-toggle-button');
    toggleContainersButton.click(function(){
      $('body .browser-window .container, .had-container').each(function(){
        $(this).toggleClass('had-container');
        $(this).toggleClass('container');
        if ($(this).hasClass('container')) {
          toggleContainersButton.text("Turn off Containers");
        }
        else {
          toggleContainersButton.text("Turn on Containers");
        }
      });
    });

    // Detect touch screen and enable scrollbar if necessary
    function is_touch_device() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    }
    if (is_touch_device()) {
      $('#nav-mobile').css({ overflow: 'auto'})
    }


    // Plugin initialization
    $('.slider').slider({full_width: true});
    $('.dropdown-button').dropdown({hover: false});
    if (window_width > 600) {
      $('ul.tabs').tabs();
    }
    else {
      $('ul.tabs').hide();
    }
    $('.tab-demo').show().tabs();
    $('.parallax').parallax();
    $('.modal-trigger').leanModal();
    $('.tooltipped').tooltip({"delay": 300});
    $('.collapsible-accordion').collapsible();
    $('.collapsible-expandable').collapsible({"accordion": false});
    $('.materialboxed').materialbox();
    $('.scrollspy').scrollSpy();
    $('.button-collapse').sideNav({'edge': 'left'});
    $('.datepicker').pickadate();
    $('select').not('.disabled').material_select();


  }); // end of document ready
})(jQuery); // end of jQuery name space
