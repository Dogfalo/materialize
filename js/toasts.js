function message() {
    toast('hi', 2000);
}
function toast(message, displayLength) {
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
    
    newToast.animate({"top" : "+20px"
                    , "opacity": 0}, 0);
    newToast.animate({"top" : "0px"
                            , opacity: 1}, 300);
        newToast.delay(displayLength)
        .animate({"opacity": 0}, 200)
        .slideUp(200, function(){
            $(this).remove();
        });
    
    
    function createToast(message) {
        var toast = $('<div></div>');
        toast.addClass('toast');
        var text = $('<span></span>');
        text.text(message);
        toast.append(text);
        return toast;
    }
}