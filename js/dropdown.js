(function($, Vel) {
  'use strict';

  let _defaults = {
    alignment: 'left',
    constrainWidth: true,
    coverTrigger: true,
    closeOnClick: true,
    hover: false,
    inDuration: 150,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null
  };


  /**
   * @class
   */
  class Dropdown {
    constructor(el, options) {

      // If exists, destroy and reinitialize
      if (!!el.M_Dropdown) {
        el.M_Dropdown.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Dropdown = this;
      Dropdown._dropdowns.push(this);

      this.id = Materialize.getIdFromTrigger(el);
      this.dropdownEl = document.getElementById(this.id);
      this.$dropdownEl = $(this.dropdownEl);


      /**
       * Options for the dropdown
       * @member Dropdown#options
       * @prop {Function} onOpenStart - Function called when sidenav starts entering
       * @prop {Function} onOpenEnd - Function called when sidenav finishes entering
       * @prop {Function} onCloseStart - Function called when sidenav starts exiting
       * @prop {Function} onCloseEnd - Function called when sidenav finishes exiting
       */
      this.options = $.extend({}, Dropdown.defaults, options);

      /**
       * Describes open/close state of dropdown
       * @type {Boolean}
       */
      this.isOpen = false;

      // Move dropdown-content after dropdown-trigger
      this.$el.after(this.dropdownEl);

      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Dropdown(this, options));
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
      this._resetDropdownStyles();
      this._removeEventHandlers();
      Dropdown._dropdowns.splice(Dropdown._dropdowns.indexOf(this), 1);
      this.el.M_Dropdown = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleDocumentClickBound = this._handleDocumentClick.bind(this);

      // Hover event handlers
      if (this.options.hover) {
        this._handleMouseEnterBound = this._handleMouseEnter.bind(this);
        this.el.addEventListener('mouseenter', this._handleMouseEnterBound);
        this._handleMouseLeaveBound = this._handleMouseLeave.bind(this);
        this.el.addEventListener('mouseleave', this._handleMouseLeaveBound);
        this.dropdownEl.addEventListener('mouseleave', this._handleMouseLeaveBound);

      // Click event handlers
      } else {
        this._handleClickBound = this._handleClick.bind(this);
        this.el.addEventListener('click', this._handleClickBound);
      }
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      if (this.options.hover) {
        this.el.removeEventHandlers('mouseenter', this._handleMouseEnterBound);
        this.el.removeEventHandlers('mouseleave', this._handleMouseLeaveBound);
        this.dropdownEl.removeEventHandlers('mouseleave', this._handleMouseLeaveBound);
      } else {
        this.el.removeEventListener('click', this._handleClickBound);
      }
    }

    _handleClick(e) {
      e.preventDefault();
      this.open();
    }

    _handleMouseEnter(e) {
      this.open();
    }

    _handleMouseLeave(e) {
      let toEl = e.toElement || e.relatedTarget;
      let leaveToDropdownContent = !!$(toEl).closest('.dropdown-content').length;
      let leaveToActiveDropdownTrigger = false;

      let $closestTrigger = $(toEl).closest('.dropdown-trigger');
      if ($closestTrigger.length && !!$closestTrigger[0].M_Dropdown &&
          $closestTrigger[0].M_Dropdown.isOpen) {
        leaveToActiveDropdownTrigger = true;
      }

      // Close hover dropdown if mouse did not leave to either active dropdown-trigger or dropdown-content
      if (!leaveToActiveDropdownTrigger && !leaveToDropdownContent) {
        this.close();
      }
    }

    _handleDocumentClick(e) {
      let $target = $(e.target);
      if (this.options.closeOnClick && $target.closest('.dropdown-content').length) {
        setTimeout(() => {
          this.close();
        }, 0);
      } else if ($target.closest('.dropdown-trigger').length) {
        setTimeout(() => {
          this.close();
        }, 0);
      } else if (!$target.closest('.dropdown-content').length) {
        setTimeout(() => {
          this.close();
        }, 0);
      }
    }

    _resetDropdownStyles() {
      this.$dropdownEl.css({
        display: '',
        width: '',
        height: '',
        left: '',
        top: '',
        'transform-origin': '',
        transform: '',
        opacity: ''
      });
    }

    _getDropdownPosition() {
      let offsetParentBRect = this.el.offsetParent.getBoundingClientRect();
      let triggerOffset = {left: this.el.offsetLeft, top: this.el.offsetTop, width: this.el.offsetWidth, height: this.el.offsetHeight};
      let dropdownOffset = {left: this.dropdownEl.offsetLeft, top: this.dropdownEl.offsetTop, width: this.dropdownEl.offsetWidth, height: this.dropdownEl.offsetHeight};
      let triggerBRect = this.el.getBoundingClientRect();
      let dropdownBRect = this.dropdownEl.getBoundingClientRect();

      let idealHeight = dropdownBRect.height;
      let idealWidth = dropdownBRect.width;
      let idealXPos =  triggerOffset.left;
      let idealYPos = triggerOffset.top;

      let dropdownBounds = {
        left: idealXPos,
        top: idealYPos,
        height: idealHeight,
        width: idealWidth
      };


      // Countainer here will be closest ancestor with overflow: hidden
      let closestOverflowParent = this.dropdownEl.offsetParent;
      let alignments = Materialize.checkWithinContainer(this.el, closestOverflowParent, dropdownBounds, this.options.coverTrigger ? 0 : triggerBRect.height);

      let verticalAlignment = 'top';
      let horizontalAlignment = this.options.alignment;
      idealYPos += (this.options.coverTrigger ? 0 : triggerBRect.height);
      if (!alignments.top) {
        if (alignments.bottom) {
          verticalAlignment = 'bottom';
        } else {
          // Determine which side has most space and cutoff at correct height
          if (alignments.spaceOnTop > alignments.spaceOnBottom) {
            verticalAlignment = 'bottom';
            idealHeight += alignments.spaceOnTop;
            idealYPos -= alignments.spaceOnTop;
          } else {
            idealHeight += alignments.spaceOnBottom;
          }
        }
      }

      // If preferred horizontal alignment is possible
      if (!alignments[horizontalAlignment]) {
        let oppositeAlignment = horizontalAlignment === 'left' ? 'right' : 'left';
        if (alignments[oppositeAlignment]) {
          horizontalAlignment = oppositeAlignment;
        } else {
          // Determine which side has most space and cutoff at correct height
          if (alignments.spaceOnLeft > alignments.spaceOnRight) {
            horizontalAlignment = 'right';
            idealWidth += alignments.spaceOnLeft;
            idealXPos -= alignments.spaceOnLeft;
          } else {
            horizontalAlignment = 'left';
            idealWidth += alignments.spaceOnRight;
          }
        }
      }

      if (verticalAlignment === 'bottom') {
        idealYPos = idealYPos - dropdownBRect.height +
          (this.options.coverTrigger ? triggerBRect.height : 0);
      }
      if (horizontalAlignment === 'right') {
        idealXPos = idealXPos - dropdownBRect.width + triggerBRect.width;
      }
      return {x: idealXPos,
              y: idealYPos,
              verticalAlignment: verticalAlignment,
              horizontalAlignment: horizontalAlignment,
              height: idealHeight,
              width: idealWidth};
    }


    /**
     * Animate in dropdown
     */
    _animateIn(positionInfo) {
      // Place dropdown
      this.dropdownEl.style.left = positionInfo.x + 'px';
      this.dropdownEl.style.top = positionInfo.y + 'px';
      this.dropdownEl.style.height = positionInfo.height + 'px';
      this.dropdownEl.style.width = positionInfo.width + 'px';
      this.dropdownEl.style.transformOrigin =
        `${positionInfo.horizontalAlignment === 'left' ? '0' : '100%'} ${positionInfo.verticalAlignment === 'top' ? '0' : '100%'}`;

      Vel(this.dropdownEl,
          {
            opacity: [1, 'easeOutQuad'],
            scaleX: [1, .3],
            scaleY: [1, .3]},
          {
            duration: this.options.inDuration,
            queue: false,
            easing: 'easeOutQuint',
            complete: () => {
              // onOpenEnd callback
              if (typeof(this.options.onOpenEnd) === 'function') {
                this.options.onOpenEnd.call(this, this.el);
              }
            }
          });
    }

    /**
     * Animate out dropdown
     */
    _animateOut() {
      Vel(this.dropdownEl,
          {
            opacity: [0, 'easeOutQuint'],
            scaleX: [.3, 1],
            scaleY: [.3, 1]},
          {
            duration: this.options.outDuration,
            queue: false,
            easing: 'easeOutQuint',
            complete: () => {
              this._resetDropdownStyles();

              // onCloseEnd callback
              if (typeof(this.options.onCloseEnd) === 'function') {
                this.options.onCloseEnd.call(this, this.el);
              }
            }
          });
    }


    /**
     * Open Dropdown
     */
    open() {
      if (this.isOpen) {
        return;
      }
      this.isOpen = true;

      // onOpenStart callback
      if (typeof(this.options.onOpenStart) === 'function') {
        this.options.onOpenStart.call(this, this.el);
      }

      // Stop any previous animation
      Vel(this.dropdownEl, 'stop');
      this._resetDropdownStyles();
      Vel.hook(this.dropdownEl, 'display', 'block');

      // Set width before calculating positionInfo
      let idealWidth = this.options.constrainWidth ?
          this.el.getBoundingClientRect().width : this.dropdownEl.getBoundingClientRect().width;
      this.dropdownEl.style.width = idealWidth + 'px';

      let positionInfo = this._getDropdownPosition();
      this._animateIn(positionInfo);

      // Use capture phase event handler to prevent click
      document.body.addEventListener('click', this._handleDocumentClickBound, true);
    }

    /**
     * Close Dropdown
     */
    close() {
      if (!this.isOpen) {
        return;
      }
      this.isOpen = false;

      // onCloseStart callback
      if (typeof(this.options.onCloseStart) === 'function') {
        this.options.onCloseStart.call(this, this.el);
      }

      this._animateOut();
      document.body.removeEventListener('click', this._handleDocumentClickBound, true);
    }
  }

  /**
   * @static
   * @memberof Dropdown
   */
  Dropdown._dropdowns = [];

  window.Materialize.Dropdown = Dropdown;

  jQuery.fn.dropdown = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Dropdown.prototype[methodOrOptions]) {
      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        return this.first()[0].M_Dropdown[methodOrOptions]();

      // Void methods
      } else {
        return this.each(function() {
          this.M_Dropdown[methodOrOptions]();
        });
      }

    // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      Dropdown.init(this, arguments[0]);
      return this;

    // Return error if an unrecognized  method name is passed in
    } else {
      jQuery.error(`Method ${methodOrOptions} does not exist on jQuery.dropdown`);
    }
  };

})(cash, Materialize.Vel);
