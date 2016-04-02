// package metadata file for Meteor.js

Package.describe({
  name: 'materialize:materialize',  // http://atmospherejs.com/materialize/materialize
  summary: 'Materialize (official): A modern responsive front-end framework based on Material Design',
  version: '0.97.6',
  git: 'https://github.com/Dogfalo/materialize.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');

  api.use('jquery', 'client');
  api.imply('jquery', 'client');

  var assets = [
    'dist/fonts/roboto/Roboto-Bold.ttf',
    'dist/fonts/roboto/Roboto-Bold.woff',
    'dist/fonts/roboto/Roboto-Bold.woff2',
    'dist/fonts/roboto/Roboto-Light.ttf',
    'dist/fonts/roboto/Roboto-Light.woff',
    'dist/fonts/roboto/Roboto-Light.woff2',
    'dist/fonts/roboto/Roboto-Medium.ttf',
    'dist/fonts/roboto/Roboto-Medium.woff',
    'dist/fonts/roboto/Roboto-Medium.woff2',
    'dist/fonts/roboto/Roboto-Regular.ttf',
    'dist/fonts/roboto/Roboto-Regular.woff',
    'dist/fonts/roboto/Roboto-Regular.woff2',
    'dist/fonts/roboto/Roboto-Thin.ttf',
    'dist/fonts/roboto/Roboto-Thin.woff',
    'dist/fonts/roboto/Roboto-Thin.woff2',
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
