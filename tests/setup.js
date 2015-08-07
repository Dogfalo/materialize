/**
 * The MIT License (MIT)
 * Copyright (c) 2015 ember-cli
 *
 * see: https://github.com/ember-cli/ember-cli-qunit/blob/b46c5e7d1abfeadfd0309e6c4b4082ebe3b58896/vendor/ember-cli-qunit/qunit-configuration.js
 */

QUnit.config.urlConfig.push({ id: 'nocontainer', label: 'Hide container'});
QUnit.config.urlConfig.push({ id: 'dockcontainer', label: 'Dock container'});
QUnit.config.testTimeout = 60000; //Default Test Timeout 60 Seconds

function setupTestingContainer() {
  var testContainer = document.getElementById('materialize-testing-container');
  var containerVisibility = QUnit.urlParams.nocontainer ? 'hidden' : 'visible';
  var containerPosition = QUnit.urlParams.dockcontainer ? 'absolute' : 'relative';

  testContainer.style.visibility = containerVisibility;
  testContainer.style.position = containerPosition;	
}

QUnit.begin(function() {
 	setupTestingContainer();
});

QUnit.moduleDone(function () {
	document.getElementById('materialize-testing-container').innerHTML = '';
});