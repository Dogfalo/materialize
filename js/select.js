(function ($) {
  // Select Plugin
  var Select = function (element, options) {
    this.options = $.extend({}, Select.DEFAULTS, options)
    this.$select = $(element);
    // Allow user to search by typing
    // this array is cleared after 1 second
    this.filterQuery = [];

    if (this.$select.hasClass('browser-default')) {
      return; // Continue to next (return false breaks out of entire loop)
    }

    // Tear down structure if Select needs to be rebuilt
	this.reset();

    var uniqueID = Materialize.guid();
    this.$select.data('select-id', uniqueID);
    this.$wrapper = $('<div class="select-wrapper"></div>');
    this.$wrapper.addClass(this.$select.attr('class'));
    var options = $('<ul id="select-options-' + uniqueID + '" class="dropdown-content select-dropdown"></ul>');
    var selectOptions = this.$select.children('option');
    var label = (this.$select.find('option:selected') !== undefined) ? this.$select.find('option:selected') : options.first();
    // Create Dropdown structure
    selectOptions.each(function () {
      // Add disabled attr if disabled
      options.append($('<li class="' + (($(this).is(':disabled')) ? 'disabled' : '') + '"><span>' + $(this).html() + '</span></li>'));
    });

    var $select = this.$select;
    options.find('li').each(function (i) {
      var $curr_select = $select;
      $(this).click(function () {
        // Check if option element is disabled
        if (!$(this).hasClass('disabled')) {
          $curr_select.find('option').eq(i).prop('selected', true);
          // Trigger onchange() event
          $curr_select.trigger('change');
          $curr_select.siblings('input.select-dropdown').val($(this).text());
        }
      });
    });

    // Wrap Elements
    $select.wrap(this.$wrapper);
    // Add Select Display Element
    var dropdownIcon = $('<span class="caret">&#9660;</span>');
    if ($select.is(':disabled')) {
      dropdownIcon.addClass('disabled');
    }

    this.$newSelect = $('<input type="text" class="select-dropdown" readonly="true" ' + (($select.is(':disabled')) ? 'disabled' : '') + ' data-activates="select-options-' + uniqueID +'" value="'+ label.html() +'"/>');
    $select.before(this.$newSelect);
    this.$newSelect.before(dropdownIcon);

    $('body').append(options);
	options.css('max-height',this.options.maxHeight); // Apply options CSS
    // Check if section element is disabled
    if (!$select.is(':disabled')) {
      this.$newSelect.dropdown({"hover": false});
    }

    // Copy tabindex
    if ($select.attr('tabindex')) {
      $(this.$newSelect[0]).attr('tabindex', $select.attr('tabindex'));
    }

    $select.addClass('initialized');
    var that = this;
    this.$newSelect.on('focus', function(){
      $(this).trigger('open');
      var label = $(this).val();
      var selectedOption = options.find('li').filter(function() {
        return $(this).text().toLowerCase() === label.toLowerCase();
      })[0];
      that.activateOption(options, selectedOption);
    })
    .on('blur', function(){
      $(this).trigger('close');
    })
    .on('keydown', that.onKeyDown);
  };

  Select.DEFAULTS = {
    maxHeight: 'none'
  };

  Select.prototype.destroy = function() {
    this.reset();
    this.$select.data('select-id', null).removeClass('initialized');
  };
  
  Select.prototype.reset = function() {
    var lastID = this.$select.data('select-id');
    if (lastID) {
      this.$select.parent().find('span.caret').remove();
      this.$select.parent().find('input').remove();
      this.$select.unwrap();
      $('ul#select-options-' + lastID).remove();
    }
  };

  // Make option as selected and scroll to selected position
  Select.prototype.activateOption = function(collection, newOption) {
    collection.find('li.active').removeClass('active');
    $(newOption).addClass('active');
    collection.scrollTo(newOption);
  };

  Select.prototype.onKeyDown = function(event){
    var uniqueID = this.$select.attr('id');
    var options = $('#select-options-' + uniqueID);
    // TAB - switch to another input
    if(event.which == 9){
      this.$newSelect.trigger('close');
      return;
    }

    // ARROW DOWN WHEN SELECT IS CLOSED - open select options
    if(event.which == 40 && !options.is(":visible")){
      $newSelect.trigger('open');
      return;
    }

    // ENTER WHEN SELECT IS CLOSED - submit form
    if (event.which == 13 && !options.is(":visible")){
      return;
    }

    event.preventDefault();

    // CASE WHEN USER TYPE LETTERS
    var letter = String.fromCharCode(event.which).toLowerCase();
    var nonLetters = [9,13,27,38,40];
    if (letter && (nonLetters.indexOf(event.which) === -1)){
      filterQuery.push(letter);
      string = filterQuery.join("");
      var newOption = options.find('li').filter(function() {
        return $(this).text().toLowerCase().indexOf(string) === 0;
      })[0];

      if (newOption){
        this.activateOption(options, newOption);
      }
    }

    // ENTER - select option and close when select options are opened
    if (event.which == 13) {
      var activeOption = options.find('li.active:not(.disabled)')[0];
      if(activeOption){
        $(activeOption).trigger('click');
        this.$newSelect.trigger('close');
      }
    }

    // ARROW DOWN - move to next not disabled option
    if(event.which == 40){
      var newOption = options.find('li.active').next('li:not(.disabled)')[0];
      if (newOption) {
        this.activateOption(options, newOption);
      }
    }

    // ESC - close options
    if(event.which == 27){
      this.$newSelect.trigger('close');
    }

    // ARROW UP - move to previous not disabled option
    if(event.which == 38){
      var newOption = options.find('li.active').prev('li:not(.disabled)')[0];
      if (newOption){
        this.activateOption(options, newOption);
      }
    }

    // Automaticaly clean filter query so user can search again by starting letters
    setTimeout(function(){ this.filterQuery = []; }, 1000);
  };

  function Plugin(option) {
    return this.each(function () {
      var options = typeof option == 'object' && option;
      var select = $(this).data('material_select');
      // Store new object
      if (!select) {
        select = new Select(this, options);
        $(this).data('material_select', select);
      }

      if (typeof option === 'string') {
        if (option === 'destroy') {
          select.destroy();
        }
      }
    });
  }

  $.fn.material_select = Plugin;
  $.fn.material_select.Constructor = Select;
}( jQuery ));
