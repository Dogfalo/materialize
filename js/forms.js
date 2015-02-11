(function ($) {
  $(document).ready(function() {

    // Text based inputs
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';

    // Add active if form auto complete
    $(document).on('change', input_selector, function () {
      if($(this).val().length !== 0) {
        $(this).siblings('label, i').addClass('active');
      }
      validate_field($(this));
    });

    // Add active if input element has been pre-populated on document ready
    $(document).ready(function() {
      $(input_selector).each(function(index, element) {
        if($(element).val().length > 0) {
          $(this).siblings('label, i').addClass('active');
        }
      });
    });

    // HTML DOM FORM RESET handling
    $(document).on('reset', function(e) {
      if ($(e.target).is('form')) {
        $(this).find(input_selector).removeClass('valid').removeClass('invalid');

        // Reset select
        $(this).find('select.initialized').each(function () {
          var reset_text = $(this).find('option[selected]').text();
          $(this).siblings('input.select-dropdown').val(reset_text);
        });
      }
    });

    // Add active when element has focus
    $(document).on('focus', input_selector, function () {
      $(this).siblings('label, i').addClass('active');
    });

    $(document).on('blur', input_selector, function () {
      if ($(this).val().length === 0) {
        $(this).siblings('label, i').removeClass('active');
      }
      validate_field($(this));
    });

    validate_field = function(object) {
      if (object.val().length === 0) {
        if (object.hasClass('validate')) {
          object.removeClass('valid');
          object.removeClass('invalid');
        }
      }
      else {
        if (object.hasClass('validate')) {
          if (object.is(':valid')) {
            object.removeClass('invalid');
            object.addClass('valid');
          }
          else {
            object.removeClass('valid');
            object.addClass('invalid');
          }
        }
      }
    }


    // Textarea Auto Resize
    if ($('.hiddendiv').length === 0) {
      var hiddenDiv = $('<div class="hiddendiv common"></div>'),
        content = null;
        $('body').append(hiddenDiv);
    }
    var text_area_selector = '.materialize-textarea';
    $('.hiddendiv').css('width', $(text_area_selector).width());

    $(text_area_selector).each(function () {
      if ($(this).val().length) {
        content = $(this).val();
        content = content.replace(/\n/g, '<br>');
        hiddenDiv.html(content + '<br>');
        $(this).css('height', hiddenDiv.height());
      }
    });
      $('body').on('keyup keydown',text_area_selector , function () {
        // console.log($(this).val());
        content = $(this).val();
        content = content.replace(/\n/g, '<br>');
        hiddenDiv.html(content + '<br>');
        // console.log(hiddenDiv.html());
        $(this).css('height', hiddenDiv.height());
      });


    // File Input Path
    $('.file-field').each(function() {
      var path_input = $(this).find('input.file-path');
      $(this).find('input[type="file"]').change(function () {
        path_input.val($(this).val());
        path_input.trigger('change');
      });
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
    $.fn.material_select = function (callback) {
      $(this).each(function(){
        $select = $(this);

        if ( $select.hasClass('browser-default') || $select.hasClass('initialized')) {
          return; // Continue to next (return false breaks out of entire loop)
        }

        var uniqueID = guid();
        var wrapper = $('<div class="select-wrapper"></div>');
        var options = $('<ul id="select-options-' + uniqueID+'" class="dropdown-content select-dropdown"></ul>');
        var selectOptions = $select.children('option');
        if ($select.find('option:selected') !== undefined) {
          var label = $select.find('option:selected');
        }
        else {
          var label = options.first();
        }


        // Create Dropdown structure
        selectOptions.each(function () {
          // Add disabled attr if disabled
          options.append($('<li class="' + (($(this).is(':disabled')) ? 'disabled' : '') + '"><span>' + $(this).html() + '</span></li>'));
        });


        options.find('li').each(function (i) {
          var $curr_select = $select;
          $(this).click(function () {
            // Check if option element is disabled
            if (!$(this).hasClass('disabled')) {
              $curr_select.find('option').eq(i).prop('selected', true);
              // Trigger onchange() event
              $curr_select.trigger('change');
              $curr_select.siblings('input.select-dropdown').val($(this).text());
              if (typeof callback !== 'undefined') callback();
            }
          });

        });

        // Wrap Elements
        $select.wrap(wrapper);
        // Add Select Display Element
        var $newSelect = $('<input type="text" class="select-dropdown" readonly="true" ' + (($select.is(':disabled')) ? 'disabled' : '')
                         + ' data-activates="select-options-' + uniqueID +'" value="'+ label.html() +'"/><i class="mdi-navigation-arrow-drop-down">');
        $select.before($newSelect);
        $('body').append(options);
        // Check if section element is disabled
        if (!$select.is(':disabled')) {
          $newSelect.dropdown({"hover": false});
        }
        $select.addClass('initialized');

        $newSelect.on('focus', function(){
          $(this).trigger('open');
          label = $(this).val();
          selectedOption = options.find('li').filter(function() {
            return $(this).text().toLowerCase() === label.toLowerCase();
          })[0];
          activateOption(options, selectedOption);
        });

        $newSelect.on('blur', function(){
          $(this).trigger('close');
        });

        // Make option as selected and scroll to selected position
        activateOption = function(collection, newOption) {
          collection.find('li.active').removeClass('active');
          $(newOption).addClass('active');
          collection.scrollTo(newOption);
        }

        // Allow user to search by typing
        // this array is cleared after 1 second
        filterQuery = []

        onKeyDown = function(event){
          // TAB - switch to another input
          if(event.which == 9){
            $newSelect.trigger('close');
            return
          }

          // ARROW DOWN WHEN SELECT IS CLOSED - open select options
          if(event.which == 40 && !options.is(":visible")){
            $newSelect.trigger('open');
            return
          }

          // ENTER WHEN SELECT IS CLOSED - submit form
          if(event.which == 13 && !options.is(":visible")){
            return
          }

          event.preventDefault();

          // CASE WHEN USER TYPE LETTERS
          letter = String.fromCharCode(event.which).toLowerCase();

          if (letter){
            filterQuery.push(letter);

            string = filterQuery.join("");

            newOption = options.find('li').filter(function() {
              return $(this).text().toLowerCase().indexOf(string) === 0;
            })[0];

            if(newOption){
              activateOption(options, newOption);
            }
          }

          // ENTER - select option and close when select options are opened
          if(event.which == 13){
            activeOption = options.find('li.active:not(.disabled)')[0];
            if(activeOption){
              $(activeOption).trigger('click');
              $newSelect.trigger('close');
            }
          }

          // ARROW DOWN - move to next not disabled option
          if(event.which == 40){
            newOption = options.find('li.active').next('li:not(.disabled)')[0];
            if(newOption){
              activateOption(options, newOption);
            }
          }

          // ESC - close options
          if(event.which == 27){
            $newSelect.trigger('close');
          }

          // ARROW UP - move to previous not disabled option
          if(event.which == 38){
            newOption = options.find('li.active').prev('li:not(.disabled)')[0];
            if(newOption){
              activateOption(options, newOption);
            }
          }

          // Automaticaly clean filter query so user can search again by starting letters
          setTimeout(function(){filterQuery = []}, 1000)
        }

        $newSelect.on('keydown', onKeyDown);
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
