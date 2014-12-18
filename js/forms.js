(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('materialize-forms', ['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
  var Materialize, scope = this;
  scope.Materialize = Materialize = (scope.Materialize || {});
  
  // extends
  Materialize.selectors = Materialize.selectors || {};
  Materialize.behaviours = Materialize.behaviours || {};
  Materialize.plugins = Materialize.plugins || {};
  
  // base everything on this element
  Materialize.ROOT = $('body');
  
  // internal flags and counters
  Materialize._selectIndex = 0;
  Materialize._observingTextInputs = false;
  Materialize._observingRangeInputs = false;
  
  // selectors used for behaviours and initialize
  Materialize.selectors.textInput = 'input[type=text], input[type=password], input[type=email], textarea';
  Materialize.selectors.rangeInput = 'input[type=range]';
  Materialize.selectors.rangeField = '.range-field';
  Materialize.selectors.autoResize = 'textarea';
  Materialize.selectors.selectInput = 'select:not(.disabled)';
  
  // ===================================================================================================
  // 
  // Label "active" toggle
  // 
  Materialize.behaviours.inputLabels = function() {
    if (Materialize._observingTextInputs) {
      return; // prevent multiple invocations
    }
    Materialize.ROOT.on('focus', Materialize.selectors.textInput, function() {
      $(this).siblings('label').addClass('active');
    });
    Materialize.ROOT.on('blur', Materialize.selectors.textInput, function() {
      if ($.trim($(this).val()).length === 0) {
        $(this).siblings('label').removeClass('active');      
      }
    });
    Materialize._observingTextInputs = true;
  };
  
  // ===================================================================================================
  // 
  // Range Input Mouse Behaviour
  // 
  Materialize.behaviours.rangeInputs = function() {
    if (Materialize._observingRangeInputs) {
      return; // prevent multiple invocations
    }
    var _rangeMouseDown = false; // TODO: check if this has to be global
    
    // The entire range observer set could be merged into the plugin method and thus 
    // scoped onto the input directly // Per documentation 'range-field' has to be written manually.
    // example: $(this).wrap('<div class="range-field"></div>');
    
    Materialize.ROOT.on("mousedown", Materialize.selectors.rangeField, function(e) {
      _rangeMouseDown = true;
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
      thumb.find('.value').html($(this).children(Materialize.selectors.rangeInput).val());   
    });
    Materialize.ROOT.on("mouseup", Materialize.selectors.rangeField, function() {
      _rangeMouseDown = false;
      $(this).removeClass('active');
    });
    Materialize.ROOT.on("mousemove", Materialize.selectors.rangeField, function(e) {
      var thumb = $(this).children('.thumb');
      if (_rangeMouseDown) {
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
        thumb.find('.value').html($(this).children(Materialize.selectors.rangeInput).val());   
      }
    });
    Materialize.ROOT.on("mouseout", Materialize.selectors.rangeField, function() {
      if (!_rangeMouseDown) {
        var thumb = $(this).children('.thumb');
        if (thumb.hasClass('active')) {
          thumb.velocity({ height: "0", width: "0", top: "10px", marginLeft: "-6px"}, { duration: 100 });
        }
        thumb.removeClass('active');
      }
    });
    
    Materialize._observingRangeInputs = true;
  };
  
  // ===================================================================================================
  // 
  // Plugin: Textarea Auto Resize
  // 
  Materialize.plugins.autoResize = function(element) {
    var textarea = $(element); 
    textarea.each(function () {
      var element = $(this)
        , hiddenDiv = $('<div class="hiddendiv common"></div>')
        , content = null;
      $('body').append(hiddenDiv);
      element.on('keyup keydown', function () {
          content = $(this).val();
          content = content.replace(/\n/g, '<br>');
          hiddenDiv.html(content + '<br>');
          element.css('height', hiddenDiv.height());
      });
    });
    return textarea;
  };
  $.fn.materialAutoResize = function(){
    return Materialize.plugins.autoResize(this);
  };
  
  
  // ===================================================================================================
  // 
  // Plugin: Range Input
  // 
  Materialize.plugins.rangeInput = function(element) {
    var input = $(element)
      , thumb = $('<span class="thumb"><span class="value"></span></span>');
    
    $(element).after(thumb);
    return input;
  };
  $.fn.materialRangeInput = function() {
    return Materialize.plugins.rangeInput(this);
  };
  
  
  // ===================================================================================================
  // 
  // Plugin: Select Dropdowns
  // 
  Materialize.plugins.selectInput = function(element) {
    Materialize._selectIndex++;
    var select = $(element)
      , selectIndex = Materialize._selectIndex
      , wrapper = $('<div class="select-wrapper"></div>')
      , options = $('<ul id="select-options-' + selectIndex +'" class="dropdown-content"></ul>')
      , selectOptions = select.children('option')
      , label = selectOptions.first()
      , selectDropdown = $('<span class="select-dropdown" data-activates="select-options-' + selectIndex +'">' + label.html() + '</span>');
    
    selectOptions = selectOptions.slice(1);
    selectOptions.each(function () {
      options.append($('<li><span>' + $(this).html() + '</span></li>'));
    });
    options.find('li').each(function (i) {
      $(this).click(function () {
        select.find('option').eq(i + 1).prop('selected', true);
        select.prev('span.select-dropdown').html($(this).text());
      });
    });
    
    select.wrap(wrapper);
    select.before(selectDropdown);
    $('body').append(options);
    selectDropdown.dropdown({"hover": false}); // initialize child dropdown
    return select;
  };
  $.fn.materialSelect = function() {
    return Materialize.plugins.selectInput(this);
  };
  
  // Initialize
  Materialize.behaviours.inputLabels();
  Materialize.behaviours.rangeInputs();
  Materialize.ROOT.find(Materialize.selectors.autoResize).materialAutoResize();
  Materialize.ROOT.find(Materialize.selectors.rangeInput).materialRangeInput();
  Materialize.ROOT.find(Materialize.selectors.selectInput).materialSelect();
  Materialize.ROOT.find(Materialize.selectors.textInput).blur();

}));