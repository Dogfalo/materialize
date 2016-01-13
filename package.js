// package metadata file for Meteor.js

Package.describe({
  name: 'remownz:materialize-scss',  // http://atmospherejs.com/materialize/materialize
  summary: 'Materialize (official): A modern responsive front-end framework based on Material Design',
  version: '0.97.5',
  git: 'https://github.com/Dogfalo/materialize.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0');

  api.use('fourseven:scss@3.3.3');
  api.use('jquery', 'client');
  api.imply('jquery', 'client');

  var assets = [
    'dist/font/material-design-icons/Material-Design-Icons.eot',
    'dist/font/material-design-icons/Material-Design-Icons.svg',
    'dist/font/material-design-icons/Material-Design-Icons.ttf',
    'dist/font/material-design-icons/Material-Design-Icons.woff',
    'dist/font/material-design-icons/Material-Design-Icons.woff2',
    'material-design-icons/iconfont/MaterialIcons-Regular.eot',
    'material-design-icons/iconfont/MaterialIcons-Regular.ttf',
    'material-design-icons/iconfont/MaterialIcons-Regular.woff',
    'material-design-icons/iconfont/MaterialIcons-Regular.woff2',
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

  var scssFiles = [
    'sass/components/date_picker/_default.date.scss',
    'sass/components/date_picker/_default.scss',
    'sass/components/date_picker/_default.time.scss',
    'sass/components/_buttons.scss',
    'sass/components/_cards.scss',
    'sass/components/_chips.scss',
    'sass/components/_collapsible.scss',
    'sass/components/_color.scss',
    'sass/components/_dropdown.scss',
    'sass/components/_form.scss',
    'sass/components/_global.scss',
    'sass/components/_grid.scss',
    'sass/components/_icons-material-design.scss',
    'sass/components/_materialbox.scss',
    'sass/components/_material-icons.scss',
    'sass/components/_mixins.scss',
    'sass/components/_modal.scss',
    'sass/components/_navbar.scss',
    'sass/components/_normalize.scss',
    'sass/components/_prefixer.scss',
    'sass/components/_preloader.scss',
    'sass/components/_roboto.scss',
    'sass/components/_sideNav.scss',
    'sass/components/_slider.scss',
    'sass/components/_table_of_contents.scss',
    'sass/components/_tabs.scss',
    'sass/components/_toast.scss',
    'sass/components/_tooltip.scss',
    'sass/components/_typography.scss',
    'sass/components/_variables.scss',
    'sass/components/_waves.scss',
    'sass/materialize.scss',
  ];

  api.addFiles(scssFiles, 'client');

  api.export('Materialize', 'client');
});


function addAssets(api, assets){
  if(api.addAssets){
    api.addAssets(assets, 'client');
  } else {
    api.addFiles(assets, 'client', {isAsset: true});
  }
}
