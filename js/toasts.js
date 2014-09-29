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
    newToast.show(200)
        .delay(displayLength)
        .hide(200,function(){
            $(this).remove();
        });
    
    function createToast(message) {
        var toast = $('<div></div>');
        toast.addClass('toast');
        var text = $('<span></span>');
        text.text(message);
        toast.append(text);
        toast.hide();
        return toast;
    }
}