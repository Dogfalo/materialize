(function ($, Vel) {
  'use strict';

  let _defaults = {
    duration: 300,
    onShow: null,
    swipeable: false,
    responsiveThreshold: Infinity, // breakpoint for swipeable
  };

  /**
   * @class
   *
   */
  class Tabs {
    /**
     * Construct Tabs instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      // If exists, destroy and reinitialize
      if (!!el.M_Tabs) {
        el.M_Tabs.destroy();
      }

      /**
       * The jQuery element
       * @type {jQuery}
       */
      this.$el = $(el);

      this.el = el;

      /**
       * Options for the carousel
       * @member Tabs#options
       * @prop {Number} duration
       * @prop {Function} onShow
       * @prop {Boolean} swipeable
       * @prop {Number} responsiveThreshold
       */
      this.options = $.extend({}, Tabs.defaults, options);

      this.el.M_Tabs = this;

      // Setup
      this.$tabLinks = this.$el.children('li.tab').children('a');
      this.index = 0;
      this._setTabsAndTabWidth();
      this._setupActiveTabLink();
      this._createIndicator();

      if (this.options.swipeable) {
        this._setupSwipeableTabs();

      } else {
        this._setupNormalTabs();
      }


      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Tabs(this, options));
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
      this._indicator.parentNode.removeChild(this._indicator);

      if (this.options.swipeable) {
        this._teardownSwipeableTabs();
      } else {
        this._teardownNormalTabs();
      }

      this.$el[0].M_Tabs = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleWindowResizeBound = this._handleWindowResize.bind(this);
      window.addEventListener('resize', this._handleWindowResizeBound);

      this._handleTabClickBound = this._handleTabClick.bind(this);
      this.el.addEventListener('click', this._handleTabClickBound);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      window.removeEventListener('resize', this._handleWindowResizeBound);
      this.el.removeEventListener('click', this._handleTabClickBound);
    }

    /**
     * Handle window Resize
     */
    _handleWindowResize() {
      this._setTabsAndTabWidth();

      if (this.tabWidth !== 0 && this.tabsWidth !== 0) {
        this._indicator.style.left = this._calcLeftPos(this.$activeTabLink) + 'px';
        this._indicator.style.right = this._calcRightPos(this.$activeTabLink) + 'px';
      }
    }

    /**
     * Handle tab click
     * @param {Event} e
     */
    _handleTabClick(e) {
      let tab = $(e.target).closest('li.tab');
      let tabLink = $(e.target).closest('a');

      // Handle click on tab link only
      if (!tabLink.length || !tabLink.parent().hasClass('tab')) {
        return;
      }

      if (tab.hasClass('disabled')) {
        e.preventDefault();
        return;
      }

      // Act as regular link if target attribute is specified.
      if (!!tabLink.attr("target")) {
        return;
      }

      this._setTabsAndTabWidth();

      // Make the old tab inactive.
      this.$activeTabLink.removeClass('active');
      let $oldContent = this.$content;

      // Update the variables with the new link and content
      this.$activeTabLink = tabLink;
      this.$content = $(Materialize.escapeHash(tabLink[0].hash));
      this.$tabLinks = this.$el.children('li.tab').children('a');

      // Make the tab active.
      this.$activeTabLink.addClass('active');
      let prevIndex = this.index;
      this.index = Math.max(this.$tabLinks.index(tabLink), 0);

      // Swap content
      if (this.options.swipeable) {
        if (this._tabsCarousel) {
          this._tabsCarousel.set(this.index, () => {
            if (typeof(this.options.onShow) === "function") {
              this.options.onShow.call(this, this.$content);
            }
          });
        }
      } else {
        if (this.$content !== undefined) {
          this.$content[0].style.display = 'block';
          this.$content.addClass('active');
          if (typeof(this.options.onShow) === 'function') {
            this.options.onShow.call(this, this.$content);
          }

          if ($oldContent !== undefined &&
              !$oldContent.is(this.$content)) {
            $oldContent[0].style.display = 'none';
            $oldContent.removeClass('active');
          }
        }
      }

      // Update indicator
      this._animateIndicator(prevIndex);

      // Prevent the anchor's default click action
      e.preventDefault();
    }


    /**
     * Generate elements for tab indicator.
     */
    _createIndicator() {
      let indicator = document.createElement('li');
      indicator.classList.add('indicator');

      this.el.appendChild(indicator);
      this._indicator = indicator;

      setTimeout(() => {
        this._indicator.style.left = this._calcLeftPos(this.$activeTabLink) + 'px';
        this._indicator.style.right = this._calcRightPos(this.$activeTabLink) + 'px';
      }, 0);
    }

    /**
     * Setup first active tab link.
     */
    _setupActiveTabLink() {
      // If the location.hash matches one of the links, use that as the active tab.
      this.$activeTabLink = $(this.$tabLinks.filter('[href="'+location.hash+'"]'));

      // If no match is found, use the first link or any with class 'active' as the initial active tab.
      if (this.$activeTabLink.length === 0) {
        this.$activeTabLink = this.$el.children('li.tab').children('a.active').first();
      }
      if (this.$activeTabLink.length === 0) {
        this.$activeTabLink = this.$el.children('li.tab').children('a').first();
      }

      this.$tabLinks.removeClass('active');
      this.$activeTabLink[0].classList.add('active');

      this.index = Math.max(this.$tabLinks.index(this.$activeTabLink), 0);

      if (this.$activeTabLink.length) {
        this.$content = $(Materialize.escapeHash(this.$activeTabLink[0].hash));
        this.$content.addClass('active');
      }
    }

    /**
     * Setup swipeable tabs
     */
    _setupSwipeableTabs() {
      // Change swipeable according to responsive threshold
      if (window.innerWidth > options.responsiveThreshold) {
        this.options.swipeable = false;
      }

      let $tabsContent = $();
      this.$tabLinks.each((link) => {
        let $currContent = $(Materialize.escapeHash(link.hash));
        $currContent.addClass('carousel-item');
        $tabsContent = $tabsContent.add($currContent);
      });

      let $tabsWrapper = $('<div class="tabs-content carousel carousel-slider"></div>');
      $tabsContent.first().before($tabsWrapper);
      $tabsWrapper.append($tabsContent);
      $tabsContent[0].style.display = '';

      this._tabsCarousel = new Materialize.Carousel($tabsWrapper[0], {
        fullWidth: true,
        noWrap: true,
        onCycleTo: (item) => {
          let prevIndex = this.index;
          this.index = $(item).index();
          this.$activeTabLink.removeClass('active');
          this.$activeTabLink = this.$tabLinks.eq(this.index);
          this.$activeTabLink.addClass('active');
          this._animateIndicator(prevIndex);
          if (typeof(this.options.onShow) === "function") {
            this.options.onShow.call(this, this.$content);
          }
        },
      });
    }

    /**
     * Teardown normal tabs.
     */
    _teardownSwipeableTabs() {
      let $tabsWrapper = this._tabsCarousel.$el;
      this._tabsCarousel.destroy();

      // Unwrap
      $tabsWrapper.after($tabsWrapper.children());
      $tabsWrapper.remove();
    }

    /**
     * Setup normal tabs.
     */
    _setupNormalTabs() {
      // Hide Tabs Content
      this.$tabLinks.not(this.$activeTabLink).each((link) => {
        if (!!link.hash) {
          let $currContent = $(Materialize.escapeHash(link.hash));
          if ($currContent.length) {
            $currContent[0].style.display = 'none';
          }
        }
      });
    }

    /**
     * Teardown normal tabs.
     */
    _teardownNormalTabs() {
      // show Tabs Content
      this.$tabLinks.each((link) => {
        if (!!link.hash) {
          let $currContent = $(Materialize.escapeHash(link.hash));
          if ($currContent.length) {
            $currContent[0].style.display = '';
          }
        }
      });
    }

    /**
     * set tabs and tab width
     */
    _setTabsAndTabWidth() {
      this.tabsWidth = this.$el.width();
      this.tabWidth = Math.max(this.tabsWidth, this.el.scrollWidth) / this.$tabLinks.length;
    }

    /**
     * Finds right attribute for indicator based on active tab.
     * @param {jQuery} el
     */
    _calcRightPos(el) {
      return Math.ceil(this.tabsWidth - el.position().left - el[0].getBoundingClientRect().width);
    }

    /**
     * Finds left attribute for indicator based on active tab.
     * @param {jQuery} el
     */
    _calcLeftPos(el) {
      return Math.floor(el.position().left);
    }

    /**
     * Animates Indicator to active tab.
     * @param {Number} prevIndex
     */
    _animateIndicator(prevIndex) {
      let velOptions = {
        duration: this.options.duration,
        queue: false,
        easing: 'easeOutQuad'
      };
      let velOptionsLeft, velOptionsRight;

      if ((this.index - prevIndex) >= 0) {
        velOptionsLeft = $.extend({}, velOptions, {delay: 90});
        velOptionsRight = velOptions;

      } else {
        velOptionsLeft = velOptions;
        velOptionsRight = $.extend({}, velOptions, {delay: 90});
      }

      // Animate with velocity
      Vel(
        this._indicator,
        {left: this._calcLeftPos(this.$activeTabLink) },
        velOptionsLeft
      );
      Vel(
        this._indicator,
        {right: this._calcRightPos(this.$activeTabLink) },
        velOptionsRight
      );
    }

    /**
     * Select tab.
     * @param {String} tabId
     */
    select(tabId) {
      let tab = this.$tabLinks.filter('[href="#' + tabId + '"]');
      if (tab.length) {
        tab.trigger('click');
      }
    }
  }


  window.Materialize.Tabs = Tabs;

  jQuery.fn.tabs = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Tabs.prototype[methodOrOptions]) {
      let params = Array.prototype.slice.call( arguments, 1 );

      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        let instance = this.first()[0].M_Tabs;
        return instance[methodOrOptions].apply(instance, params);

        // Void methods
      } else {
        return this.each(function() {
          let instance = this.M_Tabs;
          instance[methodOrOptions].apply(instance, params);
        });
      }

      // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || !methodOrOptions ) {
      Tabs.init(this, arguments[0]);
      return this;

      // Return error if an unrecognized  method name is passed in
    } else {
      jQuery.error(`Method ${methodOrOptions} does not exist on jQuery.tabs`);
    }
  };

})(cash, Materialize.Vel);
