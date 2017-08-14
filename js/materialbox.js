(function ($, Vel) {
  'use strict';

  let _defaults = {
    inDuration: 275,
    outDuration: 200,
  };

  /**
   * @class
   *
   */
  class Materialbox {
    /**
     * Construct Materialbox instance
     * @constructor
     * @param {jQuery} $el
     * @param {Object} options
     */
    constructor($el, options) {

      // If exists, destroy and reinitialize
      if (!!$el[0].M_Materialbox) {
        $el[0].M_Materialbox.destroy();
      }

      /**
       * The jQuery element
       * @type {jQuery}
       */
      this.$el = $el;

      /**
       * Options for the modal
       * @member Materialbox#options
       * @prop {Number} [inDuration=275] - Length in ms of enter transition
       * @prop {Number} [outDuration=200] - Length in ms of exit transition
       */
      this.options = $.extend({}, Materialbox.defaults, options);

      this.overlayActive = false;
      this.doneAnimating = true;
      this.inDuration = 275;
      this.outDuration = 200;
      this.placeholder = $('<div></div>').addClass('material-placeholder');
      this.originalWidth = 0;
      this.originalHeight = 0;
      this.originInlineStyles = this.$el.attr('style');
      this.caption = this.$el[0].getAttribute('data-caption') || "";

      // Wrap
      this.$el.before(this.placeholder);
      this.placeholder.append(this.$el);

      this._setupEventHandlers()
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Materialbox($(this), options));
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
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this.$el[0].M_Materialbox = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleMaterialboxClickBound = this._handleMaterialboxClick.bind(this);

      this.$el[0].addEventListener('click', this._handleMaterialboxClickBound);
    }

    /**
     * Remove Event Handlers
     */
    removeEventHandlers() {
      this.$el[0].removeEventListener('click', this._handleMaterialboxClickBound);
    }

    /**
     * Handle Materialbox Click
     * @param {Event} e
     */
    _handleMaterialboxClick(e) {
      // If already modal, return to original
      if (this.doneAnimating === false ||
          (this.overlayActive && this.doneAnimating)) {
        this.close();
      } else {
        this.open();
      }
    }

    /**
     * Handle Window Scroll
     */
    _handleWindowScroll() {
      if (this.overlayActive) {
        this.close();
      }
    }

    /**
     * Handle Window Resize
     */
    _handleWindowResize() {
      if (this.overlayActive) {
        this.close();
      }
    }

    /**
     * Handle Window Resize
     * @param {Event} e
     */
    _handleWindowEscape(e) {
      // ESC key
      if (e.keyCode === 27 &&
          this.doneAnimating &&
          this.overlayActive) {
        this.close();
      }
    }

    /**
     * Find ancestors with overflow: hidden; and make visible
     */
    _makeAncestorsOverflowVisible() {
      this.ancestorsChanged = $();
      let ancestor = this.placeholder[0].parentNode;
      let count = 0;
      while (ancestor !== null && !$(ancestor).is(document)) {
        var curr = $(ancestor);
        if (curr.css('overflow') !== 'visible') {
          curr.css('overflow', 'visible');
          if (this.ancestorsChanged === undefined) {
            this.ancestorsChanged = curr;
          }
          else {
            this.ancestorsChanged = this.ancestorsChanged.add(curr);
          }
        }
        ancestor = ancestor.parentNode;
      }
    }

    /**
     * Animate image in
     */
    _animateImageIn() {
      let velocityOptions = {
        duration: this.options.inDuration,
        queue: false,
        ease: 'easeOutQuad',
        complete: () => {
          this.doneAnimating = true;
        }
      };

      let velocityProperties = {
        height: this.newHeight,
        width: this.newWidth,
        left: document.body.scrollLeft + this.windowWidth/2 - this.placeholder.offset().left - this.newWidth/2,
        top: document.body.scrollTop + this.windowHeight/2 - this.placeholder.offset().top - this.newHeight/2
      }
      if (this.$el.hasClass('responsive-img')) {
        velocityProperties.maxWidth = [this.newWidth, this.newWidth];
        velocityProperties.width = [velocityProperties.width, this.originalWidth];
      } else {
        velocityProperties.left = [velocityProperties.left, 0];
        velocityProperties.top = [velocityProperties.top, 0];
      }

      Vel(
        this.$el[0],
        velocityProperties,
        velocityOptions
      );
    }

/**
     * Animate image out
     */
    _animateImageOut() {
      let velocityOptions = {
        duration: this.options.outDuration,
        queue: false,
        ease: 'easeOutQuad',
        complete: () => {
          this.placeholder.css({
            height: '',
            width: '',
            position: '',
            top: '',
            left: ''
          });

          this.$el.removeAttr('style');
          this.$el.attr('style', this.originInlineStyles);

          // Remove class
          this.$el.removeClass('active');
          this.doneAnimating = true;

          // Remove overflow overrides on ancestors
          if (this.ancestorsChanged.length) {
            this.ancestorsChanged.css('overflow', '');
          }
        }
      };

      Vel(
        this.$el[0],
        {
          width: this.originalWidth,
          height: this.originalHeight,
          left: 0,
          top: 0
        },
        velocityOptions
      );
    }

    /**
     * Update open and close vars
     */
    _updateVars() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.caption = this.$el[0].getAttribute('data-caption') || "";
    }

    /**
     * Open Materialbox
     */
    open() {
      this._updateVars();
      this.originalWidth = this.$el[0].getBoundingClientRect().width;
      this.originalHeight = this.$el[0].getBoundingClientRect().height;

      // Set states
      this.doneAnimating = false;
      this.$el.addClass('active');
      this.overlayActive = true;

      // Set positioning for placeholder
      this.placeholder.css({
        width: this.placeholder[0].getBoundingClientRect().width + 'px',
        height: this.placeholder[0].getBoundingClientRect().height + 'px',
        position: 'relative',
        top: 0,
        left: 0
      });

      this._makeAncestorsOverflowVisible();

      // Set css on origin
      this.$el.css({
        position: 'absolute',
        'z-index': 1000,
        'will-change': 'left, top, width, height'
      });

      // Add overlay
      this.$overlay = $('<div id="materialbox-overlay"></div>')
        .css({
          opacity: 0
        })
        .one('click', () => {
          if (this.doneAnimating) {
            this.close();
          }
        });

      // Put before in origin image to preserve z-index layering.
      this.$el.before(this.$overlay);

      // Set dimensions if needed
      let overlayOffset = this.$overlay[0].getBoundingClientRect();
      this.$overlay.css({
        width: this.windowWidth + 'px',
        height: this.windowHeight + 'px',
        left: -1 * overlayOffset.left + 'px',
        top: -1 * overlayOffset.top + 'px'
      });

      // Animate Overlay
      Vel(
        this.$overlay[0],
        {opacity: 1},
        {duration: this.options.inDuration, queue: false, ease: 'easeOutQuad'}
      );

      // Add and animate caption if it exists
      if (this.caption !== "") {
        this.$photoCaption = $('<div class="materialbox-caption"></div>');
        this.$photoCaption.text(this.caption);
        $('body').append(this.$photoCaption);
        this.$photoCaption.css({ "display": "inline" });
        Vel(
          this.$photoCaption[0],
          {opacity: 1},
          {duration: this.options.inDuration, queue: false, ease: 'easeOutQuad'}
        );
      }

      // Resize Image
      let ratio = 0;
      let widthPercent = this.originalWidth / this.windowWidth;
      let heightPercent = this.originalHeight / this.windowHeight;
      this.newWidth = 0;
      this.newHeight = 0;

      if (widthPercent > heightPercent) {
        ratio = this.originalHeight / this.originalWidth;
        this.newWidth = this.windowWidth * 0.9;
        this.newHeight = this.windowWidth * 0.9 * ratio;
      }
      else {
        ratio = this.originalWidth / this.originalHeight;
        this.newWidth = this.windowHeight * 0.9 * ratio;
        this.newHeight = this.windowHeight * 0.9;
      }

      this._animateImageIn();


      // Handle Exit triggers
      this._handleWindowScrollBound = this._handleWindowScroll.bind(this);
      this._handleWindowResizeBound = this._handleWindowResize.bind(this);
      this._handleWindowEscapeBound = this._handleWindowEscape.bind(this);

      window.addEventListener('scroll', this._handleWindowScrollBound);
      window.addEventListener('resize', this._handleWindowResizeBound);
      window.addEventListener('keyup', this._handleWindowEscapeBound);
    }

    /**
     * Close Materialbox
     */
    close() {
      this._updateVars();
      this.doneAnimating = false;

      Vel(this.$el[0], 'stop');
      Vel(this.$overlay[0], 'stop');
      if (this.caption !== "") {
        Vel(this.$photoCaption[0], 'stop');
      }

      // disable exit handlers
      window.removeEventListener('scroll', this._handleWindowScrollBound);
      window.removeEventListener('resize', this._handleWindowResizeBound);
      window.removeEventListener('keyup', this._handleWindowEscapeBound);


      Vel(
        this.$overlay[0],
        {opacity: 0},
        {duration: this.options.outDuration, queue: false, ease: 'easeOutQuad', complete: () => {
          this.overlayActive = false;
          this.$overlay.remove();
        }}
      );

      this._animateImageOut();

      // Remove Caption + reset css settings on image
      if (this.caption !== "") {
        Vel(
          this.$photoCaption[0],
          {opacity: 0},
          {duration: this.options.outDuration, queue: false, ease: 'easeOutQuad', complete: () => {
            this.$photoCaption.remove();
          }}
        );
      }
    }
  }

  /**
   * @static
   * @memberof Materialbox
   */
  Materialbox._count = 0;

  window.Materialize.Materialbox = Materialbox;

  jQuery.fn.materialbox = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Materialbox.prototype[methodOrOptions]) {
      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        return this.first()[0].M_Materialbox[methodOrOptions]();

      // Void methods
      } else {
        return this.each(function() {
          this.M_Materialbox[methodOrOptions]();
        });
      }

    // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      Materialbox.init(this, arguments[0]);
      return this;

    // Return error if an unrecognized  method name is passed in
    } else {
      jQuery.error(`Method ${methodOrOptions} does not exist on jQuery.materialbox`);
    }
  };

}( cash, Materialize.Vel ));
