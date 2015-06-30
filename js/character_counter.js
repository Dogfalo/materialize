(function ($) {

  $.fn.characterCounter = function(){
    return this.each(function(){

      var itHasLengthAttribute = getMaxLength($(this)) !== undefined;
      if(itHasLengthAttribute){
        $(this).on('input', updateCounter);
        $(this).on('focus', updateCounter);
        $(this).on('blur', removeCounterElement);

        addCounterElement($(this));
      }

    });
  };

  function updateCounter(){
    var maxLength     = +getMaxLength($(this)),
    actualLength      = +$(this).val().length,
    isValidLength     = actualLength <= maxLength;
    $(this).parent().find('span[class="character-counter"]')
                    .html( actualLength + '/' + maxLength);

    addInputStyle(isValidLength, $(this));
  }

  function addCounterElement($input){
    if($input.parent().find(".character-counter").length > 0){
		return;
	}	
	  
    var $counterElement = $('<span/>')
                        .addClass('character-counter')
                        .css('float','right')
                        .css('font-size','12px')
                        .css('height', 1);

    $input.parent().append($counterElement);
  }

  function removeCounterElement(){
    $(this).parent().find('span[class="character-counter"]').html('');
  }

  function addInputStyle(isValidLength, $input){
    var inputHasInvalidClass = $input.hasClass('invalid');
    if (isValidLength && inputHasInvalidClass) {
      $input.removeClass('invalid');
    }
    else if(!isValidLength && !inputHasInvalidClass){
      $input.removeClass('valid');
      $input.addClass('invalid');
    }
  }

  function getMaxLength($input){
    //Backwards compatability with  html length attribute
    if($input.attr('length') === undefined){
      return $input.data('max-length');
    }
    return $input.attr('length');
  }

  $(document).ready(function(){
    $('input, textarea').characterCounter();
  });

}( jQuery ));
