// package metadata file for Meteor.js

Package.describe({
  name: 'materialize:materialize',  // http://atmospherejs.com/materialize/materialize
  summary: 'Materialize (official): A modern responsive front-end framework based on Material Design',
  version: '0.97.2',
  git: 'https://github.com/Dogfalo/materialize.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');

  api.use('jquery', 'client');
  api.imply('jquery', 'client');

  var assets = [
    'font/material-design-icons/Material-Design-Icons.eot',
    'font/material-design-icons/Material-Design-Icons.svg',
    'font/material-design-icons/Material-Design-Icons.ttf',
    'font/material-design-icons/Material-Design-Icons.woff',
    'font/material-design-icons/Material-Design-Icons.woff2',
    'font/roboto/Roboto-Bold.ttf',
    'font/roboto/Roboto-Bold.woff',
    'font/roboto/Roboto-Bold.woff2',
    'font/roboto/Roboto-Light.ttf',
    'font/roboto/Roboto-Light.woff',
    'font/roboto/Roboto-Light.woff2',
    'font/roboto/Roboto-Medium.ttf',
    'font/roboto/Roboto-Medium.woff',
    'font/roboto/Roboto-Medium.woff2',
    'font/roboto/Roboto-Regular.ttf',
    'font/roboto/Roboto-Regular.woff',
    'font/roboto/Roboto-Regular.woff2',
    'font/roboto/Roboto-Thin.ttf',
    'font/roboto/Roboto-Thin.woff',
    'font/roboto/Roboto-Thin.woff2',
  ];

  addAssets(api, assets);
  
  api.addFiles([
    'dist/js/materialize.js',
    'dist/css/materialize.css'
  ], 'client');

  api.export('Materialize', 'client');
});


function addAssets(api, assets){
  if(api.addAssets){
    api.addAssets(assets, 'client');
  } else {
    api.addFiles(assets, 'client', {isAsset: true});
  }
}
