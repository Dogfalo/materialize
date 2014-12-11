(function($){
 
    $.fn.extend({ 
         
        leanModal: function(options) {
 
            var defaults = {
                opacity: 0.5,
                in_duration: 300,
                out_duration: 200,
                ready: undefined,
                complete: undefined
            }
            
            var overlay = $("<div id='lean_overlay'></div>");
            $("body").append(overlay);
          
            // Override defaults
            options =  $.extend(defaults, options);
          
            return this.each(function() {

              // Close Handlers
              $(this).click(function(e) {
              var modal_id = $(this).attr("href");
              $("#lean_overlay").click(function() { 
                   close_modal(modal_id);                    
              });

              $(modal_id).find('.modal_close').click(function(e) { 
                  e.preventDefault();
                  close_modal(modal_id);            
              });


              $('#lean_overlay').css({ display : 'block', opacity : 0 });

              $(modal_id).css({ 
                display : 'block',
                top: '4%',
                opacity: 0
              });


              $('#lean_overlay').velocity({opacity: options.opacity}, {duration: options.in_duration, queue: false, ease: 'easeOutCubic'});

              $(modal_id).velocity({top: '10%', opacity: 1},
                {
                  duration: options.in_duration,
                  queue: false,
                  ease: 'easeOutCubic',
                  // Handle modal ready callback
                  complete: function() {
                    if (typeof(options.ready) === 'function')
                      options.ready();
                  }
                }
              );

              e.preventDefault();

              });

          });

          function close_modal(modal_id){
              $("#lean_overlay").velocity( { opacity: 0}, {duration: options.out_duration, queue: false, ease: 'easeOutQuart'});
              $(modal_id).fadeOut(options.out_duration, function() {
                  $(this).css({ top: 0});
                  $("#lean_overlay").css({display:'none'});

                  // Call complete callback
                  if (typeof(options.complete) === 'function')
                    options.complete();
              });



			}
        }
    });
     
})(jQuery);