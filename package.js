// package metadata file for Meteor.js

Package.describe({
  name: 'materialize:materialize',  // http://atmospherejs.com/materialize/materialize
  summary: 'Materialize (official): A modern responsive front-end framework based on Material Design',
  version: '0.97.5',
  git: 'https://github.com/Dogfalo/materialize.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');

  api.use('jquery', 'client');
  api.imply('jquery', 'client');

  var assets = [
    'dist/font/material-design-icons/Material-Design-Icons.eot',
    'dist/font/material-design-icons/Material-Design-Icons.svg',
    'dist/font/material-design-icons/Material-Design-Icons.ttf',
    'dist/font/material-design-icons/Material-Design-Icons.woff',
    'dist/font/material-design-icons/Material-Design-Icons.woff2',
    'dist/font/roboto/Roboto-Bold.ttf',
    'dist/font/roboto/Roboto-Bold.woff',
    'dist/font/roboto/Roboto-Bold.woff2',
    'dist/font/roboto/Roboto-Light.ttf',
    'dist/font/roboto/Roboto-Light.woff',
    'dist/font/roboto/Roboto-Light.woff2',
    'dist/font/roboto/Roboto-Medium.ttf',
    'dist/font/roboto/Roboto-Medium.woff',
    'dist/font/roboto/Roboto-Medium.woff2',
    'dist/font/roboto/Roboto-Regular.ttf',
    'dist/font/roboto/Roboto-Regular.woff',
    'dist/font/roboto/Roboto-Regular.woff2',
    'dist/font/roboto/Roboto-Thin.ttf',
    'dist/font/roboto/Roboto-Thin.woff',
    'dist/font/roboto/Roboto-Thin.woff2',
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
