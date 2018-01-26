(function($) {
  'use strict';

  let _defaults = {
    responsiveThreshold: 0, // breakpoint for swipeable
  };

  class Parallax extends Component {

    constructor(el, options) {
      super(Parallax, el, options);

      this.el.M_Parallax = this;

      /**
       * Options for the Parallax
       * @member Parallax#options
       * @prop {Number} responsiveThreshold
       */
      this.options = $.extend({}, Parallax.defaults, options);
      this._enabled = window.innerWidth > this.options.responsiveThreshold;

      this.$img = this.$el.find('img').first();
      this.$img.each(function() {
        let el = this;
        if (el.complete) $(el).trigger("load");
      });

      this._updateParallax();
      this._setupEventHandlers();
      this._setupStyles();

      Parallax._parallaxes.push(this);
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
      return domElem.M_Parallax;
    }

    /**
     * Teardown component
     */
    destroy() {
      Parallax._parallaxes.splice(Parallax._parallaxes.indexOf(this), 1);
      this.$img[0].style.transform = '';
      this._removeEventHandlers();

      this.$el[0].M_Parallax = undefined;
    }

    static _handleScroll() {
      for (let i = 0; i < Parallax._parallaxes.length; i++) {
        let parallaxInstance = Parallax._parallaxes[i];
        parallaxInstance._updateParallax.call(parallaxInstance);
      }
    }

    static _handleWindowResize() {
      for (let i = 0; i < Parallax._parallaxes.length; i++) {
        let parallaxInstance = Parallax._parallaxes[i];
        parallaxInstance._enabled = window.innerWidth > parallaxInstance.options.responsiveThreshold;
      }
    }

    _setupEventHandlers() {
      this._handleImageLoadBound = this._handleImageLoad.bind(this);
      this.$img[0].addEventListener('load', this._handleImageLoadBound);

      if (Parallax._parallaxes.length === 0) {
        Parallax._handleScrollThrottled = M.throttle(Parallax._handleScroll, 5);
        window.addEventListener('scroll', Parallax._handleScrollThrottled);

        Parallax._handleWindowResizeThrottled = M.throttle(Parallax._handleWindowResize, 5);
        window.addEventListener('resize', Parallax._handleWindowResizeThrottled);
      }
    }

    _removeEventHandlers() {
      this.$img[0].removeEventListener('load', this._handleImageLoadBound);

      if (Parallax._parallaxes.length === 0) {
        window.removeEventListener('scroll', Parallax._handleScrollThrottled);
        window.removeEventListener('resize', Parallax._handleWindowResizeThrottled);
      }
    }

    _setupStyles() {
      this.$img[0].style.opacity = 1;
    }

    _handleImageLoad() {
      this._updateParallax();
    }

    _updateParallax() {
      let containerHeight = this.$el.height() > 0 ? this.el.parentNode.offsetHeight : 500;
      let imgHeight = this.$img[0].offsetHeight;
      let parallaxDist = imgHeight - containerHeight;
      let bottom = this.$el.offset().top + containerHeight;
      let top = this.$el.offset().top;
      let scrollTop = M.getDocumentScrollTop();
      let windowHeight = window.innerHeight;
      let windowBottom = scrollTop + windowHeight;
      let percentScrolled = (windowBottom - top) / (containerHeight + windowHeight);
      let parallax = parallaxDist * percentScrolled;

      if (!this._enabled) {
        this.$img[0].style.transform = '';

      } else if (bottom > scrollTop && top < scrollTop + windowHeight) {
        this.$img[0].style.transform = `translate3D(-50%, ${parallax}px, 0)`;
      }
    }
  }

  /**
   * @static
   * @memberof Parallax
   */
  Parallax._parallaxes = [];

  M.Parallax = Parallax;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Parallax, 'parallax', 'M_Parallax');
  }

})(cash);
