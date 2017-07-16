(function($) {
  'use strict';

  let _defaults = {
    opacity: 0.5,
    inDuration: 250,
    outDuration: 250,
    ready: undefined,
    complete: undefined,
    dismissible: true,
    startingTop: '4%',
    endingTop: '10%'
  };


  /**
   * @class
   *
   */
  class Modal {
    /**
     * Construct Modal instance and set up overlay
     * @constructor
     * @param {jQuery} $el
     * @param {Object} options
     */
    constructor($el, options) {
      console.log('constructor: ', this, $el);

      /**
       * The jQuery element
       * @type {jQuery}
       */
      this.$el = $el;

      /**
       * Options for the modal
       * @member Modal#options
       * @prop {Number} [opacity=0.5] - Opacity of the modal overlay
       * @prop {Number} [inDuration=250] - Length in ms of enter transition
       * @prop {Number} [outDuration=250] - Length in ms of exit transition
       * @prop {Function} ready - Callback function called when modal is finished entering
       * @prop {Function} complete - Callback function called when modal is finished exiting
       * @prop {Boolean} [dismissible=true] - Allow modal to be dismissed by keyboard or overlay click
       * @prop {String} [startingTop='4%'] - startingTop
       * @prop {String} [endingTop='10%'] - endingTop
       */
      this.options = $.extend({}, Modal.defaults, options);

      /**
       * Describes open/close state of modal
       * @type {Boolean}
       */
      this.isOpen = false;

      this.$el[0].M_Modal = this;
      this.id = $el.attr('id');
      this.openingTrigger = undefined;
      this.$overlay = $('<div class="modal-overlay"></div>');

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
     * Get Instance
     */
    getInstance() {
      return this;
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
      let $trigger =  $(e.target).closest('.modal-trigger');
      if (e.target && $trigger.length) {
        let modalId = e.target.getAttribute('href');
        if (modalId) {
          modalId = modalId.slice(1);
        } else {
          modalId = e.target.getAttribute('data-target');
        }
        document.getElementById(modalId).M_Modal.open($trigger);
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
     * Animate in modal
     */
    animateIn() {
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
        {duration: options.inDuration, queue: false, ease: 'easeOutCubic'}
      );


      // Define modal animation options
      let enterVelocityOptions = {
        duration: this.options.inDuration,
        queue: false,
        ease: 'easeOutCubic',
        // Handle modal ready callback
        complete: () => {
          if (typeof(this.options.ready) === 'function') {
            this.options.ready.call(this, this.$el, this.openingTrigger);
          }
        }
      };

      // Bottom sheet animation
      if (this.$el[0].classList.contains('bottom-sheet')) {
        Vel(
          this.$el[0],
          {bottom: 0, opacity: 1},
          enterVelocityOptions);

      // Normal modal animation
      } else {
        Vel.hook(this.$el[0], 'scaleX', 0.7);
        this.$el[0].style.top = this.options.startingTop;
        Vel(
          this.$el[0],
          {top: this.options.endingTop, opacity: 1, scaleX: 1},
          enterVelocityOptions
        );
      }
    }

    /**
     * Animate out modal
     */
    animateOut() {
      // Animate overlay
      Vel(
        this.$overlay[0],
        { opacity: 0},
        {duration: this.options.outDuration, queue: false, ease: 'easeOutQuart'}
      );

      // Define modal animation options
      var exitVelocityOptions = {
        duration: this.options.outDuration,
        queue: false,
        ease: 'easeOutCubic',
        // Handle modal ready callback
        complete: () => {
          this.$el[0].style.display = 'none';
          // Call complete callback
          if (typeof(this.options.complete) === 'function') {
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
          exitVelocityOptions
        );

      // Normal modal animation
      } else {
        Vel(
          this.$el[0],
          {top: this.options.startingTop, opacity: 0, scaleX: 0.7},
          exitVelocityOptions
        );
      }
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

      // Set opening trigger, undefined indicates modal was opened by javascript
      this.openingTrigger = !!$trigger ? $trigger : undefined;


      if (this.options.dismissible) {
        this.handleKeydownBound = this.handleKeydown.bind(this);
        document.addEventListener('keydown', this.handleKeydownBound);
      }

      this.animateIn();
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

      this.animateOut();
    }
  }

  /**
   * @static
   * @memberof Modal
   */
  Modal._count = 0;

  window.Materialize.Modal = Modal;

  $.fn.modal = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Modal.prototype[methodOrOptions]) {
      return this.each(function() {
        this[0].M_Modal[methodOrOptions]();
      });

    // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      return Modal.init(this, arguments[0]);

    // Return error if an unrecognized  method name is passed in
    } else {
      $.error(`Method ${methodOrOptions} does not exist on jQuery.modal`);
    }
  };

})(jQuery);
