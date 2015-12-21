describe('ScrollFire:', function() {
  var options = [
    {selector: '#test', offset: 50, callback: 'Materialize.toast("Scroll event fired!", 4000)' }
  ];

  beforeEach(function() {
    loadFixtures('scrollFire/scrollFireFixture.html');
    // testFixture.myTestedPlugin()
  });

  describe('scrollFire javascript functions', function() {
    beforeEach(function() {
      spyOn(Materialize, 'toast').and.callThrough();
    });

    it('should fire the callback function', function(done) {
      Materialize.scrollFire(options);
      var testElement = document.getElementById("test");
      // Scroll to the test component
      document.body.scrollTop = testElement.offsetTop;
      expect(Materialize.toast).toHaveBeenCalledWith("Scroll event fired!", 4000);
      done();
    });
  });
});
