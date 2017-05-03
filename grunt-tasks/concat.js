'use strict';

module.exports = function (grunt) {
    return {
      options: {
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ["js/jquery.easing.1.3.js",
              "js/animation.js",
              "js/velocity.min.js",
              "js/hammer.min.js",
              "js/jquery.hammer.js",
              "js/collapsible.js",
              "js/dropdown.js",
              "js/leanModal.js",
              "js/materialbox.js",
              "js/parallax.js",
              "js/tabs.js",
              "js/tooltip.js",
              "js/waves.js",
              "js/toasts.js",
              "js/sideNav.js",
              "js/scrollspy.js",
              "js/forms.js",
              "js/slider.js",
              "js/cards.js",
              "js/pushpin.js",
              "js/buttons.js",
              "js/transitions.js",
              "js/scrollFire.js",
              "js/date_picker/picker.js",
              "js/date_picker/picker.date.js",
             ],
        // the location of the resulting JS file
        dest: 'dist/js/materialize.js'
      },
      temp: {
        // the files to concatenate
        src: ["js/jquery.easing.1.3.js",
              "js/animation.js",
              "js/velocity.min.js",
              "js/hammer.min.js",
              "js/jquery.hammer.js",
              "js/collapsible.js",
              "js/dropdown.js",
              "js/leanModal.js",
              "js/materialbox.js",
              "js/parallax.js",
              "js/tabs.js",
              "js/tooltip.js",
              "js/waves.js",
              "js/toasts.js",
              "js/sideNav.js",
              "js/scrollspy.js",
              "js/forms.js",
              "js/slider.js",
              "js/cards.js",
              "js/pushpin.js",
              "js/buttons.js",
              "js/transitions.js",
              "js/scrollFire.js",
              "js/date_picker/picker.js",
              "js/date_picker/picker.date.js",
             ],
        // the location of the resulting JS file
        dest: 'temp/js/materialize.js'
      },
    }
};