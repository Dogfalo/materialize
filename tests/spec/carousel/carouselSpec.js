describe("Carousel", function () {

  beforeEach(function() {
    loadFixtures('carousel/carouselFixture.html');
  });

  describe("carousel plugin", function () {

    // beforeEach(function() {
    // });

    it("No wrap next and prev should not overflow", function (done) {
      $noWrap = $('#slider-no-wrap').carousel({ noWrap: true });
      $noWrap.carousel('prev');

      expect($noWrap[0].M_Carousel.center).toEqual(0, 'Prev should do nothing');

      $noWrap.carousel('set', 3);
      setTimeout(function() {
        $noWrap.carousel('next');

        setTimeout(function() {
          expect($noWrap[0].M_Carousel.center).toEqual(3, 'Next should do nothing');

          done();
        }, 400);
      }, 400);
    });

  });

});
