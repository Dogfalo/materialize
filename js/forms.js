(function ($) {
   
  var text_inputs = $('input[type=text], input[type=password], input[type=email]');  

  text_inputs.focus(function () {
    $(this).siblings('label').addClass('active');
  });

  text_inputs.blur(function () {
    console.log($(this).val());
    if ($(this).val().length === 0) {
      $(this).siblings('label').removeClass('active');      
    }
  });

}( jQuery ));