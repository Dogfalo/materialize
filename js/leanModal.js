(function($){
    $.fn.extend({
        openModal: openModal,
        closeModal: closeModal,
        leanModal: leanModal
    });
    
    function openModal(options)
    {
        var 
            defaults = {
                opacity: 0.5,
                in_duration: 350,
                out_duration: 250,
                ready: undefined,
                complete: undefined,
                dismissible: true
            },
            $modal = $(this),
            $overlay = $('#lean-overlay');
        
        // Override defaults
        options = $.extend(defaults, options);
        
        if(!$overlay.length){
            $overlay = $('<div id="lean-overlay"></div>');
            $('body').append($overlay);
        }

        if (options.dismissible) {
            $overlay.click(function(){
                $modal.closeModal(options);
            });
            // Return on ESC
            $(document).on('keyup.leanModal', function(e){
                if (e.keyCode === 27) {   // ESC key
                    $modal.closeModal(options);
                }
            });
        }

        $modal
            .css({
                display: 'block',
                opacity: 0
            })
            .find('.modal-close')
                .click(function(e){
                    $modal.closeModal(options);
                });

        $overlay
            .css({display: 'block', opacity: 0})
            .velocity({opacity: options.opacity}, {
                duration: options.in_duration,
                queue: false,
                ease: 'easeOutCubic'
            });

        // Define Bottom Sheet animation
        if ($modal.hasClass('bottom-sheet')) {
            $modal.velocity({bottom: 0, opacity: 1}, {
                duration: options.in_duration,
                queue: false,
                ease: 'easeOutCubic',
                // Handle modal ready callback
                complete: function(){
                    if (typeof(options.ready) === 'function') {
                        options.ready();
                    }
                }
            });
        } else {
            $modal
                .css({top: '4%'})
                .velocity({top: '10%', opacity: 1}, {
                    duration: options.in_duration,
                    queue: false,
                    ease: 'easeOutCubic',
                    // Handle modal ready callback
                    complete: function(){
                        if (typeof(options.ready) === 'function') {
                            options.ready();
                        }
                    }
                });
        }
    }
    
    function closeModal(options)
    {
        var 
            defaults = {
                out_duration: 250,
                complete: undefined
            },
            $modal = $(this),
            $overlay = $('#lean-overlay');
        
        options = $.extend(defaults, options);

        $('.modal-close').off();
        $(document).off('keyup.leanModal');

        $overlay.velocity({opacity: 0}, {
            duration: options.out_duration,
            queue: false,
            ease: 'easeOutQuart'
        });

        // Define Bottom Sheet animation
        if ($modal.hasClass('bottom-sheet')) {
            $modal.velocity({bottom: '-100%', opacity: 0}, {
                duration: options.out_duration,
                queue: false,
                ease: 'easeOutCubic',
                // Handle modal ready callback
                complete: function(){
                    $overlay.css({display: 'none'});

                    // Call complete callback
                    if (typeof(options.complete) === 'function') {
                        options.complete();
                    }
                }
            });
        } else {
            $modal.fadeOut(options.out_duration, function(){
                $modal.css({top: 0});
                $overlay.css({display: 'none'});

                // Call complete callback
                if (typeof(options.complete) === 'function') {
                    options.complete();
                }
            });
        }

    }
    
    function leanModal(options){
        return this.each(function(){
            var
                $link = $(this);
                
            $link.click(function(e){
                e.preventDefault();
                
                var 
                    modal_id = $link.attr('href') || '#' + $link.data('target');
                    
                $(modal_id).openModal(options);
            }); // done set on click
        }); // done return
    }
})(jQuery);
