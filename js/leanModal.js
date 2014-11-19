(function($){
 
    $.fn.extend({ 
         
        leanModal: function(options) {
 
            var defaults = {
                overlay: 0.6
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
                });
                         	
              	

        		$('#lean_overlay').css({ 'display' : 'block', opacity : 0 });

        		$('#lean_overlay').fadeTo(200, o.overlay);
//                
//                var modal_height = $(modal_id).outerHeight();
//        	  	var modal_width = $(modal_id).outerWidth();
//                  
        		$(modal_id).css({ 
        		
        			'display' : 'block',
        			'position' : 'fixed',
                    'top': 0,
        			'opacity' : 0,
        			'z-index': 1000
        		
        		});

        		$(modal_id).transition({top: '10%', opacity: 1}, 350, 'ease');

                e.preventDefault();
                		
              	});
             
            });

			function close_modal(modal_id){
        		$("#lean_overlay").transition({ opacity: 0}, 200, function(){$("#lean_overlay").css({"display":'none'})});
                $(modal_id).fadeOut(200, function() {
                    $(this).css('top', 0);
                });
			
			}
        }
    });
     
})(jQuery);