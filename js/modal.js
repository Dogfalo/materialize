(function($, Vel) {
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
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {

      // If exists, destroy and reinitialize
      if (!!el.M_Modal) {
        el.M_Modal.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Modal = this;

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

      this.id = this.$el.attr('id');
      this._openingTrigger = undefined;
      this.$overlay = $('<div class="modal-overlay"></div>');

      Modal._increment++;
      Modal._count++;
      this.$overlay[0].style.zIndex = 1000 + Modal._increment * 2;
      this.el.style.zIndex = 1000 + Modal._increment * 2 + 1;
      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Modal(this, options));
      });
      return arr;
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Modal;
    }

    /**
     * Teardown component
     */
    destroy() {
      Modal._count--;
      this._removeEventHandlers();
      this.el.removeAttribute('style');
      this.$overlay.remove();
      this.el.M_Modal = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleOverlayClickBound = this._handleOverlayClick.bind(this);
      this._handleModalCloseClickBound = this._handleModalCloseClick.bind(this);

      if (Modal._count === 1) {
        document.body.addEventListener('click', this._handleTriggerClick);
      }
      this.$overlay[0].addEventListener('click', this._handleOverlayClickBound);
      this.el.addEventListener('click', this._handleModalCloseClickBound);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      if (Modal._count === 0) {
        document.body.removeEventListener('click', this._handleTriggerClick);
      }
      this.$overlay[0].removeEventListener('click', this._handleOverlayClickBound);
      this.el.removeEventListener('click', this._handleModalCloseClickBound);
    }

    /**
     * Handle Trigger Click
     * @param {Event} e
     */
    _handleTriggerClick(e) {
      let $trigger =  $(e.target).closest('.modal-trigger');
      if ($trigger.length) {
        let modalId = M.getIdFromTrigger($trigger[0]);
        let modalInstance = document.getElementById(modalId).M_Modal;
        if (modalInstance) {
          modalInstance.open($trigger);
        }
        e.preventDefault();
      }
    }

    /**
     * Handle Overlay Click
     */
    _handleOverlayClick() {
      if (this.options.dismissible) {
        this.close();
      }
    }

    /**
     * Handle Modal Close Click
     * @param {Event} e
     */
    _handleModalCloseClick(e) {
      let $closeTrigger = $(e.target).closest('.modal-close');
      if ($closeTrigger.length) {
        this.close();
      }
    }

    /**
     * Handle Keydown
     * @param {Event} e
     */
    _handleKeydown(e) {
      // ESC key
      if (e.keyCode === 27 && this.options.dismissible) {
        this.close();
      }
    }

    /**
     * Animate in modal
     */
    _animateIn() {
      // Set initial styles
      $.extend(this.el.style, {
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
        {duration: this.options.inDuration, queue: false, ease: 'easeOutCubic'}
      );


      // Define modal animation options
      let enterVelocityOptions = {
        duration: this.options.inDuration,
        queue: false,
        ease: 'easeOutCubic',
        // Handle modal ready callback
        complete: () => {
          if (typeof(this.options.ready) === 'function') {
            this.options.ready.call(this, this.el, this._openingTrigger);
          }
        }
      };

      // Bottom sheet animation
      if (this.el.classList.contains('bottom-sheet')) {
        Vel(
          this.el,
          {bottom: 0, opacity: 1},
          enterVelocityOptions);

      // Normal modal animation
      } else {
        Vel.hook(this.el, 'scaleX', 0.8);
        Vel.hook(this.el, 'scaleY', 0.8);
        this.el.style.top = this.options.startingTop;
        Vel(
          this.el,
          {top: this.options.endingTop, opacity: 1, scaleX: 1, scaleY: 1},
          enterVelocityOptions
        );
      }
    }

    /**
     * Animate out modal
     */
    _animateOut() {
      // Animate overlay
      Vel(
        this.$overlay[0],
        { opacity: 0},
        {duration: this.options.outDuration, queue: false, ease: 'easeOutQuart'}
      );

      // Define modal animation options
      let exitVelocityOptions = {
        duration: this.options.outDuration,
        queue: false,
        ease: 'easeOutCubic',
        // Handle modal ready callback
        complete: () => {
          this.el.style.display = 'none';
          // Call complete callback
          if (typeof(this.options.complete) === 'function') {
            this.options.complete.call(this, this.el);
          }
          this.$overlay.remove();
        }
      };

      // Bottom sheet animation
      if (this.el.classList.contains('bottom-sheet')) {
        Vel(
          this.el,
          {bottom: '-100%', opacity: 0},
          exitVelocityOptions
        );

      // Normal modal animation
      } else {
        Vel(
          this.el,
          {top: this.options.startingTop, opacity: 0, scaleX: 0.8, scaleY: 0.8},
          exitVelocityOptions
        );
      }
    }


    /**
     * Open Modal
     * @param {cash} [$trigger]
     */
    open($trigger) {
      if (this.isOpen) {
        return;
      }

      this.isOpen = true;
      let body = document.body;
      body.style.overflow = 'hidden';
      this.el.classList.add('open');
      body.appendChild(this.$overlay[0]);

      // Set opening trigger, undefined indicates modal was opened by javascript
      this._openingTrigger = !!$trigger ? $trigger[0] : undefined;

      if (this.options.dismissible) {
        this._handleKeydownBound = this._handleKeydown.bind(this);
        document.addEventListener('keydown', this._handleKeydownBound);
      }

      this._animateIn();
      return this;
    }

    /**
     * Close Modal
     */
    close() {
      if (!this.isOpen) {
        return;
      }

      this.isOpen = false;
      this.el.classList.remove('open');
      document.body.style.overflow = '';

      if (this.options.dismissible) {
        document.removeEventListener('keydown', this._handleKeydownBound);
      }

      this._animateOut();
      return this;
    }
  }

  /**
   * @static
   * @memberof Modal
   */
  Modal._increment = 0;

  /**
   * @static
   * @memberof Modal
   */
  Modal._count = 0;

  M.Modal = Modal;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Modal, 'modal', 'M_Modal');
  }

})(cash, M.Vel);
