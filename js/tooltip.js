(function ($) {
    $.fn.tooltip = function () {
        var tooltip;
        var origin;
        this.hover(function() {
            // on mouseover
            origin = this;
            setTimeout(function(){
                tooltip = $('<div></div>');
                tooltip.text($(origin).attr('title'))
                .addClass("material-tooltip")

                $('body').append(tooltip);
                // Set position of tooltip
                var leftPos = $(origin).offset().left + $(origin).outerWidth()/2 - tooltip.outerWidth()/2;
                var topPos = $(origin).offset().top + $(origin).outerHeight();
                tooltip.css({top: topPos, left: leftPos});
                // Animation
                tooltip.fadeIn(100);
                $(origin).removeAttr('title')
            },300);
        }, function(){
            $(origin).attr('title', tooltip.text());
            tooltip.fadeOut(100, function(){this.remove();});
        });

    };
}( jQuery ));