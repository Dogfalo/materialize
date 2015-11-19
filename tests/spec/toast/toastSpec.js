describe( 'Toast Plugin', function() {
  var elem;

  beforeEach(function() {
    loadFixtures('toast/toastFixture.html');
    // elem = $(.toast);
    // elem.toast()
  });

  describe('Toast javascript functions', function(done) {
    it('Open a .5s toast', function() {
      Materialize.toast('Test toast', 500);
      setTimeout(function() {
        done();
      }, 250);

      var toast = $('.toast');
      expect(toast.length).toBe(1);
      expect(toast).toBeVisible();
      expect(toast.text()).toBe('Test toast');

    });
  });
});
