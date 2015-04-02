( function( $ ) {

  function CharacterCounter( $el, options ) {
    var _this = this;

    this.options = $.extend( {}, CharacterCounter.defaults, options );

    this.$el = $el;
    this.$counter = $( '<span />' )
      .addClass( this.options.counterClass )
      .css( this.options.counterCss );

    this.$el.parent().append( this.$counter );

    this.$el
      .on( 'input focus', function() {
        _this.updateHandler();
      })
      .on( 'blur', function() {
        _this.removeHandler();
      })
  }

  CharacterCounter.defaults = {
    counterClass : 'character-counter',
    counterCss : {
      'float' : 'right',
      'font-size' : '12px',
      'height' : 1
    },
    invalidClass : 'invalid',
    validClass : 'valid',
  };

  CharacterCounter.prototype.updateHandler = function() {
    var maxLength = this.options.maxLength;
    var curLength = this.$el.val().length;
    var isValid = curLength <= maxLength;
    var hasInvalidClass = this.$el.hasClass( this.options.invalidClass );

    this.$counter.html( curLength + '/' + maxLength );

    if ( isValid && hasInvalidClass ) {
      this.$el.removeClass( this.options.invalidClass );
    } else if ( !isValid && !hasInvalidClass ) {
      this.$el
        .removeClass( this.options.validClass )
        .addClass( this.options.invalidClass );
    }
  };

  CharacterCounter.prototype.removeHandler = function() {
    this.$counter.html( '' );
  };

  $.fn.characterCounter = function( options ) {
    this.each( function() {
      var $this = $( this );
      var maxLengthStr = $this.attr( 'length' );

      if ( maxLengthStr !== undefined ) {
        options = options || {};
        options.maxLength = parseInt( maxLengthStr, 10 );
        $this.data( 'characterCounter', new CharacterCounter( $this, options ) );
      }
    });
  };

  $.fn.characterCounter.CharacterCounter = CharacterCounter;

  $( function() {
    $('input, textarea').characterCounter();
  });

})( jQuery );
