(function($) {
  'use strict';

  let _defaults = {
  };

  class Parallax {

    constructor(el, options) {
      // If exists, destroy and reinitialize
      if (!!el.M_Parallax) {
        el.M_Parallax.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Parallax = this;

      this.options = $.extend({}, Parallax.defaults, options);

      this.$img = this.$el.find('img').first();
      this._updateParallax();
      this._setupEventHandlers();
      this._setupStyles();

      Parallax._parallaxes.push(this);
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Parallax(this, options));
      });
      return arr;
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

    }

    static _handleScroll() {
      for(let i = 0; i < Parallax._parallaxes.length; i++) {
        let parallaxInstance = Parallax._parallaxes[i];
        parallaxInstance._updateParallax.call(parallaxInstance);
      }
    }

    _setupEventHandlers() {
      this._handleImageLoadBound = this._handleImageLoad.bind(this);
      this.$img[0].addEventListener('load', this._handleImageLoadBound);

      if (Parallax._parallaxes.length === 0) {
        Parallax._handleScrollThrottled = M.throttle(Parallax._handleScroll, 5);
        window.addEventListener('scroll', Parallax._handleScrollThrottled);
      }
    }

    _setupStyles() {
      this.$img[0].style.opacity = 1;
    }

    _handleImageLoad() {
      this._updateParallax();
      this.$img.each(function() {
        let el = this;
        if (el.complete) $(el).trigger("load");
      });
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

      if (bottom > scrollTop && top < scrollTop + windowHeight) {
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
