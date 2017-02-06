(function ($) {

  var methods = {
  init: function (options) {
    return this.each(function() {
    var origin = $('#'+$(this).attr('data-activates'));
    var originIcon = origin.find('i');
    var screen = $('body');

    // Creating tap target
    var tapTargetEl = $(this);
    var tapTargetWrapper = tapTargetEl.parent('.tap-target-wrapper');
    var tapTargetWave = tapTargetWrapper.find('.tap-target-wave');
    var tapTargetOriginEl = tapTargetWrapper.find('.tap-target-origin');
    var tapTargetOriginIconEl = tapTargetOriginEl.find('i');
    var tapTargetContentEl = tapTargetEl.find('.tap-target-content');

    // Creating wrapper
    if (!tapTargetWrapper.length) {
      tapTargetWrapper = tapTargetEl.wrap($('<div class="tap-target-wrapper"></div>')).parent();
    }

    // Creating content
    if (!tapTargetContentEl.length) {
      tapTargetContentEl = $('<div class="tap-target-content"></div>');
      tapTargetEl.append(tapTargetContentEl);
    }

    // Creating foreground wave
    if (!tapTargetWave.length) {
      console.log("APPEND WAVE", tapTargetWave);
      tapTargetWave = $('<div class="tap-target-wave"></div>');

      // Creating origin
      if (!tapTargetOriginEl.length) {
        tapTargetOriginEl = origin.clone(true, true);
        tapTargetOriginIconEl = tapTargetOriginEl.find('i');
        tapTargetOriginEl.addClass('tap-target-origin');
        tapTargetOriginEl.removeAttr('id');
        tapTargetWave.append(tapTargetOriginEl);
      }

      tapTargetWrapper.append(tapTargetWave);
    }

    // Open
    var openTapTarget = function() {
      console.log("OPEN");
      if (tapTargetWrapper.is('.open'))
        return;

      // Adding open class
      tapTargetWrapper.addClass('open');

      // Animating
      tapTargetEl.velocity('stop');
      // tapTargetEl.velocity({scale: [1, 0]}, { duration: duration, queue: false });

      // tapTargetWaveEl.velocity({ scale: [1, 0.8] }, { duration: duration, loop: true });

      setTimeout(function() {
        tapTargetOriginEl.off('click.tapTarget').on('click.tapTarget', function(e) {
          closeTapTarget();
          tapTargetOriginEl.off('click.tapTarget');
        });

        $(document).off('click.tapTarget').on('click.tapTarget', function(e) {
          closeTapTarget();
          $(document).off('click.tapTarget');
        });
      }, 0);
    };

    // Close
    var closeTapTarget = function(){
      console.log("CLOSE");
      if (!tapTargetWrapper.is('.open'))
      return;

      tapTargetWrapper.removeClass('open');

      tapTargetOriginEl.off('click.tapTarget')
      $(document).off('click.tapTarget');
    };

    // Pre calculate
    var calculateTapTarget = function() {
      // Element or parent is fixed position?
      var isFixed = origin.css('position') == 'fixed';
      if (!isFixed) {
          var parents = origin.parents();
          for(var i=0; i<parents.length; i++) {
              isFixed = $(parents[i]).css('position') == 'fixed';
              if (isFixed)
                  break;
          }
      }

      // Calculating origin
      var originWidth = origin.outerWidth();
      var originHeight = origin.outerHeight();
      var originTop = isFixed ? origin.offset().top - $(document).scrollTop() : origin.offset().top;
      var originLeft = origin.offset().left;

      // Calculating screen
      var screenWidth = $(window).prop('innerWidth');
      var screenHeight = $(window).prop('innerHeight');
      var centerX = screenWidth / 2;
      var centerY = screenHeight / 2;
      var isLeft = originLeft <= centerX;
      var isRight = originLeft > centerX;
      var isTop = originTop <= centerY;
      var isBottom = originTop > centerY;
      var isCenterX = originLeft >= screenWidth*0.25 && originLeft <= screenWidth*0.75;
      var isCenterY = originTop >= screenHeight*0.25 && originTop <= screenHeight*0.75;

      // Calculating tap target
      var tapTargetWidth = tapTargetEl.outerWidth();
      var tapTargetHeight = tapTargetEl.outerHeight();
      var tapTargetTop = originTop + originHeight/2 - tapTargetHeight/2;
      var tapTargetLeft = originLeft + originWidth/2 - tapTargetWidth/2;
      var tapTargetPosition = isFixed ? 'fixed' : 'absolute';

      // Calculating content
      var tapTargetTextWidth = isCenterX ? tapTargetWidth : tapTargetWidth/2 + originWidth;
      var tapTargetTextHeight = tapTargetHeight/2;
      var tapTargetTextTop = isTop ? tapTargetHeight/2 : 0;
      var tapTargetTextBottom = 0;
      var tapTargetTextLeft = isLeft && !isCenterX ? tapTargetWidth/2 - originWidth : 0;
      var tapTargetTextRight = 0;
      var tapTargetTextPadding = originWidth;
      var tapTargetTextAlign = isBottom ? 'bottom' : 'top';

      // Calculating wave
      var tapTargetWaveWidth = originWidth > originHeight ? originWidth*2 : originWidth*2;
      var tapTargetWaveHeight = tapTargetWaveWidth;
      var tapTargetWaveTop = tapTargetHeight/2 - tapTargetWaveHeight/2;
      var tapTargetWaveLeft = tapTargetWidth/2 - tapTargetWaveWidth/2;

      // Calculationg origin
      var tapTargetOriginWidth = tapTargetOriginEl.outerWidth();
      var tapTargetOriginHeight = tapTargetOriginEl.outerHeight();
      var tapTargetOriginTop = tapTargetHeight/2 - tapTargetOriginHeight/2;
      var tapTargetOriginLeft = tapTargetWidth/2 - tapTargetOriginWidth/2;
      var tapTargetOriginIconElColor = !origin.is('.btn') && originIcon.css('color') == tapTargetWave.css('backgroundColor') ? tapTargetEl.css('backgroundColor') : '';

      // Setting tap target
      tapTargetWrapper.css({
      top: tapTargetTop,
      left: tapTargetLeft,
      position: tapTargetPosition
      });

      // Setting content
      tapTargetContentEl.css({
      width: tapTargetTextWidth,
      height: tapTargetTextHeight,
      top: tapTargetTextTop,
      right: tapTargetTextRight,
      bottom: tapTargetTextBottom,
      left: tapTargetTextLeft,
      padding: tapTargetTextPadding,
      verticalAlign: tapTargetTextAlign
      });

      // Setting wave
      tapTargetWave.css({
      top: tapTargetWaveTop,
      left: tapTargetWaveLeft,
      width: tapTargetWaveWidth,
      height: tapTargetWaveHeight
      });

      // Setting origin
      // tapTargetOriginEl.css({
      // top: tapTargetOriginTop,
      // left: tapTargetOriginLeft
      // });
      tapTargetOriginIconEl.css('color', tapTargetOriginIconElColor);
    }

    // Resize
    $(window).off('resize.tapTarget').on('resize.tapTarget', function() {
      if (tapTargetEl.is('.open')) {
        calculateTapTarget();
      }
    });

    if (options == 'open') {
      calculateTapTarget();
      openTapTarget();
    }

    if (options == 'close')
      closeTapTarget();
    });
  },
  open: function(){},
  close: function(){}
  };

  $.fn.tapTarget = function(methodOrOptions) {
  if (methods[methodOrOptions] || typeof methodOrOptions === 'object')
    return methods.init.apply( this, arguments );

  $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tap-target' );
  };

}( jQuery ));
