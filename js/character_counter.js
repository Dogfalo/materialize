(function ($) {

  $.fn.characterCounter = function(){
    return this.each(function(){

      itHasLengthAttribute = $(this).attr('length') != undefined;

      if(itHasLengthAttribute){
        $(this).on('input', updateCounter);
        $(this).on('focus', updateCounter);
        $(this).on('blur', removeCounterElement);
      }

    });
  };

  function updateCounter(){
    var maxLength     = +$(this).attr('length'),
    actualLength      = +$(this).val().length,
    isValidLength     = actualLength <= maxLength;

    addCounterElement($(this));
    $(this).next().html( actualLength + '/' + maxLength);
    addInputStyle(isValidLength, $(this));
  }

  function addCounterElement($input){
    isAlreadyAdded = $input.next().is('span') && $input.next().hasClass('character-counter');

    if(!isAlreadyAdded){
      $counterElement = $('<span/>')
                          .addClass('character-counter')
                          .css('float','right')
                          .css('font-size','12px');

      $input.after($counterElement);
    }
  }

  function removeCounterElement(){
    $(this).next().remove();
  }

  function addInputStyle(isValidLength, $input){
    inputHasInvalidClass = $input.hasClass('invalid');
    if (isValidLength && inputHasInvalidClass) {
      $input.removeClass('invalid');
    }
    else if(!isValidLength && !inputHasInvalidClass){
      $input.removeClass('valid');
      $input.addClass('invalid');
    }
  }

  $(document).ready(function(){
    $('input, textarea').characterCounter();
  });

}( jQuery ));
