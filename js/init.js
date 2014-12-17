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
          if(origin.attr('data-origmargin') === undefined) {
            origin.attr('data-origmargin', '1.5rem');            
          }
          if($(window).scrollTop() >= origin.attr('data-origpos') && !origin.hasClass('fixed')) {
            origin.addClass('fixed');
            origin.css('top', tabs_height);
            origin.css('marginTop', '1.5rem');
          }
          if($(window).scrollTop() < origin.attr('data-origpos')) {
            origin.removeClass('fixed');     
            origin.css('marginTop', origin.attr('data-origmargin'));
          }            

        }
      });
    });

    // BuySellAds Detection
    var $bsa = $(".buysellads");
    var $timesToCheck = 3;
    function checkForChanges()
    {
        if ($bsa.find('.bsa_it').height() > 0) 
        {
              $('.table-of-contents').css('marginTop', 285);
              // Floating-Fixed table of contents
              $('.table-of-contents').each(function() {
                var origin = $(this);
                var tabs_height = 0;
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


    // Plugin initialization
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
    $('.button-collapse').sideNav();
    $('.datepicker').pickadate({ formatSubmit: 'yyyy/mm/dd' });

  }); // end of document ready
})(jQuery); // end of jQuery name space