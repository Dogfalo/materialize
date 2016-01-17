(function ($) {
  $(document).ready(function() {

    // Function to update labels of text fields
    Materialize.updateTextFields = function() {
      var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
      $(input_selector).each(function(index, element) {
        if ($(element).val().length > 0 || element.autofocus ||$(this).attr('placeholder') !== undefined || $(element)[0].validity.badInput === true) {
          $(this).siblings('label, i').addClass('active');
        }
        else {
          $(this).siblings('label, i').removeClass('active');
        }
      });
    };

    // Text based inputs
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';

    // Add active if form auto complete
    $(document).on('change', input_selector, function () {
      if($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) {
        $(this).siblings('label').addClass('active');
      }
      validate_field($(this));
    });

    // Add active if input element has been pre-populated on document ready
    $(document).ready(function() {
      Materialize.updateTextFields();
    });

    // HTML DOM FORM RESET handling
    $(document).on('reset', function(e) {
      var formReset = $(e.target);
      if (formReset.is('form')) {
        formReset.find(input_selector).removeClass('valid').removeClass('invalid');
        formReset.find(input_selector).each(function () {
          if ($(this).attr('value') === '') {
            $(this).siblings('label, i').removeClass('active');
          }
        });

        // Reset select
        formReset.find('select.initialized').each(function () {
          var reset_text = formReset.find('option[selected]').text();
          formReset.siblings('input.select-dropdown').val(reset_text);
        });
      }
    });

    // Add active when element has focus
    $(document).on('focus', input_selector, function () {
      $(this).siblings('label, i').addClass('active');
    });

    $(document).on('blur', input_selector, function () {
      var $inputElement = $(this);
      if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
        $inputElement.siblings('label, i').removeClass('active');
      }

      if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') !== undefined) {
        $inputElement.siblings('i').removeClass('active');
      }
      validate_field($inputElement);
    });

    window.validate_field = function(object) {
      var hasLength = object.attr('length') !== undefined;
      var lenAttr = parseInt(object.attr('length'));
      var len = object.val().length;

      if (object.val().length === 0 && object[0].validity.badInput === false) {
        if (object.hasClass('validate')) {
          object.removeClass('valid');
          object.removeClass('invalid');
        }
      }
      else {
        if (object.hasClass('validate')) {
          // Check for character counter attributes
          if ((object.is(':valid') && hasLength && (len <= lenAttr)) || (object.is(':valid') && !hasLength)) {
            object.removeClass('invalid');
            object.addClass('valid');
          }
          else {
            object.removeClass('valid');
            object.addClass('invalid');
          }
        }
      }
    };

    // Radio and Checkbox focus class
    var radio_checkbox = 'input[type=radio], input[type=checkbox]';
    $(document).on('keyup.radio', radio_checkbox, function(e) {
      // TAB, check if tabbing to radio or checkbox.
      if (e.which === 9) {
        $(this).addClass('tabbed');
        var $this = $(this);
        $this.one('blur', function(e) {
          console.log(e);
          $(this).removeClass('tabbed');
        });
        return;
      }
    });

    // Textarea Auto Resize
    var hiddenDiv = $('.hiddendiv').first();
    if (!hiddenDiv.length) {
      hiddenDiv = $('<div class="hiddendiv common"></div>');
      $('body').append(hiddenDiv);
    }
    var text_area_selector = '.materialize-textarea';

    function textareaAutoResize($textarea) {
      // Set font properties of hiddenDiv

      var fontFamily = $textarea.css('font-family');
      var fontSize = $textarea.css('font-size');

      if (fontSize) { hiddenDiv.css('font-size', fontSize); }
      if (fontFamily) { hiddenDiv.css('font-family', fontFamily); }

      if ($textarea.attr('wrap') === "off") {
        hiddenDiv.css('overflow-wrap', "normal")
                 .css('white-space', "pre");
      }

      hiddenDiv.text($textarea.val() + '\n');
      var content = hiddenDiv.html().replace(/\n/g, '<br>');
      hiddenDiv.html(content);


      // When textarea is hidden, width goes crazy.
      // Approximate with half of window size

      if ($textarea.is(':visible')) {
        hiddenDiv.css('width', $textarea.width());
      }
      else {
        hiddenDiv.css('width', $(window).width()/2);
      }

      $textarea.css('height', hiddenDiv.height());
    }

    $(text_area_selector).each(function () {
      var $textarea = $(this);
      if ($textarea.val().length) {
        textareaAutoResize($textarea);
      }
    });

    $('body').on('keyup keydown autoresize', text_area_selector, function () {
      textareaAutoResize($(this));
    });

    // File Input Path
    $(document).on('change', '.file-field input[type="file"]', function () {
      var file_field = $(this).closest('.file-field');
      var path_input = file_field.find('input.file-path');
      var files      = $(this)[0].files;
      var file_names = [];
      for (var i = 0; i < files.length; i++) {
        file_names.push(files[i].name);
      }
      path_input.val(file_names.join(", "));
      path_input.trigger('change');
    });

    /****************
    *  Range Input  *
    ****************/

    var range_type = 'input[type=range]';
    var range_mousedown = false;
    var left;

    $(range_type).each(function () {
      var thumb = $('<span class="thumb"><span class="value"></span></span>');
      $(this).after(thumb);
    });

    var range_wrapper = '.range-field';
    $(document).on('change', range_type, function(e) {
      var thumb = $(this).siblings('.thumb');
      thumb.find('.value').html($(this).val());
    });

    $(document).on('input mousedown touchstart', range_type, function(e) {
      var thumb = $(this).siblings('.thumb');
      var width = $(this).outerWidth();

      // If thumb indicator does not exist yet, create it
      if (thumb.length <= 0) {
        thumb = $('<span class="thumb"><span class="value"></span></span>');
        $(this).after(thumb);
      }

      // Set indicator value
      thumb.find('.value').html($(this).val());

      range_mousedown = true;
      $(this).addClass('active');

      if (!thumb.hasClass('active')) {
        thumb.velocity({ height: "30px", width: "30px", top: "-20px", marginLeft: "-15px"}, { duration: 300, easing: 'easeOutExpo' });
      }

      if (e.type !== 'input') {
        if(e.pageX === undefined || e.pageX === null){//mobile
           left = e.originalEvent.touches[0].pageX - $(this).offset().left;
        }
        else{ // desktop
           left = e.pageX - $(this).offset().left;
        }
        if (left < 0) {
          left = 0;
        }
        else if (left > width) {
          left = width;
        }
        thumb.addClass('active').css('left', left);
      }

      thumb.find('.value').html($(this).val());
    });

    $(document).on('mouseup touchend', range_wrapper, function() {
      range_mousedown = false;
      $(this).removeClass('active');
    });

    $(document).on('mousemove touchmove', range_wrapper, function(e) {
      var thumb = $(this).children('.thumb');
      var left;
      if (range_mousedown) {
        if (!thumb.hasClass('active')) {
          thumb.velocity({ height: '30px', width: '30px', top: '-20px', marginLeft: '-15px'}, { duration: 300, easing: 'easeOutExpo' });
        }
        if (e.pageX === undefined || e.pageX === null) { //mobile
          left = e.originalEvent.touches[0].pageX - $(this).offset().left;
        }
        else{ // desktop
          left = e.pageX - $(this).offset().left;
        }
        var width = $(this).outerWidth();

        if (left < 0) {
          left = 0;
        }
        else if (left > width) {
          left = width;
        }
        thumb.addClass('active').css('left', left);
        thumb.find('.value').html(thumb.siblings(range_type).val());
      }
    });

    $(document).on('mouseout touchleave', range_wrapper, function() {
      if (!range_mousedown) {

        var thumb = $(this).children('.thumb');

        if (thumb.hasClass('active')) {
          thumb.velocity({ height: '0', width: '0', top: '10px', marginLeft: '-6px'}, { duration: 100 });
        }
        thumb.removeClass('active');
      }
    });
  }); // End of $(document).ready

  /*******************
   *  Select Plugin  *
   ******************/
  $.fn.material_select = function(callback) {
    // Return true if the element passed as parameter matches to the tag name
    function isTagName(tagName, element) {
      return tagName === element.tagName;
    }

    // Fill the input with all values from selected options
    function fillContentInput(selectedOptions, _this) {
      var value = [];

      // Push all the text values in value
      for (var i = 0, countOptions = selectedOptions.length; i < countOptions; i++) {
        value.push(selectedOptions[i].textContent);
      }

      // If no selected, get the text from the first disabled
      if (!value.length) {
        // Prevent error if there is no disabled option
        var disabledElement = _this.elements.dropdown.querySelector('li.disabled');

        if (disabledElement) {
          value.push(disabledElement.textContent);
        }
      }

      _this.elements.input.value = value.join(', ');
    }

    // Get all elements from a specific optgroup
    function getOptgroupElements(optgroupLabel, _this) {
      var elements = _this.elements.select.querySelectorAll('optgroup[label="' + optgroupLabel + '"] option');

      return elements;
    }

    // Destroy a select
    function destroySelect(select) {
      var defaultSelectParent = select.parentNode.parentNode,
        selectParent = select.parentNode;

      // Reset the select
      select.dataset.id = null;
      select.classList.remove('initialized');
      // Reorder the select in the DOM before material_select changes
      defaultSelectParent.appendChild(select);
      defaultSelectParent.removeChild(selectParent);
      defaultSelectParent.insertBefore(select, defaultSelectParent.querySelector('label'));
    }

    // Update the select with new values
    function updateSelect(_this) {
      // Reset the select
      resetSelect(_this);

      // Fill the dropdown with new values
      if (_this.prop.isSelectedOption) {
        var selected = _this.prop.selected();

        Array.prototype.forEach.call(selected, function(option) {
          // True is specify for performing on load
          toggleSelectElement(option, _this, true);
        });
      }
    }

    // Reset the select with no selected status
    function resetSelect(_this) {
      if (_this.prop.multiple) {
        Array.prototype.forEach.call(_this.elements.checkboxes, function(element) {
          element.checked = false;
        });
      } else {
        Array.prototype.forEach.call(_this.elements.radio, function(element) {
          element.checked = false;
        });
      }

      Array.prototype.forEach.call(_this.elements.li, function(element) {
        element.classList.remove('active');
      });
    }

    // Make option as active or selected and scroll to its position
    function activateOption(collection, newOption) {
      if (newOption) {
        // Remove selected class from previous selected element
        var selected = collection.querySelector('li.selected');

        if (selected) {
          selected.classList.remove('selected');
        }

        newOption.classList.add('selected');
        $(collection).scrollTo(newOption);
      }
    }

    /* Create a new select with his own data
     *
     * Select Constructor
     *
     */
    function CreateSelect(select) {
      var _this = {};

      // Reference for class and optgroup and multiple attributes
      _this.prop = (function() {
        var self = {};
        self.id = Materialize.guid();
        self.className = select.className;
        self.optgroup = select.querySelector('optgroup') ? true : false;
        self.multiple = select.getAttribute('multiple') !== null ? true : false;
        self.hover = false;
        self.elements = select.querySelectorAll('*'),
          self.isSelectedOption = function() {
            var selectedOption = select.options[_this.elements.select.selectedIndex] ? true : false;

            return selectedOption;
          },
          self.selected = function() {
            var list = [],
              option;

            for (var i = 0, countOptions = _this.elements.select.options.length; i < countOptions; i++) {
              option = _this.elements.select.options[i];

              if (option.selected) {
                list.push(option);
              }
            }

            return list;
          };

        return self;
      })();
      _this.elements = {};

      // Refer the select
      _this.elements.select = select;
      _this.elements.select.dataset.id = _this.prop.id;
      // Add trigger for change event
      $(_this.elements.select).on('update', function() {
        updateSelect(_this);
      });

      // Create the caret
      _this.elements.caret = document.createElement('span');
      _this.elements.caret.className = 'caret';
      _this.elements.caret.innerHTML = '&#9660;';

      // Create the dropdown
      _this.elements.dropdown = document.createElement('ul');
      _this.elements.dropdown.id = 'select-options-' + _this.prop.id;
      // Refer the select id as data-id
      if (_this.elements.select.id) {
        _this.elements.dropdown.dataset.id = _this.elements.select.id;
      }
      _this.elements.dropdown.className = 'dropdown-content select-dropdown';
      // Add event
      $(_this.elements.dropdown).hover(function() {
        _this.prop.hover = true;
      }, function() {
        _this.prop.hover = false;
      });

      // Create the wrapper
      _this.elements.wrapper = document.createElement('div');
      _this.elements.wrapper.className = _this.prop.className;
      _this.elements.wrapper.classList.add('select-wrapper');

      // Create the input
      _this.elements.input = document.createElement('input');
      _this.elements.input.type = 'text';
      _this.elements.input.className = 'select-dropdown';
      _this.elements.input.setAttribute('readonly', true);
      _this.elements.input.dataset.activates = 'select-options-' + _this.prop.id;
      if (_this.elements.select.dataset.maxlength) {
        _this.elements.input.dataset.maxlength = _this.elements.select.dataset.maxlength;
      }
      // Add events
      $(_this.elements.input).on({
        'focus': function() {
          if ($('ul.select-dropdown').not(_this.elements.dropdown).is(':visible')) {
            $('input.select-dropdown').trigger('close');
          }

          if (!$(_this.elements.dropdown).is(':visible')) {
            $(_this.elements.input).trigger('open', ['focus']);
          }
        },
        'click': function(e) {
          e.stopPropagation();
        },
        'blur': function() {
          if (!_this.prop.multiple) {
            $(_this.elements.input).trigger('close');
          }
        }
      });

      $(window).on({
        'click': function() {
          _this.prop.multiple && (_this.prop.hover || $(_this.elements.input).trigger('close'));
        }
      });

      // Copy tabindex
      if (_this.elements.select.getAttribute('tabindex')) {
        _this.elements.input.setAttribute('tabindex', _this.elements.select.getAttribute('tabindex'));
      }

      // Set the onkeydown function
      _this.filterQuery = [];

      function onKeyDown(e) {
        var code = e.keyCode || e.which;

        // TAB - switch to another input
        if (code === 9) {
          $(_this.elements.input).trigger('close');

          return;
        }

        // ARROW DOWN WHEN SELECT IS CLOSED - open select dropdown
        if (code === 40 && _this.elements.dropdown.offsetParent === null) {
          $(_this.elements.input).trigger('open');

          return;
        }

        // ENTER WHEN SELECT IS CLOSED - submit form
        if (code === 13 && _this.elements.dropdown.offsetParent === null) {
          return;
        }

        e.preventDefault();

        // CASE WHEN USER TYPE LETTERS
        var letter = String.fromCharCode(code).toLowerCase(),
          nonLetters = [9, 13, 27, 38, 40],
          selectedOption;

        if (letter && (nonLetters.indexOf(code) === -1)) {
          _this.filterQuery.push(letter);

          var array = [],
            options = _this.elements.dropdown.querySelectorAll('li');

          Array.prototype.forEach.call(options, function(option) {
            array.push(option);
          });

          var string = _this.filterQuery.join(''),
            newOption = array.filter(function(option) {
              return option.textContent.toLowerCase().indexOf(string) === 0;
            })[0];

          if (newOption) {
            activateOption(_this.elements.dropdown, newOption);
          }
        }

        // ENTER - select option and close when select dropdown are opened
        if (code === 13) {
          var activeOption = _this.elements.dropdown.querySelector('li.selected:not(.disabled)');

          if (activeOption) {
            $(activeOption).trigger('click');

            if (!_this.prop.multiple) {
              $(_this.elements.input).trigger('close');
            }
          }
        }

        if (code === 40) {
          selectedOption = _this.elements.dropdown.querySelector('li.selected');

          if (selectedOption) {
            newOption = _this.elements.dropdown.querySelector('li.selected').nextSibling;
          } else {
            newOption = _this.elements.dropdown.querySelector('li:not(.disabled)');
          }

          activateOption(_this.elements.dropdown, newOption);
        }

        // ESC - close dropdown
        if (code === 27) {
          $(_this.elements.input).trigger('close');
        }

        // ARROW UP - move to previous not disabled option
        if (code === 38) {
          selectedOption = _this.elements.dropdown.querySelector('li.selected');

          if (selectedOption) {
            newOption = selectedOption.previousSibling;
            activateOption(_this.elements.dropdown, newOption);
          }
        }

        // Automatically clean filter query so user can search again by starting letters
        setTimeout(function() {
          _this.filterQuery.length = 0;
        }, 1000);
      }

      // Add event
      $(_this.elements.input).on('keydown', onKeyDown);

      // Fill the dropdown
      Array.prototype.forEach.call(_this.prop.elements, function(element) {
        prepareElement(element, _this);
      });

      // Refer all the checkboxes and list option previously created
      if (_this.prop.multiple) {
        _this.elements.checkboxes = _this.elements.dropdown.querySelectorAll('input[type="checkbox"]');
      } else {
        _this.elements.radio = _this.elements.dropdown.querySelectorAll('input[type="radio"]');
      }
      _this.elements.li = _this.elements.dropdown.querySelectorAll('li');

      _this.elements.wrapper.appendChild(_this.elements.caret);
      _this.elements.wrapper.appendChild(_this.elements.input);
      _this.elements.wrapper.appendChild(_this.elements.dropdown);
      // Append the wrapper into the select parent
      _this.elements.select.parentNode.insertBefore(_this.elements.wrapper, _this.elements.select.parentNode.firstChild);
      // Move the parent into the wrapper
      _this.elements.wrapper.appendChild(select);
      // Initialized the select
      _this.elements.select.classList.add('initialized');

      // Check if preselected option are existing
      if (_this.prop.isSelectedOption()) {
        var selected = _this.prop.selected();

        // Select all the selected option
        Array.prototype.forEach.call(selected, function(option) {
          // Select / deselect option
          toggleSelectElement(option, _this, true);
        });
      } else {
        var disabledOption = _this.elements.select.querySelector('option:disabled');

        // If no options are preselected, select the first disabled
        if (disabledOption) {
          var equivalent = equivalentItem(disabledOption, _this),
            input = equivalent.querySelector('input[type="radio"]');

          // We don't want checkbox because a disabled option isn't selected
          if (input) {
            input.checked = true;
          }

          // Fill the content input
          fillContentInput([disabledOption], _this);
        }
      }

      // Initialize the dropdown
      $(_this.elements.input).dropdown({
        'hover': false
      });

      return _this;
    }

    // If all elements from parent are active so select it too
    function selectParent(child, parent, _this) {
      var siblings = (function() {
          var self = {};
          self.all = getOptgroupElements(child.dataset.optgroup, _this);
          self.selected = [];

          return self;
        })(),
        option = {
          equivalent: parent,
          input: parent.querySelector('input[type="checkbox"]'),
        };

      // For each siblings we check if they're active
      for (var i = 0, countSiblings = siblings.all.length; i < countSiblings; i++) {
        siblings.all[i].selected ? siblings.selected.push(true) : siblings.selected.push(false);
      }

      // If all siblings are selected select parent
      if (siblings.selected.indexOf(false) === -1) {
        selectElement(option);
      } else {
        deselectElement(option);
      }
    }

    // Returns the equivalent item to the element passed as parameter (li, option, optgroup)
    function equivalentItem(element, _this) {
      var tagName = element.tagName,
        item;

      switch (tagName) {
        case 'LI':
          item = _this.elements.select.querySelector('option[value="' + element.dataset.value + '"]');

          break;
        case 'OPTION':
          item = _this.elements.dropdown.querySelector('li[data-value="' + element.value + '"]');

          break;
        case 'OPTGROUP':
          item = _this.elements.dropdown.querySelector('li[data-value="' + element.label + '"]');

          break;
        default:
          console.log('Error. Please open an issue at Materialize.');

          break;
      }

      return item;
    }

    // Select an option and element
    function selectElement(option) {
      if (option.element) {
        option.element.selected = true;
      }

      option.equivalent.classList.add('active');
      option.input.checked = true;
    }

    // Deselect an option and element
    function deselectElement(option) {
      if (option.element) {
        option.element.selected = false;
      }

      option.equivalent.classList.remove('active');
      option.input.checked = false;
    }

    // Select an element
    function toggleSelectElement(element, _this, onload) {
      var option = {};

      // If element is LI reverse the attributions
      if (isTagName('LI', element)) {
        option.element = equivalentItem(element, _this);

        if (!option.element) {
          return;
        }

        option.equivalent = element;
        option.parent = option.element.parentNode;
      }

      // Fill the object which contains all its data
      option = (function() {
        option.element = option.element || element;
        option.equivalent = option.equivalent || equivalentItem(element, _this);
        option.input = option.equivalent.querySelector('input');
        option.selected = option.element.selected;
        option.parent = option.parent || option.element.parentNode;

        return option;
      })();

      // Return if there is no findable li or if the option is already selected for single select
      if (!option.equivalent || (!_this.prop.multiple && option.equivalent.classList.contains('active'))) {
        return;
      }

      // If select is single
      if (!_this.prop.multiple && !onload) {
        var oldSelectedOption = _this.prop.selected()[0],
          oldSelectedElement = equivalentItem(oldSelectedOption, _this);

        // Fill an object relative to the old selected option
        var oldOption = (function() {
          var self = {};
          self.element = oldSelectedOption,
            self.equivalent = oldSelectedElement,
            self.input = self.equivalent.querySelector('input');

          return self;
        })();

        deselectElement(oldOption);
      }

      // Deselect options here
      if (option.selected && !onload) {
        deselectElement(option);
        // Select options here
      } else {
        selectElement(option);
      }

      // Select parent if all its children are selected
      if (_this.prop.optgroup && _this.prop.multiple && isTagName('OPTGROUP', option.parent)) {
        var parent = equivalentItem(option.parent, _this);

        // Verification of existing parent
        if (parent) {
          selectParent(option.equivalent, parent, _this);
        }
      }

      // Fill the input value with new values
      fillContentInput(_this.prop.selected(), _this);
    }

    // Toggle select all li relative to an optgroup li
    function toggleSelectAllElements(optgroup, _this) {
      var status = optgroup.classList.contains('active'),
        allChildren = getOptgroupElements(optgroup.dataset.value, _this),
        matches;

      if (status) {
        // Filter for every optgroup's option is active and isn't disabled
        matches = Array.prototype.slice.call(allChildren).filter(function(element) {
          return element.selected && !element.disabled;
        });
      } else {
        // Filter for every optgroup's option isn't active and isn't disabled
        matches = Array.prototype.slice.call(allChildren).filter(function(element) {
          return !element.selected && !element.disabled;
        });
      }

      // Toggle all options stored
      Array.prototype.forEach.call(matches, function(li) {
        toggleSelectElement(li, _this);
      });
    }

    // Prepare element by passing relative values to it
    function prepareElement(element, _this) {
      // Check if element is optgroup
      isTagName('OPTGROUP', element) ? CreateElement(element, _this, true) : CreateElement(element, _this, false);
    }

    /* Create a new option with the correct params
     *
     * Li Constructor
     *
     */
    function CreateElement(element, _this, optgroup) {
      var options = {
        iconUrl: element.dataset.icon,
        imageClasses: element.className,
        text: element.getAttribute('label') || element.textContent,
        dataValue: element.getAttribute('label') || element.value,
        disabled: element.disabled || element.parentNode.disabled
      };

      _this.elements.dropdown.appendChild(createLiElement());

      function createLiElement() {
        var liElement = document.createElement('li'),
          spanElement = document.createElement('span');

        // Add icon url if exists
        if (options.iconUrl) {
          var image = document.createElement('img');
          image.src = options.iconUrl;
          image.className = options.imageClasses;

          liElement.appendChild(image);
        }

        var label = document.createElement('label'),
          input;

        // Refer the optgroup parent for each option that isn't an optgroup
        if (_this.prop.optgroup && !optgroup) {
          var parent = element.parentNode;

          // Refer the label as data-label if the optgroup has a label
          if (isTagName('OPTGROUP', parent) && parent.label) {
            liElement.dataset.optgroup = parent.label;
          }
        }

        // Create input and label
        if (_this.prop.multiple) {
          input = document.createElement('input');
          input.type = 'checkbox';

          spanElement.appendChild(input);
          spanElement.appendChild(label);
        } else {
          input = document.createElement('input');
          input.type = 'radio';

          spanElement.appendChild(input);
          spanElement.appendChild(label);
        }

        // Set span content
        spanElement.innerHTML += options.text.replace(/"/g, '&quot;').trim();

        // Verify the current element isn't disabled before applying class
        // Set datavalue for the current element
        element.id ? liElement.dataset.id = element.id : '';
        liElement.className += optgroup ? 'optgroup' : '';
        options.disabled ? liElement.classList.add('disabled') : '';
        liElement.dataset.value = options.dataValue;

        // Add event handler
        $(liElement).on('click', function() {
          // Return if element is disabled
          if (liElement.classList.contains('disabled')) {
            return;
          }

          if (_this.prop.multiple) {
            if (optgroup) {
              // Avoid multiple selection by clicking on a optgroup which have disabled option
              var disabledElements = getOptgroupElements(liElement.dataset.value, _this);
              disabledElements = Array.prototype.slice.call(disabledElements).filter(function(element) {
                return element.classList.contains('disabled');
              });

              // Avoid clicking if the element is disabled
              if (liElement.classList.contains('disabled') || disabledElements.length) {
                return;
              }

              // Select all children relative to the optgroup clicked
              toggleSelectAllElements(liElement, _this);
            } else {
              toggleSelectElement(liElement, _this);
            }
          } else {
            // Return if element is optgroup for single select
            if (liElement.classList.contains('optgroup')) {
              return;
            }

            toggleSelectElement(liElement, _this);
          }

          // Scroll to the option
          $(_this.elements.dropdown).scrollTo(liElement);
        });

        liElement.appendChild(spanElement);

        return liElement;
      }
    }

    Array.prototype.forEach.call(this, function(selectElement) {
      var initialized = selectElement.classList.contains('initialized');

      // Destroy callback
      if ('destroy' === callback && initialized) {
        destroySelect(selectElement);

        return;
      }

      // Return if user choose to apply a native select or select is disabled or initialized or if select isn't filled
      if (selectElement.classList.contains('browser-default') || initialized || selectElement.disabled || !selectElement.options.length) {
        return; // Continue to the next select
      }

      // Initialize the select
      var Select = CreateSelect(selectElement);
    });

    // For not breaking jQuery chaining return a jQuery element
    return $(this);
  };

}( jQuery ));
