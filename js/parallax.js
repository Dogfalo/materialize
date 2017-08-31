(function($, Vel) {
  'use strict';

  let _defaults = {
  };

  class Parallax {

    constructor($el, options) {
      // If exists, destroy and reinitialize
      if (!!$el[0].M_Parallax) {
        $el[0].M_Parallax.destroy();
      }

      this.$el = $el;
      this.el = $el[0];
      this.options = $.extend({}, Parallax.defaults, options);

      this.$el[0].M_Parallax = this;

      this.$img = $(this.el).children('img').first();

      this.updateParallax();
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
        arr.push(new Parallax($(this), options));
      });
      return arr;
    }


    static _handleScroll() {
      for(let i = 0; i < Parallax._parallaxes.length; i++) {
        let parallaxInstance = Parallax._parallaxes[i];
        parallaxInstance.updateParallax.call(parallaxInstance);
      }
    }

    /**
     * Get Instance
     */
    getInstance() {
      return this;
    }


    _setupEventHandlers() {
      this._handleImageLoadBound = this._handleImageLoad.bind(this);
      this.$img[0].addEventListener('load', this._handleImageLoadBound);

      if (Parallax._parallaxes.length === 0) {
        Parallax._handleScrollThrottled = Materialize.throttle(Parallax._handleScroll, 5);
        window.addEventListener('scroll', Parallax._handleScrollThrottled);
      }
    }


    _setupStyles() {
      this.$img[0].style.opacity = 1;
    }


    _handleImageLoad() {
      updateParallax();
      this.$img.each(function() {
        let el = this;
        if (el.complete) $(el).trigger("load");
      });
    }


    updateParallax() {
      let containerHeight = this.$el.height() > 0 ? this.el.parentNode.offsetHeight : 500;
      let imgHeight = this.$img[0].offsetHeight;
      let parallaxDist = imgHeight - containerHeight;
      let bottom = this.$el.offset().top + containerHeight;
      let top = this.$el.offset().top;
      let scrollTop = document.body.scrollTop;
      let windowHeight = window.innerHeight;
      let windowBottom = scrollTop + windowHeight;
      let percentScrolled = (windowBottom - top) / (containerHeight + windowHeight);
      let parallax = parallaxDist * percentScrolled;

      if (bottom > scrollTop && top < scrollTop + windowHeight) {
        this.$img[0].style.transform = `translate3D(-50%, ${parallax}px, 0)`;
      }
    }


    /**
     * Teardown component
     */
    destroy() {

    }


  }

  /**
   * @static
   * @memberof Parallax
   */
  Parallax._parallaxes = [];

  window.Materialize.Parallax = Parallax;

  jQuery.fn.parallax = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Parallax.prototype[methodOrOptions]) {
      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        return this.first()[0].M_Parallax[methodOrOptions]();

        // Void methods
      } else {
        return this.each(function() {
          this.M_Parallax[methodOrOptions]();
        });
      }

      // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      Parallax.init(this, arguments[0]);
      return this;

      // Return error if an unrecognized  method name is passed in
    } else {
      jQuery.error(`Method ${methodOrOptions} does not exist on jQuery.parallax`);
    }
  };

})(cash, Materialize.Vel);
