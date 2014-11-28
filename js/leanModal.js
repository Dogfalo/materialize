(function($){
 
    $.fn.extend({ 
         
        leanModal: function(options) {
 
            var defaults = {
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
                });
                  
        		$('#lean_overlay').css({ 'display' : 'block', opacity : 0 });
                  
        		$('#lean_overlay').velocity({opacity: o.overlay}, {duration: 350, queue: false, ease: 'easeOutQuart'});
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

        		$(modal_id).velocity({top: '10%', opacity: 1}, {duration: 350, queue: false, ease: 'easeOutQuart'});

                e.preventDefault();
                		
              	});
             
            });

			function close_modal(modal_id){
        		$("#lean_overlay").velocity( { opacity: 0}, {duration: 200, queue: false, ease: 'easeOutQuart'});
                $(modal_id).fadeOut(200, function() {
                    $(this).css({ "top": 0 });
                    $("#lean_overlay").css({"display":'none'});
                });
			
			}
        }
    });
     
})(jQuery);