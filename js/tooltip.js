(function ($) {
    
    var newTooltip;
    var timeout;
    $.fn.tooltip = function () {
        var origin;
        this.hover(function() {
            // on mouseover
            origin = $(this);
            timeout = setTimeout(function(){
                newTooltip = $('<div></div>');
                newTooltip.text($(origin).attr('title'))
                .addClass("material-tooltip")

                $('body').append(newTooltip);
                // Set position of tooltip
                var leftPos = $(origin).offset().left + $(origin).outerWidth()/2 - newTooltip.outerWidth()/2;
                var topPos = $(origin).offset().top + $(origin).outerHeight();
                newTooltip.css({top: topPos, left: leftPos});
                // Animation
                newTooltip.fadeIn(100);
                origin.removeAttr('title')
            },200);
        }, function(){
            clearTimeout(timeout);
            origin.attr('title', newTooltip.text());
            newTooltip.fadeOut(100, function(){
                newTooltip.remove();});
        });

    };
}( jQuery ));