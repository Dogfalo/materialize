(function ($) {

  // Text based inputs
  var text_inputs = $('input[type=text], input[type=password], input[type=email], textarea');  
  
  text_inputs.each(function(){
    if($(this).val().length !== 0) {
     $(this).siblings('label').addClass('active');
    }
  })

  text_inputs.focus(function () {
    $(this).siblings('label').addClass('active');
  });

  text_inputs.blur(function () {
    if ($(this).val().length === 0) {
      $(this).siblings('label').removeClass('active');      
    }
  });


  // Textarea Auto Resize
  $('textarea').each(function () {
    var hiddenDiv = $('<div class="hiddendiv common"></div>'),
        content = null;

    $('body').append(hiddenDiv);

    $(this).on('keyup keydown', function () {

        content = $(this).val();

        content = content.replace(/\n/g, '<br>');
        hiddenDiv.html(content + '<br>');

        $(this).css('height', hiddenDiv.height());

    });
  });


  // Range Input
  var range_input = $('input[type=range]');
  var range_mousedown = false;

  range_input.each(function () {
    var thumb = $('<span class="thumb"><span class="value"></span></span>');
    $(this).after(thumb);
  });

  var range_wrapper = $('.range-field');

  range_wrapper.on("mousedown", function(e) {
    range_mousedown = true;
    $(this).addClass('active');

    var thumb = $(this).children('.thumb');
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
  range_wrapper.on("mouseup", function() {
    range_mousedown = false;
    $(this).removeClass('active');
  });

  range_wrapper.on("mousemove", function(e) {

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
  range_wrapper.on("mouseout", function() {
    if (!range_mousedown) {

      var thumb = $(this).children('.thumb');

      if (thumb.hasClass('active')) {
        thumb.velocity({ height: "0", width: "0", top: "10px", marginLeft: "-6px"}, { duration: 100 });
      }
      thumb.removeClass('active');
    
    }


  });


  //  Select Functionality

  var createSelectStructure = function($select, $index) { 
    var wrapper = $('<div class="select-wrapper"></div>');
    var options = $('<ul id="select-options-' + $index +'" class="dropdown-content"></ul>');
    var selectOptions = $select.children('option');
    var label = selectOptions.first();
    selectOptions = selectOptions.slice(1);

    selectOptions.each(function () {
      options.append($('<li><span>' + $(this).html() + '</span></li>'));
    });
    options.find('li').each(function (i) {
      $(this).click(function () {
        $select.find('option').eq(i + 1).prop('selected', true);
        $select.prev('span.select-dropdown').html($(this).text());
      });
    });

    $select.wrap(wrapper);
    $select.before($('<span class="select-dropdown" data-activates="select-options-' + $index +'">' + label.html() + '</span>'));
    $('body').append(options);

  };

  $('select').not('.disabled').each(function (i) {
    createSelectStructure($(this), i);    
  });


  $('.select-dropdown').dropdown({"hover": false});




}( jQuery ));