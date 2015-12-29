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
    $(document).on('change', range_type, function() {
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
    $(this).each(function() {
      var $select = $(this);

      if ($select.hasClass('browser-default')) {
        return; // Continue to next (return false breaks out of entire loop)
      }

      var multiple = $select.attr('multiple') ? true : false,
          lastID = $select.data('select-id'), // Tear down structure if Select needs to be rebuilt
          required = $select.attr('required') ? true : false,
          optgroups = $select.find('optgroup').length ? true : false;

      if (lastID) {
        $select.parent().find('span.caret').remove();
        $select.parent().find('input').remove();

        $select.unwrap();
        $('ul#select-options-' + lastID).remove();
      }

      // If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
      if (callback === 'destroy') {
        $select.data('select-id', null).removeClass('initialized');
        return;
      }

      var uniqueID = Materialize.guid();
      $select.data('select-id', uniqueID);
      var wrapper = $('<div class="select-wrapper"></div>');
      wrapper.addClass($select.attr('class'));
      var options = $('<ul id="select-options-' + uniqueID + '" class="dropdown-content select-dropdown ' + (multiple ? 'multiple-select-dropdown' : '') + '"></ul>'),
          selectChildren = optgroups ? $select.find('optgroup, option:not(select > option:not(:disabled))') : $select.find('optgroup, option'),
          optionsValuesSelected = [],
          optionsHover = false;

      if (multiple) {
        if (optgroups) {
          var optgroupValuesSelected = [];

          for (var i = 0, optgroupsCount = $select.find('optgroup').length; i < optgroupsCount; i++) {
            optionsValuesSelected.push([]);
          }
        }
      }

      // Scan for existing options before an optgroup
      if (optgroups) {
        if ($select.find('> option:not(:disabled)').length) {
          $select.find('> option:not(:disabled)').each(function() {
            // Put it in comments
            $(this).wrap(function() {
              return '<!-- ' + this.outerHTML + ' -->';
            });
            $(this).remove();
          });
        }
      }

      var label = $select.find('option:selected').html() || $select.find('option:disabled').eq(0).html() || "";

      // Function that renders and appends the element taking into
      // account type and possible image icon.
      var generateOptionsElement = function(element, multiple, optgroup) {
        // Add icons
        var icon_url = element.data('icon') ? element.data('icon').trim() : '',
            imageClasses = element.attr('class') ? element.attr('class').trim() : '',
            disabledClass = (element.is(':disabled')) ? 'disabled' : '',
            sanitizedText = optgroup ? element.attr('label').trim() : element.html().trim(),
            dataValue = optgroup ? element.attr('label') : element.val();

        options.append(createElement());

        function createElement() {
          var element = document.createElement('li'),
              spanElement = document.createElement('span');

          if (icon_url) {
            var image = document.createElement('img');
            image.src = icon_url;
            image.className = imageClasses;

            element.appendChild(image);
          }

          if (multiple) {
            var input = document.createElement('input'),
                labelCheckbox = document.createElement('label');

            input.type = 'checkbox';

            spanElement.appendChild(input);
            spanElement.appendChild(labelCheckbox);
          }

          element.className += optgroup ? 'optgroup' + (disabledClass ? ' ' + disabledClass : '') : disabledClass;
          element.dataset.value = dataValue;

          spanElement.innerHTML += sanitizedText;
          element.appendChild(spanElement);

          return element;
        }
      };

      /* Create dropdown structure. */
      if (selectChildren.length) {
        selectChildren.each(function() {
          var _this = $(this);

          if (_this.is('option')) {
            // generateOptionsElement = function(select, element, multiple, optgroup)
            if (multiple) {
              generateOptionsElement(_this, true, false);
            } else {
              generateOptionsElement(_this, false, false);
            }
          } else if ($(this).is('optgroup')) {
            if (multiple) {
              generateOptionsElement(_this, true, true);
            } else {
              generateOptionsElement(_this, false, true);
            }
          }
        });
      }

      options.find('li:not(.optgroup)').each(function(i) {
        var _this = $(this);

        _this.on('click', function(e) {
          // Check if option element is disabled
          if (!_this.hasClass('disabled') && !_this.hasClass('optgroup')) {
            var indexLi = _this.index();

            if (multiple) {
              if (optgroups) {
                var indexes = returnIndexes(_this);

                toggleIndexFromArray(indexes.element, indexLi, indexes.optgroup);
                toggleActivationOptgroupParent(_this);
              } else {
                toggleIndexFromArray(indexLi);
              }

              options.scrollTo(_this);
              $('input[type="checkbox"]', _this[0]).prop('checked', function(i, v) {
                return !v;
              });
              $newSelect.trigger('focus');
            } else {
              options.find('li.active').removeClass('active');
              _this.addClass('active');
              $newSelect.val(_this.text());

              activateOption(options, _this, 'active');
              $select.find('option').eq(i).prop('selected', true);
            }

            // Trigger onchange() event
            $select.trigger('change');
            if (typeof callback !== 'undefined') callback();
          }

          e.stopPropagation();
        });
      });

      options.find('li.optgroup:not(.disabled)').has(':checkbox').each(function() {
        var _this = $(this);

        _this.on('click', function(e) {
          var status = _this.find(':checkbox').is(':checked') ? true : false;

          if (!_this.hasClass('disabled')) {
            var children;

            if (status) {
              children = _this.nextUntil(options.find('li.optgroup'), 'li.active:not(.disabled)')
            } else {
              children = _this.nextUntil(options.find('li.optgroup'), 'li:not(.active, .disabled)')
            }

            children.each(function() {
              var _this = $(this),
                  indexes = returnIndexes(_this);

              toggleIndexFromArray(indexes.element, _this.index(), indexes.optgroup);
              options.scrollTo(_this);
              $('input[type="checkbox"]', _this[0]).prop('checked', function(i, v) {
                return !v;
              });
            });
          }

          _this.toggleClass('active');
          $('input[type="checkbox"]', _this[0]).prop('checked', function(i, v) {
            return !v;
          });
          $newSelect.trigger('focus');
          $select.trigger('change');

          e.stopPropagation();
        });
      });

      // Wrap Elements
      $select.wrap(wrapper);
      // Add Select Display Element
      var dropdownIcon = $('<span class="caret">&#9660;</span>');
      if ($select.is(':disabled'))
        dropdownIcon.addClass('disabled');

      // escape double quotes
      var sanitizedLabelHtml = label.replace(/"/g, '&quot;').trim();

      var $newSelect = $('<input type="text" class="select-dropdown" readonly="readonly" ' + (($select.is(':disabled')) ? 'disabled' : '') + ' data-activates="select-options-' + uniqueID + '" value="' + sanitizedLabelHtml + '" ' + (required ? 'required' : '') + '/>');
      $select.before($newSelect);
      $newSelect.before(dropdownIcon);

      $newSelect.after(options);
      // Check if section element is disabled
      if (!$select.is(':disabled')) {
        $newSelect.dropdown({
          'hover': false,
          'closeOnClick': false
        });
      }

      // Copy tabindex
      if ($select.attr('tabindex')) {
        $($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
      }

      $select.addClass('initialized');

      // Select change event - Update the select's values on the fly by passing new values from an array
      $select.on('update', function() {
        var selectedOptions = $select.find("option:selected:not(:disabled)").map(function() {
          return $(this).parent().is(':disabled') ? null : $(this);
        });

        if (selectedOptions.length) {
          if (multiple) {
            resetOptions();

            selectedOptions.each(function() {
              var _this = $(this),
                  indexOption = _this.index();

              if (optgroups) {
                var indexes = returnIndexes(_this);

                toggleIndexFromArray(indexOption, indexes.element, indexes.optgroup);
                options.find("li").eq(indexes.element).find(":checkbox").prop("checked", true);
                toggleActivationOptgroupParent(_this);
              } else {
                toggleIndexFromArray(indexOption);
                options.find('li').eq(indexOption).find(':checkbox').prop('checked', true);
              }
            });
          } else {
            var index = $select.find('option:selected:not(:disabled)').index(),
                newOption = options.find('li').eq(index);

            options.find('li.active').removeClass('active');
            newOption.addClass('active');
            $newSelect.val(newOption.text());

            activateOption(options, newOption, 'active');
          }
        } else {
          if (multiple && optgroups) {
            resetOptions();
            setValueToInput(optgroupValuesSelected);
          }
        }

        $select.trigger('change');
      });

      // Input events
      $newSelect.on({
        'focus': function() {
          if ($('ul.select-dropdown').not(options[0]).is(':visible')) {
            $('input.select-dropdown').trigger('close');
          }

          if (!options.is(':visible')) {
            $(this).trigger('open', ['focus']);

            if (!multiple) {
              var selectedOption = options.find('li[data-value="' + $select.find('option:not(:disabled):selected').val() + '"]')[0];
              activateOption(options, selectedOption, 'active');
            }
          }
        },
        'click': function(e) {
          e.stopPropagation();
        },
        'blur': function() {
          if (!multiple) {
            $(this).trigger('close');
            options.find('li.active:not(.disabled)').removeClass('active');
          }
        }
      });

      options.hover(function() {
        optionsHover = true;
      }, function() {
        optionsHover = false;
      });

      $(window).on({
        'click': function() {
          multiple && (optionsHover || $newSelect.trigger('close'));
        }
      });

      // Add initial multiple selections
      if (multiple) {
        var selectedOptions = $select.find("option:selected:not(:disabled)").map(function() {
          return $(this).parent().is(':disabled') ? null : $(this);
        });

        selectedOptions.each(function() {
          var _this = $(this),
              indexOption = _this.index();

          if (optgroups) {
            var indexes = returnIndexes(_this);

            toggleIndexFromArray(indexOption, indexes.element, indexes.optgroup);
            options.find("li").eq(indexes.element).find(":checkbox").prop("checked", true);
            toggleActivationOptgroupParent(_this);
          } else {
            toggleIndexFromArray(indexOption);
            options.find("li").eq(indexOption).find(":checkbox").prop("checked", true);
          }

          options.scrollTo(_this);
        });
      }

      // Make option as active or selected and scroll to its position
      var activateOption = function(collection, newOption, _class) {
        if (newOption) {
          collection.find('li.' + _class).removeClass(_class);

          var option = $(newOption);
          option.addClass(_class);
          options.scrollTo(option);
        }
      };

      // Resets the dropdown with no options activated
      var resetOptions = function() {
        if (multiple && optgroups) {
          optgroupValuesSelected.length = 0;

          for (var i = 0, count = optionsValuesSelected.length; i < count; i++) {
            optionsValuesSelected[i].length = 0;
          }
        } else {
          optionsValuesSelected.length = 0;
        }

        options.find('li.active:not(.disabled)').removeClass('active');
        options.find(':checkbox').prop('checked', false);
      };

      // Allow user to search by typing
      // this array is cleared after 1 second
      var filterQuery = [],
          onKeyDown = function(e) {
            // TAB - switch to another input
            if (e.which == 9) {
              $newSelect.trigger('close');
              return;
            }

            // ARROW DOWN WHEN SELECT IS CLOSED - open select options
            if (e.which == 40 && !options.is(':visible')) {
              $newSelect.trigger('open');
              return;
            }

            // ENTER WHEN SELECT IS CLOSED - submit form
            if (e.which == 13 && !options.is(':visible')) {
              return;
            }

            e.preventDefault();

            // CASE WHEN USER TYPE LETTERS
            var letter = String.fromCharCode(e.which).toLowerCase(),
                nonLetters = [9, 13, 27, 38, 40];

            if (letter && (nonLetters.indexOf(e.which) === -1)) {
              filterQuery.push(letter);

              var string = filterQuery.join(''),
                  newOption = options.find('li').filter(function() {
                    return $(this).text().toLowerCase().indexOf(string) === 0;
                  })[0];

              if (newOption) {
                activateOption(options, newOption, 'selected');
              }
            }

            // ENTER - select option and close when select options are opened
            if (e.which == 13) {
              var activeOption = options.find('li.selected:not(.disabled)')[0];

              if (activeOption) {
                $(activeOption).trigger('click');
                if (!multiple) {
                  $newSelect.trigger('close');
                }
              }
            }

            // ARROW DOWN - move to next not disabled option
            if (e.which == 40) {
              if (options.find('li.selected').length) {
                newOption = options.find('li.selected').next('li');
              } else {
                newOption = options.find('li:not(.disabled)');
              }

              newOption = newOption[0];

              if (newOption) {
                activateOption(options, newOption, 'selected');
              }
            }

            // ESC - close options
            if (e.which == 27) {
              $newSelect.trigger('close');
            }

            // ARROW UP - move to previous not disabled option
            if (e.which == 38) {
              newOption = options.find('li.selected').prev('li')[0];

              if (newOption) {
                activateOption(options, newOption, 'selected');
              }
            }

            // Automatically clean filter query so user can search again by starting letters
            setTimeout(function() {
              filterQuery = [];
            }, 1000);
          };

      $newSelect.on('keydown', onKeyDown);

      /* Functions */

      // Updates from optionsValuesSelected to match active dropdown items to the selected select options
      function toggleIndexFromArray(indexOption, indexLi, indexOptgroup) {
        var index, notAdded;

        if (multiple && optgroups) {
          var value = $select.find('optgroup').eq(indexOptgroup).find('option').eq(indexOption).text();

          index = optionsValuesSelected[indexOptgroup].indexOf(indexOption);
          notAdded = index === -1;

          if (notAdded) {
            optionsValuesSelected[indexOptgroup].push(indexOption);
            optgroupValuesSelected.push(value);
          } else {
            var indexInArray = optgroupValuesSelected.indexOf(value);

            optionsValuesSelected[indexOptgroup].splice(index, 1);
            optgroupValuesSelected.splice(indexInArray, 1);
          }

          options.find('li').eq(indexLi).toggleClass('active');
          $select.find('optgroup').eq(indexOptgroup).find('option').eq(indexOption).prop('selected', notAdded);
          setValueToInput(optgroupValuesSelected);
        } else {
          index = optionsValuesSelected.indexOf(indexOption);
          notAdded = index === -1;

          if (notAdded) {
            optionsValuesSelected.push(indexOption);
          } else {
            optionsValuesSelected.splice(index, 1);
          }

          options.find('li').eq(indexOption).toggleClass('active');
          $select.find('option').eq(indexOption).prop('selected', notAdded);
          generatesValuesArray();
        }
      }

      // Returns indexes used for toggleIndexFromArray
      function returnIndexes(_this) {
        var indexes = {},
            text = _this.val() || _this.data('value'),
            selectedElement;

        if (_this.is('li')) {
          selectedElement = $select.find('option:not(:disabled)[value="' + text + '"]');
        } else {
          selectedElement = options.find('li:not(.disabled)[data-value="' + text + '"]');
        }

        var indexElement = selectedElement.index(),
            disabledPrevOptions = $select.find('> option:disabled'),
            indexOptgroup;

        if (_this.is('li')) {
          indexOptgroup = selectedElement.parent().index();
        } else {
          indexOptgroup = _this.parent().index();
        }

        for (var i = 0, count = disabledPrevOptions.length; i < count; i++) {
          indexOptgroup--;
        }

        indexes.element = indexElement;
        indexes.optgroup = indexOptgroup;

        return indexes;
      }

      // Creates an array with the values to display
      function generatesValuesArray() {
        var arrayValues = [];

        for (var i = 0, count = optionsValuesSelected.length; i < count; i++) {
          var text = $select.find('option').eq(optionsValuesSelected[i]).text().trim();

          arrayValues.push(text);
        }

        setValueToInput(arrayValues);
      }

      // Updates the value in the dropdown input (Option 1, Option 2, ...)
      function setValueToInput(array) {
        sortArrayValues(array);

        var value = array.join(', ');

        if (!value) {
          value = $select.find('option:disabled').eq(0).text() || "";
        }

        $newSelect.val(value);
      }

      // Toggle activation of the optgroup's checkbox parent
      function toggleActivationOptgroupParent(child) {
        var liTagName = child[0].tagName === "LI",
            checkForActiveClass = [],
            children, prevOptgroup, convertElement;

        if (liTagName) {
          children = child.prevUntil('li.optgroup', 'li:not(.disabled)').add(child.nextUntil('li.optgroup', 'li:not(.disabled)')).add(child);
          prevOptgroup = child.prevAll('li.optgroup').eq(0);
        } else {
          children = child.prevUntil('optgroup', 'option:not(:disabled)').add(child.nextUntil('optgroup', 'option:not(:disabled)')).add(child);
          prevOptgroup = child.parent();
        }

        // For each li in optgroup, check the active class and fill the array
        for (var i = 0, count = children.length; i < count; i++) {
          var element = $(children[i]);

          if (liTagName) {
            if (element.hasClass('active')) {
              checkForActiveClass.push(true);
            } else {
              checkForActiveClass.push(false);
            }
          } else {
            convertElement = options.find('li:not(:disabled)[data-value="' + element.val() + '"]');

            i === 0 ? prevOptgroup = convertElement.prevAll('li.optgroup').eq(0) : '';

            if (element.is(':selected') || convertElement.hasClass('active')) {
              checkForActiveClass.push(true);
            } else {
              checkForActiveClass.push(false);
            }
          }
        }

        var oneChildIsNotSelected = checkForActiveClass.indexOf(false) > -1;

        if (oneChildIsNotSelected) {
          prevOptgroup.find(':checkbox').prop('checked', false);
          prevOptgroup.removeClass('active');
        } else {
          prevOptgroup.find(':checkbox').prop('checked', true);
          prevOptgroup.addClass('active');
        }
      }

      // Sorts the values from the array in alphabetical order
      function sortArrayValues(array) {
        array.sort(function(a, b) {
          var x = a.toLowerCase(),
              y = b.toLowerCase();

          return x < y ? -1 : x > y ? 1 : 0;
        });
      }
    });
  };
}( jQuery ));
