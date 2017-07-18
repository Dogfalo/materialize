(function() {
  'use strict';
  // Materialize.toast = function (message, displayLength, className, completeCallback) {

  class Toast {
    constructor(message, displayLength, className, completeCallback) {
      if (!message) {
        return;
      }

      this.message = message;
      this.options = {
        displayLength: displayLength,
        inDuration: 300,
        outDuration: 375,
        className: className,
        completeCallback: completeCallback,
        activationPercent: 0.8
      };

      if (Toast._count === 0) {
        Toast.createContainer();
      }

      Toast._count++;
      let toastElement = this.createToast();
      toastElement.M_Toast = this;
      this.el = toastElement;

    }

    static createContainer() {
      let container = document.createElement('div');
      container.setAttribute('id', 'toast-container');

      // Add event handler
      container.addEventListener('touchstart', Toast._onDragStart);
      container.addEventListener('touchmove', Toast._onDragMove);
      container.addEventListener('touchend', Toast._onDragEnd);

      document.body.appendChild(container);
      Toast._container = container;
    }

    static _onDragStart(e) {
      if (e.target && e.target.classList.contains('toast')) {
        let toast = e.target.M_Toast;
        e.target.style.transition = null;
        toast.startingXPos = Toast._xPos(e);
        toast.time = Date.now();
        toast.xPos = Toast._xPos(e);
      }
    }

    static _onDragMove(e) {
      if (e.target && e.target.classList.contains('toast')) {
        let toast = e.target.M_Toast;
        toast.deltaX = Math.abs(toast.xPos - Toast._xPos(e));
        toast.xPos = Toast._xPos(e);
        toast.velocityX = toast.deltaX / (Date.now() - toast.time);
        toast.time = Date.now();

        let totalDeltaX = toast.xPos - toast.startingXPos;
        let activationDistance =
            e.target.offsetWidth * toast.options.activationPercent;
        e.target.style.transform = `translateX(${totalDeltaX}px)`;
        e.target.style.opacity = 1-Math.abs(totalDeltaX / activationDistance);
      }
    }

    static _onDragEnd(e) {
      if (e.target && e.target.classList.contains('toast')) {
        let toast = e.target.M_Toast;
        let totalDeltaX = toast.xPos - toast.startingXPos;
        let activationDistance =
            e.target.offsetWidth * toast.options.activationPercent;
        let shouldBeDismissed = Math.abs(totalDeltaX) > activationDistance ||
            toast.velocityX > 1;
        if (shouldBeDismissed) {
          toast.remove();

        } else {
          e.target.style.transition = 'transform .2s, opacity .2s';
          e.target.style.transform = null;
          e.target.style.opacity = null;
        }
      }
    }

    static _xPos(e) {
      if (e.targetTouches && (e.targetTouches.length >= 1)) {
        return e.targetTouches[0].clientX;
      }
      // mouse event
      return e.clientX;
    }

    createToast() {
      let toast = document.createElement('div');
      toast.classList.add('toast');


      // Add custom classes onto toast
      if (this.options.className) {
        var classes = className.split(' ');
        for (var i = 0, count = classes.length; i < count; i++) {
          toast.classList.add(classes[i]);
        }
      }

      // Set content
      if ( typeof HTMLElement === "object" ?
           this.message instanceof HTMLElement :
           this.message && typeof this.message === "object" &&
           this.message !== null && this.message.nodeType === 1 &&
           typeof this.message.nodeName==="string"
         ) {
        toast.appendChild(this.message);

      // Check if it is jQuery object
      } else if (this.message instanceof jQuery) {
        toast.appendChild(this.message[0]);

        // Insert as text;
      } else {
        toast.innerHTML = this.message;
      }

      // Append toast
      Toast._container.appendChild(toast);

      return toast;
    }

    remove() {
      let activationDistance =
          this.el.offsetWidth * this.options.activationPercent;

      this.el.style.transition = 'transform .05s, opacity .05s';
      this.el.style.transform = `translateX(${activationDistance}px)`;
      this.el.style.opacity = 0;
      this.el.parentNode.removeChild(this.el);

      Toast._count--;
      if (Toast._count === 0) {
        Toast._container.parentNode.removeChild(Toast._container);
      }
    }
  }

  /**
   * @static
   * @memberof Toast
   */
  Toast._count = 0;


  /**
   * @static
   * @memberof Toast
   */
  Toast._container = undefined;

  window.Materialize.Toast = Toast;
  window.Materialize.toast = function(message, displayLength, className, completeCallback) {
    return new Toast(message, displayLength, className, completeCallback);
  }
// };
})();
