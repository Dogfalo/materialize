(function ($, Vel) {
  'use strict';

  let _defaults = {
    direction: 'top',
    hoverEnabled: true,
    toolbarEnabled: false
  };

  $.fn.reverse = [].reverse;

  /**
   * @class
   *
   */
  class FloatingActionButton {
    /**
     * Construct FloatingActionButton instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {

      // If exists, destroy and reinitialize
      if (!!el.M_FloatingActionButton) {
        el.M_FloatingActionButton.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_FloatingActionButton = this;

      /**
       * Options for the fab
       * @member FloatingActionButton#options
       * @prop {Boolean} [direction] - Direction fab menu opens
       * @prop {Boolean} [hoverEnabled=true] - Enable hover vs click
       * @prop {Boolean} [toolbarEnabled=false] - Enable toolbar transition
       */
      this.options = $.extend({}, FloatingActionButton.defaults, options);

      this.isOpen = false;
      this.$anchor = this.$el.children('a').first();
      this.$menu = this.$el.children('ul').first();
      this.$floatingBtns = this.$el.find('ul .btn-floating');
      this.$floatingBtnsReverse = this.$el.find('ul .btn-floating').reverse();
      if (this.options.direction === 'top') {
        this.$el.addClass('direction-top');
        this.offsetY = 40;
      } else if (this.options.direction === 'right') {
        this.$el.addClass('direction-right');
        this.offsetX = -40;
      } else if (this.options.direction === 'bottom') {
        this.$el.addClass('direction-bottom');
        this.offsetY = -40;
      } else {
        this.$el.addClass('direction-left');
        this.offsetX = 40;
      }
      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new FloatingActionButton(this, options));
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
      this.el.M_FloatingActionButton = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleFABClickBound = this._handleFABClick.bind(this);
      this._handleOpenBound = this.open.bind(this);
      this._handleCloseBound = this.close.bind(this);

      if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
        this.el.addEventListener('mouseenter', this._handleOpenBound);
        this.el.addEventListener('mouseleave', this._handleCloseBound);

      } else {
        this.el.addEventListener('click', this._handleFABClickBound);
      }
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
        this.el.removeEventListener('mouseenter', this._handleOpenBound);
        this.el.removeEventListener('mouseleave', this._handleCloseBound);

      } else {
        this.el.removeEventListener('click', this._handleFABClickBound);
      }
    }

    /**
     * Handle FAB Click
     */
    _handleFABClick() {
      if (this.isOpen) {
        this.close();

      } else {
        this.open();
      }
    }

    /**
     * Handle Document Click
     * @param {Event} e
     */
    _handleDocumentClick(e) {
      if (!$(e.target).closest(this.$menu).length) {
        this.close();
      }
    }

    /**
     * Open FAB
     */
    open() {
      if (this.isOpen) {
        return;
      }

      if (this.options.toolbarEnabled) {
        this._animateInToolbar();
      } else {
        this._animateInFAB();
      }
      this.isOpen = true;
    }

    /**
     * Close FAB
     */
    close() {
      if (!this.isOpen) {
        return;
      }

      if (this.options.toolbarEnabled) {
        window.removeEventListener('scroll', this._handleCloseBound, true);
        document.body.removeEventListener('click', this._handleDocumentClickBound, true);
        this._animateOutToolbar();
      } else {
        this._animateOutFAB();
      }
      this.isOpen = false;
    }

    /**
     * Classic FAB Menu open
     */
    _animateInFAB() {
      this.$el.addClass('active');
      Vel.hook(this.$floatingBtns, 'scaleX', 0.4);
      Vel.hook(this.$floatingBtns, 'scaleY', 0.4);
      Vel.hook(this.$floatingBtns, 'translateY', this.offsetY + 'px');
      Vel.hook(this.$floatingBtns, 'translateX', this.offsetX + 'px');

      let time = 0;
      this.$floatingBtnsReverse.each( function () {
        Vel(
          this,
          { opacity: "1", scaleX: 1, scaleY: 1, translateY: 0, translateX: 0},
          { duration: 80, delay: time }
        );
        time += 40;
      });
    }

    /**
     * Classic FAB Menu close
     */
    _animateOutFAB() {
      this.$el.removeClass('active');
      Vel(this.$floatingBtns, 'stop');
      Vel(
        this.$floatingBtns,
        { opacity: "0", scaleX: .4, scaleY: .4, translateY: this.offsetY, translateX: this.offsetX},
        { duration: 80 }
      );
    }

    /**
     * Toolbar transition Menu open
     */
    _animateInToolbar() {
      let scaleFactor;
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      let btnRect = this.el.getBoundingClientRect();
      let backdrop = $('<div class="fab-backdrop"></div>');
      let fabColor = this.$anchor.css('background-color');
      this.$anchor.append(backdrop);

      this.offsetX = btnRect.left - (windowWidth / 2) + (btnRect.width / 2);
      this.offsetY = windowHeight - btnRect.bottom;
      scaleFactor = windowWidth / backdrop[0].clientWidth;
      this.btnBottom = btnRect.bottom;
      this.btnLeft = btnRect.left;
      this.btnWidth = btnRect.width;

      // Set initial state
      this.$el.addClass('active');
      this.$el.css({
        'text-align': 'center',
        width: '100%',
        bottom: 0,
        left: 0,
        transform: 'translateX(' + this.offsetX + 'px)',
        transition: 'none'
      });
      this.$anchor.css({
        transform: 'translateY(' + -this.offsetY + 'px)',
        transition: 'none'
      });
      backdrop.css({
        'background-color': fabColor
      });


      setTimeout(() => {
        this.$el.css({
          transform: '',
          transition: 'transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s'
        });
        this.$anchor.css({
          overflow: 'visible',
          transform: '',
          transition: 'transform .2s'
        });

        setTimeout(() => {
          this.$el.css({
            overflow: 'hidden',
            'background-color': fabColor
          });
          backdrop.css({
            transform: 'scale(' + scaleFactor + ')',
            transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
          });
          this.$menu.children('li').children('a').css({
            opacity: 1
          });

          // Scroll to close.
          this._handleDocumentClickBound = this._handleDocumentClick.bind(this);
          window.addEventListener('scroll', this._handleCloseBound, true);
          document.body.addEventListener('click', this._handleDocumentClickBound, true);
        }, 100);
      }, 0);
    }

    /**
     * Toolbar transition Menu close
     */
    _animateOutToolbar() {
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      let backdrop = this.$el.find('.fab-backdrop');
      let fabColor = anchor.css('background-color');

      this.offsetX = this.btnLeft - (windowWidth / 2) + (this.btnWidth / 2);
      this.offsetY = windowHeight - this.btnBottom;

      // Hide backdrop
      this.$el.removeClass('active');
      this.$el.css({
        'background-color': 'transparent',
        transition: 'none'
      });
      this.$anchor.css({
        transition: 'none'
      });
      backdrop.css({
        transform: 'scale(0)',
        'background-color': fabColor
      });
      this.$menu.children('li').children('a').css({
        opacity: ''
      });

      setTimeout(() => {
        backdrop.remove();

        // Set initial state.
        this.$el.css({
          'text-align': '',
          width: '',
          bottom: '',
          left: '',
          overflow: '',
          'background-color': '',
          transform: 'translate3d(' + -this.offsetX + 'px,0,0)'
        });
        this.$anchor.css({
          overflow: '',
          transform: 'translate3d(0,' + this.offsetY + 'px,0)'
        });

        setTimeout(() => {
          this.$el.css({
            transform: 'translate3d(0,0,0)',
            transition: 'transform .2s'
          });
          this.$anchor.css({
            transform: 'translate3d(0,0,0)',
            transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
          });
        }, 20);
      }, 200);
    }
  }

  Materialize.FloatingActionButton = FloatingActionButton;

  if (Materialize.jQueryLoaded) {
    Materialize.initializeJqueryWrapper(FloatingActionButton, 'floatingActionButton', 'M_FloatingActionButton');
  }

  // $(document).ready(function() {

  //   // jQuery reverse
  //   $.fn.reverse = [].reverse;

  //   // Hover behaviour: make sure this doesn't work on .click-to-toggle FABs!
  //   document.addEventListener('mouseenter', function(e) {
  //     if ($(e.target).is('.fixed-action-btn:not(.click-to-toggle):not(.toolbar)')) {
  //       openFABMenu($(e.target));
  //     }
  //   }, true);

  //   document.addEventListener('mouseleave', function(e) {
  //     if ($(e.target).is('.fixed-action-btn:not(.click-to-toggle):not(.toolbar)')) {
  //       closeFABMenu($(e.target));
  //     }
  //   }, true);

  //   // Toggle-on-click behaviour.
  //   $(document).on('click', '.fixed-action-btn.click-to-toggle > a', function(e) {
  //     var $this = $(this);
  //     var $menu = $this.parent();
  //     if ($menu.hasClass('active')) {
  //       closeFABMenu($menu);
  //     } else {
  //       openFABMenu($menu);
  //     }
  //   });

  //   // Toolbar transition behaviour.
  //   $(document).on('click', '.fixed-action-btn.toolbar > a', function(e) {
  //     var $this = $(this);
  //     var $menu = $this.parent();
  //     FABtoToolbar($menu);
  //   });

  // });

  // jQuery.fn.extend({
  //   openFAB: function() {
  //     openFABMenu($(this));
  //   },
  //   closeFAB: function() {
  //     closeFABMenu($(this));
  //   },
  //   openToolbar: function() {
  //     FABtoToolbar($(this));
  //   },
  //   closeToolbar: function() {
  //     toolbarToFAB($(this));
  //   }
  // });


  // var openFABMenu = function (btn) {
  //   var $this = btn;
  //   if ($this.hasClass('active') === false) {

  //     // Get direction option
  //     var horizontal = $this.hasClass('horizontal');
  //     var offsetY = 0, offsetX = 0;

  //     if (horizontal === true) {
  //       offsetX = 40;
  //     } else {
  //       offsetY = 40;
  //     }

  //     $this.addClass('active');
  //     let floatingBtns = $this.find('ul .btn-floating');
  //     Vel.hook(floatingBtns, 'scaleX', 0.4);
  //     Vel.hook(floatingBtns, 'scaleY', 0.4);
  //     Vel.hook(floatingBtns, 'translateY', offsetY + 'px');
  //     Vel.hook(floatingBtns, 'translateX', offsetX + 'px');

  //     var time = 0;
  //     floatingBtns.reverse().each( function () {
  //       Vel(
  //         this,
  //         { opacity: "1", scaleX: 1, scaleY: 1, translateY: 0, translateX: 0},
  //         { duration: 80, delay: time }
  //       );
  //       time += 40;
  //     });
  //   }
  // };

  // var closeFABMenu = function (btn) {
  //   var $this = btn;
  //   // Get direction option
  //   var horizontal = $this.hasClass('horizontal');
  //   var offsetY, offsetX;

  //   if (horizontal === true) {
  //     offsetX = 40;
  //   } else {
  //     offsetY = 40;
  //   }

  //   $this.removeClass('active');
  //   let floatingBtns = $this.find('ul .btn-floating');
  //   Vel(floatingBtns, 'stop');
  //   Vel(
  //     floatingBtns,
  //     { opacity: "0", scaleX: .4, scaleY: .4, translateY: offsetY, translateX: offsetX},
  //     { duration: 80 }
  //   );
  // };


  // /**
  //  * Transform FAB into toolbar
  //  * @param  {Object}  object jQuery object
  //  */
  // var FABtoToolbar = function(btn) {
  //   if (btn.attr('data-open') === "true") {
  //     return;
  //   }

  //   var offsetX, offsetY, scaleFactor;
  //   var windowWidth = window.innerWidth;
  //   var windowHeight = window.innerHeight;
  //   var btnRect = btn[0].getBoundingClientRect();
  //   var anchor = btn.children('a').first();
  //   var menu = btn.children('ul').first();
  //   var backdrop = $('<div class="fab-backdrop"></div>');
  //   var fabColor = anchor.css('background-color');
  //   anchor.append(backdrop);

  //   offsetX = btnRect.left - (windowWidth / 2) + (btnRect.width / 2);
  //   offsetY = windowHeight - btnRect.bottom;
  //   scaleFactor = windowWidth / backdrop[0].clientWidth;
  //   btn.attr('data-origin-bottom', btnRect.bottom);
  //   btn.attr('data-origin-left', btnRect.left);
  //   btn.attr('data-origin-width', btnRect.width);

  //   // Set initial state
  //   btn.addClass('active');
  //   btn.attr('data-open', true);
  //   btn.css({
  //     'text-align': 'center',
  //     width: '100%',
  //     bottom: 0,
  //     left: 0,
  //     transform: 'translateX(' + offsetX + 'px)',
  //     transition: 'none'
  //   });
  //   anchor.css({
  //     transform: 'translateY(' + -offsetY + 'px)',
  //     transition: 'none'
  //   });
  //   backdrop.css({
  //     'background-color': fabColor
  //   });


  //   setTimeout(function() {
  //     btn.css({
  //       transform: '',
  //       transition: 'transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s'
  //     });
  //     anchor.css({
  //       overflow: 'visible',
  //       transform: '',
  //       transition: 'transform .2s'
  //     });

  //     setTimeout(function() {
  //       btn.css({
  //         overflow: 'hidden',
  //         'background-color': fabColor
  //       });
  //       backdrop.css({
  //         transform: 'scale(' + scaleFactor + ')',
  //         transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
  //       });
  //       menu.children('li').children('a').css({
  //         opacity: 1
  //       });

  //       // Scroll to close.
  //       $(window).on('scroll.fabToolbarClose', function() {
  //         toolbarToFAB(btn);
  //         $(window).off('scroll.fabToolbarClose');
  //         $(document).off('click.fabToolbarClose');
  //       });

  //       $(document).on('click.fabToolbarClose', function(e) {
  //         if (!$(e.target).closest(menu).length) {
  //           toolbarToFAB(btn);
  //           $(window).off('scroll.fabToolbarClose');
  //           $(document).off('click.fabToolbarClose');
  //         }
  //       });
  //     }, 100);
  //   }, 0);
  // };

  // /**
  //  * Transform toolbar back into FAB
  //  * @param  {Object}  object jQuery object
  //  */
  // var toolbarToFAB = function(btn) {
  //   if (btn.attr('data-open') !== "true") {
  //     return;
  //   }

  //   var offsetX, offsetY, scaleFactor;
  //   var windowWidth = window.innerWidth;
  //   var windowHeight = window.innerHeight;
  //   var btnWidth = btn.attr('data-origin-width');
  //   var btnBottom = btn.attr('data-origin-bottom');
  //   var btnLeft = btn.attr('data-origin-left');
  //   var anchor = btn.children('.btn-floating').first();
  //   var menu = btn.children('ul').first();
  //   var backdrop = btn.find('.fab-backdrop');
  //   var fabColor = anchor.css('background-color');

  //   offsetX = btnLeft - (windowWidth / 2) + (btnWidth / 2);
  //   offsetY = windowHeight - btnBottom;
  //   scaleFactor = windowWidth / backdrop.width();


  //   // Hide backdrop
  //   btn.removeClass('active');
  //   btn.attr('data-open', false);
  //   btn.css({
  //     'background-color': 'transparent',
  //     transition: 'none'
  //   });
  //   anchor.css({
  //     transition: 'none'
  //   });
  //   backdrop.css({
  //     transform: 'scale(0)',
  //     'background-color': fabColor
  //   });
  //   menu.children('li').children('a').css({
  //     opacity: ''
  //   });

  //   setTimeout(function() {
  //     backdrop.remove();

  //     // Set initial state.
  //     btn.css({
  //       'text-align': '',
  //       width: '',
  //       bottom: '',
  //       left: '',
  //       overflow: '',
  //       'background-color': '',
  //       transform: 'translate3d(' + -offsetX + 'px,0,0)'
  //     });
  //     anchor.css({
  //       overflow: '',
  //       transform: 'translate3d(0,' + offsetY + 'px,0)'
  //     });

  //     setTimeout(function() {
  //       btn.css({
  //         transform: 'translate3d(0,0,0)',
  //         transition: 'transform .2s'
  //       });
  //       anchor.css({
  //         transform: 'translate3d(0,0,0)',
  //         transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
  //       });
  //     }, 20);
  //   }, 200);
  // };


}( cash, Materialize.Vel ));
