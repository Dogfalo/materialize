(function ($, anim) {
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
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {

      // If exists, destroy and reinitialize
      if (!!el.M_Materialbox) {
        el.M_Materialbox.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Materialbox = this;

      /**
       * Options for the modal
       * @member Materialbox#options
       * @prop {Number} [inDuration=275] - Length in ms of enter transition
       * @prop {Number} [outDuration=200] - Length in ms of exit transition
       */
      this.options = $.extend({}, Materialbox.defaults, options);

      this.overlayActive = false;
      this.doneAnimating = true;
      this.placeholder = $('<div></div>').addClass('material-placeholder');
      this.originalWidth = 0;
      this.originalHeight = 0;
      this.originInlineStyles = this.$el.attr('style');
      this.caption = this.el.getAttribute('data-caption') || "";

      // Wrap
      this.$el.before(this.placeholder);
      this.placeholder.append(this.$el);

      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Materialbox(this, options));
      });
      return arr;
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Materialbox;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this.el.M_Materialbox = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleMaterialboxClickBound = this._handleMaterialboxClick.bind(this);
      this.el.addEventListener('click', this._handleMaterialboxClickBound);
    }

    /**
     * Remove Event Handlers
     */
    removeEventHandlers() {
      this.el.removeEventListener('click', this._handleMaterialboxClickBound);
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
      while (ancestor !== null && !$(ancestor).is(document)) {
        let curr = $(ancestor);
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
      let animOptions = {
        targets: this.el,
        height: this.newHeight,
        width: this.newWidth,
        left: M.getDocumentScrollLeft() + this.windowWidth/2 - this.placeholder.offset().left - this.newWidth/2,
        top: M.getDocumentScrollTop() + this.windowHeight/2 - this.placeholder.offset().top - this.newHeight/2,
        duration: this.options.inDuration,
        easing: 'easeOutQuad',
        complete: () => {
          this.doneAnimating = true;
        }
      };

      if (this.$el.hasClass('responsive-img')) {
        animOptions.maxWidth = this.newWidth;
        animOptions.width = [this.originalWidth, animOptions.width];
      } else {
        animOptions.left = [animOptions.left, 0];
        animOptions.top = [animOptions.top, 0];
      }

      anim(animOptions);
    }

    /**
     * Animate image out
     */
    _animateImageOut() {
      let animOptions = {
        targets: this.el,
        width: this.originalWidth,
        height: this.originalHeight,
        left: 0,
        top: 0,
        duration: this.options.outDuration,
        easing: 'easeOutQuad',
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

      anim(animOptions);
    }

    /**
     * Update open and close vars
     */
    _updateVars() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.caption = this.el.getAttribute('data-caption') || "";
    }

    /**
     * Open Materialbox
     */
    open() {
      this._updateVars();
      this.originalWidth = this.el.getBoundingClientRect().width;
      this.originalHeight = this.el.getBoundingClientRect().height;

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

      anim.remove(this.el);
      anim.remove(this.$overlay[0]);

      if (this.caption !== "") {
        anim.remove(this.$photoCaption[0]);
      }

      // Animate Overlay
      anim({
        targets: this.$overlay[0],
        opacity: 1,
        duration: this.options.inDuration,
        easing: 'easeOutQuad'
      });

      // Add and animate caption if it exists
      if (this.caption !== "") {
        this.$photoCaption = $('<div class="materialbox-caption"></div>');
        this.$photoCaption.text(this.caption);
        $('body').append(this.$photoCaption);
        this.$photoCaption.css({ "display": "inline" });

        anim({
          targets: this.$photoCaption[0],
          opacity: 1,
          duration: this.options.inDuration,
          easing: 'easeOutQuad'
        });
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

      anim.remove(this.el);
      anim.remove(this.$overlay[0]);

      if (this.caption !== "") {
        anim.remove(this.$photoCaption[0]);
      }

      // disable exit handlers
      window.removeEventListener('scroll', this._handleWindowScrollBound);
      window.removeEventListener('resize', this._handleWindowResizeBound);
      window.removeEventListener('keyup', this._handleWindowEscapeBound);

      anim({
        targets: this.$overlay[0],
        opacity: 0,
        duration: this.options.outDuration,
        easing: 'easeOutQuad',
        complete: () => {
          this.overlayActive = false;
          this.$overlay.remove();
        }
      });

      this._animateImageOut();

      // Remove Caption + reset css settings on image
      if (this.caption !== "") {
        anim({
          targets: this.$photoCaption[0],
          opacity: 0,
          duration: this.options.outDuration,
          easing: 'easeOutQuad',
          complete: () => {
            this.$photoCaption.remove();
          }
        });
      }
    }
  }

  M.Materialbox = Materialbox;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Materialbox, 'materialbox', 'M_Materialbox');
  }

}(cash, anime));
