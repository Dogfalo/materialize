(function ($) {
  $(document).ready(function() {

    // Text based inputs
    var input_selector = 'input[type=text], input[type=password], input[type=email], textarea';
    
    $(input_selector).each(function(){
      if($(this).val().length !== 0) {
       $(this).siblings('label').addClass('active');
      }
    })

    $(document).on('focus', input_selector, function () {
      $(this).siblings('label').addClass('active');
    });

    $(document).on('blur', input_selector, function () {
      if ($(this).val().length === 0) {
        $(this).siblings('label').removeClass('active');      
      }
    });


    // Textarea Auto Resize
    if ($('.hiddendiv').length === 0) {
      var hiddenDiv = $('<div class="hiddendiv common"></div>'),
        content = null;
        $('body').append(hiddenDiv);
    }
    var hiddendiv = $('.hiddendiv');
    var text_area_selector = '.materialize-textarea';
      $('body').on('keyup keydown',text_area_selector , function () {
        // console.log($(this).val());
        content = $(this).val();
        content = content.replace(/\n/g, '<br>');
        console.log(content);
        hiddenDiv.html(content + '<br>');
        // console.log(hiddenDiv.html());
        $(this).css('height', hiddenDiv.height());
      });


    // Range Input
    var range_type = 'input[type=range]';
    var range_mousedown = false;

    $(range_type).each(function () {
      var thumb = $('<span class="thumb"><span class="value"></span></span>');
      $(this).after(thumb);
    });

    var range_wrapper = '.range-field';
    
      $(document).on("mousedown", range_wrapper, function(e) {
        var thumb = $(this).children('.thumb');
        if (thumb.length <= 0) {
          thumb = $('<span class="thumb"><span class="value"></span></span>');
          $(this).append(thumb);
        }

      range_mousedown = true;
      $(this).addClass('active');

      if (!thumb.hasClass('active')) {
        thumb.velocity({ height: "30px", width: "30px", top: "-20px", marginLeft: "-15px"}, { duration: 300, easing: 'easeOutExpo' });  
      }
      var left = e.pageX - $(this).offset().left;
      var width = $(this).outerWidth();

      if (left < 0) {
        left = 0;
      }
      else if (left > width) {
        left = width;
      }
      thumb.addClass('active').css('left', left);
      thumb.find('.value').html($(this).children('input[type=range]').val());   
   
    });
    $(document).on("mouseup", range_wrapper, function() {
      range_mousedown = false;
      $(this).removeClass('active');
    });

    $(document).on("mousemove", range_wrapper, function(e) {

      var thumb = $(this).children('.thumb');
      if (range_mousedown) {
        if (!thumb.hasClass('active')) {
          thumb.velocity({ height: "30px", width: "30px", top: "-20px", marginLeft: "-15px"}, { duration: 300, easing: 'easeOutExpo' });  
        }
        var left = e.pageX - $(this).offset().left;
        var width = $(this).outerWidth();

        if (left < 0) {
          left = 0;
        }
        else if (left > width) {
          left = width;
        }
        thumb.addClass('active').css('left', left);
        thumb.find('.value').html($(this).children('input[type=range]').val());   
      }
      
    });
    $(document).on("mouseout", range_wrapper, function() {
      if (!range_mousedown) {

        var thumb = $(this).children('.thumb');

        if (thumb.hasClass('active')) {
          thumb.velocity({ height: "0", width: "0", top: "10px", marginLeft: "-6px"}, { duration: 100 });
        }
        thumb.removeClass('active');
      }
    });




    //  Select Functionality

    // Select Plugin
    $.fn.material_select = function () {
      $(this).each(function(){
        $select = $(this);
        if ( $select.hasClass('disabled') || $select.hasClass('initialized') ){
          return false;
        }

        var uniqueID = guid();
        var wrapper = $('<div class="select-wrapper"></div>');
        var options = $('<ul id="select-options-' + uniqueID+'" class="dropdown-content"></ul>');
        var selectOptions = $select.children('option');
        var label = selectOptions.first();


        // Create Dropdown structure
        selectOptions.each(function () {
          options.append($('<li><span>' + $(this).html() + '</span></li>'));
        });


        options.find('li').each(function (i) {
          var $curr_select = $select;
          $(this).click(function () {
            $curr_select.find('option').eq(i + 1).prop('selected', true);
            $curr_select.prev('span.select-dropdown').html($(this).text());
          });
        });

        // Wrap Elements
        $select.wrap(wrapper);

        // Add Select Display Element
        var $newSelect = $('<span class="select-dropdown" data-activates="select-options-' + uniqueID +'">' + label.html() + '</span>');
        $select.before($newSelect);
        $('body').append(options);
        $newSelect.dropdown({"hover": false});

        $select.addClass('initialized');

      });
    }

    // Unique ID
    var guid = (function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
      }
      return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
               s4() + '-' + s4() + s4() + s4();
      };
    })();

  });

}( jQuery ));
