module('collapsible tests', {
  setup: function() {
    setupPage('collapsible');
    $('.collapsible').collapsible({
      accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  }
});

QUnit.test('basic collapsible test', function(assert) {
  // Async mode
  QUnit.stop();

  // Starting condition
  QUnit.equal($('.collapsible li:first-child .collapsible-body').css('display'), 'block', 'First accordion is displayed initially');

  setTimeout(function() {
    QUnit.start(); // Test is done once we reach end of this scope

    // Ensure the first accordion starts collapsed
    QUnit.equal($('.collapsible li:first-child .collapsible-body').css('display'), 'none', 'First accordion is hidden after at least 350ms');

    // Click the header
    $('.collapsible li:first-child .collapsible-header').click();

    // Now the first accordion should be opened
    QUnit.equal($('.collapsible li:first-child .collapsible-header').css('display'), 'block', 'First accordion is displayed');
  }, 350);
});