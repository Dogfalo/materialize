describe( 'Toasts:', function() {
  var toastOutDuration = 375;
  var toastInDuration = 300;
  var toast;

  describe('Toast javascript functions', function() {
    // Toast out animation duration does not count as part of its timer.
    it('should display and remove a toast', function(done) {
      M.toast({html: 'Test toast', displayLength: toastInDuration});

      setTimeout(function() {
        toast = document.querySelectorAll('.toast');
        expect(toast.length).toBe(1);
        expect(toast[0]).toBeVisible();
        expect(toast[0].innerText).toBe('Test toast');
        setTimeout(function() {
          toast = document.querySelectorAll('.toast');
          expect(toast[0]).toBeVisible();
          expect(toast.length).toBe(1, 'because toast duration still on going');
          setTimeout(function() {
            toast = document.querySelectorAll('.toast');
            expect(toast.length).toBe(0, 'because toast should be removed by now');
            done();
          }, toastOutDuration + 90); // .1s leeway is given
        }, 10);
      }, toastInDuration);
    });

    it('Opens a toast with HTML content', function() {
      let toastContent = document.createElement("span");
      toastContent.innerText = 'I am toast content';
      M.toast({html: toastContent.outerHTML, displayLength: 400});
      let toastSpan = document.querySelector('.toast span');
      expect(toastSpan.innerText).toBe('I am toast content');
      expect(toastSpan.innerText).not.toBe('I am toast');
    });

    it('Toasts should call the callback function when dismissed', function(done) {
      let boolObj = {wasCalled: false};
      let callback = function() {
        boolObj.wasCalled = true;
      };
      M.toast({html: 'I am a toast', displayLength:100, completeCallback: callback});
      setTimeout(function() {
        expect(boolObj.wasCalled).toBe(true,
                                       'because the callback set it to true');
        done();
      }, 500);
    });

    it('Apply two custom class to a toast', function() {
      M.toast({html:'Hi', displayLength: 400, classes: 'round flat'});
      let toastFlat = document.querySelectorAll('.toast.round.flat');
      expect(toastFlat.length).toBe(1,
          'because the class parameter was passed with two classes');
    });

  });


});
