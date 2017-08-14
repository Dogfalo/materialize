(function ($) {
  'use strict';

  let _defaults = {
    duration: 200, // ms
    dist: -100, // zoom scale TODO: make this more intuitive as an option
    shift: 0, // spacing for center image
    padding: 0, // Padding between non center items
    fullWidth: false, // Change to full width styles
    indicators: false, // Toggle indicators
    noWrap: false, // Don't wrap around and cycle through items.
    onCycleTo: null // Callback for when a new slide is cycled to.
  };


  /**
   * @class
   *
   */
  class Carousel {
    /**
     * Construct Carousel instance
     * @constructor
     * @param {jQuery} $el
     * @param {Object} options
     */
    constructor($el, options) {

      // If exists, destroy and reinitialize
      if (!!$el[0].M_Carousel) {
        $el[0].M_Carousel.destroy();
      }

      /**
       * The jQuery element
       * @type {jQuery}
       */
      this.$el = $el;

      /**
       * Options for the carousel
       * @member Carousel#options
       * @prop {Number} duration
       * @prop {Number} dist
       * @prop {number} shift
       * @prop {number} padding
       * @prop {Boolean} fullWidth
       * @prop {Boolean} indicators
       * @prop {Boolean} noWrap
       * @prop {Function} onCycleTo
       */
      this.options = $.extend({}, Carousel.defaults, options);

      this.$el[0].M_Carousel = this;

      // Setup
      this.hasMultipleSlides = this.$el.find('.carousel-item').length > 1;
      this.showIndicators = this.options.indicators && this.hasMultipleSlides;
      this.noWrap = this.options.noWrap || !this.hasMultipleSlides;
      this.pressed = false;
      this.dragged = false;
      this.offset = this.target = 0;
      this.images = [];
      this.itemWidth = this.$el.find('.carousel-item').first().innerWidth();
      this.itemHeight = this.$el.find('.carousel-item').first().innerHeight();
      this.dim = this.itemWidth * 2 + this.options.padding;
      this._autoScrollBound = this._autoScroll.bind(this);
      this._trackBound = this._track.bind(this);

      // Full Width carousel setup
      if (this.options.fullWidth) {
        this.options.dist = 0;
        this._setCarouselHeight();

        // Offset fixed items when indicators.
        if (this.showIndicators) {
          this.$el.find('.carousel-fixed-item').addClass('with-indicators');
        }
      }

      // Iterate through slides
      this.$indicators = $('<ul class="indicators"></ul>');
      this.$el.find('.carousel-item').each((el, i) => {
        this.images.push(el);
        if (this.showIndicators) {
          let $indicator = $('<li class="indicator-item"></li>');

          // Add active to first by default.
          if (i === 0) {
            $indicator[0].classList.add('active');
          }

          this.$indicators.append($indicator);
        }
      });
      if (this.showIndicators) {
        this.$el.append(this.$indicators);
      }
      this.count = this.images.length;

      // Setup cross browser string
      this.xform = 'transform';
      ['webkit', 'Moz', 'O', 'ms'].every((prefix) => {
        var e = prefix + 'Transform';
        if (typeof document.body.style[e] !== 'undefined') {
          this.xform = e;
          return false;
        }
        return true;
      });

      this._setupEventHandlers();
      this._scroll(this.offset);
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Carousel($(this), options));
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
      this.$el[0].M_Carousel = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleCarouselTapBound = this._handleCarouselTap.bind(this);
      this._handleCarouselDragBound = this._handleCarouselDrag.bind(this);
      this._handleCarouselReleaseBound = this._handleCarouselRelease.bind(this);
      this._handleCarouselClickBound = this._handleCarouselClick.bind(this);

      if (typeof window.ontouchstart !== 'undefined') {
        this.$el[0].addEventListener('touchstart', this._handleCarouselTapBound);
        this.$el[0].addEventListener('touchmove', this._handleCarouselDragBound);
        this.$el[0].addEventListener('touchend', this._handleCarouselReleaseBound);
      }

      this.$el[0].addEventListener('mousedown', this._handleCarouselTapBound);
      this.$el[0].addEventListener('mousemove', this._handleCarouselDragBound);
      this.$el[0].addEventListener('mouseup', this._handleCarouselReleaseBound);
      this.$el[0].addEventListener('mouseleave', this._handleCarouselReleaseBound);
      this.$el[0].addEventListener('click', this._handleCarouselClickBound);

      if (this.showIndicators && this.$indicators) {
        this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);
        this.$indicators.find('.indicator-item').each((el, i) => {
          el.addEventListener('click', this._handleIndicatorClickBound);
        });
      }

      // Resize
      let throttledResize = Materialize.throttle(this._handleResize, 200);
      this._handleThrottledResizeBound = throttledResize.bind(this);

      window.addEventListener('resize', this._handleThrottledResizeBound);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      if (typeof window.ontouchstart !== 'undefined') {
        this.$el[0].removeEventListener('touchstart', this._handleCarouselTapBound);
        this.$el[0].removeEventListener('touchmove', this._handleCarouselDragBound);
        this.$el[0].removeEventListener('touchend', this._handleCarouselReleaseBound);
      }
      this.$el[0].removeEventListener('mousedown', this._handleCarouselTapBound);
      this.$el[0].removeEventListener('mousemove', this._handleCarouselDragBound);
      this.$el[0].removeEventListener('mouseup', this._handleCarouselReleaseBound);
      this.$el[0].removeEventListener('mouseleave', this._handleCarouselReleaseBound);
      this.$el[0].removeEventListener('click', this._handleCarouselClickBound);

      if (this.showIndicators && this.$indicators) {
        this.$indicators.find('.indicator-item').each((el, i) => {
          el.removeEventListener('click', this._handleIndicatorClickBound);
        });
      }

      window.removeEventListener('resize', this._handleThrottledResizeBound);
    }

    /**
     * Handle Carousel Tap
     * @param {Event} e
     */
    _handleCarouselTap(e) {
      // Fixes firefox draggable image bug
      if (e.type === 'mousedown' && $(e.target).is('img')) {
        e.preventDefault();
      }
      this.pressed = true;
      this.dragged = false;
      this.verticalDragged = false;
      this.reference = this._xpos(e);
      this.referenceY = this._ypos(e);

      this.velocity = this.amplitude = 0;
      this.frame = this.offset;
      this.timestamp = Date.now();
      clearInterval(this.ticker);
      this.ticker = setInterval(this._trackBound, 100);
    }

    /**
     * Handle Carousel Drag
     * @param {Event} e
     */
    _handleCarouselDrag(e) {
      let x, y, delta, deltaY;
      if (this.pressed) {
        x = this._xpos(e);
        y = this._ypos(e);
        delta = this.reference - x;
        deltaY = Math.abs(this.referenceY - y);
        if (deltaY < 30 && !this.verticalDragged) {
          // If vertical scrolling don't allow dragging.
          if (delta > 2 || delta < -2) {
            this.dragged = true;
            this.reference = x;
            this._scroll(this.offset + delta);
          }

        } else if (this.dragged) {
          // If dragging don't allow vertical scroll.
          e.preventDefault();
          e.stopPropagation();
          return false;

        } else {
          // Vertical scrolling.
          this.verticalDragged = true;
        }
      }

      if (this.dragged) {
        // If dragging don't allow vertical scroll.
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }

    /**
     * Handle Carousel Release
     * @param {Event} e
     */
    _handleCarouselRelease(e) {
      if (this.pressed) {
        this.pressed = false;
      } else {
        return;
      }

      clearInterval(this.ticker);
      this.target = this.offset;
      if (this.velocity > 10 || this.velocity < -10) {
        this.amplitude = 0.9 * this.velocity;
        this.target = this.offset + this.amplitude;
      }
      this.target = Math.round(this.target / this.dim) * this.dim;

      // No wrap of items.
      if (this.noWrap) {
        if (this.target >= this.dim * (this.count - 1)) {
          this.target = this.dim * (this.count - 1);
        } else if (this.target < 0) {
          this.target = 0;
        }
      }
      this.amplitude = this.target - this.offset;
      this.timestamp = Date.now();
      requestAnimationFrame(this._autoScrollBound);

      if (this.dragged) {
        e.preventDefault();
        e.stopPropagation();
      }
      return false;
    }

    /**
     * Handle Carousel CLick
     * @param {Event} e
     */
    _handleCarouselClick(e) {
      // Disable clicks if carousel was dragged.
      if (this.dragged) {
        e.preventDefault();
        e.stopPropagation();
        return false;

      } else if (!this.options.fullWidth) {
        let clickedIndex = $(e.target).closest('.carousel-item').index();
        let diff = this._wrap(this.center) - clickedIndex;

        // Disable clicks if carousel was shifted by click
        if (diff !== 0) {
          e.preventDefault();
          e.stopPropagation();
        }
        this._cycleTo(clickedIndex);
      }
    }

    /**
     * Handle Indicator CLick
     * @param {Event} e
     */
    _handleIndicatorClick(e) {
      e.stopPropagation();

      let indicator = $(e.target).closest('.indicator-item');
      if (indicator.length) {
        this._cycleTo(indicator.index());
      }
    }

    /**
     * Handle Throttle Resize
     * @param {Event} e
     */
    _handleResize(e) {
      if (this.options.fullWidth) {
        this.itemWidth = this.$el.find('.carousel-item').first().innerWidth();
        this.imageHeight = this.$el.find('.carousel-item.active').height();
        this.dim = this.itemWidth * 2 + this.options.padding;
        this.offset = this.center * 2 * this.itemWidth;
        this.target = this.offset;
        this._setCarouselHeight(true);
      } else {
        this._scroll();
      }
    }


    /**
     * Set carousel height based on first slide
     * @param {Booleam} imageOnly - true for image slides
     */
    _setCarouselHeight(imageOnly) {
      var firstSlide = this.$el.find('.carousel-item.active').length ? this.$el.find('.carousel-item.active').first() : this.$el.find('.carousel-item').first();
      var firstImage = firstSlide.find('img').first();
      if (firstImage.length) {
        if (firstImage[0].complete) {
          // If image won't trigger the load event
          var imageHeight = firstImage.height();
          if (imageHeight > 0) {
            this.$el.css('height', firstImage.height());
          } else {
            // If image still has no height, use the natural dimensions to calculate
            var naturalWidth = firstImage[0].naturalWidth;
            var naturalHeight = firstImage[0].naturalHeight;
            var adjustedHeight = (this.$el.width() / naturalWidth) * naturalHeight;
            this.$el.css('height', adjustedHeight);
          }
        } else {
          // Get height when image is loaded normally
          firstImage.one('load', (el, i) => {
            this.$el.css('height', el.offsetHeight);
          });
        }
      } else if (!imageOnly) {
        var slideHeight = firstSlide.height();
        this.$el.css('height', slideHeight);
      }
    }

    /**
     * Get x position from event
     * @param {Event} e
     */
    _xpos(e) {
      // touch event
      if (e.targetTouches && (e.targetTouches.length >= 1)) {
        return e.targetTouches[0].clientX;
      }

      // mouse event
      return e.clientX;
    }

    /**
     * Get y position from event
     * @param {Event} e
     */
    _ypos(e) {
      // touch event
      if (e.targetTouches && (e.targetTouches.length >= 1)) {
        return e.targetTouches[0].clientY;
      }

      // mouse event
      return e.clientY;
    }

    /**
     * Wrap index
     * @param {Number} x
     */
    _wrap(x) {
      return (x >= this.count) ? (x % this.count) : (x < 0) ? this._wrap(this.count + (x % this.count)) : x;
    }

    /**
     * Tracks scrolling information
     */
    _track() {
      let now, elapsed, delta, v;

      now = Date.now();
      elapsed = now - this.timestamp;
      this.timestamp = now;
      delta = this.offset - this.frame;
      this.frame = this.offset;

      v = 1000 * delta / (1 + elapsed);
      this.velocity = 0.8 * v + 0.2 * this.velocity;
    }

    /**
     * Auto scrolls to nearest carousel item.
     */
    _autoScroll() {
      let elapsed, delta;

      if (this.amplitude) {
        elapsed = Date.now() - this.timestamp;
        delta = this.amplitude * Math.exp(-elapsed / this.options.duration);
        if (delta > 2 || delta < -2) {
          this._scroll(this.target - delta);
          requestAnimationFrame(this._autoScrollBound);
        } else {
          this._scroll(this.target);
        }
      }
    }

    /**
     * Scroll to target
     * @param {Number} x
     */
    _scroll(x) {
      // Track scrolling state
      if (!this.$el.hasClass('scrolling')) {
        this.$el[0].classList.add('scrolling');
      }
      if (this.scrollingTimeout != null) {
        window.clearTimeout(this.scrollingTimeout);
      }
      this.scrollingTimeout = window.setTimeout(() => {
        this.$el.removeClass('scrolling');
      }, this.options.duration);

      // Start actual scroll
      let i, half, delta, dir, tween, el, alignment, xTranslation, zTranslation, tweenedOpacity;
      let lastCenter = this.center;

      this.offset = (typeof x === 'number') ? x : this.offset;
      this.center = Math.floor((this.offset + this.dim / 2) / this.dim);
      delta = this.offset - this.center * this.dim;
      dir = (delta < 0) ? 1 : -1;
      tween = -dir * delta * 2 / this.dim;
      half = this.count >> 1;

      if (!this.options.fullWidth) {
        alignment = 'translateX(' + (this.$el[0].clientWidth - this.itemWidth) / 2 + 'px) ';
        alignment += 'translateY(' + (this.$el[0].clientHeight - this.itemHeight) / 2 + 'px)';
      } else {
        alignment = 'translateX(0)';
      }

      // Set indicator active
      if (this.showIndicators) {
        let diff = (this.center % this.count);
        let activeIndicator = this.$indicators.find('.indicator-item.active');
        if (activeIndicator.index() !== diff) {
          activeIndicator.removeClass('active');
          this.$indicators.find('.indicator-item').eq(diff)[0].classList.add('active');
        }
      }

      // center
      // Don't show wrapped items.
      if (!this.noWrap || (this.center >= 0 && this.center < this.count)) {
        el = this.images[this._wrap(this.center)];

        // Add active class to center item.
        if (!$(el).hasClass('active')) {
          this.$el.find('.carousel-item').removeClass('active');
          el.classList.add('active');
        }
        el.style[this.xform] = alignment +
          ' translateX(' + (-delta / 2) + 'px)' +
          ' translateX(' + (dir * this.options.shift * tween * i) + 'px)' +
          ' translateZ(' + (this.options.dist * tween) + 'px)';
        el.style.zIndex = 0;
        if (this.options.fullWidth) { tweenedOpacity = 1; }
        else { tweenedOpacity = 1 - 0.2 * tween; }
        el.style.opacity = tweenedOpacity;
        el.style.visibility = 'visible';
      }

      for (i = 1; i <= half; ++i) {
        // right side
        if (this.options.fullWidth) {
          zTranslation = this.options.dist;
          tweenedOpacity = (i === half && delta < 0) ? 1 - tween : 1;
        } else {
          zTranslation = this.options.dist * (i * 2 + tween * dir);
          tweenedOpacity = 1 - 0.2 * (i * 2 + tween * dir);
        }
        // Don't show wrapped items.
        if (!this.noWrap || this.center + i < this.count) {
          el = this.images[this._wrap(this.center + i)];
          el.style[this.xform] = alignment +
            ' translateX(' + (this.options.shift + (this.dim * i - delta) / 2) + 'px)' +
            ' translateZ(' + zTranslation + 'px)';
          el.style.zIndex = -i;
          el.style.opacity = tweenedOpacity;
          el.style.visibility = 'visible';
        }


        // left side
        if (this.options.fullWidth) {
          zTranslation = this.options.dist;
          tweenedOpacity = (i === half && delta > 0) ? 1 - tween : 1;
        } else {
          zTranslation = this.options.dist * (i * 2 - tween * dir);
          tweenedOpacity = 1 - 0.2 * (i * 2 - tween * dir);
        }
        // Don't show wrapped items.
        if (!this.noWrap || this.center - i >= 0) {
          el = this.images[this._wrap(this.center - i)];
          el.style[this.xform] = alignment +
            ' translateX(' + (-this.options.shift + (-this.dim * i - delta) / 2) + 'px)' +
            ' translateZ(' + zTranslation + 'px)';
          el.style.zIndex = -i;
          el.style.opacity = tweenedOpacity;
          el.style.visibility = 'visible';
        }
      }

      // center
      // Don't show wrapped items.
      if (!this.noWrap || (this.center >= 0 && this.center < this.count)) {
        el = this.images[this._wrap(this.center)];
        el.style[this.xform] = alignment +
          ' translateX(' + (-delta / 2) + 'px)' +
          ' translateX(' + (dir * this.options.shift * tween) + 'px)' +
          ' translateZ(' + (this.options.dist * tween) + 'px)';
        el.style.zIndex = 0;
        if (this.options.fullWidth) { tweenedOpacity = 1; }
        else { tweenedOpacity = 1 - 0.2 * tween; }
        el.style.opacity = tweenedOpacity;
        el.style.visibility = 'visible';
      }

      // onCycleTo callback
      if (lastCenter !== this.center &&
          typeof(this.options.onCycleTo) === "function") {
        var $currItem = this.$el.find('.carousel-item').eq(this._wrap(this.center));
        this.options.onCycleTo.call(this, $currItem[0], this.dragged);
      }

      // One time callback
      if (typeof(this.oneTimeCallback) === "function") {
        this.oneTimeCallback.call(this, $currItem[0], this.dragged);
        this.oneTimeCallback = null;
      }
    }

    /**
     * Cycle to target
     * @param {Number} n
     */
    _cycleTo(n, callback) {
      let diff = (this.center % this.count) - n;

      // Account for wraparound.
      if (!this.noWrap) {
        if (diff < 0) {
          if (Math.abs(diff + this.count) < Math.abs(diff)) { diff += this.count; }

        } else if (diff > 0) {
          if (Math.abs(diff - this.count) < diff) { diff -= this.count; }
        }
      }

      this.target = (this.dim * Math.round(this.offset / this.dim))
      // Next
      if (diff < 0) {
        this.target += (this.dim * Math.abs(diff));

      // Prev
      } else if (diff > 0) {
        this.target -= (this.dim * diff);
      }

      // Set one time callback
      if (typeof(callback) === "function") {
        this.oneTimeCallback = callback;
      }

      // Scroll
      if (this.offset !== this.target) {
        this.amplitude = this.target - this.offset;
        this.timestamp = Date.now();
        requestAnimationFrame(this._autoScrollBound);
      }
    }


    /**
     * Cycle to next item
     * @param {Number} [n]
     */
    next(n) {
      if (n === undefined || isNaN(n)) {
        n = 1;
      }

      let index = this.center + n;
      if (index > this.count || index < 0) {
        if (this.noWrap) {
          return;
        } else {
          index = this._wrap(index);
        }
      }
      this._cycleTo(index);
    }

    /**
     * Cycle to previous item
     * @param {Number} [n]
     */
    prev(n) {
      if (n === undefined || isNaN(n)) {
        n = 1;
      }

      let index = this.center - n;
      if (index > this.count || index < 0) {
        if (this.noWrap) {
          return;
        } else {
          index = this._wrap(index);
        }
      }

      this._cycleTo(index);
    }

    /**
     * Cycle to nth item
     * @param {Number} [n]
     */
    set(n) {
      if (n === undefined || isNaN(n)) {
        n = 0;
      }

      if (n > this.count || n < 0) {
        if (this.noWrap) {
          return;
        } else {
          n = this._wrap(n);
        }
      }

      this._cycleTo(n);
    }
  }

  window.Materialize.Carousel = Carousel;

  jQuery.fn.carousel = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Carousel.prototype[methodOrOptions]) {
      let params = Array.prototype.slice.call( arguments, 1 );

      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        let instance = this.first()[0].M_Carousel;
        return instance[methodOrOptions].apply(instance, params);

      // Void methods
      } else {
        return this.each(function() {
          let instance = this.M_Carousel;
          instance[methodOrOptions].apply(instance, params);
        });
      }

    // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      Carousel.init(this, arguments[0]);
      return this;

    // Return error if an unrecognized  method name is passed in
    } else {
      jQuery.error(`Method ${methodOrOptions} does not exist on jQuery.collapsible`);
    }
  };
}( cash ));
