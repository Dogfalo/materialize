(function($){
 
    $.fn.extend({ 
         
        leanModal: function(options) {
 
            var defaults = {
                top: 100,
                overlay: 0.5
            }
            
            var overlay = $("<div id='lean_overlay'></div>");
            
            $("body").append(overlay);
                 
            options =  $.extend(defaults, options);
 
            return this.each(function() {
            
                var o = options;
               
                $(this).click(function(e) {
              
              	var modal_id = $(this).attr("href");

				$("#lean_overlay").click(function() { 
                     close_modal(modal_id);                    
                });
                
                $(modal_id).find('.modal_close').click(function(e) { 
                    e.preventDefault();
                    close_modal(modal_id);
                    // setTimeout( function(){ close_modal(modal_id); },200 );               
                });
                         	
              	var modal_height = $(modal_id).outerHeight();
        	  	var modal_width = $(modal_id).outerWidth();

        		$('#lean_overlay').css({ 'display' : 'block', opacity : 0 });

        		$('#lean_overlay').fadeTo(200,o.overlay);

        		$(modal_id).css({ 
        		
        			'display' : 'block',
        			'position' : 'fixed',
        			'opacity' : 0,
        			'z-index': 11000,
        			'left' : 50 + '%',
        			'margin-left' : -(modal_width/2) + "px"
        		
        		});

        		$(modal_id).animate({"top" : o.top + "px"
                            , opacity: 1}, {duration: 300, easing: 'easeOutExpo'});

                e.preventDefault();
                		
              	});
             
            });

			function close_modal(modal_id){

        		$("#lean_overlay").fadeOut(200);

                $(modal_id).fadeOut(200, function() {
                    $(this).css('top', 0);
                });
                
        		// $(modal_id).css({ 'display' : 'none' });
			
			}
    
        }
    });
     
})(jQuery);