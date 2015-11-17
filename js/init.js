(function($){
    $(function(){

        var window_width = $(window).width();

        // convert rgb to hex value string
        function rgb2hex(rgb) {
            if (/^#[0-9A-F]{6}$/i.test(rgb)) { return rgb; }

            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

            if (rgb === null) { return "N/A"; }

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
                if (classes.indexOf("darken") >= 0 || $(this).hasClass('black')) {
                    $(this).css('color', 'rgba(255,255,255,.9');
                }
            });
        });


        // Floating-Fixed table of contents
        if ($('nav').length) {
            $('.toc-wrapper').pushpin({ top: $('nav').height() });
        }
        else if ($('#index-banner').length) {
            $('.toc-wrapper').pushpin({ top: $('#index-banner').height() });
        }
        else {
            $('.toc-wrapper').pushpin({ top: 0 });
        }



        // BuySellAds Detection
        var $bsa = $(".buysellads"),
            $timesToCheck = 3;
        function checkForChanges() {
            if (!$bsa.find('#carbonads').length) {
                $timesToCheck -= 1;
                if ($timesToCheck >= 0) {
                    setTimeout(checkForChanges, 500);
                }
                else {
                    var donateAd = $('<div id="carbonads"><span><a class="carbon-text" href="#!" onclick="document.getElementById(\'paypal-donate\').submit();"><img src="images/donate.png" /> Help support us by turning off adblock. If you still prefer to keep adblock on for this page but still want to support us, feel free to donate. Any little bit helps.</a></form></span></div>');

                    $bsa.append(donateAd);
                }
            }

        }
        checkForChanges();


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
                }
            });
        }

        // Toggle Flow Text
        var toggleFlowTextButton = $('#flow-toggle');
        toggleFlowTextButton.click( function(){
            $('#flow-text-demo').children('p').each(function(){
                $(this).toggleClass('flow-text');
            });
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
            $('#nav-mobile').css({ overflow: 'auto'});
        }

        // Set checkbox on forms.html to indeterminate
        var indeterminateCheckbox = document.getElementById('indeterminate-checkbox');
        if (indeterminateCheckbox !== null)
            indeterminateCheckbox.indeterminate = true;

        $.fn.material_select = function (callback) {
            $(this).each(function(){
                var $select = $(this);

                if ($select.hasClass('browser-default')) {
                    return; // Continue to next (return false breaks out of entire loop)
                }

                var multiple = $select.attr('multiple') ? true : false,
                    lastID = $select.data('select-id'); // Tear down structure if Select needs to be rebuilt

                if (lastID) {
                    $select.parent().find('span.caret').remove();
                    $select.parent().find('input').remove();

                    $select.unwrap();
                    $('ul#select-options-'+lastID).remove();
                }

                // If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
                if(callback === 'destroy') {
                    $select.data('select-id', null).removeClass('initialized');
                    return;
                }

                var uniqueID = Materialize.guid();
                $select.data('select-id', uniqueID);
                var wrapper = $('<div class="select-wrapper"></div>');
                wrapper.addClass($select.attr('class'));
                var options = $('<ul id="select-options-' + uniqueID +'" class="dropdown-content select-dropdown ' + (multiple ? 'multiple-select-dropdown' : '') + '"></ul>');
                var selectOptions = $select.children('option');
                var selectOptGroups = $select.children('optgroup');
                var valuesSelected = [],
                    optionsHover = false;

                if ($select.find('option:selected').length > 0) {
                    label = $select.find('option:selected');
                } else {
                    label = selectOptions.first();
                }

                // Function that renders and appends the option taking into
                // account type and possible image icon.
                var appendOptionWithIcon = function(select, option, type) {
                    // Add disabled attr if disabled
                    var disabledClass = (option.is(':disabled')) ? 'disabled ' : '';

                    // add icons
                    var icon_url = option.data('icon');
                    var classes = option.attr('class');
                    if (!!icon_url) {
                        var classString = '';
                        if (!!classes) classString = ' class="' + classes + '"';

                        // Check for multiple type.
                        if (type === 'multiple') {
                            options.append($('<li class="' + disabledClass + '"><img src="' + icon_url + '"' + classString + '><span><input type="checkbox"' + disabledClass + '/><label></label>' + option.html() + '</span></li>'));
                        } else {
                            options.append($('<li class="' + disabledClass + '"><img src="' + icon_url + '"' + classString + '><span>' + option.html() + '</span></li>'));
                        }
                        return true;
                    }

                    // Check for multiple type.
                    if (type === 'multiple') {
                        options.append($('<li class="' + disabledClass + '"><span><input type="checkbox"' + disabledClass + '/><label></label>' + option.html() + '</span></li>'));
                    } else {
                        options.append($('<li class="' + disabledClass + '"><span>' + option.html() + '</span></li>'));
                    }
                };

                /* Create dropdown structure. */
                if (selectOptGroups.length) {
                    // Check for optgroup
                    selectOptGroups.each(function() {
                        selectOptions = $(this).children('option');
                        options.append($('<li class="optgroup"><span>' + $(this).attr('label') + '</span></li>'));

                        selectOptions.each(function() {
                            appendOptionWithIcon($select, $(this));
                        });
                    });
                } else {
                    selectOptions.each(function () {
                        if (multiple) {
                            appendOptionWithIcon($select, $(this), 'multiple');

                        } else {
                            appendOptionWithIcon($select, $(this));
                        }
                    });
                }

                options.find('li:not(.optgroup)').each(function (i) {
                    $(this).click(function (e) {
                        // Check if option element is disabled
                        if (!$(this).hasClass('disabled') && !$(this).hasClass('optgroup')) {
                            if (multiple) {
                                $('input[type="checkbox"]', this).prop('checked', function(i, v) { return !v; });
                                toggleEntryFromArray(valuesSelected, $(this).index(), $select);
                                $newSelect.trigger('focus');

                            } else {
                                options.find('li').removeClass('active');
                                $(this).toggleClass('active');
                                $newSelect.val($(this).text());
                            }

                            activateOption(options, $(this));
                            $select.find('option').eq(i).prop('selected', true);
                            // Trigger onchange() event
                            $select.trigger('change');
                            if (typeof callback !== 'undefined') callback();
                        }

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
                var sanitizedLabelHtml = label.html() && label.html().replace(/"/g, '&quot;');

                var $newSelect = $('<input type="text" class="select-dropdown" readonly="true" ' + (($select.is(':disabled')) ? 'disabled' : '') + ' data-activates="select-options-' + uniqueID +'" value="'+ sanitizedLabelHtml +'"/>');
                $select.before($newSelect);
                $newSelect.before(dropdownIcon);

                $newSelect.after(options);
                // Check if section element is disabled
                if (!$select.is(':disabled')) {
                    $newSelect.dropdown({'hover': false, 'closeOnClick': false});
                }

                // Copy tabindex
                if ($select.attr('tabindex')) {
                    $($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
                }

                $select.addClass('initialized');

                $newSelect.on({
                    'focus': function (){
                        if ($('ul.select-dropdown').not(options[0]).is(':visible')) {
                            $newSelect.trigger('close');
                        }
                        if (!options.is(':visible')) {
                            $(this).trigger('open', ['focus']);
                            var label = $(this).val();
                            var selectedOption = options.find('li').filter(function() {
                                return $(this).text().toLowerCase() === label.toLowerCase();
                            })[0];
                            activateOption(options, selectedOption);
                        }
                    },
                    'click': function (e){
                        e.stopPropagation();
                    }
                });

                $newSelect.on('blur', function() {
                    if (!multiple) {
                        $(this).trigger('close');
                    }
                    options.find('li.selected').removeClass('selected');
                });

                options.hover(function() {
                    optionsHover = true;
                }, function () {
                    optionsHover = false;
                });

                $(window).on({
                    'click': function () {
                        multiple && (optionsHover || $newSelect.trigger('close'));
                    },
                    'resize': function () {
                        options.width($newSelect.width());
                    }
                });

                $select.find("option:selected").each(function () {
                    var index = $(this).index();

                    toggleEntryFromArray(valuesSelected, index, $select);
                    options.find("li").eq(index).find(":checkbox").prop("checked", true);
                });

                // Make option as selected and scroll to selected position
                activateOption = function(collection, newOption) {
                    var option = $(newOption);

                    collection.find('li.selected').removeClass('selected');
                    option.addClass('selected');
                    if (newOption) {
                        option.addClass('selected');
                        options.scrollTo(option);
                    }
                };

                // Allow user to search by typing
                // this array is cleared after 1 second
                var filterQuery = [],
                    onKeyDown = function(e){
                        // TAB - switch to another input
                        if(e.which == 9){
                            $newSelect.trigger('close');
                            return;
                        }

                        // ARROW DOWN WHEN SELECT IS CLOSED - open select options
                        if(e.which == 40 && !options.is(':visible')){
                            $newSelect.trigger('open');
                            return;
                        }

                        // ENTER WHEN SELECT IS CLOSED - submit form
                        if(e.which == 13 && !options.is(':visible')){
                            return;
                        }

                        e.preventDefault();

                        // CASE WHEN USER TYPE LETTERS
                        var letter = String.fromCharCode(e.which).toLowerCase(),
                            nonLetters = [9,13,27,38,40];
                        if (letter && (nonLetters.indexOf(e.which) === -1)) {
                            filterQuery.push(letter);

                            var string = filterQuery.join(''),
                                newOption = options.find('li').filter(function() {
                                    return $(this).text().toLowerCase().indexOf(string) === 0;
                                })[0];

                            if (newOption) {
                                activateOption(options, newOption);
                            }
                        }

                        // ENTER - select option and close when select options are opened
                        if (e.which == 13) {
                            var activeOption = options.find('li.selected:not(.disabled)')[0];
                            if(activeOption){
                                $(activeOption).trigger('click');
                                if (!multiple) {
                                    $newSelect.trigger('close');
                                }
                            }
                        }

                        // ARROW DOWN - move to next not disabled option
                        if (e.which == 40) {
                            if (options.find('li.selected').length) {
                                newOption = options.find('li.selected').next('li:not(.disabled)')[0];
                            } else {
                                newOption = options.find('li:not(.disabled)')[0];
                            }
                            activateOption(options, newOption);
                        }

                        // ESC - close options
                        if (e.which == 27) {
                            $newSelect.trigger('close');
                        }

                        // ARROW UP - move to previous not disabled option
                        if (e.which == 38) {
                            newOption = options.find('li.selected').prev('li:not(.disabled)')[0];
                            if(newOption)
                                activateOption(options, newOption);
                        }

                        // Automaticaly clean filter query so user can search again by starting letters
                        setTimeout(function(){ filterQuery = []; }, 1000);
                    };

                $newSelect.on('keydown', onKeyDown);
            });

            function toggleEntryFromArray(entriesArray, entryIndex, select) {
                var index = entriesArray.indexOf(entryIndex);

                if (index === -1) {
                    entriesArray.push(entryIndex);
                } else {
                    entriesArray.splice(index, 1);
                }

                select.siblings('ul.dropdown-content').find('li').eq(entryIndex).toggleClass('active');
                select.find('option').eq(entryIndex).prop('selected', true);
                setValueToInput(entriesArray, select);
            }

            function setValueToInput(entriesArray, select) {
                var value = '';

                for (var i = 0, count = entriesArray.length; i < count; i++) {
                    var text = select.find('option').eq(entriesArray[i]).text();

                    i === 0 ? value += text : value += ', ' + text;
                }

                if (value === '') {
                    value = select.find('option:disabled').eq(0).text();
                }

                select.siblings('input.select-dropdown').val(value);
            }
        };

        // Plugin initialization
        $('.carousel.carousel-slider').carousel({full_width: true});
        $('.carousel').carousel();
        $('.slider').slider({full_width: true});
        $('.parallax').parallax();
        $('.modal-trigger').leanModal();
        $('.scrollspy').scrollSpy();
        $('.button-collapse').sideNav({'edge': 'left'});
        $('.datepicker').pickadate({selectYears: 20});
        $('select').not('.disabled').material_select();


    }); // end of document ready
})(jQuery); // end of jQuery name space
