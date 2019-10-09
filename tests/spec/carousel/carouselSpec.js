describe('Carousel', function() {
  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/tests/spec/carousel/';
    loadFixtures('carouselFixture.html');
  });

  describe('carousel plugin', function() {
    // beforeEach(function() {
    // });

    it('No wrap next and prev should not overflow', function(done) {
      const noWrapCarouselIns = M.Carousel.init($('#slider-no-wrap')[0], { noWrap: true });

      noWrapCarouselIns.prev();

      expect(noWrapCarouselIns.center).toEqual(0, 'Prev should do nothing');

      noWrapCarouselIns.set(3);
      setTimeout(function() {
        noWrapCarouselIns.next();

        setTimeout(function() {
          expect(noWrapCarouselIns.center).toEqual(3, 'Next should do nothing');

          done();
        }, 400);
      }, 400);
    });
  });
});
