(function ($, anim) {
  'use strict';

  let _defaults = {
    accordion: true,
    onOpenStart: undefined,
    onOpenEnd: undefined,
    onCloseStart: undefined,
    onCloseEnd: undefined,
    inDuration: 300,
    outDuration: 300
  };


  /**
   * @class
   *
   */
  class Collapsible extends Component {
    /**
     * Construct Collapsible instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(Collapsible, el, options);

      this.el.M_Collapsible = this;

      /**
       * Options for the collapsible
       * @member Collapsible#options
       * @prop {Boolean} [accordion=false] - Type of the collapsible
       * @prop {Function} onOpenStart - Callback function called before collapsible is opened
       * @prop {Function} onOpenEnd - Callback function called after collapsible is opened
       * @prop {Function} onCloseStart - Callback function called before collapsible is closed
       * @prop {Function} onCloseEnd - Callback function called after collapsible is closed
       * @prop {Number} inDuration - Transition in duration in milliseconds.
       * @prop {Number} outDuration - Transition duration in milliseconds.
       */
      this.options = $.extend({}, Collapsible.defaults, options);

      // Setup tab indices
      this.$headers = this.$el.children('li').children('.collapsible-header');
      this.$headers.attr('tabindex', 0);

      this._setupEventHandlers();

      // Open first active
      let $activeBodies = this.$el.children('li.active').children('.collapsible-body');
      if (this.options.accordion) { // Handle Accordion
        $activeBodies.first().css('display', 'block');

      } else { // Handle Expandables
        $activeBodies.css('display', 'block');
      }
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Collapsible;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this.el.M_Collapsible = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleCollapsibleClickBound = this._handleCollapsibleClick.bind(this);
      this._handleCollapsibleKeydownBound = this._handleCollapsibleKeydown.bind(this);
      this.el.addEventListener('click', this._handleCollapsibleClickBound);
      this.$headers.each((header) => {
        header.addEventListener('keydown', this._handleCollapsibleKeydownBound);
      });
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      this.el.removeEventListener('click', this._handleCollapsibleClickBound);
    }

    /**
     * Handle Collapsible Click
     * @param {Event} e
     */
    _handleCollapsibleClick(e) {
      let $header = $(e.target).closest('.collapsible-header');
      if (e.target && $header.length) {
        let $collapsible = $header.closest('.collapsible');
        if ($collapsible[0] === this.el) {
          let $collapsibleLi = $header.closest('li');
          let $collapsibleLis = $collapsible.children('li');
          let isActive = $collapsibleLi[0].classList.contains('active');
          let index = $collapsibleLis.index($collapsibleLi);

          if (isActive) {
            this.close(index);
          } else {
            this.open(index);
          }
        }
      }
    }

    /**
     * Handle Collapsible Keydown
     * @param {Event} e
     */
    _handleCollapsibleKeydown(e) {
      if (e.keyCode === 13) {
        this._handleCollapsibleClickBound(e);
      }
    }

    /**
     * Animate in collapsible slide
     * @param {Number} index - 0th index of slide
     */
    _animateIn(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length) {
        let $body = $collapsibleLi.children('.collapsible-body');

        anim.remove($body[0]);
        $body.css({
          display: 'block',
          overflow: 'hidden',
          height: 0,
          paddingTop: '',
          paddingBottom: ''
        });

        let pTop = $body.css('padding-top');
        let pBottom = $body.css('padding-bottom');
        let finalHeight = $body[0].scrollHeight;
        $body.css({
          paddingTop: 0,
          paddingBottom: 0
        });

        anim({
          targets: $body[0],
          height: finalHeight,
          paddingTop: pTop,
          paddingBottom: pBottom,
          duration: this.options.inDuration,
          easing: 'easeInOutCubic',
          complete: (anim) => {
            $body.css({
              overflow: '',
              paddingTop: '',
              paddingBottom: '',
              height: ''
            });

            // onOpenEnd callback
            if (typeof (this.options.onOpenEnd) === 'function') {
              this.options.onOpenEnd.call(this, $collapsibleLi[0]);
            }
          }
        });
      }
    }

    /**
     * Animate out collapsible slide
     * @param {Number} index - 0th index of slide to open
     */
    _animateOut(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length) {
        let $body = $collapsibleLi.children('.collapsible-body');
        anim.remove($body[0]);
        $body.css('overflow', 'hidden');
        anim({
          targets: $body[0],
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: this.options.outDuration,
          easing: 'easeInOutCubic',
          complete: () => {
            $body.css({
              height: '',
              overflow: '',
              padding: '',
              display: ''
            });

            // onCloseEnd callback
            if (typeof (this.options.onCloseEnd) === 'function') {
              this.options.onCloseEnd.call(this, $collapsibleLi[0]);
            }
          }
        });
      }
    }

    /**
     * Open Collapsible
     * @param {Number} index - 0th index of slide
     */
    open(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length && !$collapsibleLi[0].classList.contains('active')) {

        // onOpenStart callback
        if (typeof (this.options.onOpenStart) === 'function') {
          this.options.onOpenStart.call(this, $collapsibleLi[0]);
        }

        // Handle accordion behavior
        if (this.options.accordion) {
          let $collapsibleLis = this.$el.children('li');
          let $activeLis = this.$el.children('li.active');
          $activeLis.each((el) => {
            let index = $collapsibleLis.index($(el));
            this.close(index);
          });
        }

        // Animate in
        $collapsibleLi[0].classList.add('active');
        this._animateIn(index);
      }
    }

    /**
     * Close Collapsible
     * @param {Number} index - 0th index of slide
     */
    close(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length && $collapsibleLi[0].classList.contains('active')) {

        // onCloseStart callback
        if (typeof (this.options.onCloseStart) === 'function') {
          this.options.onCloseStart.call(this, $collapsibleLi[0]);
        }

        // Animate out
        $collapsibleLi[0].classList.remove('active');
        this._animateOut(index);
      }
    }
  }

  M.Collapsible = Collapsible;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Collapsible, 'collapsible', 'M_Collapsible');
  }

}(cash, M.anime));
