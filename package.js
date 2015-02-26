// package metadata file for Meteor.js

Package.describe({
  name: 'materialize:materialize',  // http://atmospherejs.com/materialize/materialize
  summary: 'Materialize (official): A modern responsive front-end framework based on Material Design',
  version: '0.95.3',
  git: 'https://github.com/Dogfalo/materialize.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');

  api.use('jquery', 'client');

  api.addFiles([
    'font/material-design-icons/Material-Design-Icons.eot',
    'font/material-design-icons/Material-Design-Icons.svg',
    'font/material-design-icons/Material-Design-Icons.ttf',
    'font/material-design-icons/Material-Design-Icons.woff',
    'font/roboto/Roboto-Bold.ttf',
    'font/roboto/Roboto-Light.ttf',
    'font/roboto/Roboto-Medium.ttf',
    'font/roboto/Roboto-Regular.ttf',
    'font/roboto/Roboto-Thin.ttf',
    'bin/materialize.css',
    'bin/materialize.js',
  ], 'client');
});
