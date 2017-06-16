'use strict';

module.exports = function (grunt) {
  var compress = {
    main: {
      options: {
        archive: 'bin/materialize.zip',
        level: 6
      },
      files: [
        { expand: true, cwd: 'dist/', src: ['**/*'], dest: 'materialize/' },
        { expand: true, cwd: './', src: ['LICENSE', 'README.md'], dest: 'materialize/' },
      ]
    },

    src: {
      options: {
        archive: 'bin/materialize-src.zip',
        level: 6
      },
      files: [
        { expand: true, cwd: 'fonts/', src: ['**/*'], dest: 'materialize-src/fonts/' },
        { expand: true, cwd: 'sass/', src: ['materialize.scss'], dest: 'materialize-src/sass/' },
        { expand: true, cwd: 'sass/', src: ['components/**/*'], dest: 'materialize-src/sass/' },
        {
          expand: true, cwd: 'js/', src: [
            "initial.js",
            "jquery.easing.1.4.js",
            "animation.js",
            "velocity.min.js",
            "hammer.min.js",
            "jquery.hammer.js",
            "global.js",
            "collapsible.js",
            "dropdown.js",
            "modal.js",
            "materialbox.js",
            "parallax.js",
            "tabs.js",
            "tooltip.js",
            "waves.js",
            "toasts.js",
            "sideNav.js",
            "scrollspy.js",
            "forms.js",
            "slider.js",
            "cards.js",
            "chips.js",
            "pushpin.js",
            "buttons.js",
            "transitions.js",
            "scrollFire.js",
            "date_picker/picker.js",
            "date_picker/picker.date.js",
            "date_picker/picker.time.js",
            "character_counter.js",
            "carousel.js",
            "tapTarget.js",
          ], dest: 'materialize-src/js/'
        },
        { expand: true, cwd: 'dist/js/', src: ['**/*'], dest: 'materialize-src/js/bin/' },
        { expand: true, cwd: './', src: ['LICENSE', 'README.md'], dest: 'materialize-src/' }

      ]
    },

    starter_template: {
      options: {
        archive: 'templates/starter-template.zip',
        level: 6
      },
      files: [
        { expand: true, cwd: 'dist/', src: ['**/*'], dest: 'starter-template/' },
        { expand: true, cwd: 'templates/starter-template/', src: ['index.html', 'LICENSE'], dest: 'starter-template/' },
        { expand: true, cwd: 'templates/starter-template/css', src: ['style.css'], dest: 'starter-template/css' },
        { expand: true, cwd: 'templates/starter-template/js', src: ['init.js'], dest: 'starter-template/js' }

      ]
    },

    parallax_template: {
      options: {
        archive: 'templates/parallax-template.zip',
        level: 6
      },
      files: [
        { expand: true, cwd: 'dist/', src: ['**/*'], dest: 'parallax-template/' },
        { expand: true, cwd: 'templates/parallax-template/', src: ['index.html', 'LICENSE', 'background1.jpg', 'background2.jpg', 'background3.jpg'], dest: 'parallax-template/' },
        { expand: true, cwd: 'templates/parallax-template/css', src: ['style.css'], dest: 'parallax-template/css' },
        { expand: true, cwd: 'templates/parallax-template/js', src: ['init.js'], dest: 'parallax-template/js' }

      ]
    }

  };
  return compress;
};