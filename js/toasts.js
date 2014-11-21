function toast(message, displayLength, className) {
    className = className || "";
    if ($('#toast-container').length == 0) {
        // create notification container
        var container = $('<div></div>')
            .attr('id', 'toast-container');
        $('body').append(container);
    }
    
    // Select and append toast
    var container = $('#toast-container')
    var newToast = createToast(message);
    container.append(newToast);
    
    newToast.css({"top" : parseFloat(newToast.css("top"))+35+"px",
                  "opacity": 0});
    newToast.velocity({"top" : "0px",
                       opacity: 1},
                       {duration: 300,
                       easing: 'easeOutCubic',
                      queue: false});
//        newToast.delay(displayLength)
        newToast.velocity({"opacity": 0, marginTop: '-40px'}, { duration: 375,
                                           easing: 'easeOutExpo',
                                           queue: false, delay: displayLength,
                                           complete: function(){$(this).remove()}
                                          });

//        .slideUp(250, function(){
//            $(this).remove();
//        });
    
    
    function createToast(message) {
        var toast = $('<div></div>');
        toast.addClass('toast');
        toast.addClass(className);
        var text = $('<span></span>');
        text.text(message);
        toast.append(text);
        return toast;
    }
}