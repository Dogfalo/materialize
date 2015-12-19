(function ($) {
  var chipsHandleEvents = false;
  var materialChipsDefaults = {
    allowDelete: true,
    data: [],
    readOnly: false,
    separator: ',',
    placeholder: '',
    secondaryPlaceholder: '',
    template: '',
  };

  $(document).ready(function(){
    $(document).on('click', '.chip .material-icons', function(e){
      var $chips = $(this).closest('.chips');
      if ($chips.data('initialized')) return;
      $(this).closest('.chip').remove();
    });
  });

  $.fn.material_chip = function (options) {
    var self = this;
    this.$el = $(this);
    this.$document = $(document);
    this.SELS = {
      CHIPS: '.chips',
      CHIP: '.chip',
      INPUT: 'input',
      DELETE: '.material-icons',
      SELECTED_CHIP: '.selected',
    };

    if ('data' === options) {
      return this.$el.data('chips');
    }

    if ('params' === options) {
      return this.$el.data('options');
    }
    
    this.$el.data('options', $.extend({}, materialChipsDefaults, options));

    // Initialize
    this.init = function(){
      var i = 0;
      var chips;
      self.$el.each(function(){
        var $chips = $(this);
        var options = $chips.data('options');
        if (!options.data || !options.data instanceof Array) {
          options.data = [];
        }
        $chips.data('chips', options.data);
        $chips.data('index', i);
        $chips.data('selector', self.$el.get());
        $chips.data('initialized', true);
        self.chips($chips);
        i++;
      });
    };

    this.handleEvents = function(){
      var SELS = self.SELS;

      self.$document.on('click', SELS.CHIPS, function(e){
        $(e.target).find(SELS.INPUT).focus();
      });

      self.$document.on('click', SELS.CHIP, function(e){
        $(SELS.CHIP).removeClass('selected');
        $(this).toggleClass('selected');
      });

      self.$document.on('keydown', function(e){
        if ($(e.target).is('input, textarea')) {
            return;
        }

        // delete
        if (8 === e.keyCode) {
          var $chip = self.$document.find(SELS.CHIP + SELS.SELECTED_CHIP);
          if (!$chip.length) return;
          e.preventDefault();
          var $chips = $chip.closest(SELS.CHIPS);
          var length = $chip.siblings(SELS.CHIP).length;
          var chipsIndex = $chips.data('index');
          var index = $chip.index();
          var selector = $chips.data('selector');
          
          self.deleteChip(chipsIndex, index, selector);
          
          var selectIndex = null;
          if ((index + 1) < length) {
            selectIndex = index;
          } else if (index === length || (index + 1) === length) {
            selectIndex = length - 1;
          }

          if (selectIndex < 0) selectIndex = null;

          if (null !== selectIndex) {
            self.selectChip(chipsIndex, selectIndex, selector);
          }
          if (!length) $chips.find('input').focus();
        }

        // left
        if (37 === e.which) {
          var $chip = self.$document.find(SELS.CHIP + '.selected');
          if (!$chip.length) return;
          var $chips = $chip.closest(SELS.CHIPS);
          var index = $chip.index() - 1;
          if (index < 0) return;
          $(SELS.CHIP).removeClass('selected');
          self.selectChip($chips.data('index'), index, $chips.data('selector'));
        }

        // right
        if (39 === e.which) {
          var $chip = self.$document.find(SELS.CHIP + '.selected');
          if (!$chip.length) return;
          $(SELS.CHIP).removeClass('selected');
          var $chips = $chip.closest(SELS.CHIPS);
          var index = $chip.index() + 1;
          var length = $chip.siblings(SELS.CHIP).length;
          if (index > length) {
            $chips.find('input').focus();
            return;
          }
          self.selectChip($chips.data('index'), index, $chips.data('selector'));
        }
      });

      self.$document.on('focusin', SELS.CHIPS + ' ' + SELS.INPUT, function(e){
        $(e.target).closest(SELS.CHIPS).addClass('focus');
        $(SELS.CHIP).removeClass('selected');
      });

      self.$document.on('focusout', SELS.CHIPS + ' ' + SELS.INPUT, function(e){
        $(e.target).closest(SELS.CHIPS).removeClass('focus');
      });

      self.$document.on('keydown', SELS.CHIPS + ' ' + SELS.INPUT, function(e){
        var $target = $(e.target);
        var $chips = $target.closest(SELS.CHIPS);
        var chipsIndex = $chips.data('index');
        var selector = $chips.data('selector');
        var chipsLength = $chips.children(SELS.CHIP).length;
        
        // enter
        if (13 === e.which) {
          e.preventDefault();
          self.addChip(chipsIndex, {tag: $target.val()}, selector);
          $target.val('');
          return;
        }

        // delete or left
         if ((8 === e.keyCode || 37 === e.keyCode) && '' === $target.val() && chipsLength) {
          self.selectChip(chipsIndex, chipsLength - 1, selector);
          $target.blur();
          return;
        }
      });

      self.$document.on('click', SELS.CHIPS + ' ' + SELS.DELETE, function(e){
        var $target = $(e.target);
        var $chips = $target.closest(SELS.CHIPS);
        e.stopPropagation();
        self.deleteChip(
          $(this).closest(SELS.CHIPS).data('index'),
          $(this).closest(SELS.CHIP).index(),
          $chips.data('selector')
        );
        $chips.find('input').focus();
      });
    };

    this.chips = function($chips) {
      var html = '';
      var length = $chips.data('chips').length;
      var options = $chips.data('options');
      $chips.data('chips').forEach(function(elem){
        html += self.chipTemplate(elem, options.allowDelete, options.template);
      });
      html += self.htmlInput();
      $chips.html(html);
      self.setPlaceholder($chips);
    };

    this.chipTemplate = function(elem, allowDelete, tpl) {
      if (!elem.tag) return;

      if (tpl) {
        tpl = tpl.replace('{{tag}}', elem.tag);
        if (elem.image) {
          tpl = tpl.replace('{{image}}', '<img src="' + elem.image + '">');
        } else {
          tpl = tpl.replace('{{image}}', '');
        }
        return tpl;
      }

      var html = '<div class="chip">' + elem.tag;
      if (elem.image) {
        html += ' <img src="' + elem.image + '"> ';
      }
      if (allowDelete) {
        html += '<i class="material-icons">close</i>';
      }
      html += '</div>';
      return html;
    };

    this.htmlInput = function(){
      return '<input class="input" placeholder="">';
    };

    this.setPlaceholder = function($chips){
      var options = $chips.data('options');
      if ($chips.data('chips').length && options.placeholder) {
        $chips.find('input').prop('placeholder', options.placeholder);
      } else if (!$chips.data('chips').length && options.secondaryPlaceholder) {
        $chips.find('input').prop('placeholder', options.secondaryPlaceholder);
      }
    };

    this.isValid = function($chips, elem){
      var chips = $chips.data('chips');
      var exists = false;
      for (var i=0; i < chips.length; i++) {
        if (chips[i].tag === elem.tag) {
            exists = true;
            return;
        }
      }
      return '' !== elem.tag && !exists;
    };

    this.addChip = function(chipsIndex, elem, selector) {
      var $chips = self.getChipsElement(chipsIndex, selector);
      if (!self.isValid($chips, elem)) return;
      var options = $chips.data('options');
      $chips.data('chips').push(elem);
      var tpl = self.chipTemplate(elem, options.allowDelete, options.template);
      $(tpl).insertBefore($chips.find('input'));
      $(self.SELS.CHIPS).trigger('chip.add', elem);
      self.setPlaceholder($chips);
    };

    this.deleteChip = function(chipsIndex, chipIndex, selector) {
      var $chips = self.getChipsElement(chipsIndex, selector);
      $chips.find('.chip').eq(chipIndex).remove();
      var chip = $chips.data('chips')[chipIndex];
      $chips.data('chips').splice(chipIndex, 1);
      $(self.SELS.CHIPS).trigger('chip.delete', chip);
      self.setPlaceholder($chips);
    };

    this.selectChip = function(chipsIndex, chipIndex, selector) {
      var $chips = self.getChipsElement(chipsIndex, selector);
      var $chip = $chips.find('.chip').eq(chipIndex);
      if ($chip && false === $chip.hasClass('selected')) {
        $chip.addClass('selected');
        $(self.SELS.CHIPS).trigger('chip.select', $chips.data('chips')[chipIndex]);
      }
    };

    this.getChipsElement = function(index, selector) {
      return self.$document.find(selector).eq(index);
    };

    // init
    this.init();

    if (!chipsHandleEvents) {
      this.handleEvents();
      chipsHandleEvents = true;
    }
  }
}( jQuery ));