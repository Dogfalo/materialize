(function ($, Vel) {
  'use strict';

  let _defaults = {
    indicators: true,
    height: 400,
    duration: 500,
    interval: 6000
  };


  /**
   * @class
   *
   */
  class Slider {
    /**
     * Construct Slider instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {

      // If exists, destroy and reinitialize
      if (!!el.M_Slider) {
        el.M_Slider.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Slider = this;

      /**
       * Options for the modal
       * @member Slider#options
       * @prop {Boolean} [indicators=true] - Show indicators
       * @prop {Number} [height=400] - height of slider
       * @prop {Number} [duration=500] - Length in ms of slide transition
       * @prop {Number} [interval=6000] - Length in ms of slide interval
       */
      this.options = $.extend({}, Slider.defaults, options);

      // setup
      this.$slider = this.$el.find('.slides');
      this.$slides = this.$slider.children('li');
      this.activeIndex = this.$slider.find('.active').index();
      if (this.activeIndex != -1) {
        this.$active = this.$slides.eq(this.activeIndex);
      }

      this._setSliderHeight();

      // Set initial positions of captions
      this.$slides.find('.caption').each((el) => {
        this._animateCaptionIn(el, 0);
      });

      // Move img src into background-image
      this.$slides.find('img').each((el) => {
        let placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        if ($(el).attr('src') !== placeholderBase64) {
          $(el).css('background-image', 'url("' + $(el).attr('src') + '")' );
          $(el).attr('src', placeholderBase64);
        }
      });

      this._setupEventHandlers();
      this._setupIndicators();

      // Show active slide
      if (this.$active) {
        this.$active.css('display', 'block');
      }
      else {
        this.$slides.first().addClass('active');
        Vel(
          this.$slides.first()[0],
          {opacity: 1},
          {duration: this.options.duration, queue: false, easing: 'easeOutQuad'}
        );

        this.activeIndex = 0;
        this.$active = this.$slides.eq(this.activeIndex);

        // Update indicators
        if (this.options.indicators) {
          this.$indicators.eq(this.activeIndex).addClass('active');
        }
      }

      // Adjust height to current slide
      this.$active.find('img').each((el) => {
        Vel(
          this.$active.find('.caption')[0],
          {opacity: 1, translateX: 0, translateY: 0},
          {duration: this.options.duration, queue: false, easing: 'easeOutQuad'}
        );
      });

      // auto scroll
      this.interval = setInterval(
        this._handleIntervalBound, this.options.duration + this.options.interval
      );
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Slider(this, options));
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
      this.el.M_Slider = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleIntervalBound = this._handleInterval.bind(this);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
    }

    /**
     * Handle Interval
     */
    _handleInterval() {
      let newActiveIndex = this.$slider.find('.active').index();
      if (this.$slides.length === newActiveIndex + 1) newActiveIndex = 0; // loop to start
      else newActiveIndex += 1;

      this.set(newActiveIndex);
    }

    /**
     * Animate in caption
     * @param {Element} caption
     * @param {Number} duration
     */
    _animateCaptionIn(caption, duration) {
      let velocityOptions = {
        opacity: 0
      };

      if ($(caption).hasClass('center-align')) {
        velocityOptions.translateY = -100;

      } else if ($(caption).hasClass('right-align')) {
        velocityOptions.translateX = 100;

      } else if ($(caption).hasClass('left-align')) {
        velocityOptions.translateX = -100;
      }

      Vel(
        caption,
        velocityOptions,
        {duration: duration, queue: false}
      );
    }

    /**
     * Set height of slider
     */
    _setSliderHeight() {
      // If fullscreen, do nothing
      if (!this.$el.hasClass('fullscreen')) {
        if (this.options.indicators) {
          // Add height if indicators are present
          this.$el.css('height', (this.options.height + 40) + 'px');
        }
        else {
          this.$el.css('height', this.options.height + 'px');
        }
        this.$slider.css('height', this.options.height + 'px');
      }
    }

    /**
     * Setup indicators
     */
    _setupIndicators() {
      if (this.options.indicators) {
        this.$indicators = $('<ul class="indicators"></ul>');
        this.$slides.each((el, index) => {
          let $indicator = $('<li class="indicator-item"></li>');

          // Handle clicks on indicators
          $indicator.on('click', () => {
            let currIndex = $indicator.index();
            this.set(currIndex);

            // reset interval
            clearInterval(this.interval);
            this.interval = setInterval(this._handleIntervalBound, this.options.duration + this.options.interval);
          });
          this.$indicators.append($indicator[0]);
        });
        this.$el.append(this.$indicators[0]);
        this.$indicators = this.$indicators.children('li.indicator-item');
      }
    }

    /**
     * Cycle to nth item
     * @param {Number} index
     */
    set(index) {
      // Wrap around indices.
      if (index >= this.$slides.length) index = 0;
      else if (index < 0) index = this.$slides.length -1;

      // Only do if index changes
      if (this.activeIndex != index) {
        this.$active = this.$slides.eq(this.activeIndex);
        let $caption = this.$active.find('.caption');

        this.$active.removeClass('active');
        Vel(
          this.$active[0],
          {opacity: 0},
          {duration: this.options.duration, queue: false, easing: 'easeOutQuad',
            complete: (() => {
              this.$slides.not('.active').each((el) => {
                Vel(
                  el,
                  {opacity: 0, translateX: 0, translateY: 0},
                  {duration: 0, queue: false}
                );
              });
            }).bind(this)
          }
        );

        this._animateCaptionIn($caption[0], this.options.duration);

        // Update indicators
        if (this.options.indicators) {
          this.$indicators.eq(this.activeIndex).removeClass('active');
          this.$indicators.eq(index).addClass('active');
        }

        Vel(
          this.$slides.eq(index)[0],
          {opacity: 1},
          {duration: this.options.duration, queue: false, easing: 'easeOutQuad'}
        );
        Vel(
          this.$slides.eq(index).find('.caption')[0],
          {opacity: 1, translateX: 0, translateY: 0},
          {duration: this.options.duration, delay: this.options.duration, queue: false, easing: 'easeOutQuad'}
        );

        this.$slides.eq(index).addClass('active');
        this.activeIndex = index;
      }
    }
  }

  // var methods = {

  //   init : function(options) {
  //     var defaults = {
  //       indicators: true,
  //       height: 400,
  //       transition: 500,
  //       interval: 6000
  //     };
  //     options = $.extend(defaults, options);

  //     return this.each(function() {

  //       // For each slider, we want to keep track of
  //       // which slide is active and its associated content
  //       var $this = $(this);
  //       var $slider = $this.find('ul.slides').first();
  //       var $slides = $slider.find('> li');
  //       var $active_index = $slider.find('.active').index();
  //       var $active, $indicators, $interval;
  //       if ($active_index != -1) { $active = $slides.eq($active_index); }

  //       // Transitions the caption depending on alignment
  //       function captionTransition(caption, duration) {
  //         if (caption.hasClass("center-align")) {
  //           caption.velocity({opacity: 0, translateY: -100}, {duration: duration, queue: false});
  //         }
  //         else if (caption.hasClass("right-align")) {
  //           caption.velocity({opacity: 0, translateX: 100}, {duration: duration, queue: false});
  //         }
  //         else if (caption.hasClass("left-align")) {
  //           caption.velocity({opacity: 0, translateX: -100}, {duration: duration, queue: false});
  //         }
  //       }

  //       // This function will transition the slide to any index of the next slide
  //       function moveToSlide(index) {
  //         // Wrap around indices.
  //         if (index >= $slides.length) index = 0;
  //         else if (index < 0) index = $slides.length -1;

  //         $active_index = $slider.find('.active').index();

  //         // Only do if index changes
  //         if ($active_index != index) {
  //           $active = $slides.eq($active_index);
  //           $caption = $active.find('.caption');

  //           $active.removeClass('active');
  //           $active.velocity({opacity: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad',
  //                             complete: function() {
  //                               $slides.not('.active').velocity({opacity: 0, translateX: 0, translateY: 0}, {duration: 0, queue: false});
  //                             } });
  //           captionTransition($caption, options.transition);


  //           // Update indicators
  //           if (options.indicators) {
  //             $indicators.eq($active_index).removeClass('active');
  //           }

  //           $slides.eq(index).velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
  //           $slides.eq(index).find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, delay: options.transition, queue: false, easing: 'easeOutQuad'});
  //           $slides.eq(index).addClass('active');


  //           // Update indicators
  //           if (options.indicators) {
  //             $indicators.eq(index).addClass('active');
  //           }
  //         }
  //       }

  //       // Set height of slider
  //       // If fullscreen, do nothing
  //       if (!$this.hasClass('fullscreen')) {
  //         if (options.indicators) {
  //           // Add height if indicators are present
  //           $this.height(options.height + 40);
  //         }
  //         else {
  //           $this.height(options.height);
  //         }
  //         $slider.height(options.height);
  //       }


  //       // Set initial positions of captions
  //       $slides.find('.caption').each(function () {
  //         captionTransition($(this), 0);
  //       });

  //       // Move img src into background-image
  //       $slides.find('img').each(function () {
  //         var placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  //         if ($(this).attr('src') !== placeholderBase64) {
  //           $(this).css('background-image', 'url("' + $(this).attr('src') + '")' );
  //           $(this).attr('src', placeholderBase64);
  //         }
  //       });

  //       // dynamically add indicators
  //       if (options.indicators) {
  //         $indicators = $('<ul class="indicators"></ul>');
  //         $slides.each(function( index ) {
  //           var $indicator = $('<li class="indicator-item"></li>');

  //           // Handle clicks on indicators
  //           $indicator.click(function () {
  //             var $parent = $slider.parent();
  //             var curr_index = $parent.find($(this)).index();
  //             moveToSlide(curr_index);

  //             // reset interval
  //             clearInterval($interval);
  //             $interval = setInterval(
  //               function(){
  //                 $active_index = $slider.find('.active').index();
  //                 if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
  //                 else $active_index += 1;

  //                 moveToSlide($active_index);

  //               }, options.transition + options.interval
  //             );
  //           });
  //           $indicators.append($indicator);
  //         });
  //         $this.append($indicators);
  //         $indicators = $this.find('ul.indicators').find('li.indicator-item');
  //       }

  //       if ($active) {
  //         $active.show();
  //       }
  //       else {
  //         $slides.first().addClass('active').velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});

  //         $active_index = 0;
  //         $active = $slides.eq($active_index);

  //         // Update indicators
  //         if (options.indicators) {
  //           $indicators.eq($active_index).addClass('active');
  //         }
  //       }

  //       // Adjust height to current slide
  //       $active.find('img').each(function() {
  //         $active.find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
  //       });

  //       // auto scroll
  //       $interval = setInterval(
  //         function(){
  //           $active_index = $slider.find('.active').index();
  //           moveToSlide($active_index + 1);

  //         }, options.transition + options.interval
  //       );


  //       // HammerJS, Swipe navigation

  //       // Touch Event
  //       var panning = false;
  //       var swipeLeft = false;
  //       var swipeRight = false;

  //       $this.hammer({
  //           prevent_default: false
  //       }).on('pan', function(e) {
  //         if (e.gesture.pointerType === "touch") {

  //           // reset interval
  //           clearInterval($interval);

  //           var direction = e.gesture.direction;
  //           var x = e.gesture.deltaX;
  //           var velocityX = e.gesture.velocityX;
  //           var velocityY = e.gesture.velocityY;

  //           $curr_slide = $slider.find('.active');
  //           if (Math.abs(velocityX) > Math.abs(velocityY)) {
  //             $curr_slide.velocity({ translateX: x
  //                 }, {duration: 50, queue: false, easing: 'easeOutQuad'});
  //           }

  //           // Swipe Left
  //           if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.65)) {
  //             swipeRight = true;
  //           }
  //           // Swipe Right
  //           else if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.65)) {
  //             swipeLeft = true;
  //           }

  //           // Make Slide Behind active slide visible
  //           var next_slide;
  //           if (swipeLeft) {
  //             next_slide = $curr_slide.next();
  //             if (next_slide.length === 0) {
  //               next_slide = $slides.first();
  //             }
  //             next_slide.velocity({ opacity: 1
  //                 }, {duration: 300, queue: false, easing: 'easeOutQuad'});
  //           }
  //           if (swipeRight) {
  //             next_slide = $curr_slide.prev();
  //             if (next_slide.length === 0) {
  //               next_slide = $slides.last();
  //             }
  //             next_slide.velocity({ opacity: 1
  //                 }, {duration: 300, queue: false, easing: 'easeOutQuad'});
  //           }


  //         }

  //       }).on('panend', function(e) {
  //         if (e.gesture.pointerType === "touch") {

  //           $curr_slide = $slider.find('.active');
  //           panning = false;
  //           curr_index = $slider.find('.active').index();

  //           if (!swipeRight && !swipeLeft || $slides.length <=1) {
  //             // Return to original spot
  //             $curr_slide.velocity({ translateX: 0
  //                 }, {duration: 300, queue: false, easing: 'easeOutQuad'});
  //           }
  //           else if (swipeLeft) {
  //             moveToSlide(curr_index + 1);
  //             $curr_slide.velocity({translateX: -1 * $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
  //                                   complete: function() {
  //                                     $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
  //                                   } });
  //           }
  //           else if (swipeRight) {
  //             moveToSlide(curr_index - 1);
  //             $curr_slide.velocity({translateX: $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
  //                                   complete: function() {
  //                                     $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
  //                                   } });
  //           }
  //           swipeLeft = false;
  //           swipeRight = false;

  //           // Restart interval
  //           clearInterval($interval);
  //           $interval = setInterval(
  //             function(){
  //               $active_index = $slider.find('.active').index();
  //               if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
  //               else $active_index += 1;

  //               moveToSlide($active_index);

  //             }, options.transition + options.interval
  //           );
  //         }
  //       });

  //       $this.on('sliderPause', function() {
  //         clearInterval($interval);
  //       });

  //       $this.on('sliderStart', function() {
  //         clearInterval($interval);
  //         $interval = setInterval(
  //           function(){
  //             $active_index = $slider.find('.active').index();
  //             if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
  //             else $active_index += 1;

  //             moveToSlide($active_index);

  //           }, options.transition + options.interval
  //         );
  //       });

  //       $this.on('sliderNext', function() {
  //         $active_index = $slider.find('.active').index();
  //         moveToSlide($active_index + 1);
  //       });

  //       $this.on('sliderPrev', function() {
  //         $active_index = $slider.find('.active').index();
  //         moveToSlide($active_index - 1);
  //       });

  //     });



  //   },
  //   pause : function() {
  //     $(this).trigger('sliderPause');
  //   },
  //   start : function() {
  //     $(this).trigger('sliderStart');
  //   },
  //   next : function() {
  //     $(this).trigger('sliderNext');
  //   },
  //   prev : function() {
  //     $(this).trigger('sliderPrev');
  //   }
  // };

  Materialize.Slider = Slider;

  jQuery.fn.slider = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Slider.prototype[methodOrOptions]) {
      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        return this.first()[0].M_Slider[methodOrOptions]();

      // Void methods
      } else {
        return this.each(function() {
          this.M_Slider[methodOrOptions]();
        });
      }

    // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      Slider.init(this, arguments[0]);
      return this;

    // Return error if an unrecognized  method name is passed in
    } else {
      jQuery.error(`Method ${methodOrOptions} does not exist on jQuery.slider`);
    }
  };

}(cash, Materialize.Vel));
