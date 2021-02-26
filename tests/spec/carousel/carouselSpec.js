describe("Carousel", function () {

  beforeEach(async function() {
    await XloadFixtures(['carousel/carouselFixture.html']);
  });
  afterEach(function(){
    XunloadFixtures();
  });

  describe("carousel plugin", function () {

    // beforeEach(function() {
    // });

    it("No wrap next and prev should not overflow", function (done) {
      let noWrap = M.Carousel.init(
        document.querySelector('#slider-no-wrap'), { noWrap: true }
      );
      noWrap.prev();

      expect(noWrap.center).toEqual(0, 'Prev should do nothing');

      noWrap.set(3);
      setTimeout(function() {
        noWrap.next();

        setTimeout(function() {
          expect(noWrap.center).toEqual(3, 'Next should do nothing');

          done();
        }, 400);
      }, 400);
    });

  });

});
