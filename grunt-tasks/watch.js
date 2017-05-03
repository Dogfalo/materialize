'use strict';

module.exports = function (grunt) {
    return {
        jade: {
            files: ['jade/**/*'],
            tasks: ['jade_compile'],
            options: {
                interrupt: false,
                spawn: false,
            },
        },

        js: {
            files: ["js/jquery.easing.1.3.js",
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
            tasks: ['js_compile'],
            options: {
                interrupt: false,
                spawn: false,
            },
        },

        sass: {
            files: ['sass/**/*'],
            tasks: ['sass_compile'],
            options: {
                interrupt: false,
                spawn: false,
            },
        }
    }
};