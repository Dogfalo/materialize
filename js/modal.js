(function($) {
  'use strict';

  let _defaults = {
    opacity: 0.5,
    inDuration: 350,
    outDuration: 250,
    ready: undefined,
    complete: undefined,
    dismissible: true,
    startingTop: '4%',
    endingTop: '10%'
  };

  class Modal {
    constructor($el, options) {
      console.log('constructor: ', this, $el);
      this.$el = $el;
      this.options = $.extend({}, Modal.defaults, options);
      this.$el[0].M_Modal = this;
      this.id = $el.attr('id');
      this.$overlay = $('<div class="modal-overlay"></div>');
      this.isOpen = false;
      Modal._count++;
      this.$overlay[0].style.zIndex = 1000 + Modal._count * 2;
      this.$el[0].style.zIndex = 1000 + Modal._count * 2 + 1;
      this.setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Modal($(this), options));
      });
      return arr;
    }

    /**
     * Setup Event Handlers
     */
    setupEventHandlers() {
      this.handleOverlayClickBound = this.handleOverlayClick.bind(this);
      this.handleModalCloseClickBound = this.handleModalCloseClick.bind(this);

      document.addEventListener('click', this.handleTriggerClick);
      this.$overlay[0].addEventListener('click', this.handleOverlayClickBound);
      this.$el[0].addEventListener('click', this.handleModalCloseClickBound);
    }

    /**
     * Remove Event Handlers
     */
    removeEventHandlers() {
      document.removeEventListener('click', this.handleTriggerClick);
      this.$overlay[0].removeEventListener('click', this.handleOverlayClickBound);
      this.$el[0].removeEventListener('click', this.handleModalCloseClickBound);
    }

    /**
     * Handle Trigger Click
     * @param {Event} e
     */
    handleTriggerClick(e) {
      if (e.target && $(e.target).closest('.modal-trigger').length) {
        let modalId = e.target.getAttribute('href');
        if (modalId) {
          modalId = modalId.slice(1);
        } else {
          modalId = e.target.getAttribute('data-target');
        }
        document.getElementById(modalId).M_Modal.open();
        e.preventDefault();
      }
    }

    /**
     * Handle Overlay Click
     */
    handleOverlayClick() {
      if (this.options.dismissible) {
        this.close();
      }
    }

    /**
     * Handle Modal Close Click
     * @param {Event} e
     */
    handleModalCloseClick(e) {
      if (e.target && e.target.classList.contains('modal-close')) {
        this.close();
      }
    }

    /**
     * Handle Keydown
     * @param {Event} e
     */
    handleKeydown(e) {
      // ESC key
      if (e.keyCode === 27 && this.options.dismissible) {
        this.close();
      }
    }

    /**
     * Get Instance
     */
    getInstance() {
      return this;
    }

    /**
     * Open Modal
     * @param {jQuery} [$trigger]
     */
    open($trigger) {
      if (this.isOpen) {
        return;
      }

      this.isOpen = true;
      let body = document.body;
      body.style.overflow = 'hidden';
      this.$el[0].classList.add('open');
      body.appendChild(this.$overlay[0]);

      if (this.options.dismissible) {
        this.handleKeydownBound = this.handleKeydown.bind(this);
        document.addEventListener('keydown', this.handleKeydownBound);
      }

      // Set initial styles
      $.extend(this.$el[0].style, {
        display: 'block',
        opacity: 0
      });
      $.extend(this.$overlay[0].style, {
        display: 'block',
        opacity: 0
      });

      // Animate overlay
      Vel(
        this.$overlay[0],
        {opacity: this.options.opacity},
        {duration: options.inDuration, queue: false, ease: "easeOutCubic"});


      // Animate modal
      let enterVelocityOptions = {
        duration: this.options.inDuration,
        queue: false,
        ease: "easeOutCubic",
        // Handle modal ready callback
        complete: () => {
          if (typeof(this.options.ready) === "function") {
            this.options.ready.call(this, this.$el, $trigger);
          }
        }
      }

      // Bottom sheet animation
      if (this.$el[0].classList.contains('bottom-sheet')) {
        Vel(
          this.$el[0],
          {bottom: "0", opacity: 1},
          enterVelocityOptions);

      } else {
        Vel.hook(this.$el[0], "scaleX", 0.7);
        this.$el[0].style.top = this.options.startingTop;
        Vel(
          this.$el[0],
          {top: this.options.endingTop, opacity: 1, scaleX: '1'},
          enterVelocityOptions);
      }
    }

    /**
     * Close Modal
     */
    close() {
      if (!this.isOpen) {
        return;
      }

      this.isOpen = false;
      this.$el[0].classList.remove('open');
      document.body.style.overflow = null;

      if (this.options.dismissible) {
        document.removeEventListener('keydown', this.handleKeydownBound);
      }

      // Animate overlay
      Vel(
        this.$overlay[0],
        { opacity: 0},
        {duration: this.options.outDuration, queue: false, ease: "easeOutQuart"});

      // Animate modal
      var exitVelocityOptions = {
        duration: this.options.outDuration,
        queue: false,
        ease: "easeOutCubic",
        // Handle modal ready callback
        complete: () => {
          this.$el[0].style.display = 'none';

          // Call complete callback
          if (typeof(this.options.complete) === "function") {
            this.options.complete.call(this, this.$el);
          }
          this.$overlay[0].remove();
        }
      };
      // Bottom sheet animation
      if (this.$el[0].classList.contains('bottom-sheet')) {
        Vel(
          this.$el[0],
          {bottom: '-100%', opacity: 0},
          exitVelocityOptions);

      } else {
        Vel(
          this.$el[0],
          {top: this.options.startingTop, opacity: 0, scaleX: 0.7},
          exitVelocityOptions);
      }
    }
  };

  // Static variables
  Modal._count = 0;

  window.Materialize.Modal = Modal;

  $.fn.modal = function(methodOrOptions) {

    if ( Modal.prototype[methodOrOptions] ) {
      return this.each(function() {
        this[0].M_Modal[methodOrOptions]();
      });

    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      // Default to "init"
      return Modal.init(this, arguments[0]);

    } else {
      $.error(`Method ${methodOrOptions} does not exist on jQuery.sideNav`);
    }
  };

})(jQuery);
