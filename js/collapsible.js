(function ($) {
  'use strict';

  let _defaults = {
    accordion: true,
    onOpen: undefined,
    onClose: undefined
  };


  /**
   * @class
   *
   */
  class Collapsible {
    /**
     * Construct Collapsible instance
     * @constructor
     * @param {jQuery} $el
     * @param {Object} options
     */
    constructor($el, options) {

      // If exists, destroy and reinitialize
      if (!!$el[0].M_Collapsible) {
        $el[0].M_Collapsible.destroy();
      }

      /**
       * The jQuery element
       * @type {jQuery}
       */
      this.$el = $el;

      /**
       * Options for the collapsible
       * @member Collapsible#options
       * @prop {Boolean} [accordion=false] - Type of the collapsible
       * @prop {Function} onOpen - Callback function called when collapsible is opened
       * @prop {Function} onClose - Callback function called when collapsible is closed
       */
      this.options = $.extend({}, Collapsible.defaults, options);

      this.$el[0].M_Collapsible = this;
      this._setupEventHandlers();

      // Open first active
      let $activeBodies = this.$el.find('> li.active .collapsible-body');
      if (this.options.accordion) { // Handle Accordion
        $activeBodies.first().css('display', 'block');

      } else { // Handle Expandables
        $activeBodies.css('display', 'block');
      }
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Collapsible($(this), options));
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
      this.$el[0].M_Collapsible = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleCollapsibleClickBound = this._handleCollapsibleClick.bind(this);
      this.$el[0].addEventListener('click', this._handleCollapsibleClickBound);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      this.$el[0].removeEventListener('click', this._handleCollapsibleClickBound);
    }

    /**
     * Handle Collapsible Click
     * @param {Event} e
     */
    _handleCollapsibleClick(e) {
      let $header = $(e.target).closest('.collapsible-header');
      if (e.target && $header.length) {
        let $collapsible = $header.closest('.collapsible');
        if ($collapsible[0] === this.$el[0]) {
          let $collapsibleLi = $header.closest('li');
          let $collapsibleLis = $collapsible.children('li');
          let isActive = $collapsibleLi.hasClass('active');
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
     * Animate in collapsible slide
     * @param {Number} index - 0th index of slide
     */
    _animateIn(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length) {
        let $body = $collapsibleLi.find('> .collapsible-body');
        Vel($body[0], 'stop');
        Vel(
          $body[0],
          'slideDown',
          {duration: 350, easing: 'easeOutQuart', queue: false,
          complete: () => {
            $body[0].style.height = null;
            $body[0].style.overflow = null;
            $body[0].style.padding = null;
            $body[0].style.margin = null;
          }}
        );
      }
    }

    /**
     * Animate out collapsible slide
     * @param {Number} index - 0th index of slide to open
     */
    _animateOut(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length) {
        let $body = $collapsibleLi.find('> .collapsible-body');
        Vel($body[0], 'stop');
        Vel(
          $body[0],
          'slideUp',
          {duration: 350, easing: 'easeOutQuart', queue: false,
          complete: () => {
            $body[0].style.height = null;
            $body[0].style.overflow = null;
            $body[0].style.padding = null;
            $body[0].style.margin = null;
          }}
        );
      }
    }

    /**
     * Open Collapsible
     * @param {Number} index - 0th index of slide
     */
    open(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length && !$collapsibleLi.hasClass('active')) {
        // Handle accordion behavior
        if (this.options.accordion) {
          let $collapsibleLis = this.$el.children('li');
          let $activeLis = this.$el.find(' > li.active');
          $activeLis.each((i, el) => {
            let index = $collapsibleLis.index($(el));
            this.close(index)
          });
        }

        let $header = $collapsibleLi.find('> .collapsible-header');
        $collapsibleLi.addClass('active');
        this._animateIn(index);

        // onOpen callback
        if (typeof(this.options.onOpen) === 'function') {
          this.options.onOpen.call(this, $collapsibleLi[0]);
        }
      }
    }

    /**
     * Close Collapsible
     * @param {Number} index - 0th index of slide
     */
    close(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length && $collapsibleLi.hasClass('active')) {
        let $header = $collapsibleLi.find('> .collapsible-header');
        $collapsibleLi.removeClass('active');
        this._animateOut(index);

        // onClose callback
        if (typeof(this.options.onClose) === 'function') {
          this.options.onClose.call(this, $collapsibleLi[0]);
        }
      }
    }




  }

  window.Materialize.Collapsible = Collapsible;

  // $.fn.collapsible = function(options, methodParam) {
  //   var defaults = {
  //     accordion: undefined,
  //     onOpen: undefined,
  //     onClose: undefined
  //   };

  //   var methodName = options;
  //   options = $.extend(defaults, options);


  //   return this.each(function() {

  //     var $this = $(this);

  //     var $panel_headers = $(this).find('> li > .collapsible-header');

  //     var collapsible_type = $this.data("collapsible");

  //     /****************
  //     Helper Functions
  //     ****************/

  //     // Accordion Open
  //     function accordionOpen(object) {
  //       $panel_headers = $this.find('> li > .collapsible-header');
  //       if (object.hasClass('active')) {
  //         object.parent().addClass('active');
  //       }
  //       else {
  //         object.parent().removeClass('active');
  //       }
  //       if (object.parent().hasClass('active')){
  //         object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
  //       }
  //       else{
  //         object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
  //       }

  //       $panel_headers.not(object).removeClass('active').parent().removeClass('active');

  //       // Close previously open accordion elements.
  //       $panel_headers.not(object).parent().children('.collapsible-body').stop(true,false).each(function() {
  //         if ($(this).is(':visible')) {
  //           $(this).slideUp({
  //             duration: 350,
  //             easing: "easeOutQuart",
  //             queue: false,
  //             complete:
  //               function() {
  //                 $(this).css('height', '');
  //                 execCallbacks($(this).siblings('.collapsible-header'));
  //               }
  //           });
  //         }
  //       });
  //     }

  //     // Expandable Open
  //     function expandableOpen(object) {
  //       if (object.hasClass('active')) {
  //         object.parent().addClass('active');
  //       }
  //       else {
  //         object.parent().removeClass('active');
  //       }
  //       if (object.parent().hasClass('active')){
  //         object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
  //       }
  //       else {
  //         object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
  //       }
  //     }

  //     // Open collapsible. object: .collapsible-header
  //     function collapsibleOpen(object, noToggle) {
  //       if (!noToggle) {
  //         object.toggleClass('active');
  //       }

  //       if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) { // Handle Accordion
  //         accordionOpen(object);
  //       } else { // Handle Expandables
  //         expandableOpen(object);
  //       }

  //       execCallbacks(object);
  //     }

  //     // Handle callbacks
  //     function execCallbacks(object) {
  //       if (object.hasClass('active')) {
  //         if (typeof(options.onOpen) === "function") {
  //           options.onOpen.call(this, object.parent());
  //         }
  //       } else {
  //         if (typeof(options.onClose) === "function") {
  //           options.onClose.call(this, object.parent());
  //         }
  //       }
  //     }

  //     /**
  //      * Check if object is children of panel header
  //      * @param  {Object}  object Jquery object
  //      * @return {Boolean} true if it is children
  //      */
  //     function isChildrenOfPanelHeader(object) {

  //       var panelHeader = getPanelHeader(object);

  //       return panelHeader.length > 0;
  //     }

  //     /**
  //      * Get panel header from a children element
  //      * @param  {Object} object Jquery object
  //      * @return {Object} panel header object
  //      */
  //     function getPanelHeader(object) {

  //       return object.closest('li > .collapsible-header');
  //     }


  //     // Turn off any existing event handlers
  //     function removeEventHandlers() {
  //       $this.off('click.collapse', '> li > .collapsible-header');
  //     }

  //     /*****  End Helper Functions  *****/


  //     // Methods
  //     if (methodName === 'destroy') {
  //       removeEventHandlers();
  //       return;
  //     } else if (methodParam >= 0 &&
  //         methodParam < $panel_headers.length) {
  //       var $curr_header = $panel_headers.eq(methodParam);
  //       if ($curr_header.length &&
  //           (methodName === 'open' ||
  //           (methodName === 'close' &&
  //           $curr_header.hasClass('active')))) {
  //         collapsibleOpen($curr_header);
  //       }
  //       return;
  //     }


  //     removeEventHandlers();


  //     // Add click handler to only direct collapsible header children
  //     $this.on('click.collapse', '> li > .collapsible-header', function(e) {
  //       var element = $(e.target);

  //       if (isChildrenOfPanelHeader(element)) {
  //         element = getPanelHeader(element);
  //       }

  //       collapsibleOpen(element);
  //     });


  //     // Open first active
  //     if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) { // Handle Accordion
  //       collapsibleOpen($panel_headers.filter('.active').first(), true);

  //     } else { // Handle Expandables
  //       $panel_headers.filter('.active').each(function() {
  //         collapsibleOpen($(this), true);
  //       });
  //     }

  //   });
  // };

  $.fn.collapsible = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Collapsible.prototype[methodOrOptions]) {
      let params = Array.prototype.slice.call( arguments, 1 );

      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        return this.first()[0].M_Collapsible[methodOrOptions](params);

      // Void methods
      } else {
        return this.each(function() {
          this.M_Collapsible[methodOrOptions](params);
        });
      }

    // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      Collapsible.init(this, arguments[0]);
      return this;

    // Return error if an unrecognized  method name is passed in
    } else {
      $.error(`Method ${methodOrOptions} does not exist on jQuery.collapsible`);
    }
  };

}( jQuery ));