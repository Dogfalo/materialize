// package metadata file for Meteor.js

Package.describe({
  name: 'materialize:materialize',  // http://atmospherejs.com/materialize/materialize
  summary: 'Materialize (official): A modern responsive front-end framework based on Material Design',
  version: '1.0.0-alpha.4',
  git: 'https://github.com/Dogfalo/materialize.git'
});


Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');

  api.use('fourseven:scss@4.5.4');

  api.addFiles([
    'dist/js/materialize.js'
  ], 'client');

  var scssFiles = [
    'sass/components/forms/_checkboxes.scss',
    'sass/components/forms/_file-input.scss',
    'sass/components/forms/_forms.scss',
    'sass/components/forms/_input-fields.scss',
    'sass/components/forms/_radio-buttons.scss',
    'sass/components/forms/_range.scss',
    'sass/components/forms/_select.scss',
    'sass/components/forms/_switches.scss',
    'sass/components/_badges.scss',
    'sass/components/_buttons.scss',
    'sass/components/_cards.scss',
    'sass/components/_carousel.scss',
    'sass/components/_chips.scss',
    'sass/components/_collapsible.scss',
    'sass/components/_color-classes.scss',
    'sass/components/_color-variables.scss',
    'sass/components/_datepicker.scss',
    'sass/components/_dropdown.scss',
    'sass/components/_global.scss',
    'sass/components/_grid.scss',
    'sass/components/_icons-material-design.scss',
    'sass/components/_materialbox.scss',
    'sass/components/_modal.scss',
    'sass/components/_navbar.scss',
    'sass/components/_normalize.scss',
    'sass/components/_preloader.scss',
    'sass/components/_pulse.scss',
    'sass/components/_sidenav.scss',
    'sass/components/_slider.scss',
    'sass/components/_table_of_contents.scss',
    'sass/components/_tabs.scss',
    'sass/components/_tapTarget.scss',
    'sass/components/_timepicker.scss',
    'sass/components/_toast.scss',
    'sass/components/_tooltip.scss',
    'sass/components/_transitions.scss',
    'sass/components/_typography.scss',
    'sass/components/_variables.scss',
    'sass/components/_waves.scss',
    'sass/materialize.scss'
  ];

  api.addFiles(scssFiles, 'client', { isImport: true });


  api.export('Materialize', 'client');
});
