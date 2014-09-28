function message() {
    toast('hi');
}

function toast(message) {
    if ($('toast-container').length == 0) {
        // create notification container
        var container = $('<div></div>');
        
    }
    var toast = $('<div></div>');
    toast.addClass('toast');
    var text = $('<span></span>');
    text.text(message);
    toast.append(text);
    $('body').append(toast);
}