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
  }


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
      this.$el.find('.carousel-item').each((i,el) => {
        this.images.push(el);
        if (this.showIndicators) {
          let $indicator = $('<li class="indicator-item"></li>');

          // Add active to first by default.
          if (i === 0) {
            $indicator.addClass('active');
          }

          $indicators.append($indicator);
        }
      });
      if (this.showIndicators) {
        this.$indicators = $('<ul class="indicators"></ul>');
        this.$el.append($indicators);
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

      if (typeof window.ontouchstart !== 'undefined') {
        this.$el[0].addEventListener('touchstart', this._handleCarouselTapBound);
        this.$el[0].addEventListener('touchmove', this._handleCarouselDragBound);
        this.$el[0].addEventListener('touchend', this._handleCarouselReleaseBound);
      }

      this.$el[0].addEventListener('mousedown', this._handleCarouselTapBound);
      this.$el[0].addEventListener('mousemove', this._handleCarouselDragBound);
      this.$el[0].addEventListener('mouseup', this._handleCarouselReleaseBound);
      this.$el[0].addEventListener('mouseleave', this._handleCarouselReleaseBound);
      // view.on('click.carousel', click);

      if (this.showIndicators && this.$indicators) {
        this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);
        this.$indicators.find('.indicator-item').each((i, el) => {
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

      if (this.showIndicators && this.$indicators) {
        this.$indicators.find('.indicator-item').each((i, el) => {
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
     * Handle Indicator CLick
     * @param {Event} e
     */
    _handleIndicatorClick(e) {
      e.stopPropagation();

      let indicator = $(e.target).closest('.indicator-item');
      if (indicator.length) {
        this.cycleTo(indicator.index());
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
          firstImage.one('load', (i, el) => {
            this.$el.css('height', $(el).height());
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
        this.$el.addClass('scrolling');
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
          this.$indicators.find('.indicator-item').eq(diff).addClass('active');
        }
      }

      // center
      // Don't show wrapped items.
      if (!this.noWrap || (this.center >= 0 && this.center < this.count)) {
        el = this.images[this._wrap(this.center)];

        // Add active class to center item.
        if (!$(el).hasClass('active')) {
          this.$el.find('.carousel-item').removeClass('active');
          $(el).addClass('active');
        }
        el.style[this.xform] = alignment +
          ' translateX(' + (-delta / 2) + 'px)' +
          ' translateX(' + (dir * this.options.shift * tween * i) + 'px)' +
          ' translateZ(' + (this.options.dist * tween) + 'px)';
        el.style.zIndex = 0;
        if (this.options.fullWidth) { tweenedOpacity = 1; }
        else { tweenedOpacity = 1 - 0.2 * tween; }
        el.style.opacity = tweenedOpacity;
        el.style.display = 'block';
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
          el.style.display = 'block';
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
          el.style.display = 'block';
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
        el.style.display = 'block';
      }

      // onCycleTo callback
      if (lastCenter !== this.center &&
          typeof(this.options.onCycleTo) === "function") {
        var $currItem = this.$el.find('.carousel-item').eq(this._wrap(this.center));
        options.onCycleTo.call(this, $currItem, this.dragged);
      }

      // One time callback
      if (typeof(this.oneTimeCallback) === "function") {
        this.oneTimeCallback.call(this, $currItem, this.dragged);
        this.oneTimeCallback = null;
      }
    }

    /**
     * Cycle to target
     * @param {Number} n
     */
    cycleTo(n, callback) {
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
        this.target += (this.dim * n);

      // Prev
      } else if (diff > 0) {
        this.target -= (this.dim * n);
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
  }

  // var methods = {

  //   init : function(options) {
  //     var defaults = {
  //       duration: 200, // ms
  //       dist: -100, // zoom scale TODO: make this more intuitive as an option
  //       shift: 0, // spacing for center image
  //       padding: 0, // Padding between non center items
  //       fullWidth: false, // Change to full width styles
  //       indicators: false, // Toggle indicators
  //       noWrap: false, // Don't wrap around and cycle through items.
  //       onCycleTo: null // Callback for when a new slide is cycled to.
  //     };
  //     options = $.extend(defaults, options);
  //     var namespace = Materialize.objectSelectorString($(this));

  //     return this.each(function(i) {

  //       var images, item_width, item_height, offset, center, pressed, dim, count,
  //           reference, referenceY, amplitude, target, velocity, scrolling,
  //           xform, frame, timestamp, ticker, dragged, vertical_dragged;
  //       var $indicators = $('<ul class="indicators"></ul>');
  //       var scrollingTimeout = null;
  //       var oneTimeCallback = null;


  //       // Initialize
  //       var view = $(this);
  //       var hasMultipleSlides = view.find('.carousel-item').length > 1;
  //       var showIndicators = (view.attr('data-indicators') || options.indicators) && hasMultipleSlides;
  //       var noWrap = (view.attr('data-no-wrap') || options.noWrap) || !hasMultipleSlides;
  //       var uniqueNamespace = view.attr('data-namespace') || namespace+i;
  //       view.attr('data-namespace', uniqueNamespace);


  //       // Options
  //       var setCarouselHeight = function(imageOnly) {
  //         var firstSlide = view.find('.carousel-item.active').length ? view.find('.carousel-item.active').first() : view.find('.carousel-item').first();
  //         var firstImage = firstSlide.find('img').first();
  //         if (firstImage.length) {
  //           if (firstImage[0].complete) {
  //             // If image won't trigger the load event
  //             var imageHeight = firstImage.height();
  //             if (imageHeight > 0) {
  //               view.css('height', firstImage.height());
  //             } else {
  //               // If image still has no height, use the natural dimensions to calculate
  //               var naturalWidth = firstImage[0].naturalWidth;
  //               var naturalHeight = firstImage[0].naturalHeight;
  //               var adjustedHeight = (view.width() / naturalWidth) * naturalHeight;
  //               view.css('height', adjustedHeight);
  //             }
  //           } else {
  //             // Get height when image is loaded normally
  //             firstImage.on('load', function(){
  //               view.css('height', $(this).height());
  //             });
  //           }
  //         } else if (!imageOnly) {
  //           var slideHeight = firstSlide.height();
  //           view.css('height', slideHeight);
  //         }
  //       };

  //       if (options.fullWidth) {
  //         options.dist = 0;
  //         setCarouselHeight();

  //         // Offset fixed items when indicators.
  //         if (showIndicators) {
  //           view.find('.carousel-fixed-item').addClass('with-indicators');
  //         }
  //       }


  //       // Don't double initialize.
  //       if (view.hasClass('initialized')) {
  //         // Recalculate variables
  //         $(window).trigger('resize');

  //         // Redraw carousel.
  //         view.trigger('carouselNext', [0.000001]);
  //         return true;
  //       }


  //       view.addClass('initialized');
  //       pressed = false;
  //       offset = target = 0;
  //       images = [];
  //       item_width = view.find('.carousel-item').first().innerWidth();
  //       item_height = view.find('.carousel-item').first().innerHeight();
  //       dim = item_width * 2 + options.padding;

  //       view.find('.carousel-item').each(function (i) {
  //         images.push($(this)[0]);
  //         if (showIndicators) {
  //           var $indicator = $('<li class="indicator-item"></li>');

  //           // Add active to first by default.
  //           if (i === 0) {
  //             $indicator.addClass('active');
  //           }

  //           // Handle clicks on indicators.
  //           $indicator.click(function (e) {
  //             e.stopPropagation();

  //             var index = $(this).index();
  //             cycleTo(index);
  //           });
  //           $indicators.append($indicator);
  //         }
  //       });

  //       if (showIndicators) {
  //         view.append($indicators);
  //       }
  //       count = images.length;


  //       function setupEvents() {
  //         if (typeof window.ontouchstart !== 'undefined') {
  //           view.on('touchstart.carousel', tap);
  //           view.on('touchmove.carousel', drag);
  //           view.on('touchend.carousel', release);
  //         }
  //         view.on('mousedown.carousel', tap);
  //         view.on('mousemove.carousel', drag);
  //         view.on('mouseup.carousel', release);
  //         view.on('mouseleave.carousel', release);
  //         view.on('click.carousel', click);
  //       }

  //       // function xpos(e) {
  //       //   // touch event
  //       //   if (e.targetTouches && (e.targetTouches.length >= 1)) {
  //       //     return e.targetTouches[0].clientX;
  //       //   }

  //       //   // mouse event
  //       //   return e.clientX;
  //       // }

  //       // function ypos(e) {
  //       //   // touch event
  //       //   if (e.targetTouches && (e.targetTouches.length >= 1)) {
  //       //     return e.targetTouches[0].clientY;
  //       //   }

  //       //   // mouse event
  //       //   return e.clientY;
  //       // }

  //       // function wrap(x) {
  //       //   return (x >= count) ? (x % count) : (x < 0) ? wrap(count + (x % count)) : x;
  //       // }

  //       function scroll(x) {
  //         // Track scrolling state
  //         scrolling = true;
  //         if (!view.hasClass('scrolling')) {
  //           view.addClass('scrolling');
  //         }
  //         if (scrollingTimeout != null) {
  //           window.clearTimeout(scrollingTimeout);
  //         }
  //         scrollingTimeout = window.setTimeout(function() {
  //           scrolling = false;
  //           view.removeClass('scrolling');
  //         }, options.duration);

  //         // Start actual scroll
  //         var i, half, delta, dir, tween, el, alignment, xTranslation;
  //         var lastCenter = center;

  //         offset = (typeof x === 'number') ? x : offset;
  //         center = Math.floor((offset + dim / 2) / dim);
  //         delta = offset - center * dim;
  //         dir = (delta < 0) ? 1 : -1;
  //         tween = -dir * delta * 2 / dim;
  //         half = count >> 1;

  //         if (!options.fullWidth) {
  //           alignment = 'translateX(' + (view[0].clientWidth - item_width) / 2 + 'px) ';
  //           alignment += 'translateY(' + (view[0].clientHeight - item_height) / 2 + 'px)';
  //         } else {
  //           alignment = 'translateX(0)';
  //         }

  //         // Set indicator active
  //         if (showIndicators) {
  //           var diff = (center % count);
  //           var activeIndicator = $indicators.find('.indicator-item.active');
  //           if (activeIndicator.index() !== diff) {
  //             activeIndicator.removeClass('active');
  //             $indicators.find('.indicator-item').eq(diff).addClass('active');
  //           }
  //         }

  //         // center
  //         // Don't show wrapped items.
  //         if (!noWrap || (center >= 0 && center < count)) {
  //           el = images[wrap(center)];

  //           // Add active class to center item.
  //           if (!$(el).hasClass('active')) {
  //             view.find('.carousel-item').removeClass('active');
  //             $(el).addClass('active');
  //           }
  //           el.style[xform] = alignment +
  //             ' translateX(' + (-delta / 2) + 'px)' +
  //             ' translateX(' + (dir * options.shift * tween * i) + 'px)' +
  //             ' translateZ(' + (options.dist * tween) + 'px)';
  //           el.style.zIndex = 0;
  //           if (options.fullWidth) { tweenedOpacity = 1; }
  //           else { tweenedOpacity = 1 - 0.2 * tween; }
  //           el.style.opacity = tweenedOpacity;
  //           el.style.display = 'block';
  //         }

  //         for (i = 1; i <= half; ++i) {
  //           // right side
  //           if (options.fullWidth) {
  //             zTranslation = options.dist;
  //             tweenedOpacity = (i === half && delta < 0) ? 1 - tween : 1;
  //           } else {
  //             zTranslation = options.dist * (i * 2 + tween * dir);
  //             tweenedOpacity = 1 - 0.2 * (i * 2 + tween * dir);
  //           }
  //           // Don't show wrapped items.
  //           if (!noWrap || center + i < count) {
  //             el = images[wrap(center + i)];
  //             el.style[xform] = alignment +
  //               ' translateX(' + (options.shift + (dim * i - delta) / 2) + 'px)' +
  //               ' translateZ(' + zTranslation + 'px)';
  //             el.style.zIndex = -i;
  //             el.style.opacity = tweenedOpacity;
  //             el.style.display = 'block';
  //           }


  //           // left side
  //           if (options.fullWidth) {
  //             zTranslation = options.dist;
  //             tweenedOpacity = (i === half && delta > 0) ? 1 - tween : 1;
  //           } else {
  //             zTranslation = options.dist * (i * 2 - tween * dir);
  //             tweenedOpacity = 1 - 0.2 * (i * 2 - tween * dir);
  //           }
  //           // Don't show wrapped items.
  //           if (!noWrap || center - i >= 0) {
  //             el = images[wrap(center - i)];
  //             el.style[xform] = alignment +
  //               ' translateX(' + (-options.shift + (-dim * i - delta) / 2) + 'px)' +
  //               ' translateZ(' + zTranslation + 'px)';
  //             el.style.zIndex = -i;
  //             el.style.opacity = tweenedOpacity;
  //             el.style.display = 'block';
  //           }
  //         }

  //         // center
  //         // Don't show wrapped items.
  //         if (!noWrap || (center >= 0 && center < count)) {
  //           el = images[wrap(center)];
  //           el.style[xform] = alignment +
  //             ' translateX(' + (-delta / 2) + 'px)' +
  //             ' translateX(' + (dir * options.shift * tween) + 'px)' +
  //             ' translateZ(' + (options.dist * tween) + 'px)';
  //           el.style.zIndex = 0;
  //           if (options.fullWidth) { tweenedOpacity = 1; }
  //           else { tweenedOpacity = 1 - 0.2 * tween; }
  //           el.style.opacity = tweenedOpacity;
  //           el.style.display = 'block';
  //         }

  //         // onCycleTo callback
  //         if (lastCenter !== center &&
  //             typeof(options.onCycleTo) === "function") {
  //           var $curr_item = view.find('.carousel-item').eq(wrap(center));
  //           options.onCycleTo.call(this, $curr_item, dragged);
  //         }

  //         // One time callback
  //         if (typeof(oneTimeCallback) === "function") {
  //           oneTimeCallback.call(this, $curr_item, dragged);
  //           oneTimeCallback = null;
  //         }
  //       }

  //       function track() {
  //         var now, elapsed, delta, v;

  //         now = Date.now();
  //         elapsed = now - timestamp;
  //         timestamp = now;
  //         delta = offset - frame;
  //         frame = offset;

  //         v = 1000 * delta / (1 + elapsed);
  //         velocity = 0.8 * v + 0.2 * velocity;
  //       }

  //       function autoScroll() {
  //         var elapsed, delta;

  //         if (amplitude) {
  //           elapsed = Date.now() - timestamp;
  //           delta = amplitude * Math.exp(-elapsed / options.duration);
  //           if (delta > 2 || delta < -2) {
  //               scroll(target - delta);
  //               requestAnimationFrame(autoScroll);
  //           } else {
  //               scroll(target);
  //           }
  //         }
  //       }

  //       function click(e) {
  //         // Disable clicks if carousel was dragged.
  //         if (dragged) {
  //           e.preventDefault();
  //           e.stopPropagation();
  //           return false;

  //         } else if (!options.fullWidth) {
  //           var clickedIndex = $(e.target).closest('.carousel-item').index();
  //           var diff = wrap(center) - clickedIndex;

  //           // Disable clicks if carousel was shifted by click
  //           if (diff !== 0) {
  //             e.preventDefault();
  //             e.stopPropagation();
  //           }
  //           cycleTo(clickedIndex);
  //         }
  //       }

  //       function cycleTo(n) {
  //         var diff = (center % count) - n;

  //         // Account for wraparound.
  //         if (!noWrap) {
  //           if (diff < 0) {
  //             if (Math.abs(diff + count) < Math.abs(diff)) { diff += count; }

  //           } else if (diff > 0) {
  //             if (Math.abs(diff - count) < diff) { diff -= count; }
  //           }
  //         }

  //         // Call prev or next accordingly.
  //         if (diff < 0) {
  //           view.trigger('carouselNext', [Math.abs(diff)]);

  //         } else if (diff > 0) {
  //           view.trigger('carouselPrev', [diff]);
  //         }
  //       }

  //       function tap(e) {
  //         // Fixes firefox draggable image bug
  //         if (e.type === 'mousedown' && $(e.target).is('img')) {
  //           e.preventDefault();
  //         }
  //         pressed = true;
  //         dragged = false;
  //         vertical_dragged = false;
  //         reference = xpos(e);
  //         referenceY = ypos(e);

  //         velocity = amplitude = 0;
  //         frame = offset;
  //         timestamp = Date.now();
  //         clearInterval(ticker);
  //         ticker = setInterval(track, 100);
  //       }

  //       function drag(e) {
  //         var x, delta, deltaY;
  //         if (pressed) {
  //           x = xpos(e);
  //           y = ypos(e);
  //           delta = reference - x;
  //           deltaY = Math.abs(referenceY - y);
  //           if (deltaY < 30 && !vertical_dragged) {
  //             // If vertical scrolling don't allow dragging.
  //             if (delta > 2 || delta < -2) {
  //               dragged = true;
  //               reference = x;
  //               scroll(offset + delta);
  //             }

  //           } else if (dragged) {
  //             // If dragging don't allow vertical scroll.
  //             e.preventDefault();
  //             e.stopPropagation();
  //             return false;

  //           } else {
  //             // Vertical scrolling.
  //             vertical_dragged = true;
  //           }
  //         }

  //         if (dragged) {
  //           // If dragging don't allow vertical scroll.
  //           e.preventDefault();
  //           e.stopPropagation();
  //           return false;
  //         }
  //       }

  //       function release(e) {
  //         if (pressed) {
  //           pressed = false;
  //         } else {
  //           return;
  //         }

  //         clearInterval(ticker);
  //         target = offset;
  //         if (velocity > 10 || velocity < -10) {
  //           amplitude = 0.9 * velocity;
  //           target = offset + amplitude;
  //         }
  //         target = Math.round(target / dim) * dim;

  //         // No wrap of items.
  //         if (noWrap) {
  //           if (target >= dim * (count - 1)) {
  //             target = dim * (count - 1);
  //           } else if (target < 0) {
  //             target = 0;
  //           }
  //         }
  //         amplitude = target - offset;
  //         timestamp = Date.now();
  //         requestAnimationFrame(autoScroll);

  //         if (dragged) {
  //           e.preventDefault();
  //           e.stopPropagation();
  //         }
  //         return false;
  //       }

  //       xform = 'transform';
  //       ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
  //         var e = prefix + 'Transform';
  //         if (typeof document.body.style[e] !== 'undefined') {
  //           xform = e;
  //           return false;
  //         }
  //         return true;
  //       });


  //       var throttledResize = Materialize.throttle(function() {
  //         if (options.fullWidth) {
  //           item_width = view.find('.carousel-item').first().innerWidth();
  //           var imageHeight = view.find('.carousel-item.active').height();
  //           dim = item_width * 2 + options.padding;
  //           offset = center * 2 * item_width;
  //           target = offset;
  //           setCarouselHeight(true);
  //         } else {
  //           scroll();
  //         }
  //       }, 200);
  //       $(window)
  //         .off('resize.carousel-'+uniqueNamespace)
  //         .on('resize.carousel-'+uniqueNamespace, throttledResize);

  //       setupEvents();
  //       scroll(offset);

  //       $(this).on('carouselNext', function(e, n, callback) {
  //         if (n === undefined) {
  //           n = 1;
  //         }
  //         if (typeof(callback) === "function") {
  //           oneTimeCallback = callback;
  //         }

  //         target = (dim * Math.round(offset / dim)) + (dim * n);
  //         if (offset !== target) {
  //           amplitude = target - offset;
  //           timestamp = Date.now();
  //           requestAnimationFrame(autoScroll);
  //         }
  //       });

  //       $(this).on('carouselPrev', function(e, n, callback) {
  //         if (n === undefined) {
  //           n = 1;
  //         }
  //         if (typeof(callback) === "function") {
  //           oneTimeCallback = callback;
  //         }

  //         target = (dim * Math.round(offset / dim)) - (dim * n);
  //         if (offset !== target) {
  //           amplitude = target - offset;
  //           timestamp = Date.now();
  //           requestAnimationFrame(autoScroll);
  //         }
  //       });

  //       $(this).on('carouselSet', function(e, n, callback) {
  //         if (n === undefined) {
  //           n = 0;
  //         }
  //         if (typeof(callback) === "function") {
  //           oneTimeCallback = callback;
  //         }

  //         cycleTo(n);
  //       });

  //     });



  //   },
  //   next : function(n, callback) {
  //     $(this).trigger('carouselNext', [n, callback]);
  //   },
  //   prev : function(n, callback) {
  //     $(this).trigger('carouselPrev', [n, callback]);
  //   },
  //   set : function(n, callback) {
  //     $(this).trigger('carouselSet', [n, callback]);
  //   },
  //   destroy : function() {
  //     var uniqueNamespace = $(this).attr('data-namespace');
  //     $(this).removeAttr('data-namespace');
  //     $(this).removeClass('initialized');
  //     $(this).find('.indicators').remove();

  //     // Remove event handlers
  //     $(this).off('carouselNext carouselPrev carouselSet');
  //     $(window).off('resize.carousel-'+uniqueNamespace);
  //     if (typeof window.ontouchstart !== 'undefined') {
  //       $(this).off('touchstart.carousel touchmove.carousel touchend.carousel');
  //     }
  //     $(this).off('mousedown.carousel mousemove.carousel mouseup.carousel mouseleave.carousel click.carousel');
  //   }
  // };


    // $.fn.carousel = function(methodOrOptions) {
    //   if ( methods[methodOrOptions] ) {
    //     return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    //   } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
    //     // Default to "init"
    //     return methods.init.apply( this, arguments );
    //   } else {
    //     $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.carousel' );
    //   }
    // }; // Plugin end

  window.Materialize.Carousel = Carousel;

  $.fn.carousel = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Carousel.prototype[methodOrOptions]) {
      let params = Array.prototype.slice.call( arguments, 1 );

      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        return this.first()[0].M_Carousel[methodOrOptions](params);

      // Void methods
      } else {
        return this.each(function() {
          this.M_Carousel[methodOrOptions](params);
        });
      }

    // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      Carousel.init(this, arguments[0]);
      return this;

    // Return error if an unrecognized  method name is passed in
    } else {
      $.error(`Method ${methodOrOptions} does not exist on jQuery.collapsible`);
    }
  };
}( jQuery ));
