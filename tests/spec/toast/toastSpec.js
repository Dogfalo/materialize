jasmine.getFixtures().fixturesPath = 'tests/spec/toast';

describe( 'Toast Plugin', function() {
  var elem;

  beforeEach(function() {
    loadFixtures('toastFixture.html');
    // elem = $(.toast);
    // elem.toast()
  });

  describe('Toast javascript functions', function(done) {
    it('Open a .5s toast', function() {
      Materialize.toast('Test toast', 500);
      setTimeout(function() {
        var $toast = $(.toast);
        expect($toast.length !== 0);
        done();
      }, 200);
    });
  });
});
