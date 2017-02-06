(function ($) {

  var methods = { 
  init: function (options) {
    return this.each(function() {
    var origin = $('#'+$(this).attr('data-activates'));
    var originIcon = origin.find('i');
    var screen = $('body');
    
    // Creating tap target
    var tapTargetEl = $(this);
    var tapTargetWaveEl = tapTargetEl.find('.tap-target-wave');
    var tapTargetOriginEl = tapTargetEl.find('.tap-target-origin');
    var tapTargetOriginIconEl = tapTargetOriginEl.find('i');
    var tapTargetContentEl = tapTargetEl.find('.tap-target-content');
    var firstTime = !tapTargetOriginEl.length;
    
    // Creating content
    if (!tapTargetContentEl.length) {
      tapTargetWaveEl = $('<div class="tap-target-content"></div>');
    }
    
    // Creating wave
    if (!tapTargetWaveEl.length) {
      tapTargetWaveEl = $('<div class="tap-target-wave"></div>');
    }
    
    // Creating origin
    if (!tapTargetOriginEl.length) {
      tapTargetOriginEl = origin.clone(true, true);
      tapTargetOriginIconEl = tapTargetOriginEl.find('i');
      tapTargetOriginEl.addClass('tap-target-origin');
      tapTargetOriginEl.removeAttr('id');
    }

    // Appending all to document
    if (firstTime)
      tapTargetEl.append(tapTargetOriginEl).append(tapTargetWaveEl);

    // Open
    var openTapTarget = function() {
      var showTapTarget = function() {
      if (tapTargetEl.is('.open'))
        return;
      
      // Adding open class
      tapTargetEl.addClass('open');
      
      // Animating
      tapTargetEl.velocity('stop');
      tapTargetEl.velocity({scale: [1, 0]}, { duration: 350, queue: false });
      
      tapTargetWaveEl.velocity('stop');
      tapTargetWaveEl.velocity({ scale: [1, 0.8] }, { duration: 350, loop: true });
      };

      setTimeout(function() {
        showTapTarget();
      }, 350);
    };
    
    // Close
    var closeTapTarget = function(){
      if (!tapTargetEl.is('.open'))
      return;
      
      // Animating
      setTimeout(function() {
        tapTargetEl.velocity({ scale: 0 }, { duration: 225, queue: false, complete: function() {
        // Removing open class
        tapTargetEl.removeClass('open');
        
        // Stopping wave
        tapTargetWaveEl.velocity('stop');
        }});
      }, 225);
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
      var tapTargetOriginIconElColor = !origin.is('.btn') && originIcon.css('color') == tapTargetWaveEl.css('backgroundColor') ? tapTargetEl.css('backgroundColor') : '';
  
      // Setting tap target
      tapTargetEl.css({
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
      tapTargetWaveEl.css({
      top: tapTargetWaveTop,
      left: tapTargetWaveLeft,
      width: tapTargetWaveWidth,
      height: tapTargetWaveHeight
      });
  
      // Setting origin
      tapTargetOriginEl.css({
      top: tapTargetOriginTop,
      left: tapTargetOriginLeft
      });
      tapTargetOriginIconEl.css('color', tapTargetOriginIconElColor);  
    }

    // Applying binds
    if (firstTime) {
      tapTargetOriginEl.on('click.tapTarget', function() {
        closeTapTarget();
      });
      
      $(document).on('click.tapTarget', function() {
        closeTapTarget();
      });   

      $(window).on('resize.tapTarget', function() {
        if (tapTargetEl.is('.open'))
            calculateTapTarget();
      }); 
    }

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
