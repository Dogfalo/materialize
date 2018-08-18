(function($) {
  'use strict';

  let _default = {
    duration: 350,
    container: null,
    defaultColor: 'materialize-red base',
    showClearBtn: false,
    colors: {
      'materialize-red': [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4'
      ],
      red: [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      pink: [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      purple: [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      'deep-purple': [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      indigo: [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      blue: [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      'light-blue': [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      cyan: [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      teal: [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      green: [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      'light-green': [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      lime: [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      yellow: [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      amber: [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      orange: [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      'deep-orange': [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      brown: [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      'blue-grey': [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ],
      grey: [
        'base',
        'lighten-5',
        'lighten-4',
        'lighten-3',
        'lighten-2',
        'lighten-1',
        'darken-1',
        'darken-2',
        'darken-3',
        'darken-4',
        'accent-1',
        'accent-2',
        'accent-3',
        'accent-4'
      ]
    },

    // internationalization
    i18n: {
      cancel: 'Cancel',
      clear: 'Clear',
      done: 'Ok'
    },

    autoClose: false, // auto close when minute is selected

    // Callbacks
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    onSelect: null
  };

  /**
   * @class
   *
   */
  class Colorpicker extends Component {
    constructor(el, options) {
      super(Colorpicker, el, options);

      this.el.M_Colorpicker = this;

      this.options = $.extend({}, Colorpicker.defaults, options);

      this.id = M.guid();
      this._insertHTMLIntoDOM();
      this._setupModal();
      this._setupVariables();
      this._setupEventHandlers();

      this._colorsSetup();
      this._pickerSetup();
    }

    static get defaults() {
      return _default;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Colorpicker;
    }

    destroy() {
      this._removeEventHandler();
      this.modal.destroy();
      $(this.modalEl).remove();
      this.el.M_Colorpicker = undefined;
    }

    _insertHTMLIntoDOM() {
      this.$modalEl = $(Colorpicker._template);
      this.modalEl = this.$modalEl[0];
      this.modalEl.id = 'modal-' + this.id;

      // Append popover to input by default
      let containerEl = document.querySelector(this.options.container);
      if (this.options.container && !!containerEl) {
        this.$modalEl.appendTo(containerEl);
      } else {
        this.$modalEl.insertBefore(this.el);
      }
    }

    _setupModal() {
      this.modal = M.Modal.init(this.modalEl, {
        onOpenStart: this.options.onCloseStart,
        onOpenEnd: this.options.onOpenEnd,
        onCloseStart: this.options.onCloseStart,
        onCloseEnd: () => {
          if (typeof this.options.onCloseEnd === 'function') {
            this.options.onCloseEnd.call(this);
          }
          this.isOpen = false;
        }
      });
    }

    _setupVariables() {
      this.currentView = 'category';

      this.plate = this.modalEl.querySelector('.colorpicker-plate');

      this.categoryView = this.modalEl.querySelector('.colorpicker-category');
      this.variantView = this.modalEl.querySelector('.colorpicker-variant');
      this.spanCategory = this.modalEl.querySelector('.colorpicker-span-category');
      this.spanVariant = this.modalEl.querySelector('.colorpicker-span-variant');
      this.backgroundDiv = this.modalEl.querySelector('.colorpicker-color-display');
      this.footer = this.modalEl.querySelector('.colorpicker-footer');

      this.category = this.options.defaultColor.split(' ')[0];
      this.variant = this.options.defaultColor.split(' ')[1];
    }

    _setupEventHandlers() {
      this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
      this._handleInputClickBound = this._handleInputClick.bind(this);

      this.el.addEventListener('click', this._handleInputClickBound);
      this.el.addEventListener('keydown', this._handleInputKeydownBound);

      $(this.spanCategory).on('click', this.showView.bind(this, 'category'));
      $(this.spanVariant).on('click', this.showView.bind(this, 'variant'));
    }

    _removeEventHandler() {
      this.el.removeEventListener('click', this._handleInputClickBound);
      this.el.removeEventListener('keydown', this._handleInputKeydownBound);
    }

    _colorsSetup() {
      for (let i in this.options.colors) {
        let elem = document.createElement('div');
        elem.className = 'colorpicker-category-item';
        elem.id = 'colorpicker-color-' + i;
        elem.innerHTML = `<div class="${i} base color-dot" "></div><div class="color-name">${i}</div>`;

        // Onclick event listenner
        elem.addEventListener(
          'click',
          function(event) {
            event.stopPropagation();

            let eventElem;

            if (
              event.target.className.indexOf('color-dot') !== -1 ||
              event.target.className.indexOf('color-name') !== -1
            ) {
              eventElem = $(event.target).parent()[0];
            } else {
              eventElem = $(event.target)[0];
            }

            this.category = eventElem.id.replace(/colorpicker-color-/, '');

            this._updateRender();

            this._updateVariants();

            this.showView('variant');
          }.bind(this)
        );

        this.modalEl.querySelector('.colorpicker-category').appendChild(elem);
      }

      this._updateVariants();
    }

    _pickerSetup() {
      let $clearBtn = $(
        `<button class="btn-flat colorpicker-clear waves-effect" style="visibility: hidden;" type="button" tabindex="1">${
          this.options.i18n.clear
        }</button>`
      )
        .appendTo(this.footer)
        .on('click', this.clear.bind(this));
      if (this.options.showClearBtn) {
        $clearBtn.css({ visibility: '' });
      }

      let confirmationBtnsContainer = $('<div class="confirmation-btns"></div>');
      $(
        '<button class="btn-flat colorpicker-close waves-effect" type="button" tabindex="1">' +
          this.options.i18n.cancel +
          '</button>'
      )
        .appendTo(confirmationBtnsContainer)
        .on('click', this.close.bind(this));
      $(
        '<button class="btn-flat colorpicker-close waves-effect" type="button" tabindex="1">' +
          this.options.i18n.done +
          '</button>'
      )
        .appendTo(confirmationBtnsContainer)
        .on('click', this.done.bind(this));
      confirmationBtnsContainer.appendTo(this.footer);
    }

    _handleInputClick() {
      this.open();
    }

    _handleInputKeydown(e) {
      if (e.which === M.keys.ENTER) {
        e.preventDefault();
        this.open();
      }
    }

    open() {
      if (this.isOpen) {
        return;
      }

      this.isOpen = true;
      this._updateColorFromInput();
      this.showView('category');

      this.modal.open();
    }

    _updateColorFromInput() {
      // Get the color
      let value = ((this.el.value || this.options.defaultColor || '') + '').split(' ');
      this.category = value[0];
      this.variant = value[1];
      this.spanCategory.innerHTML = this.category;
      this.spanVariant.innerHTML = this.variant;
      this.backgroundDiv.className = `colorpicker-color-display ${this.category} ${this.variant}`;
    }

    showView(view, delay) {
      let isCategory = view === 'category',
        nextView = isCategory ? this.categoryView : this.variantView,
        hideView = isCategory ? this.variantView : this.categoryView;
      this.currentView = view;

      $(this.spanCategory).toggleClass('text-primary', isCategory);
      $(this.spanVariant).toggleClass('text-primary', !isCategory);

      // Transition view
      hideView.classList.add('colorpicker-dial-out');
      $(nextView)
        .css('visibility', 'visible')
        .removeClass('colorpicker-dial-out');

      // After transitions ended
      clearTimeout(this.toggleViewTimer);
      this.toggleViewTimer = setTimeout(() => {
        $(hideView).css('visibility', 'hidden');
      }, this.options.duration);
    }

    _updateRender() {
      this.backgroundDiv.className =
        'colorpicker-color-display ' + this.category + ' ' + this.variant;
      this.spanCategory.innerHTML = this.category;
      this.spanVariant.innerHTML = this.variant;
    }

    _updateVariants() {
      this.modalEl.querySelector('.colorpicker-variant').innerHTML = '';

      for (let e = 0; e < Object.keys(this.options.colors[this.category]).length; e++) {
        let elem2 = document.createElement('div');
        elem2.className = 'colorpicker-variant-item';
        elem2.id = 'colorpicker-variant-' + this.options.colors[this.category][e];
        elem2.innerHTML = `<div class="${this.category} ${
          this.options.colors[this.category][e]
        } variant-dot"></div><div class="variant-name">${
          this.options.colors[this.category][e]
        }</div>`;

        elem2.addEventListener(
          'click',
          function(event) {
            event.stopPropagation();

            let eventElem;

            if (
              event.target.className.indexOf('variant-dot') !== -1 ||
              event.target.className.indexOf('variant-name') !== -1
            ) {
              eventElem = $(event.target).parent()[0];
            } else {
              eventElem = $(event.target)[0];
            }

            this.variant = eventElem.id.replace(/colorpicker-variant-/, '');

            this._updateRender();

            if (this.options.autoClose) {
              $(this.variantView).addClass('colorpicker-dial-out');
              setTimeout(() => {
                this.done();
              }, this.options.duration / 2);
            }
          }.bind(this)
        );

        this.modalEl.querySelector('.colorpicker-variant').appendChild(elem2);
      }
    }

    close() {
      if (!this.isOpen) {
        return;
      }

      this.isOpen = false;
      this.modal.close();
    }

    done(e, clearValue) {
      // Set input value
      let last = this.el.value;
      let value = clearValue ? '' : this.category + ' ' + this.variant;
      this.color = value;
      this.el.value = value;

      // Trigger change event
      if (value !== last) {
        this.$el.trigger('change');
      }

      this.close();
      this.el.focus();
    }

    clear() {
      this.done(null, true);
    }
  }

  Colorpicker._template = [
    '<div class="modal colorpicker-modal">',
    '<div class="modal-content colorpicker-container">',
    '<div class="colorpicker-color-display">',
    '<div class="colorpicker-text-container">',
    '<div class="colorpicker-display-column">',
    '<span class="colorpicker-span-category text-primary"></span>',
    '<span class="colorpicker-span-variant"></span>',
    '</div>',
    '</div>',
    '</div>',
    '<div class="colorpicker-color-listview">',
    '<div class="colorpicker-plate">',
    '<div class="colorpicker-dial colorpicker-category"></div>',
    '<div class="colorpicker-dial colorpicker-variant colorpicker-dial-out"></div>',
    '</div>',
    '<div class="colorpicker-footer"></div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  M.Colorpicker = Colorpicker;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Colorpicker, 'colorpicker', 'M_Colorpicker');
  }
})(cash);
