(function ($, Vel) {
  'use strict';

  let _defaults = {
    data: [],
    placeholder: '',
    secondaryPlaceholder: '',
    autocompleteOptions: {},
    max: Infinity,
    onChipAdd: null,
    onChipSelect: null,
    onChipDelete: null
  };


  /**
   * @typedef {Object} chip
   * @property {String} tag  chip tag string
   * @property {String} [image]  chip avatar image string
   */

  /**
   * @class
   *
   */
  class Chips {
    /**
     * Construct Chips instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {

      // If exists, destroy and reinitialize
      if (!!el.M_Chips) {
        el.M_Chips.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Chips = this;

      /**
       * Options for the modal
       * @member Chips#options
       * @prop {Array} data
       * @prop {String} placeholder
       * @prop {String} secondaryPlaceholder
       * @prop {Object} autocompleteOptions
       */
      this.options = $.extend({}, Chips.defaults, options);

      // this.$el.empty();
      this.$el.addClass('chips');
      this.chipsData = [];
      this.$chips = $();
      this.$input = this.$el.find('input');
      this.$input.addClass('input');

      // Set input id
      if (!this.$input.attr('id')) {
        this.$input.attr('id', Materialize.guid());
      }

      // Render initial chips
      if (this.options.data.length) {
        this.chipsData = this.options.data;
        this._renderChips(this.chipsData);
      }

      // this._createLabel();
      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Chips(this, options));
      });
      return arr;
    }

    /**
     * Get Instance
     */
    getInstance() {
      return this;
    }

    /**
     * Get Chips Data
     */
    getData() {
      return this.chipsData;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this.$chips.remove();
      this.el.M_Chips = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleChipClickBound = this._handleChipClick.bind(this);
      this._handleInputKeydownBound = this._handleInputKeydown.bind(this);

      this.el.addEventListener('click', this._handleChipClickBound);
      document.addEventListener('keydown', Chips._handleChipsKeydown);
      document.addEventListener('keyup', Chips._handleChipsKeyup);
      this.el.addEventListener('blur', Chips._handleChipsBlur, true);
      this.$input[0].addEventListener('keydown', this._handleInputKeydownBound);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      this.el.removeEventListener('click', this._handleChipClickBound);
      document.removeEventListener('keydown', Chips._handleChipsKeydown);
      document.removeEventListener('keyup', Chips._handleChipsKeyup);
      this.el.removeEventListener('blur', Chips._handleChipsBlur, true);
      this.$input[0].removeEventListener('keydown', this._handleInputKeydownBound);
    }

    /**
     * Handle Chip Click
     * @param {Event} e
     */
    _handleChipClick(e) {
      let $chip = $(e.target).closest('.chip');
      console.log($chip);
      let clickedClose = $(e.target).is('.close');
      if ($chip.length) {
        let index = $chip.index();
        console.log(index);
        if (clickedClose) {
          // delete chip
          this.deleteChip(index);
          this.$input[0].focus();

        } else {
          // select chip
          this.selectChip(index);
        }
      }
    }

    /**
     * Handle Chips Keydown
     * @param {Event} e
     */
    static _handleChipsKeydown(e) {
      Chips._keydown = true;

      let $chips = $(e.target).closest('.chips');
      let chipsKeydown = e.target && $chips.length;
      console.log(e.keyCode, e.target);
      if ($(e.target).is('input, textarea') || !chipsKeydown) {
        return;
      }

      let currChips = $chips[0].M_Chips;
      console.log($chips, currChips);

      // backspace and delete
      if (e.keyCode === 8 || e.keyCode === 46) {
        e.preventDefault();

        let selectIndex = currChips.chipsData.length;
        if (currChips._selectedChip) {
          let index = currChips._selectedChip.index();
          currChips.deleteChip(index);
          currChips._selectedChip = null;
          selectIndex = index - 1;
        }

        if (currChips.chipsData.length) {
          currChips.selectChip(selectIndex);
        }

      // left arrow key
      } else if (e.keyCode === 37) {
        if (currChips._selectedChip) {
          let selectIndex = currChips._selectedChip.index() - 1;
          console.log(currChips._selectedChip, currChips._selectedChip.index(), selectIndex);
          if (selectIndex < 0) {
            return;
          }
          currChips.selectChip(selectIndex);
        }

      // right arrow key
      } else if (e.keyCode === 39) {
        if (currChips._selectedChip) {
          let selectIndex = currChips._selectedChip.index() + 1;

          if (selectIndex >= currChips.chipsData.length) {
            currChips.$input[0].focus();
          } else {
            currChips.selectChip(selectIndex);
          }
        }
      }
    }

    /**
     * Handle Chips Keyup
     * @param {Event} e
     */
    static _handleChipsKeyup(e) {
      Chips._keydown = false;
    }

    /**
     * Handle Chips Blur
     * @param {Event} e
     */
    static _handleChipsBlur(e) {
      if (!Chips._keydown) {
        console.log("BLUR");
        let $chips = $(e.target).closest('.chips');
        let currChips = $chips[0].M_Chips;

        currChips._selectedChip = null;
      }
    }

    /**
     * Handle Input Keydown
     * @param {Event} e
     */
    _handleInputKeydown(e) {
      Chips._keydown = true;

      console.log(e.keyCode, e.which, this.$input[0].value, this.chipsData);
      // enter
      if (e.keyCode === 13) {
        e.preventDefault();
        this.addChip({tag: this.$input[0].value});
        this.$input[0].value = '';

      // delete or left
      } else if ((e.keyCode === 8 || e.keyCode === 37) && this.$input[0].value === '' && this.chipsData.length) {
        e.preventDefault();
        console.log(this.chipsData.length - 1);
        this.selectChip(this.chipsData.length - 1);
      }
    }

    /**
     * Render Chip
     * @param {chip} chip
     * @return {Element}
     */
    _renderChip(chip) {
      if (!chip.tag) {
        return;
      }

      let renderedChip = document.createElement('div');
      let closeIcon = document.createElement('i');
      renderedChip.classList.add('chip');
      renderedChip.textContent = chip.tag;
      renderedChip.setAttribute('tabindex', 0);
      $(closeIcon).addClass('material-icons close');
      closeIcon.textContent = 'close';

      // attach image if needed
      if (chip.image) {
        let img = document.createElement('img');
        img.setAttribute('src', chip.image);
        renderedChip.insertBefore(img, renderedChip.firstChild);
      }

      renderedChip.appendChild(closeIcon);
      return renderedChip;
    }

    /**
     * Render Chips
     */
    _renderChips() {
      this.$chips.remove();
      for (let i = 0; i < this.chipsData.length; i++) {
        let chipEl = this._renderChip(this.chipsData[i]);
        this.$el.append(chipEl);
        this.$chips.add(chipEl);
      }

      // move input to end
      this.$el.append(this.$input);
    }

    /**
     * Render Chips
     */
    _createLabel() {
      this.label = document.createElement('label');
      label.setAttribute('for', this.$input.attr('id'));
    }

    /**
     * Set placeholder
     */
    _setPlaceholder() {
      if ((this.chipsData !== undefined && !this.chipsData.length) && this.options.placeholder) {
        $(this.$input).prop('placeholder', this.options.placeholder);

      } else if ((this.chipsData === undefined || !!this.chipsData.length) && this.options.secondaryPlaceholder) {
        $(this.$input).prop('placeholder', this.options.secondaryPlaceholder);
      }
    }

    /**
     * Check if chip is valid
     * @param {chip} chip
     */
    _isValid(chip) {
      if (chip.hasOwnProperty('tag') && chip.tag !== '') {
        let exists = false;
        for (let i = 0; i < this.chipsData.length; i++) {
          if (this.chipsData[i].tag === chip.tag) {
            exists = true;
            break;
          }
        }
        return !exists;

      } else {
        return false;
      }
    }

    /**
     * Add chip
     * @param {chip} chip
     */
    addChip(chip) {
      if (!this._isValid(chip) ||
          this.chipsData.length >= this.options.max) {
        return;
      }

      let renderedChip = this._renderChip(chip);
      this.$chips.add(renderedChip);
      this.chipsData.push(chip);
      $(this.$input).before(renderedChip);
      this._setPlaceholder();

      // fire chipAdd callback
      if (typeof(this.options.onChipAdd) === 'function') {
        this.options.onChipAdd.call(this, this.$el, renderedChip);
      }
    }

    /**
     * Delete chip
     * @param {Number} chip
     */
    deleteChip(chipIndex) {
      // let chip = this.chips[chipIndex];
      this.$chips.eq(chipIndex).remove();
      this.$chips = this.$chips.filter(function(el) {
        console.log($(el).index());
        return $(el).index() >= 0;
      });
      this.chipsData.splice(chipIndex, 1);
      this._setPlaceholder();

      // fire chipDelete callback
      if (typeof(this.options.onChipDelete) === 'function') {
        this.options.onChipDelete.call(this, this.$el, this.$chip);
      }
    }

    /**
     * Select chip
     * @param {Number} chip
     */
    selectChip(chipIndex) {
      let $chip = this.$chips.eq(chipIndex);
      console.log("FOCUS", $chip);
      this._selectedChip = $chip;
      $chip[0].focus();

      // fire chipSelect callback
      if (typeof(this.options.onChipSelect) === 'function') {
        this.options.onChipSelect.call(this, this.$el, this.$chip);
      }
    }

    /**
     * Deselect chip
     * @param {Number} chip
     */
    deselectChip(chipIndex) {
      let $chip = this.$chips.eq(chipIndex);
      this._selectedChip = null;
    }
  }

  /**
   * @static
   * @memberof Chips
   */
  Chips._keydown = false;

  Materialize.Chips = Chips;

  jQuery.fn.chips = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Chips.prototype[methodOrOptions]) {
      let params = Array.prototype.slice.call( arguments, 1 );

      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        let instance = this.first()[0].M_Chips;
        return instance[methodOrOptions].apply(instance, params);

      // Void methods
      } else {
        return this.each(function() {
          let instance = this.M_Chips;
          instance[methodOrOptions].apply(instance, params);
        });
      }

    // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      Chips.init(this, arguments[0]);
      return this;

    // Return error if an unrecognized  method name is passed in
    } else {
      jQuery.error(`Method ${methodOrOptions} does not exist on jQuery.chips`);
    }
  };

  // var materialChipsDefaults = {
  //   data: [],
  //   placeholder: '',
  //   secondaryPlaceholder: '',
  //   autocompleteOptions: {},
  // };

  // $(document).ready(function() {
  //   // Handle removal of static chips.
  //   $(document).on('click', '.chip .close', function(e){
  //     var $chips = $(this).closest('.chips');
  //     if ($chips.attr('data-initialized')) {
  //       return;
  //     }
  //     $(this).closest('.chip').remove();
  //   });
  // });

  // $.fn.material_chip = function (options) {
  //   var self = this;
  //   this.$el = $(this);
  //   this.$document = $(document);
  //   this.SELS = {
  //     CHIPS: '.chips',
  //     CHIP: '.chip',
  //     INPUT: 'input',
  //     DELETE: '.material-icons',
  //     SELECTED_CHIP: '.selected',
  //   };

  //   if ('data' === options) {
  //     return this.$el.data('chips');
  //   }

  //   var curr_options = $.extend({}, materialChipsDefaults, options);
  //   self.hasAutocomplete = !$.isEmptyObject(curr_options.autocompleteOptions.data);

  //   // Initialize
  //   this.init = function() {
  //     var i = 0;
  //     var chips;
  //     self.$el.each(function(){
  //       var $chips = $(this);
  //       var chipId = Materialize.guid();
  //       self.chipId = chipId;

  //       if (!curr_options.data || !(curr_options.data instanceof Array)) {
  //         curr_options.data = [];
  //       }
  //       $chips.data('chips', curr_options.data);
  //       $chips.attr('data-index', i);
  //       $chips.attr('data-initialized', true);

  //       if (!$chips.hasClass(self.SELS.CHIPS)) {
  //         $chips.addClass('chips');
  //       }

  //       self.chips($chips, chipId);
  //       i++;
  //     });
  //   };

  //   this.handleEvents = function() {
  //     var SELS = self.SELS;

  //     self.$document.off('click.chips-focus', SELS.CHIPS).on('click.chips-focus', SELS.CHIPS, function(e){
  //       $(e.target).find(SELS.INPUT).focus();
  //     });

  //     self.$document.off('click.chips-select', SELS.CHIP).on('click.chips-select', SELS.CHIP, function(e){
  //       var $chip = $(e.target);
  //       if ($chip.length) {
  //         var wasSelected = $chip.hasClass('selected');
  //         var $chips = $chip.closest(SELS.CHIPS);
  //         $(SELS.CHIP).removeClass('selected');

  //         if (!wasSelected) {
  //           self.selectChip($chip.index(), $chips);
  //         }
  //       }
  //     });

  //     self.$document.off('keydown.chips').on('keydown.chips', function(e){
  //       if ($(e.target).is('input, textarea')) {
  //         return;
  //       }

  //       // delete
  //       var $chip = self.$document.find(SELS.CHIP + SELS.SELECTED_CHIP);
  //       var $chips = $chip.closest(SELS.CHIPS);
  //       var length = $chip.siblings(SELS.CHIP).length;
  //       var index;

  //       if (!$chip.length) {
  //         return;
  //       }

  //       // backspace and delete
  //       if (e.which === 8 || e.which === 46) {
  //         e.preventDefault();

  //         index = $chip.index();
  //         self.deleteChip(index, $chips);

  //         var selectIndex = null;
  //         if ((index + 1) < length) {
  //           selectIndex = index;
  //         } else if (index === length || (index + 1) === length) {
  //           selectIndex = length - 1;
  //         }

  //         if (selectIndex < 0) selectIndex = null;

  //         if (null !== selectIndex) {
  //           self.selectChip(selectIndex, $chips);
  //         }
  //         if (!length) $chips.find('input').focus();

  //       // left
  //       } else if (e.which === 37) {
  //         index = $chip.index() - 1;
  //         if (index < 0) {
  //           return;
  //         }
  //         $(SELS.CHIP).removeClass('selected');
  //         self.selectChip(index, $chips);

  //       // right
  //       } else if (e.which === 39) {
  //         index = $chip.index() + 1;
  //         $(SELS.CHIP).removeClass('selected');
  //         if (index > length) {
  //           $chips.find('input').focus();
  //           return;
  //         }
  //         self.selectChip(index, $chips);
  //       }
  //     });

  //     self.$document.off('focusin.chips', SELS.CHIPS + ' ' + SELS.INPUT).on('focusin.chips', SELS.CHIPS + ' ' + SELS.INPUT, function(e){
  //       var $currChips = $(e.target).closest(SELS.CHIPS);
  //       $currChips.addClass('focus');
  //       $currChips.siblings('label, .prefix').addClass('active');
  //       $(SELS.CHIP).removeClass('selected');
  //     });

  //     self.$document.off('focusout.chips', SELS.CHIPS + ' ' + SELS.INPUT).on('focusout.chips', SELS.CHIPS + ' ' + SELS.INPUT, function(e){
  //       var $currChips = $(e.target).closest(SELS.CHIPS);
  //       $currChips.removeClass('focus');

  //       // Remove active if empty
  //       if ($currChips.data('chips') === undefined || !$currChips.data('chips').length) {
  //         $currChips.siblings('label').removeClass('active');
  //       }
  //       $currChips.siblings('.prefix').removeClass('active');
  //     });

  //     self.$document.off('keydown.chips-add', SELS.CHIPS + ' ' + SELS.INPUT).on('keydown.chips-add', SELS.CHIPS + ' ' + SELS.INPUT, function(e){
  //       var $target = $(e.target);
  //       var $chips = $target.closest(SELS.CHIPS);
  //       var chipsLength = $chips.children(SELS.CHIP).length;

  //       // enter
  //       if (13 === e.which) {
  //         // Override enter if autocompleting.
  //         if (self.hasAutocomplete &&
  //             $chips.find('.autocomplete-content.dropdown-content').length &&
  //             $chips.find('.autocomplete-content.dropdown-content').children().length) {
  //           return;
  //         }

  //         e.preventDefault();
  //         self.addChip({tag: $target.val()}, $chips);
  //         $target.val('');
  //         return;
  //       }

  //       // delete or left
  //       if ((8 === e.keyCode || 37 === e.keyCode) && '' === $target.val() && chipsLength) {
  //         e.preventDefault();
  //         self.selectChip(chipsLength - 1, $chips);
  //         $target.blur();
  //         return;
  //       }
  //     });

  //     // Click on delete icon in chip.
  //     self.$document.off('click.chips-delete', SELS.CHIPS + ' ' + SELS.DELETE).on('click.chips-delete', SELS.CHIPS + ' ' + SELS.DELETE, function(e) {
  //       var $target = $(e.target);
  //       var $chips = $target.closest(SELS.CHIPS);
  //       var $chip = $target.closest(SELS.CHIP);
  //       e.stopPropagation();
  //       self.deleteChip($chip.index(), $chips);
  //       $chips.find('input').focus();
  //     });
  //   };

  //   this.chips = function($chips, chipId) {
  //     $chips.empty();
  //     $chips.data('chips').forEach(function(elem){
  //       $chips.append(self.renderChip(elem));
  //     });
  //     $chips.append($('<input id="' + chipId +'" class="input" placeholder="">'));
  //     self.setPlaceholder($chips);

  //     // Set for attribute for label
  //     var label = $chips.next('label');
  //     if (label.length) {
  //       label.attr('for', chipId);

  //       if ($chips.data('chips')!== undefined && $chips.data('chips').length) {
  //         label.addClass('active');
  //       }
  //     }

  //     // Setup autocomplete if needed.
  //     var input = $('#' + chipId);
  //     if (self.hasAutocomplete) {
  //       curr_options.autocompleteOptions.onAutocomplete = function(val) {
  //         self.addChip({tag: val}, $chips);
  //         input.val('');
  //         input.focus();
  //       }
  //       input.autocomplete(curr_options.autocompleteOptions);
  //     }
  //   };

  //   /**
  //    * Render chip jQuery element.
  //    * @param {Object} elem
  //    * @return {jQuery}
  //    */
  //   this.renderChip = function(elem) {
  //     if (!elem.tag) return;

  //     var $renderedChip = $('<div class="chip"></div>');
  //     $renderedChip.text(elem.tag);
  //     if (elem.image) {
  //       $renderedChip.prepend($('<img />').attr('src', elem.image))
  //     }
  //     $renderedChip.append($('<i class="material-icons close">close</i>'));
  //     return $renderedChip;
  //   };

  //   this.setPlaceholder = function($chips) {
  //     if (($chips.data('chips') !== undefined && !$chips.data('chips').length) && curr_options.placeholder) {
  //       $chips.find('input').prop('placeholder', curr_options.placeholder);

  //     } else if (($chips.data('chips') === undefined || !!$chips.data('chips').length) && curr_options.secondaryPlaceholder) {
  //       $chips.find('input').prop('placeholder', curr_options.secondaryPlaceholder);
  //     }
  //   };

  //   this.isValid = function($chips, elem) {
  //     var chips = $chips.data('chips');
  //     var exists = false;
  //     for (var i=0; i < chips.length; i++) {
  //       if (chips[i].tag === elem.tag) {
  //           exists = true;
  //           return;
  //       }
  //     }
  //     return '' !== elem.tag && !exists;
  //   };

  //   this.addChip = function(elem, $chips) {
  //     if (!self.isValid($chips, elem)) {
  //       return;
  //     }
  //     var $renderedChip = self.renderChip(elem);
  //     var newData = [];
  //     var oldData = $chips.data('chips');
  //     for (var i = 0; i < oldData.length; i++) {
  //       newData.push(oldData[i]);
  //     }
  //     newData.push(elem);

  //     $chips.data('chips', newData);
  //     $renderedChip.insertBefore($chips.find('input'));
  //     $chips.trigger('chip.add', elem);
  //     self.setPlaceholder($chips);
  //   };

  //   this.deleteChip = function(chipIndex, $chips) {
  //     var chip = $chips.data('chips')[chipIndex];
  //     $chips.find('.chip').eq(chipIndex).remove();

  //     var newData = [];
  //     var oldData = $chips.data('chips');
  //     for (var i = 0; i < oldData.length; i++) {
  //       if (i !== chipIndex) {
  //         newData.push(oldData[i]);
  //       }
  //     }

  //     $chips.data('chips', newData);
  //     $chips.trigger('chip.delete', chip);
  //     self.setPlaceholder($chips);
  //   };

  //   this.selectChip = function(chipIndex, $chips) {
  //     var $chip = $chips.find('.chip').eq(chipIndex);
  //     if ($chip && false === $chip.hasClass('selected')) {
  //       $chip.addClass('selected');
  //       $chips.trigger('chip.select', $chips.data('chips')[chipIndex]);
  //     }
  //   };

  //   // init
  //   this.init();

  //   this.handleEvents();
  // };

  $(document).ready(function() {
    // Handle removal of static chips.
    $(document).on('click', '.chip .close', function() {
      let $chips = $(this).closest('.chips');
      if (!$chips.length || $chips[0].M_Chips) {
        return;
      }
      $(this).closest('.chip').remove();
    });
  });
}( cash ));
